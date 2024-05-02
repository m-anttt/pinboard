import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { urlFor, client } from "../client";
import { fetchUser } from "../utils/fetchUser";
const Pin = ({ pin: { postedBy, image, _id, destination, save }}) => {
  const [postHover, setPostHover] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();


  const alreadySaved = save?.filter((item) => item?.postedBy?._id === user.sub)?.length;
  console.log(alreadySaved)

  const savePin = (_id) => {
    if (!alreadySaved) {
      setSavingPost(true);
      client
        .patch(_id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.sub,
            postedBy: {
              _type: "post",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) =>{
    client.delete(id).then(()=>{window.location.reload()})
  }
  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onClick={() => navigate(`/pin-details/${_id}`)}
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
      >
{image && (
  <img
  src={urlFor(image.asset.url).width(1050).url()}
  alt="user-post"
  className="w-full rounded-lg"
/>
)}
        
        {postHover && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image.asset.url}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md  outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsArrowUpRightCircleFill />
                  {destination.length > 20
                    ? destination.slice(8, 16)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy._id === user.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white opacity-70 hover:opacity-100 text-dark font-bold p-2 px-3 h-full text-base rounded-full hover:shadow-md outline-none"
                ><AiTwotoneDelete/></button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} replace className="flex gap-2 mt-2 items-center"><img src={postedBy?.image} alt='user-profile' className="w-8 h-8 rounded-full object-cover"/>
      <p className="font-semibold capitalize text-white">{postedBy?.userName}</p></Link>
    </div>
  );
};

export default Pin;
