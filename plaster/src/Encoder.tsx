import { useRef, useState, type FocusEvent } from "react";
import Paper from "./Paper";
import { Button, Description, Field, Input, Label } from '@headlessui/react'
import tryGetAddrComp from "./helpers/hostPortEasyRecognize";
import type AddressComponent from "./classes/AddressComponent";
import Const from "./consts";
import Resolver from "./helpers/pathResolver";
import Base64Helper from "./helpers/base64";

export default function Encoder() {

    const [peelHost, setPeelHost] = useState<null | string>(null);
    const [act, setAct] = useState(false);
    const [g, setG] = useState("");
    const [hiddenVer, setHiddenVer] = useState("");
    const form = useRef<HTMLFormElement>(null);
    const [ipHide, setIpHide] = useState(false);

    function setPvHost(original: string) {
        if (original === "") return setPeelHost(null);
        if (!original.toLowerCase().startsWith("https://")) return setPeelHost("[ERR] insecure HTTP not allowed");
        let component: AddressComponent | AddressComponent[] | null = tryGetAddrComp(original);
        if (!component) return setPeelHost(null);
        component = component[0];
        setPeelHost(component.host);
        return component.host;
    }

    function generate(info: { [key: string]: string | unknown }) {
        const carry = info;
        const actualHost = carry["source-host"] as string;
        const locatedHost = actualHost.substring(8, actualHost.length).split(":")[0]; // 
        carry["host-preview"] = setPvHost(actualHost) ?? null;
        console.log(JSON.stringify(info));
        const prep = `https://${(import.meta.env.DEV ? Const.localhost : Const.publicHost).split("://")[1]}${Const.peel}${carry['given-id'] ? Resolver.setId(carry['given-id'] as string) : ""}${locatedHost}@${Base64Helper.strToBase64(actualHost.substring(8, actualHost.length))}@ `;
        setG(prep)
        setHiddenVer(prep.replace(locatedHost, ""));
        // console.log(g, hiddenVer)
    }

    return <Paper >
        <div className="max-w-[600px] w-full mx-auto my-3 rounded-xl bg-zinc-700 shadow-lg shadow-zinc-300/20 p-5">
            <h1 className="text-3xl text-shadow-zinc-300/30 text-shadow-md">Encoding Tool</h1> <br />
            <form action="" className="py-1 space-y-3.5" ref={form} onChange={() => {
                const data: { [key: string]: unknown } = {};
                for (const n of new FormData(form.current!).entries())
                    data[n[0]] = n[1];

                if (form && form.current) generate(data);
            }}>
                <Field >
                    <Label className={"text-lg font-semibold"}>Source Address</Label>
                    <Description className={"italic -translate-y-1 block"}>Host and port only, and can only use a HTTPS target. dont enter path or params or anchor here.</Description>
                    <Input placeholder="ex. https://example.com:11451"
                        onFocus={(e: FocusEvent<HTMLInputElement>) => {
                            const target = e.target;
                            if (target.value == "" || target.value == undefined)
                                target.value = "https://";

                        }}
                        name="source-host"
                        type="url"
                        className={"border w-full bg-zinc-600 focus:bg-zinc-500/50 text-white p-1 rounded-lg px-1.5"}
                    // onChange={(e: ChangeEvent<HTMLInputElement>) => { setPvHost(e.target.value) }}
                    />
                </Field>
                <Field >
                    <Label className={"text-lg font-semibold"}>Host</Label>
                    <Description className={"italic -translate-y-1 block"}>This will be saved in your visitor's browser, to make sure they can access your site without keyCode in the future.</Description>
                    <Input placeholder={peelHost ?? "Input your Source Address"}
                        name="host-preview"
                        type="text" readOnly
                        className={"border w-full bg-zinc-600 focus:bg-zinc-500/50 text-white p-1 rounded-lg px-1.5"}
                        value={peelHost || act ? (peelHost ?? "Input your Source Address RATHER THAN HERE!!!") : ""}
                        onFocus={() => { setAct(true) }} onBlur={() => { setAct(false) }}
                    />
                </Field>
                <Field >
                    <Label className={"text-lg font-semibold"}>ID</Label>
                    <Description className={"italic -translate-y-1 block"}>This will be saved in your visitor's browser, to make sure they can access your site without keyCode in the future.</Description>
                    <Input placeholder="text-only_or-with-dashes"
                        name="given-id"
                        type="text"
                        className={"border w-full bg-zinc-600 focus:bg-zinc-500/50 text-white p-1 rounded-lg px-1.5"}
                    />
                </Field>
                <div>
                    Use ID to refer address (in order to hide real IP - therefore the stored index on client will ONLY be recognized by ID, since no IP is provided as unique signature.)
                    <br />
                    <Button className={"border px-1 rounded-lg translate-y-1.5 mt-1 text-xl font-bold animated-block bg-zinc-100 text-blue-500 "} onClick={() => setIpHide(!ipHide)} >{ipHide ? 'ON' : 'OFF'}</Button>
                </div>
            </form>
            <br />
            <hr />
            <h2>Generated (HID: {ipHide ? 'ON' : 'OFF'})</h2>
            <div className="w-full break-all p-2.5 bg-blue-400 border-2 rounded-lg shadow font-semibold select-all">{ipHide ? hiddenVer : g}</div>
            <p className="mt-1.5">Be responsible to your inputs.</p>
        </div>
    </Paper>
}