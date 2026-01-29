import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import technicianService from '../../Services/technicianService';
import AddService from './AddService';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddService, setShowAddService] = useState(false);

  useEffect(() => {
    console.log('MyServices component mounted, fetching services...');
    fetchMyServices();
  }, []);

  const fetchMyServices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching my services...');
      const servicesData = await technicianService.getMyServices();
      console.log('Services fetched:', servicesData);
      console.log('Services array length:', servicesData?.length || 0);
      setServices(servicesData || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      console.error('Error response:', error.response);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await technicianService.deleteService(serviceId);
        setServices(services.filter(service => service._id !== serviceId));
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const handleToggleStatus = async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus ? 'inactive' : 'active';
      await technicianService.updateServiceStatus(serviceId, newStatus);
      setServices(services.map(service => 
        service._id === serviceId 
          ? { ...service, isActive: !currentStatus }
          : service
      ));
    } catch (error) {
      console.error('Error updating service status:', error);
      alert('Failed to update service status');
    }
  };

  console.log('Rendering MyServices, loading:', loading, 'error:', error, 'services count:', services.length);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fixhub-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-fixhub-danger">{error}</p>
          <button 
            onClick={fetchMyServices}
            className="mt-4 bg-fixhub-primary text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">My Services</h1>
          <p className="text-fixhub-textMuted">Manage and view all your created services</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchMyServices}
            className="bg-fixhub-secondary hover:bg-fixhub-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button
            onClick={() => setShowAddService(true)}
            className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Service
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-fixhub-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">{services.length}</p>
              <p className="text-fixhub-textMuted">Total Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-fixhub-success rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">
                {services.filter(s => s.isActive).length}
              </p>
              <p className="text-fixhub-textMuted">Active Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-fixhub-accent rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">
                ₹{services.reduce((total, service) => total + (service.serviceCharge || 0), 0).toLocaleString()}
              </p>
              <p className="text-fixhub-textMuted">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-4">
        <p className="text-sm text-fixhub-textMuted">Total Services: {services.length}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-fixhub-textDark mb-2">
                    {service.serviceName}
                  </h3>
                  <p className="text-fixhub-textMuted text-sm mb-3">
                    {service.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.isActive 
                    ? 'bg-fixhub-mint text-fixhub-success' 
                    : 'bg-fixhub-borderSoft text-fixhub-textMuted'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-fixhub-textMuted">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {service.serviceName}
                </div>
                <div className="flex items-center text-sm text-fixhub-textMuted">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  ₹{service.serviceCharge}
                </div>
                <div className="flex items-center text-sm text-fixhub-textMuted">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.experience}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(service._id, service.isActive)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    service.isActive
                      ? 'bg-fixhub-borderSoft text-fixhub-textMuted hover:bg-fixhub-textMuted hover:text-white'
                      : 'bg-fixhub-success text-white hover:bg-fixhub-successDark'
                  }`}
                >
                  {service.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="px-3 py-2 bg-fixhub-danger hover:bg-fixhub-dangerDark text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No Services Found</h3>
            <p className="text-fixhub-textMuted mb-4">
              {loading ? 'Loading services...' : 'No services created yet. Create your first service to get started.'}
            </p>
            <button
              onClick={() => setShowAddService(true)}
              className="bg-fixhub-primary hover:bg-fixhub-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Service
            </button>
          </div>
        )}
      </div>

  

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AddService 
            onClose={() => setShowAddService(false)} 
            onServiceAdded={() => {
              setShowAddService(false);
              fetchMyServices(); // Refresh services list
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyServices;