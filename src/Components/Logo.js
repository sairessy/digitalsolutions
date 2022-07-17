import logo from "../logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-title">
      <img src={logo} width={25} height={30} alt="logo" />
      <h2 className="title">Digital Solutions</h2>
    </div>
  );
};

export default Logo;
