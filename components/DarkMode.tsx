import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'



const DarkMode = () => {

    const [mode, setMode] = useState('dark')

    useEffect(() => {

        function applyLightMode() {

            const darkLink = document.getElementById('darkLink')

            if (darkLink) {
                document.head.removeChild(darkLink)
            }

            const link = document.createElement('link');
            link.rel='stylesheet'
            link.type ='text/css'
            link.href='./styles/light-theme.css'
            link.id='lightLink'
        }

        function applyDarkMode() {

            const lightLink = document.getElementById('lightLink')

            if (lightLink) {
                document.head.removeChild(lightLink)
            }

            const link = document.createElement('link');
            link.rel='stylesheet'
            link.type ='text/css'
            link.href='./styles/dark-theme.css'
            link.id='darkLink'
        }
      
        mode =='light' ? applyLightMode() 
        :applyDarkMode()
    
      
    }, [mode])
    


  return (
    <div>
        <Button onClick={()=> setMode(mode=='dark' ? 'light': 'dark') }>

        </Button>
    </div>
  )
}

export default DarkMode