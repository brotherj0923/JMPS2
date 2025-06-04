import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { mainspotIntroData } from "../data/mainspotIntroData";

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
    const { title, name, tagList, desc } = mainspotIntroData[id];
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
                        height: "740px",
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
                        style={{ top: "20px", left: "50%", transform:"translate(-50%)" ,width: "max-content",}}
                        >
                        <p className="text-white text-[15px] text-center font-['NanumSquareEB']">{title}</p>
                    </div>
                    

                    <div
                        className="absolute top-[41px] left-1/2 transform -translate-x-1/2 flex items-center gap-2"
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
                                height: "610px",
                                borderRadius: "12px",
                                border: "1px solid #EECCFE",
                                background:
                                "linear-gradient(0deg, #FFF 50%, #FFF 100%), #FFF",
                                boxShadow: "0px 4px 16px 4px rgba(72, 49, 147, 0.12)",
                                overflow: "hidden",
                            }}
                            >
                            <div className="relative w-full h-full">
                                {/* 메인스팟 이미지 */}
                                <img
                                src={`/images/mainspots/${id}.webp`}
                                alt="메인 스팟"
                                style={{
                                    width: "308px",
                                    height: "580px",
                                    objectFit: "cover",
                                    marginTop: "8px", 
                                    marginLeft: "8px", 
                                    marginRight: "8px", 
                                    marginBottom: "10px", 
                                    borderRadius: "10px",
                                }}
                                />

                                {/* ✨ 그라데이션 오버레이 + 설명 텍스트 */}
                                <div className="absolute bottom-[12px] left-[8px] w-[308px] h-[140px]
                                        bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                                        text-white rounded-[10px] p-4 z-10">
                                        <p className="text-xs font-['NanumSquareEB'] leading-relaxed text-white/90">
                                            {desc}
                                        </p>
                                </div>
                            </div>
                            </div>
                                    {/* ----- */}
                    </div>
                

                {/* 다음 버튼 */}
                <img
                    src="/images/코스보기최종.png"
                    alt="코스보기"
                    onClick={() => navigate(`/result/${id}/detail`)}
                    className="absolute right-[55px] top-[220px] w-[115px] h-auto cursor-pointer z-30 animate-pulse shadow-lg rounded-xl"
                    // style={{background:"#ccc", borderRadius:"100px"}}
                />
            </div>
        </div>
    );
};

export default ResultIntro;
