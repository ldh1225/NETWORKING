import React, { useContext, useState } from "react";
import { sendLikeNotification } from "../apis/notificationApi";
import { LoginContext } from "../contexts/LoginContextProvider";
import * as Swal from "../apis/alert";
import "../styles/LikeButton.css";

const LikeButton = ({ targetUser, postId, onLike }) => {
  const { isLogin, userInfo } = useContext(LoginContext);
  const [liked, setLiked] = useState(false);

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
      setLiked(!liked);
      onLike(postId);
    } catch (error) {
      Swal.alert("오류", "좋아요 알림을 보내는 데 실패했습니다.", "error");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`like-button ${liked ? "liked" : ""}`}
    >
      ❤️
    </button>
  );
};

export default LikeButton;
