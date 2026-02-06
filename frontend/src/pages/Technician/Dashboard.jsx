import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { HandleMessageUIError } from "../../utils/toastConfig";
import userService from "../../Services/userService";
import technicianService from "../../Services/technicianService";
import AddService from "./AddService";

const Dashboard = () => {
  const [technicianData, setTechnicianData] = useState(null);
  const [stats, setStats] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddService, setShowAddService] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to access dashboard");
        return;
      }

      console.log("Token found:", token ? "Yes" : "No");
      console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

      // Test backend connectivity
      console.log("Testing backend connectivity...");
      try {
        const testResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/test`,
        );
        const testData = await testResponse.json();
        console.log("Backend test response:", testData);
      } catch (error) {
        console.error("Backend connectivity test failed:", error);
        setError(
          "Cannot connect to backend server. Please ensure backend is running.",
        );
        return;
      }

      console.log("Fetching user profile...");
      try {
        const userData = await userService.getUserProfile();
        console.log("User data success:", userData);
        setTechnicianData(userData);
      } catch (error) {
        console.error(
          "User profile error:",
          error.response?.data || error.message,
        );
        throw error;
      }

      console.log("Fetching technician stats...");
      try {
        const statsData = await technicianService.getTechnicianStats();
        console.log("=== STATS DATA RECEIVED ===");
        console.log("Stats:", statsData);
        console.log("Total Earnings:", statsData.totalEarnings);
        setStats(statsData);
      } catch (error) {
        console.error("Stats error:", error.response?.data || error.message);
        throw error;
      }

      console.log("Fetching booking requests...");
      try {
        const requestsData =
          await technicianService.getTechnicianBookingRequests();
        console.log("Requests data success:", requestsData);
        setBookingRequests(requestsData);
      } catch (error) {
        console.error(
          "Booking requests error:",
          error.response?.data || error.message,
        );
        throw error;
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
      } else {
        setError(
          `Failed to load dashboard data: ${error.response?.data?.message || error.message}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      await technicianService.acceptBookingRequest(bookingId);
      // Refresh data after accepting
      const updatedRequests =
        await technicianService.getTechnicianBookingRequests();
      const updatedStats = await technicianService.getTechnicianStats();
      setBookingRequests(updatedRequests);
      setStats(updatedStats);
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking", HandleMessageUIError());
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await technicianService.declineBookingRequest(bookingId);
      // Refresh data after declining
      const updatedRequests =
        await technicianService.getTechnicianBookingRequests();
      setBookingRequests(updatedRequests);
    } catch (error) {
      console.error("Error declining booking:", error);
      toast.error("Failed to decline booking", HandleMessageUIError());
    }
  };

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
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 bg-fixhub-primary text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Jobs",
      value: stats?.totalJobs || "0",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: "bg-fixhub-primary",
    },
    {
      title: "Completed",
      value: stats?.completedJobs || "0",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: stats?.pendingJobs || "0",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      color: "bg-yellow-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalEarnings?.toFixed(2) || "0.00"}`,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-emerald-500",
    },
  ];

  console.log("Rendering stats cards with data:", stats);

  const quickActions = [
    {
      title: "Total Work Done",
      description: "View completed jobs",
      link: "/technician/history",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      color: "bg-fixhub-primary",
    },
    {
      title: "My Services",
      description: "Manage your services",
      link: "/technician/my-services",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      color: "bg-fixhub-primary",
    },
    {
      title: "Reviews & Ratings",
      description: "View customer feedback",
      link: "/technician/reviews",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      color: "bg-fixhub-primary",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">
            Welcome back, {technicianData?.fullname?.firstname}{" "}
            {technicianData?.fullname?.lastname}!
          </h1>
          <p className="text-fixhub-textMuted">
            Here's what's happening with your jobs today.
          </p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-fixhub-textMuted text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-fixhub-textDark">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft mb-8">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft">
          <h2 className="text-xl font-semibold text-fixhub-textDark">
            Service Requests
          </h2>
          <p className="text-sm text-fixhub-textMuted mt-1">
            New booking requests waiting for your response
          </p>
        </div>
        <div className="p-6">
          {bookingRequests.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                No Requests Available
              </p>
              <p className="text-gray-400 text-sm mt-1">
                You don't have any new booking requests at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookingRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white border-2 border-[#DCEBEC] rounded-xl p-6 hover:border-[#1F7F85] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-xl">
                        {request.customer?.fullname?.firstname?.charAt(0) ||
                          "C"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0F4C5C] text-lg">
                        {request.customer?.fullname?.firstname}{" "}
                        {request.customer?.fullname?.lastname}
                      </h3>
                      <p className="text-[#1F7F85] font-semibold text-sm">
                        {request.serviceType}
                      </p>
                      <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                        {request.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 bg-[#F7FBFC] p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[#1F7F85] text-base">
                        location_on
                      </span>
                      <span className="text-slate-700 text-xs line-clamp-1">
                        {request.location}
                      </span>
                      <span className="text-slate-700 font-bold text-xs">
                        ${request.estimatedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2.5 px-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        check_circle
                      </span>
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(request._id)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        cancel
                      </span>
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`${action.color} hover:opacity-90 text-white p-6 rounded-lg transition-all hover:scale-105 block`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-3">{action.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AddService
            onClose={() => setShowAddService(false)}
            onServiceAdded={() => {
              setShowAddService(false);
              // Optionally refresh dashboard data here
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
