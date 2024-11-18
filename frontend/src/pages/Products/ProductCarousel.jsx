
import { useNavigate } from "react-router";
import { useState } from "react";
import { bannerData } from "../../static";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";


const ProductCarousel = () => {
  const navigate = useNavigate();
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },

    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),

    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: window.innerWidth <= 576 ? "30px" : "50px",
                height: window.innerWidth <= 576 ? "10px" : "15px",
                borderRadius: "20px",
                background: "#262626",
                cursor: "pointer",
              }
            : {
                width: window.innerWidth <= 576 ? "10px" : "15px", // Smaller for inactive on small screens
                height: window.innerWidth <= 576 ? "10px" : "15px",
                borderRadius: "50%",
                backgroundColor: "white",
                cursor: "pointer",
              }
        }
      />
    ),

    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full max-h-[600px] overflow-hidden rounded-md">
      <Slider {...settings}>
        {bannerData?.map((item, index) => (
          <div key={index} className="relative ">
            <img
              src={item?.image}
              alt="bannerImage"
              className="h-[200px] sm:h-full lg:h-[500px] w-full object-cover rounded-md"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 pl-2 md:pl-10">
              <div className="flex flex-col justify-center gap-2 md:gap-3 h-full">
                <p className=" w-24 py-1 bg-red-600 text-white text-xs uppercase text-center font-medium tracking-wide rounded-md  ">
                  {item?.sale}
                </p>
                <h2 className="text-xl md:text-5xl max-w-sm md:max-w-xl  font-bold md:leading-[55px] capitalize">
                  {item?.title}
                </h2>
                <p className="text-xs md:text-base uppercase font-semibold">
                  {item?.discount}
                </p>
                <p className="font-medium text-sm md:text-base">
                  From{" "}
                  <span className="md:text-xl font-bold text-blue-700 md:ml-2">
                    ${item?.from}
                  </span>
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="w-24 md:w-44 py-2 md:py-3 bg-black/80  text-white text-xs rounded-md md:text-sm uppercase font-semibold hover:bg-black hoverEffect"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
