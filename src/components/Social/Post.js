import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import postprofileImage from "../../assets/images/고양이 프로필.png";
import LikeButton from "../LikeButton";
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
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    console.log("Token in fetchPosts:", token);
    try {
      const response = await axios.get("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postData = response.data;

      const updatedPosts = await Promise.all(
        postData.map(async (post) => {
          const likeResponse = await axios.get(
            `/api/notifications/likes/${post.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          post.likes = likeResponse.data;
          if (isLogin) {
            const isLikedResponse = await axios.get(
              `/api/notifications/isLiked/${post.id}/${userInfo.userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            post.liked = isLikedResponse.data;
          } else {
            post.liked = false;
          }
          return post;
        })
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleAddPost = async () => {
    if (newPostContent.trim() !== "") {
      const formData = new FormData();
      formData.append("contentPost", newPostContent);
      if (newPostImage) {
        formData.append("imagePost", newPostImage);
      }
      formData.append("userId", userInfo?.userId.toString());

      const token = localStorage.getItem("token");
      console.log("Token in handleAddPost:", token);

      try {
        const response = await axios.post("/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Post created:", response.data);
        setNewPostContent("");
        setNewPostImage(null);
        setShowPopup(false);
        fetchPosts(); // 새 포스트 작성 후 포스트 목록 갱신
      } catch (error) {
        console.error("Error creating post", error);
      }
    } else {
      console.error("Post content is empty");
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    console.log("Token in handleDeletePost:", token);
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts(); // 포스트 삭제 후 포스트 목록 갱신
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(e.target.files[0]);
    }
  };

  const togglePopup = () => {
    if (showPopup) {
      setNewPostContent("");
      setNewPostImage(null);
    }
    setShowPopup(!showPopup);
  };

  const handleCommentChange = (postId, event) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, commentText: event.target.value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = async (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post && post.commentText.trim() !== "") {
      const newComment = {
        postId: postId,
        userId: userInfo?.userId.toString(),
        contentComment: post.commentText,
      };

      const token = localStorage.getItem("token");
      console.log("Token in handleCommentSubmit:", token);

      try {
        await axios.post("/api/comments", newComment, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchPosts(); // 댓글 작성 후 포스트 목록 갱신
      } catch (error) {
        console.error("Error adding comment", error);
      }
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
            <img src={post.imagePost} alt="Post" className="post-image" />
          )}
          <div className="post-content">{post.contentPost}</div>
          <div className="post-footer">
            <span className="comments-count">
              💬 {post.comments?.length || 0} comments
            </span>
            <LikeButton
              targetUser={post.userId}
              postId={post.id}
              liked={post.liked}
              likes={post.likes}
              onClick={handleLike}
            />
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
    </div>
  );
};

export default Post;
