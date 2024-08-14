'use client'

import { motion } from 'framer-motion'
import gsap, { CSSPlugin } from 'gsap'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './learn.css'

// Register the CSSPlugin (ScrollTrigger is not used in this example)
gsap.registerPlugin(CSSPlugin)

const Learning = () => {

    const temp = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline()
            t1.from("#intro-slider", {
                xPercent: "-100",
                duration: 1.3,
                delay: 0.3,
            })
                .from(["#title-1", "#title-2", "#title-3"], {
                    opacity: 0,
                    y: "+=30",
                    stagger: 0.5,
                })
                .to(["#title-1", "#title-2", "#title-3"], {
                    opacity: 0,
                    y: "-=30",
                    delay: 0.3,
                    stagger: 0.5,
                })
                .to("#intro-slider", {
                    xPercent: "-100",
                    duration: 1.3,
                })
                .from("#welcome", {
                    opacity: 0,
                    duration: 0.5,
                })
        }, temp)
        return () => ctx.revert()
    }, [])


    return (
        <div className="relative" ref={temp}>
            <div
                id="intro-slider"
                className="h-screen p-10 bg-gray-50 absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-10 tracking-tight"
            >
                <h1 className="text-9xl" id="title-1">
                    Lorem, ipsum.
                </h1>
                <h1 className="text-9xl" id="title-2">
                    Lorem ipsum dolor sit amet.
                </h1>
                <h1 className="text-9xl" id="title-3">
                    Lorem, ipsum dolor.
                </h1>
            </div>
            <div className="h-screen flex bg-gray-950 justify-center place-items-center">
                <h1
                    id="welcome"
                    className="text-9xl font-bold text-gray-100 font-spaceGrotesk"
                >
                    Learning.
                </h1>
            </div>
        </div>
    )
}

export default Learning
