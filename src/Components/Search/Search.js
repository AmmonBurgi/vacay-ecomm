import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setSearchArray} from '../../redux/searchReducer'
import axios from 'axios'

function Search(props){
    const [searchInput, setSearch] = useState('')

    const getSearch = () => {
        axios.get(`/api/collections/searched/?searchVal=${searchInput}`)
        .then(res => {
            props.setSearchArray(res.data)
            setSearch('')
        }).catch(err => console.log('Error...', err))
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            getSearch()
        }
    }

    const searchMap = props.searchArray.map((element, index) => {
        return (
            <div key={index}>
                <p>{element.product_id}</p>
                <p>{element.product_title}</p>
            </div>
        )
    })

    return(
        <div>
            <input onKeyPress={handleKeyPress} value={searchInput} onChange={(e) => setSearch(e.target.value)} />
            <button  onClick={getSearch} >Search</button>
            <section>
                {searchMap}
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.searchState

export default connect(mapStateToProps, {setSearchArray})(Search)