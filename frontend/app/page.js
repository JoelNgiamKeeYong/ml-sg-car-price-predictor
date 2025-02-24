"use client";

import { useState, useEffect } from "react";

// Assuming the brands are either imported statically or fetched from an API
import { types } from "@/data/types";  // This file contains car types like 'Sedan', 'SUV', etc.
import { transmission } from "@/data/transmission";
import { brands } from "@/data/brands";  // Static import of car brands (or use dynamic fetching)
import { owners } from "@/data/owners";

export default function Home() {
  const [carData, setCarData] = useState({
    Brand: brands[0],
    Type: types[0],
    Reg_year: 2020,
    Coe_left: 365,
    Depreciation: 10000,
    Mileage: 300000,
    Dereg_Value: 25000,
    COE: 30000,
    Engine_Capacity: 3000,
    Curb_Weight: 1500,
    Manufactured: 2019,
    Transmission: transmission[0],
    OMV: 100000,
    Power: 300,
    Number_of_Owners: owners[0],
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invalidFields, setInvalidFields] = useState({});

  const fieldDescriptions = {
    Brand: "The make or brand of the car, such as Toyota, Honda, BMW, etc.",
    Type: "The model or variant of the car, e.g., Sedan, SUV, Coupe, etc.",
    Reg_year: "The year the car was first registered in Singapore, which may affect COE and road tax. (Min: 1969, Max: 2022)",
    Coe_left: "The remaining duration (in days) of the car's COE (Certificate of Entitlement), which is required for all cars in Singapore. (Min: 3, Max 3,640)",
    Depreciation: "The estimated depreciation in the car's value over the last year, influenced by factors such as age and mileage. (Min: 4,900, Max 313,020)",
    Mileage: "The total distance driven by the car, measured in kilometers, which is an important factor for determining wear and tear. (Min: 18, Max 610,000)",
    Dereg_Value: "The estimated value of the car when it is de-registered, based on factors such as age and COE rebate. (Min: 4,036, Max 629,526)",
    COE: "The COE (Certificate of Entitlement) price, which is a significant cost in car ownership in Singapore, allowing the owner to use the car for a set period. (Min: 8,000, Max 97,889)",
    Engine_Capacity: "The car’s engine size, measured in cubic centimeters (cc), which affects road tax rates and COE eligibility. (Min: 658, Max 6,752)",
    Curb_Weight: "The weight of the car in its unladen state (with no passengers or cargo), which affects fuel efficiency and road tax. (Min: 806, Max 2,760)",
    Manufactured: "The year the car was manufactured, which helps determine the car’s age and potential depreciation. (Min: 2005, Max 2021)",
    Transmission: "The type of transmission system in the car, such as Automatic or Manual, which can influence driving experience and value.",
    OMV: "The Open Market Value (OMV) of the car, which is the amount the car is valued at when it enters Singapore. (Min: 5,588, Max 492,350)",
    Power: "The car's engine power, typically measured in horsepower (hp), which can impact the car’s performance and road tax. (Min: 40, Max 530)",
    Number_of_Owners: "The number of previous owners of the car, which can affect the car’s value and perceived condition.",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle non-numeric fields (e.g., dropdowns)
    if (isNaN(value)) {
      setCarData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Remove validation error for non-numeric fields
      setInvalidFields((prev) => {
        const newInvalidFields = { ...prev };
        delete newInvalidFields[name];
        return newInvalidFields;
      });
    } else {
      // Handle numeric fields (e.g., inputs for year, depreciation)
      const numericValue = parseFloat(value);
      const minValue = e.target.min ? parseFloat(e.target.min) : -Infinity;
      const maxValue = e.target.max ? parseFloat(e.target.max) : Infinity;

      if (numericValue < minValue || numericValue > maxValue) {
        setCarData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        setInvalidFields((prev) => {
          const newInvalidFields = { ...prev };
          newInvalidFields[name] = true;
          return newInvalidFields;
        });
      } else {
        setCarData((prevData) => ({
          ...prevData,
          [name]: value, // Update state when value is within bounds
        }));

        setInvalidFields((prev) => {
          const newInvalidFields = { ...prev };
          delete newInvalidFields[name];
          return newInvalidFields;
        });
      }
    }
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

  // GitHub profile URL (replace with your actual GitHub profile link)
  const githubUrl = "https://github.com/JoelNgiamKeeYong/ml-sg-car-price-predictor";

  return (
    <div className="container">

      <div className="bg-primary p-8 pt-6 pb-6 pl-12 pr-12 text-center rounded-lg mb-8">

        <div class="bg-primary p-8 pt-6 pb-6 pl-12 pr-12 text-center rounded-lg mb-8">
          <div class="header-container">
            <h1 class="title">Singapore Car Price Prediction</h1>
            <div class="author-container">
              <p class="custom-text italic">By Joel Ngiam Kee Yong</p>

            </div>
          </div>
        </div>

        <div class="link-container">
          <p class="link-text">See full code</p>
          <a
            href={githubUrl} // GitHub profile URL
            target="_blank" // Open link in a new tab
            rel="noopener noreferrer" // Security best practice for external links
            class="github-link"
            aria-label="Visit my GitHub profile" // Accessibility: Screen reader description
          >
            {/* GitHub SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="github-icon" // Icon size and alignment
              fill="white" // Icon color (inherits from text color)
              aria-hidden="true" // Accessibility: Hide from screen readers (already described by the link)
            >
              {/* GitHub icon path */}
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        <p className="text-white text-m mb-6">
          Due to land constraints, Singapore has a unique car pricing structure where car population is controlled through various policies. This tool utilizes machine learning models trained on a dataset that includes Singapore used car listings for sale, created in May 2021.
        </p>

        <p className="instructions">Fill in the car details to predict the price.</p>





      </div>


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
            {(() => {
              switch (key) {
                case "Brand":
                  return (
                    <select
                      id={key}
                      name={key}
                      value={carData[key]}
                      onChange={handleChange}
                      className={`bg-gray-100 p-4 rounded-lg text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                    >
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  );
                case "Type":
                  return (
                    <select
                      id={key}
                      name={key}
                      value={carData[key]}
                      onChange={handleChange}
                      className={`bg-gray-100 p-4 rounded-lg text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                    >
                      {types.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  );
                case "Reg_year":
                  return (
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
                  );
                case "Coe_left":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="3"
                      max="3640"
                      placeholder="Enter COE Left (years)"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Depreciation":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="4900"
                      max="313020"
                      placeholder="Enter Depreciation"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Mileage":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="18"
                      max="610,000"
                      placeholder="Enter Mileage"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Dereg_Value":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="4036"
                      max="629526"
                      placeholder="Enter Deregistration Value"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "COE":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="8000"
                      max="97889"
                      placeholder="Enter COE Value"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Engine_Capacity":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="658"
                      max="6752"
                      placeholder="Enter Engine Capacity"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Curb_Weight":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="806"
                      max="2760"
                      placeholder="Enter Curb Weight"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Manufactured":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="1969"
                      max="2022"
                      placeholder="Enter Manufacturing Year"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Transmission":
                  return (
                    <select
                      id={key}
                      name={key}
                      value={carData[key]}
                      onChange={handleChange}
                      className={`bg-gray-100 p-4 rounded-lg text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                    >
                      {transmission.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  );
                case "OMV":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="5588"
                      max="492350"
                      placeholder="Enter OMV"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Power":
                  return (
                    <input
                      id={key}
                      type="number"
                      name={key}
                      min="40"
                      max="530"
                      placeholder="Enter Power"
                      value={carData[key]}
                      onChange={handleChange}
                      className={`${invalidFields[key] ? "border-red-500" : "border-gray-300"} p-4 rounded-lg bg-gray-100 text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                      required
                    />
                  );
                case "Number_of_Owners":
                  return (
                    <select
                      id={key}
                      name={key}
                      value={carData[key]}
                      onChange={handleChange}
                      className={`bg-gray-100 p-4 rounded-lg text-lg focus:border-primary-color focus:outline-none transition duration-300`}
                    >
                      {owners.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
        <div className="flex justify-center gap-5 mt-8">
          <button
            type="submit"
            className={`w-full bg-primary-color text-white text-lg font-semibold py-2 rounded-lg ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitDisabled}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      {prediction && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-primary-color">Predicted Price:</h2>
          <div className="price-container">
            <h3 className="price-text">
              <span className="text-primary-color">SGD</span>{" "}
              <span>{new Intl.NumberFormat().format(Math.floor(prediction))}</span>
            </h3>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-8 text-red-500">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
}
