import React, { Component } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bear from "../img/농담곰018.jpg";
import { useNavigate } from "react-router";
//SimpleSlider

const SimpleSlider = ({ img }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Div></Div>,
    prevArrow: <DivPre></DivPre>,
  };

  return (
    <Container>
      <StyledSlider {...settings}>
        {img.map((item, index) => {
          if (index < 5) {
            return (
              <div key={index}>
                <ImageContainer>
                  <Image
                    src={item.imageUrl}
                    onClick={() => {
                      navigate(`/Detail/${item.postId}`);
                    }}
                  />
                </ImageContainer>
              </div>
            );
          }
        })}
      </StyledSlider>
    </Container>
  );
};
export default SimpleSlider;
const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  width: 100%;
  height: 550px;
  width: 100%;
  height: 100%;

  .slick-prev:before {
    opacity: 1;
    height: 50px;
  }
`;

const ImageContainer = styled.div`
  background-position: center;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
`;
const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;
