import React, { useState } from "react";
import BannerPng from "../assets/login.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ togglePlay }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // State for error message
  const [error, setError] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      // Check if login was successful
      if (response.data.message === "Login successful") {
        alert("Login successful!");
        setFormData({ name: "", email: "", password: "" });
        // Redirect user to dashboard or any other page upon successful login
        window.location.href = "/dashboard"; // Change this to the desired URL
      } else {
        setError("Invalid email or password. Try Again");
      }
    } catch (error) {
      // Handle login error
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="mt-5 py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* text content section */}
          <div className="order-2 sm:order-1 lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="p-6 text-4xl font-semibold"
              >
                Login to start using{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Our Product
                </span>
              </h1>
              <div className="w-full max-w-md mx-auto overflow-hidden">
                <form
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="p-6"
                  onSubmit={handleSubmit} // Handle form submission
                >
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
                      value={formData.email} // Bind input value to state
                      onChange={handleChange} // Handle input changes
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
                      value={formData.password} // Bind input value to state
                      onChange={handleChange} // Handle input changes
                      className="text-gray-100 bg-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="flex justify-center mb-4 mt-4">
                    <p className="text-gray-500">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-blue-500">
                        Sign up here
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
                        Login
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

export default Login;
