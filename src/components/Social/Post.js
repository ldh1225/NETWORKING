import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from "react";
import {
  countLikesByPostId,
  isPostLikedByUser,
} from "../../apis/notificationApi";
import postprofileImage from "../../assets/images/고양이 프로필.png";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "../../styles/Social/Post.css";

const PostHeader = ({ username, userId, onDelete }) => {
  return (
    <div className="post-header">
      <div className="user-info">
        <img src={postprofileImage} alt="Profile" className="profile-pic" />
        <div className="username">
          {username} ({userId})
        </div>
      </div>
      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

const Post = () => {
  const { userInfo, isLogin } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [showButton, setShowButton] = useState(false); // 페이지 맨 위로 스크롤 버튼 상태

  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fetchPosts = async () => {
    const token = Cookies.get("accessToken");
    console.log("Token in fetchPosts:", token);
    if (!token) {
        console.error("No token found, user is not authenticated");
        return;  // 또는 적절한 에러 처리를 추가합니다.
    }
    try {
      const response = await axios.get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postsData = response.data;

      // 각 포스트의 좋아요 상태와 총 좋아요 수를 가져오기
      const updatedPosts = await Promise.all(
        postsData.map(async (post) => {
          const liked = await isPostLikedByUser(post.id, userInfo.userId);
          const likes = await countLikesByPostId(post.id);
          return { ...post, liked, likes };
        })
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleAddPost = async () => {
    const token = Cookies.get("accessToken");
    console.log("Token in handleAddPost:", token);
    if (!token) {
        console.error("No token found, user is not authenticated");
        return;  // 또는 적절한 에러 처리를 추가합니다.
    }
    try {
      const newPost = {
        contentPost: newPostContent,
        userId: userInfo.userId,
        username: userInfo.username,
      };

      const formData = new FormData();
      formData.append("contentPost", newPostContent);
      if (newPostImage) {
        formData.append("image", newPostImage);
      }

      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPosts();
      setNewPostContent("");
      setNewPostImage(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = Cookies.get("accessToken");
    console.log("Token in handleDeletePost:", token);
    if (!token) {
        console.error("No token found, user is not authenticated");
        return;  // 또는 적절한 에러 처리를 추가합니다.
    }
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPostImage(file);
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

  const handleCommentSubmit = async (postId) => {
    const token = Cookies.get("accessToken");
    const post = posts.find((post) => post.id === postId);
    const commentText = post.commentText;

    if (!commentText) return;

    try {
      await axios.post(
        `/api/posts/${postId}/comments`,
        { contentComment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  const handleLike = async (postId, newLikes) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: newLikes,
          liked: newLikes > post.likes ? 1 : 0,
        };
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            userId={post.userId}
            onDelete={() => handleDeletePost(post.id)}
          />
          {post.imagePost && (
            <img src={post.imagePost} alt="Post" className="main-img" />
          )}
          <div className="description">{post.contentPost}</div>
          <div className="meta">
            <span>💬 {post.comments?.length || 0} comments</span>
            <span className="like-count">{post.likesCount} likes</span>
          </div>
          <div className="comments">
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  {comment.contentComment}
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
              value={post.commentText || ""}
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

      {/* 페이지 맨 위로 보내는 버튼 */}
      {showButton && (
        <button onClick={scrollToTop} className="scroll-to-top">
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default Post;
