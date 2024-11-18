import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center bg-gray-800 p-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-${color} ml-1 transition-transform transform hover:scale-125 duration-200 text-yellow-300`}
        />
      ))}

      <div>
        {halfStars === 1 && (
          <FaStarHalfAlt
            className={`text-${color} ml-1 transition-transform transform hover:scale-125 duration-200`}
          />
        )}
      </div>

      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar
          key={index}
          className="text-gray-500 ml-1 transition-transform transform hover:scale-125 duration-200"
        />
      ))}

      <span className="ml-3 text-yellow-300 font-semibold hover:text-yellow-400 transition-colors duration-300">
        {text && text}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-400",
};

export default Ratings;
