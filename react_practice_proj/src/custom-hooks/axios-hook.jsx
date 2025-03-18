import { useState, useCallback } from 'react';
import axios from 'axios';

const axiosHook = (baseURL = 'http://localhost:3000/api') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (config) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          baseURL,
          ...config,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (err) {
        if (axios.isCancel(err)) { // Use axios.isCancel for cancel check
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

  const updateData = useCallback(
    async (endpoint, id, data) => sendRequest({ url: `${endpoint}/${id}`, method: 'PUT', data }),
    [sendRequest]
  );

  const deleteData = useCallback(
    async (endpoint, id) => sendRequest({ url: `${endpoint}/${id}`, method: 'DELETE' }),
    [sendRequest]
  );

  return {
    loading,
    error,
    fetchData,
    addNewData,
    updateData,
    deleteData,
  };
};

export default axiosHook;