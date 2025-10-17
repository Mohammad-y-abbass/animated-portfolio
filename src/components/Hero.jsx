/* eslint-disable tailwindcss/no-custom-classname */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(".hero-heading", {
      opacity: 0,
      y: 80,
      stagger: 0.3,
    })
      .from(
        ".hero-text",
        {
          opacity: 0,
          y: 30,
        },
        "-=0.6"
      )
      .from(
        ".hero-icons a",
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          <b>a</b>bb<b>a</b>s
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              moh<b>a</b>mm<b>a</b>d
            </h1>

            <p className="hero-text mb-5 max-w-80 text-justify font-robert-regular text-sm text-blue-100">
              I build things for the web — from pixel to logic, front to back.
              React, Next.js, Node.js and Spring Boot are my tools, but
              creativity is what drives me. I’m currently exploring Machine
              Learning, blending logic with curiosity to create software that
              doesn’t just work — it thinks.
            </p>

            <div className="hero-icons mt-8 flex items-center gap-6 text-white">
              <a
                href="mailto:mhmd.y.abbass@gmail.com"
                aria-label="Email"
                className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
                target="_blank"
              >
                <MdEmail className="size-7" />
              </a>
              <a
                href="https://github.com/Mohammad-y-abbass/"
                aria-label="GitHub"
                className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
                rel="noreferrer"
                target="_blank"
              >
                <FaGithub className="size-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammad-abbass/"
                aria-label="LinkedIn"
                className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
                rel="noreferrer"
                target="_blank"
              >
                <FaLinkedin className="size-7" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>a</b>bb<b>a</b>s
      </h1>
    </div>
  );
};

export default Hero;
