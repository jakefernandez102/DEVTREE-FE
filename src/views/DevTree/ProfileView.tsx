import {useForm} from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import {profileForm, User} from "../../types"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {toast} from "sonner"
import {updateUserProfile, uploadImage} from "../../api/dev-tree-api"


export default function ProfileView() {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<User>(['user'])!

  const {register, handleSubmit, formState: {errors}} = useForm<profileForm>({
    defaultValues:{
      handle: data.handle,
      description: data.description
    }
  })
  
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onError: (error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    } 
  })

  const updateImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success('Image Updated successfully')
      queryClient.setQueryData(['user'],(prevData:User)=>{
        return {
          ...prevData,
          image: data.image
        }
      })
    } 
  })

  const handleImageChange = async ( e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      updateImageMutation.mutate(e.target.files[0])
    }
  }

  const handleSubmitProfileForm = async (formData: profileForm) =>{
    const user: User = queryClient.getQueryData(['user'])!;
    user.description = formData.description;
    user.handle = formData.handle; 
    updateProfileMutation.mutate(user)
  }


    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleSubmitProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    id='handle'
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle',{
                      required: "Handle field is required"
                    })}
                />
                {errors['handle'] && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                    >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description',{
                      required:'Description field is required'
                    })}
                    />
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleImageChange }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}