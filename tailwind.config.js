/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['NotoSansKR-VariableFont','ONE Mobile POP','ONE Mobile POP OTF','NotoSansKR-Black','NotoSansKR-Bold','NotoSansKR-ExtraBold','NotoSansKR-ExtraLight','NotoSansKR-Light','NotoSansKR-Medium','NotoSansKR-Regular','NotoSansKR-SemiBold','NotoSansKR-Thin','GmarketSansTTFBold','GmarketSansTTFLight','GmarketSansTTFMedium'],
      },
    },
  },
  plugins: [aspectRatio],
}