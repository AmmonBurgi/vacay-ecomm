import React from 'react'
import './story.css'
import StoryVideo from './StoryVideo/StoryVideo'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function Story(props){

    return(
        <div className='story-component'>
            <div className='story-prev'>
                <nav className='story-prev-left'>
                    <p className='story-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='story-prev-arrow'>&#62;</p>
                    <p className='story-prev-arrow'>our story</p>
                </nav>
                <nav className='story-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <nav className='story-header-tag'>
                <p>OUR STORY</p>
                <hr></hr>
            </nav>
            <StoryVideo />
        </div>
    )
}

export default Story