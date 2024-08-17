"use client"

import React, { useEffect } from 'react'
import './style.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { stagger } from 'framer-motion'

const Learning8 = () => {

    useEffect(() => {

        const lenis = new Lenis()


        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)


        let t1 = gsap.timeline({ delay: 0 })

        t1.to(".col", {
            top: 0,
            duration: 3,
            ease: "power4.inOut"
        })

        t1.to(".c-1 .item", {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: "power4.inOut"
        }, "-=2")


        t1.to(".c-2 .item", {
            top: 0,
            stagger: -0.25,
            duration: 3,
            ease: "power4.inOut"
        }, "-=4")

        t1.to(".c-3 .item", {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: "power4.inOut"
        }, "-=4")

        t1.to(".c-4 .item", {
            top: 0,
            stagger: -0.25,
            duration: 3,
            ease: "power4.inOut"
        }, "-=4")

        t1.to(".c-5 .item", {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: "power4.inOut"
        }, "-=4")


        t1.to(".container", {
            scale: 6,
            duration: 4,
            ease: "power4.inOut"
        }, "-=2")

        t1.to(".nav-item a , .title p , .slide-num p , .preview img", {
            top: 0,
            stagger: 0.075,
            duration: 1,
            ease: "power3.out"
        }, "-=1.5")
    }, [])

    return (
        <div className='w-[100vw] h-[100vh] overflow-hidden bg-[#141414]'>
            <div className="container">
                <div className="col c-1">
                    {
                        IMAGES.map((item, idx) => (
                            <div key={idx} className='item'>
                                <img src={item} alt="image" />
                            </div>
                        ))
                    }
                </div>

                <div className="col c-2">
                    {
                        IMAGES.map((item, idx) => (
                            <div key={idx} className='item'>
                                <img src={item} alt="image" />
                            </div>
                        ))
                    }
                </div>

                <div className="col c-3">
                    {
                        IMAGES.map((item, idx) => (
                            <div key={idx} className='item'>
                                <img src={item} alt="image" />
                            </div>
                        ))
                    }
                </div>

                <div className="col c-4">
                    {
                        IMAGES.map((item, idx) => (
                            <div key={idx} className='item'>
                                <img src={item} alt="image" />
                            </div>
                        ))
                    }
                </div>

                <div className="col c-5">
                    {
                        IMAGES.map((item, idx) => (
                            <div key={idx} className='item'>
                                <img src={item} alt="image" />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="content">
                <nav>
                    <div className="nav-item">
                        <a href="#" id='active'>Work</a>
                    </div>
                    <div className="nav-item">
                        <a href="#" id='active'>About</a>
                    </div>
                </nav>

                <div className="hero">
                    <div className="title">Lorem ipsum dolor sit amet.</div>
                </div>

                <footer>
                    <div className="preview">
                        {
                            IMAGES2.map((item, idx) => (
                                <img
                                    src={item}
                                    alt="image"
                                    key={idx}
                                />
                            ))
                        }
                    </div>

                    <div className="slide-num"> <p> 1 &mdash; 3 </p> </div>
                </footer>
            </div>
        </div>
    )
}

export default Learning8


const IMAGES = [
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const IMAGES2 = [
    'https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6357183/pexels-photo-6357183.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5780744/pexels-photo-5780744.jpeg?auto=compress&cs=tinysrgb&w=600',
]