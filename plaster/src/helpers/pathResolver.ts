import TargetInfo from "../classes/TargetInfo";
import Base64Helper from "./base64";
import tryGetAddrComp from "./hostPortEasyRecognize";

const PeelNode = "/app/";
const Endpoint = "https://plaster.vot.moe";


const tool = {
    peel: (url: string): string => {
        if (url.includes(Endpoint) && url.includes(PeelNode)) return url.split(PeelNode)[1];
        else return url;
    },
    tryPickId: (rawUrl: string): string | null => { // resolving the very first .blablabla. as id
        const url = tool.peel(rawUrl), pattern = /\.(.*?)\./g;
        let got: string | null = null, match;

        while ((match = pattern.exec(url)) !== null)
            got = match[0];

        return got;
    },
    tryPickKeyCode: (rawUrl: string): string | null => {
        const url = tool.peel(rawUrl), pattern = /@(.*?)@/g;
        let got: string | null = null, match;

        while ((match = pattern.exec(url)) !== null)
            got = match[0];

        return got;
    },
    tryResolveUrl: (rawUrl: string): TargetInfo | null => {

        const url = tool.peel(rawUrl);

        const gotId = tool.tryPickId(rawUrl), // id || not present
            gotKeyCode = tool.tryPickKeyCode(rawUrl); // kc || not present

        const cleaned = url.replaceAll(gotId ?? "", "").replaceAll(gotKeyCode ?? "", "").replaceAll("\\", "/");
        // your.srv.domain/route/to/your/app?param

        const got = tryGetAddrComp(cleaned);
        const gotDomain = got ? (got[0].combine()) : "",
            gotPath = cleaned.includes("/") ? cleaned.replace(gotDomain, "") : "";

        const result = new TargetInfo(gotDomain, (gotKeyCode ? Base64Helper.base64ToString(gotKeyCode) : null), gotId, gotPath, gotKeyCode);

        if (result.isAllEmpty()) return null;
        return result;
    }
}

export default tool;