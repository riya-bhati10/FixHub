import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../Common/Navbar";
import axiosInstance from "../../Services/axiosInstance";
import { HandleMessageUIError } from "../../utils/toastConfig";

const BookService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showTechnicians, setShowTechnicians] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async (serviceId) => {
    try {
      const response = await axiosInstance.get(
        `/api/technician/by-service/${serviceId}`,
      );
      setTechnicians(response.data);
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }
  };

  const handleServiceSelect = async (service) => {
    setSelectedService(service);
    await fetchTechnicians(service._id);
    setShowTechnicians(true);
  };

  const handleTechnicianSelect = (technician) => {
    setSelectedTechnician(technician);
    setShowTechnicians(false);
    setShowBookingForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        serviceId: selectedService._id,
        technicianId: selectedTechnician._id,
        ...formData,
      };

      const response = await axiosInstance.post("/api/bookings", bookingData);
      
      // Pass booking data to success page
      const successBookingData = {
        serviceDate: formData.serviceDate,
        timeSlot: formData.timeSlot,
        bookingId: response.data.bookingId,
        service: {
          name: selectedService.serviceName || selectedService.serviceType
        },
        status: response.data.status
      };
      
      navigate("/booking-success", { state: { booking: successBookingData } });
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.", HandleMessageUIError());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-64 mt-24">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 mt-24">
        {!showTechnicians && !showBookingForm && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Select a Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-teal-600 font-bold">${service.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showTechnicians && (
          <div>
            <button
              onClick={() => setShowTechnicians(false)}
              className="mb-4 text-teal-600 hover:underline"
            >
              ← Back to Services
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Select a Technician
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicians.map((tech) => (
                <div
                  key={tech._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleTechnicianSelect(tech)}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {tech.fullname?.firstname} {tech.fullname?.lastname}
                  </h3>
                  <p className="text-gray-600">{tech.email}</p>
                  <p className="text-gray-600">{tech.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showBookingForm && (
          <div>
            <button
              onClick={() => {
                setShowBookingForm(false);
                setShowTechnicians(true);
              }}
              className="mb-4 text-teal-600 hover:underline"
            >
              ← Back to Technicians
            </button>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Book Service
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Issue</label>
                  <textarea
                    value={formData.issue}
                    onChange={(e) =>
                      setFormData({ ...formData, issue: e.target.value })
                    }
                    required
                    className="w-full border p-2 rounded"
                    placeholder="Describe your issue"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Service Date</label>
                  <input
                    type="date"
                    value={formData.serviceDate}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceDate: e.target.value })
                    }
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    required
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Time</option>
                    <option value="9AM-12PM">9 AM - 12 PM</option>
                    <option value="12PM-3PM">12 PM - 3 PM</option>
                    <option value="3PM-6PM">3 PM - 6 PM</option>
                    <option value="6PM-9PM">6 PM - 9 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    className="w-full border p-2 rounded"
                    placeholder="Enter your address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
                >
                  Book Service
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookService;
