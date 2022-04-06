import React, { useState } from "react";
import "../styles/homeImage.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getImage } from "./../services/carouselImage";

function HomeImage() {
  const [currImg, setCurrImg] = useState(0);
  const images = getImage();

  return (
    <div className="carousel">
      <div
        className="carouselInner"
        style={{ backgroundImage: `url(${images[currImg].img})` }}
      >
        <div
          className="left"
          onClick={() =>
            (currImg > 0 && setCurrImg(currImg - 1)) ||
            (currImg == 0 && setCurrImg(images.length - 1))
          }
        >
          <ChevronLeftIcon style={{ fontSize: 40 }} />
        </div>
        <div className="center">
          <h2>{images[currImg].title}</h2>
          <h5>{images[currImg].description}</h5>
        </div>
        <div
          className="right"
          onClick={() => {
            (currImg < images.length - 1 && setCurrImg(currImg + 1)) ||
              (currImg == images.length - 1 && setCurrImg(0));
          }}
        >
          <ChevronRightIcon style={{ fontSize: 40 }} />
        </div>
      </div>
    </div>
  );
}

export default HomeImage;
