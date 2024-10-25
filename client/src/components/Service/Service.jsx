import React from "react";
import "./Service.css";
import assets from "../../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Service = () => {
  const slides = [
    {
      img: assets.serviceImg1,
      title: "",
      description: "",
    },
    {
      img: assets.serviceImg2,
      title: "Lash Lift",
      description:
        "Elevate your natural lashes with a lash lift, creating beautiful, curled lashes that last for weeks.",
    },
    {
      img: assets.serviceImg3,
      title: "Microblading",
      description:
        "Obtain beautifully shaped brows with this semi-permanent technique that creates realistic hair-like strokes.",
    },
    {
      img: assets.serviceImg4,
      title: "Brow Sculpting",
      description:
        "Achieve perfectly shaped brows with our expert brow sculpting and tinting services to complement your lashes.",
    },
    {
      img: assets.serviceImg5,
      title: "Brow Tinting",
      description:
        "Enhance your eyebrows with brow tinting, adding depth and color for a fuller, more defined look.",
    },
    {
      img: assets.serviceImg6,
      title: "Lash Extensions",
      description:
        "Transform your eyes with lash extensions, providing length and volume for a captivating appearance.",
    },
  ];

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section id="service" className="service text-center">
        <h2 className="about__title text-[1.8rem] font-bold bg-[#F8BBD050] text-[#943e4b] inline-block px-[8px] py-4px rounded-[2px] mb-[15px]">
          OUR SERVICE
        </h2>
        <h3 className="about__subtitle text-[3rem] lg:text-[3.5rem] leading-[1.2] font-extrabold mb-[20px]">
          Enhancing Your Beauty, One Lash at a Time
        </h3>

        <div className="w-full pt-4 pb-16">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full h-[350px] md:h-[300px] lg:h-[275px] relative mb-[10px]"
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(33, 30, 28, 0.5), rgba(33, 30, 28, 0.5)), url(${slide.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 100 + "%",
                  }}
                >
                  <div className="w-[80%] absolute bottom-[5px] left-[50%] translate-x-[-50%] text-[#FAF9F6]">
                    <h4 className="text-[2.1rem] leading-[1.6] font-[Poppins]">
                      {slide.title}
                    </h4>
                    <p className="text-[1.4rem] leading-[1.2] ">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Service;
