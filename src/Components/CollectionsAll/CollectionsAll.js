import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './collectionsAll.css'

function CollectionsAll(props){
    const [collections, setCollections] = useState([])

    useEffect(() => {
        if(props.match.params.type){
            return (
                axios.get(`/api/collections/${props.match.params.type}`)
                .then(res => {
                    setCollections(res.data)
                }).catch(err => console.log('Error...', err))
            )
        }
    }, [])

    const collectionsMap = collections.map((element, index) => {
        return (
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='collections-all-card' key={index} >
                <img src={element.product_img} alt={element.product_title} />
                <span className='collections-all-align-title'>
                    {element.pro_quantity === 0 ? <p className='collections-all-sold-out'>Sold Out</p> : null}
                    <p>{element.product_title}</p>
                    <p className='all-align-price'>$ {element.product_price}</p>
                </span>
            </div>
        )
    })

    return (
        <div className='collections-all-component'>
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