import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  widescreen: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1370, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface StoryCarouselProps {
  loadMoreCallback: Function;
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({
  children,
  loadMoreCallback,
}) => {
  return (
    <div className="container mx-auto">
      <Carousel
        responsive={responsive}
        ssr={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={true}
        afterChange={(previousSlide, state) => {
          const { currentSlide, slidesToShow, totalItems } = state;
          if (currentSlide + slidesToShow === totalItems) {
            console.log("called");
            loadMoreCallback();
          }
        }}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default StoryCarousel;
