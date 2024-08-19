
export default function NotesView(){
    return(
        <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 justify-center gap-x-11 ">
                {filteredData.map((item) => (
                    <a key={item.id} href={item.link}>
                    <div className="bg-white text-black p-4 rounded-2xl w-fit cursor-pointer">
                        <div className="flex justify-normal gap-x-4 items-start">
                        <div className="pt-1">{item.department}</div>
                        <div className="bg-[#a883c5] px-5 h-5 rounded-sm font-[500] text-sm flex flex-col justify-center">
                            <div>{item.school}</div>
                        </div>
                        </div>
                        <div className="flex justify-between pb-4">
                        <div className="text-lg w-[8.5rem]">{item.title}</div>
                        <div className="flex justify-normal border-2 border-black rounded-[0.7rem] w-fit items-center p-2 gap-x-2">
                            <div className="text-sm leading-4">
                            Modules<br /> Covered
                            </div>
                            <div className="text-4xl">{item.modulesCovered}</div>
                        </div>
                        </div>
                        <div className="flex justify-normal">
                        <div>
                            <img
                            className="w-32"
                            src={item.image1}
                            alt="Note Image 1"
                            />
                        </div>
                        <div>
                            <img
                            className="w-32"
                            src={item.image2}
                            alt="Note Image 2"
                            />
                        </div>
                        </div>
                    </div>
                    </a>
                ))}
                </div>
            </div>
        </div>
    )
}