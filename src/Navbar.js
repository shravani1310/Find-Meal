import './App.css';
import { useState } from "react"; 
import { NavLink, useNavigate } from 'react-router-dom'; 
export const Navbar=()=>{
    const [searchTerm, setSearchTerm] = useState('');
    const navigate=useNavigate()
    const handleSearchSubmit=(e)=>{
        e.preventDefault(); 
        navigate('/CardDefault', { state: { searchTerm }})
    }
    return(
        <nav className="nav-bar">
            <h1>Find Meal</h1>
            <ul>
                <li> <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                <li><NavLink to ="/CardDefault" className={({ isActive }) => (isActive ? "active" : "")} >Recipes</NavLink></li>
                <li><NavLink to ="/" className={({ isActive }) => (isActive ? "active" : "")} >About</NavLink></li>
                <li> <form onSubmit={handleSearchSubmit}>  
                    <input 
        type="text" 
        className="search-box" 
        placeholder="Search recipes..." 
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value)}}
      /></form>
      </li>
            </ul>
        </nav>
    );
}
