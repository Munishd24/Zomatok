import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())
  const [likedItems, setLikedItems] = useState(new Set())
  const [savedItems, setSavedItems] = useState(new Set())
  const [floatingHearts, setFloatingHearts] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  const handleLike = (item) => {
    const isLiked = likedItems.has(item._id)
    
    if (!isLiked) {
      // Add floating heart animation
      const heartId = Date.now()
      setFloatingHearts(prev => [...prev, { id: heartId, itemId: item._id }])
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== heartId))
      }, 1000)
    }

    setLikedItems(prev => {
      const newSet = new Set(prev)
      if (isLiked) {
        newSet.delete(item._id)
      } else {
        newSet.add(item._id)
      }
      return newSet
    })

    if (onLike) onLike(item)
  }

  const handleSave = (item) => {
    setSavedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(item._id)) {
        newSet.delete(item._id)
      } else {
        newSet.add(item._id)
      }
      return newSet
    })

    if (onSave) onSave(item)
  }

  return (
    <div className="reels-container">
      <div className="reels-feed" role="list">
        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <article key={item._id} className="reel" role="listitem">
            {/* Header */}
            <div className="reel-header">
              <div className="reel-header-avatar">
                {item.name ? item.name.charAt(0).toUpperCase() : 'F'}
              </div>
              <div className="reel-header-info">
                <p className="reel-header-name">{item.name || 'Food Partner'}</p>
              </div>
            </div>

            {/* Video Container */}
            <div className="reel-video-container">
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />
              
              {/* Floating hearts */}
              {floatingHearts
                .filter(h => h.itemId === item._id)
                .map(heart => (
                  <div key={heart.id} className="floating-heart">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </div>
                ))}
            </div>

            {/* Actions Bar */}
            <div className="reel-actions-bar">
              <button
                onClick={() => handleLike(item)}
                className={`reel-action-btn ${likedItems.has(item._id) ? 'liked' : ''}`}
                aria-label="Like"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>

              <button
                onClick={() => handleSave(item)}
                className={`reel-action-btn ${savedItems.has(item._id) ? 'saved' : ''}`}
                aria-label="Save"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="reel-content">
              <div className="reel-likes">
                {(item.likeCount ?? 0) + (likedItems.has(item._id) ? 1 : 0)} likes
              </div>
              <p className="reel-description">
                <strong>{item.name || 'Food Partner'}</strong>
                {item.description}
              </p>
              {item.foodPartner && (
                <Link className="reel-link" to={"/food-partner/" + item.foodPartner}>
                  Visit Store
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed
