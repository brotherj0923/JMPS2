import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import ResultModal from "./ResultModal";
import { useNavigate } from "react-router-dom";

const EMOJIS = ["A", "B", "C", "D", "E"];
const getRandomLetter = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

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

const SlotMachine = () => {
  const reel1Ref = useRef(null);
  const reel2Ref = useRef(null);
  const reel3Ref = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resultLetter, setResultLetter] = useState(null);
  const navigate = useNavigate();
  const leverRef = useRef(null);
  const scale = useScale();

  

  const closeModalAndGoToResult = () => {
    setShowModal(false);
    navigate(`/result/${resultLetter}`);
  };

  const spinReel = (ref, delay, finalLetter, onDone) => {
    const container = ref.current;
    container.innerHTML = "";

    const spinLetters = Array.from({ length: 44 }, () =>
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    );
    spinLetters.push(finalLetter);

    spinLetters.forEach((char) => {
      const img = document.createElement("img");
      img.src = `/images/slot/${char}.png`;
      img.alt = char;
      img.className = "w-[74px] h-[74px] object-contain block mx-auto";

      const div = document.createElement("div");
      div.className = "text-4xl w-[74px] h-[100px] flex items-center justify-center";
      div.appendChild(img);
      container.appendChild(div);
    });

    const itemHeight = 100;
    const totalHeight = itemHeight * (spinLetters.length - 1);

    gsap.fromTo(
      container,
      { y: 0 },
      {
        y: `-${totalHeight}px`,
        duration: 3,
        delay: delay / 1000,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(container, { y: `-${itemHeight * (spinLetters.length - 1)}px` });
          onDone();
        },
      }
    );
  };

  const handleSpin = () => {
    setSpinning(true);
    const selected = getRandomLetter();
    setResultLetter(selected);

    let completed = 0;
    const onDone = () => {
      completed++;
      if (completed === 3) {
        setTimeout(() => {
          setShowModal(true);
          setSpinning(false);
        }, 800);
      }
    };

    spinReel(reel1Ref, 0, selected, onDone);
    spinReel(reel2Ref, 240, selected, onDone);
    spinReel(reel3Ref, 550, selected, onDone);
  };

  const pullLever = () => {
    if (spinning) return;

    // gsap.fromTo(
    //   leverRef.current,
    //   { transformOrigin: "bottom center" },
    //   { rotate: 5 },
    //   { rotate: 180, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }
    // );
    // 두개 비교해보기
      gsap.to(leverRef.current, {
      rotate: 35, 
      duration: 0.1,
      ease: "power2.inOut",
      yoyo: true, 
      repeat: 1,  
      transformOrigin: "bottom",
      // transformOrigin은 Tailwind class 'origin-top-right'에 의해 이미 설정됨
    });
    handleSpin();
  };

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
        {/* ✅ 여기에 기존 UI 요소들을 그대로 유지해서 넣으면 됩니다 */}
        {/* ✅ 예: 배경 비눗방울, 슬롯머신 이미지, 레버, 슬롯영역, 버튼 등 */}
        {/* ✅ 기존 SlotMachine JSX 안에 있는 코드 통째로 이 div 안으로 옮겨주세요 */}
        {/* ✅ 기존 absolute 위치나 top/left 비율도 그대로 유지 가능 */}

        {/* overflow-hidden 쓰면 화면 바깥으로 나간거는 안보이게 */}
    {/* 비눗방울 배경 이미지 */}
    <div className="relative w-full h-full">

    {/* 슬롯 왼쪽 비눗방울 */}
    <img
        src="/images/거품 1.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width: "400px",
        height: "400px",
        right:"190px",
        top:"180px"
        }}
    />
    <img
        src="/images/거품 2.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width: "260px",
        height: "464.2px",
        left:"160px",
        bottom:"506px"
        }}
    />
    <img
        src="/images/거품 1.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width: "273px",
        height: "420px",
        left:"170px",
        bottom:"540px"
        }}
    />
    <img
        src="/images/거품 1.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width:"80px",
        right:"275px",
        top:"55px"
        }}
    />
    <img
        src="/images/거품 5.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width:"200px",
        bottom:"1px",
        }}
    />
    <img
        src="/images/거품 7.png"
        alt="bubble"
        className="absolute z-10"
        style={{
        width:"400px",
        bottom:"-260px",
        }}
    />
    <img
        src="/images/거품 2.png"
        alt="bubble"
        className="absolute z-40"
        style={{
        width:"170px",
        right: "-50px",
        bottom:"422px",
        }}
    />

    </div>
      {/* 텍스트 헤더 */}
        <div className="absolute top-[40px] left-[30px] w-[80px] h-auto z-50">
            <img
                src="/images/POPICK.png" 
                alt="POPICK 로고"
                className="w-full h-auto object-contain"
            />
        </div>

      <div className="absolute top-[120px] left-[85px] text-center text-[16px] text-[#333] font-['GmarketSansTTFMedium'] z-40 ">
        <p>데이트 장소 고민될 때 눌러봐!</p>

      </div>
        <div className="absolute top-[170px] left-[70px] text-center text-[25px] font-['GmarketSansTTFBold'] z-40">
            <span className="text-[#B096FF]">랜덤 데이트 </span>
            <span className="text-[#A9B8FD]">슬롯 머신</span>
        </div>

        <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto">
          {/* 슬롯머신 이미지 */}
          <img
            src="/images/슬롯머신(최종).png"
            alt="슬롯 본체"
            className="absolute inset-0 w-full h-full object-contain z-40"
            style={{
              width: "325px",
              top: "-595px",
              left: "10px",
            }}
          />

          {/* 레버 이미지 */}
          <img
            ref={leverRef}
            src="/images/슬롯손잡이.png"
            alt="레버"
            onClick={pullLever}
            className="absolute z-30 origin-top-right cursor-pointer transition-transform"
            style={{
              width: "48px",
              top: "-465px",
              right: "8px",
            }}
          />
        </div>


      {/* 슬롯 영역 */}
        <div className="absolute z-30 flex gap-[1.17px] top-[419.34px] left-[50.26px] w-[241.8px] h-[286.96px]">
            {[reel1Ref, reel2Ref, reel3Ref].map((ref, idx) => (
            <div
                key={idx}
                className="overflow-hidden w-1/3 h-full bg-white shadow-xl rounded-xl"
            >
                <div
                ref={ref}
                className="reel flex flex-col items-center transition-all"
                ></div>
            </div>
            ))}
        </div>

      {/* 버튼 */}
        <button
            className="absolute z-40 w-[214.5px] h-[75.96px] top-[622.872px] right-[109.2px]
            bg-[#A477FD] rounded-3xl shadow-md drop-shadow-lg inner-shadow text-white font-semibold text-lg flex items-center justify-center
            transition-transform  active:scale-105 hover:bg-[#9b6cff]"
            onClick={handleSpin}
            disabled={spinning}
            >
        <div className="text-[#FCF5FF] stroke-outline font-['ONE-Mobile-POP']">
        코스 뽑기
        </div>
        </button>

        {showModal && (
          <ResultModal resultLetter={resultLetter} onClose={closeModalAndGoToResult} />
        )}
      </div>
    </div>
  );
};

export default SlotMachine;
