import React, { useState } from "react";
import BannerPng from "../assets/signup.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ togglePlay, redirectToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
        }
      );
      console.log("Form Data Submitted:", formData);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      alert("Signup successful! Please login.");
      setFormData({ name: "", email: "", password: "" }); // Clear form fields
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing up:", error);
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
    <div className="mt-5 py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* text content section */}
          <div className="order-2 sm:order-1  lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="p-6 text-4xl font-semibold"
              >
                Don't have an account?{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  SignUp Here
                </span>
              </h1>
              <div className="max-w-md mx-autooverflow-hidden">
                <form
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="p-6"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block dark:text-gray-100 text-gray-800 text-gray- font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-gray-100 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-800 dark:text-gray-100 font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-gray-100 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-800 dark:text-gray-100 font-semibold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="text-gray-100 bg-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                  <div className="mb-4 flex justify-center mt-4">
                    <p className="text-gray-500">
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-500">
                        Login here
                      </Link>
                    </p>
                  </div>
                  <div className="flex justify-center">
                  <div className="relative inline-flex group">
                      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                      <button
                        type="submit"
                        title="Login"
                        className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        role="button"
                      >
                        SignUp
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* backgrond color blob */}
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
            <div className="h-[100px] w-[100px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
          </div>

          {/* image section */}
          <div data-aos="fade-up" className="order-1 sm:order-2">
            <img src={BannerPng} alt="" className="w-full max-w-[400px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
