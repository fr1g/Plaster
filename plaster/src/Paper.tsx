import type { ReactNode } from "react";

export default function Paper({ children }: { children: ReactNode }) {

    return <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 
        to-zinc-800 text-white text-shadow-amber-50 text-large grid p-5 items center gap-3">
        {children}
    </div>

}