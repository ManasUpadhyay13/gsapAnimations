"use client"

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const AnimateAnything = () => {
    const refContainer = useRef<any>(null);

    useEffect(() => {
        const letters = refContainer.current.children;

        gsap.fromTo(letters,
            {
                opacity: 0,
                scale: 0.5,
                y: 50,
                rotationX: 180
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.3
            }
        );
    }, []);

    return (
        <div className='bg-[#0E100F] h-screen w-full text-[#FFFCE1] flex items-center justify-center flex-col'>
            <div className='flex text-[9rem] font-bold' ref={refContainer}>
                <div>A</div>
                <div>n</div>
                <div>i</div>
                <div>m</div>
                <div>a</div>
                <div>t</div>
                <div>e</div>
            </div>
            <div className='flex text-[9rem] font-bold'>
                <div>A</div>
                <div>n</div>
                <div>y</div>
                <div>t</div>
                <div>h</div>
                <div>i</div>
                <div>n</div>
                <div>g</div>
            </div>
        </div>
    );
};

export default AnimateAnything;
