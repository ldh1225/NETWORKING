import axios from 'axios';
import React, { useEffect, useState } from 'react';
import postprofileImage from '../../assets/images/고양이 프로필.png';
import '../../styles/Social/Post.css';

const PostHeader = ({ username, onDelete }) => {
    return (
        <div className="post-header">
            <div className="user-info">
                <img src={postprofileImage} alt="Profile Picture" className="profile-pic" />
                <div className="username">{username}</div>
            </div>
            <button className="delete-button" onClick={onDelete}>×</button>
        </div>
    );
};

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const handleAddPost = async () => {
        console.log('Updating post...'); 
        if (newPostContent.trim() !== '') {
            const formData = new FormData();
            formData.append('contentPost', newPostContent);
            if (newPostImage) {
                formData.append('imagePost', newPostImage);
            }
            formData.append('userId', 1); 

            try {
                const response = await axios.post('/api/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Post created:', response.data); 
                setNewPostContent('');
                setNewPostImage(null);
                setShowPopup(false);
                fetchPosts();
            } catch (error) {
                console.error('Error creating post', error);
            }
        } else {
            console.error('Post content is empty');
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewPostImage(e.target.files[0]);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCommentChange = (postId, event) => {
        const updatedPosts = posts.map(post =>
            post.id === postId
                ? { ...post, commentText: event.target.value }
                : post
        );
        setPosts(updatedPosts);
    };

    const handleCommentSubmit = async (postId) => {
        const post = posts.find(post => post.id === postId);
        if (post && post.commentText.trim() !== '') {
            const newComment = {
                postId: postId,
                userId: 1,  
                contentComment: post.commentText
            };

            try {
                await axios.post('/api/comments', newComment);
                fetchPosts();
            } catch (error) {
                console.error('Error adding comment', error);
            }
        }
    };

    return (
        <div className="post-container">
            <button onClick={togglePopup} className="add-post-button">새 포스트 작성</button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="new-post-popup">
                        <div className="popup-content">
                            <div className="popup-header">
                                <span>새 포스트 작성</span>
                                <button onClick={togglePopup} className="close-popup-button">✕</button>
                            </div>
                            <textarea
                                placeholder="나누고 싶은 생각이 있으세요?"
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                className="new-post-textarea"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <button onClick={handleAddPost} className="popup-add-post-button">업데이트</button>
                        </div>
                    </div>
                </div>
            )}

            {posts.map(post => (
                <div key={post.id} className="post">
                    <PostHeader username={post.username} onDelete={() => handleDeletePost(post.id)} />
                    {post.imagePost && <img src={post.imagePost} alt="Post Image" className="main-img" />}
                    <div className="description">{post.contentPost}</div>
                    <div className="meta">
                        <span>💬 {post.comments.length} comments</span>
                        <span className="like-count">{post.likesCount} likes</span>
                    </div>
                    <div className="comments">
                        {post.comments.map((comment, index) => (
                            <div key={index} className="comment">{comment.contentComment}</div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <img src={postprofileImage} alt="User Profile" className="profile-pic" />
                        <input
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            className="comment-textbox"
                            value={post.commentText || ''}
                            onChange={(e) => handleCommentChange(post.id, e)}
                        />
                        <button className="comment-button" onClick={() => handleCommentSubmit(post.id)}>Post</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Post;
