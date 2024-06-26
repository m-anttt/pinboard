import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-white transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-white text-white  transition-all duration-200 ease-in-out capitalize";

const SideBar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div
      className="flex flex-col justify-between h-full overfloy-y-scroll min-w-21o hide-scrollbar"
      style={{ backgroundColor: "rgb(7,11,24)" }}
    >
      <div
        className="flex flex-col pb-5 rounded-md"
        style={{ backgroundColor: "rgb(7,11,24)" }}
      >
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <h2 className="text-white text-lg font-mono border-solid border-b-2 border-white">
            PinBoard
          </h2>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-white 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm object-cover"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 text-white rounded-lg shadow-lg items-center mx-3"
          onClick={handleCloseSidebar}
          style={{ backgroundColor: "rgb(7,11,24)" }}
        >
          <img
            src={user.image}
            className="w-10 h-1- rounded-full"
            alt="user=profile"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
