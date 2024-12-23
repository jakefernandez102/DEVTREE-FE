import {Link} from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'}>
      <img src="/logo.svg" alt='DevTree Logo' className="w-full block" />
    </Link>
  )
}

export default Logo
