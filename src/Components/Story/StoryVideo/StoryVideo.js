import React from 'react'
import ReactPlayer from 'react-player'
import './storyVideo.css'


function StoryVideo(){
    
    return (
        <div className='story-video-component'>
            <ReactPlayer 
            className='react-player'
            url='https://player.vimeo.com/video/145534891?autoplay=1&color=6ecbb8'
            width={'100%'}
            height={'100%'}
             />
        </div>
    )
}

export default StoryVideo