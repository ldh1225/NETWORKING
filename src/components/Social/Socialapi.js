import axios from 'axios';

export const fetchJobListings = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        throw error;
    }
};