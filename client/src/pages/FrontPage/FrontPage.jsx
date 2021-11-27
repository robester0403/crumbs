import './FrontPage.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";
import frontpageimage1 from "../../assets/images/frontpageimage1.JPG";

const FrontPage = () => {

  return (
    <>

      
    {/* display column here in the container background image being phone */}
      <section className="frontphone__wrap">
        <img className="frontphone__logo" src={logo} alt="Crumbs company logo"/>
        <h1 className="frontphone__title">
          Map Out Vlogger's Experiences
        </h1>
        <h3 className="frontphone__body-text">
          Crumbs merges blogger content and maps. Watch, plan, and relive their experience!
        </h3>
        <div>
          <img className="frontphone__image" src={frontpageimage1} alt="Map with a vlogger highlighted to the marker" />
        </div>
        <Link to={`/userhome/`}>
          <h3 className="frontphone__button">
            Get Started
          </h3>
        </Link>
      </section>

    </>
  )
}

export default FrontPage;
