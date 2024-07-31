import React from "react";
import "../styles/HomePage.css";
import sampleImage from "../assets/images/sample.png";
import "../styles/Footer.css";
import SocialIcon from "../assets/icons/Social Icons.png";
import { useLocation } from "react-router-dom";

function HomePage() {
  return (
    <div>
      {/* <header className="header">
        <h1>
          NET<span>WORKING</span>
        </h1>
      </header> */}
      <div className="main-content__homepage">
        <div className="search-section__homepage">
          <h2>
            <span className="upper">Y</span>our <span className="upper">D</span>
            ream <br />
            <span className="upper">C</span>areer{" "}
            <span className="upper">S</span>tarts <br />
            <span className="upper">H</span>ere
            <span className="teams">
              networking <br /> 김형순 / 김현주 / 유승재 / 이동한 / 장소지
            </span>
          </h2>
          <div>
            <input type="text" placeholder="Search for a Job" />
            <button>Get Started</button>
          </div>
        </div>
        <div>
          <img src={sampleImage} alt="Sample" className="sample-image" />
        </div>
      </div>

      <footer className="footer__homepage">
        <div className="footer__container">
          <div className="footer__brand">
            <h1 className="footer__title">
              NET<span>WORKING</span>
            </h1>
            <img className="footer__icon" src={SocialIcon} alt="소셜 아이콘" />
          </div>
          <div className="footer__links">
            <div className="footer__group">
              <h2>Company</h2>
              <p>About Us</p>
              <p>Careers</p>
              <p>Press</p>
            </div>
            <div className="footer__group">
              <h2>Support</h2>
              <p>Contact Us</p>
              <p>FAQ</p>
              <p>Privacy Policy</p>
            </div>
            <div className="footer__group">
              <h2>Contact Information</h2>
              <p>NETWORKING</p>
              <p>서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩)</p>
              <p>Email: multicampus@networking.com</p>
              <p>Phone: 1544-9001</p>
            </div>
          </div>
        </div>
        <div className="powered-by">
          Powered by{" "}
          <a
            href="http://www.saramin.co.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            취업 사람인
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
