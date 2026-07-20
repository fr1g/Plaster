import type Storage from "../classes/Storage";
import type TargetInfo from "../classes/TargetInfo";
import Const from "../consts";
import Resolver from "./pathResolver";

const Navigator = {
    eventHandler: { // if the iframe got parameters or anchors, before submitting to plaster, MUST make sure: every param value AND anchor GOT ENCODED as component.
        onNavigate: () => {

        },
        onPageLoaded: () => {
            // tab name: ${document.title} [Plaster]

        }
    },
    raise: (info: string) => {
        console.warn(info);


        return null;
    },
    goto: () => {

    },
    seek: (): null | TargetInfo => {
        const required = Resolver.tryResolveUrl(window.location.href);
        // if nothing provided via url:
        if (required == null) {
            // check localStorage
            if (localStorage.getItem(Const.storage))  // looking for last visited service
                return (JSON.parse(localStorage.getItem(Const.storage) as string) as Storage).lastVisit;

            else return Navigator.raise(`NOTENOUGH | no target data found. require: URL with scheme or keycode or history in storage: ${Const.storage}`)
        }

        return Navigator.raise("unknown problem. check the localstorage or href");
    }
}

export default Navigator;