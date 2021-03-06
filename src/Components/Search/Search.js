import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setSearchArray} from '../../redux/searchReducer'
import './search.css'
import axios from 'axios'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faPinterest} from '@fortawesome/free-brands-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

function Search(props){
    const [searchInput, setSearch] = useState(''),
        [searchText, setText] = useState('')

    const getSearch = () => {
        axios.get(`/api/collections/searched/?searchVal=${searchInput}`)
        .then(res => {
            setText(searchInput)
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
            <div onClick={() => props.history.push(`/collections/all/product/${element.product_id}`)} className='search-all-card' key={index} >
                <img src={element.product_img} alt={element.product_title} />
                <span className='search-all-align-title'>
                    {element.pro_quantity === 0 ? <p className='search-all-sold-out'>Sold Out</p> : null}
                    <p>{element.product_title}</p>
                    <p id='search-align-price'>$ {element.product_price}</p>
                </span>
            </div>
        )
    })

    return(
        <div className='search-component'>
             <div className='search-prev'>
                <nav className='search-prev-left'>
                    <p className='search-prev-home' onClick={() => props.history.push('/')}>Home </p>
                    <p className='search-prev-arrow'>&#62;</p>
                    <p className='search-prev-arrow'> search</p>
                </nav>
                <nav className='search-icons'>
                    <a href='https://www.instagram.com/livemoreworkless/' >
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                    <a href='https://www.pinterest.com/vacaysunglasses/' >
                        <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
                    </a>
                </nav>
            </div>
            <nav className='search-box'>
                <FontAwesomeIcon icon={faSearch} className='search-input-button' onClick={getSearch} >Search</FontAwesomeIcon>
                <input className='search-input' onKeyPress={handleKeyPress} value={searchInput} onChange={(e) => setSearch(e.target.value)} />
            </nav>
            <nav className='search-result'>
                <p>Your search for "{ searchText.length !== 0 ? searchText : (props.location.state === undefined || Object.keys(props.location.state).length === 0 ? searchText : props.location.state.searchResult) }" revealed the following:</p>
                <hr></hr>
            </nav>
            <section className='search-all-display'>
                {searchMap}
            </section>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState.searchState

export default connect(mapStateToProps, {setSearchArray})(Search)