import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import technicianService from "../../Services/technicianService";
import AddService from "./AddService";
import ConfirmModal from "../../Common/ConfirmModal";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import {
  HandleMessageUIError,
  HandleMessageUISuccess,
} from "../../utils/toastConfig";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  // Confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [confirmPayload, setConfirmPayload] = useState(null);

  const fetchMyServices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching my services...");
      const servicesData = await technicianService.getMyServices();
      console.log("Services fetched:", servicesData);
      console.log("Services array length:", servicesData?.length || 0);
      setServices(servicesData || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      console.error("Error response:", error.response);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useAutoRefresh(fetchMyServices, 3000); // 3 seconds

  const handleDeleteService = (serviceId) => {
    setConfirmAction("deleteService");
    setConfirmPayload(serviceId);
    setConfirmOpen(true);
  };

  const performConfirmAction = async () => {
    if (confirmAction === "deleteService") {
      setConfirmLoading(true);
      try {
        await technicianService.deleteService(confirmPayload);
        setServices(
          services.filter((service) => service._id !== confirmPayload),
        );
        toast.success(
          "Service deleted successfully!",
          HandleMessageUISuccess(),
        );
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service", HandleMessageUIError());
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
        setConfirmAction("");
        setConfirmPayload(null);
      }
    } else {
      setConfirmOpen(false);
    }
  };

  const handleToggleStatus = async (serviceId, currentStatus) => {
    try {
      const newStatus = currentStatus ? "inactive" : "active";
      await technicianService.updateServiceStatus(serviceId, newStatus);
      setServices(
        services.map((service) =>
          service._id === serviceId
            ? { ...service, isActive: !currentStatus }
            : service,
        ),
      );
      toast.success(
        `Service ${currentStatus ? "deactivated" : "activated"} successfully!`,
        HandleMessageUISuccess(),
      );
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("Failed to update service status", HandleMessageUIError());
    }
  };

  console.log(
    "Rendering MyServices, loading:",
    loading,
    "error:",
    error,
    "services count:",
    services.length,
  );

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-fixhub-textDark mb-2">
            My Services
          </h1>
          <p className="text-xs sm:text-sm text-fixhub-textMuted">
            Manage and view all your created services
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchMyServices}
            className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => setShowAddService(true)}
            className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="hidden sm:inline">Add New Service</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-fixhub-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-fixhub-textDark">
                {services.length}
              </p>
              <p className="text-xs sm:text-sm text-fixhub-textMuted">
                Total Services
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-fixhub-borderSoft">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-fixhub-textDark">
                {services.filter((s) => s.isActive).length}
              </p>
              <p className="text-xs sm:text-sm text-fixhub-textMuted">
                Active Services
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-fixhub-borderSoft">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-fixhub-textDark">
                ₹
                {services
                  .reduce(
                    (total, service) => total + (service.serviceCharge || 0),
                    0,
                  )
                  .toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-fixhub-textMuted">
                Total Value
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-4">
        <p className="text-sm text-fixhub-textMuted">
          Total Services: {services.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl border-2 border-fixhub-borderSoft hover:border-fixhub-primary shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="h-24 sm:h-32 bg-gradient-to-br from-fixhub-primary to-fixhub-dark relative">
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      service.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/95 p-1.5 sm:p-2 rounded-lg shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-fixhub-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>

              <div className="p-3 sm:p-5">
                <h3 className="text-sm sm:text-lg font-bold text-fixhub-textDark mb-1 sm:mb-2 line-clamp-1">
                  {service.serviceName}
                </h3>
                <p className="text-xs sm:text-sm text-fixhub-textMuted line-clamp-2 mb-3 sm:mb-4">
                  {service.description}
                </p>

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-fixhub-textMuted flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-fixhub-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      Charge
                    </span>
                    <span className="font-bold text-fixhub-textDark">
                      ₹{service.serviceCharge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-fixhub-textMuted flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-fixhub-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Experience
                    </span>
                    <span className="font-bold text-fixhub-textDark">
                      {service.experience}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 sm:pt-4 border-t border-fixhub-borderSoft">
                  <button
                    onClick={() =>
                      handleToggleStatus(service._id, service.isActive)
                    }
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      service.isActive
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {service.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="px-2 sm:px-4 py-1.5 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-fixhub-textDark mb-2">
              No Services Found
            </h3>
            <p className="text-fixhub-textMuted mb-4">
              {loading
                ? "Loading services..."
                : "No services created yet. Create your first service to get started."}
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

      {/* Confirm Modal for destructive actions */}
      <ConfirmModal
        open={confirmOpen}
        title={
          confirmAction === "deleteService" ? "Delete service?" : "Confirm"
        }
        message={
          confirmAction === "deleteService"
            ? "Are you sure you want to delete this service?"
            : ""
        }
        onConfirm={performConfirmAction}
        onCancel={() => setConfirmOpen(false)}
        confirmLabel={confirmAction === "deleteService" ? "Delete" : "Yes"}
        cancelLabel="Cancel"
        loading={confirmLoading}
      />

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
