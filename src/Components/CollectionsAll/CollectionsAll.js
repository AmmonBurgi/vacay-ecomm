import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './collectionsAll.css'

function CollectionsAll(){
    const [collections, setCollections] = useState([])

    useEffect(() => {
        axios.get('/api/collections')
        .then(res => {
            setCollections(res.data)
        }).catch(err => console.log('Error...', err))
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
                <p>All Collection</p>
                <hr></hr>
            </div>
            <section className='collections-all-display'>
               {collectionsMap} 
            </section>
            
        </div>
    )
}

export default CollectionsAll