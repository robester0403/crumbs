import './FrontPage.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.JPG";
import frontpageimage1 from "../../assets/images/frontpageimage1.JPG";
import youtubefrontimage from "../../assets/images/youtubefrontimage.JPG";

const FrontPage = () => {

  return (
    <>
    {/* display column here in the container background image being phone */}
      <main className="front__wrap">
        <section className="front-aside__wrap">
          <h1 className="front-aside__title">
            Follow the CrumbTrails left by your influencers
          </h1>
          <h3 className="front-aside__body-text">
            Crumbs links viewers with influencer content and maps. Watch, plan, and relive their experience!
          </h3>
          <div className="front-aside__btn-ctnr">
            <Link to={`/userhome`}>
              <h3 className="front-aside__button">
                Start Exploring
              </h3>
            </Link>
            <Link to={`/login`}>
              <h3 className="front-aside__button">
                Influencer Login
              </h3>
            </Link>
            <Link to={`/signup`}>
              <h3 className="front-aside__button">
                Join Us!
              </h3>
            </Link>
          </div>
        </section>
        <section className="front-phone__wrap">
          <div className="front-phone__screen-bg">
            <img className="front-phone__logo" src={logo} alt="Crumbs company logo"/>
            <div>
              <img className="front-phone__image" src={frontpageimage1} alt="Map with a vlogger highlighted to the marker" />
            </div>
            <div>
              <img className="front-phone__youtube-image" src={youtubefrontimage} alt="Map with a vlogger highlighted to the marker" />
            </div>
          </div>
        
        

        </section>
      </main>

    </>
  )
}

export default FrontPage;
