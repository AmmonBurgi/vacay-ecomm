import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Search(props){
    const [searchInput, setSearch] = useState(''),
        [searchedPro, setSearchedPro] = useState([])

    const getSearch = (searchVal) => {
        axios.get(`/api/collections/searched/?searchVal=${searchVal}`)
        .then(res => {
            setSearchedPro(res.data)
            console.log(res.data)
        }).catch(err => console.log('Error...', err))
    }

    useEffect(() => {
        const {state} = props.location
        if(state !== undefined){
            getSearch(state.searchValue)
        }
    }, [])

    return(
        <div>
            <input value={searchInput} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => getSearch(searchInput)} >Search</button>
        </div>
    )
}

export default Search