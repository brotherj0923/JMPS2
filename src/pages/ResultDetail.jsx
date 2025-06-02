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
            <div className="flex flex-col items-center gap-5 mt-[150px]">
                {spots.map((spot, idx) => (
                <div
                    key={idx}
                    className="relative w-[385px] h-[165px] bg-no-repeat bg-contain bg-center"
                    style={{
                    backgroundImage: `url('/images/서브스팟배경.png')`, // Figma에서 만든 이미지
                    }}
                >
                    <div
                        className={`absolute top-[17px] ${spot.align === "left" ? "left-[17px]" : "right-[17px]"} flex ${
                            spot.align === "left" ? "flex-row" : "flex-row-reverse"
                            } items-center w-[310px] h-[123px]`}
                    >
                        {/* 이미지 */}
                    <img
                    src={spot.img}
                    alt={spot.name}
                    onClick={() => setShowImage(spot.img)}
                    className="w-[123px] h-[120px] rounded-full border-l-inherit object-cover cursor-pointer"
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
            </div>

            {/* 뒤로가기 버튼 */}
            <button
            onClick={() => navigate(`/result/${id}`)} // ResultIntro로 이동
            className="absolute top-[70px] left-[20px] px-3 py-2"
            >
            <img 
                src="/images/뒤로가기버튼.png"
                alt="뒤로가기"
                className="w-7 h-7"
            />
            </button>


            <div
                className="absolute bottom-[60px] left-[21px] gap-4 flex items-center">
                    {/* 처음 화면으로 돌아가기 */}
                    <button
                    onClick={() => navigate(`/`)} // SlotMachine 으로 이동
                    className="h-[48px] w-[80px] bg-[#9CC9FF] rounded-md font-bold text-white hover:bg-[#68acff] transition"
                    >
                    처음으로
                    </button>

                    {/* 버튼 */}
                    <button
                    onClick={() => window.open("https://www.naver.com")}
                    className=" bg-[#9CC9FF] h-[48px] w-[250px] text-white font-bold rounded-md hover:bg-[#68acff] transition"
                    >
                    설문조사 참여하기
                    </button>
            </div>


            {/* 이미지 클릭 시 전체보기 모달 */}
            {showImage && (
            <ImageModal imgSrc={showImage} onClose={() => setShowImage(null)} />
            )}
        </div>
        </div>
    );
};

export default ResultDetail;