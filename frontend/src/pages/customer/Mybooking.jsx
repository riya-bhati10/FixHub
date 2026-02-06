import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../Common/Navbar";
import api from "../Landing/api";
import { useRealTimeData } from "../../hooks/useRealTimeData";
import {
  HandleMessageUISuccess,
  HandleMessageUIError,
} from "../../utils/toastConfig";

const MyBooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const customerNavLinks = [
    { path: "/customer/dashboard", label: "Dashboard" },
    { path: "/customer/book-service", label: "Book Service" },
    { path: "/customer/my-bookings", label: "My Bookings" },
  ];

  // Format time helper
  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  // Real-time data fetching
  const fetchBookings = async () => {
    const response = await api.get("/bookings/customer");
    return response.data.bookings || [];
  };

  const { data: bookings, loading, lastUpdated, refresh, updateDataOptimistically } = useRealTimeData(fetchBookings, {
    interval: 7000, // 7 seconds for customers (balanced)
    showToast: false, // Don't annoy with frequent toasts
    successMessage: "Booking status updated!",
    errorMessage: "Failed to update bookings",
    optimisticUpdate: true,
    cacheKey: 'customer-bookings'
  });

  // Calculate stats based on real-time data
  const stats = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "in-progress").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalSpent: bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + (b.actualPrice || b.estimatedPrice || 0), 0),
  };

  // Debug logging for total spent
  console.log("=== MYBOOKINGS DEBUG ===");
  console.log("All bookings:", bookings);
  console.log("Completed bookings:", bookings.filter((b) => b.status === "completed"));
  
  // Check the completed booking details
  const completedBookings = bookings.filter((b) => b.status === "completed");
  if (completedBookings.length > 0) {
    const completedBooking = completedBookings[0];
    console.log("=== COMPLETED BOOKING DETAILS ===");
    console.log("Full booking object:", completedBooking);
    console.log("Status:", completedBooking.status);
    console.log("actualPrice:", completedBooking.actualPrice);
    console.log("estimatedPrice:", completedBooking.estimatedPrice);
    console.log("All fields:", Object.keys(completedBooking));
    console.log("All values:", Object.values(completedBooking));
    console.log("Price fields:", Object.keys(completedBooking).filter(key => key.toLowerCase().includes('price')));
  }
  
  console.log("Bookings with actualPrice:", bookings.filter((b) => b.status === "completed" && b.actualPrice));
  console.log("Bookings with estimatedPrice:", bookings.filter((b) => b.status === "completed" && b.estimatedPrice));
  console.log("Total spent:", stats.totalSpent);

  const handleCancelBooking = async (bookingId) => {
    try {
      // Optimistic Update - Update UI immediately
      updateDataOptimistically(prevBookings =>
        prevBookings.map(b =>
          b._id === bookingId || b.bookingId === bookingId
            ? { ...b, status: 'cancelled', updatedAt: new Date() }
            : b
        )
      );

      await api.patch(`/bookings/${bookingId}/cancel`);
      toast.success("Booking cancelled successfully", HandleMessageUISuccess());
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking", HandleMessageUIError());
      // Revert optimistic update on error
      refresh();
    }
  };

  const tabItems = [
    { id: "all", label: "All Booking", icon: "list_alt" },
    { id: "active", label: "Active", icon: "home_repair_service" },
    { id: "completed", label: "Completed", icon: "task_alt" },
    { id: "cancelled", label: "Cancelled", icon: "cancel" },
  ];

  const getStatusForTab = (booking) => {
    if (booking.status === "accepted" || booking.status === "in_progress")
      return "active";
    return booking.status;
  };

  const filteredBookings = bookings.filter((booking) => {
    const bookingIdStr = String(booking._id || booking.bookingId);
    const serviceName = booking.service?.name || "";
    return (
      bookingIdStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const tabFilteredBookings = filteredBookings.filter((booking) => {
    if (activeTab === "all") return true;
    return getStatusForTab(booking) === activeTab;
  });

  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: {
        text: "Pending",
        color: "bg-yellow-500",
        icon: "pending_actions",
      },
      accepted: {
        text: "Accepted",
        color: "bg-blue-500",
        icon: "home_repair_service",
      },
      in_progress: { text: "In Progress", color: "bg-blue-600", icon: "build" },
      completed: {
        text: "Completed",
        color: "bg-emerald-500",
        icon: "task_alt",
      },
      cancelled: { text: "Cancelled", color: "bg-red-500", icon: "cancel" },
    };
    return (
      statusMap[status] || { text: status, color: "bg-gray-500", icon: "help" }
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-900">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
          body { font-family: 'Manrope', sans-serif; }
          .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        `}
      </style>

      <Navbar
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />

      <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">My Bookings</h2>
            </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85]"
                placeholder="Search bookings..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={refresh}
              disabled={loading}
              className="bg-[#1F7F85] hover:bg-[#0F4C5C] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <svg
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
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
              Refresh
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-[#1F7F85]/10 bg-[#DCEBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1F7F85]/70">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-[#0F4C5C] mt-1">
                  {stats.total}
                </p>
              </div>
              <span className="material-symbols-outlined text-2xl text-[#1F7F85]">
                build
              </span>
            </div>
          </div>
          <div className="p-6 border border-[#1F7F85]/10 bg-[#DCEBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1F7F85]/70">Active</p>
                <p className="text-2xl font-bold text-[#0F4C5C] mt-1">
                  {stats.active}
                </p>
              </div>
              <span className="material-symbols-outlined text-2xl text-[#1F7F85]">
                home_repair_service
              </span>
            </div>
          </div>
          <div className="p-6 border border-[#1F7F85]/10 bg-[#DCEBEC]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1F7F85]/70">
                  Completed
                </p>
                <p className="text-2xl font-bold text-[#0F4C5C] mt-1">
                  {stats.completed}
                </p>
              </div>
              <span className="material-symbols-outlined text-2xl text-emerald-500">
                task_alt
              </span>
            </div>
          </div>
          <div className="p-6 bg-[#1F7F85]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-100/80">
                  Total Spent
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  ${stats.totalSpent ? stats.totalSpent.toFixed(2) : '0.00'}
                </p>
              </div>
              <span className="material-symbols-outlined text-2xl text-teal-100">
                payments
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-slate-200">
          <div className="px-8 flex items-center gap-8 border-b border-slate-100 overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "text-[#1F7F85] border-b-2 border-[#1F7F85]"
                    : "text-slate-500 hover:text-[#1F7F85] border-b-2 border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300 animate-spin">
              progress_activity
            </span>
            <p className="text-slate-500 mt-4 text-lg">
              Loading your bookings...
            </p>
          </div>
        ) : tabFilteredBookings.length > 0 ? (
          <div className="bg-white border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Technician
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tabFilteredBookings.map((booking) => {
                    const statusInfo = getStatusDisplay(booking.status);
                    return (
                      <tr
                        key={booking._id || booking.bookingId}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-slate-900">
                            {String(booking._id || booking.bookingId).slice(-6)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#1F7F85]">
                              build
                            </span>
                            <div className="text-sm font-bold text-slate-900">
                              {booking.service.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 flex items-center justify-center border ${
                                booking.technician
                                  ? "bg-[#DCEBEC] text-[#1F7F85] border-[#1F7F85]/20"
                                  : "bg-slate-100 text-slate-400 border-slate-200"
                              }`}
                            >
                              <span className="material-symbols-outlined text-sm">
                                {booking.technician
                                  ? "engineering"
                                  : "person_off"}
                              </span>
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                booking.technician
                                  ? "text-slate-700"
                                  : "text-slate-400 italic"
                              }`}
                            >
                              {booking.technician?.name || "Unassigned"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {new Date(booking.serviceDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold ${statusInfo.color} text-white`}
                          >
                            <span className="material-symbols-outlined text-xs">
                              {statusInfo.icon}
                            </span>
                            {statusInfo.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {booking.status === "pending" && (
                              <button
                                className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
                                onClick={() =>
                                  handleCancelBooking(
                                    booking._id || booking.bookingId,
                                  )
                                }
                              >
                                <span className="material-symbols-outlined text-sm">
                                  cancel
                                </span>
                                Cancel
                              </button>
                            )}
                            {booking.status === "completed" && (
                              <button
                                className="px-4 py-2 bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 text-sm"
                                onClick={() => {
                                  console.log(
                                    "Passing booking to review:",
                                    booking,
                                  );
                                  navigate("/customer/review", {
                                    state: { booking },
                                  });
                                }}
                              >
                                <span className="material-symbols-outlined text-sm">
                                  rate_review
                                </span>
                                Review
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-slate-300">
              search_off
            </span>
            <p className="text-slate-500 mt-4 text-lg">No bookings found</p>
            <button
              onClick={() => navigate("/customer/book-service")}
              className="mt-4 px-6 py-2 bg-[#1F7F85] text-white font-bold hover:bg-[#0F4C5C] transition-all"
            >
              Book a Service
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBooking;
