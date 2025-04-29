import { useContext, useEffect, useRef } from "react";
import { Link,  useNavigate } from "react-router-dom"
import { useFirebase } from "../context/FirebaseContext"

import cardIMG from '/images/card_1.png';
import footerSVG from '/svgs/footerCurve.svg'
import { useGSAP, } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/all";
import clockSVG from '/svgs/clock.svg';
import { Flip } from "gsap/Flip";
import mdClock from "/images/mdClock.png";
import hor1 from "/images/hor1.png";
import hor2 from "/images/hor2.png";
import hor3 from "/images/hor3.png";
gsap.registerPlugin(MotionPathPlugin, Flip);
gsap.registerPlugin(ScrollTrigger);



const Home = () => {

    const firebase = useContext(useFirebase);
    const navigate = useNavigate();

    const rectRef = useRef(null);
    const oContainerRef = useRef(null);
    const clockContainerRef = useRef(null)

    useGSAP(() => {


        if (!firebase.loading) {
            const heroImgCards = gsap.utils.toArray('.cardImg');
            const horizontalScrollDivs = gsap.utils.toArray('.horizontal-scroll-divs');
            const cardTrainImages = gsap.utils.toArray('#cardTrainImages');
            const clockAnimationPath = MotionPathPlugin.getRelativePosition(oContainerRef.current, clockContainerRef.current, [0.5, 0.5], [0.5, 0.5]);



            //animating the clock thing
            gsap.timeline({
                scrollTrigger: {
                    trigger: oContainerRef.current,
                    start: 'top 40%',
                    scrub: 1,
                    end: 'bottom top'

                }
            }).to(oContainerRef.current, {
                zIndex: 20,
                rotateY: 180,
                x: "+=" + clockAnimationPath.x,
                y: "+=" + clockAnimationPath.y,
                duration: 2,
                ease: "none",
                scale: 2,
                opacity: 1,
                rotationZ: '2deg'

            })




            const section1Timeline = gsap.timeline();


            //hero image rotation animation
            section1Timeline.from('#WordWise', {
                opacity: 0,
                duration: 0.5,
                ease: 'power1.out',
            })
            section1Timeline.fromTo(heroImgCards, {
                y: 0,
                opacity: 0,
                rotate: 0,
            }, {
                y: -50,
                opacity: 1,
                stagger: 0.5,
                rotate: (index) => {
                    return index === 0 ? -20 : 10;
                },
                transformOrigin: 'bottom right',
                duration: 1,
                ease: 'power2.Out'
            })

            section1Timeline.fromTo('#oldClockParent', {
                visibility: 'hidden',
                rotate: '-35deg',
                transformOrigin: 'top right'
            }, {
                visibility: 'visible',
                opacity: 0.5,
                rotate: 10,
                transformOrigin: 'top right',
                duration: 1,

            }, "-=0.5")
            section1Timeline.from('#hero-tagline', {
                opacity: 0,
                y: 50,
                duration: 0.5
            }, "-=1")

            //card train images animation 
            section1Timeline.from(cardTrainImages, {
                opacity: 0,
                grid: 'center',
                stagger: {
                    amount: 1,
                    from: "center",
                    grid: 'auto',
                    ease: 'power2.Out'
                }
            })



            //horizontal animation
            gsap.to(horizontalScrollDivs, {
                xPercent: -100 * (horizontalScrollDivs.length - 1),
                scrollTrigger: {
                    trigger: rectRef.current,
                    start: "top top",
                    end: "+=" + (rectRef.current.offsetWidth),
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                }
            })

        }






    }, [])

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/dashboard', { replace: true });
        }
    }, [firebase, navigate])



    return (
        <div className="w-full h-full relative overflow-x-hidden ">


            <>
                <section id="hero-section home-section-1" className="z-[10] relative w-full h-[100vh] flex justify-center items-center flex-col gap-4 md:gap-[4rem] lg:gap-[5rem]">
                    <h1 className="text-[4rem] relative md:text-[8rem] lg:text-[12rem]  tracking-tight font-titanOne font-bold text-4xl  ">
                        <div id="home-card-img-container" className="  w-[6rem] h-[5rem] md:w-[10rem] md:h-[8rem] lg:w-[16rem] lg:h-[16rem] absolute z-[-2] left-[-2rem] md:left-[-3rem] top-[-2.5rem] md:top-[-4rem]  lg:left-[-6rem] lg:top-[-8rem] flex justify-center items-center">
                            <img src={cardIMG} alt="cardImg" id="heroImg1" className="cardImg absolute " />
                            <img src={cardIMG} alt="cardImg" id="heroImg2" className="cardImg absolute " />

                        </div>
                        <div id="oldClockParent" ref={oContainerRef} className=" hidden lg:w-[16rem] lg:h-[16rem] absolute z-[-2] right-[-1rem] md:right-[-3rem] bottom-[-6rem] md:bottom-[-10rem]  lg:right-[4rem] lg:bottom-[-16rem] lg:flex justify-center items-center">
                            <img src={clockSVG} alt="cardImg" id="clockSVG" className=" scale-[2] lg:scale-[3] w-full h-full " />

                        </div>

                        <b id="WordWise">WordWise</b>
                    </h1>
                    <p id="hero-tagline" className=" text-[0.8rem] md:text-2xl">Expand Your <b>Vocabulary</b>, Expand Your <b>Horizons.</b></p>
                    <div className=" absolute top-4 right-6 md:top-6 md:right-16 border-2 p-2 hover:bg-black cursor-pointer  hover:text-white border-black rounded-md">
                        <Link to='/signup' className=" text-cyan-600"> Sign Up</Link> /
                        <Link to='/login' className=" text-cyan-600"> Login</Link>
                    </div>
                    <div id='cardTrain' className='w-full h-[16rem] flex flex-shrink-0 overflow-hidden absolute bottom-[-7rem]'>
                        {[0, 1, 2, 3, 4, 5, 6].map((e, _) => (
                            <div key={_} id="cardTrainImages" className="w-[8rem] md:w-[16rem]  h-full flex flex-shrink-0 justify-center items-center ">
                                <img src={cardIMG} alt="carImg" />
                            </div>
                        ))}
                    </div>
                </section>
                <section className="w-full h-[100vh] flex flex-col lg:flex-row justify-evenly  items-center lg:items-end">
                    <div id="newClockParent" ref={clockContainerRef} className="w-[60%] h-[30%] lg:w-[40%] lg:h-[60%] hidden lg:flex  justify-center items-center"></div>
                    <div className=" lg:hidden md:w-[50%] h-[50%] mt-20  flex justify-center items-center">
                        <img src={mdClock} alt="cardImg" className="   h-full " />

                    </div>
                    <div className="w-[80%] md:w-[50%] h-[30%] lg:w-[40%] lg:h-[60%] font-bold tracking-tighter text-[2rem] md:text-[3rem] lg:text-[4rem]">
                        <p>Get the <b className="bg-yellow-400 ">Chrome Extension</b> to get the most out of your time.</p>
                    </div>
                </section>
                <section ref={rectRef} id="home-section-2" className="w-[300vw] h-fit flex flex-row overflow-x-hidden">
                    <div className="horizontal-scroll-divs flex flex-col lg:flex-row  justify-evenly items-center p-8 w-[100vw] h-[100vh]">
                        <div className="w-[80%] lg:w-[45%] h-[40vh] z-40 lg:h-[70vh]  flex flex-col justify-center items-center gap-4 lg:gap-0 lg:items-start">
                            <h3 className=" text-[3rem] md:text-[6rem] font-titanOne font-bold  ">DOWNLOAD</h3>
                            <p className=" text-[2rem] md:text-[3rem]">the chrome extension from chrome webstore</p>
                            <button className="bg-black  p-4 px-6 text-white text-2xl rounded-2xl hover:text-blue-50 hover:bg-gray-600 hover:cursor-pointer">Download</button>
                        </div>
                        <div className="w-[80%] lg:w-[45%] h-[40vh] lg:h-[70vh]flex overflow-hidden flex-col justify-center items-start rounded-2xl ">
                            <img src={hor1} alt="chrome web store" className="w-full" />
                        </div>

                    </div>
                    <div className="horizontal-scroll-divs flex flex-col lg:flex-row  justify-evenly items-center p-8 w-[100vw] h-[100vh] ">
                        <div className="w-[80%] lg:w-[45%] h-[40vh] z-40 lg:h-[70vh] grid grid-rows-[70%_20%_10%] grid-cols-[15%_85%]">
                            <span id='learn-container' className="  row-span-2 flex flex-col justify-center items-center font-titanOne text-[2rem] md:text-[2.5rem] lg:text-[3.6rem]">
                                <b>L</b>
                                <b>E</b>
                                <b>A</b>
                                <b>R</b>
                                <b>N</b>
                            </span>
                            <span id='learn-container' className="rounded-2xl overflow-hidden row-start-1 col-start-2">
                             <img src={hor2} alt="new word demo"  className="h-full"/>
                            </span>
                            <span id='learn-container' className="flex justify-start items-end lg:items-center text-[2rem] md:text-[2.5rem] lg:text-[3.6rem] font-titanOne col-start-2 row-start-2">
                                <p>E&nbsp;W&nbsp;&nbsp;W&nbsp;O&nbsp;R&nbsp;D&nbsp;S&nbsp;</p>
                            </span>
                            <span className=" text-[.8rem] md:text-2xl lg:text-3xl md:px-8 row-start-3 col-start-1 col-end-3">
                                <p>Every time you visit chrome!!!</p>
                            </span>


                        </div>
                        <div className="w-[80%] lg:w-[45%] h-[40vh] lg:h-[70vh] text-[2rem] md:text-[3rem] lg:text-[4rem] font-titanOne leading-none ">
                            <p>Get to see their <b className=" md:text-[4rem] lg:text-[5rem]">TRANSLATION</b> of those words in every web page.</p>
                        </div>
                    </div>
                    <div className="horizontal-scroll-divs w-[100vw] h-[100vh] flex flex-col lg:flex-row  justify-evenly items-center p-8  ">
                        <div className="w-[80%] lg:w-[45%] h-[40vh] z-40 lg:h-[70vh]  flex flex-col justify-center items-center gap-4 lg:gap-0 lg:items-start rounded-2xl overflow-hidden">
                         <img 
                            src={hor3}
                            className="h-full "
                         />
                        </div>
                        <div className="w-[80%] lg:w-[45%] h-[40vh] lg:h-[70vh] text-[2rem] md:text-[3rem] lg:text-[4rem] font-titanOne leading-none ">
                            <p>revise regularly with <b className="md:text-[4rem] lg:text-[5rem]">FLASHCARDS</b></p>
                        </div>
                    </div>
                </section>


                <section className="relative overflow-hidden   w-full h-[100vh] flex  items-center lg:items-end  justify-center ">
                    <div
                        style={{
                            width: '100%',
                            backgroundImage: `url(${footerSVG})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            color: 'blue'
                        }}
                        className="w-full z-[-1] absolute  scale-x-[1.1]  h-full z-50 overflow-hidden">


                    </div>


                    <span className="text-[2rem] m-16 flex justify-center items-center text-white font-titanOne  z-40">
                        <p >Learn Languages. Embrace Cultures. Transform Lives.</p>
                    </span>
                </section>
            </>



        </div>
    )
}

export default Home