const API_ENDPOINT = '/v2.8/official_events';

export const createEvent = async (eventData) => {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
};
