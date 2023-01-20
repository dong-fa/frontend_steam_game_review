import React, { useRef, useCallback } from "react";
import Slick from "react-slick";
import styled, { css } from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Wrap = styled.div`
  position: relative;
  padding-bottom: 70px;
  overflow: hidden;

  // 1. Global style 추가했던 것을 슬라이드 상단에 Wrap을 만들어 여기서 선언했습니다.
  .slick-slide {
    display: inline-block;
  }

  // 2. 제가 추가한 커스텀 클래스입니다.
  // pagination 부분입니다.
  .slick-dots.slick-thumb {
    position: absolute;
    bottom: 0;
    left: 50%;
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translate(-50%);

    li {
      position: relative;
      display: inline-block;

      &.slick-active {
        span {
          filter: none;
        }
      }
    }
  }
`;

const SlickItems = styled.div`
  width: 100%;
  height: 400px;
  text-align: center;

  img {
    max-width: 100%;
    height: 100%;
    vertical-align: top;
  }
`;

const defaultButtonStyle = css`
  position: absolute;
  top: calc(50% - 50px);
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 1;
  border: none;
  border-radius: 50%;
  background: none;
  outline: none;
  cursor: pointer;
`;

const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: 0;
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 0;
`;

const defaultIconStyle = css`
  font-size: 22px;
  color: #dedede;

  &:focus,
  &:hover {
    color: #666;
  }
`;

const PrevIcon = styled(LeftOutlined)`
  ${defaultIconStyle}
`;

const NextIcon = styled(RightOutlined)`
  ${defaultIconStyle}
`;

const PagingAnchor = styled.a`
  display: block;
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
  }
`;

// 3. custom pagination을 만듭니다.
// background를 통해 이미지를 넣어줍니다.
// filter를 통해 흑백으로 보이게 하고 active가 되면 흑백을 제거합니다. (31라인참고)
const Paging = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background: url(${(props) => props.src}) no-repeat;
  background-size: 100% 100%;
  filter: grayscale(1);
`;

// 4. 샘플이미지
const images = [
  {
    src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212614_fawslbwd.jpg",
    title: "1",
  },
  {
    src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212649_esiekzxf.jpg",
    title: "2",
  },
  {
    src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212707_zcrkccgp.jpg",
    title: "3",
  },
  {
    src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
    title: "4",
  },
];

const Slide = () => {
  // 5. custom arrows를 만들어 ref를 통해 제어합니다.
  const slickRef = useRef(null);

  // 6. slick에 추가할 세팅입니다.
  const settings = {
    dots: true,

    // 2. 제가 추가한 커스텀 클래스입니다. (pagination)
    dotsClass: "slick-dots slick-thumb",

    // 5. custom arrows를 만들기 위해 기본 arrows옵션을 false로 합니다.
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    // 2. custom pagination을 만듭니다.
    // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
    customPaging: function (i) {
      const imgSrc = images[i].src;
      return (
        <PagingAnchor>
          <Paging src={imgSrc} />
        </PagingAnchor>
      );
    },
  };

  // 5. custom arrows 동작 함수를 만듭니다.
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <Wrap>
      <Slick ref={slickRef} {...settings}>
        {images.map((v, i) => {
          return (
            <SlickItems key={`${v.title}_${i}`}>
              <img src={v.src} />
            </SlickItems>
          );
        })}
      </Slick>

      <>
        <PrevButton onClick={previous}>
          <PrevIcon />
          <span className="hidden">이전</span>
        </PrevButton>

        <NextButton onClick={next}>
          <NextIcon />
          <span className="hidden">다음</span>
        </NextButton>
      </>
    </Wrap>
  );
};

export default Slide;
