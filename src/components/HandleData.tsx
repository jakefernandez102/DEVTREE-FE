import {SocialNetworks, UserHandle} from "../types"

type HandleDataProps = {
  data: UserHandle
}
const HandleData = ({data}: HandleDataProps) => {

  const links: SocialNetworks[] = JSON.parse(data.links).filter((link:SocialNetworks)=> link.enabled)

  return (
    <div className='space-y-6 text-white'>
      <p className='text-5xl text-center font-black'>{data.handle}</p>

      {data.image && <img className='max-w-[250px] mx-auto' src={data.image} alt={`${data.handle}'s profile image`} />}

      <p className='txt-lg text-center font-bold'>{data.description}</p>

      <div className="mt-20 flex flex-col gap-6">
        {
          links.map(link =>(
            <a 
            target='_blank'
            className='bg-white px-5 py-2 flex items-center gap-5 rounded-lg'
            rel='noreferrer noopener'
            href={link.url}>
              <img className='w-12 rounded-full' src={`/social/icon_${link.name}.svg`} alt={`${link.name} image`} />
              <p className='text-black font-bold text-lg'>See my {link.name}</p>
            </a>
          ))
        }
      </div>
    </div>
  )
}

export default HandleData