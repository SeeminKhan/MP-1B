import React, { useState } from "react";
import ProductImage from "../assets/product12.png"; // Replace with your product image
import axios from "axios";

const ProductPage = () => {
  const [videoFeedActive, setVideoFeedActive] = useState(false);

  const startVideoFeed = async () => {
    try {
      console.log("video feed started");
      //await axios.get("http://localhost:5000/start_video_feed");
      setVideoFeedActive(true);
    } catch (error) {
      console.error("Error starting video feed:", error);
    }
  };

  const stopVideoFeed = async () => {
    try {
      await axios.get("http://localhost:5000/stop_video_feed");
      setVideoFeedActive(false);
    } catch (error) {
      console.error("Error stopping video feed:", error);
    }
  };

  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* Product image section */}
          <div data-aos="fade-up" data-aos-once="false">
            <img
              src={ProductImage}
              alt="Product"
              className="w-full max-w-[400px]"
            />
          </div>
          {/* Product information section */}
          <div className="lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold"
              >
                How to Use{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Identify-Pro
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="500">
                "Identify Pro - Next Gen Face Detection" represents an
                effortlessly navigable, state-of-the-art facial recognition
                system. To commence, simply click on "Get Started" and position
                yourself facing the webcam. Subsequently, a screen will
                activate, seamlessly detecting whether you are wearing a mask,
                your facial expression and your approximate age.
              </p>
              <div className="flex gap-6">
                <div>
                  {videoFeedActive ? (
                    <iframe
                      src="http://localhost:5000/start_video_feed"
                      width="800"
                      height="800"
                      frameborder="0"
                    ></iframe>
                  ) : null}
                  {videoFeedActive ? (
                    <button
                      data-aos="fade-up"
                      data-aos-delay="700"
                      className="primary-btn"
                      onClick={stopVideoFeed}
                    >
                      Stop Video Feed
                    </button>
                  ) : (
                    <button
                      data-aos="fade-up"
                      data-aos-delay="700"
                      className="primary-btn"
                      onClick={startVideoFeed}
                    >
                      Start Video Feed
                    </button>
                  )}
                </div>
                {videoFeedActive}
              </div>
            </div>
            {/* Background color blob */}
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
            <div className="h-[100px] w-[100px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
