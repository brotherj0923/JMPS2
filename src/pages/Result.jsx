import { useParams, useNavigate } from "react-router-dom";

const Result = () => {
    const { id } = useParams(); // A~E 중 하나
    const navigate = useNavigate();

    return (
        <div className="">
        <h1 className="text-4xl font-bold mb-6">🎉 추천 결과: {id}</h1>
        <p className="text-lg mb-8">이 알파벳에 해당하는 데이트 코스가 여기에 들어갈 거예요!</p>
        <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-pink-400 text-white rounded-lg shadow hover:bg-pink-500 transition"
        >
            다시 돌리기
        </button>
        </div>
    );
};

export default Result;