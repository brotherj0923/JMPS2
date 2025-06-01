import React from "react";

const THEMES = {
  A: "로맨틱",
  B: "힐링",
  C: "레트로",
  D: "트렌디",
  E: "아트",
};


const ResultModal = ({ onClose , resultLetter }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-4 font-['ONE-Mobile-POP']">
            <span className="text-[#8399fa]">{THEMES[resultLetter]} 테마 </span>
            <span>코스 당첨!</span>
          </h2>
          <p className="text-lg mb-6 font-['NotoSansKR-Black'] ">당첨된 테마를 확인해보세요</p>
          <button
            className="mt-2 px-4 py-2 bg-white border-2 border-[#9a6afa] rounded-xlg shadow-md hover:shadow-lg transition"
            onClick={onClose}
          >
          <img
            src={`/images/slot/${resultLetter}.png`}
            alt={THEMES[resultLetter]}
            className="w-12 h-12 object-contain"
          />
          </button>
      </div>
    </div>
  );
};


export default ResultModal;