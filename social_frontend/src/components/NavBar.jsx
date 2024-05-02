import {Link, useNavigate} from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io';
const NavBar = ({searchTerm, setSearchTerm, user}) => {
  const navigate = useNavigate()
  if (!user) return null;
  return ( 
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7 bg-black'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-black border-none outline-none focus-within:shadow-sm text-white'>
        <IoMdSearch fontSize={21} className='ml-1 text-white'/>
        <input type='text' onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search something' value={searchTerm} onFocus={()=>navigate('/search')} className='p-2 w-full bg-black outline-none'/>
      </div>

      <div className='flex gap-3 items-center'>
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'><img src={user.image} alt='user' className='w-12 md:w-12  rounded-full object-cover '/></Link>
        <Link to='create-pin' className='bg-red-900  text-white rounded-full w-12 md:w-12 md:h-12 flex justify-center aspect-square items-center hover:bg-red-800 transition-all duration-500 ease-in-out'><IoMdAdd fontSize={18}/></Link>
      </div>
    </div>
   );
}
 
export default NavBar;