import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './collectionsAll.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'

function CollectionsAll(props){
    const [collections, setCollections] = useState([]),
        [backFadeToggle, setBackFadeToggle] = useState(false)

    useEffect(() => {
        if(props.match.params.type){
            axios.get(`/api/collections/${props.match.params.type}`)
            .then(res => {
                setCollections(res.data)
            }).catch(err => console.log('Error...', err))
        }
        const timer = setTimeout(() => {
            setBackFadeToggle(true)
        }, 100);
        return () => clearTimeout(timer)
    }, [])

    const collectionsMap = collections.map((element, index) => {
        return (
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='collections-all-card' key={index} >
                <img src={element.product_img} alt={element.product_title} />
                <span className='collections-all-align-title'>
                    {element.pro_quantity === 0 ? <p className='collections-all-sold-out'>Sold Out</p> : null}
                    <p>{element.product_title}</p>
                    <p id='all-align-price'>$ {element.product_price}</p>
                </span>
            </div>
        )
    })

    return (
        <div className={backFadeToggle === true ? 'collections-all-component' : 'no-collections-all-component'}>
            <div className='collections-all-prev'>
                <nav className='collections-all-prev-left'>
                    <p className='collections-all-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p>&#62;</p>
                    <p className='collections-all-prev-home' onClick={() => props.history.push('/collections')}> collections</p>
                    <p className='collections-all-prev-arrow'>&#62;</p>
                    <p className='collections-all-prev-arrow'>{props.match.params.type}</p>
                </nav>
                <nav className='collections-all-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <div className='collections-all-tag'>
                <p>{props.match.params.type} Collections</p>
                <hr></hr>
            </div>
            <section className='collections-all-display'>
               {collectionsMap} 
            </section>
            
        </div>
    )
}

export default CollectionsAll