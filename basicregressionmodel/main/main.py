import pandas as pd
from sklearn.linear_model import LinearRegression

data = pd.read_csv("main\q3[1].csv")  

X = data[["Years", "Experience"]]  # Features are Years and Experience
y = data["Salary"]                 # Target variable is Salary

# Create a linear regression model
model = LinearRegression()

# Fit the model to the training data (all data in this case)
model.fit(X, y)

# Print the coefficients (slope and intercept)
print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)

new_data = pd.DataFrame({
  "Years": [8], 
  "Experience": [5] 
})

predicted_salary = model.predict(new_data)[0]



