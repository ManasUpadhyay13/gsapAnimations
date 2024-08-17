"use client";

import React, { useEffect } from 'react';
import './style.css';
import gsap from 'gsap';
import { CustomEase, Flip, ScrollToPlugin } from 'gsap/all';
import Lenis from 'lenis'

const IMAGES = [
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    "https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600",
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg?auto=compress&cs=tinysrgb&w=600',
];

gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin);

CustomEase.create(
    "hop",
    "M0,0 C0.028,0.528 0.129,0.74 0.27,0.852 0.415,0.967 0.499,1 1,1"
);

const Page = () => {

    useEffect(() => {

        const lenis = new Lenis()


        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        const items = document.querySelectorAll("nav .nav-item p");
        const gallery = document.querySelector(".gallery");
        const galleryContainer = document.querySelector(".gallery-container");
        const imgPreviews = document.querySelector(".img-previews");
        const minimap: any = document.querySelector(".minimap");

        let activeLayout = "layout-1-gallery";

        function switchLayout(newLayout: any) {
            if (newLayout === activeLayout) return;

            if (activeLayout === "layout-2-gallery" && window.scrollY > 0) {
                gsap.to(window, {
                    scrollTo: { y: 0 },
                    duration: 0.5,
                    ease: "power3.out",
                    onComplete: () => switchLayoutHandler(newLayout),
                });
            } else {
                switchLayoutHandler(newLayout);
            }
        }

        function switchLayoutHandler(newLayout: any) {
            const state = Flip.getState(gallery?.querySelectorAll(".img") || "");

            gallery?.classList.remove(activeLayout);
            gallery?.classList.add(newLayout);

            let staggerValue = 0.025;
            if (
                (activeLayout === "layout-1-gallery" && newLayout === "layout-2-gallery") ||
                (activeLayout === "layout-3-gallery" && newLayout === "layout-2-gallery")
            ) {
                staggerValue = 0;
            }
            Flip.from(state, {
                duration: 1.5,
                ease: "hop",
                stagger: staggerValue,
            });

            activeLayout = newLayout;

            if (newLayout === "layout-2-gallery") {
                gsap.to([imgPreviews, minimap], {
                    autoAlpha: 1,
                    duration: 0.3,
                    delay: 0.5,
                });
                window.addEventListener("scroll", handleScroll);
            } else {
                gsap.to([imgPreviews, minimap], {
                    autoAlpha: 0,
                    duration: 0.3,
                });
                window.removeEventListener("scroll", handleScroll);
                gsap.set(gallery, { clearProps: "y" });
                gsap.set(minimap, { clearProps: "y" });
            }

            items.forEach((item) => {
                item.classList.toggle("active", item.id === newLayout);
            });
        }

        items.forEach((item) => {
            item.addEventListener("click", () => {
                if (!item.id) return;
                const newLayout = item.id;
                switchLayout(newLayout);
            });
        });

        function handleScroll() {
            if (activeLayout !== "layout-2-gallery") return;

            const imgPreviewsHeight: any = imgPreviews?.scrollHeight;
            const galleryHeight: any = gallery?.scrollHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const scrollFraction = scrollY / (imgPreviewsHeight - windowHeight);
            const galleryTranslateY = -scrollFraction * (galleryHeight - windowHeight) * 1.525;
            const minimapTranslateY = scrollFraction * (windowHeight - minimap?.offsetHeight) * 0.425;

            gsap.to(gallery, {
                y: galleryTranslateY,
                ease: "none",
                duration: 0.1,
            });

            gsap.to(minimap, {
                y: minimapTranslateY,
                ease: "none",
                duration: 0.1,
            });
        }

        if (activeLayout === "layout-2-gallery") {
            handleScroll();
        }

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            items.forEach((item) => {
                item.removeEventListener("click", switchLayout);
            });
        };
    }, []);

    return (
        <div className='learn-container'>
            <nav>
                <div className="nav-item">
                    <p>Manas</p>
                </div>

                <div className="nav-item">
                    <p id='layout-1-gallery'>01</p>
                </div>

                <div className="nav-item">
                    <p id='layout-2-gallery'>02</p>
                </div>

                <div className="nav-item">
                    <p id='layout-3-gallery'>03</p>
                </div>

                <div className="nav-item">
                    <p>Menu</p>
                </div>

            </nav>

            <div className="gallery-container">
                <div className="gallery layout-1-gallery">
                    {IMAGES.map((item, idx) => (
                        <div className="img" id={`img${idx + 1}`} key={idx}>
                            <img src={item} alt="image" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="minimap"></div>

            <div className="img-previews">
                {IMAGES.map((item, idx) => (
                    <img src={item} key={idx} alt="image" />
                ))}
            </div>
        </div>
    );
}

export default Page;
