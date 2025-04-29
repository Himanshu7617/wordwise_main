import { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";


const AccordianUI = ({ title, definition, translation, example }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => { setActive(prev => !prev) }}
      className="w-full transition-all  ease-in-out duration-[1000] h-fit rounded-tl-3xl rounded-br-3xl min-h-[8vh] bg-blue-50 flex flex-col justify-center px-4">
      <div className='w-full h-[8vh]  flex relative items-center'>
        {title}
        <span className={`absolute right-0 text-3xl ${active && 'rotate-45'} transition-all ease-in-out ${active && 'text-red-700'} hover:text-purple-400`} ><CiCirclePlus /></span>
      </div>
      {active && <div className=' py-4 w-full h-fit min-h-[8vh] flex flex-col'>
        <div><p>
          <b>Translation: </b>
          {translation}
        </p></div>
        <div><p>
          <b>Definition: </b>
          {definition}
        </p></div>
        <div><p>
          <b>Example: </b>
          {example}
        </p></div>




      </div>}
    </div>
  )
}

export default AccordianUI