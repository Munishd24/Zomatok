import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    return (
      <div style={{ position:'relative', overflow:'hidden', minHeight:'100vh', background:'none' }}>
        <svg style={{position:'absolute',top:0,left:0,width:'100vw',zIndex:0}} height="70" viewBox="0 0 1500 70" fill="none">
          <path d="M0 58C329.735 118.276 390.563 0.68799 770 42.9914C1234.17 95.5051 1373 7.35581 1500 53.5V0H0V58Z" fill="#2dd4bf" fillOpacity="0.07"/>
        </svg>
        <div style={{zIndex:1,position:'relative',paddingTop:'2.6rem'}}>
          <h2 className="main-title" style={{textAlign:'center',marginTop:0}}>Food Reels Feed</h2>
          <p className="main-desc" style={{marginBottom:'1.5rem'}}>Scroll and like amazing short videos from our food partners.</p>
          <ReelFeed
            items={videos}
            emptyMessage={<>
              <img src="https://undraw.co/api/illustrations/6dc2976a-792b-4c2b-8fee-99cbe8efd5c5" alt="No food videos" style={{width:'170px',margin:'2.7rem auto 1.6rem',display:'block',opacity:.96}}/>
              <div style={{fontSize:'1.16em',color:'var(--text-desc)',textAlign:'center'}}>No food videos yet!<br/>Be the first to upload or check back soon.</div>
            </>}
          />
        </div>
        <svg style={{position:'absolute',bottom:0,left:0,width:'100vw',zIndex:0}} height="65" viewBox="0 0 1500 65" fill="none">
          <path d="M0 63.5382C139.84 30.3835 192.247 64.8931 692.5 24.7453C1287.61 -25.1838 1345.07 27.0878 1500 59.7833V65H0V63.5382Z" fill="#818cf8" fillOpacity="0.07"/>
        </svg>
      </div>
    )
}

export default Home