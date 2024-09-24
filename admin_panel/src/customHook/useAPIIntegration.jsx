import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";

export const useAPIIntegration = () => {
    const host = process.env.REACT_APP_API_URL || "http://localhost:3000/";
    console.log("host : ",host);
    

    const [data,setData] = useState({});
    const [error,setError] =  useState({});
    const [loading,setLoading] =  useState(true);

    const fetchData = useCallback(async (val) => {
        let HTTP_TYPE = val.httpType || 'GET';
        let apiURL = val.apiURL;
        let params = val.params || null;

        console.log("HTTP_TYPE : ",HTTP_TYPE);
        console.log("apiURL : ",apiURL);
        console.log("params : ",params);
        try {
            let response;
            if(HTTP_TYPE == 'POST'){
                response = await axios.post(`${host}${apiURL}`, params, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setLoading(false); 
                setData(response.data);
            }else{
                response = await axios.get(`${host}${apiURL}`);
                
                setData(response.data);
            }
            
            console.log("data : ", response);
        } catch (error) {
            
            setError(error);
            console.error("error : ",error);
        }finally{
            setLoading(false); 
        }
    },[]);


    if (loading) {
        console.log("data fetching ...");
    }

  return {data, loading, error, fetchData};
}
