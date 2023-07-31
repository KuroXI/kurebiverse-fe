const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 100,
  slidesToScroll: 1,
  initialSlide: 0,
  slidesToShow: 7,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

export default settings;
