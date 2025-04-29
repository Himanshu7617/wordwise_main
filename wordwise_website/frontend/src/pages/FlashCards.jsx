import { useContext, useEffect, useRef, useState } from "react"
import FlashCard from "../components/FlashCard"
import Header from "../components/Header"
import { useFirebase } from "../context/FirebaseContext"

const FlashCards = () => {

  const { allWords } = useContext(useFirebase);
  const [flashcardsContainerWidth, setFlashcardsContainerWidth] = useState();
  const [flashcardWidth, setFlashcardWidth] = useState();
  const [currCardIdx , setCurrCardIdx] = useState(0);
  const flashcardsContainerRef = useRef(null);
  const flashcardRef = useRef(null);

  const handleWindowResize = ()=>{
   
    setFlashcardsContainerWidth(flashcardsContainerRef.current.offsetWidth);
    setFlashcardWidth(flashcardRef.current.offsetWidth);
  }
  

  useEffect(()=>{
    flashcardsContainerRef.current && setFlashcardsContainerWidth(flashcardsContainerRef.current.offsetWidth);
    flashcardRef.current && setFlashcardWidth(flashcardRef.current.offsetWidth);

    window.addEventListener('resize', handleWindowResize);
    console.log('fc width :', flashcardWidth);
    console.log('fc container width : ', flashcardsContainerWidth);
    return () => {
      window.removeEventListener('resize',handleWindowResize);
    }
  },[flashcardsContainerWidth, flashcardWidth,]);

  return (
    <div
    className="w-full h-fit min-h-[100vh] flex flex-col justify-start py-4  gap-16 items-center " 
    > 
     <Header/>
     <div ref={flashcardsContainerRef} className="relative  w-[90%] overflow-x-hidden flex flex-col justify-between items-center  h-fit min-h-[100vh]">

      {allWords.length && allWords.map((word, i)=>{
        const distance = Math.abs(currCardIdx - i);

        return (<div 
        ref={flashcardRef}
        style={{
          left : i=== currCardIdx ? '35%' : `${(flashcardsContainerWidth/2+50*i)-(currCardIdx*100)}px`, 
          zIndex : i=== currCardIdx ? allWords.length+10 : allWords.length-distance,
          top : `${20-distance}%`,
          pointerEvents : i === currCardIdx && 'auto',
          
        }}
         key={i} 
         className={`w-[60%] md:w-[40%] lg:w-[30%] duration-500 h-fit absolute pointer-events-none top-[20%] `}>
          <FlashCard key={i} word={word.word} translation={word.translation} definition={word.definition} example={word.example}/>
        </div>) 
      })}

      <button onClick={()=>{setCurrCardIdx(prev => Math.max(prev-1, 0) )}} className="w-[8rem] h-fit bg-purple-500 text-white hover:bg-pink-400 pointer-cursor outline-none rounded-lg p-4 mt-12 shadow-lg shadow-purple-300 hover:shadow-pink-600">Previous</button>
      <button onClick={()=>{setCurrCardIdx(prev => Math.min(prev+1, allWords.length-1))}} className="w-[8rem] h-fit bg-purple-500 text-white hover:bg-pink-400 pointer-cursor outline-none rounded-lg p-4 mb-8 shadow-lg shadow-indigo-300 hover:shadow-pink-600">Next</button>
     </div>
    </div>
  )
}

export default FlashCards