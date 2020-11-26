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
            <div className='collections-all-product' key={index} >
                {element.product_title}
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