import { useState } from "react";
import {Routes, Route} from 'react-router-dom';
import NavBar from "../components/NavBar";
import PinDetails from "../components/PinDetails";
import Feed from "../components/Feed";
import CreatePin from "../components/CreatePin";
import Search from "../components/Search";
const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return ( 
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div className="h-full rounded-md p-2 pb-10" style={{backgroundColor: 'rgb(0,0,0)'}}>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-details/:pinId' element={<PinDetails user={user}/>}/>
          <Route path='/create-pin' element={<CreatePin user={user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
        </Routes>
      </div>
    </div>
   );
}
 
export default Pins;