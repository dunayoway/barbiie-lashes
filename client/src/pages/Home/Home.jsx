import React, { useEffect, useState } from "react";
import "./Home.css";
import About from "../../components/About/About";
import Service from "../../components/Service/Service";
import axios from "axios";
import assets from "../../assets/assets";
import { useLocation } from "react-router-dom";
import OpenHours from "../../components/OpenHours/OpenHours";

const Home = () => {
  const { hash } = useLocation();
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [inputType, setInputType] = useState("text");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("15:00");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/prices")
      .then((response) => {
        const data = response.data;
        setServices(data);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    const videoElement = document.querySelector(".video-element");
    if (window.innerWidth > 1024) {
      videoElement.setAttribute("autoplay", true);
      videoElement.play();
    }
    // Fetch service prices when the component mounts
    axios
      .get("https://barbiie-lashes-server.onrender.com/api/prices")
      .then((response) => {
        const data = response.data;
        setServices(data);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);
  
  useEffect(() => {
    const videoElement = document.querySelector(".video-element");
    if (window.innerWidth > 1024) {
      videoElement.setAttribute("autoplay", true);
      videoElement.play();
    }
  }, []);

  // Fuction to initialize payment
  const initiatePayment = async () => {
    const email = `${phone}@barbiie.biz`;
    const amount = selectedPrice;

    try {
      const response = await axios.post(
        "https://barbiie-lashes-server.onrender.com/api/payment/initialize",
        {
          amount,
          email,
          name,
          phone,
          date,
          time,
          selectedService,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.data.data;

      if (data && data.authorization_url) {
        const paystack = PaystackPop.setup({
          key: paystackPublicKey,
          email,
          amount,
          onClose: () => {
            console.log("Payment window closed.");
          },
          callback: (response) => {
            verifyPayment(response.reference);
          },
        });
        paystack.openIframe();
      }
    } catch (error) {
      console.error("Error initializing payment:", error.message);
    }
  };

  // Fuction to verify payment status
  const verifyPayment = async (reference) => {
    try {
      const response = await axios.get(
        `https://barbiie-lashes-server.onrender.com/api/payment/verify/${reference}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response.data;

      if (
        data.message === "Payment verified and appointment booked successfully."
      ) {
        window.location.href = data.whatsappPrompt;
      }
    } catch (error) {
      console.error("Error verifying payment:", error.message);
    }
  };

  const validateName = () => {
    if (!name.trim() || name.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required!" }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: <i className="fas fa-check-circle"></i>,
    }));
    return true;
  };

  const validatePhone = () => {
    if (!phone || phone.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number is required!",
      }));
      return false;
    }
    if (phone.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter at least 11 digits!",
      }));
      return false;
    }
    if (!phone.match(/^[0-9]{10,}$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Only digits please!",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: <i className="fas fa-check-circle"></i>,
    }));
    return true;
  };

  const handleDateFocus = () => {
    setInputType("date");
  };

  const validateDate = () => {
    if (!date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "Date is required!" }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: "",
    }));
    return true;
  };

  const validateTime = () => {
    if (!time) {
      setErrors((prevErrors) => ({ ...prevErrors, time: "Time is required!" }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      time: "",
    }));
    return true;
  };

  const selectService = (e) => {
    const serviceName = e.target.value;
    const service = services.find((s) => s.name === serviceName);

    if (service) {
      setSelectedService(serviceName);
      setSelectedPrice(service.price);
    } else {
      setSelectedService(null);
      setSelectedPrice(null);
    }
  };

  const validateService = () => {
    if (!selectedService) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        service: "Service is required!",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      service: "",
    }));
    return true;
  };

  const validateForm = () => {
    if (
      !validateName() ||
      !validatePhone() ||
      !validateDate() ||
      !validateTime() ||
      !validateService()
    ) {
      setSubmitError("Enter required fields to submit!");
      setTimeout(() => {
        setSubmitError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      initiatePayment();
    }
  };

  return (
    <>
      {/* Hero Start */}
      <section className="hero">
        <div className="container">
          <div>
            <div>
              <p className="mb-8">Elevate Your Beauty With</p>
              <h1 className="hero__title">Barbiie Lashes</h1>
            </div>
            <p className="hero__text">
              <b>Step into a world of luxury and confidence</b> with lashes
              designed to enhance your natural beauty. At{" "}
              <strong>Barbiie Lashes</strong>, we believe{" "}
              <em>every blink should make a statement</em>. Whether you’re
              looking for <b>bold drama</b> or <em>subtle elegance</em>, our
              premium lash collection is crafted to give you the perfect look
              for any occasion.
              <br />
              Experience the <em>art of beauty, redefined</em>.
            </p>
            <a href="#booking" className="hero__btn">
              Make Appointment
            </a>
          </div>
        </div>
      </section>
      {/* Hero End */}

      <About />
      <Service />

      {/* Appointment section starts here */}
      <div className="h-[120px] w-full bg-[#F7E7CE]"></div>
      <section id="booking" className="booking text-center py-20 mt-[-120px]">
        <h2 className="about__title text-[1.8rem] font-bold bg-[#F8BBD050] text-[#943e4b] inline-block px-[8px] py-4px rounded-[2px] mb-[15px]">
          BOOKING
        </h2>
        <div className="container lg:flex justify-around items-center">
          <div className="bg-[#FAF9F6] px-0 py-16 w-[90%] max-w-[350px] mx-auto lg:mx-0 shadow-md shadow-[#33333350]">
            <div className="container">
              <h2 className="text-[3rem] sm:text-[3.5rem] text-[#333333] font-semibold decoration-1 underline underline-offset-4">
                Book Appointment
              </h2>
              {/* Appointment Form Start*/}
              <form className="my-[20px] text-left">
                <div>
                  <label className="text-[2rem] font-semibold" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter name"
                    minLength={2}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyUp={validateName}
                    required
                  />
                  {errors.name && <span id="name-error">{errors.name}</span>}
                </div>
                <div>
                  <label className="text-[2rem] font-semibold" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="enter phone number"
                    minLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyUp={validatePhone}
                    required
                  />
                  {errors.phone && <span id="phone-error">{errors.phone}</span>}
                </div>
                <div
                  className="flex justify-between items-center gap-4"
                  style={{ maxHeight: 78 + "px" }}
                >
                  <div>
                    <label className="text-[2rem] font-semibold" htmlFor="date">
                      Date
                    </label>
                    <input
                      type={inputType}
                      name="date"
                      min={today}
                      id="date"
                      placeholder="select a date"
                      onFocus={handleDateFocus}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      onKeyUp={validateDate}
                      required
                    />
                    {errors.date && <span id="date-error">{errors.date}</span>}
                  </div>
                  <div>
                    <label className="text-[2rem] font-semibold" htmlFor="time">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      min="15:00"
                      max="19:00"
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      onKeyUp={validateTime}
                      required
                    />
                    {errors.time && <span id="time-error">{errors.time}</span>}
                  </div>
                </div>
                <div>
                  <label
                    className="text-[2rem] font-semibold"
                    htmlFor="service-select"
                  >
                    Service
                  </label>
                  <select
                    name="service"
                    id="service-select"
                    style={{ appearance: "none" }}
                    defaultValue=""
                    onChange={selectService}
                    onKeyUp={validateService}
                    required
                  >
                    <option className="text-[#33333390]" value="" disabled>
                      -- select a service --
                    </option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.service ? (
                    <span id="service-error">{errors.service}</span>
                  ) : (
                    selectedPrice !== null && (
                      <span id="price">
                        Price: &#8358;{selectedPrice / 100}
                      </span>
                    )
                  )}
                </div>
                <div style={{ marginTop: 20 + "px" }}>
                  <button
                    type="submit"
                    className="w-full mx-auto py-[10px] px-[15px] text-[16px] text-[#FAF9F6] font-semibold bg-[#943E4B] hover:opacity-95 hover:rounded-none duration-300 rounded-2xl"
                    onClick={submit}
                  >
                    Next
                  </button>
                  {submitError && <span id="submit-error">{submitError}</span>}
                </div>
              </form>
              {/* Appointment Form End*/}
            </div>
          </div>
          <div className="w-[50%] h-fit shadow-inner hidden lg:block">
            <video
              muted
              loop
              className="video-element w-full h-full shadow-2xl rounded-2xl"
            >
              <source src={assets.bookingVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
      {/* Appointment section ends here */}

      <OpenHours />
    </>
  );
};

export default Home;
