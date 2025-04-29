import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotateY: {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(180deg)' },
        },
      },
      animation: {
        rotateY: 'rotateY 3s ease-in-out',
      },
      fontFamily: {
        'Watermelon' : ['Watermelon', 'Parkinsans'],
        titanOne : ['Titan One','Watermelon', 'Parkinsans']
      },
    },
    colors: {
      blue : {
        50 : '#BDE0FE',
        100 : '#A2D2FF', 
      },
      violet : {
        50 : '#CDB4DB',
      },
      pink : {
        50 : '#FFC8DD', 
        100 : '#FFAFCC',
      }
    }
  },
  plugins: [],
});
