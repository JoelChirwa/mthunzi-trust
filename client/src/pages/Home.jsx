import React from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import BlogSection from "../components/BlogSection";
import Partners from "../components/Partners";
import GetInvolved from "../components/GetInvolved";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <SEO
        title="Mthunzi Trust - The Umbrella of Hope"
        description="Mthunzi Trust is a youth-led organization empowering communities in Malawi through education, entrepreneurship, environmental sustainability, and SRHR. Join us in creating positive change."
        keywords="Mthunzi Trust, youth empowerment Malawi, education NGO, entrepreneurship, environmental sustainability, SRHR, community development, tree planting, climate justice"
        url="https://www.mthunzitrust.org"
      />
      <Hero />
      <About />
      <Programs />
      <BlogSection />
      <Partners />
      <GetInvolved />
      <Footer />
    </>
  );
};

export default Home;
