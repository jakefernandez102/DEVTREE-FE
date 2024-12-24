import {CircleLoader} from 'react-spinners'

interface SpinnerProps {
  color?: string
  classes?: string
}

const Spinner = ({color = 'black', classes = ''}: SpinnerProps) => {
  return (
      <CircleLoader className={classes} size={100} color={color === 'white' ? '#ffffff' :'#0c4a6e'}/>
  )
}

export default Spinner