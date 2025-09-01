import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const handleReservationSubmit = (formData) => {
    console.log('Reservation submitted:', formData);
    // In a real app, this would make an API call to submit the reservation
  };

  return (
    <div className="App">
      <Header />
      <main role="main">
        <Hero />
        <div id="reservations">
          <BookingForm onSubmit={handleReservationSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
