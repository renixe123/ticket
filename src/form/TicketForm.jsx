import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import './TicketForm.css';
import { MdError } from 'react-icons/md';

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md ErrorText"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <MdError /> {message}
    </motion.p>
  );
};

function TicketForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [formData, setFormData] = useState(null); // Store form data here
  const navigate = useNavigate();

  const postTicketData = async (data) => {
    setLoading(true);
    try {
        const response = await fetch("https://jollywithkkk-50023257188.development.catalystappsail.in/api/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'  // If you need to send cookies
        });

        if (!response.ok) {
            throw new Error('Failed to create ticket');
        }

        const result = await response.json();
        setTicketNumber(result.ticketId);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};

  // Call postTicketData inside useEffect when formData changes
  useEffect(() => {
    if (formData) {
      postTicketData(formData);
    }
  }, [formData]);

  const onSubmit = (data) => {
    // Set formData when the form is submitted
    setFormData(data);
  };

  const handleShowTicket = () => {
    if (ticketNumber) {
      navigate(`/ticket/${ticketNumber}`);
    }
  };

  return (
    <div className="FormContainer">
      <h2 className="Title">Event Ticket Pass</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
            className="Input"
          />
          {errors.name && <InputError message={errors.name.message} />}
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            className="Input"
          />
          {errors.email && <InputError message={errors.email.message} />}
        </div>

        <div className="input-group">
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            })}
            className="Input"
          />
          {errors.phone && <InputError message={errors.phone.message} />}
        </div>

        <button type="submit" className="Button">Get Ticket</button>
      </form>
      {loading && <p className="LoadingText">Loading...</p>}
      {ticketNumber && (
        <button onClick={handleShowTicket} className="Button">Show Ticket</button>
      )}
      <p className="InfoText">Your information is safe with us.</p>
    </div>
  );
}

export default TicketForm;
