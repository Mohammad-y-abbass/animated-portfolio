import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { BiSolidShow } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  title,
  description,
  bgColor,
  textColor,
  tools = [],
  preview,
  code,
  documentation,
}) => {
  return (
    <div className="relative size-full" style={{ background: bgColor }}>
      <div
        className="relative z-10 flex size-full flex-col justify-between p-5"
        style={{ color: textColor }}
      >
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="mt-2 font-circular-web text-sm"
            />
          )}

          {tools.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-80">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-1">
                {tools.map((tool, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/30 bg-white/20 px-2 py-1 text-xs backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noreferrer"
              className="cursor-none"
            >
              <Button title="Preview" leftIcon={<BiSolidShow />} />
            </a>
          )}

          {/* Code button: open when `code` exists; otherwise show locked button with tooltip */}
          {code ? (
            <a
              href={code}
              target="_blank"
              rel="noreferrer"
              className="cursor-none"
            >
              <Button title="Code" leftIcon={<FaCode />} />
            </a>
          ) : (
            <span className="group relative inline-block">
              <Button
                title="Code"
                leftIcon={<FaCode />}
                containerClass="cursor-not-allowed opacity-60"
                onClick={() => {}}
              />

              <span className="absolute bottom-full left-1/2 mb-2 hidden min-w-max -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
                Code is private
              </span>
            </span>
          )}

          {documentation && (
            <a
              href={documentation}
              target="_blank"
              rel="noreferrer"
              className="cursor-none"
            >
              <Button title="Documentation" leftIcon={<IoIosDocument />} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(
      ".bento-tilt_1, .bento-tilt_2"
    );

    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0; // assuming grid cols are 2: even index -> left, odd -> right

      gsap.fromTo(
        card,
        { x: isLeft ? -80 : 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const projects = [
    {
      title: "Programming Language",
      description:
        "This project started with a simple question that turned into an obsession: how are programming languages actually made?<br/>For my graduation project, I set out to build a fully custom, dynamically typed language with its own grammar, parser, and transpiler. Using Nearley.js, I generated an AST to interpret user-defined syntax and translate it into optimized JavaScript for Node.js.<br/>It wasn’t built for public use. It was an experiment driven purely by curiosity and passion for understanding the craft behind the tools we use every day.",
      bgColor: "#c084fc",
      textColor: "#5b21b6",
      tools: ["JavaScript", "Nearley.js", "Node.js"],
      className: "bento-tilt_1 me-14 md:col-span-1 md:me-0",
      code: "https://github.com/Mohammad-y-abbass/mo-programming-language",
      documentation:
        "https://github.com/Mohammad-y-abbass/mo-programming-language?tab=readme-ov-file#mo-language-documentation",
    },
    {
      title: "Places4Students",
      description: `
  Places4Students is a leading off campus housing marketplace that connects students, schools, and landlords with rental listings tailored to academic communities.<br/>
  The platform powers housing discovery across more than 245 North American college and university campuses, offering tools for students to search listings, find roommates, and explore housing near their campus.<br/>
`,
      bgColor: "#fdba74",
      textColor: "#9a3412",
      tools: [
        "Next.js",
        "TypeScript",
        "Shadcn UI",
        "Tailwind CSS",
        "Google Maps",
      ],
      className: "bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0",
      preview: "https://places4students.com/",
    },
    {
      title: "DevPire",
      description: `
    DevPire is a platform that shares programming courses and coupons, remote tech job listings, tech news, blogs, and curated GitHub repositories.<br/>
    The website aims to help developers stay up to date, discover learning resources, and explore trending projects in the tech ecosystem.<br/>
    Note: This website is still in development.
  `,
      bgColor: "#bfdbfe",
      textColor: "#1e40af",
      tools: [
        "Next.js",
        "Spring Boot",
        "MySQL",
        "Tailwind CSS",
        "TypeScript",
        "Shadcn UI",
        "Python",
        "Web Scraping",
      ],
      className: "bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0",
      preview: "https://coursenator.vercel.app/",
    },
    {
      title: "Rapid Express",
      description: `
    Rapid Express is a globally installed CLI tool that automates Express.js app scaffolding, allowing developers to generate production-ready APIs with a single command.<br/>
    I architected a scalable folder structure with decorators, middleware, and robust error handling to streamline project setup.<br/>
    This tool reduces initial setup time by over 70% and was published on npm, reaching 1,200+ downloads, becoming a valuable resource for developers seeking speed and consistency.
  `,
      bgColor: "#c4b5fd",
      textColor: "#5b21b6",
      tools: ["Node.js", "Express.js", "npm", "Typescript"],
      className: "bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0",
      code: "https://github.com/Mohammad-y-abbass/rapid-express",
      documentation:
        "https://www.npmjs.com/package/@mohammad-abbass/rapid-express",
    },
    {
      title: "React Image Component",
      description: `
    Created react-img-component, a lightweight and high-performance React library for efficient lazy loading of images using the Intersection Observer API.<br/>
    Implemented customizable placeholders and flexible loading strategies to enhance perceived performance and reduce layout shifts (CLS), improving both user experience and SEO.<br/>
    Designed as a compact, dependency-free solution, it allows React developers to easily optimize image loading across applications.
  `,
      bgColor: "#93c5fd",
      textColor: "#1e3a8a",
      tools: ["React", "TypeScript", "npm"],
      className: "bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0",
      code: "https://github.com/Mohammad-y-abbass/react-img-component",
      documentation: "https://www.npmjs.com/package/react-img-component",
    },
    {
      title: "React CLI",
      description: `
    Developed a high-performance CLI tool in Go to scaffold new React projects, inspired by Angular CLI.<br/>
    It supports optional integrations such as TypeScript, React Router, and Tailwind CSS, and includes custom commands for component generation and project structure management.<br/>
    The tool improves developer workflow efficiency, reducing repetitive setup tasks and streamlining project initialization.<br/>
    Note: This CLI is still in development.
  `,
      bgColor: "#fef3c7",
      textColor: "#92400e",
      tools: ["Go", "React", "TypeScript", "React Router", "Tailwind CSS"],
      className: "bento-tilt_1 me-14 md:col-span-1 md:me-0",
      code: "https://github.com/Mohammad-y-abbass/react-cli",
    },
  ];

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Projects That Shaped My Journey
          </p>
          <p className="max-w-md font-circular-web text-sm text-blue-50 opacity-50">
            During my college years and professional experience, I’ve built
            numerous projects that challenged me to think deeper, learn faster,
            and create with purpose. Each project taught me something new — and
            together, they shaped the developer I am today.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid w-full grid-cols-2 grid-rows-3 gap-7"
        >
          {projects.map((project, index) => (
            <BentoTilt key={index} className={project.className}>
              <BentoCard {...project} />
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
