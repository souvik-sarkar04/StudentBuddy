import React, { useState, useEffect } from 'react';
import pic from "./pic.jpg";

export default function Leaderboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData] = useState([...Array(10)].map((_, i) => ({ id: `id-${i + 1}`, points: (i + 1) * 10 })));
  const [userRank] = useState(5); 
  const [userPoints] = useState(50); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuIcon = document.querySelector('.menu-icon');
      const dropdownMenu = document.querySelector('.dropdown-menu');

      if (
        dropdownMenu &&
        !menuIcon.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-700 min-h-screen text-white flex flex-col items-center">
      <nav className="w-full bg-gradient-to-r from-amber-200 to-yellow-500 flex items-center justify-between p-4 shadow-lg">
        <div className="menu">
          <i
            className="fa-solid fa-bars text-3xl cursor-pointer text-gray-700 menu-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="w-40 md:w-96 h-11 rounded-lg px-4 text-gray-700 focus:ring-2 focus:ring-yellow-400"
            type="search"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass text-xl cursor-pointer text-gray-700 hover:text-blue-400"></i>
        </div>
        <div className="rounded-full overflow-hidden w-12 h-12 cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:rotate-6 shadow-md">
          <a href="profile.html">
            <img src={pic} alt="Profile" className="w-full h-full object-cover" />
          </a>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="dropdown-menu absolute top-20 left-4 bg-white rounded-lg shadow-lg w-48 opacity-95 z-10 transition-opacity duration-300">
          <ul className="p-2 text-gray-700">
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Dashboard</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Your Profile</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Aura Points</a></li>
          </ul>
        </div>
      )}

      <div className="bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg mt-10 p-6 w-11/12 md:w-3/4 lg:w-1/2 overflow-y-auto max-h-[600px]">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Leaderboard</h2>

        <div className="flex justify-between text-xl font-bold text-gray-700 border-b-2 pb-2">
          <span>Rank</span>
          <span>Student ID</span>
          <span>Aura Points</span>
        </div>

        {leaderboardData
          .filter((entry) => entry.id.includes(searchQuery))
          .map((entry, index) => (
            <div className="flex justify-between items-center text-lg text-gray-800 border-b py-2" key={entry.id}>
              <span>{index + 1}</span>
              <span>{entry.id}</span>
              <span>{entry.points}</span>
            </div>
          ))}

        <div className="flex justify-between items-center text-lg font-semibold text-gray-800 py-2 bg-gray-200 rounded-lg my-2 px-2">
          <span>Your Rank</span>
          <span>id-{userRank}</span>
          <span>{userPoints} Points</span>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline">View more</a>
        </div>
      </div>
    </div>
  );
}