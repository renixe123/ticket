// src/VehicleList.js

import React, { useEffect, useState } from 'react';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('');
  const [addingVehicle, setAddingVehicle] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://parking-bill-50022835740.development.catalystappsail.in/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://parking-bill-50022835740.development.catalystappsail.in/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newVehicleName,
          vehicleType: newVehicleType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      const addedVehicle = await response.json();
      setVehicles((prevVehicles) => [...prevVehicles, addedVehicle]);
      setNewVehicleName('');
      setNewVehicleType('');
      setAddingVehicle(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            <strong>Name:</strong> {vehicle.name} <br />
            <strong>Type:</strong> {vehicle.vehicleType}
          </li>
        ))}
      </ul>

      <button onClick={() => setAddingVehicle(!addingVehicle)}>
        {addingVehicle ? 'Cancel' : 'Add Vehicle'}
      </button>

      {addingVehicle && (
        <form onSubmit={handleAddVehicle}>
          <div>
            <label>
              Vehicle Name:
              <input
                type="text"
                value={newVehicleName}
                onChange={(e) => setNewVehicleName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Vehicle Type:
              <input
                type="text"
                value={newVehicleType}
                onChange={(e) => setNewVehicleType(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Add Vehicle</button>
        </form>
      )}
    </div>
  );
};

export default VehicleList;
