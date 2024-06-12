import React, {memo} from 'react'
import {  Link, NavLink, useNavigate } from 'react-router-dom'
import "./Sidebar.scss"
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { FaChevronCircleLeft } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate()
    const handleLogOut = ()=>{
        localStorage.clear()
        navigate("/")
    }
  return (
    <div className='sidebar'>
        
        <h2 className='sidebar__logo'>
          <Link to={"/"}><FaArrowAltCircleLeft/></Link>
          <span>Dashboard</span>
        </h2>
        <ul className="sidebar__collection">
          <li className="sidebar__item">
            <NavLink className={"sidebar__link"} to={"create"}>
              <IoCreateOutline />
              <span>Create Product</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className={"sidebar__link"} to={"manage"}>
              <IoCreateOutline />
              <span>Manage Product</span>
            </NavLink>
          </li>
   
        </ul>
        <button className="log-button" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default memo(Sidebar)