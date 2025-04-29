import { useState} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';



const FlashCard = ( {word, translation, definition, example}) => {

    const [backSide, setBackSide] = useState(true);

    useGSAP(()=>{
        // gsap.to('#flashcard',{
        //     rotateY : backSide ? '180deg' : '0',
        //     y: backSide ? -10 : 0,
        //     duration: 0.5,

        // })
        console.log(backSide)
    },[backSide])


  return (
    <div className={`w-full h-full perspective-1000 `}>

    <div 
    id='flashcard'
        onClick={()=>{setBackSide(!backSide)}} 
     className={`preserve-3d w- ${backSide ? 'rotate-y-180' : 'rotate-y-0'} transition-all duration-500 ease-in-out  h-fit cursor-pointer min-h-[60vh] flex flex-col justify-evenly items-center rounded-3xl p-4 bg-blue-500 shadow-2xl shadow-indigo-800`}>
        

    {backSide && <div className="rotate-y-180 text-[0.7rem] md:text-[1rem] lg:text-2xl   bg-blue-50 w-fit h-fit min-h-6 p-2 flex justify-start items-center rounded-lg">
      <p><b>{word} </b>  </p>
    </div>}

    {!backSide && <div className={`text-[0.7rem] md:text-[1rem] lg:text-[1.2rem] m-2 bg-blue-50 w-fit min-w-full h-auto max-h-[4rem]  overflow-auto  p-2 flex justify-start items-center rounded-lg`}>
      <p><b>Word: </b>{word}  </p>
    </div>}
    
    {!backSide && <div className="text-[0.7rem] md:text-[1rem] lg:text-[1.2rem] m-2 bg-blue-50 w-fit min-w-full h-auto max-h-[4rem] overflow-auto p-2 flex justify-start items-center rounded-lg">
      <p><b>Translation: </b>{translation}  </p>
    </div>}
    
    {!backSide && <div className="text-[0.7rem] md:text-[1rem] lg:text-[1.2rem] m-2 bg-blue-50 w-fit min-w-full h-auto max-h-[4rem] overflow-auto p-2 flex justify-start items-center rounded-lg">
      <p><b>Definition: </b>{definition}  </p>
    </div>}
    
    {!backSide && <div className="text-[0.7rem] md:text-[1rem] lg:text-[1.2rem] m-2 bg-blue-50 w-fit min-w-full h-auto max-h-[4rem] overflow-auto p-2 flex justify-start items-center rounded-lg">
      <p><b>Example: </b>{example}  </p>
    </div>}

</div>
    </div>
)
}

export default FlashCard