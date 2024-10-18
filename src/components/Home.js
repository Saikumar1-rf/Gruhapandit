import React from 'react';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
// import Slide6 from './Slide6';
import Footer from './Footer';
import Header from './Header';


function Home() {
  return (
    <div>
      <Header/>
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
      {/* <Slide6 /> */}
      <Footer />

    </div>
  );
}

export default Home;
