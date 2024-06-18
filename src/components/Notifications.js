import React from "react";

const Notifications = () => {
  return (
    <div className="notifications">
      <div className="notifications__tabs">
        <button className="active">전체</button>
        <button>업데이트</button>
        <button>태그</button>
      </div>
      <div className="notifications-list">
        <div className="notification">
          <div className="notification__job">
            <p>
              Hyundai Motor Company (현대자동차) [ICT] Frontend Developer 외
              맞춤 추천 채용공고 9개
            </p>
            <a className="notification__job-view">채용 공고 보기</a>
          </div>
          <button className="more-options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
        <div className="notification">
          <p>000님이 회원님의 게시물을 좋아합니다.</p>
          <button className="more-options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
        <div className="notification">
          <p>000님이 회원님을 팔로우하기 시작했습니다.</p>
          <button className="more-options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
        <div className="notification">
          <p>
            대외홍보 서비스 업계 사업체 소유주인 사람이 회원님을 조회했습니다.
          </p>
          <button className="more-options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
