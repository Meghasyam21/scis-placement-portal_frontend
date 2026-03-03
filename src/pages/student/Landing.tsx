import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SCIS Placement Portal</div>
        <div className="nav-links">
          <a href="#">Students Corner</a>
          <a href="#">Reach out to UoHyd</a>
          <a href="#">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>University of Hyderabad</h1>
        <p>School of Computer and Information Sciences</p>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
