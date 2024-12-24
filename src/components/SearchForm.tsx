import {useForm} from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
import slugify from "react-slugify"
import {useMutation} from "@tanstack/react-query"
import {searchByHandle} from "../api/dev-tree-api"
import Spinner from "./Spinner"
import {Link} from "react-router-dom"

const SearchForm = () => {

  const {register, handleSubmit, watch, formState:{errors}} = useForm({
    defaultValues:{
      handle: ''
    }
  })

  const handle = watch('handle')

  const searchMutation = useMutation({
    mutationFn: searchByHandle,
  })

  console.log(searchMutation)

  const handleSearch = () =>{
    const slug = slugify(handle)
    console.log(slug)
    searchMutation.mutate(slug)
  }
  const a =true
  return (
  <form
    onSubmit={handleSubmit(handleSearch)}
    className="space-y-5">
    <div className="relative flex items-center  bg-white  px-2">
      <label
        htmlFor="handle"
      >devtree.com/</label>
      <input
        type="text"
        id="handle"
        className="border-none bg-transparent p-2 focus:ring-0 flex-1"
        placeholder="elonmusk, zuck, jeffbezos"
        {...register("handle", {
          required: "Un Nombre de Usuario es obligatorio",
        })}
      />

    </div>
    {errors.handle && (
      <ErrorMessage>{errors.handle.message}</ErrorMessage>
    )}

    <div className="mt-10">
      {a && 
      <div className='w-full '>
        <Spinner classes={'mx-auto'}/>
      </div> }
      {searchMutation.error && <p className='text-center text-red-600 font-black'>{searchMutation.error.message}</p>}
      {searchMutation.data && <p className='text-center text-cyan-500 font-black'>
        {searchMutation.data} go to <Link to={'/auth/register'} state={{handle: slugify(handle)}}>Register</Link> </p>}
    </div>

    <input
      type="submit"
      className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
      value='Get my DevTree'
    />
  </form>
  )
}

export default SearchForm
