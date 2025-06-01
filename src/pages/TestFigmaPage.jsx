import React from "react";
import SpinReelTest from "../components/SpinReelTest";

const TestFigmaPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: "1024px",
          aspectRatio: "375 / 640",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          overflow: "hidden",
        }}
      >
        {/* POPICK 타이틀 */}
        <div
          className="absolute font-extrabold tracking-tight text-black flex items-center justify-center text-[3.2vw]"
          style={{
            width: "33.6%", // 126 / 375
            height: "2.5%",
            top: "5%",
            left: "2%",
          }}
        >
          POPICK
        </div>

        {/* 오직 나를 위한 데이트 코스 */}
        <div
          className="absolute text-center font-extrabold text-[#333333]"
          style={{
            width: "44.2%",
            height: "3.3%",
            top: "10%",
            left: "29.3%",
            fontSize: "4vw",
          }}
        >
          오직 나를 위한 데이트 코스
        </div>

        {/* 무작위로 추천받기 */}
        <div
          className="absolute text-center font-extrabold text-black "
          style={{
            width: "56.3%",
            height: "3%",
            top: "20%",
            left: "25%",
            fontSize: "6.5vw",
          }}
        >
          무작위로 추천받기
        </div>

{/* 슬롯머신 전체 배경을 감싸는 div */}
        <img
  src="/images/슬롯머신.png"
  alt="슬롯머신"
  className="absolute z-10"
  style={{
    width: "99.4%",
    height: "73.5%",
    top: "30%",
    left: "0.5%",
    objectFit: "cover",
    pointerEvents: "none",
  }}
/>
  {/* 슬롯 회전 박스들 (위치 조정됨) */}
  <div
  className="absolute z-40 flex justify-between items-center"
  style={{
    width: "66%",         // 슬롯 머신 전체 너비 기준
    height: "19.5%",      // 높이 기준
    top: "30%",           // 슬롯 박스 위치
    left: "17%",
  }}
>
  <div className="flex w-full h-full px-[1%]">
  <div className="w-[30%] h-full"><SpinReelTest /></div>
  <div className="w-[31%] h-full"><SpinReelTest /></div>
  <div className="w-[32%] h-full"><SpinReelTest /></div>
</div>
  </div>
</div>
      </div>
  );
};

export default TestFigmaPage;