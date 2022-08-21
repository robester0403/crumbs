import "./FrontPage.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";
import frontpageimage1 from "../../assets/images/frontpageimage1.JPG";
import youtubefrontimage from "../../assets/images/youtubefrontimage.JPG";
import styled from "styled-components";

const FrontPage = () => {
  return (
    <>
      <div className="front__bg-image">
        <main className="front__wrap">
          <FrontLeftWrapper>
            <article>
              <h1 className="front-aside__title">
                Follow the CrumbTrails left by your influencers
              </h1>
              <h3 className="front-aside__body-text">
                Crumbs links viewers with influencer content and maps. Watch,
                plan, and relive their experience!
              </h3>
              <div className="front-aside__btn-ctnr">
                <Link to={`/userhome`}>
                  <h3 className="front-aside__button">Start Exploring</h3>
                </Link>
                <Link to={`/login`}>
                  <h3 className="front-aside__button">Influencer Login</h3>
                </Link>
                <Link to={`/signup`}>
                  <h3 className="front-aside__button">Join Us!</h3>
                </Link>
              </div>
            </article>
          </FrontLeftWrapper>
          <section className="front-phone__wrap">
            <div className="front-phone__screen-bg">
              <img
                className="front-phone__logo"
                src={logo}
                alt="Crumbs company logo"
              />
              <img
                className="front-phone__image"
                src={frontpageimage1}
                alt="Map with a vlogger highlighted to the marker"
              />
              <img
                className="front-phone__youtube-image"
                src={youtubefrontimage}
                alt="Map with a vlogger highlighted to the marker"
              />
              <h1 className="front-phone__title">
                Follow the CrumbTrails left by your influencers
              </h1>
              <Link to={`/userhome`}>
                <h3 className="front-phone__button">Start Exploring</h3>
              </Link>
              <Link to={`/login`}>
                <h3 className="front-phone__button">Influencer Login</h3>
              </Link>
              <Link to={`/signup`}>
                <h3 className="front-phone__button">Join Us!</h3>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default FrontPage;

const FrontLeftWrapper = styled.aside`
  display: none;

  @media (min-width: 48rem) {
    display: inherit;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 0.5rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 22rem;
    margin: auto 5rem;
  }
`;
