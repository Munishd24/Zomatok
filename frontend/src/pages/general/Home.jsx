import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                setVideos(response.data.foodItems)
            })
            .catch(error => {
                console.error('Failed to load videos:', error);
                // If 401 and clearCookie flag, redirect to login
                if (error.response?.status === 401 && error.response?.data?.clearCookie) {
                    console.log('Invalid session, redirecting to login...');
                    navigate('/user/login');
                }
            })
    }, [navigate])

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
                    FoodView
                </h1>
            </header>

            <ReelFeed
                items={videos}
                onLike={handleLike}
                onSave={handleSave}
                emptyMessage="No food videos yet. Check back soon!"
            />
        </div>
    )
}

export default Home