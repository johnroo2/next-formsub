import React from "react";
import { useRouter } from "next/router";

export default function Auth(){
    const router = useRouter();
    const query = router.query;

    return(
        <>
            <p className="text-black text-2xl text-center">U{">"} {query.user}</p>
            <p className="text-black text-2xl text-center">E{">"} {query.email}</p>
            <p className="text-black text-2xl text-center">P{">"} {query.password}</p>
        </>
    )
}