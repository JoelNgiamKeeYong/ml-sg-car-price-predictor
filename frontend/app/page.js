"use client";

import { useState } from 'react';

export default function Home() {
  const [carData, setCarData] = useState({
    brand: 'Toyota',  // Default brand
    type: 'Sedan',    // Default type
    regYear: 2020,    // Default registration year
    regMonth: 5,      // Default registration month
    daysSinceRegistration: 1000, // Default days since registration
    coeLeft: 24,      // Default COE left (months)
    depreciation: 1000, // Default depreciation
    mileage: 30000,   // Default mileage
    roadTax: 500,     // Default road tax
    deregValue: 25000, // Default deregistration value
    coe: 30000,       // Default COE value
    engineCapacity: 2000, // Default engine capacity (cc)
    curbWeight: 1500, // Default curb weight (kg)
    manufactured: 2019, // Default manufacturing year
    transmission: 'Automatic', // Default transmission type
    omv: 35000,       // Default OMV value
    arf: 10000,       // Default ARF value
    power: 150,       // Default power (hp)
    numberOfOwners: '1', // Default number of owners
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        'https://ml-sg-car-price-predictor-7ab800aa71be.herokuapp.com/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(carData)
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.price); // Assuming your API returns a `price` in the response
      } else {
        alert('Error: Unable to fetch prediction');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Car Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Car Brand"
          value={carData.brand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Car Type"
          value={carData.type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="regYear"
          placeholder="Registration Year"
          value={carData.regYear}
          onChange={handleChange}
        />
        <input
          type="number"
          name="regMonth"
          placeholder="Registration Month"
          value={carData.regMonth}
          onChange={handleChange}
        />
        <input
          type="number"
          name="daysSinceRegistration"
          placeholder="Days Since Registration"
          value={carData.daysSinceRegistration}
          onChange={handleChange}
        />
        <input
          type="number"
          name="coeLeft"
          placeholder="COE Left (Months)"
          value={carData.coeLeft}
          onChange={handleChange}
        />
        <input
          type="number"
          name="depreciation"
          placeholder="Depreciation"
          value={carData.depreciation}
          onChange={handleChange}
        />
        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={carData.mileage}
          onChange={handleChange}
        />
        <input
          type="number"
          name="roadTax"
          placeholder="Road Tax"
          value={carData.roadTax}
          onChange={handleChange}
        />
        <input
          type="number"
          name="deregValue"
          placeholder="Deregistration Value"
          value={carData.deregValue}
          onChange={handleChange}
        />
        <input
          type="number"
          name="coe"
          placeholder="COE"
          value={carData.coe}
          onChange={handleChange}
        />
        <input
          type="number"
          name="engineCapacity"
          placeholder="Engine Capacity"
          value={carData.engineCapacity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="curbWeight"
          placeholder="Curb Weight"
          value={carData.curbWeight}
          onChange={handleChange}
        />
        <input
          type="number"
          name="manufactured"
          placeholder="Manufactured Year"
          value={carData.manufactured}
          onChange={handleChange}
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={carData.transmission}
          onChange={handleChange}
        />
        <input
          type="number"
          name="omv"
          placeholder="OMV"
          value={carData.omv}
          onChange={handleChange}
        />
        <input
          type="number"
          name="arf"
          placeholder="ARF"
          value={carData.arf}
          onChange={handleChange}
        />
        <input
          type="number"
          name="power"
          placeholder="Power"
          value={carData.power}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numberOfOwners"
          placeholder="Number of Owners"
          value={carData.numberOfOwners}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Predict Price'}
        </button>
      </form>

      {prediction && (
        <div>
          <h3>Predicted Price: ${prediction}</h3>
        </div>
      )}
    </div>
  );
}
