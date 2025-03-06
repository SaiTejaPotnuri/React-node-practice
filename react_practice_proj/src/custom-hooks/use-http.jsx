import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = (baseURL = 'https://react-practice-01-832c4-default-rtdb.firebaseio.com') => {
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
    async (endpoint) => sendRequest({ url: `${endpoint}.json`, method: 'GET' }),
    [sendRequest]
  );

  const createData = useCallback(
    async (endpoint, data) => sendRequest({ url: `${endpoint}.json`, method: 'POST', data }),
    [sendRequest]
  );

  const updateData = useCallback(
    async (endpoint, id, data) => sendRequest({ url: `${endpoint}/${id}.json`, method: 'PUT', data }),
    [sendRequest]
  );

  const deleteData = useCallback(
    async (endpoint, id) => sendRequest({ url: `${endpoint}/${id}.json`, method: 'DELETE' }),
    [sendRequest]
  );

  return {
    loading,
    error,
    fetchData,
    createData,
    updateData,
    deleteData,
  };
};

export default useHttp;