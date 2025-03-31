/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-1': 'radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.4) 0%, transparent 20%)',
        'gradient-radial-2': 'radial-gradient(circle at 90% 80%, rgba(79, 70, 220, 0.4) 0%, transparent 20%)'
      },
      boxShadow: {
        'custom-shadow': '10px 10px 50px rgba(138, 43, 226, 0.4);',
      },
    },
  },
  plugins: [],
}

