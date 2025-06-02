import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../components/ImageCarouselModal"; // 추후 생성될 모달

const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

const useScale = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
        const wRatio = window.innerWidth / DESIGN_WIDTH;
        const hRatio = window.innerHeight / DESIGN_HEIGHT;
        setScale(Math.min(wRatio, hRatio));
        };

        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    return scale;
    };

    const ResultIntro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scale = useScale();
    const [showModal, setShowModal] = useState(false);
    const tagList = ["한옥 카페", "감성 산책"];

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
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

            {/* 카드 영역 */}
            <div
            className="absolute left-[28px] top-[80px] flex flex-col items-center"
            style={{
                width: "334px",
                height: "700px",
                flexShrink: 0,
                borderRadius: "12px",
                border: "1px solid #EECCFE",
                background:
                "linear-gradient(306deg, #FECCF2 14.88%, #BEC2FF 55.14%, #8FBDFF 97.05%), #FFF",
                boxShadow: "0px 4px 16px 4px rgba(72, 49, 147, 0.12)",
            }}
            >
            {/* 텍스트들 */}
            <div
                className="absolute"
                style={{ top: "15px", left: "70px", width: "200px", height: "21px" }}
            >
                <p className="text-white text-sm font-semibold text-center">소란을 비운 담장 옆 로맨스</p>
            </div>
            <div
                className="absolute"
                style={{ top: "45px", left: "70px", width: "200px", height: "40px" }}
            >
                <p className="text-white text-xl font-bold text-center">종로 서순라길</p>
            </div>

            {/* 태그 */}
            <div className="absolute top-[90px] flex gap-2">
                {tagList.map((tag, idx) => (
                <span
                    key={idx}
                    className="inline-flex items-center justify-center h-[18px] px-4 text-white text-xs"
                    style={{
                    borderRadius: "99px",
                    border: "1px solid #FFF",
                    background: "rgba(255, 255, 255, 0.15)",
                    }}
                >
                    {tag}
                </span>
                ))}
            </div>

            {/* 이미지 박스 */}
            <div
                className="absolute top-[120px] cursor-pointer"
                onClick={() => setShowModal(true)}
                style={{
                width: "324px",
                height: "540px",
                borderRadius: "12px",
                border: "1px solid #EECCFE",
                background:
                    "linear-gradient(0deg, #FFF 0%, #FFF 100%), #FFF",
                boxShadow: "0px 4px 16px 4px rgba(72, 49, 147, 0.12)",
                overflow: "hidden",
                }}
            >
                <img
                src={`/images/mainspots/${id}.jpg`}
                alt="메인 스팟"
                style={{ width: "308px", height: "524px", objectFit: "cover", margin: "8px" }}
                />
            </div>
            </div>

            {/* 모달 */}
            {showModal && <Modal onClose={() => setShowModal(false)} />}

            {/* 다음 버튼 */}
            <button
            onClick={() => navigate(`/result/${id}/detail`)}
            className="absolute bottom-[30px] left-1/2 -translate-x-1/2 px-6 py-3 bg-[#CDCFFF] rounded-lg hover:bg-[#9977ff] transition
                    flex gap-1 text-white shadow-xl
            "
            >
            자세히 보기 
            <img
                src="/images/뒤로가기버튼.png" // 👉 넣고 싶은 이미지 경로
                alt="앞으로가기"
                className="w-6 h-6 transform -scale-x-100" // 원하는 크기 조절
            />
            </button>
        </div>
        </div>
    );
};

export default ResultIntro;
