import type Storage from "../classes/Storage";
import type VisitInfo from "../classes/VisitInfo";
import Const from "../consts";
import Resolver from "./pathResolver";

const Navigator = {
    raise: (info: string) => {
        console.warn(info);


        return null;
    },
    goto: () => {

    },
    seek: (): null | VisitInfo => {
        const required = Resolver.tryResolveUrl(window.location.href);
        if (required && !required?.isMatched()) return Navigator.raise("Keycode not matching to given host.");
        // if nothing provided via url:
        if (required == null) {
            // check localStorage
            if (localStorage.getItem(Const.storage))  // looking for last visited service
                return (JSON.parse(localStorage.getItem(Const.storage) as string) as Storage).lastVisit;

            else return Navigator.raise(`NOTENOUGH | no target data found. require: URL with scheme or keycode or history in storage: ${Const.storage}`)
        }
        // if required with a key code:
        else if (required.resolvedEndpoint) {
            // if not providing a domain and id

        }

        return Navigator.raise("unknown problem. check the localstorage or href");
    }
}

export default Navigator;