import React, { lazy, Suspense } from "react";

const UI = lazy( () => import('./UI') );

const PurchaseOrder = () => {

    return (
        <Suspense fallback={ <div>Loading</div> }>
            <UI />
        </Suspense>
    )

}

export default PurchaseOrder;