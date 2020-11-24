import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './collections.css'

function Collections(props){
    const [matteArr, setMatte] = useState([]),
        [polarizedArr, setPolarized] = useState([]),
        [prescriptionArr, setPres] = useState([])

    const matteReq = axios.get('/api/collections/matte')
    const polarizedReq = axios.get('/api/collections/polarized')
    const prescriptionReq = axios.get('/api/collections/prescription')

    useEffect(() => {
        axios.all([ matteReq, polarizedReq, prescriptionReq ]).then(axios.spread((...res) => {
            setMatte(res[0].data)
            setPolarized(res[1].data)
            setPres(res[2].data)
        })).catch(err => console.log('Error...', err))
    }, [])

    const matteMap = matteArr.map((element, index) => {
        return (
            <div className='product-card' key={index}>
                {element.product_title}
            </div>
        )
    })
    const polarizedMap = polarizedArr.map((element, index) => {
        return (
            <div className='product-card' key={index}>
                {element.product_title}
            </div>
        )
    })
    const prescriptionMap = prescriptionArr.map((element, index) => {
        return (
            <div className='product-card' key={index}>
                {element.product_title}
            </div>
        )
    })

    return(
        <div className='collections-component'>
            <nav className='collections-tag'>
                <nav className='all-collections-tag'> 
                   <p>COLLECTIONS</p> 
                   <button onClick={() => props.history.push('/collection-all')} >All Collections</button>
                </nav>
                <hr></hr>
            </nav>
            <nav className='type-tag'>
                <p>CLASSIC MATTE</p>
                <button>ALL CLASSIC MATTE</button>
            </nav>
            <section className='matte-section'>
                {matteMap}
            </section>
            <nav className='type-tag'>
                <p>CLASSIC POLARIZED</p>
                <button>ALL CLASSIC POLARIZED</button>
            </nav>
            <section className='polarized-section'>
                {polarizedMap}
            </section>
            <nav className='type-tag'>
                <p>CLASSIC PRESCRIPTION</p>
                <button>ALL CLASSIC PRESCRIPTION</button>
            </nav>
            <section className='prescription-section'>
                {prescriptionMap}
            </section>
        </div>
    )
}

export default Collections