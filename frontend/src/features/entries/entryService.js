import axios from 'axios';

const API_URL = '/api/entries';

const fetchEntries = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const createEntry = async (entryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, entryData, config);
  return response.data;
};

const entryService = {
  fetchEntries,
  createEntry,
};

export default entryService;
