"use client";

import { useState } from "react";

export default function Home() {
  const [carData, setCarData] = useState({
    Brand: "Toyota",
    Type: "Sedan",
    Reg_year: 2020,
    Reg_month: 5,
    Days_since_registration: 1000,
    Coe_left: 24,
    Depreciation: 1000,
    Mileage: 30000,
    Road_Tax: 500,
    Dereg_Value: 25000,
    COE: 30000,
    Engine_Capacity: 2000,
    Curb_Weight: 1500,
    Manufactured: 2019,
    Transmission: "Automatic",
    OMV: 35000,
    ARF: 10000,
    Power: 150,
    Number_of_Owners: "1",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invalidFields, setInvalidFields] = useState({});

  const carTypes = [
    "Luxury Sedan", "SUV", "Hatchback", "Mid-Sized Sedan", "Sports Car",
    "MPV", "Van", "Bus/Mini Bus", "Truck", "Stationwagon", "Others"
  ];

  const fieldDescriptions = {
    Brand: "The make or brand of the car, such as Toyota, Honda, BMW, etc.",
    Type: "The model or variant of the car, e.g., Sedan, SUV, Coupe, etc.",
    Reg_year: "The year the car was first registered in Singapore, which may affect COE and road tax.",
    Reg_month: "The month the car was first registered in Singapore, contributing to the remaining COE period.",
    Days_since_registration: "The total number of days that have passed since the car was first registered in Singapore.",
    Coe_left: "The remaining duration (in years) of the car's COE (Certificate of Entitlement), which is required for all cars in Singapore.",
    Depreciation: "The estimated depreciation in the car's value over the last year, influenced by factors such as age and mileage.",
    Mileage: "The total distance driven by the car, measured in kilometers, which is an important factor for determining wear and tear.",
    Road_Tax: "The annual road tax payable for the car, calculated based on its engine capacity and other factors.",
    Dereg_Value: "The estimated value of the car when it is de-registered, based on factors such as age and COE rebate.",
    COE: "The COE (Certificate of Entitlement) price, which is a significant cost in car ownership in Singapore, allowing the owner to use the car for a set period.",
    Engine_Capacity: "The car’s engine size, measured in cubic centimeters (cc), which affects road tax rates and COE eligibility.",
    Curb_Weight: "The weight of the car in its unladen state (with no passengers or cargo), which affects fuel efficiency and road tax.",
    Manufactured: "The year the car was manufactured, which helps determine the car’s age and potential depreciation.",
    Transmission: "The type of transmission system in the car, such as Automatic or Manual, which can influence driving experience and value.",
    OMV: "The Open Market Value (OMV) of the car, which is the amount the car is valued at when it enters Singapore.",
    ARF: "The Additional Registration Fee (ARF) paid when registering a car in Singapore, based on the OMV of the car.",
    Power: "The car's engine power, typically measured in horsepower (hp), which can impact the car’s performance and road tax.",
    Number_of_Owners: "The number of previous owners of the car, which can affect the car’s value and perceived condition.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove validation error when field is updated
    setInvalidFields((prev) => {
      const newInvalidFields = { ...prev };
      if (value !== "") {
        delete newInvalidFields[name];  // remove the error for the updated field
      } else {
        newInvalidFields[name] = true;  // mark the field as invalid again if it's empty
      }
      return newInvalidFields;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate that all fields have a value
    const emptyFields = {};
    Object.keys(carData).forEach((key) => {
      if (!carData[key]) {
        emptyFields[key] = true;
      }
    });

    if (Object.keys(emptyFields).length > 0) {
      setInvalidFields(emptyFields);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ml-sg-car-price-predictor-7ab800aa71be.herokuapp.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ features: carData }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.prediction);
      } else {
        setError("Error: Unable to fetch prediction");
      }
    } catch (error) {
      setError("Error: An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || Object.keys(invalidFields).length > 0;

  const handleKeyPress = (e) => {
    // Only prevent default behavior for Enter key to avoid interfering with typing
    if (e.key === "Enter" && !isSubmitDisabled) {
      e.preventDefault(); // Prevent form submission
      document.activeElement.blur(); // Unfocus input field
      handleSubmit(e); // Submit the form after "Enter" press
    }
  };

  return (
    <div className="container">
      <h1>Car Price Prediction</h1>
      <p className="description">Fill in the car details to predict the price.</p>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
        {Object.keys(carData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key} className="input-label">
              {key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
              {invalidFields[key] && " ❌"}
            </label>
            <p className="description-text">
              {fieldDescriptions[key]}
            </p>
            {key === "Type" ? (
              <select
                id={key}
                name={key}
                value={carData[key]}
                onChange={handleChange}
                className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} bg-gray-100 p-4 rounded-lg text-lg focus:border-primary-color focus:outline-none transition duration-300`}
              >
                {carTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : key === "Reg_year" ? (
              <input
                id={key}
                type="number"
                name={key}
                min="1969"
                max="2022"
                placeholder="Enter Registration Year"
                value={carData[key]}
                onChange={handleChange}
                className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                required
              />
            ) : (
              <input
                id={key}
                type={key.includes("year") || key.includes("month") || key.includes("days") ? "number" : "text"}
                name={key}
                placeholder={`Enter ${key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}`}
                value={carData[key]}
                onChange={handleChange}
                className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                required
              />
            )}
          </div>
        ))}
        <button type="submit" disabled={isSubmitDisabled}>
          {loading ? "Loading..." : "Predict Price"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {prediction !== null && (
        <h3>
          Predicted Price:{" "}
          <span>
            SGD {new Intl.NumberFormat("en-SG").format(Math.round(prediction))}
          </span>
        </h3>
      )}
    </div>
  );
}
