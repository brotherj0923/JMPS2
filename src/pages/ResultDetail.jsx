import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageModal from "../components/ImageModal"; // 👈 클릭 시 전체 이미지 보여줄 모달
import { subspotData } from "../data/subspotData";
import { logEvent } from "../utils/logToFirestore";
import { logGAEvent } from "../utils/logToGA";

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

    


    const ResultDetail = () => {
        const { id } = useParams();
        const navigate = useNavigate();
        const scale = useScale();
        // 결과 재시도
        const [retryCount, setRetryCount] = useState(0);

        const [showImage, setShowImage] = useState(null); // 이미지 모달 제어용

        // const courseNameMap = {
        //     A: "서순라길 (로맨틱)",
        //     B: "경춘선 숲길 (힐링)",
        //     C: "남산골 한옥마을 (레트로)",
        //     D: "도산공원 (트렌디)",
        //     E: "뚝섬미술관 (아트)",
        // };

            

        useEffect(() => {
                const startTime = sessionStorage.getItem("session_start_time");
                const enterTime = startTime ? parseInt(startTime, 10) : null;

                    return () => {
                        if (enterTime) {
                            const durationSec = Math.round((Date.now() - enterTime) / 1000);

                            logEvent("full_course_duration", {
                            courseId: id,
                            seconds: durationSec,
                            });

                            sessionStorage.removeItem("session_start_time");
                        }
                        };
                }, [id]);

        useEffect(() => {
            const pageStart = Date.now();

                return () => {
                    const duration = Math.round((Date.now() - pageStart) / 1000);
                    logEvent("result_detail_dwell_time", {
                    courseId: id,
                    seconds: duration,
                    });
                };
                }, [id]);

        useEffect(() => {
        const pageStart = Date.now();

        return () => {
            const pageDuration = Math.round((Date.now() - pageStart) / 1000);
            logEvent("result_detail_dwell_time", {
            courseId: id,
            seconds: pageDuration,
            });
        };
        }, [id]);

        const spots = ["A", "B", "C"].map((key, idx) => ({
            ...subspotData[id][key], // subspotData.A.A 같은 식으로 접근
            img: `${import.meta.env.BASE_URL}/images/subspots/${id}/${key}.webp`,
            align: idx % 2 === 0 ? "left" : "right",
    }));

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-white">
            <div
                className="origin-center relative"
                style={{
                width: "375px",
                height: "640px",
                transform: `scale(${scale})`,
                transformOrigin: "center",
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

                {/* 중앙 타이틀 */}
                <div className="absolute top-[70px] left-[70px] w-[250px] h-[30px] text-center font-bold text-[#878BFF] text-[25px]">
                <span className="text-[#B096FF] font-[GmarketSansTTFBold]" >함께 다녀올 </span>
                
                <span className="text-[#A9B8FD] font-[GmarketSansTTFBold]">서브 스팟 </span>
                

                </div>

                {/* 카드 리스트 */}
                <div className="flex flex-col items-center mt-[130px] ">
                    {spots.map((spot, idx) => (
                    <div
                        key={idx}
                        className="relative top-[-20px] w-[395px] h-[160px] bg-no-repeat bg-cover bg-center"
                        style={{
                        backgroundImage: `url('${import.meta.env.BASE_URL}/images/서브스팟배경.png')`, // Figma에서 만든 이미지
                        backgroundSize: "100% 105%"
                        }}
                    >
                        {/* 이미지 */}
                    <img
                    src={spot.img}
                    alt={spot.name}
                    onClick={() => setShowImage(spot.img)}
                    className="absolute top-[20px] w-[113px] h-[113px] rounded-full object-cover cursor-pointer"
                    style={{
                        left : spot.align === 'left' ? '29px' : '253px' 
                    }}
                    />


                    <div
                        className="absolute top-[22px] flex flex-col space-y-1 text-left"
                        style={{
                            left: spot.align === 'left' ? '153px' : '75px',
                            width: spot.align === 'left' ? '190px' : '175px',
                        }}
                    >
                        <div className="flex">
                            <div className="text-[17px] text-gray-600 font-bold font-['NanumSquareEB'] leading-regular">
                            
                                {spot.label}
                            </div>
                            <a href={spot.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`${import.meta.env.BASE_URL}/images/더보기.png`}
                                    alt="더보기"
                                    className="w-[35px] h-[20px] object-contain cursor-pointer"
                                />
                            </a>
                        </div>

                        <div className="text-[14px] text-[#B096FF] font-bold font-['GmarketSansTTFBold'] leading-tight">
                        
                            {spot.name}
                        </div>
                        <div className="text-[12px] text-gray-600 font-['NanumSquareEB'] leading-regular"
                        
                            dangerouslySetInnerHTML={{ __html: spot.desc }}
                        />
                        <div
                            className={`relative flex flex-wrap gap-x-1 gap-y-1 font-['NotoSansKR-Regular']`}
                            
                            style={
                                spot.align === 'right'
                                ? { left: '15px' } // 두 번째 카드 (이미지가 오른쪽)
                                : { right: '5px' }  // 첫 번째 & 세 번째 카드 (이미지가 왼쪽)
                            }
                        >
                            {spot.tags.map((tag, tagIdx) => (
                            <span
                                key={tagIdx}
                                className="inline-flex items-center justify-center h-[18px] text-gray-500 px-2 text-xs "
                                style={{
                                borderRadius: '99px',
                                border: '1px solid #00000058',
                                background: 'rgba(255, 255, 255, 0.15)',
                                }}
                            >
                                {tag}
                            </span>
                            ))}
                        
                        </div>
                    </div>
                    </div>
                    ))}
                </div>

                {/* 뒤로가기 버튼 */}
                <button
                onClick={() => navigate(`/result/${id}`)} // ResultIntro로 이동
                className="absolute top-[68px] left-[20px] px-3 py-2"
                >
                <img 
                    src={`${import.meta.env.BASE_URL}/images/뒤로가기버튼.png`}
                    alt="뒤로가기"
                    className="w-7 h-7"
                />
                </button>


                <div
                    className="absolute bottom-[10px] left-[14px] gap-3 flex items-center">
                        {/* 처음 화면으로 돌아가기 */}
                        <button
                        onClick={() => { 
                            const newCount = retryCount + 1;
                            setRetryCount(newCount);

                            logEvent("retry_result_clicked", { 
                                retryCount: newCount,
                                courseId: id
                            }); 
                            
                            // GA
                            logGAEvent("retry_result_clicked", {
                            category: "Button",
                            action: "Click",
                            label: "RetryButton",
                            courseId: id,
                            });

                            navigate(`/`)}} // SlotMachine 으로 이동
                        className="h-[40px] w-[80px] bg-[#9CC9FF] rounded-md font-bold text-white hover:bg-[#68acff] transition"
                        >
                        처음으로
                        </button>

                        {/* 버튼 */}
                        <button
                        onClick={() =>  {
                            // GA
                            logGAEvent("survey_link_clicked", {
                            category: "Button",
                            action: "Click",
                            label: "SurveyButton",
                            courseId: id,
                            });
                            logEvent("survey_link_clicked" , {
                                courseId : id,
                            }); // ✅ Firebase 기록

                            window.open("https://smore.im/quiz/EnBaQXRxFs")}}
                        className=" bg-[#9CC9FF] h-[40px] w-[257px] text-white font-bold rounded-md hover:bg-[#68acff] transition"
                        >
                        코스 평가하고 공유하기
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