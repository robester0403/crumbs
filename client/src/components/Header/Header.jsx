import './Header.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo2.png";


const Header = () => {

  return (
    <>
        
      <section className="nav-bar">
        <div>
          <Link to={"/userhome/"}>
            <img className="nav-bar__logo" src={logo} alt="Company logo"/>
          </Link>
        </div>
        <div className="nav-bar__header">
          <Link to={"/"}>
            CrumbsTrails
          </Link>
        </div>
        <div className="nav-bar__header">
          <Link to={"/signup"}>
            Join Us
          </Link>
        </div>
        <div className="nav-bar__header">
        <Link to={"/login"}>
          Vlogger Login
        </Link>
        </div>
      </section>

    </>
  )
}

export default Header;