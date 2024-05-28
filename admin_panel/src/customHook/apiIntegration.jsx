import React, { useState, useEffect } from 'react';
import axios from "axios";

export const apiIntegration = (props) => {
    const apiURL = process.env.REACT_APP_API_URL;
    console.log("apiURL : ",apiURL);
    const [data,setData] = useState(null);
    const [error,setError] =  useState(null);
    const [loading,setLoading] =  useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(props.url);
              setLoading(false); 
                setData(response.data);
                console.log("data : ", response);
            } catch (error) {
                setLoading(false); 
                setError(error);
                console.error("error : ",error);
            }finally{
                setLoading(false); 
            }
        }
        fetchData();
        // await axios.get(props.url)
        // .then((response) => 
        //     {
        //         setLoading(false); 
        //         setData(response.data);
        //         console.log("data : ", response);
        //     }
        // )
        // .catch((error) => 
        //     {
        //         setLoading(false); 
        //         setError(error);
        //         console.error("error : ",error);
        //     }
        // )
    },[])

    if (loading) {
        console.log("data fetching ...");
    }

  return {data, loading, error};
}
