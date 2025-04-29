
const HeroWordCard = ({ containerClass , word, definition, example, translation, style }) => {
    return (
        <div style={style} className={`w-16 h-fit md:h-min-[10rem] md:w-[12rem] p-4 rounded-sm rounded-tr-3xl flex justify-center items-center flex-col gap-3 bg-pink-100 ${containerClass}`}>
            <div className="flex gap-2 bg-pink-50 rounded-lg p-1 px-3" >
                <p>
                    <b className="text-nowrap">Word: </b>{word}
                </p>
            </div>
            <div className="flex gap-2 bg-pink-50 rounded-lg p-1 px-3 ">

                <p className="">
                    <b className="text-nowrap" >translation: </b>
                    {translation}
                </p>
            </div>
            <div className="flex gap-2 bg-pink-50 rounded-lg p-1 px-3 ">

                <p className="">
                    <b className="text-nowrap" >Definition: </b>
                    {definition}
                </p>
            </div>
            <div className="flex gap-2 bg-pink-50 rounded-lg p-1 px-3 ">
                <p>
                    <b className="text-nowrap">Example: </b>
                    {example}
                </p>
             
            </div>
        </div>
    )
}

export default HeroWordCard