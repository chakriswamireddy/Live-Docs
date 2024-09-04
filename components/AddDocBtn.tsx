'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { CreateDocument } from '@/lib/actions/room.action'
import { useRouter } from 'next/navigation'

export const AddDocBtn = ({userId,email}:AddDocumentBtnProps) => {
  const router = useRouter();
    const addDocumentHandler = async () => {
      try {
        const room = await CreateDocument({userId,email});

        if (room) router.push(`/documents/${room['id']}`)

      } catch (error) {
        console.log("error happpend click btn"+ error)
      }
    }
  return (
    <Button type='submit' onClick={addDocumentHandler} className="gradient—btue flex gap—I shadow—md">
        <Image 
        src="/assets/icons/add.svg" alt="add" width={24} height={24}
        />
        <p className='hidden sm:block'> Start a Blank Document </p>

    </Button>
  )
}
