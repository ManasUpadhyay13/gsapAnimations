"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/Navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

const inter = Inter({ subsets: ["latin"] })



export default function Layout({ children }: Readonly<{
    children: React.ReactNode
}>) {

    const [count, setCount] = useState(0);

    useEffect(() => {

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount < 100) {
                        return prevCount + 1;
                    } else {
                        clearInterval(interval);
                        return prevCount;
                    }
                });
            }, 25);
        }, 2000);

        return () => {
            clearTimeout(timeout);
            clearInterval(timeout);
        };
    }, []);

    const temp = useRef(null)

    useLayoutEffect(() => {
        const t1 = gsap.timeline()

        t1.from("#heading", {
            scale: 2,
            duration: 1.3
        })
            .to("#cover", {
                xPercent: 100,
                delay: 2.5
            })
            .to("#main", {
                xPercent: 100,
                delay: 3
            })

    }, [temp])





    return (
        <html lang="en">
            <body className={inter.className}>

                <main className="w-1/2 mx-auto p-1">
                    <Navigation />
                    {children}
                </main>
            </body>
        </html>
    )
}
