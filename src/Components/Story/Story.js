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
            <div className='story-text-info'>
                <p>We are a collective of dropouts and maybe even a scholar or two. With over 30 years experience designing, developing and creating products for some of the worlds top brands, we know what we like and expect out of the goods we use and abuse on the daily. We have been fortunate enough to have traveled the world and experience countless locations, both good and bad. Throughout our adventures we have learned that it's important to make the most of every opportunity, put Family, Friends and Yourself first, help others whenever you can and always have fun. LMWL was an idea and concept we have been chewing on for many years and we are excited to bring it to life in the form of a product we all love and use every day. Sunglasses featuring handcrafted, custom designs of a timeless and classic style. High-end quality and materials at a price that won't break your bank.</p>
                <p>- - - - -</p>
                <p>The LIVE MORE WORK LESS lifestyle is not about being lazy and not working hard - it is about making the most of your time. In these busy times, it is easy to get trapped in the meaningless cycle of Work, Eat, Sleep, Repeat. We believe there is so much more to life and that no good ideas are ever found behind a desk. We believe in taking advantage of every waking moment. We believe you should do what you love and spend the time doing it with the people you care about the most. Simplifying your life, so you can have more time to explore, discover, learn and have fun. Time is free, yet priceless and once it's gone - you can never get it back. <b>LIVE MORE WORK LESS.</b></p>
            </div>
        </div>
    )
}

export default Story