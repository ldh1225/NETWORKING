import React, { useContext, useState, useEffect } from "react";
import { sendLikeNotification } from "../apis/notificationApi";
import { LoginContext } from "../contexts/LoginContextProvider";
import * as Swal from "../apis/alert";
import "../styles/LikeButton.css";

const LikeButton = ({ targetUser, postId, onLike, liked, likes }) => {
  const { isLogin, userInfo } = useContext(LoginContext);
  const [isLiked, setIsLiked] = useState(liked === 1);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    setIsLiked(liked === 1);
    setLikeCount(likes);
  }, [liked, likes]);

  const handleLike = async () => {
    if (!isLogin) {
      Swal.alert(
        "로그인 필요",
        "로그인 후 좋아요를 누를 수 있습니다.",
        "warning"
      );
      return;
    }
    try {
      await sendLikeNotification(userInfo.userId, targetUser, postId);
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);
      onLike(postId);
    } catch (error) {
      Swal.alert("오류", "좋아요 알림을 보내는 데 실패했습니다.", "error");
    }
  };

  return (
    <div className="like-button-container">
      <button
        onClick={handleLike}
        className={`like-button ${isLiked ? "liked" : ""}`}
      >
        <span className="heart-icon"></span>
      </button>
      <span>{likeCount} likes</span>
    </div>
  );
};

export default LikeButton;
