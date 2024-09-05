"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import ActiveColloborats from './ActiveColloborats'

import Header from "@/components/Header";
import { Editor } from "@/components/editor/Editor";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Loader from "./Loader";
import { Input } from "./ui/input";
import Image from "next/image"; 
import { updateDocument } from "@/lib/actions/room.action";
import SharedModal from "./SharedModal";

const ColloborativeRoom = ({ roomId, roomMetadata,users,currentUserType }: CollaborativeRoomProps) => {

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [docTitle, setDocTitle] = useState(roomMetadata.title)

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const updateTitleHandler = async (e: React.KeyboardEvent) => {
    if (e.key =='Enter') {
      setLoading(true)

      try {
        if (docTitle !== roomMetadata.title){
          const updatedDocument = await updateDocument(roomId,docTitle);
          if (updatedDocument) {
            setEditing(false);
          }
        } 
        else {
          setEditing(false)
        }
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }
  }

  // const currentUserType = 'editor';

  useEffect(()=>{
    const handleClickOutside=(e:MouseEvent) => {
      if (containerRef.current && ! containerRef.current.contains(e.target as Node)) {
        setEditing(false);
      }

      document.addEventListener('mousedown',handleClickOutside)

      return()=>{
      document.removeEventListener('mousedown',handleClickOutside)

      }
    }
  },[])

  useEffect(()=>{
    if (editing && inputRef.current) {
      inputRef.current.focus()
      updateDocument(roomId,docTitle);
    }
  },[editing])


  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="colloborative-room">

          <Header>
            <div ref={containerRef} className="flex w-fit items-center justify-center gap-2">
              {/* <p className="document-title text-white"> testing  </p> */}
              {(editing && !loading) ?
                <Input
                  type="text"
                  onChange={((e) => setDocTitle(e.target.value))}
                  disabled={!editing}
                  placeholder="Enter Title"
                  className="document-title-input"
                  onKeyDown={updateTitleHandler}
                  // ref={inputRef}
                  value={docTitle}
                />
                :
                <>
                  <p className="document-title"> {docTitle}   </p>
                </>
              }

              {currentUserType === 'editor' && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className="pointer"

                />
              )}

              {currentUserType !== 'editor' && editing &&
                <p className="view-only-tag"> View Only 
                </p>
              }
              {loading && <p className="text-sm text-gray-400">saving... </p>}



            </div>
            
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
            <SharedModal
              roomId= {roomId}
              currentUserType={currentUserType}
              collaborators ={users}
              creatorId = {roomMetadata.creatorId}
             />

              <ActiveColloborats />
            </div>


            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>


          <Editor currentUserType={currentUserType}  roomId={roomId} />

         </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default ColloborativeRoom