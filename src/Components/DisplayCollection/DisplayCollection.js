import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DisplayCollection(props){
    const [productObj, setProduct] = useState({})
    const [proDetails, setDetails] = useState([])

    useEffect(() => {
        axios.get(`/api/collections/product/?productId=${props.match.params.id}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data.mainProduct[0])
            setDetails(res.data.productDetails)
        }).catch(err => console.log('Error...', err))
    }, [])

    const detailsMap = proDetails.map((element, index) => {
        console.log(element)
        return (
            <div key={index}>
                {element.detail}
            </div>
        )
    })

    return (
        <div>
            {productObj.product_title}
            <div>
                {detailsMap}
            </div>
        </div>
    )
}

export default DisplayCollection