import React, { useEffect, useState } from 'react';
// import pic from "./pic.jpg"
export default function ChallengePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [challenges, setChallenges] = useState([
    { name: 'Challenge 1', xp: 50, completed: false },
    { name: 'Challenge 2', xp: 100, completed: false },
    { name: 'Challenge 3', xp: 150, completed: false },
    { name: 'Challenge 4', xp: 200, completed: false },
    { name: 'Challenge 5', xp: 250, completed: false },
    { name: 'Challenge 6', xp: 300, completed: false },
    { name: 'Challenge 7', xp: 350, completed: false },
    { name: 'Challenge 8', xp: 400, completed: false },
    { name: 'Challenge 9', xp: 450, completed: false },
    { name: 'Challenge 10', xp: 500, completed: false },
    { name: 'Challenge 11', xp: 550, completed: false },
    { name: 'Challenge 12', xp: 600, completed: false },
  ]);

  useEffect(() => {
    const updateSummary = () => {
      const completed = challenges.filter(challenge => challenge.completed).length;
      const total = challenges.reduce((acc, challenge) => challenge.completed ? acc + challenge.xp : acc, 0);
      setCompletedCount(completed);
      setTotalXP(total);
    };

    updateSummary();
  }, [challenges]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleCheckboxChange = (index) => {
    const newChallenges = [...challenges];
    newChallenges[index].completed = !newChallenges[index].completed;
    setChallenges(newChallenges);
  };

  const addChallenge = () => {
    const xpValue = prompt("Enter XP for the new challenge:");
    if (xpValue && !isNaN(xpValue)) {
      const newChallenge = { name: 'New Challenge', xp: parseInt(xpValue), completed: false };
      setChallenges([...challenges, newChallenge]);
    } else {
      alert("Please enter a valid number for XP.");
    }
  };


  return (
    <div className="bg-neutral-800 min-h-screen flex flex-col" >
      <nav className="bg-zinc-500 flex justify-between items-center p-4">
        <div className="flex items-center">
          <i className="fa-solid fa-bars menu-icon text-3xl cursor-pointer" onClick={toggleMenu}></i>
        </div>
        <h1 className="text-5xl font-bold">Your Challenges</h1>
        <div className="flex items-center">
          <img 
          // src={pic}
           alt="Profile-Picture" className="w-24 h-24 rounded-full transition-transform duration-300 transform hover:scale-110 cursor-pointer" />
          {isMenuOpen && (
            <div className="absolute top-12   left-12 mt-1 bg-white rounded-md shadow-lg z-10">
              <ul className="p-2">
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Dashboard</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Your Profile</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-100">Aura Points</a></li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-1 ">
        <aside className="bg-gray-300 overflow-y-scroll rounded-md   border-2 border-black h-[500px] w-48 mt-8 p-4"  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <h2 className="font-bold text-lg ">Challenges-bar</h2>
          <hr />
          {challenges.map((challenge, index) => (
            <div key={index} className="py-2">
              <a href="#" className="text-lg hover:bg-gray-100" >{challenge.name}</a>
            </div>
          ))}
        </aside>

        <main className="flex-1 p-4 mt-4 rounded-md">
          <table className="min-w-full border-collapse bg-white shadow-md">
            <thead>
              <tr>
                <th className="border font-bold text-lg bg-[#4CAF50] px-4 py-2">Challenges</th>
                <th className="border font-bold text-lg bg-[#4CAF50] px-4 py-2">AURA XP's</th>
                <th className="border font-bold text-lg bg-[#4CAF50] h-[40px] px-4 py-2">Completed</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge, index) => (
                <tr key={index}>
                  <td className="border px-4 py-4 font-medium">{challenge.name}</td>
                  <td className="border px-4 py-4">{challenge.xp}</td>
                  <td className="border px-4 py-4">
                    <input
                      type="checkbox"
                      className="challenge-checkbox scale-150 ml-12 font-semibold"
                      checked={challenge.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <button onClick={addChallenge} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add Challenges</button>
          </div>

          <div className="mt-4 text-white">
            <p className='font-bold text-lg mt-6'>Number of Challenges Completed: <span id="completed-count">{completedCount}</span></p>
            <p className='font-bold text-lg mt-4'>Total XP Collected: <span id="total-xp">{totalXP}</span></p>
          </div>
        </main>

        <aside className="bg-gray-300 border-2 overflow-y-auto mt-8 rounded-md h-[550px] border-black w-64 p-4"  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <h2 className="font-bold text-lg mb-4">Rules To get Aura XP</h2>
          <hr />
          <div className="rule">1......</div>
        </aside>
      </div>
    </div>
  );
}
