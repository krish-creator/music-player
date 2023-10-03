import React from 'react'
import './ListComponent.scss'
import trackList from '../../_trackList'
import { useNavigate } from 'react-router-dom'

const ListComponent = () => {

    const navigate = new useNavigate()

    const playTrack = (trackId) => {
        navigate(`/player/${trackId}`)
    }


    return (
        <section className="container-fluid" id='list-section'>
            <div className="row d-flex justify-content-center p-5">
                <div className="col-12 col-xl-3">
                    <h1 className='display-1 py-5'>List of Songs</h1>
                    {
                        trackList.length > 0 && trackList.map((track, index) => {
                            return (
                                <div key={index}>
                                    <button className='btn' onClick={() => playTrack(track.trackId)}>
                                        <p className='h5'>
                                            {track.trackId}. {track.trackName}
                                        </p>
                                    </button>

                                    <hr className='p-0 m-0' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default ListComponent