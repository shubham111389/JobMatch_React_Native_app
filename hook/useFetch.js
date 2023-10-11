import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios only once

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`, // Corrected URL
    headers: {
        'X-RapidAPI-Key': 'c9581b1b95msh7eb3dc1d5b22090p182141jsn6a5d5b7b9539',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
