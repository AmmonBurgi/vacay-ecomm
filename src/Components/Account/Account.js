import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux' 
import axios from 'axios'

function Account(props){
    const [products, setProducts] = useState([]),
        [history, setHistory] = useState([])

    useEffect(() => {
        axios.get('/api/purchase/history')
        .then(res => {
            setProducts(res.data.products)
            setHistory(res.data.historyArr)
        })
    }, [])

    const productMap = products.map((element, index) => {
        return (
            <div key={index} >
                <p>{element.date}</p>
            </div>
        )
    })
    const historyMap = history.map((element, index) => {
        return (
            <div key={index} >
                <p>{element.product_title}</p>
            </div>
        )
    })

    console.log(products)
    console.log(history)
    return (
        <div>
            <div>
                {productMap}
            </div>
            <div>
                {historyMap}
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Account)