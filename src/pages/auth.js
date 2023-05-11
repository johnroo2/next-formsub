import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Auth(){
    const router = useRouter();
    const query = router.query;

    return(
        <>
            <Head>
                <title>Auth</title>
            </Head>
            <div className="flex flex-col gap-[5px] items-center">
                <p className="text-black text-2xl">USR{">"} {query.username}</p>
                <p className="text-black text-2xl">PSW{">"} {query.password}</p>

                <Link href="/">
                    <button className="antblue-button w-[200px] text-white rounded-sm">
                        {"<---"}
                    </button>
                </Link>
            </div>
        </>
    )
}