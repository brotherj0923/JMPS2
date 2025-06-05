import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { mainspotIntroData } from "../data/mainspotIntroData";
import fitty from "fitty";

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 640;


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
    const { title, name, tagList, desc } = mainspotIntroData[id];
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            fitty(textRef.current, {
            minSize: 10,
            maxSize: 20,
            multiLine: true,
            observeMutations: false,
            });
        }
        }, [desc]);

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <div
                className="origin-top relative"
                style={{
                width: "375px",
                height: "640px",
                transform: `scale(${scale})`,
                }}
            >
                {/* POPICK 로고 */}
                    <div className="absolute top-[20px] left-[20px] w-[80px] h-auto z-50">
                    <img
                        src={`${import.meta.env.BASE_URL}/images/POPICK.png`} 
                        alt="POPICK 로고"
                        className="w-full h-auto object-contain"
                    />
                    </div>

                    {/* 카드 영역 */}
                    <div
                    className="absolute left-[20px] top-[55px] flex flex-col items-center"
                    style={{
                        width: "334px",
                        height: "570px",
                        flexShrink: 0,
                        borderRadius: "12px",
                        background:
                        "linear-gradient(306deg, #FECCF2 14.88%, #BEC2FF 55.14%, #8FBDFF 97.05%), #FFF",
                        boxShadow: "0px 4px 16px 4px rgba(72, 49, 147, 0.12)",
                    }}
                    >

                    {/* 텍스트들 */}
                    <div
                        className="absolute"
                        style={{ top: "15px", left: "50%", transform:"translate(-50%)" ,width: "max-content",}}
                        >
                        <p className="text-white text-[15px] text-center font-['NanumSquareEB']">{title}</p>
                    </div>
                    

                    <div
                        className="absolute top-[44px] left-1/2 transform -translate-x-1/2 flex items-center gap-2"
                        >
                        <p className="text-white text-[28px] font-['NanumSquareEB'] text-center whitespace-nowrap">
                            {name}
                        </p>
                    </div>



                    {/* 태그 */}
                    <div className="absolute top-[90px] flex gap-2">
                        {tagList.map((tag, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center justify-center h-[18px] px-4 text-white text-xs font-['NotoSansKR-Regular']"
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
                    

                        {/* 그라데이션 */}
                        <div
                            className="absolute top-[120px] cursor-pointer"
                            style={{
                                width: "324px",
                                height: "430px",
                                borderRadius: "12px",
                                background:
                                "linear-gradient(0deg, #FFF 50%, #FFF 100%), #FFF",
                                boxShadow: "0px 4px 16px 4px rgba(72, 49, 147, 0.12)",
                                overflow: "hidden",
                            }}
                            >
                            <div className="relative w-full h-full">
                                {/* 메인스팟 이미지 */}
                                <img
                                src={`${import.meta.env.BASE_URL}/images/mainspots/${id}.webp`}
                                alt="메인 스팟"
                                style={{
                                    width: "308px",
                                    height: "412px",
                                    objectFit: "cover",
                                    marginTop: "8px", 
                                    marginLeft: "8px", 
                                    marginRight: "8px", 
                                    marginBottom: "10px", 
                                    borderRadius: "10px",
                                }}
                                />

                                {/* ✨ 그라데이션 오버레이 + 설명 텍스트 */}
                                <div className="absolute bottom-[15px] left-[7px] w-[310px] h-[105px]
                                        bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                                        text-white rounded-[10px] p-4 z-10 ">
                                        <p 
                                            ref={textRef}
                                            className="text-xs font-['NanumSquareEB'] leading-relaxed text-white/90 break-words h-full w-full">
                                                {desc}
                                        </p>
                                </div>
                            </div>
                            </div>
                                    {/* ----- */}
                    </div>
                

                {/* 다음 버튼 */}
                <img
                    src={`${import.meta.env.BASE_URL}/images/코스보기최종.png`}
                    alt="코스보기"
                    onClick={() => navigate(`/result/${id}/detail`)}
                    className="absolute right-[40px] top-[195px] w-[105px] h-auto cursor-pointer z-30 animate-pulse shadow-lg rounded-xl"
                    // style={{background:"#ccc", borderRadius:"100px"}}
                />
            </div>
        </div>
    );
};

export default ResultIntro;
