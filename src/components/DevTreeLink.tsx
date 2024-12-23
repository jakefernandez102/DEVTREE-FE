import React from 'react'
import {SocialNetworks} from '../types'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type DevTreeLinkProps ={
  link: SocialNetworks
}

const DevTreeLink = ({link}: DevTreeLinkProps) => {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id:link.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      className='bg-white px-5 py-2 flex items-center gap-5 rounded-lg'
      style={style}
      {...attributes}
      {...listeners}
    >
      <div 
          className='w-12 h-12 bg-cover rounded-full'
          style={{backgroundImage:`url(/social/icon_${link.name}.svg)`}}
        >
        </div>

        <p className='capitalize'>Check my <span className='font-bold'>{link.name}</span> </p>
    </li>
  )
}

export default DevTreeLink