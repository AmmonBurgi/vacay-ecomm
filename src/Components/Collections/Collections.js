import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Collections(){
    const [matteArr, setMatte] = useState([]),
        [polarizedArr, setPolarized] = useState([]),
        [prescriptionArr, setPres] = useState([])

    useEffect(() => {
        axios.all(['/api/collections/matte', '/api/collections/polarized', '/api/collections/prescriptions']).then(axios.spread((...res) => {
            setMatte(res[0])
            setPolarized(res[1])
            setPres(res[2])
        })).catch(err => console.log('Error...', err))
    }, [])

    const matteMap = matteArr.map((element, index) => {
        return (
            <div>
                element.product_title
            </div>
        )
    })
    const polarizedMap = polarizedArr.map((element, index) => {
        return (
            <div>
                element.product_title
            </div>
        )
    })
    const prescriptionMap = prescriptionArr.map((element, index) => {
        return (
            <div>
                element.product_title
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