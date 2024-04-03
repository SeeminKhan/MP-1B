import React, { useState } from "react";
import BannerPng from "../assets/cr5.png";
import BannerPng1 from "../assets/img1.svg";
import axios from "axios";

const Contact = ({ togglePlay }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to backend
      const response = await axios.post(
        "http://127.0.0.1:5000/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      console.log("Form Data Submitted:", formData);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      alert("Message sent successfully!");

      if (!response.ok) {
        // Handle non-2xx response status
        throw new Error("Failed to submit form");
      }
      // Log the response message

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      if (error.response) {
        setError(error.response.data.message);
        setFormData({ name: "", email: "", password: "" });
      } else {
        setError("Something went wrong. Please try again later.");
        setFormData({ name: "", email: "", password: "" });
      }
    }
  };

  return (
    <>
      <div className="py-12 sm:py-0 relative">
        <div className="container min-h-[620px] flex items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            <div data-aos="fade-up" data-aos-once="false">
              <img src={BannerPng} alt="" className="w-full max-w-[400px]" />
            </div>
            <div className="lg:pr-20 relative">
              <div className="relative z-10 space-y-5">
                <h1
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="text-4xl font-semibold"
                >
                  Get in touch with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Identify Pro
                  </span>
                </h1>
                <p data-aos="fade-up" data-aos-delay="500">
                  Feel free to connect with us for any of your needs regarding
                  our services. Our support team is ready to solve any of your
                  issues. Just push a text to us and we will get back to you
                  immediately.
                </p>
              </div>
              <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 py-12 sm:py-0 relative">
        <div className="container min-h-[620px] flex items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            <div className="order-2 sm:order-1  lg:pr-20 relative">
              <div className="relative z-10 space-y-5">
                <h1
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="p-6 text-4xl font-semibold"
                >
                  Fill the form to{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Get in touch with Us
                  </span>
                </h1>
                <div className="mt-8 md:mt-0 grid place-items-center">
                  <div className="w-full max-w-md">
                    <form
                      data-aos="fade-up"
                      data-aos-delay="300"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-2 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        ></textarea>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-center">
                          <div className="relative inline-flex group">
                            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                            <button
                              type="submit"
                              title="Login"
                              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                              role="button"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
              <div className="h-[100px] w-[100px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
            </div>
            <div data-aos="fade-up" className="order-1 sm:order-2">
              <img src={BannerPng1} alt="" className="w-full max-w-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
