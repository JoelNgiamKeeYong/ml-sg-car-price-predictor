from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Specify the templates directory inside the app directory
app = Flask(__name__)

# Load the trained model
model = joblib.load('./models/model.pkl')

# Route to display the UI (Homepage)
@app.route('/')
def home():
    return "This is a Flask app for deploying a ml model for API use."

# Route to handle the prediction API
@app.route('/predict', methods=['POST'])
def predict():
    # Extract JSON data from the request
    data = request.get_json(force=True)
    
    # Convert the input data into a pandas DataFrame
    features = data['features']
    
    # Create a DataFrame with the correct column names and order
    input_data = pd.DataFrame([features], columns=[
        'Brand', 'Type', 'Reg_year', 'Reg_month', 'Days_since_registration',
        'Coe_left', 'Depreciation', 'Mileage', 'Road_Tax', 'Dereg_Value',
        'COE', 'Engine_Capacity', 'Curb_Weight', 'Manufactured', 'Transmission',
        'OMV', 'ARF', 'Power', 'Number_of_Owners'
    ])
    
    # Make prediction
    prediction = model.predict(input_data)
    
    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)