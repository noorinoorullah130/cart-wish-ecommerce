import React from "react";

import "./HeroSection.css";

const HeroSection = ({ title, subtitle, link, image }) => {
    return (
        <section className="hero_section">
            <div className="align_center">
                <h2>{title}</h2>
                <p className="hero_subtitle">{subtitle}</p>
                <a href={link} className="hero_link">
                    Buy Now
                </a>
            </div>

            <div className="align_center">
                <img src={image} className="hero_image" />
            </div>
        </section>
    );
};

export default HeroSection;
