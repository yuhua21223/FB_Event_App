// EventDetails.js
import React from 'react';

const EventDetails = ({ event }) => {
    if (!event) return <div>Select an event to view details</div>;

    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Location: {event.place.name}</p>
            <img src={event.cover.source} alt="Event Cover" />
            {/* Display other details similarly */}
        </div>
    );
};

export default EventDetails;
