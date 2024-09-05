import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import Image from 'next/image'
import { Label } from './ui/label'
import { Input } from './ui/input'
import UserTypeSelector from './UserTypeSelector'
import Collaborator from './Collaborator'
import { useSelf } from '@liveblocks/react/suspense'
import { updateDocumentAccess } from '@/lib/actions/room.action'


const SharedModal = ({ roomId, currentUserType, collaborators, creatorId }: ShareDocumentDialogProps) => {
    const user = useSelf()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState<UserType>('viewer')


    const shareDocumentHandler = async () => {
        setLoading(true);

        await updateDocumentAccess({ 
          roomId, 
          email, 
          userType: userType as UserType, 
          updatedBy: user.info as User,
        });
    
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className='gradient-blue flex h-9 px-4 gap-1' disabled={currentUserType !== 'editor'}>
                    <Image
                        src='/assets/icons/share.svg'
                        alt='share'
                        width={20}
                        height={20}
                        className='min-w-4 md:size-5'
                    />
                    <p className='mr-1 hidden sm:block'> Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='shad-dialog'>
                <DialogHeader>
                    <DialogTitle>Manage who can view this project</DialogTitle>
                    <DialogDescription>
                        select which users can view or edit document
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor='email' className='mt-6 text-blue-500'> Email</Label>

                <div className='flex items-center gap-3 '>
                    <div className='flex-1  flex rounded-md bg-dark-400'>
                        <Input
                            id='email'
                            placeholder='enter Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='share-input'
                        />
                        <UserTypeSelector userType={userType} setUserType={setUserType} />



                    </div>

                    <Button type='submit' onClick={shareDocumentHandler} className='gradient-blue gap-1 flex h-full px-5'
                        disabled={loading} > {loading ? 'Sending...' : 'Invite'}
                    </Button>
                </div>
                <div className='flex flex-col'>

                    <ul className='flex flex-col'>
                        {collaborators.map((collaborator) => (
                            <Collaborator
                                key={collaborator.id}
                                email={collaborator.email}
                                roomId={roomId}
                                creatorId={creatorId}
                                collaborator={collaborator}
                                user={user.info as User}

                            />
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default SharedModal