import React, {useEffect, useState} from 'react'
import {social} from '../../data/social'
import {linkTree, SocialNetworks, User} from '../../types'
import DevTreeInput from '../../components/DevTreeInput'
import {isValidURL} from '../../utils'
import {toast} from 'sonner'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateUserProfile} from '../../api/dev-tree-api'

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user:User = queryClient.getQueryData(['user'])!;

  const {mutate} = useMutation({
    mutationFn: updateUserProfile,
    onError: (error)=>{
      toast.error(error.message)
    },
    onSuccess:()=>{
      toast.success('Links Published')
    }
  })

  useEffect(()=>{
    const updatedData = devTreeLinks.map(item =>{
      const currentLink = JSON.parse(user.links).find((link: linkTree) =>  link.name === item.name)
      if(currentLink){
        return{...item, url: currentLink.url, enabled: currentLink.enabled}
      }
      return item
    })
    setDevTreeLinks(updatedData)
  },[])

  const handleUrlChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const updatedLinks = devTreeLinks.map(item=>
      item.name === e.target.name ? {...item, url:e.target.value} : item
    )
    setDevTreeLinks(updatedLinks)
  }

const links:SocialNetworks[] = JSON.parse(user.links);
const handleEnabledChange = (socialNetwork: string) => {
  const updatedLinks = devTreeLinks.map((item) => {
    if (item.name === socialNetwork) {
      if (isValidURL(item.url)) {
        return { ...item, enabled: !item.enabled };
      } else {
        toast.error('URL is not valid.');
        return item;
      }
    }
    return item;
  });

  let updatedItems: SocialNetworks[] = [];
  const selectedSocialNetwork = updatedLinks.find((link) => link.name === socialNetwork);

  if (selectedSocialNetwork?.enabled) {
    // Enabling the link
    const id = links.filter((link) => link.enabled).length + 1;

    if (links.some((link) => link.name === socialNetwork)) {
      updatedItems = links.map((link) =>
        link.name === socialNetwork
          ? { ...link, enabled: true, id }
          : link
      );
    } else {
      const newItem = {
        ...selectedSocialNetwork,
        id,
      };
      updatedItems = [...links, newItem];
    }
  } else {
    // Disabling the link
    const indexToDisable = links.findIndex((link) => link.name === socialNetwork);

    updatedItems = links.map((link) => {
      if (link.name === socialNetwork) {
        return { ...link, id: 0, enabled: false };
      } else if (link.id > links[indexToDisable].id) {
        return { ...link, id: link.id - 1 }; // Adjust indices
      } else {
        return link;
      }
    });
  }
  // Update devTreeLinks and persist data
  setDevTreeLinks(updatedLinks);

  queryClient.setQueryData(['user'], (prevData: User) => {
    return {
      ...prevData,
      links: JSON.stringify(updatedItems),
    };
  });
};

  return (
    <div className='space-y-5'>
      {
      devTreeLinks.map((item)=>(
        <DevTreeInput 
          key={item.name} 
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnabledChange={handleEnabledChange}
        />
      ))
      }
      <button
        type="button"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-700 rounded-lg font-bold"
        onClick={()=>mutate(queryClient.getQueryData(['user'])!)}
      >
        Publish Links
      </button>
      
    </div>
  )
}

export default LinkTreeView