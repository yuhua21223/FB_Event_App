// const API_ENDPOINT = '/v2.8/official_events';

// export const createEvent = async (eventData) => {
//     const response = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//     });

//     if (!response.ok) {
//         const { error } = await response.json();
//         throw new Error(error.message || 'Something went wrong');
//     }

//     return await response.json();
// };

/**
 * Creates an official event on Facebook.
 *
 * @param {Object} eventData - Data for the event you wish to create.
 * @returns {Object} - Response data from the API.
 */
export const createEvent = async (eventData) => {
    // Endpoint for the Official Events API
    const ENDPOINT = `${BASE_URL}/official_events`;

    // Structure the request payload based on the provided documentation
    const payload = {
        access_token: ACCESS_TOKEN,
        name: eventData.name,
        description: eventData.description,
        place_id: eventData.place_id,
        category: eventData.category,
        timezone: eventData.timezone,
        start_time: eventData.start_time
    };

    // Optionally add the cover photo information if provided
    if (eventData.cover) {
        payload.cover = {
            source: eventData.cover.source,
            offset_x: eventData.cover.offset_x || 0,  // default to 0 if not provided
            offset_y: eventData.cover.offset_y || 0   // default to 0 if not provided
        };
    }

    // Optionally add roles if provided
    if (eventData.roles) {
        payload.roles = eventData.roles;
    }

    try {
        const response = await axios.post(ENDPOINT, payload);
        return response.data;
    } catch (error) {
        // Handle the error and throw a more user-friendly message
        throw new Error(handleError(error));
    }
};

