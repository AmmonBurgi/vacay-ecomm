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

    return(
        <div>
            <input value={searchInput} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={getSearch} >Search</button>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.searchState

export default connect(mapStateToProps, {setSearchArray})(Search)