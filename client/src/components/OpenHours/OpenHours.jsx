import React from "react";
import { Link } from "react-router-dom";

const OpenHours = () => {
  return (
    <>
      {/* Open hours section starts here */}
      <section className="open-hours py-[100px] text-[#333333]">
        <div className="container bg-[#F7E7CE] p-[20px] text-[1.6rem] shadow-lg">
          <div className="md:w-[60%] lg:w-[50%]">
            <h2 className="about__title text-[1.8rem] font-bold bg-[#F8BBD050] text-[#943e4b] inline-block px-[8px] py-4px rounded-[2px] mb-[15px]">
              OPEN HOURS
            </h2>
            <p className="mb-8">
              Our operation hours are designed to provide you with the
              flexibility to visit us at your convenience. Whether you're
              looking for a quick touch-up or a full lash transformation, we’re
              here to make your experience enjoyable and relaxing. We look
              forward to seeing you soon!
            </p>
            <ul className="mb-8">
              <li className="leading-[2]">
                <span className="pr-5">
                  <i className="fa-regular fa-circle text-[#943E4B]"></i>
                </span>{" "}
                Monday - Friday | 2:30 PM - 7:00 PM
              </li>
              <li className="leading-[2]">
                <span className="pr-5">
                  <i className="fa-regular fa-circle text-[#943E4B]"></i>
                </span>{" "}
                Saturday | 9:00 AM - 7:00 PM
              </li>
              <li className="leading-[2]">
                <span className="pr-5">
                  <i className="fa-regular fa-circle text-[#943E4B]"></i>
                </span>{" "}
                Sunday | 12:00 PM - 5:00 PM
              </li>
            </ul>
            <Link
              to="/#booking"
              className="nav-btn rounded-[2px] py-[10px] px-[10px] text-[1.8rem] inline-block"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
      {/* Open hours section ends here */}
    </>
  );
};

export default OpenHours;
