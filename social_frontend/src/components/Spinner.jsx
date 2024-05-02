import {ColorRing} from 'react-loader-spinner';
const Spinner = ({message}) => {
  return ( <div className='flex flex-col justify-center items-center w-full h-full'>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#0c142c', '#0c142c', '#121c40', '#172554', '#1d2168']}
  />
    <p className='text-lg text-center px-2'>{message}</p>
  </div> );
}
 
export default Spinner;