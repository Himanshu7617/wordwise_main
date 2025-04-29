import { useContext, useState } from "react"
import { useFirebase } from "../context/FirebaseContext"
import Header from "../components/Header";
// import { MdEdit } from "react-icons/md";
// import { RxCrossCircled } from "react-icons/rx";
import avatar1 from '/images/avatar1.png';
import avatar2 from '/images/avatar2.png';


import germanFlag from '/flags/germany.png';

const Profile = () => {
  // const [displayEditMenu, setDisplayEditMenu] = useState(false);
  
  const allProfileSrcs = [avatar1, avatar2];
  
  const firebase = useContext(useFirebase);
  const [active, setActive] = useState(0);






  return (

    <div className="w-full  h-full flex flex-col relative justify-center items-center gap-4">
      {/* {displayEditMenu &&
        <div className="w-[80vw] absolute flex flex-col justify-start p-4 top-10 z-[2000] rounded-3xl  lg:w-[60vw] h-[70vh] bg-gray-200">
          <span onClick={() => setDisplayEditMenu(false)} className="w-fit h-fit p-1 hover:text-pink-400 cursor-pointer absolute right-2 top-2 rounded-xl text-black text-3xl"><RxCrossCircled /></span>
          <h4 className="text-2xl underline font-bold">Choose your favourite avatar</h4>
          <div className="w-full h-[80%] flex flex-wrap gap-4 my-4 ">
          {allProfileSrcs.map((item, i)=>{
            return <div onClick={()=>{setActive(i); setDisplayEditMenu(false);}} className="h-[10rem] cursor-pointer w-[10rem] border-2 bg-pink-100 hover:bg-black rounded-2xl p-4" key={i}>
              <img className="h-full" src={item}/>
            </div>
          })}
          </div>
        </div>} */}
      <Header />
      <div className="w-full h-fit min-h-[100vh] flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 mt-4 ">

        <div className="w-3/5 lg:w-1/5 h-fit rounded-2xl flex flex-col min-h-16 relative">
          {/* <span onClick={() => { setDisplayEditMenu(true) }} className="w-fit h-fit p-1 border-4  border-pink-700 hover:bg-pink-300 hover:text-white absolute right-2 top-2 rounded-xl text-black text-3xl"><MdEdit /></span> */}
          <div className="w-full h-[18rem] flex p-2   bg-pink-100 rounded-2xl justify-center items-center">
            <img src={allProfileSrcs[active]} alt="svg imag" className=" h-full  " />
          </div>

        </div>
        <div className="w-fit min-w-3/5 h-fit min-h-[5rem]  flex flex-col justify-start p-4 text-[0.7rem] md:text-2xl lg:text-3xl border-l-4 border-blue-600">
          <div className=" h-fit w-full ">
            <p><b>Name :&nbsp;</b>{firebase.user && firebase.user.displayName}</p>
            <p><b>Email :&nbsp;</b>{firebase.user && firebase.user.email}</p>
          </div>
          <div className="flex gap-4 items-center "><b>Language :</b> <p >German</p>
            <span className="w-fit h-fit inline-block overflow-hidden "><img className="w-4 h-4 lg:w-8 lg:h-8 object-cover" alt="German flag symbol" src={germanFlag} /></span>
          </div>


          <button className="w-fit h-fit bg-black p-3 rounded-2xl my-4 px-8 text-white hover:text-pink-300" onClick={firebase.logOut}>logout</button>


        </div>
      </div>

    </div>
  )
}

export default Profile