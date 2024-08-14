"use client"

import React, { useEffect, useLayoutEffect, useState } from 'react'
import Lenis from 'lenis'
import Image from 'next/image'
import Loader from './components/Loader'
import Hero from './components/Hero'
import gsap from 'gsap'

const IMAGES = [
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg?auto=compress&cs=tinysrgb&w=600'
]

const page = () => {

    useEffect(() => {
        const lenis = new Lenis()


        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

    }, [])


    const [loaderFinished, setLoaderFinished] = useState(false);
    const [timeline, setTimeline] = useState<any>(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setLoaderFinished(true),
            });
            setTimeline(tl);
        });

        return () => context.revert();
    }, []);

    return (
        <main>{loaderFinished ? <Hero /> : <Loader timeline={timeline} />}</main>
    );
}

export default page
