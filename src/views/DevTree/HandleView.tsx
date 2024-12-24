import {useQuery} from '@tanstack/react-query'
import {Navigate, useParams} from 'react-router-dom'
import {getUserByHandle} from '../../api/dev-tree-api'
import Spinner from '../../components/Spinner'
import HandleData from '../../components/HandleData'

const HandleView = () => {

  const params = useParams()

  const handle = params.handle!
  const { data, error, isLoading} = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle',handle],
    retry: 1
  })

  console.log({isLoading})
  console.log({error})
  console.log({data})
  if( isLoading ) return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner color={'white'}/>
    </div>
)

  if( error )return <Navigate to='/404' />

  if( data )return <HandleData data={data} />
}

export default HandleView