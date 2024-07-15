import React, { useState, useContext } from "react";
import "../../styles/Social/Post.css";
import postImage from "../../assets/images/피드 메이지 예시.png";
import postprofileImage from "../../assets/images/고양이 프로필.png";
import LikeButton from "../LikeButton";
import { LoginContext } from "../../contexts/LoginContextProvider";

const PostHeader = ({ username, onDelete }) => {
  return (
    <div className="post-header">
      <div className="user-info">
        <img
          src={postprofileImage}
          alt="Profile Picture"
          className="profile-pic"
        />
        <div className="username">{username}</div>
      </div>
      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

const Post = () => {
  const { userInfo } = useContext(LoginContext);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "user2",
      content: "테스트용 포스트.",
      comments: [],
      likes: 5,
      liked: false,
      commentText: "",
    },
  ]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddPost = () => {
    if (newPostContent.trim() !== "") {
      const newPost = {
        id: posts.length + 1,
        username: "user2",
        content: newPostContent,
        comments: [],
        likes: 0,
        liked: false,
        commentText: "",
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setShowPopup(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCommentChange = (postId, event) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, commentText: event.target.value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.commentText.trim() !== "") {
        return {
          ...post,
          comments: [...post.comments, post.commentText],
          commentText: "",
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const liked = !post.liked;
        const likes = liked ? post.likes + 1 : post.likes - 1;
        return { ...post, liked, likes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="post-container">
      <button onClick={togglePopup} className="add-post-button">
        새 포스트 작성
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="new-post-popup">
            <div className="popup-content">
              <div className="popup-header">
                <span>새 포스트 작성</span>
                <button onClick={togglePopup} className="close-popup-button">
                  ✕
                </button>
              </div>
              <textarea
                placeholder="나누고 싶은 생각이 있으세요?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="new-post-textarea"
              />
              <button onClick={handleAddPost} className="popup-add-post-button">
                업데이트
              </button>
            </div>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post">
          <PostHeader
            username={post.username}
            onDelete={() => handleDeletePost(post.id)}
          />
          <img src={postImage} alt="Post Image" className="main-img" />
          <div className="description">{post.content}</div>
          <div className="meta">
            <span>💬 {post.comments.length} comments</span>
            <span className="like-count">{post.likes} likes</span>
            <LikeButton
              targetUser={post.username}
              postId={post.id}
              onLike={handleLike}
            />
          </div>
          <div className="comments">
            {post.comments.map((comment, index) => (
              <div key={index} className="comment">
                {comment}
              </div>
            ))}
          </div>
          <div className="comment-input">
            <img
              src={postprofileImage}
              alt="User Profile"
              className="profile-pic"
            />
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="comment-textbox"
              value={post.commentText}
              onChange={(e) => handleCommentChange(post.id, e)}
            />
            <button
              className="comment-button"
              onClick={() => handleCommentSubmit(post.id)}
            >
              Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
