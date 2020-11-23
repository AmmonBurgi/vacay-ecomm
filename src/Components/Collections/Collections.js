import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Collections(){
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
            <div key={index}>
                {element.product_title}
            </div>
        )
    })
    const polarizedMap = polarizedArr.map((element, index) => {
        return (
            <div key={index}>
                {element.product_title}
            </div>
        )
    })
    const prescriptionMap = prescriptionArr.map((element, index) => {
        return (
            <div key={index}>
                {element.product_title}
            </div>
        )
    })
    
    return(
        <div>
            <section>
                {matteMap}
            </section>
            <section>
                {polarizedMap}
            </section>
            <section>
                {prescriptionMap}
            </section>
        </div>
    )
}

export default Collections