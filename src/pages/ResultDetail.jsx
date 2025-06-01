import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageModal from "../components/ImageModal"; // 👈 클릭 시 전체 이미지 보여줄 모달

const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

const useScale = () => {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const updateScale = () => {
        const w = window.innerWidth / DESIGN_WIDTH;
        const h = window.innerHeight / DESIGN_HEIGHT;
        setScale(Math.min(w, h));
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);
    return scale;
    };

    const ResultDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scale = useScale();

    const [showImage, setShowImage] = useState(null); // 이미지 모달 제어용

    const courseNameMap = {
        A: "서순라길 (로맨틱)",
        B: "경춘선 숲길 (힐링)",
        C: "남산골 한옥마을 (레트로)",
        D: "신흥시장 (트렌디)",
        E: "뚝섬미술관 (아트)",
    };

    const spots = [
        {
        label: "놀거리",
        name: "노이모이 서순라길",
        desc: "초록빛 철길 따라 걷다 보면 마음까지 포근해지는",
        tags: ["한옥 카페", "감성 산책"],
        img: `/images/subspots/A.png`,
        align: "left",
        },
        {
        label: "맛집",
        name: "우리 술집 다람쥐",
        desc: "초록빛 철길 따라 걷다 보면 마음까지 포근해지는",
        tags: ["감성 산책"],
        img: `/images/subspots/B.png`,
        align: "right",
        },
        {
        label: "카페",
        name: "서순라길 한옥카페",
        desc: "초록빛 철길 따라 걷다 보면 마음까지 포근해지는",
        tags: ["감성 산책"],
        img: `/images/subspots/C.png`,
        align: "left",
        },
    ];

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-white">
        <div
            className="origin-top relative"
            style={{
            width: "390px",
            height: "844px",
            transform: `scale(${scale})`,
            }}
        >
            {/* POPICK 로고 */}
            <div className="absolute top-[40px] left-[30px] w-[80px] h-auto z-50">
            <img
                src="/images/POPICK.png" 
                alt="POPICK 로고"
                className="w-full h-auto object-contain"
            />
            </div>

            {/* 중앙 타이틀 */}
            <div className="absolute top-[75px] left-[90px] w-[210px] h-[34px] text-center font-bold text-[#878BFF] text-[22px]">
            <span className="text-[#B096FF] font-[GmarketSansTTFBold]" >함께 다녀올 </span>
            <span className="text-[#A9B8FD] font-[GmarketSansTTFBold]">서브 스팟 </span>
            </div>

            {/* 카드 리스트 */}
            {spots.map((spot, idx) => (
            <div
                key={idx}
                className="absolute rounded-[68.5px] shadow-[0px_4px_16px_4px_rgba(72,49,147,0.12)]"
                style={{
                top: `${145 + idx * 190}px`,
                left: "20px",
                width: "345px",
                height: "157px",
                background: "linear-gradient(40deg, #EECCFE, #BEC2FF, #8FBDFF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // 가운데 정렬
                }}
            >
                <div
                    className="bg-white flex"
                    style={{
                        width: "337px", // 바깥보다 -8px
                        height: "149px", // 바깥보다 -8px
                        borderRadius: "68px",
                        flexDirection: spot.align === "left" ? "row" : "row-reverse",
                        padding: "10px 15px",
                        boxSizing: "border-box",
                    }}
                >
                    {/* 이미지 */}
                <img
                src={spot.img}
                alt={spot.name}
                onClick={() => setShowImage(spot.img)}
                className="w-[123px] h-[123px] rounded-full object-cover cursor-pointer"
                />

                {/* 텍스트 정보 */}
                <div className="flex flex-col justify-start ml-3 mr-3">
                <div className="text-[16px] text-gray-600 font-bold font-['GmarketSansTTFBold']">{spot.label}</div>
                <div className="text-[14px] text-[#B096FF] font-bold mt-1 font-['GmarketSansTTFBold']">{spot.name}</div>
                <div className="text-[12px] text-gray-500 mt-1">{spot.desc}</div>

                {/* 태그들 */}
                <div className="flex gap-2 mt-2">
                    {spot.tags.map((tag, idx) => (
                        <span
                        key={idx}
                        className="inline-flex items-center justify-center h-[18px] px-2 text-black text-xs"
                        style={{
                            borderRadius: "99px",
                            border: "1px solid #00000058",
                            background: "rgba(255, 255, 255, 0.15)",
                        }}
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            ))}

            {/* 뒤로가기 버튼 */}
            <button
            onClick={() => navigate(`/result/${id}`)} // ResultIntro로 이동
            className="absolute bottom-[100px] left-[20px] px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700 hover:bg-gray-100 transition"
            >
            ← 메인스팟 확인하기
            </button>
            <button
            onClick={() => navigate(`/`)} // SlotMachine 으로 이동
            className="absolute bottom-[100px] right-[35px] px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700 hover:bg-gray-100 transition"
            >
            처음으로
            </button>

            {/* 버튼 */}
            <button
            onClick={() => window.open("https://www.naver.com")}
            className="absolute bottom-[30px] left-[21px] w-[335px] h-[48px] bg-[#00D2FF] text-white font-bold rounded-md shadow hover:bg-[#00b9e4] transition"
            >
            설문조사 참여하고 더 많은 추천 코스 보기
            </button>

            {/* 이미지 클릭 시 전체보기 모달 */}
            {showImage && (
            <ImageModal imgSrc={showImage} onClose={() => setShowImage(null)} />
            )}
        </div>
        </div>
    );
};

export default ResultDetail;