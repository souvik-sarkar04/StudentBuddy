import { useState, useEffect } from "react";
// import pic from "./pic.jpg";

export default function RewardsPage() {
    const [userInfo, setUserInfo] = useState({
        name: "Vishwajeet Champ",
        // profilePicture: pic,
        rank: 5,
    });
    const [userXP, setUserXP] = useState({
        currentXP: 566,
        totalXP: 1200,
        rank: 5,
    });

    const [coursesAvailable, setCoursesAvailable] = useState(10);
    const [assignmentsData, setAssignmentsData] = useState({ total: 7, completed: 3 });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showXPDetails, setShowXPDetails] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="bg-gradient-to-r from-indigo-300 via-purple-200 to-teal-100 min-h-screen">
            <div className="h-8 bg-gradient-to-r from-indigo-300 via-purple-200 to-teal-100"></div>
            <div className="bg-red-50 mx-12 flex flex-col rounded-md">
                <nav className="bg-gradient-to-r h-24 from-slate-200 via-slate-300 to-gray-400 flex justify-between items-center p-4">
                    <div className="flex items-center">
                        <i className="fa-solid fa-bars menu-icon text-3xl cursor-pointer" onClick={toggleMenu}></i>
                    </div>
                    <h1 className="text-5xl font-bold">Your - Rewards + Progress</h1>
                    <div className="flex items-center mt-6">
                        <img src={userInfo.profilePicture} alt="Profile-Picture" className="w-24 h-24 rounded-full transition-transform duration-300 transform hover:scale-110 cursor-pointer" />
                        {isMenuOpen && (
                            <div className="absolute top-12 left-24 mt-1 bg-white rounded-md shadow-lg z-10">
                                <ul className="p-2">
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Dashboard</a></li>
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Your Profile</a></li>
                                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Aura Points</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
                
                {loading ? (
                    <div className="text-center text-2xl">Loading...</div>
                ) : (
                    <div>
                        <div className="flex justify-center mb-1 items-center h-20 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-gray-400 hover:from-slate-200 hover:to-gray-300">
                            <p className="from-neutral-700 text-5xl mt-6 italic">LEARN , THINK , ACHIEVE</p>
                        </div>

                        <div className="h-64 w-full bg-gradient-to-r from-teal-200 to-blue-300">
                            <div className="flex bg-gradient-to-r from-teal-200 to-blue-300">
                                <p className="font-mono text-4xl mt-4 ml-8">HI, {userInfo.name}</p>
                            </div>
                            <div className="flex justify-around mt-14 ">
                                <div className="hover:bg-teal-100">
                                    <p className="font-semibold text-2xl"><i className="fa-solid fa-award"></i> Your Aura XP's - <br /> &nbsp; &nbsp; {userXP.currentXP}</p>
                                </div>
                                <div className="hover:bg-teal-100">
                                    <p className="font-semibold text-2xl"><i className="fa-solid fa-ranking-star"></i> Your Rank - <br /> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; {userInfo.rank}</p>
                                </div>
                                <div className="hover:bg-teal-100">
                                    <p className="font-semibold text-2xl"><i className="fa-solid fa-circle-check"></i>Courses Completed :  <br /> &nbsp; &nbsp; {assignmentsData.completed}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap ">
                            <div className="h-[300px] w-[400px] ml-[200px] mt-20 bg-gradient-to-r from-purple-400 md:from-yellow-400 rounded-md hover:border-8 hover:border-purple-100">
                                <p className="font-bold text-3xl ml-16 mt-8 mr-6">Available XP's :</p>
                                <p className="ml-28 font-semibold text-2xl mt-6">{userXP.totalXP}</p>

                                <p className="font-bold text-3xl ml-16 mt-8 mr-6">Your's XP's : </p>
                                <p className="ml-28 font-semibold text-2xl mt-6">{userXP.currentXP}</p>
                            </div>
                            <div className="h-80 w-120 ml-60 mt-20 bg-gradient-to-r from-purple-400 md:from-yellow-500 rounded-md hover:border-8 hover:border-red-100">
                                <p className="font-bold text-3xl ml-8 mt-8 mr-6">Total Courses Available : </p>
                                <p className="ml-40 font-semibold text-2xl mt-6">{coursesAvailable}</p>

                                <p className="font-bold text-3xl ml-8 mt-8 mr-6">Total Courses Completed : </p>
                                <p className="ml-40 font-semibold text-2xl mt-6 mr-6">{assignmentsData.completed}</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-[520px] ml-[500px] mt-20 mb-8 mr-[500px] bg-gradient-to-r from-purple-400 md:from-yellow-400 rounded-md hover:border-8 hover:border-amber-200-100">
                            <br />
                            <p className="font-bold text-3xl ml-8 mr-6 mt-8">Total Assignments to be Done :</p>
                            <p className="ml-28 font-semibold text-2xl mt-6">{assignmentsData.total}</p>

                            <br />
                            <p className="font-bold text-3xl ml-8 mt-[16px] mr-6">Total Assignments Completed :</p>
                            <p className="ml-28 font-semibold text-2xl mt-6">{assignmentsData.completed}</p>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                )}
            </div>
            <div className="h-8 bg-gradient-to-r from-indigo-300 via-purple-200 to-teal-100"></div>
        </div>
    );
}
