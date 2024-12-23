import {CircleLoader} from 'react-spinners'

interface SpinnerProps {
  color?: string
}

const Spinner = ({color = 'black'}: SpinnerProps) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <CircleLoader size={100} color={color === 'white' ? '#ffffff' :'#0c4a6e'}/>
    </div>
  )
}

export default Spinner