import React, { useState, useEffect } from 'react';
import axios from "axios";

export const apiIntegration = (props) => {
    const host = process.env.REACT_APP_API_URL || "http://localhost:3000";
    const HTTP_TYPE = props.type || 'GET';
    const apiURL = props.url;
    const params = props.params || null;
    console.log("host : ",host);
    console.log("HTTP_TYPE : ",HTTP_TYPE);

    console.log("apiURL : ",apiURL);
    console.log("params : ",params);

    const [data,setData] = useState(null);
    const [error,setError] =  useState(null);
    const [loading,setLoading] =  useState(true);

    const fetchData = async () => {
        try {
            let response;
            if(HTTP_TYPE == 'POST'){
                response = await axios.post(`${host}${apiURL}`, {
                    dataParm : params
                })
            }else{
                response = await axios.get(`${host}${apiURL}`);
            }
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

    useEffect(() => {
        
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
    },[apiURL,params,HTTP_TYPE])

    if (loading) {
        console.log("data fetching ...");
    }

  return {data, loading, error};
}
