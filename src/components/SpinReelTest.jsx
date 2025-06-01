// components/SpinReelTest.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const EMOJIS = ["A", "B", "C", "D", "E"];
const getRandomLetter = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const SpinReelTest = ({ onSpinEnd }) => {
  const reelRef = useRef(null);

  useEffect(() => {
    const ref = reelRef.current;
    ref.innerHTML = "";

    const selected = getRandomLetter();
    const spinLetters = Array.from({ length: 44 }, () =>
      EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    );
    spinLetters.push(selected);

    spinLetters.forEach((char) => {
      const img = document.createElement("img");
      img.src = `/images/slot/${char}.png`;
      img.alt = char;
      img.className = "w-[76px] h-[76px] object-contain block mx-auto";

      const div = document.createElement("div");
      div.className = "w-[74px] h-[90px] flex items-center justify-center";
      div.appendChild(img);
      ref.appendChild(div);
    });

    const itemHeight = 65;
    const totalHeight = itemHeight * (spinLetters.length - 1);

    gsap.fromTo(
      ref,
      { y: 0 },
      {
        y: `-${totalHeight}px`,
        duration: 3,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(ref, { y: `-${itemHeight * (spinLetters.length - 1)}px` });
          if (onSpinEnd) onSpinEnd(selected);
        },
      }
    );
  }, [onSpinEnd]);

  // SpinReelTest.jsx 내부
return (
  <div
  className="overflow-hidden bg-white shadow-xl"
  style={{
    width: "78%",       // 부모가 정한 너비 기준으로
    height: "95%",      // 부모가 정한 높이 기준으로
    top:"125%",
    left:"25%",
    borderRadius: "12px",
    position: "relative",
  }}
>
    <div
      ref={reelRef}
      className="reel flex flex-col items-center transition-all"
      style={{ width: "100%"}}
    ></div>
  </div>
);
};

export default SpinReelTest;