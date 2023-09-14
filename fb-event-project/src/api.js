import axios from 'axios';

// BASE_URL represents the root endpoint of the Facebook Graph API.
const BASE_URL = 'https://graph.facebook.com/v12.0';

// Your Facebook Access Token goes here. 
// Remember to never expose this directly in client-side code in a real-world scenario.
const ACCESS_TOKEN = 'EAADDZBLODKJUBOwwu7AnkHGXtDDB8CPWm6bMjorVFQwATdkbZAJoZA3UToW6xIYRX8ta28oLHAHDZCbhAh3YWxc09W2avk0t2pZAVq1ViqvB0bVUVZCZAMQSuYfJ1mOIbduxW0Y05q5kmlBwVZApWXX5JQdgJgLfHLVG3c9Rbb5ZAxtke5l8hbeuRVniZA4epFYHRITQvd621G4qz48NdPsAZDZD';

/**
 * Handles errors from the Facebook API, providing more user-friendly messages based on error codes.
 *
 * @param {Object} error - The error object returned from the Axios call.
 * @returns {string} - A user-friendly error message.
 */
const handleError = (error) => {
    // If the error response and data are present, we can interpret it
    if (error.response && error.response.data && error.response.data.error) {
        const fbError = error.response.data.error;

        // Switch based on the error code provided by Facebook
        switch (fbError.code) {
            case 102:
                return 'Session has expired. Please login again.';
            case 190:
                return 'Invalid or expired token. Please refresh your token.';
            // Additional error codes can be added here as needed.
            default:
                // Default to using the error message provided by the Facebook API.
                return fbError.message;
        }
    }
    // Generic error message for unexpected situations.
    return 'An unexpected error occurred. Please try again later.';
};

/**
 * Creates an event on Facebook.
 *
 * @param {Object} eventData - Data for the event you wish to create.
 * @returns {Object} - Response data from the API.
 */
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${BASE_URL}/me/events?access_token=${ACCESS_TOKEN}`, eventData);
        return response.data;
    } catch (error) {
        // Handle the error and throw a more user-friendly message
        throw new Error(handleError(error));
    }
};

/**
 * Reads details of a specific event from Facebook.
 *
 * @param {string} eventId - ID of the event you want to fetch.
 * @returns {Object} - Response data from the API.
 */
export const readEvent = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${eventId}?access_token=${ACCESS_TOKEN}`);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

/**
 * Updates an existing event on Facebook.
 *
 * @param {string} eventId - ID of the event you want to update.
 * @param {Object} eventData - Updated data for the event.
 * @returns {Object} - Response data from the API.
 */
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${eventId}?access_token=${ACCESS_TOKEN}`, eventData);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

/**
 * Deletes an event from Facebook.
 *
 * @param {string} eventId - ID of the event you want to delete.
 * @returns {Object} - Response data from the API.
 */
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${eventId}?access_token=${ACCESS_TOKEN}`);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};
