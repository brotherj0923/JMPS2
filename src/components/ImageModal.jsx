const ImageModal = ({ imgSrc, onClose }) => {
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    };

    return (
        <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
        onClick={handleBackgroundClick} // ✅ 여기 추가
        >
        <div className="relative w-[80%] max-w-[340px]">
            <img src={imgSrc} alt="확대보기" className="w-full h-auto rounded-lg" />
            <button
            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded"
            onClick={onClose}
            >
            닫기
            </button>
        </div>
        </div>
    );
};

export default ImageModal;