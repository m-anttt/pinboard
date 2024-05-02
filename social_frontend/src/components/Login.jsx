import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import video from '../assets/share.mp4';
import { client } from "../client";
import { REACT_APP_GOOGLE_API_TOKEN } from "../config";

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = (response) =>{
    let userObject = jwtDecode(response.credential)
    const {name, sub, picture} = {...userObject}
    localStorage.setItem('user', JSON.stringify(userObject))
    localStorage.setItem('id', sub)
    localStorage.setItem('image', picture)
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/', {replace: true})
    })
  }
  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_GOOGLE_API_TOKEN,
    callback: handleLogin}
    )
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: 'outline', size: 'large', shape: 'pill'}
    )
  }, [])
  return ( <div>
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video src={video} type='video/mp4' loop controls={false} muted autoPlay className="w-full h-full object-cover"/>
        <div className="absolute h-full flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <h2 className="text-white text-lg font-mono border-solid border-b-2 border-white">PinBoard</h2>
          </div>
          <div className="shadow-2xl">
            <div id='signInDiv' className="cursor-pointer outline-none" ></div>
          </div>
        </div>
      </div>
    </div>
  </div> );
}
 
export default Login;