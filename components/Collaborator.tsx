import Image from 'next/image'
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector'
import { Button } from './ui/button'
import { removeDocumentAccess, updateDocumentAccess } from '@/lib/actions/room.action'

const Collaborator = ({email ,roomId, creatorId,collaborator,user}:CollaboratorProps) => {

    const [userType, setUserType] = useState(collaborator.userType || 'viewer')

    const [loading,setLoading] = useState(false)
    const shareDocumentHandler = async (type: string) => { 
        setLoading(true);
        await updateDocumentAccess({
            roomId,
            email,
            userType :type as UserType,
            updatedBy : user
        })
        setLoading(false);
    }
    const removeCollaboratorHandLer = async (email: string) => { 
        setLoading(true);
        await removeDocumentAccess({
            roomId,
            email
        })
        setLoading(false);
    }
  return (
    <li className='flex items-center justify-between gap-2 py-3'>
        <div className='flex gap-2'>
            <Image
            src={collaborator.avatar}
            alt={collaborator.name}
            height={36}
            width={36}
            className='size-9 rounded-full '
             />
             <p className='text-white line-clamp-1  text-sm font-semibold leading-4'> 
                {collaborator.name}
                <span className='text-10-regular pl-2 text-blue-100 '>
                    {loading && 'updating...'}
                </span>
             </p>
             <p className="text—sm font—light text-blue-100 ">
                {collaborator.email}

             </p>
             {creatorId  === collaborator.id ? 
             <p className='text-sm text-blue-100 '> Owner </p>
             :
             <div className='flex items-center'>
                <UserTypeSelector
                    userType={userType as UserType}
                    setUserType={setUserType || ''}
                 />
                 <Button className='' type='button' 
                 onClick={()=> removeCollaboratorHandLer(collaborator.email)}
                 >
                    Remove
                 </Button>
             </div>
             }
        </div> 

    </li>
  )
}

export default Collaborator