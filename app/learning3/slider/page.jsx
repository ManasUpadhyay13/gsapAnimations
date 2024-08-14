"use client";

import React, { useEffect, useRef } from "react";
import "./temp.css";
import gsap from "gsap";

const IMAGES = [
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg?auto=compress&cs=tinysrgb&w=600'
];

const Temp = () => {
    let target = 0;
    let current = 0;
    const ease = 0.075;

    const sliderRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const slidesRef = useRef([]);

    let maxScroll = useRef(0);

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function updateScaleAndPosition() {
        slidesRef.current.forEach((slide) => {
            const rect = slide.getBoundingClientRect();
            const centerPosition = (rect.left + rect.right) / 2;
            const distanceFromCenter = centerPosition - window.innerWidth / 2;

            let scale, offsetX;
            if (distanceFromCenter > 0) {
                scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth);
                offsetX = (scale - 1) * 300;
            } else {
                scale = Math.max(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth);
                offsetX = 0;
            }

            gsap.set(slide, { scale: scale, x: offsetX });
        });
    }

    function update() {
        current = lerp(current, target, ease);

        gsap.set(sliderWrapperRef.current, {
            x: -current,
        });

        updateScaleAndPosition();

        requestAnimationFrame(update);
    }

    useEffect(() => {
        maxScroll.current = sliderWrapperRef.current.offsetWidth - window.innerWidth;

        window.addEventListener("resize", () => {
            maxScroll.current = sliderWrapperRef.current.offsetWidth - window.innerWidth;
        });

        window.addEventListener("wheel", (e) => {
            target += e.deltaY;
            target = Math.max(0, target);
            target = Math.min(maxScroll.current, target);
        });

        update();

        return () => {
            window.removeEventListener("resize", () => {
                maxScroll.current = sliderWrapperRef.current.offsetWidth - window.innerWidth;
            });
            window.removeEventListener("wheel", (e) => {
                target += e.deltaY;
                target = Math.max(0, target);
                target = Math.min(maxScroll.current, target);
            });
        };
    }, []);

    return (
        <div className="slider" ref={sliderRef}>
            <div className="slider-wrapper" ref={sliderWrapperRef}>
                {IMAGES.map((item, idx) => (
                    <div
                        className="slide"
                        key={idx}
                        ref={(el) => (slidesRef.current[idx] = el)}
                    >
                        <img src={item} alt={`slide-${idx}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Temp;
