import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../Common/Navbar";
import api from "../Landing/api";
import { HandleMessageUIError } from "../../utils/toastConfig";

const ServiceList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const customerNavLinks = [
    { label: "Dashboard", path: "/customer/dashboard" },
    { label: "Book Service", path: "/customer/book-service" },
    { label: "My Bookings", path: "/customer/my-bookings" },
  ];

  useEffect(() => {
    fetchServices();
  }, [categoryId]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/services/category/${categoryId}`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.technician?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-sm sm:text-base ${i < rating ? "text-amber-400 fill-current" : "text-slate-300"}`}
      >
        star
      </span>
    ));
  };

  const handleServiceClick = async (service) => {
    try {
      // Check if customer is blocked before navigating to booking form
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const response = await api.get("/auth/me");
        if (response.data.user.isBlocked) {
          toast.error(
            "Your account is blocked. You cannot book services. Please contact admin for assistance.",
            HandleMessageUIError(),
          );
          return;
        }
      }
      navigate("/customer/booking-form", { state: { service } });
    } catch (error) {
      console.error("Error checking user status:", error);
      // If error checking status, still allow navigation (fallback)
      navigate("/customer/booking-form", { state: { service } });
    }
  };

  const getCategoryIcon = () => {
    const icons = {
      smartphone: "smartphone",
      laptop: "laptop",
      tv: "tv",
      ac: "ac_unit",
      fridge: "kitchen",
      "washing-machine": "local_laundry_service",
      microwave: "microwave",
      "home-audio": "speaker",
      camera: "photo_camera",
      gaming: "sports_esports",
    };
    return icons[categoryId] || "build";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar
        userType="customer"
        navLinks={customerNavLinks}
        showProfile
        showNotifications
      />

      {/* Hero Section - Mobile Responsive */}
      <div className="relative bg-gradient-to-r from-[#0F4C5C] via-[#1F7F85] to-[#0F4C5C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTM2IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16 relative">
          <button
            onClick={() => navigate("/customer/book-service")}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 sm:mb-6 text-xs sm:text-sm font-medium transition-all group"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Categories
          </button>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-4xl lg:text-5xl text-white">
                  {getCategoryIcon()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-white capitalize mb-1 sm:mb-2 truncate">
                  {categoryId.replace("-", " ")} Services
                </h1>
                <p className="text-teal-100 text-xs sm:text-sm lg:text-base">
                  Find expert technicians • Compare prices • Book instantly
                </p>
              </div>
            </div>

            <div className="relative w-full sm:max-w-md">
              <span className="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg sm:text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 text-xs sm:text-sm bg-white/95 backdrop-blur-sm border-0 rounded-lg sm:rounded-xl shadow-xl focus:ring-2 focus:ring-white/50 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#1F7F85] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                Finding the best technicians for you...
              </p>
            </div>
          </div>
        ) : filteredServices.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <p className="text-slate-600 text-xs sm:text-sm">
                <span className="font-bold text-[#0F4C5C]">
                  {filteredServices.length}
                </span>{" "}
                expert{filteredServices.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={service._id}
                  onClick={() => handleServiceClick(service)}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer overflow-hidden border border-slate-100"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Header with Gradient */}
                  <div className="relative bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] p-4 sm:p-6 pb-12 sm:pb-16">
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-1.5 shadow-lg">
                      <span className="material-symbols-outlined text-amber-300 fill-current text-sm sm:text-lg">
                        star
                      </span>
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {service.technician?.rating || 4.5}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-xl flex-shrink-0">
                        {service.technician?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-lg font-bold text-white truncate">
                          {service.technician?.name}
                        </h3>
                        <div className="flex gap-0.5 sm:gap-1 mt-1">
                          {getRatingStars(
                            Math.round(service.technician?.rating || 4.5),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6 -mt-6 sm:-mt-8 relative">
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 mb-3 sm:mb-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="material-symbols-outlined text-[#1F7F85] text-base sm:text-xl">
                          build
                        </span>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Service Type
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#0F4C5C] capitalize truncate">
                        {service.serviceType}
                      </p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 sm:mb-1.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs sm:text-sm">
                            description
                          </span>
                          Description
                        </p>
                        <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-500 bg-slate-50 rounded-lg p-2 sm:p-2.5">
                        <span className="material-symbols-outlined text-sm sm:text-base text-[#1F7F85] mt-0.5 flex-shrink-0">
                          location_on
                        </span>
                        <span className="line-clamp-2">
                          {service.technician?.location ||
                            "Available in your area"}
                        </span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t-2 border-slate-100 gap-3">
                      <div>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-0.5">
                          Starting from
                        </p>
                        <p className="text-xl sm:text-2xl font-extrabold text-[#0F4C5C]">
                          ${service.price || 50}
                        </p>
                      </div>
                      <button className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1 sm:gap-2 group-hover:gap-3 whitespace-nowrap">
                        Book Now
                        <span className="material-symbols-outlined text-sm sm:text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-[10px] sm:text-xs fill-current">
                      verified
                    </span>
                    VERIFIED
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 sm:py-20 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-3xl sm:text-5xl text-slate-400">
                search_off
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700 mb-2">
              No services found
            </h3>
            <p className="text-sm sm:text-base text-slate-500">
              Try adjusting your search or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
