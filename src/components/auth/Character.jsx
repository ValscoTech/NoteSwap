import img1 from "../../assets/images/1.png";

function Character() {
    return (
        <>
            <div className="flex flex-col justify-center text-center md:text-left">
                <div className="text-4xl md:text-6xl px-4 md:px-16 lg:px-32">
                    RENT NOTES - OFFER NOTES - MAKE A PROFILE AND DO MORE WITH NOTESWAP
                </div>

                <div className="flex flex-col justify-center place-items-center py-8 mt-7">
                    <img className="w-[150px] md:w-[300px] h-auto object-cover" src={img1} />
                </div>
            </div>
        </>
    );
}

export default Character;
