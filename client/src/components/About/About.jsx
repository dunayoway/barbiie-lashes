import React from "react";
import "./About.css";
import assets from "../../assets/assets";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container flex flex-col justify-center lg:flex-row gap-16 lg:gap-0 py-20 xl:w-[75%] mx-auto">
          <div className="basis-full">
            <img
              className="max-w-full lg:max-w-[450px] lg:max-h-[450px] xl:max-w-full aspect-square"
              src={assets.aboutImg}
              alt="Neat and well-separated eyelash extension procedure"
            />
          </div>
          <div className="basis-full">
            <h2 className="about__title text-[1.8rem] font-bold bg-[#F8BBD050] text-[#943e4b] inline-block px-[8px] py-4px rounded-[2px] mb-[15px]">
              ABOUT US
            </h2>
            <h3 className="about__subtitle text-[3rem] lg:text-[3.5rem] leading-[1.2] font-extrabold mb-[20px]">
              Where Beauty Meets Confidence
            </h3>
            <p className="about__text text-[#33333395] text-[1.6rem] border-l border-[#943e4b] pl-[2rem] my-[20px]">
              Founded with a passion for precision and artistry, we take pride
              in offering a carefully curated collection of lashes that suit
              every style, from soft and subtle to bold and glamorous. Each lash
              is crafted with the finest materials, ensuring comfort,
              durability, and effortless application, so you can feel your best
              whether you're conquering your day or dazzling at night. <br />
              Barbiie Lashes isn't just about enhancing your look; it's about
              celebrating your unique essence. We are dedicated to helping you
              feel empowered, beautiful, and unapologetically you with every
              lash we create.
            </p>
          </div>
        </div>
        <div className="container">
          <hr className="outline-0 border border-[#F7E7CE50]" />
        </div>
      </section>
    </>
  );
};

export default About;
