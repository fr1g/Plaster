import type AddressComponent from "../classes/AddressComponent";
import TargetInfo from "../classes/TargetInfo";
import Const from "../consts";
import Base64Helper from "./base64";
import tryGetAddrComp from "./hostPortEasyRecognize";

const Endpoint = import.meta.env.DEV ? Const.localhost : `${location.protocol}//${location.host}`;

const Resolver = {
    genId: (id: string): string => {
        return `<@${id}>`;
    },
    peel: (url: string): string => {
        if (url.startsWith(Endpoint)) return url.replace(Endpoint, "");
        else return url;
    },
    tryPickId: (rawUrl: string): string | null => {
        const url = Resolver.peel(rawUrl), pattern = /\<@(.*?)\>/g;
        if (!url.startsWith("<@")) return null;
        let got: string | null = null, match;

        if ((match = pattern.exec(url)) !== null)
            got = match[0];

        return got;
    },
    tryResolveUrl: (rawUrl: string): TargetInfo | null => {
        // to get additional paths, params and hash that directly added after ID or 'andgoto'. requiring a full href of current page

        const url = Resolver.peel(rawUrl);
        const gotId = Resolver.tryPickId(rawUrl);


        let result: TargetInfo | null = null;
        try {


        } catch (ex: any) {
            console.error(ex);
        }

        if (result === null || (result as TargetInfo).isAllEmpty()) return null;
        return result;

    }
}

export default Resolver;