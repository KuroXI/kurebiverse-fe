const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 100,
  centerPadding: '1px',
  slidesToShow: 8,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 8,
      }
    }, {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,

      }
    }, {
      breakpoint: 900,
      settings: {
        slidesToShow: 6,
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
      }
    }, {
      breakpoint: 0,
      settings: {
        slidesToShow: 4,
      }
    }
  ],
};

export default settings;
