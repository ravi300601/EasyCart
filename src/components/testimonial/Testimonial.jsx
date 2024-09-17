import React, { useContext } from "react";
import myContext from "../../context/data/myContext";

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1
            className=" text-center text-3xl font-bold text-black"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Testimonial
          </h1>
          <h2
            className=" text-center text-2xl font-semibold mb-10"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            What our <span className=" text-blue-500">customers</span> are
            saying
          </h2>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://ecommerce-sk.vercel.app/img/kamal.png"
                />
                <p
                  style={{ color: mode === "dark" ? "white" : "" }}
                  className="leading-relaxed"
                >
                  I've been a customer for years and have always been impressed
                  with the selection, prices, and shipping times. Recently, I
                  had an issue with my order and the customer service team was
                  incredibly helpful and resolved the problem quickly. I'm a
                  satisfied customer!
                </p>
                <span className="inline-block h-1 w-10 rounded bg-sky-600 mt-6 mb-4" />
                <h2
                  style={{ color: mode === "dark" ? "#3b82f6" : "" }}
                  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
                >
                  Kamal Nayan Upadhyay
                </h2>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
                />
                <p
                  style={{ color: mode === "dark" ? "white" : "" }}
                  className="leading-relaxed"
                >
                  I purchased a new laptop from Easy Cart and was blown away by
                  the fast delivery and easy setup process. The laptop itself is
                  amazing and has exceeded my expectations. I'll definitely be
                  shopping here again for all my tech needs.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-sky-600 mt-6 mb-4" />
                <h2
                  style={{ color: mode === "dark" ? "#3b82f6" : "" }}
                  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
                >
                  Alisha Gupta
                </h2>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://imgs.search.brave.com/erAnS2CTMAkpQoxCMhNVtoYVPUHos33kLyOGWncHCtU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/YXV0dW1uLXBob3Rv/Z3JhcGhlci10YWtp/bmctcGljdHVyZS5q/cGc_d2lkdGg9MTAw/MCZmb3JtYXQ9cGpw/ZyZleGlmPTAmaXB0/Yz0w"
                />
                <p
                  style={{ color: mode === "dark" ? "white" : "" }}
                  className="leading-relaxed"
                >
                  I was initially hesitant to shop online, but Easy Cart
                  completely changed my mind. The website is easy to navigate,
                  the products are high-quality, and the customer service is
                  exceptional. I'll definitely be shopping here again.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-sky-600 mt-6 mb-4" />
                <h2
                  style={{ color: mode === "dark" ? "#3b82f6" : "" }}
                  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
                >
                  Alex Parker
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
