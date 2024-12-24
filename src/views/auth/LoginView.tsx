import {Link, useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'
import ErrorMessage from "../../components/ErrorMessage"
import {loginForm} from "../../types"
import {isAxiosError} from "axios"
import {toast} from "sonner"
import {axiosClient} from "../../config/axios-client"

const LoginView = () => {

  const navigate = useNavigate()

  const initialValues:loginForm ={
    email: '',
    password: ''
  }

  const {handleSubmit, register, formState:{errors}} = useForm<loginForm>({defaultValues:initialValues})

  const handleLogin = async (formData:loginForm)=>{
    try {
      const {data} = await axiosClient.post('/auth/login', formData)
      localStorage.setItem('AUTH_TOKEN', data.token)
      toast.success(data.message)

      navigate('/admin')      
      // toast(data)
    } catch (error) {
      if(isAxiosError(error) && error.response){
        console.log(error.response.data)
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Login</h1>  

      <form 
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
          noValidate
      >
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
              <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("email", {
                      required: "El Email es obligatorio",
                      pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "E-mail no válido",
                      },
                  })}
              />
              {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                      required: "El Password es obligatorio",
                  })}
              />
              {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Iniciar Sesión'
          />
      </form>

      <nav className='mt-10'>
        <Link 
          to='/auth/register'
          className='text-center text-white text-lg block'>
            Don't you have an account? Register
        </Link>
      </nav>
    </>
  )
}

export default LoginView
