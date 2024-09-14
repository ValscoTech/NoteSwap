// import img1 from "../../assets/images/1.png";

// function Character() {
//     return (
//         <>
//             <div className="flex flex-col justify-center   ">
//                 <div className="text-6xl text-left px-32">
//                     RENT NOTES - OFFER NOTES - MAKE A PROFILE AND DO MORE WITH NOTESWAP</div>

//                 <div className="flex flex-col justify-center place-items-center py-8 mt-7">
//                     <img className="w-[300px] h-auto object-cover" src={img1} />
//                 </div>
//             </div>
//         </>)
// }
// export default Character;


import img1 from "../../assets/images/1.png";

function Character() {
    return (
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-32 py-8">
            <div className="text-2xl md:text-4xl lg:text-6xl text-center mb-8">
                RENT NOTES - OFFER NOTES - MAKE A PROFILE AND DO MORE WITH NOTESWAP
            </div>
            <div className="flex justify-center mb-8">
                <img className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-cover" src={img1} alt="Character" />
            </div>
        </div>
    );
}

export default Character;
