// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketForm from './form/TicketForm';
import EventTicket from './Ticket';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Ticket Form */}
          <Route path="/" element={<TicketForm />} />
          
          {/* Route for displaying ticket with ticketId */}
          <Route path="/ticket/:ticketId" element={<EventTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

