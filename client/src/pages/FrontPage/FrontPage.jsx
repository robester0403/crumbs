import "./FrontPage.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.png";
import frontpageimage1 from "../../assets/images/frontpageimage1.JPG";
import backgroundImg from "../../assets/images/front-bg-blur-light-dark.png";
import youtubefrontimage from "../../assets/images/youtubefrontimage.JPG";
import phoneOverlay from "../../assets/images/phone-overlay-white-bg.png";
import styled from "styled-components";

const FrontPage = () => {
  return (
    <>
      <FrontBackground>
        <FrontPageWrap>
          <AsideWrapper>
            <article>
              <AsideTitle>
                Follow the CrumbTrails left by your influencers
              </AsideTitle>
              <AsideBodyText>
                Crumbs links viewers with influencer content and maps. Watch,
                plan, and relive their experience!
              </AsideBodyText>
              <AsideContainer>
                <Link to={`/userhome`}>
                  <AsideButton>Explore!</AsideButton>
                </Link>
                <Link to={`/login`}>
                  <AsideButton>Login</AsideButton>
                </Link>
                <Link to={`/signup`}>
                  <AsideButton>Join Us!</AsideButton>
                </Link>
              </AsideContainer>
            </article>
          </AsideWrapper>
          <PhoneWrap>
            <PhoneBackGround>
              <PhoneLogo src={logo} alt="Crumbs company logo" />
              <PhoneImage
                src={frontpageimage1}
                alt="Map with a vlogger highlighted to the marker"
              />
              <PhoneYoutubeImage
                src={youtubefrontimage}
                alt="Map with a vlogger highlighted to the marker"
              />
              <PhoneTitle>
                Follow the CrumbTrails left by your influencers
              </PhoneTitle>
              <Link to={`/userhome`}>
                <PhoneButton>Explore!</PhoneButton>
              </Link>
              <Link to={`/login`}>
                <PhoneButton>Login</PhoneButton>
              </Link>
              <Link to={`/signup`}>
                <PhoneButton>Join Us!</PhoneButton>
              </Link>
            </PhoneBackGround>
          </PhoneWrap>
        </FrontPageWrap>
      </FrontBackground>
    </>
  );
};

export default FrontPage;

const FrontBackground = styled.div`
    background: none;

    @media (min-width: 48rem) {
      background: url(${backgroundImg}) no-repeat center center fixed;
      background-size: cover;
`;

const FrontPageWrap = styled.main`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AsideWrapper = styled.aside`
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

const AsideTitle = styled.h1`
  display: none;

  @media (min-width: 48rem) {
    display: inherit;
    margin: 2rem 1rem;
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    color: $dark-text-color;
  }
`;

const AsideBodyText = styled.h3`
  display: none;

  @media (min-width: 48rem) {
    display: inherit;
    font-weight: 400;
    margin: 1rem 1rem;
    color: $red-text-color;
    text-align: center;
  }
`;

const AsideContainer = styled.div`
  display: none;

  @media (min-width: 48rem) {
    display: inherit;
    margin: 2rem 0 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: textdrop 0.6s;
  }
`;

const AsideButton = styled.button`    
display: none;

@media (min-width: 48rem) {
  display: inherit;
  max-width: 10rem;
  margin: 1rem 1rem;
  box-shadow: 2px 2px #888888;
  cursor: pointer;
  `;

const PhoneWrap = styled.section`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 48rem) {
    width: 31rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(${phoneOverlay});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 60rem;
  }
`;

const PhoneBackGround = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 24.81rem;
  margin-left: 0.3rem;
`;

const PhoneLogo = styled.img`
  padding-top: 2rem;
  width: 12.5rem;
  margin-bottom: 1rem;
`;

const PhoneImage = styled.img`
  object-fit: cover;
  width: 100%;
  margin: 1rem 0 1rem 0rem;
`;

const PhoneYoutubeImage = styled.img`
  display: none;

  @media (min-width: 48rem) {
    display: inherit;
    object-fit: cover;
    width: 100%;
    padding-bottom: 2rem;
  }
`;

const PhoneTitle = styled.h1`
  display: inherit;
  margin: 2rem 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  color: $dark-text-color;

  @media (min-width: 48rem) {
    display: none;
  }
`;

const PhoneButton = styled.button`
  display: inherit;
  max-width: 10rem;
  margin: 1rem 1rem;
  box-shadow: 2px 2px #888888;
  cursor: pointer;

  @media (min-width: 48rem) {
    display: none;
  }
`;
