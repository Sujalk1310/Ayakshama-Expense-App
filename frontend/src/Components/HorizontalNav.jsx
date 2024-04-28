import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAPI } from "../axiosUrls";
import toast from "react-hot-toast";
import { BiSolidCategory } from "react-icons/bi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import Logo from '../Images/Logo.png';

const HorizontalNav = () => {
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
        navigate(tabNo);
    }

    return (
        <div id="HNav" className="d-flex align-items-center justify-content-between p-4">
            <span className="text-white flex justigy-content-center align-items-center gap-x-4" style={{ fontSize: "25px" }}><img src={Logo} style={{ width: "55px", height: "55px" }} alt="Logo" /> Laabh - Today's Saving is Tomorrow's Future</span>
            <div className="d-flex justify-content-center align-items-center">
                <span className="d-flex justify-content-center align-items-center gap-4">
                    <button className={`${ (tab === 'expense') ? 'active' : '' } hnav-butt p-2 px-3 flex justify-content-center align-items-center gap-x-2`} onClick={() => handleTabChange('expense')}><FaMoneyBillTransfer /> Expense</button>
                    <button className={`${ (tab === 'savings') ? 'active' : '' } hnav-butt p-2 px-3 flex justify-content-center align-items-center gap-x-2`} onClick={() => handleTabChange('savings')}><FaMoneyBillTrendUp /> Savings</button>
                    <button className={`${ (tab === 'categories') ? 'active' : '' } hnav-butt p-2 px-3 flex justify-content-center align-items-center gap-x-2`} onClick={() => handleTabChange('categories')}><BiSolidCategory /> Categories</button>
                    <button className="hnav-butt bg-danger border-4 text-white border-light p-2 px-3 flex justify-content-center align-items-center gap-x-2" onClick={ () => logoutHandler() }><IoLogOut /> Logout</button>
                </span>
            </div>
        </div>
    )
}

export default HorizontalNav;
