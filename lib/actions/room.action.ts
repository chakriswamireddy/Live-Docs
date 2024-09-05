'use server';

import { nanoid } from 'nanoid'
import { title } from 'process';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { getAccessType, parseStringify } from '../utils';
import { redirect } from 'next/dist/server/api-utils';

export const CreateDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();
    try {

        const metadata = {
            creatorId: userId,
            email,
            title: 'Untitled Document'
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses: usersAccesses,
            defaultAccesses: [],
        });

        revalidatePath('/')

        return parseStringify(room);
    }
    catch (err) {
        console.log("error happened while creating room" + err)
    }
}

export const updateDocument = async ( roomId :string, title:string ) => {
    try {
        const room = await liveblocks.updateRoom(roomId, {
            metadata: {
                title,
            }
        })

        revalidatePath(`/documents/${roomId}`)


        return parseStringify(room);
    } catch (error) {
        console.log(error)
    }
}




export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {

    try {
        const room = await liveblocks.getRoom(roomId);

        //TODO-2 make this work 

        // const hasAccess = Object.keys(room.usersAccesses).includes(userId);
        // if (!hasAccess) throw new Error('You dont have access to this Document')

        return parseStringify(room);
    } catch (error) {
        console.log("error happened while accessing room" + error)
    }
}


export const getDocuments = async ( email: string ) => {

    try {
        const rooms = await liveblocks.getRooms({userId:email});

       

        const hasAccess = Object.keys(room.usersAccesses).includes(userId);
        if (!hasAccess) throw new Error('You dont have access to this Document')

        return parseStringify(rooms);
    } catch (error) {
        console.log("error happened while accessing room" + error)
    }
}

export const updateDocumentAccess= async ({roomId, email, userType,updatedBy}: ShareDocumentParams) => {

    try {
        const usersAccesses :RoomAccesses = {
            [email]: getAccessType(userType) as AccessType,
        }

        const room = await liveblocks.updateRoom(roomId, {
            usersAccesses
        })

        if (room) {
            //TODO send notifcation
        }

        revalidatePath(`/documents/${roomId}`)
        return parseStringify(room)

        
    } catch (error) {
        console.log("error happened while updating room Access",error)
    }

}

export const removeDocumentAccess = async ( { roomId, email }: {roomId:
string, email: string}) => {
    try {

        const room = await liveblocks.getRoom(roomId)

        if (email === room.metadata.email) {
            throw new Error('You cant remov yourselves from doc')
        }

        const updatedRoom = await liveblocks.updateRoom(roomId, {
            usersAccesses: {
                [email]:null
            }
        })

    
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom)
        
    } catch (error) {
        console.log("error occured while removing user",error)
    }
}