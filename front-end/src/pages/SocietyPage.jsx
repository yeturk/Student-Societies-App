  import React from "react";
  import { FaInstagram } from "react-icons/fa";
  import { FaXTwitter } from "react-icons/fa6";

  import "./../styles/society-page.css";
  import "./../assets/logos/seferber.png";
  import Accordion from "../components/Accordion";
  import ImageSlider from "../components/ImageSlider";

  import logo from "./../assets/logos/seferber.png";
  import data from "../data/data.json";
  import img1 from "../assets/02.jpg";
  import img2 from "../assets/03.jpg";
  import img3 from "../assets/09.jpg";  

  function SocietyPage({societyIndex}) {
    const societyData = data?.[societyIndex];
    const images1 = [img1, img2, img2];
    const images2 = [img1, img2, img2];

    return (
      <div className="society-page-container">
        <section className="body">
          <div className="logo-info-container">
            <div className="society-logo-container">
              {/* <img src={logo} alt="society-logo" className="society-logo"></img> */}
              <div className="society-logo"></div>
            </div>
            <div className="society-info">
              <h1 className="society-name">{societyData.name}</h1>
              <span className="society-description">{societyData.description}</span>
              <div className="society-links">
                <div className="social-media-accounts">
                  {societyData?.instagram && (
                    <a href={societyData.instagram} aria-label="Instagram"> 
                      <FaInstagram />
                    </a>
                  )}
                  {societyData?.x && (
                    <a href={societyData.x} aria-label="X (formerly Twitter)">
                      <FaXTwitter />
                    </a>
                  )}
                </div>
                <div className="follow-button">Sign up</div>
                <div className="follow-button">Follow</div>
              </div>
            </div>
          </div>
          <div className="image-slider-container">
            {images1.length !== 0 && 
            <>
              <div className="activities">
                <p className="activities-title"> Previous Activities </p>
                <div className="image-slider">
                  <ImageSlider images={images1} />
                </div>
              </div>
            </>
            }
            {images2.length !== 0 && 
            <>
              <div className="activities">
                <p className="activities-title"> Upcoming Activities </p>
                <div className="image-slider">
                  <ImageSlider images={images2} />
                </div>
              </div>
            </>
            }
          </div>
          <div className="questions-container">
            <Accordion data={societyData?.questions || []} />
          </div>

          <div className="society-president-container">
            <div className="society-info">
              <h1 className="society-name">{societyData["president-name"]}</h1>
              <span className="society-description">{societyData["president-mail"]}</span>
              <div className="society-links">
                <div className="email-button">Send an e-mail</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  export default SocietyPage;
