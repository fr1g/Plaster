import { useParams } from "react-router"
import Resolver from "./helpers/pathResolver";



export default function Entrance() {
    const rawParams = useParams();

    const props = rawParams ? rawParams.props : "/";
    const rest = rawParams && rawParams["*"] ? `/${rawParams["*"]}` : "";
    const full = `${props}${rest}`;
    return <div>
        x:{full} <br /> href: {JSON.stringify(Resolver.tryResolveUrl(window.location.href))} <br /> props: {JSON.stringify(Resolver.tryResolveUrl(full))}
    </div>
}