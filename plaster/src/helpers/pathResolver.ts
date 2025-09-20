import type AddressComponent from "../classes/AddressComponent";
import TargetInfo from "../classes/TargetInfo";
import Const from "../consts";
import Base64Helper from "./base64";
import tryGetAddrComp from "./hostPortEasyRecognize";

const PeelNode = Const.peel;
const Endpoint = import.meta.env.DEV ? Const.localhost : Const.publicHost;

const Resolver = {
    peel: (url: string): string => {
        if (url.includes(Endpoint) && url.includes(PeelNode)) return url.split(PeelNode)[1];
        else return url;
    },
    tryPickId: (rawUrl: string): string | null => { // resolving the very first .blablabla. as id
        const url = Resolver.peel(rawUrl), pattern = /\.(.*?)\./g;
        let got: string | null = null, match;

        if ((match = pattern.exec(url)) !== null)
            got = match[0];

        return got;
    },
    tryPickKeyCode: (rawUrl: string): string | null => {
        const url = Resolver.peel(rawUrl), pattern = /@(.*?)@/g;
        let got: string | null = null, match;

        if ((match = pattern.exec(url)) !== null)
            got = match[0];

        // return got === null ? null : got.substring(1, got.length - 1);
        return got && got.substring(1, got.length - 1);
    },
    tryResolveUrl: (rawUrl: string): TargetInfo | null => {

        const url = Resolver.peel(rawUrl);

        const gotId = Resolver.tryPickId(rawUrl), // id || not present
            gotKeyCode = Resolver.tryPickKeyCode(rawUrl); // kc || not present

        const cleaned = url.replaceAll(gotId ?? "", "").replaceAll(gotKeyCode ?? "", "").replaceAll("\\", "/");
        // your.srv.domain/route/to/your/app?param

        const got: AddressComponent[] | null = tryGetAddrComp(cleaned);
        const gotDomain = got ? (got[0].combine()) : "",
            gotPath = cleaned.includes("/") ? cleaned.replace(gotDomain, "") : "";

        let result: TargetInfo | null = null;
        try {
            result = new TargetInfo(gotDomain, (gotKeyCode ? Base64Helper.base64ToString(gotKeyCode) : null), gotId, gotPath, gotKeyCode);

        } catch (ex: any) { // eslint-disable-line
            console.error(ex);
            console.error(`Related got keycode: ${gotKeyCode}`)
        }

        if (result && result.isAllEmpty() || result === null) return null;
        return result;

    }
}

export default Resolver;