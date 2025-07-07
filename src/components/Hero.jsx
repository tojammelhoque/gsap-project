// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import SplitText from "gsap/SplitText";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import React, { useRef } from "react";

// gsap.registerPlugin(SplitText, ScrollTrigger);

// function Hero() {
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const leftLeafRef = useRef(null);
//   const rightLeafRef = useRef(null);

//   useGSAP(() => {
//     // SplitText Animations
//     const heroSplit = new SplitText(titleRef.current, {
//       type: "chars,words",
//     });

//     const paragraphSplit = new SplitText(subtitleRef.current, {
//       type: "lines",
//     });

//     heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

//     gsap.from(heroSplit.chars, {
//       yPercent: 100,
//       duration: 1.8,
//       ease: "expo.out",
//       stagger: 0.05,
//     });

//     gsap.from(paragraphSplit.lines, {
//       yPercent: 100,
//       duration: 1.8,
//       ease: "expo.out",
//       stagger: 0.05,
//       delay: 1,
//     });

//     // Leaf Scroll Animation
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: "#hero",
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         },
//       })
//       .to(
//         rightLeafRef.current,
//         {
//           xPercent: 100,
//           y: 200,
//           ease: "none",
//         },
//         0
//       )
//       .to(
//         leftLeafRef.current,
//         {
//           y: -200,
//           ease: "none",
//         },
//         0
//       );
//   }, []);

//   return (
//     <section id="hero" className="noisy">
//       <h1 ref={titleRef} className="title">
//         MOJITO
//       </h1>
//       <img
//         ref={leftLeafRef}
//         src="/images/hero-left-leaf.png"
//         alt="left leaf"
//         className="left-leaf"
//       />
//       <img
//         ref={rightLeafRef}
//         src="/images/hero-right-leaf.png"
//         alt="right leaf"
//         className="right-leaf"
//       />
//       <div className="body">
//         <div className="content">
//           <div className="space-y-5 hidden md:block">
//             <p ref={subtitleRef}> Cool. Crisp. Classic.</p>
//             <p ref={subtitleRef} className="subtitle">
//               Sip the Spirit
//               <br /> of the Summer
//             </p>
//           </div>
//           <div className="view-cocktails">
//             <p ref={subtitleRef} className="subtitle">
//               Every cocktail on our menu is a blend of premium ingredients,
//               creative flair, and timeless recipes — designed to delight your
//               senses.
//             </p>
//             <a href="#cocktails">View Cocktails</a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, {  useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitle1Ref = useRef(null);
  const subtitle2Ref = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const arrowRef = useRef(null);
  const videoRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(titleRef.current, {
      type: "chars,words",
    });

    const paragraphSplit1 = new SplitText(subtitle1Ref.current, {
      type: "lines",
    });

    const paragraphSplit2 = new SplitText(subtitle2Ref.current, {
      type: "lines",
    });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit1.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(paragraphSplit2.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1.5,
    });

    // Scroll-triggered parallax animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(rightLeafRef.current, { y: 200 }, 0)
      .to(leftLeafRef.current, { y: -200 }, 0)
      .to(arrowRef.current, { y: 100 }, 0);

    // Scroll-driven video playback
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: videoRef.current,
              start: startValue,
              end: endValue,
              scrub: true,
              pin: true,
            },
          })
          .to(videoRef.current, {
            currentTime: videoRef.current.duration,
          });
      };
    }
  }, [isMobile]);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 ref={titleRef} className="title">
          MOJITO
        </h1>

        <img
          ref={leftLeafRef}
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          ref={rightLeafRef}
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <img
            ref={arrowRef}
            src="/images/arrow.png"
            alt="arrow"
            className="arrow"
          />

          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p ref={subtitle1Ref} className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p ref={subtitle2Ref} className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
