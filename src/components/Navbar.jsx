import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context";


const Navbar = () => {
  const {search , setSearch , handleSubmit} = useContext(GlobalContext);
  console.log(search)

    return (
      <nav className="flex justify-between items-center p-4 bg-gray-950 text-white shadow-lg">
        {/* Logo */}
        <NavLink to={'/'}>
          <h1 className="text-2xl font-bold tracking-wide">MyLogo</h1>
        </NavLink>
        
        {/* Search Box */}
        <div className="relative w-1/3">
          <input 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            type="text" 
            placeholder="Search Recipe..." 
            className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span onClick={() => handleSubmit()} className="absolute right-3 top-2.5 cursor-pointer text-gray-400">
            🔍
          </span>
        </div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li><NavLink to="/Favourites" className="hover:text-blue-400 transition">Favourites</NavLink></li>
          <li><NavLink to="/" className="hover:text-blue-400 transition">Home</NavLink></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;