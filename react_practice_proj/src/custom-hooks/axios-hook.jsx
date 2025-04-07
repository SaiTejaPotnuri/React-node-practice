import { useState, useCallback } from 'react';
import axios from 'axios';

const axiosHook = (baseURL = import.meta.env.VITE_BACKEND_BASE_URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (config) => {
      setLoading(true);
      setError(null);
  
      try {
        let headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ...config.headers,
        };
  
        if (!(config.data instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }else{
          headers["Content-Type"] = "multipart/form-data";
        }
  
        const response = await axios({
          baseURL,
          ...config,
          headers, 
        });
  
        return response.data;
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseURL]
  );
  
  const fetchData = useCallback(
    async (endpoint) => sendRequest({ url: `${endpoint}`, method: 'GET' }),
    [sendRequest]
  );

  const addNewData = useCallback(
    async (endpoint, data) => sendRequest({ url: `${endpoint}`, method: 'POST', data }),
    [sendRequest]
  );

  const addNewFormData = useCallback(
    async (endpoint, data) => sendRequest({ url: `${endpoint}`, method: 'POST', data }),
    [sendRequest]
  );

  const updateData = useCallback(
    async (endpoint, id, data) => sendRequest({ url: `${endpoint}/${id}`, method: 'PUT', data }) 
    [sendRequest]
  );

  const deleteData = useCallback(
    async (endpoint, id) => sendRequest({ url: `${endpoint}/${id}`, method: 'DELETE' }),
    [sendRequest]
  );
  const verifyTokenInfo = useCallback(
    async (endpoint) => sendRequest({url : `${endpoint}`,method:"GET"}),
    [sendRequest]
  )

  return {
    loading,
    error,
    fetchData,
    addNewData,
    updateData,
    deleteData,
    verifyTokenInfo,
    addNewFormData
  };
};

export default axiosHook;