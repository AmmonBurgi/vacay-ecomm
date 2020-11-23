import React from 'react'
import './story.css'
import StoryVideo from './StoryVideo/StoryVideo'

function Story(props){

    return(
        <div className='story-component'>
            <nav className='story-header-tag'>
                <p>OUR STORY</p>
                <hr></hr>
            </nav>
            <StoryVideo />
        </div>
    )
}

export default Story