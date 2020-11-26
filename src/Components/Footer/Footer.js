import React from 'react'
import './footer.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'
import {faCopyright} from "@fortawesome/free-solid-svg-icons"
function Footer(props){
    return (
        <footer>
            <nav className='logo-list'>
                <a href='https://www.instagram.com/livemoreworkless/'>
                    <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                </a>
                <a href='https://www.pinterest.com/vacaysunglasses/' >
                    <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                </a>
            </nav>
            <p><FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>2020 Our Planet. Our Future.</p>
        </footer>
    )
}

export default Footer