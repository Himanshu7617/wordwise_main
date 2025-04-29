import { useState, useEffect, useContext } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const Header = () => {

  const [navActive, setNavActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState();
  const [navHidden, setNavHidden] = useState(false);


  const { y: currentScrollY } = useWindowScroll();

  useGSAP(() => {
    gsap.to('header', {
      y: navHidden ? -100 : 0,
      opacity: navHidden ? 0 : 1,
      duration: 0.3,
    })

      gsap.to('#small-screen-navbar', {
        scaleY: navActive ? 1 : 0,
        scaleX: navActive ? 1 : 0.9,
        transformOrigin: 'top center',
        duration: 1,
      })
    
    

  }, [navHidden, navActive])



  useEffect(() => {
    if (currentScrollY < lastScrollY) {
      setNavHidden(false);

    } else if (currentScrollY > lastScrollY) {
      setNavHidden(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY])


  return (
    <div className='w-full h-full flex relative flex-col items-center'>

      <header className={`w-[90%] h-[14vh] z-[1000] rounded-3xl relative flex md:justify-between items-center px-8 md:px-16 lg:px-8  bg-gray-700 `}>
        <span className={`flex justify-center items-center text-white`}>
          <b className="text-2xl md:text-4xl ">WordWise</b>
        </span>
        <nav className="w-[30%] hidden  absolute right-20   h-4/5 md:flex justify-center items-center">
          <ul className="w-full h-full flex justify-evenly items-center ">
            <li
              className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-pink-100"
            ><Link to='/dashboard'>Dashboard</Link></li>
            <li
              className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-yellow-100"
            ><Link to='/flashcards'>Flashcards</Link></li>

            <li className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-blue-100"
            ><Link to='/profile'>Profile</Link></li>

          </ul>
        </nav>
        <span onClick={() => { setNavActive(!navActive) }} className={`md:hidden absolute right-4 text-4xl ${navActive ? 'text-pink-100' : 'text-white'} transition-all ease-in-out ${navActive && ' text-red-400'} ${navActive && 'rotate-45'}`} >
          <CiCirclePlus /></span>



      </header>
      <div id='small-screen-navbar' className={`w-[90%] flex  h-[90vh] scale-y-0 rounded-[2rem] absolute top-[7vh] z-[999] bg-gray-700 `}>

        <nav className="w-full  h-full flex justify-center items-center">
          <ul className="w-full h-full flex  flex-col justify-center items-center ">
            <li
              className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-pink-100"
            ><Link to='/dashboard'>Dashboard</Link></li>
            <li
              className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-yellow-100"
            ><Link to='/flashcards'>Flashcards</Link></li>

            <li className="h-fit w-fit text-white p-2  cursor-pointer  hover:text-blue-100"
            ><Link to='/profile'>Profile</Link></li>

          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header