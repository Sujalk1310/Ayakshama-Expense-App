import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "./AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { getAPI } from "../axiosUrls";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import HorizontalNav from "./HorizontalNav";
import Expense from './Expense';
import Savings from './Savings';
import CategoriesPage from './CategoriesPage';
import {useRoutes } from "react-router-dom";
import ChatBot from './ChatBot';  
import ChatbotFull from './ChatbotFull';

function Dashboard() {
  const { token, loading } = useContext(AuthContext);
  const [windowSize, setWindowSize] = useState([window.innerWidth, (window.innerWidth < 800) ? true : false]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const routes = [
    {
      path: '',
      element: <Expense />,
    },
    {
      path: 'expense',
      element: <Expense />,
    },
    {
      path: 'savings',
      element: <Savings />
    },
    {
      path: 'categories',
      element: <CategoriesPage />
    },
    {
      path: 'chatbot',
      element: <ChatbotFull mobile={windowSize[1]} />
    },
    {
      path: "*",
      element: <Navigate to='/dashboard' />
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI('/test');
      } catch (error) {
        if (error.statusCode === 401) navigate('/');
      }
    };

    fetchData();

    const handleWindowResize = () => {
      var mobile = false
      if (window.innerWidth <= 800) mobile = true;
      else setToggle(false);
      setWindowSize([window.innerWidth, mobile]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [navigate]);

  const element = useRoutes(routes);

  if (loading) return null;
  if (!token) navigate('/');

  return (
    <div className="overflow-hidden flex" style={{ height: "100vh" }}>
      { windowSize[1] ? <Sidebar mobile={windowSize[1]} toggle={toggle} setToggle={setToggle} /> : <></>}
        <div id="mainboard" className='flex-grow-1 d-flex flex-column'>
          { windowSize[1] ? <></> : <HorizontalNav /> }
          <nav id="nav" className={`w-100 fixed z-50 ${windowSize[1] ? "d-flex align-items-center" : "d-none"}`}>
            <button className="text-white btn d-flex align-items-center"
              style={{ borderRadius: "0" }}
              onClick={() => { if (windowSize[1]) setToggle(!toggle)}}>
              <GiHamburgerMenu />
            </button>
            <span className="vr text-white"></span>
            <span className='mx-3 text-white d-flex flex-grow-1 justify-content-between align-items-center'>
              <span className="text-sm">Laabh - Aapka Apna Budget App</span>
            </span>
          </nav>
          <div id="whiteboard" className={windowSize[1] ? 'h-100 d-flex pt-4 flex-column position-relative' : 'h-100 d-flex flex-column position-relative'}>
            {element}
          </div>
          <ChatBot />
        </div>
    </div>
  );
}

export default Dashboard;