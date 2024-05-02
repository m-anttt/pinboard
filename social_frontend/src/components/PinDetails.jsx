import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import {Link, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {client, urlFor} from '../client';
import { GoLink } from "react-icons/go";
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";

import Spinner from './Spinner';
const PinDetails = ({user}) => {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false);
  const {pinId} = useParams();
  const fetchPinDetails = () =>{
    let query = pinDetailQuery(pinId)
    if (query){
      client.fetch(query).then((data)=>{
        setPinDetail(data[0])
        if (data[0]){
          query = pinDetailMorePinQuery(data[0])
          client.fetch(query).then((data)=> setPins(data))
        }
      })
    }
  }

  useEffect(()=>{
    fetchPinDetails();
  }, [pinId])

  const addComment = ()=>{
    setAddingComment(true)
    client.patch(pinId).setIfMissing({comments: []}).insert('after', 'comments[-1]', [{comment,
    _key: uuidv4(),
    postedBy: {
      _type: 'postedBy',
      _ref: user._id
    }
  }]).commit().then(()=>{
    fetchPinDetails()
    setComment('')
    setAddingComment(false)
    window.location.reload()
  })
  }
  if (!pinDetail) return <Spinner message='Loading pin...'/>
  return ( 
<div className="flex xl-flex-row flex-col m-auto text-white" style={{maxWidth: '1200px', borderRadius: '32px', backgroundColor: 'rgb(7,11,24)'}}>
    <div className="flex justify-center items-center md:items-start flex-initial">
      <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="pin" className="rounded-t-3xl rounded-b-lg" />
    </div>
    <div className="w-full p-5 flex-1 xl:min-w-620">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
        <a
                  href={`${pinDetail.image.asset.url}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black w-9 h-9 rounded-full flex items-center justify-center text-white text-xl opacity-75 hover:opacity-100 hover:shadow-md  outline-none transition-all duration-500 ease-in-out"
                >
                  <MdDownloadForOffline />
                </a>
        </div>
        <a href={pinDetail.destination} target='_blank' rel='noreferrer' className="text-gray-500 flex items-center gap-1 hover:text-gray-400 transition-all duration-500 ease-in-out"><GoLink />{pinDetail.destination}</a>
      </div>
      <div>
        <h1 className="text-4xl font-bold break-words mt-3">{pinDetail.title}</h1>
        <p className="mt-3">{pinDetail.about}</p>
      </div>
      <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex gap-2 mt-5 items-center rounded-lg"><img src={pinDetail.postedBy?.image} alt='user-profile' className="w-8 h-8 rounded-full object-cover"/>
      <p className="font-semibold capitalize">{pinDetail.postedBy?.userName}</p></Link>
      <h2 className="mt-8 text-2xl">Comments</h2>
      <div className="max-h-370 overflow-y-auto">
        {pinDetail.comments ? pinDetail.comments.map((comment, index)=>(
          <div className="flex gap-2 pr-3 mt-5 items-center rounded-lg" key={index}>
            <Link to={`/user-profile/${comment.postedBy?._id}`}><img src={comment.postedBy.image} alt='user-profile' className="w-10 h-10 rounded-full cursor-pointer"/></Link>
            <div className="flex flex-col">
              <p className="font-bold">{comment.postedBy.userName}</p>
              <p>{comment.comment}</p>
            </div>
          </div>
        )) :
        <div className="text-center text-gray-500">There are no comments yet. Try writing one!</div>}
      </div>
      <div className="flex flex-wrap mt-8 pb-5 gap-3 items-center">
      <Link to={`/user-profile/${pinDetail.postedBy?._id}`} replace className="flex gap-2 items-center rounded-lg"><img src={user?.image} alt='user-profile' className="w-8 h-8 rounded-full object-cover"/>
      </Link>
      <input type="text" className="flex-1 border-gray-100 outline-none border-1 p-2 rounded-2xl bg-black focus:border-gray-300" placeholder="What do you think about this pin?" value={comment} onChange={(e)=>setComment(e.target.value)}/>
      <button type='button' className='bg-red-800 text-white rounded-full px-6 py-2 font-semibold text-base outline-none hover:bg-red-700 transition-all duration-500 ease-in-out' onClick={addComment}>
        {addingComment ? 'Posting the comment...' : "Post"}
      </button>
      </div>
    </div>
  </div>);
}
 
export default PinDetails;