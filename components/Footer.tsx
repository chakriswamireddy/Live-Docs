import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { CrossIcon } from 'lucide-react'



const Footer = () => {

    const contactInfo = [{
        icon: '/assets/icons/linkedin.svg',
        title: 'Linkedin',
        link: 'https://www.linkedin.com/in/chakradhar-swamireddy/'
    },
    {
        icon: '/assets/icons/github.svg',
        title: 'GitHub',
        link: 'https://github.com/chakriswamireddy/'
    },
    {
        icon: '/assets/icons/gmail.svg',
        title: 'Mail',
        link: 'mailto:iamthechakri@gmail.com'
    }
    ]
    return (
        <div className='absolute bottom-0 right-10  '>

            {/* <HoverCard>
                <HoverCardTrigger className='underline underline-offset-1'>Made by</HoverCardTrigger>
                <HoverCardContent>
                    Chakradhar Swamireddy
                    <p className='text-slate-400'> 
                    iamthechakri@gmail.com


                    </p> 
                </HoverCardContent>
            </HoverCard> */}

            <TooltipProvider>
                <Drawer >
                    <DrawerTrigger>

                        <Tooltip>
                            <TooltipTrigger >
                                <p className='underline underline-offset-4' > Contact  </p>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p > Click to open Drawer </p>
                            </TooltipContent>
                        </Tooltip>

                    </DrawerTrigger>

                    <DrawerContent >
                        <DrawerHeader>
                            <DrawerTitle className='text-center text-slate-700'>
                                {/* <span className='text-slate-700 text-end border-2 border-blue-200'> */}
                                    My Contact Details
                                {/* </span> */}
                        
                            </DrawerTitle>
                            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                        </DrawerHeader>
                        <DrawerFooter className='flex'>
                            {/* <Button>Submit</Button> */}
                            <ul className=' flex justify-center gap-6 '>

                                {contactInfo.map((item) => (
                                    <li key={item.title}>


                                        <a href={item.link} target='_blank' >
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Image
                                                        src={item.icon}
                                                        alt={item.title}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </TooltipTrigger>

                                                <TooltipContent>
                                                    <p> Click to go to  {item.title} </p>
                                                </TooltipContent>

                                            </Tooltip>

                                        </a>


                                    </li>
                                ))}

                            </ul>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

            </TooltipProvider>


        </div>
    )
}

export default Footer