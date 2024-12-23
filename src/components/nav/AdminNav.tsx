import {useNavigate} from "react-router-dom"

const AdminNav = () => {

    const navigate = useNavigate()

  const handleLogOut = ()=>{
    localStorage.removeItem('AUTH_TOKEN')
    navigate('/auth/login')
  }

  return (
    <button
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        onClick={handleLogOut}
    >
        Logout
    </button>
  )
}

export default AdminNav