import './Header.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";


const Header = () => {

  return (
    <>
        
      <section className="header">
        <div>
          <Link to={"/userhome/"}>
            <img src={logo} alt="Company logo"/>
          </Link>
        </div>
        <div>
          <Link to={"/userhome/"}>
            Crumbs Nearby
          </Link>
        </div>
        <div>
          About Us
        </div>
        <div>
          Vlogger Login
        </div>
      </section>

    </>
  )
}

export default Header;