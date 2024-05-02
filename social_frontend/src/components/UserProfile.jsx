import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const nonActiveBtnStyles = 'bg-red-950 text-white font-bold p-2 rounded-full w-20 outline-none';
const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');const navigate = useNavigate()
  const {userId} = useParams()

  useEffect(()=>{
   const query = userQuery(userId);
   client.fetch(query).then((data) => {
    setUser(data[0])
   })
  }, [userId])

  useEffect(()=>{
  if (text === 'Created'){
    const createdPinsQuery = userCreatedPinsQuery(userId)
    client.fetch(createdPinsQuery).then((data) => setPins(data))
  }
  else {
    const savedPinsQuery = userSavedPinsQuery(userId)
    client.fetch(savedPinsQuery).then((data) => setPins(data))
  }
  }, [text, userId])

  if (!user) {
    return <Spinner message='Loading profile...'/>
  }

  const signOut = (e) =>{
      localStorage.clear();
      navigate('/login');
  }
  return ( 
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt='banner-picture'/>
            <img className='rounded-full w-2- h-20 -mt-10 shadow-xl object-cover' src={user.image} alt='user-picture'/>
            <h1 className='font-bold text-3xl text-center mt-3'>{user.userName}</h1>
            {user._id === userId ? (  <div className='absolute top-0 z-1 right-0 p-2'>
              <button className='p-2 rounded-full cursor-pointer outline-none shadow-md flex items-center text-white gap-1' onClick={(e)=>signOut(e)} style={{backgroundColor: 'rgb(7,11,24)'}}><AiOutlineLogout color='red'/>Sign out</button>
            </div>) : null }
          </div>
          <div className='text-center mb-7 flex justify-center gap-3'>
            <button type='button' onClick={(e)=>{
              setText(e.target.textContent)
              setActiveBtn('created')
              }} className={`${activeBtn === 'created' ? activeBtnStyles : nonActiveBtnStyles}`}>Created</button>
               <button type='button' onClick={(e)=>{
              setText(e.target.textContent)
              setActiveBtn('saved')
              }} className={`${activeBtn === 'saved' ? activeBtnStyles : nonActiveBtnStyles}`}>Saved</button>
          </div>
          {pins?.length ? (
          <div className='px-2'>
            <MasonryLayout pins={pins}/>
          </div>
          ) :(<div className='flex justify-center items-center w-full tetx-xl mt-2'>No pins found...</div>)}
        </div>
      </div>
    </div>
   );
}
 
export default UserProfile;