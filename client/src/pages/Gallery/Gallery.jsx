import React, { useEffect } from "react";
import "./Gallery.css";
import lightbox from "lightbox2";
import "lightbox2/dist/css/lightbox.min.css";
import assets from "../../assets/assets";
import OpenHours from "../../components/OpenHours/OpenHours";

const Gallery = () => {
  useEffect(() => {
    // Initialize lightbox2
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      disableScrolling: true,
    });
  }, []);

  return (
    <>
      <section className="gallery-intro">
        <div className="container max-w-[900px] mx-auto">
          <h1 className="title">Our Stunning Creations</h1>
          <p className="text">
            Explore our gallery to see the artistry and beauty of Barbiie
            Lashes. From elegant classics to bold designs, each set is crafted
            to enhance your unique style. Get inspired and envision your next
            look!
          </p>
        </div>
      </section>
      <div className="container my-20">
        <hr className="outline-0 border border-[#F7E7CE50]" />
      </div>
      <section className="container">
        <div className="gallery_grid">
          <a
            href={assets.gallery1}
            data-lightbox="models"
            data-title="Caption1"
          >
            <img src={assets.gallery1} />
          </a>
          <a
            href={assets.gallery2}
            data-lightbox="models"
            data-title="Caption2"
          >
            <img src={assets.gallery2} />
          </a>
          <a
            href={assets.gallery3}
            data-lightbox="models"
            data-title="Caption3"
          >
            <img src={assets.gallery3} />
          </a>
          <a
            href={assets.gallery4}
            data-lightbox="models"
            data-title="Caption4"
          >
            <img src={assets.gallery4} />
          </a>
          <a
            href={assets.gallery5}
            data-lightbox="models"
            data-title="Caption5"
          >
            <img src={assets.gallery5} />
          </a>
          <a
            href={assets.gallery6}
            data-lightbox="models"
            data-title="Caption6"
          >
            <img src={assets.gallery6} />
          </a>
          <a
            href={assets.gallery7}
            data-lightbox="models"
            data-title="Caption7"
          >
            <img src={assets.gallery7} />
          </a>
          <a
            href={assets.gallery8}
            data-lightbox="models"
            data-title="Caption7"
          >
            <img src={assets.gallery8} />
          </a>
        </div>
      </section>

      <OpenHours />
    </>
  );
};

export default Gallery;
