import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import postprofileImage from "../../assets/images/고양이 프로필.png";
import LikeButton from "../LikeButton";
import { LoginContext } from "../../contexts/LoginContextProvider";
import {
  isPostLikedByUser,
  countLikesByPostId,
} from "../../apis/notificationApi";
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

  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    console.log("Token in fetchPosts:", token);
    try {
      const response = await axios.get("/api/posts", {
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
    // 포스트 추가 로직 생략
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
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (e) => {
    // 이미지 변경 로직 생략
  };

  const togglePopup = () => {
    // 팝업 토글 로직 생략
  };

  const handleCommentChange = (postId, event) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, commentText: event.target.value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = async (postId) => {
    // 댓글 제출 로직 생략
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
              initialLiked={post.liked === 1}
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
