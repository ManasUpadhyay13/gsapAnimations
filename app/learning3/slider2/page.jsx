"use client";

import React, { useEffect, useRef, useState } from 'react';
import './slider.css';
import gsap from 'gsap';

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

const Slider2 = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [isGalleryOpen, setGalleryOpen] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const items = itemRefs.current;
        const numberOfItems = items.length;
        const angleIncrement = (2 * Math.PI) / numberOfItems;
        const radius = 300;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        const t1 = gsap.timeline();

        items.forEach((item, index) => {
            const img = document.createElement('img');
            img.src = IMAGES[index];
            item.appendChild(img);

            const angle = index * angleIncrement;
            const initialRotation = (angle * 180) / Math.PI - 90;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            gsap.set(item, { scale: 0 });

            t1.to(
                item,
                {
                    left: `${x}px`,
                    top: `${y}px`,
                    rotation: initialRotation,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out',
                    delay: 1,
                },
                index * 0.1
            );

            const handleItemClick = () => {
                if (!isGalleryOpen) {
                    setGalleryOpen(true);

                    const duplicate = item.cloneNode(true);
                    duplicate.style.position = 'absolute';
                    container.appendChild(duplicate);

                    gsap.to(items.filter((i) => i !== item), {
                        scale: 0,
                        duration: 0.5,
                        ease: 'power2.in',
                        stagger: 0.05,
                    });

                    const endRotation =
                        initialRotation > 180 ? initialRotation - 360 : initialRotation;

                    gsap.to([item, duplicate], {
                        rotation: endRotation,
                        duration: 0.0001,
                        onComplete: function () {
                            gsap.to([item, duplicate], {
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%) scale(5)',
                                duration: 1,
                                ease: 'power2.out',
                                delay: 1.25,
                            });
                        },
                    });

                    const closeGallery = () => {
                        if (isGalleryOpen) {
                            gsap.to([item, duplicate], {
                                left: `${x}px`,
                                top: `${y}px`,
                                scale: 1,
                                rotation: initialRotation,
                                duration: 1,
                                ease: 'power2.out',
                                onComplete: function () {
                                    duplicate.remove();
                                    gsap.to(items, {
                                        scale: 1,
                                        duration: 1,
                                        stagger: 0.05,
                                        ease: 'power2.out',
                                    });
                                    setGalleryOpen(false);
                                },
                            });
                        }
                    };

                    item.addEventListener('click', closeGallery);
                    duplicate.addEventListener('click', closeGallery);

                    return () => {
                        item.removeEventListener('click', closeGallery);
                        duplicate.removeEventListener('click', closeGallery);
                    };
                }
            };

            item.addEventListener('click', handleItemClick);

            return () => {
                item.removeEventListener('click', handleItemClick);
            };
        });
    }, [isGalleryOpen]);

    return (
        <div className="container" ref={containerRef}>
            <div className="gallery">
                {IMAGES.map((_, index) => (
                    <div
                        key={index}
                        className="item"
                        ref={(el) => (itemRefs.current[index] = el)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider2;
