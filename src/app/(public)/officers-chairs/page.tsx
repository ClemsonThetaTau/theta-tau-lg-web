import React from "react"

import OfficerGrid from "./officerGrid"

export default function OfficersChairs() {
    return (
        <div>
             <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mt-10 text-center">
                Executive Committee
            </h2>
            <OfficerGrid />
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mt-0 text-center">
                The Chairs
            </h2>
        </div>
    )
}