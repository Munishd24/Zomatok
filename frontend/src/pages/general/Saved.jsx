import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    name: item.food.name,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
            .catch(() => { /* noop */ })
    }, [])

    const handleLike = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/like", 
                { foodId: item._id }, 
                { withCredentials: true }
            )
        } catch (error) {
            console.error('Like error:', error)
        }
    }

    const handleSave = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", 
                { foodId: item._id }, 
                { withCredentials: true }
            )
            // Remove from saved list
            setVideos((prev) => prev.filter((v) => v._id !== item._id))
        } catch (error) {
            console.error('Save error:', error)
        }
    }

    return (
        <div className="reels-page">
            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '60px',
                background: '#000',
                borderBottom: '1px solid #262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#fff',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    Saved
                </h1>
            </header>

            <ReelFeed
                items={videos}
                onLike={handleLike}
                onSave={handleSave}
                emptyMessage="No saved videos yet."
            />
        </div>
    )
}

export default Saved
