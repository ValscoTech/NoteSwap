import { memo } from 'react'
import blog1 from '@/components/images/blog1.jpg'
import blog2 from '@/components/images/Blog2.png'
import blog3 from '@/components/images/blog3.png'

const Blog = () => {
    return (
        <div className='mx-4 md:mx-10 lg:mx-14'>
            <div className=''>
                <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl mt-4 sm:mt-6 lg:mt-8 mb-6 sm:mb-8 lg:mb-12'>
                    Blogs and Articles
                </h1>
                <h1 className='font-semibold text-2xl sm:text-3xl lg:text-4xl'>
                    Enhancing Law making Efficiency with AI: Paving the Way for Smarter Governance.
                </h1>
            </div>
            <div>
                <img
                    src={blog1}
                    alt="blog1"
                    className='w-full max-w-[90rem] h-[300px] sm:h-[500px] lg:h-[700px] my-8 lg:my-16 rounded-xl object-cover'
                />
            </div>
            <div className="font-sans min-h-screen">
                <div className="container mx-auto px-1 py-6">
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-28">
                        <div className="space-y-5 lg:mr-[-15rem] w-auto">
                            <p className='text-sm sm:text-base lg:text-lg leading-relaxed'>
                                Enhancing Law making Efficiency with AI: Paving the Way for Smarter Governance.
                                In an era marked by rapid technological advancements, it comes as no surprise that artificial intelligence (AI) is revolutionizing various industries. One sector that stands to benefit immensely from AI is governance and law making. With its ability to process vast amounts of data, analyse complex patterns, and make informed decisions, AI holds the potential to enhance law-making efficiency and drive smarter governance. A rising number of people are now interested in employing AI techniques to improve legislative processes.<br /><br />
                                These tools can be used to analyse massive volumes of data, spot patterns and trends, and aid in decision-making by legislators. In this blog post, we will explore the ways in which AI can contribute to streamlining the law-making process, improving decision-making, and ultimately creating more effective and efficient laws. Researching current laws, rules, and precedents in-depth to help legislators make decisions is one of their time-consuming jobs. This procedure can be automated using artificial intelligence (AI), which can mine huge databases and legal texts for pertinent facts and give legislators in-depth summaries and comparisons. Legislators can save time and effort by utilising AI to swiftly find pertinent cases, laws, and legal concepts.<br /><br />
                                The prospective effects of new legislation can be evaluated by lawmakers with the use of AI-powered predictive analysis. AI algorithms can predict the potential effects of a law on many parts of society, such as the economy, employment rates, public health, or the environment, by examining historical data, economic indicators, and social factors. This knowledge can aid legislators in making wise choices, anticipating problems, and modifying policies as necessary to improve government. AI can process and analyse enormous volumes of data, giving legislators useful information for making decisions based on the best available evidence.
                            </p>
                            <h1 className='font-bold text-[#A883C5] text-xl sm:text-2xl lg:text-3xl my-6 lg:my-10'>
                                AI can spot patterns and correlations
                            </h1>
                            <p className='text-sm sm:text-base lg:text-lg leading-relaxed'>
                                That human legislators might overlook by combining data from a variety of sources, including public opinion polls, social media trends, economic indicators, and expert analysis. These data-driven insights can help create policies that more precisely and successfully address social requirements. AI has a significant potential to check adherence to current rules and regulations. Large volumes of data can be analysed by machine learning algorithms to look for patterns of probable violations or noncompliance. AI can assist in identifying areas where enforcement efforts should be concentrated by automating the monitoring process, allowing for more effective resource allocation. The Jurident is one such app that may address any judicial database difficulties, and it is useful not only for Indian lawyers but also for regular residents. It is an app that serves as a personal database and record of all cases, a law book that will assist lawyers in finding relevant acts, a live court, and other consumer-related features. By offering consumers tailored information and legalised solutions, Jurident will make their lives easier. By allowing the public access to court records, a database will increase the judicial systems transparency and accountability. By allowing people, legal professionals, and scholars to understand how legal decisions are made, it would promote increased fairness and uniformity in the administration of justice.<br /><br />
                                The database can aid in the advancement of legal research by providing scholars, academics, and decision-makers with access to a variety of data. By giving citizens easily accessible forums to voice their ideas, concerns, and suggestions, AI-powered platforms can promote increased public involvement in the legislative process. Input from the public can be analysed by natural language processing algorithms to find recurring themes and feelings, assisting legislators in comprehending public opinion and incorporating it into decision-making. Additionally, artificial intelligence (AI) can improve transparency by automatically monitoring and analysing legislative processes, making information easily accessible to the public, and enhancing confidence in governmental authority. <br /><br />
                                The effectiveness and efficiency of the legislative process could be greatly increased by artificial intelligence. AI can pave the way for wiser governance by automating research, enabling predictive analysis, facilitating data-driven decision-making, improving the writing of legislation, enhancing compliance monitoring, and encouraging public engagement. It will revolutionize the legislative working of India and will provide equal, fair, and transparent justice to the citizens with efficient working of the system.
                            </p>
                        </div>
                        <div className="space-y-5 lg:ml-60 max-w-[400px]">
                            <div className="rounded-md">
                                <h3 className="text-xl font-bold text-[#A883C5] uppercase">Popular Posts</h3>
                                <div className="border-b border-white my-5 flex flex-row">
                                    <div className='my-3' >
                                        <img src={blog2} alt="blog2" className='w-40 h-28 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover' />
                                    </div>
                                    <div className='my-3 mx-3'>
                                        <h4 className="text-lg font-medium text-[#A883C5] uppercase">Product</h4>
                                        <p className='text-xl'>Meet Jurident: The App that revolutionizes Legal Workflow</p>
                                    </div>
                                </div>
                                <div className="border-b border-white my-5 flex flex-row">
                                    <div className='my-3' >
                                        <img src={blog3} alt="blog2" className='w-40 h-28 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover' />
                                    </div>
                                    <div className='my-3 mx-3'>
                                        <h4 className="text-lg font-medium text-[#A883C5] uppercase">Blogs | Nishita jaiswal</h4>
                                        <p className='text-xl'>AI in the Courtroom: A New Era of Litigation. </p>
                                    </div>
                                </div>
                                <div className="border-b border-white my-5 flex flex-row">
                                    <div className='my-3' >
                                        <img src={blog2} alt="blog2" className='w-40 h-28 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover' />
                                    </div>
                                    <div className='my-3 mx-3'>
                                        <h4 className="text-lg font-medium text-[#A883C5] uppercase">Blogs | akshat singh</h4>
                                        <p className='text-xl'>The benefits of implementing a National Legal Case Database </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-center rounded-none">
                                <div className="flex flex-col items-center px-10 py-8 w-full rounded bg-[#A883C5]">
                                    <h2 className="text-2xl leading-9 bg-[#A883C5] text-[#060125]">Get More Done Together With US</h2>
                                    <p className="self-stretch mt-4 text-xl leading-8 bg-[#A883C5] text-[#060125]">
                                        Energize Your Software Solutions with our comprehensive range of services.
                                    </p>
                                    <button className={` mt-14 py-3 pr-7 pl-8 max-w-full text-base leading-none bg-[#DEEBFF] rounded border-2 border-solid text-[#091E42] w-[162px]`}> Get Started
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default memo(Blog)

