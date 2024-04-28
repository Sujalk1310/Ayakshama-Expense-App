import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { postAPI } from '../axiosUrls';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import Logo from '../Images/Logo.png';
import { RiRobot3Fill } from "react-icons/ri";

const Sidebar = ({ mobile, toggle, setToggle }) => {
  const [tab, setTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;

    // Set the tab based on the pathname
    switch(pathname) {
      case '/dashboard':
        setTab('expense');
        break;
      case '/dashboard/expense':
        setTab('expense');
        break;
      case '/dashboard/savings':
        setTab('savings');
        break;
      case '/dashboard/categories':
        setTab('categories');
        break;
      case '/dashboard/chatbot':
        setTab('chatbot');
        break;
      default:
        setTab('');
        break;
    }
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      const response = await postAPI('/logout');
      toast.success(response.message);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      navigate('/');
    }
  }

  const handleTabChange = (tabNo) => {
    setTab(tabNo);
    setToggle(false);
    navigate(tabNo);
  }

  const sidebarStyle = {
    width: '240px',
    height: '100vh',
    zIndex: "999999",
    position: mobile ? "absolute" : "",
    transform: mobile ? (toggle ? "translateX(0px)" : "translateX(-250px)") : "none",
    color: 'white',
    padding: '20px 0 10px 0',
    transition: 'transform 0.3s cubic-bezier(0.215, 0.610, 0.355, 1)',
  };

  return (
    <>
      <div id={mobile ? (toggle ? 'sidebar' : '') : 'sidebar'} className="d-flex flex-column" style={sidebarStyle}> 
        <div className='d-flex flex-column' style={{ height: "100%" }}>
          <img src={Logo} className="align-self-center mb-3" style={{ width: "100px", height: "100px" }} alt="Logo" />
          <h1 className='align-self-center'>Laabh</h1>
          <h6 className='align-self-center mb-5'>Aapka Apna Budget App</h6>
          <div className='d-flex flex-column justify-content-between' style={{ height: "100%" }}>
            <span className='d-flex flex-column'>
              <button className={`${ (tab === 'expense') ? 'active-nav' : '' } nav-butt p-2 flex justify-content-center align-items-center gap-x-3`} onClick={() => handleTabChange('expense')}><FaMoneyBillTransfer /> Expense</button>
              <button className={`${ (tab === 'savings') ? 'active-nav' : '' } nav-butt p-2 flex justify-content-center align-items-center gap-x-3`} onClick={() => handleTabChange('savings')}><FaMoneyBillTrendUp /> Savings</button>
              <button className={`${ (tab === 'categories') ? 'active-nav' : '' } nav-butt p-2 flex justify-content-center align-items-center gap-x-3`} onClick={() => handleTabChange('categories')}><BiSolidCategory /> Categories</button>
              {mobile ? <button className={`${ (tab === 'chatbot') ? 'active-nav' : '' } cnav-butt p-2 flex justify-content-center align-items-center gap-x-3`} onClick={ () => handleTabChange('chatbot') }><RiRobot3Fill /> Chatbot</button> : <></>}
            </span>
            <button className="nav-butt bottom-0 position-relative bg-danger border-4 text-white border-light p-2 px-3 flex justify-content-center align-items-center gap-x-3" onClick={ () => logoutHandler() }><IoLogOut /> Logout</button>
          </div>
          <span onClick={() => {setToggle(false)}} style={{ fontSize: '30px', color: "white", backgroundColor: "transparent", display: toggle ? "block" : "none", position: "absolute", top: "20px", right: "-40px"}}><IoCloseCircleOutline /></span>
        </div>
      </div>  
    </>
  );
};

export default Sidebar;
