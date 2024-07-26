import "../styles/Footer.css";
import SocialIcon from "../assets/icons/SocialIcons.png"; 
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideFooterForPaths = ["/", "/notifications"];

  if (hideFooterForPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
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
        Powered by <a href="http://www.saramin.co.kr" target="_blank" rel="noopener noreferrer">취업 사람인</a>
      </div>
    </footer>
  );
}
