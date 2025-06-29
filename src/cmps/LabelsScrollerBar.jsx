import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { stayService } from "../services/stay.service.js";

export function LabelsScrollerBar({ selectedLabel, onLabelSelect }) {
  const [labels, setLabels] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    const labelsFromService = stayService.getLabels();

    setLabels(labelsFromService);
    const resize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);

    const countVisibleItem = getSlidesPerPage();
    setShowArrows(labelsFromService.length > countVisibleItem);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const visibleCount = responsive[getBreakPoint()].items;
    setShowArrows(labels.length > visibleCount);
  }, [labels, windowWidth]);

  const getBreakPoint = () => {
    if (windowWidth >= 3000) return "superLargeDesktop";
    if (windowWidth >= 1024) return "desktop";
    if (windowWidth >= 464) return "tablet";
    return "mobile";
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 18 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 19 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 10 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 10 },
  };

  const getSlidesPerPage = () => {
    const currentBreakPoint = getBreakPoint();
    const countVisibleItem = responsive[currentBreakPoint].items;
    return labels.length % countVisibleItem || countVisibleItem;
  };

  const getVisibleCount = () => responsive[getBreakPoint()].items;
  //   console.log(responsive[getBreakPoint()].items);
  return (
    <div
      className={`labels-scroller-wrapper ${!showArrows ? "no-arrows" : ""}`}
    >
      <Carousel
        responsive={responsive}
        swipeable={windowWidth < 768}
        draggable={windowWidth < 768}
        className="labels-carousel"
        itemClass="carousel-item-container"
        containerClass="carousel-wrapper"
        // dotListClass='custom-dot-list-style'
        arrows={showArrows}
        rewind={false}
        infinite={false}
        slidesToSlide={getVisibleCount()}
        key={showArrows ? "scroll" : "static"}
        centerMode={false}
      >
        {labels.map((label, idx) => (
          <div
            className={`carousel-item ${
              selectedLabel === label.name ? "active" : ""
            }`}
            key={idx}
            onClick={() => onLabelSelect(label.name)}
          >
            <img src={label.img} alt={label.name} />
            <p>{label.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
