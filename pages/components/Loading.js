import React from 'react'
import { FadingCircle } from 'better-react-spinkit'
import { height } from '@mui/system'

function Loading() {
  return (
    <center style={{display:'grid', placeItems:'center', height:'100vh'}}>
        <div className="loading">
            <img src="https://res.cloudinary.com/chuckmaster/image/upload/v1667902139/myportfolio_img/favicon_xsd7f9.png" alt="whatsapp"
            height={200} 
            style={{marginBottom:10}}/>
        <FadingCircle color="#3cbc28" size={60}/>
        </div>
        
        
    </center>
  )
}

export default Loading