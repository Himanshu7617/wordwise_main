

import { useState } from 'react'
import { lightColors, darkColors } from '../../constants/Colors';

const useColor = (index) => {
    const [color , setColor] = useState('');
    const randomIDX = Math.random() * lightColors.length;

    


  return (
    color
  );
}

export default useColor