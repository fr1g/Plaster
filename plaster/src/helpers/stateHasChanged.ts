import { useState } from "react";

export default function useStateChanged() {
    const [_, __] = useState(false);

    return () => __(!_);

}