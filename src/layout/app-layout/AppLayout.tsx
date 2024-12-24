import { Navigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../../api/dev-tree-api";
import DevTree from "../../components/DevTree";
import Spinner from "../../components/Spinner";

export default function AppLayout() {

    const {data, isLoading, isError} = useQuery({
      queryFn: getUser,
      queryKey:   ['user'],
      retry:2,
      refetchOnWindowFocus: false
    })

    if(isLoading) return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner/>
      </div>
    )

    if(isError) return <Navigate to={'/auth/login'}/>

    if(data) return <DevTree data={data} />
}