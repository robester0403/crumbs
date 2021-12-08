import './Header.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";


const Header = () => {

  return (
    <>
        
      <section className="nav-bar">
        <div>
          <Link to={"/userhome/"}>
            <img className="nav-bar__logo" src={logo} alt="Company logo"/>
          </Link>
        </div>
        <div className="">
          <Link to={"/userhome/"}>
            CrumbsTrails
          </Link>
        </div>
        <div className="">
          About Us
        </div>
        <div className="">
          Vlogger Login
        </div>
      </section>

    </>
  )
}

export default Header;