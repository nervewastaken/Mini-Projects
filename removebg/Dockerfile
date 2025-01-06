# Use the official Python 3.11 image from the Docker Hub
FROM python:3.11-slim

# Set the environment variable for U2NET model
ENV U2NET_HOME=/home/.u2net

# Create the directory for the model and copy it
RUN mkdir -p /home/.u2net
COPY u2net.onnx /home/.u2net/u2net.onnx

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
