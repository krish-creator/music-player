import React from 'react'
import './PlayerComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PlayerComponent = () => {
    return (
        <div className='container'>
            <div className='player-container'>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="What are you looking for?" />
                    <button type="submit" class="searchButton">
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
                <div className='album-art'>
                    <button className='play-btn' type='submit'>

                    </button>
                </div>

            </div>
        </div>
    )
}

export default PlayerComponent