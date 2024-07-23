import axios from "axios";

export const sendLikeNotification = async (likeNotificationRequest, token) => {
  console.log("Token in sendLikeNotification:", token); // 디버그 로그 추가
  const response = await axios.post(
    "http://localhost:8080/api/notifications/like",
    likeNotificationRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to send like notification");
  }
};

export const fetchNotifications = async (userId) => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  console.log("Token in fetchNotifications:", token); // 디버그 로그 추가
  const response = await axios.get(
    `http://localhost:8080/api/notifications/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch notifications");
  }
  return response.data;
};

export const countLikesByPostId = async (postId) => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  console.log("Token in countLikesByPostId:", token); // 디버그 로그 추가
  const response = await axios.get(
    `http://localhost:8080/api/notifications/likes/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to count likes");
  }
  return response.data;
};

export const isPostLikedByUser = async (postId, liker) => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  console.log("Token in isPostLikedByUser:", token); // 디버그 로그 추가
  const response = await axios.get(
    `http://localhost:8080/api/notifications/isLiked/${postId}/${liker}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 헤더에 추가
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to check if post is liked by user");
  }
  return response.data;
};
