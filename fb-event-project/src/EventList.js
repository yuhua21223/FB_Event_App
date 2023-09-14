// EventList.js
import React from 'react';

const EventList = ({ events, onSelect }) => {
    return (
        <ul>
            {events.map((event) => (
                <li key={event.id} onClick={() => onSelect(event)}>
                    {event.name}
                </li>
            ))}
        </ul>
    );
};

export default EventList;
