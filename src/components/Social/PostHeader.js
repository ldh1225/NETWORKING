import React, { useState } from "react";
import postprofileImage from "../../assets/images/profileicon.png";

const PostHeader = ({ username, userId, onDelete, onEdit }) => {
  const [showEditOptions, setShowEditOptions] = useState(false);

  const toggleEditOptions = () => {
    setShowEditOptions(!showEditOptions);
  };

  return (
    <div className="post-header">
      <div className="user-info">
        <img src={postprofileImage} alt="Profile" className="profile-pic" />
        <div className="username">
          {username} {userId}
        </div>
      </div>
      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

export default PostHeader;
