/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Escaneia todos os arquivos TS/JS no src
    "./public/index.html", // Inclui o index.html, se usado
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#e4ede3",
        preto: "#000000",
        verde: "#004d61",
        "verde-claro": "#2f6e6d",
        "verde-light": "#47a138",
        cinza: "#dee9ea",
        "cinza-escuro": "#8b8b8b",
        erro: "#bf1313",
        "azul-grafico": "#2567f9",
        "roxo-grafico": "#8f3cff",
        "laranja-grafico": "#f1823d",
        "magenta-grafico": "#ff3c82",
      },
      screens: {
        xs: { min: "30rem" },
        "3xl": { min: "120rem" },
        tablet: { min: "1080px" },
        mobile: { min: "620px" },
      },
      fontSize: {
        "size-14": "14px",
        "size-16": "16px",
        "size-18": "18px",
        "size-20": "20px",
        "size-25": "25px",
        "height-25": "30px",
        "height-14": "16.8px",
        "height-16": "19.2px",
        "height-18": "21.6px",
        "height-20": "24px",
      },
    },
  },
  plugins: [],
};
