import { useEffect } from "react";
import { getAPI, postAPI } from "../axiosUrls";
import { useContext } from "react"; 
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Test = () => {
    const { token, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAPI('/categories');
                console.log(response.data)
                // toast.success(response);
            } catch (error) {
                toast.error(error.message);
            }
        };  

        fetchData();
    }, [navigate]);

    if (loading) return null;
    if (!token) navigate('/');

    return <>Testing Page</>;
}

export default Test;
