import { useNavigate } from "react-router"
import Paper from "./Paper"
import { Button } from '@headlessui/react'

function App() {

    const navigate = useNavigate();

    return (
        <Paper>
            <div className="w-full flex flex-col place-items-center gap-5">
                <div className="w-full text-5xl text-center grow-3 grid items-end">
                    <h1>Plaster</h1>
                </div>
                <p className="lg:w-2/3 text-center mx-auto text-lg leading-10 grow-7">
                    Plaster is a tool, which can help you to hide your service's port. <br />
                    Your address will be switched from: <code>https://your.com:11451</code> <br />
                    to the page under this service: <code>https://plaster.vot.moe</code> <br />
                    Literally, it should be like: <code className=" break-all md:break-keep">https://plaster.vot.moe/app/.id.your.srv.domain\route\to\your\app?param@base64OfYourSite@</code><br />
                    and in the future, if your user didn't use any other service using Plaster,
                    he/she can forever using vot.moe as your service's alias.
                </p>
            </div>
            <div className="border-t-2 pt-5 mx-auto w-4/5 p-3 grid gap-3">
                <div>
                    <h2>How to use?</h2>
                    <div>
                        <h3 className="text-xl">
                            To generate a plaster link easily, use this tool: <span className="mx-1"></span>
                            <Button className={"border px-1 rounded-lg animated-block bg-zinc-100 text-blue-500  "} onClick={() => navigate('/tool')} >Encoder</Button>
                        </h3>
                        <br />
                    </div>
                    <p>
                        Let's go back to the link formulae: <code className=" break-all md:break-keep">https://plaster.vot.moe/app/.id.your.srv.domain\route\to\your\app?param@base64OfYourSite@</code><br />
                    </p>
                    <ul className="list-disc space-y-1 my-1.5">
                        <li> <code>your.srv.domain</code>: <p>the domain name of your service. Plaster will check if the user has been visited, and figure the current target to your revealed address. If not, it will be useless.</p> </li>
                        <li> <code>.id.</code>: <p>your unique id of service. do not get conflicted on your side, otherwise the visited-user cannot reach the correct one. If nothing defined for ID, will always replace your "default" one; if user not given the ID, will always use the most recent same domain service.</p> </li>
                        <li> <code>\route\to\your\app?param</code>: <p>your real path (separated by <code>\</code>) and params. Better encode your param to avoid conflicts.</p> </li>
                        <li> <code>@base64...@</code>: <p>ANYTHING AFTER "/app/" and SURROUNDED BY <code>@</code> will be considered as the KeyCode in Base64. Make sure your params and anchors are ENCODED to avoid the possible conflict. <br />Your real address encoded in base64. It will be necessary, if your user never visited to your service via Plaster. The base64 must be matched to "your.srv.domain"</p> </li>
                    </ul>
                    <p>
                        After such Plaster link has been resolved, the location will be changed like: <code>https://plaster.vot.moe/app/your/service/real/path?param</code> <br />
                        If a user visited your service via Plaster App most recent, then he/she can simply visit <code>https://plaster.vot.moe/app</code> as alias of your service. <br />
                        If a user visited many services and all via Plaster App, then he/she need to add <code>your.srv.domain</code> after <code>https://plaster.vot.moe/app/</code> <br />
                        - But if your user visited many of your Plaster-handled services, adding your unique <code>.id.</code> for your service like <code>https://plaster.vot.moe/app/.id.your.srv.domain</code>
                    </p>
                </div>
                <div>
                    <h2>FAQ</h2>
                    <ul className=" list-disc space-y-3">
                        <li>
                            <p className="text-xl font-semibold italic">Why can't I use it with non-HTTPS services?</p>
                            <p>We cannot lie to all the users using this service.
                                If your service is actually not secured under the HTTPS,
                                the risk will be hidden under ours coat.</p>
                        </li>
                        <li>
                            <p className="text-xl font-semibold italic">Will the port can be hidden forever and can I use this Plaster link anywhere?</p>
                            <p>
                                NOPE. this CAN ONLY HIDE THE PORT IN ADDR. BAR. <br />
                                requesting via Plaster link will only return Plaster App HTML as text (or of MIME-type text/html). <br />
                                your source port can also be visible revealing by <code>f12</code> or other tools. since each web request need the target-port be clearly declared.

                            </p>
                        </li>
                        <li>
                            <p className="text-xl font-semibold italic">Why using <code>\</code> rather than <code>/</code> to separate the path?</p>
                            <p>Because <code>\</code> is similar to <code>/</code>. Don't worry, the <span className="italic">backslashed</span>
                                path will be converted to the normal slash paths after the page allocated.</p>
                        </li>
                        <li>
                            <p className="text-xl font-semibold italic">What will happen if user clicked refresh?</p>
                            <p>The Plaster App will simply do the refresh and load the latest requested URL from LocalStorage.</p>
                        </li>
                        <li>
                            <p className="text-xl font-semibold italic">How can my user share his/her current page under Plaster App link?</p>
                            <p>Good question. I don't know too. Let's discuss 'bout that :）</p>
                        </li>
                        <li>
                            <p className="text-xl font-semibold italic">About the License and Agreement</p>
                            <p>
                                The Plaster Project is an open-source software under <code>MIT</code> license.<br />
                                For government regulation: IF someone figured ANY page USING Plaster spreading ILLEGAL CONTENT:
                                you can use <code>f12</code>, and then simply run <code>getCurrentSrc()</code> in the JS CONSOLE.<br />
                                LEGAL DEPLOYMENT OF PLASTER or PLASTER-BASED/LIKE PROJECT SHOULD ALWAYS KEEP THIS FUNCTION TO EASILY COLLECT THE CURRENT ACTUAL PAGE.<br />
                                <br />
                                <span className="text-lg underline italic">If you find any deployment of Plaster or Plaster-based/like project don't have such method:</span>
                            </p>
                            <ol className="list-decimal my-1">
                                <li>Report that deployment of Plaster or Plaster-based/like project as illegal.</li>
                                <li>Open <code>f12</code> and run <code>localStorage</code>, then provide the FULL content to related department -- it MAY including some illegal-site info.</li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>

        </Paper>
    )
}

export default App
