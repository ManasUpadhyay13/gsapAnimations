"use client"

import Image from "next/image";
import Hero from "./learning3/components/Hero";
import Loader from "./learning3/components/Loader";
import { useLayoutEffect, useState } from "react";
import gsap from "gsap";

export default function Home() {

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
