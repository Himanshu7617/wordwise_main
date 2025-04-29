import { useContext, useEffect, useState } from "react"
import { useFirebase } from "../context/FirebaseContext"
import { useNavigate, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import AccordianUI from "../components/AccordianUI";
import { RxCrossCircled } from "react-icons/rx";
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from "../components/Header";





const Dashboard = () => {

  const firebase = useContext(useFirebase);
  const navigate = useNavigate();
  const { allWords } = useContext(useFirebase);
  const [searchWord , setSearchWord] = useState('');
  const [searching, setSearching ] = useState(false);
  const [foundWord , setFoundWord ] = useState({});
  const [lastScrollY, setLastScrollY] = useState();
  const [navHidden, setNavHidden] = useState(false);


  const {y: currentScrollY} = useWindowScroll();

  useGSAP(()=>{
    gsap.to('header',{
      y: navHidden ? -100 :0,
      opacity : navHidden ? 0 : 1,
      duration : 0.3,
    })
  },[navHidden])

  useEffect(() => {
    if(!firebase.isLoggedIn && firebase.loading === false) {

      navigate('/');
    }
  }, [firebase, navigate]);

  useEffect(()=>{
    if(currentScrollY < lastScrollY  ){
      setNavHidden(false);
      
    }else if(currentScrollY > lastScrollY ){
      setNavHidden(true);
    }
    setLastScrollY(currentScrollY);
  },[currentScrollY])
  
  const handleSearchBarInputChange = (e) => {
    e.preventDefault();

    
    const searchedAnswer = firebase.allWords.find(x => x.word.localeCompare(searchWord, 'en', {sensitivity : 'base'}) === 0);
    
    setSearching(true);
    if (searchedAnswer) {
      setFoundWord(searchedAnswer);
    } else {
      setFoundWord({}); // Clear foundWord if no match
    }
  } 

  const handleCancelSearch = (e) => {
    e.preventDefault();


    setSearchWord('');

    setSearching(false);
  }


  return (

    <div className="w-full h-fit min-h-[100vh] flex flex-col justify-evenly p-4 gap-8 items-center">

      <Header/>
      
      <main className="w-[90%] h-fit min-h-[90vh] flex justify-evenly items-start p-4 border-blue-50 border-2">
        <div id="left-panel" className="w-[90%] lg:w-[50%] h-fit flex flex-col justify-start  items-center gap-8 min-h-[80vh] ">
          <div id="search-bar" className="group focus-within:outline focus-within:outline-blue-50 w-[96%] h-[7vh] flex  bg-gray-50 rounded-lg">
            
            <input type="text" value={searchWord} onChange={(e) => {setSearchWord(e.target.value);}}  placeholder="Search" className="w-4/5 h-full px-4 text-purple-300 placeholder:text-blue-100 bg-blue-50 bg-opacity-[0.5] bg-none rounded-tl-lg rounded-bl-lg border-none outline-none text-2xl" />
            {searching === true && 
            
            <button onClick={handleCancelSearch} className="w-1/5 h-full outline-none bg-blue-100 flex justify-center items-center text-3xl text-purple-600 ">
              <RxCrossCircled/>
            </button>
            }
            <button onClick={handleSearchBarInputChange} className="w-1/5 h-full outline-none bg-blue-100 flex justify-center items-center text-3xl text-purple-600 rounded-tr-lg rounded-br-lg">
              <CiSearch/>
            </button>
            
          </div>
          <div id="words-container" className="flex flex-col gap-4 w-[90%] justify-start items-center ">
            {searching === true && (foundWord.word ?
              <AccordianUI title = {foundWord.word} definition={ foundWord.definition} translation = {foundWord.translation} example = {foundWord.example} />
              : <div> Word not found! </div>)
            }
            
            { searching === false && (allWords.length > 0 ? allWords.map((word, i)=> (
              <div key={i} className="w-full h-fit min-h-[8vh] flex flex-col ">
                <AccordianUI title= {word.word} definition = {word.definition} translation = {word.translation} example = {word.example} />
                </div>
            )) :
            <div> No words found yet!</div>)}
          </div>
        </div>
        <div id="right-panel" className="w-[30%] h-fit min-h-[60vh] hidden lg:flex flex-col justify-evenly items-center rounded-3xl bg-blue-500">
            <div className="bg-blue-50 w-4/5 h-fit min-h-6 p-2 flex justify-start items-center rounded-lg">
              <p><b>Word: </b>{allWords.length && allWords[0].word}  </p>
            </div>
            <div className="bg-blue-50 w-4/5 h-fit min-h-6 p-2 flex justify-start items-center rounded-lg">
              <p><b>Translation: </b>{allWords.length && allWords[0].translation}  </p>
            </div>
            <div className="bg-blue-50 w-4/5 h-fit min-h-6 p-2 flex justify-start items-center rounded-lg">
              <p><b>Definition: </b>{allWords.length && allWords[0].definition}  </p>
            </div>
            <div className="bg-blue-50 w-4/5 h-fit min-h-6 p-2 flex justify-start items-center rounded-lg">
              <p><b>Example: </b>{allWords.length && allWords[0].example}  </p>
            </div>
        
        </div>
      </main>
      


    </div>
  )
}

export default Dashboard