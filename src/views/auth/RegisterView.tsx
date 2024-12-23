/* eslint-disable @typescript-eslint/no-unused-vars */

import {useForm} from 'react-hook-form';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {isAxiosError} from 'axios';
import {toast} from 'sonner';
import {registerForm} from '../../types';
import {axiosClient} from '../../config/axios-client';
import ErrorMessage from '../../components/ErrorMessage';

export default function RegisterView() {

  const navigate = useNavigate()
  const location = useLocation()

  const handleFromLocation = location?.state?.handle;

  const initialValues: registerForm = {
    name: '',
    email: '',
    handle: handleFromLocation || '',
    password: '',
    password_confirmation: '',
  }

  const {register, watch, handleSubmit, formState: {errors}} = useForm<registerForm>({defaultValues: initialValues});

  const password = watch('password')

  const handleRegister = async (formData: registerForm)=>{
      try {
        const {password_confirmation,...rest} = formData
        const {data} = await axiosClient.post('/auth/register',rest)
        toast.success(data.message)
        setTimeout(() => {
          navigate('/auth/login')
        }, 2000);
      } catch (error) {
        if(isAxiosError(error) && error.response){
          console.log(error.response.data.error)
          toast.error(error.response.data.error)
        }
        console.error(`error while trying to communicate with register endpoint: ${error}`)
        
      }
  }



  return (
    <>
      <h1 className={'text-4xl text-white font-bold'}>Create Account</h1>

      <form 
          onSubmit={handleSubmit(handleRegister)}
          className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
              <input
                  id="name"
                  type="text"
                  placeholder="Tu Nombre"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register('name',{
                    required:'Name is required.',
                  })}
              />
              {errors['name'] && (
                <ErrorMessage>{errors['name'].message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
              <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register('email',{
                    required:'Email is required.',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                    },
                  })}
              />
              {errors['email'] && (
                <ErrorMessage>{errors['email'].message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
              <input
                  id="handle"
                  type="text"
                  placeholder="Nombre de usuario: sin espacios"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register('handle',{
                    required:'Handle is required.',
                  })}
              />
              {errors['handle'] && (
                <ErrorMessage>{errors['handle'].message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register('password',{
                    required:'Password is required.',
                    minLength:{
                      value:8,
                      message: 'Password must be minimun 8 characters'
                    }
                  })}
              />
              {errors['password'] && (
                <ErrorMessage>{errors['password'].message}</ErrorMessage>
              )}
          </div>

          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
              <input
                  id="password-confirmation"
                  type="password"
                  placeholder="Repetir Password"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register('password_confirmation',{
                    required:'Password confirmation is required.',
                    validate: (value) => value === password || 'Passwords does not match, please review'
                  })}
              />
              {errors['password_confirmation'] && (
                <ErrorMessage>{errors['password_confirmation'].message}</ErrorMessage>
              )}
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Crear Cuenta'
          />  
      </form>

      <nav className='mt-10'>
        <Link 
          to='/auth/login' 
          className='text-center text-white text-lg block'>
            Do you already have an account? Login
        </Link>
      </nav>
    </>
  )
}
