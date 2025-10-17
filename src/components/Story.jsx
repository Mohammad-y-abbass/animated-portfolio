import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const FloatingImage = () => {
  const skillsContainerRef = useRef(null);
  const skillsRef = useRef([]);
  const sectionRef = useRef(null);

  const skillsCategories = [
    {
      category: "Programming Languages",
      skills: [
        "JavaScript",
        "TypeScript",
        "C",
        "C#",
        "Java",
        "Python",
        "Go",
        "PHP",
        "SQL",
        "NoSQL",
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "React.js",
        "Next.js",
        "Angular",
        "Express.js",
        "Nest.js",
        "Springboot",
        "Laravel",
        "Tailwind",
        "Jest",
      ],
    },
    {
      category: "Databases & ORMs",
      skills: ["Postgres", "MySQL", "MongoDB", "Prisma", "Hibernate"],
    },
    {
      category: "Tools & Environment",
      skills: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Docker",
        "Selenium",
        "Node.js",
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate categories entrance
      gsap.fromTo(
        ".category-section",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger animation for skills with ScrollTrigger
      gsap.fromTo(
        skillsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.1,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, skillsContainerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div
        ref={sectionRef}
        className="flex size-full flex-col items-center py-10 pb-24"
      >
        <div className="relative size-full">
          <AnimatedTitle
            title="skills th<b>a</b>t <br /> drive innov<b>a</b>tion"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
        </div>

        {/* Structured Skills Grid */}
        <div
          ref={skillsContainerRef}
          className="relative mx-auto mt-20 w-full max-w-6xl px-4"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {skillsCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="text-center">
                <h3 className="mb-6 text-lg font-semibold text-blue-400">
                  {category.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      ref={addToRefs}
                      className="rounded-lg border border-blue-300/30 bg-blue-500/20 px-4 py-3 text-xs font-medium text-blue-300 backdrop-blur-sm "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
