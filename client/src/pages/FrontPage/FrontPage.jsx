import './FrontPage.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";
import frontpageimage1 from "../../assets/images/frontpageimage1.JPG";
import youtubefrontimage from "../../assets/images/youtubefrontimage.JPG";

const FrontPage = () => {

  return (
    <>
      <div className="front__bg-image">
          <main className="front__wrap">
            <section className="front-aside__wrap">
              <article>
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
              </article>
            </section>
            <section className="front-phone__wrap">
              <div className="front-phone__screen-bg">
                <img className="front-phone__logo" src={logo} alt="Crumbs company logo"/>
                  <img className="front-phone__image" src={frontpageimage1} alt="Map with a vlogger highlighted to the marker" />
                  <img className="front-phone__youtube-image" src={youtubefrontimage} alt="Map with a vlogger highlighted to the marker" />
                  <h1 className="front-phone__title">
                    Follow the CrumbTrails left by your influencers
                  </h1>
                  <Link to={`/userhome`}>
                    <h3 className="front-phone__button">
                      Start Exploring
                    </h3>
                  </Link>
                  <Link to={`/login`}>
                    <h3 className="front-phone__button">
                      Influencer Login
                    </h3>
                  </Link>
                  <Link to={`/signup`}>
                    <h3 className="front-phone__button">
                      Join Us!
                    </h3>
                  </Link>
                </div>
            </section>
          </main>
      </div>
    </>
  )
}

export default FrontPage;
