import AnimatedTitle from "./AnimatedTitle";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-screen w-screen  px-10">
      <div className="relative h-screen rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.png"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.png"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute left-20 top-1/2 w-60 md:left-auto md:right-10 lg:w-80">
          <ImageClipBox
            src="/img/contact-3.png"
            clipClass="contact-clip-path-3"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era t<b>o</b>gether"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <div className="mt-8 flex items-center gap-6">
            <a
              href="#"
              aria-label="Email"
              className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
            >
              <MdEmail className="size-7" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
              rel="noreferrer"
            >
              <FaGithub className="size-7" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="cursor-none transition-transform hover:scale-110 hover:text-blue-300"
              rel="noreferrer"
            >
              <FaLinkedin className="size-7" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
