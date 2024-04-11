# # Use an official Python runtime as a parent image
# FROM python:3.9

# # Set the working directory in the container
# WORKDIR /app

# # Copy the current directory contents into the container at /app
# COPY . /app

# # Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Make port 8000 available to the world outside this container
# EXPOSE 8000

# # Define environment variable
# ENV NAME World

# # Run django app when the container launches
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy the current directory contents into the container at /app
COPY . /app

# Make the wait-for-mysql script executable and move it to a known location
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Use the wait-for-mysql.sh script as the entrypoint
ENTRYPOINT ["/wait-for-mysql.sh", "db", "3306"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

