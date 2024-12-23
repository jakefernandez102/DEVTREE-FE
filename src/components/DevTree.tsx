
import {Link, Outlet} from 'react-router-dom';
import NavigationTabs from './NavigationTabs';
import {Toaster} from 'sonner';
import {linkTree, SocialNetworks, User} from '../types';
import {useEffect, useState} from 'react';
import DevTreeLink from './DevTreeLink';
import {DndContext, closestCenter, DragEndEvent} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable'
import {useQueryClient} from '@tanstack/react-query';
import Header from './Header';

interface DevTreeProps {
  data: User;
}


const DevTree = ({data}:DevTreeProps) => {
  
  const [enabledLinks, setEnabledLinks] = useState<SocialNetworks[]>(JSON.parse(data.links).filter((link:linkTree) => link.enabled))

  useEffect(()=>{
    setEnabledLinks(JSON.parse(data.links).filter((link:linkTree) => link.enabled))
  },[data])



const queryClient = useQueryClient()
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
    
        if (!over || active.id === over.id) return; 
    
        const prevIndex = enabledLinks.findIndex(link => link.id === active.id);
        const newIndex = enabledLinks.findIndex(link => link.id === over.id);
    
        if (prevIndex === -1 || newIndex === -1) return; 
    
        const updatedLinks = arrayMove(enabledLinks, prevIndex, newIndex);
        setEnabledLinks(updatedLinks);
    
        const allLinks = [
            ...updatedLinks, 
            ...(JSON.parse(data.links) as SocialNetworks[]).filter(link => !link.enabled)
        ];
        queryClient.setQueryData(['user'], (prevData: User) => ({
            ...prevData,
            links: JSON.stringify(allLinks),
        }));
    };

  return (
    <>
            <Header/>

            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs/>
                    
                    <div className="flex justify-end">
                        <Link 
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >View my profile: /{data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                          <p className='text-4xl text-center text-white'>{data.handle}</p>
                          {data.image && 
                            <img src={data.image} alt="Profile image" className='mx-auto max-w-[250px]'/>
                          }
                          <p className='text-center text-lg font-black text-white'>{data.description}</p>

                          <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <div className='mt-20 flex flex-col gap-5'>
                              <SortableContext
                                items={enabledLinks}
                                strategy={verticalListSortingStrategy}
                              >
                                {enabledLinks.map(link =>(
                                  <DevTreeLink
                                    key={link.name}
                                    link={link}
                                  />
                                ))}
                              </SortableContext>
                            </div>
                          </DndContext>

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-center" richColors={true}/>
        </>
  )
}

export default DevTree