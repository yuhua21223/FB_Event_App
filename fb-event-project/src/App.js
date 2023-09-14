import React, { useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import EventDetails from './EventDetails';
// import { initializePixel } from './pixel';

function App() {
  // Initialize the Facebook Pixel upon component mounting
  // React.useEffect(() => {
  //   initializePixel();
  // }, []);

  // Local state to manage selected event details and list of events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  // Callback function to set the list of events after fetching or any CRUD operations
  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };

  // Callback function to display details of a selected event
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="app-container">
      <h1>Facebook Event API Manager</h1>

      {/* Render the EventForm for creating new events */}
      <EventForm updateEvents={updateEvents} />

      {/* Display list of events and provide a way to select one */}
      <EventList events={events} onEventClick={handleEventClick} />

      {/* Display details of the selected event */}
      {selectedEvent && <EventDetails event={selectedEvent} />}

    </div>
  );
}

export default App;
