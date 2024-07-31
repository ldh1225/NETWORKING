import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://118.67.143.230:8080/api/external';

export const fetchJobListings = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        throw error;
    }
};