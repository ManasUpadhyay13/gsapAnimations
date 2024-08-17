"use client"

import React, { useEffect, useRef } from 'react';

const Learning6 = () => {
    const canvasRef = useRef<any>(null);
    const headingRef = useRef<any>(null);
    const imagesRef = useRef<any>([]);
    const totalImages = 64;
    const loadedImagesRef = useRef<any>(0);
    const currentFrameIndexRef = useRef<any>(1);
    const ctxRef = useRef<any>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.backgroundColor = 'transparent';

        for (let i = 0; i < totalImages; i++) {
            const img = new Image();
            img.onload = () => {
                loadedImagesRef.current++;
                if (loadedImagesRef.current === totalImages) {
                    addEventListeners();
                    renderFrame();
                }
            };
            img.src = `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/${String(i).padStart(4, '0')}.png`;
            imagesRef.current.push(img);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const addEventListeners = () => {
        window.addEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameCount = totalImages;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );
        currentFrameIndexRef.current = frameIndex;
        renderFrame();
        handleHeadingAnimationBasedonScroll();
    };

    const handleHeadingAnimationBasedonScroll = () => {
        const heading = headingRef.current;
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const opacity = Math.max(0, 1 - (scrollTop / (2 * viewportHeight)));
        heading.style.opacity = opacity;
    };

    const renderFrame = () => {
        const ctx = ctxRef.current;
        const img = imagesRef.current[currentFrameIndexRef.current];
        if (!img) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const canvasRatio = canvasRef.current.width / canvasRef.current.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawWidth = canvasRef.current.width;
            drawHeight = drawWidth / imgRatio;
            offsetY = (canvasRef.current.height - drawHeight) / 2;
        } else {
            drawHeight = canvasRef.current.height;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvasRef.current.width - drawWidth) / 2;
        }

        ctx.save();
        if (totalImages - currentFrameIndexRef.current < 10) {
            ctx.globalAlpha = (totalImages - currentFrameIndexRef.current) / 10;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    };

    return (
        <div
            className='flex items-center justify-center'
            style={{ background: '#000', color: 'white', height: '500vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <h1 ref={headingRef}
                className='text-[8rem]  w-full fixed left-[25%] font-bold top-[10%]'
            >Airpods Pro</h1>
            <canvas ref={canvasRef} style={{ position: 'fixed', left: '50%', top: '50%', maxHeight: '100vh', maxWidth: '100vw', transform: 'translate(-50%, -50%)' }} />
        </div>
    );
};

export default Learning6;
