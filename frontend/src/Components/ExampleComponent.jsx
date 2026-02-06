import React, { useState, useEffect } from 'react';
import { authAPI, serviceAPI } from '../Services/apiService';

const ExampleComponent = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example: Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getAllServices();
      setServices(response.data);
    } catch (error) {
      } finally {
      setLoading(false);
    }
  };

  // Example: Login function
  const handleLogin = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.data.token);
      } catch (error) {
      }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h2>API Connection Example</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {services.map(service => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExampleComponent;