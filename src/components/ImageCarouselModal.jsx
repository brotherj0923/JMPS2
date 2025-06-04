import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";

const dummyImages = [
  "/images/mainspots/A.png",
  "/images/mainspots/B.png",
  "/images/mainspots/C.png",
]; // 나중엔 props로 받아도 됨

const ImageCarouselModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative p-4">
            {/* 닫기 버튼 */}
            <button
            className="absolute top-2 right-3 text-gray-600 text-xl"
            onClick={onClose}
            >
            ×
            </button>

            {/* 이미지 캐러셀: swiper 라이브러리 사용 */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                
            >
                <style>
                {`
                    .swiper-button-next,
                    .swiper-button-prev {
                        color: #CDCFFF; /* 원하는 색상으로 지정 */
                    }
                    .swiper-pagination-bullet {
                        background: #D1D5DB; /* 불들어오는 색 변경 (pagination-bullet) */
                        opacity: 1;
                    }
                    .swiper-pagination-bullet-active {
                        background: #CDCFFF;
                    }
                
                `}
                </style>
                {dummyImages.map((src, idx) => (
                <SwiperSlide key={idx}>
                    <img
                    src={src}
                    alt={`slide-${idx}`}
                    className="w-full h-auto rounded-xl shadow"
                    />
                </SwiperSlide>
                ))}
            </Swiper>

            {/* 닫기 버튼 */}
            <button
            onClick={onClose}
            className="mt-6 mx-auto block px-6 py-3 shadow-xl bg-[#CDCFFF] text-white rounded-full hover:bg-[#906bff]] transition"
            >
            닫기
            </button>
        </div>
        </div>
    );
};

export default ImageCarouselModal;