import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import ResultModal from "./ResultModal";
import { useNavigate } from "react-router-dom";

const EMOJIS = ["A", "B", "C", "D", "E"];
const getRandomLetter = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

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

    const spinLetters = Array.from({ length: 45 }, () =>
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    );
    spinLetters.push(finalLetter);

    spinLetters.forEach((char) => {
      const img = document.createElement("img");
      img.src = `${import.meta.env.BASE_URL}/images/slot/${char}.png`;
      img.alt = char;
      img.className = "w-[64px] h-[74px] object-contain block mx-auto";

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
        duration: 5,
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
          width: "375px",
          height: "640px",
          transform: `scale(${scale})`,
        }}
      >
        {/* ✅ 여기에 기존 UI 요소들을 그대로 유지해서 넣으면 됩니다 */}
        {/* ✅ 예: 배경 비눗방울, 슬롯머신 이미지, 레버, 슬롯영역, 버튼 등 */}
        {/* ✅ 기존 SlotMachine JSX 안에 있는 코드 통째로 이 div 안으로 옮겨주세요 */}
        {/* ✅ 기존 absolute 위치나 top/left 비율도 그대로 유지 가능 */}

        {/* overflow-hidden 쓰면 화면 바깥으로 나간거는 안보이게 */}
    {/* 비눗방울 배경 이미지 */}
    <div className="relative w-full h-full bg-center"
        style={{
          backgroundImage: `url("${import.meta.env.BASE_URL}/images/배경.png")`,
          backgroundSize: "100% 100%",
        }}
    >


    </div>
      {/* 텍스트 헤더 */}
        <div className="absolute top-[20px] left-[20px] w-[80px] h-auto z-50">
            <img
                src={`${import.meta.env.BASE_URL}/images/POPICK.png`} 
                alt="POPICK 로고"
                className="w-full h-auto object-contain"
            />
        </div>

      <div className="absolute top-[90px] left-[68px] text-center text-[19px] text-[#333]  z-40 ">
        {/* <div className="absolute top-[90px] left-[68px] text-center text-[19px] text-[#333] font-['ONE-Mobile-POP-OTF'] z-40 "> */}
        <p>데이트 장소 고민될 때 눌러봐!</p>

      </div>
        <div className="absolute top-[125px] left-[47px] text-center text-[30px] z-40">
        {/* <div className="absolute top-[125px] left-[47px] text-center text-[30px] font-['ONE-Mobile-POP-OTF'] z-40"> */}
            <span className="text-[#B096FF]">랜덤 데이트 </span>
            <span className="text-[#A9B8FD]">슬롯 머신</span>
        </div>

        <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto">
          {/* 슬롯머신 이미지 */}
          <img
            src={`${import.meta.env.BASE_URL}/images/슬롯머신(최종).png`}
            alt="슬롯 본체"
            className="absolute inset-0 w-full h-full object-contain z-40"
            style={{
              width: "260px",
              top: "-525px",
              left: "55px",
            }}
          />

          {/* 레버 이미지 */}
          <img
            ref={leverRef}
            src={`${import.meta.env.BASE_URL}/images/슬롯손잡이.png`}
            alt="레버"
            onClick={pullLever}
            className="absolute z-30 origin-top-right cursor-pointer transition-transform"
            style={{
              width: "48px",
              top: "-408px",
              right: "17px",
            }}
          />
        </div>


      {/* 슬롯 영역 */}
        <div className="absolute z-30 flex gap-[1px] top-[283px] left-[87px] w-[195px] h-[100px]">
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
            className="absolute z-40 w-[175px] h-[63px] top-[455px] right-[102px]
            bg-[#A477FD] rounded-3xl shadow-md drop-shadow-lg inner-shadow text-white font-semibold text-lg flex items-center justify-center
            transition-transform  active:scale-105 hover:bg-[#9b6cff]"
            onClick={handleSpin}
            disabled={spinning}
            >
        {/* <div className="text-[#FCF5FF] stroke-outline font-['ONE-Mobile-POP']"> */}
        <div className="text-[#FCF5FF] stroke-outline ">
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
