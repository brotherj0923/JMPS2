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
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in',
        fadeOut: 'fadeOut 0.4s ease-out',
      },
      keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          fadeOut: {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
      },
    },
  },
  plugins: [aspectRatio],
}