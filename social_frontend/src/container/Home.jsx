import { useState, useRef, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../client";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null)
  const userInfo = fetchUser()
  const picture = localStorage.getItem("image");
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo){
      navigate('/login')
    }
    else {
    const query = userQuery(userInfo.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }
  }, []);

  useEffect(()=>{
    scrollRef.current.scrollTo(0, 0)
  }, [])
  return (
    <div className="flex md:flex-row flex-col bg-black h-screen transition-height duration-75 ease-out" >
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu
          fontSize={40}
          className="cursor-pointer text-white"
          onClick={() => setToggleSidebar(true)}
        />
        <Link to="/">
          <h2 className="text-white text-lg font-mono border-solid border-b-2 border-white">PinBoard</h2>
        </Link>
        <Link to={`/user-profile/${user?._id}`}>
          <img src={picture} alt="profile-pic" className="w-10 rounded-full" />
        </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-black h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer text-gray-500"
              onClick={() => setToggleSidebar(false)}
            />{" "}
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
        </div>
      )}
      </div>
      <div className="pb-2 flex-1 h-full" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='/*' element={<Pins user={user && user}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
