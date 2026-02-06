import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../Landing/api";
import ConfirmModal from "../../Common/ConfirmModal";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import {
  HandleMessageUIError,
  HandleMessageUISuccess,
} from "../../utils/toastConfig";

const MySchedules = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpModal, setOtpModal] = useState({ isOpen: false, bookingId: null });
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [confirmPayload, setConfirmPayload] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  useAutoRefresh(fetchBookings, 5000);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/technician");
      const bookingsData = response.data.bookings || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh without loading state
  const refreshBookings = async () => {
    try {
      const response = await api.get("/bookings/technician");
      const bookingsData = response.data.bookings || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  };

  const filters = [
    { key: "all", label: "All", count: bookings.length },
    {
      key: "pending",
      label: "Pending",
      count: bookings.filter((s) => s.status === "pending").length,
    },
    {
      key: "accepted",
      label: "Accepted",
      count: bookings.filter((s) => s.status === "accepted").length,
    },
    {
      key: "in-progress",
      label: "In Progress",
      count: bookings.filter(
        (s) => s.status === "in-progress" || s.status === "in_progress",
      ).length,
    },
    {
      key: "pending-completion",
      label: "Pending OTP",
      count: bookings.filter((s) => s.status === "pending-completion").length,
    },
    {
      key: "completed",
      label: "Completed",
      count: bookings.filter((s) => s.status === "completed").length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: bookings.filter((s) => s.status === "cancelled").length,
    },
  ];

  const filteredSchedules =
    activeFilter === "all"
      ? bookings
      : bookings.filter((booking) => {
          if (activeFilter === "in-progress") {
            return (
              booking.status === "in-progress" ||
              booking.status === "in_progress"
            );
          }
          return booking.status === activeFilter;
        });

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-[#E0F2F1] text-[#1F7F85] border-[#1F7F85]/30";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "in-progress":
      case "in_progress":
        return "bg-[#DCEBEC] text-[#0F4C5C] border-[#1F7F85]/40";
      case "pending-completion":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-slate-100 text-slate-600 border-slate-300";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
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

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      console.log("=== FRONTEND: Status Change Request ===");
      console.log("Booking ID:", bookingId);
      console.log("New Status:", newStatus);

      const booking = bookings.find((b) => b.bookingId === bookingId);
      console.log("Current Booking Status:", booking?.status);

      if (
        booking?.status === "pending-completion" &&
        newStatus === "pending-completion"
      ) {
        setOtpModal({ isOpen: true, bookingId });
        return;
      }

      if (newStatus === "accepted") {
        await api.patch(`/bookings/${bookingId}/accept`);
        toast.success(
          "Booking accepted successfully!",
          HandleMessageUISuccess(),
        );
      } else if (newStatus === "cancelled") {
        await api.patch(`/bookings/${bookingId}/cancel`);
        toast.success(
          "Booking cancelled successfully!",
          HandleMessageUISuccess(),
        );
      } else if (newStatus === "in-progress") {
        await api.patch(`/bookings/${bookingId}/status`, { status: newStatus });
        toast.success("Work started successfully!", HandleMessageUISuccess());
      } else if (newStatus === "pending-completion") {
        console.log("Sending pending-completion request...");
        const response = await api.patch(`/bookings/${bookingId}/status`, {
          status: newStatus,
        });
        console.log("Response:", response.data);
        if (response.data.requiresOTP) {
          setOtpModal({ isOpen: true, bookingId });
          toast.success(
            "OTP sent to customer! Please ask customer for the OTP.",
            HandleMessageUISuccess(),
          );
        }
      }

      await refreshBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      console.error("Error response:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Failed to update booking status",
        HandleMessageUIError(),
      );
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setOtpLoading(true);
      await api.post(`/bookings/${otpModal.bookingId}/verify-otp`, { otp });
      toast.success(
        "Booking completed successfully!",
        HandleMessageUISuccess(),
      );
      setOtpModal({ isOpen: false, bookingId: null });
      setOtp("");
      await refreshBookings();
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
        HandleMessageUIError(),
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      await api.post(`/bookings/${otpModal.bookingId}/resend-otp`);
      toast.success("New OTP sent to customer!", HandleMessageUISuccess());
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(
        error.response?.data?.message || "Failed to resend OTP",
        HandleMessageUIError(),
      );
    } finally {
      setResendLoading(false);
    }
  };

  const performConfirmAction = async () => {
    if (confirmAction === "openWhatsapp" && confirmPayload) {
      setConfirmLoading(true);
      try {
        window.open(confirmPayload, "_blank");
      } catch (err) {
        console.error("Failed to open WhatsApp:", err);
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
        setConfirmAction("");
        setConfirmPayload(null);
        setConfirmMessage("");
      }
    } else {
      setConfirmOpen(false);
    }
  };

  const handleContactCustomer = (phone) => {
    if (!phone) {
      toast.error(
        "Customer phone number not available",
        HandleMessageUIError(),
      );
      return;
    }

    // Check if mobile device
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    if (isMobile) {
      window.open(`tel:${phone}`, "_self");
    } else {
      // Desktop - copy to clipboard and show WhatsApp option
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;
          setConfirmAction("openWhatsapp");
          setConfirmPayload(whatsappUrl);
          setConfirmMessage(
            `Phone: ${phone} copied to clipboard!\n\nClick Yes to open WhatsApp or No to close.`,
          );
          setConfirmOpen(true);
        })
        .catch(() => {
          toast(`Customer Phone: ${phone}`);
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">
          My Schedules
        </h1>
        <p className="text-fixhub-textMuted">
          Manage your service appointments and track job progress.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-fixhub-primary text-white"
                  : "bg-white text-fixhub-textDark border border-fixhub-borderSoft hover:bg-fixhub-mint/10"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Schedules Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fixhub-primary mx-auto mb-4"></div>
            <p className="text-fixhub-textMuted">Loading schedules...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchedules.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white border-2 border-[#DCEBEC] rounded-xl p-6 hover:border-[#1F7F85] hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {booking.customer.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0F4C5C] text-lg">
                    {booking.customer.name}
                  </h3>
                  <p className="text-[#1F7F85] font-semibold text-sm">
                    {booking.service.type}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(booking.status)}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1).replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 bg-[#F7FBFC] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#1F7F85] text-base">
                    schedule
                  </span>
                  <span className="text-slate-700 text-xs">
                    {booking.timeSlot}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#F7FBFC] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#1F7F85] text-base">
                    calendar_today
                  </span>
                  <span className="text-slate-700 text-xs">
                    {new Date(booking.serviceDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#F7FBFC] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#1F7F85] text-base">
                    phone
                  </span>
                  <span className="text-slate-700 text-xs">
                    {booking.customer.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#F7FBFC] p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[#1F7F85] text-base">
                    location_on
                  </span>
                  <span className="text-slate-700 text-xs flex-1">
                    {booking.customer.location || 'Location not provided'}
                  </span>
                  {booking.customer.location && (
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.customer.location)}`, '_blank')}
                      className="bg-[#1F7F85] hover:bg-[#0F4C5C] text-white px-2 py-1 rounded text-xs font-medium transition-all"
                    >
                      Open Map
                    </button>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-center items-center mb-4 p-3 bg-[#E0F2F1] rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-slate-600">Service Charge</p>
                  <p className="font-bold text-[#0F4C5C] text-lg">
                    ${booking.service.charge}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(booking.bookingId, "accepted")
                      }
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2 px-3 rounded-lg text-sm font-bold transition-all shadow-md"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(booking.bookingId, "cancelled")
                      }
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm font-bold transition-all"
                    >
                      Decline
                    </button>
                  </>
                )}
                {booking.status === "accepted" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(booking.bookingId, "in-progress")
                      }
                      className="flex-1 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] hover:opacity-90 text-white py-2 px-3 rounded-lg text-sm font-bold transition-all shadow-md"
                    >
                      Start Work
                    </button>
                    <button
                      onClick={() =>
                        handleContactCustomer(booking.customer.phone)
                      }
                      className="flex-1 bg-[#DCEBEC] hover:bg-[#1F7F85]/20 text-[#0F4C5C] py-2 px-3 rounded-lg text-sm font-bold transition-all"
                    >
                      Contact
                    </button>
                  </>
                )}
                {(booking.status === "in-progress" ||
                  booking.status === "in_progress") && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          booking.bookingId,
                          "pending-completion",
                        )
                      }
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2 px-3 rounded-lg text-sm font-bold transition-all shadow-md"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() =>
                        handleContactCustomer(booking.customer.phone)
                      }
                      className="flex-1 bg-[#DCEBEC] hover:bg-[#1F7F85]/20 text-[#0F4C5C] py-2 px-3 rounded-lg text-sm font-bold transition-all"
                    >
                      Contact
                    </button>
                  </>
                )}
                {booking.status === "pending-completion" && (
                  <button
                    onClick={() =>
                      setOtpModal({
                        isOpen: true,
                        bookingId: booking.bookingId,
                      })
                    }
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 px-3 rounded-lg text-sm font-bold transition-all shadow-md"
                  >
                    Enter OTP to Complete
                  </button>
                )}
                {booking.status === "completed" && (
                  <button
                    onClick={() =>
                      navigate("/technician/reviews", {
                        state: { bookingId: booking.bookingId },
                      })
                    }
                    className="w-full bg-[#1F7F85] hover:bg-[#0F4C5C] text-white py-2 px-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">
                      rate_review
                    </span>
                    View Reviews
                  </button>
                )}
                {booking.status === "cancelled" && (
                  <button className="w-full bg-slate-200 text-slate-500 py-2 px-3 rounded-lg text-sm font-bold cursor-not-allowed">
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
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
              d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z"
            />
          </svg>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">
            No Schedules Available
          </h3>
          <p className="text-fixhub-textMuted">
            You don't have any {activeFilter === "all" ? "" : activeFilter}{" "}
            appointments at the moment.
          </p>
        </div>
      )}

      {/* Confirm Modal for copy/open actions */}
      <ConfirmModal
        open={confirmOpen}
        title="Open WhatsApp?"
        message={confirmMessage}
        onConfirm={performConfirmAction}
        onCancel={() => setConfirmOpen(false)}
        confirmLabel="Open"
        cancelLabel="Cancel"
        loading={confirmLoading}
      />

      {/* OTP Modal */}
      {otpModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-fixhub-textDark mb-4">
              Enter Completion OTP
            </h3>
            <p className="text-sm text-fixhub-textMuted mb-4">
              Ask the customer for the 6-digit OTP sent to their notifications.
              OTP expires in 1 minute.
            </p>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border-2 border-fixhub-borderSoft rounded-lg text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-fixhub-primary mb-4"
            />
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => {
                  setOtpModal({ isOpen: false, bookingId: null });
                  setOtp("");
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-bold transition-all"
                disabled={otpLoading || resendLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOTP}
                disabled={otpLoading || otp.length !== 6 || resendLoading}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2 px-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? "Verifying..." : "Verify & Complete"}
              </button>
            </div>
            <button
              onClick={handleResendOTP}
              disabled={resendLoading || otpLoading}
              className="w-full bg-fixhub-primary hover:bg-fixhub-dark text-white py-2 px-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySchedules;
