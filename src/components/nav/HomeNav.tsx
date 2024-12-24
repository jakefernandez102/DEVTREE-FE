import {Link} from "react-router-dom"

const HomeNav = () => {
  return (
    <>
      <Link
        className='text-white p-2 uppercase font-black text-xs cursor-pointer'
        to={'/auth/login'}
      >Login</Link>
      <Link
        className='bg-lime-500 text-slate-800 rounded-lg p-2 uppercase font-black text-xs cursor-pointer'
        to={'/auth/register'}
      >Register</Link>
    </>
  )
}

export default HomeNav