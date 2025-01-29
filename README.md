# Used Car Price Prediction: Machine Learning Solution

### 🚀 **Business Scenario**

The used car market in Singapore is unique due to various factors like land constraints, a controlled car population through policies such as the Certificate of Entitlement (COE), and fluctuating car prices influenced by variables such as brand, mileage, engine capacity, and more. As a result, predicting the price of a used car in this market requires a machine learning model that accurately accounts for these dynamic factors, providing both buyers and sellers with a reliable pricing tool.

---

### 🧠 **Business Problem**

Predicting the price of a used car is a complex challenge due to the many factors involved. The goal is to build a machine learning model capable of predicting the price of a used car based on key features like `Brand`, `Engine Capacity`, and `Power`.

The ultimate aim is to offer a transparent and competitive pricing system that can be used by car dealerships and individual sellers alike to price their cars accurately in the market.

---

### 🛠️ **Solution Approach**

This project follows a systematic machine learning workflow, incorporating the following steps:

1. **Data Collection and Preprocessing**

   - **Data Exploration**: I explored the relationships between features and the target variable (Price). I also inspected missing values, outliers, and distributions.
   - **Feature Engineering**: Some examples include converting **Reg_date** into years and months and reducing the number of car brands.
   - **Handling Missing Data**: I imputed or removed rows with missing critical features such as **Price**.
   - **Data Splitting**: I divided the data into training (80%) and testing (20%) sets for model evaluation.

2. **Model Building**

   - **Algorithm Selection**: I chose **XGBoost**, a powerful gradient boosting algorithm known for its high accuracy and ability to handle complex, non-linear relationships, which works well for this dataset.
   - **Preprocessing Pipeline**:
     - Normalized numerical features (e.g., **Mileage**, **Engine Capacity**, **Power**).
     - One-hot encoded categorical features (e.g., **Brand**, **Transmission**).
   - **Training**: The model was trained using cross-validation to ensure generalizability and prevent overfitting.

3. **Model Evaluation**
   - **Metrics Used**:
     - **Mean Absolute Error (MAE)**: Average difference between predicted and actual prices.
     - **Mean Squared Error (MSE)**: Squared difference between predicted and actual prices.
     - **R-squared (R²)**: Measures the explanatory power of the model.
     - **Residual Plot**: Visualized errors to detect any patterns.
   - I evaluated how well the model generalizes to unseen data to ensure its real-world reliability.

---

### 📊 **Model Performance**

- **Mean Squared Error (MSE)**: 65184978.32
- **Root Mean Squared Error (RMSE)**: 8073.72
- **Range of y_test**: 821000.00
- **Mean of y_test**: 98857.37
- **RMSE as a percentage of range**: 0.98%
- **RMSE as a percentage of mean**: 8.17%

These metrics show that while the model performs reasonably well in predicting used car prices, there is room for improvement. The **RMSE** of 8073.72 represents the average prediction error, and considering the range of prices (821,000.00), the error is about 0.98% of the total range, which is quite acceptable. When compared to the mean price of the cars (98,857.37), the RMSE accounts for 8.17% of that value, indicating a reasonable level of accuracy but still with some potential for fine-tuning.

---

### ⚠️ **Limitations**

While the model provides valuable predictions, there are several limitations:

1. **Limited Features**:
   - The model is currently based on a subset of features. Key factors like **car condition**, **previous accidents**, and **market demand** are not included in the dataset, which could lead to less accurate predictions in specific market conditions.
2. **Model Overfitting**:
   - Despite efforts to prevent overfitting using cross-validation, there’s always a risk that the model could overfit to the training data, especially when dealing with noisy or incomplete data.
3. **Limited Dataset**:
   - The model's performance might be constrained by the size and diversity of the dataset. A larger, more diverse dataset would help in improving generalization and better capturing complex market dynamics.
4. **COE Influence**:
   - The model currently does not factor in fluctuations in the Certificate of Entitlement (COE), which is a key determinant of used car prices in Singapore. Including real-time COE data would enhance the accuracy of the price predictions.

---

### 🧠 **Key Skills Demonstrated**

This project showcases the following key machine learning and data science skills:

1. **Data Exploration and Preprocessing**:
   - Explored and cleaned the data, visualizing relationships and detecting patterns using **Matplotlib** and **Seaborn**.
2. **Model Development**:
   - Developed a predictive model using **XGBoost** to forecast car prices.
   - Built a preprocessing pipeline to handle both numerical and categorical data.
3. **Model Evaluation**:
   - Evaluated model performance using multiple regression metrics and visualization techniques.
4. **Model Deployment**:
   - Deployed the trained model via **Flask** and hosted it on **Heroku** for real-time predictions.
   - Integrated the model with a **Next.js frontend**, allowing users to interact with it seamlessly.

---

### 🛠️ **Technical Tools and Libraries**

- **Python**: For programming and implementing machine learning models.
- **Pandas**: Data manipulation and exploration.
- **NumPy**: Numerical operations.
- **XGBoost**: Machine learning algorithm for regression tasks.
- **Scikit-learn**: Machine learning algorithms and evaluation metrics.
- **Matplotlib/Seaborn**: Data visualization and plotting.
- **Joblib**: For saving and loading machine learning models.
- **Jupyter Notebooks**: For interactive analysis and documentation.

---

### 📂 **Files and Directories**

The project is structured as follows:

- **backend/**: Contains the Flask app and Jupyter notebooks for model creation. Also stores the datasets and trained **XGBoost** model.
- **frontend/**: Next.js frontend for user interaction.

---

### 🎯 **Conclusion**

This project demonstrates my ability to create a complete machine learning solution for predicting used car prices. By applying data exploration, feature engineering, and machine learning techniques, I built a model that accurately predicts car prices based on key features. This solution is practical for real-world applications and can be deployed in various platforms to assist both buyers and sellers in the used car market.

The model's performance is highlighted by the following error metrics:

- **Mean Squared Error (MSE)**: 65184978.32, which indicates the average squared difference between the predicted and actual prices. This relatively large value suggests that while the model performs well, there is still room for improvement in terms of accuracy.
- **Root Mean Squared Error (RMSE)**: 8073.72, a measure of the average prediction error in the same units as the target variable (price). Given that the range of the car prices in the test set is 821000.00, the RMSE as a percentage of the range is 0.98%, showing that the model’s predictions are fairly close to actual values, but there is potential for refinement.
- **RMSE as a percentage of mean**: 8.17%, which indicates that the error is around 8% of the average price in the dataset, a reasonable margin of error in this type of prediction.

These metrics suggest that the model performs reasonably well in predicting used car prices, but further fine-tuning and feature expansion could help reduce the error and improve accuracy. The results provide a solid foundation for a real-world car pricing tool that can assist dealerships and individual sellers alike in setting competitive prices.

The machine learning model provides an automated and transparent car pricing system that can help:

- **Estimate Fair Car Prices**: Predict prices based on real-time data and car features.
- **Assist Dealerships**: Enable car dealerships to price their used cars competitively.
- **Provide Transparency**: Help buyers and sellers understand how prices are determined based on factors like mileage, brand, and COE left.
- **Increase Efficiency**: Automate the pricing process, reducing manual effort and human error.

---
