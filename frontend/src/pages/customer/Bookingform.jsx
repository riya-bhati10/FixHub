import React, { useState } from "react";

const BookServiceForm = () => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationResults, setLocationResults] = useState([]);

  const [formData, setFormData] = useState({
    serviceId: "",
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= TIME SLOT LOGIC ================= */

  const today = new Date().toISOString().split("T")[0];
  const currentHour = new Date().getHours();

  const timeSlots = [
    { label: "9AM - 12PM", value: "9AM-12PM", start: 9 },
    { label: "12PM - 3PM", value: "12PM-3PM", start: 12 },
    { label: "3PM - 6PM", value: "3PM-6PM", start: 15 },
    { label: "6PM - 9PM", value: "6PM-9PM", start: 18 },
  ];

  const isToday = formData.serviceDate === today;

  /* ================= LOCATION SEARCH ================= */

  const searchLocation = async (value) => {
    setSearchQuery(value);
    setFormData({ ...formData, address: value });

    if (value.length < 3) {
      setLocationResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${value}`
      );
      const data = await res.json();
      setLocationResults(data);
    } catch (error) {
      console.error("Location search failed");
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Current Location Detected",
        });
        setSearchQuery("Current Location");
        setLocationResults([]);
        setLoadingLocation(false);
      },
      () => {
        alert("Unable to fetch location");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Service Booked Successfully ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
      >
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mr-4 p-3 bg-gray-50 rounded-full hover:bg-gray-100"
          >
            ←
          </button>
          <h2 className="text-3xl font-bold text-center flex-1">
            Book Your Service
          </h2>
        </div>

        {/* Service */}
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          className="w-full p-4 border rounded-xl mb-5"
          required
        >
          <option value="">Select a service</option>
          <option value="ac">AC Repair</option>
          <option value="mobile">Mobile Repair</option>
          <option value="laptop">Laptop Service</option>
        </select>

        {/* Issue */}
        <textarea
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          className="w-full p-4 border rounded-xl mb-5"
          rows="3"
          placeholder="Describe your issue"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="serviceDate"
          min={today}
          value={formData.serviceDate}
          onChange={handleChange}
          className="w-full p-4 border rounded-xl mb-5"
          required
        />

        {/* ⏰ TIME SLOT (AUTO DISABLE) */}
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="w-full p-4 border rounded-xl mb-6"
          required
        >
          <option value="">Select time</option>
          {timeSlots.map((slot) => (
            <option
              key={slot.value}
              value={slot.value}
              disabled={isToday && currentHour >= slot.start}
            >
              {slot.label}
              {isToday && currentHour >= slot.start
                ? " (Not Available)"
                : ""}
            </option>
          ))}
        </select>

        {/* Address */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => searchLocation(e.target.value)}
          placeholder="Search address"
          className="w-full p-4 border rounded-xl"
          required
        />

        {locationResults.length > 0 && (
          <div className="border rounded-xl mt-2 max-h-40 overflow-auto">
            {locationResults.map((item) => (
              <div
                key={item.place_id}
                onClick={() => {
                  setFormData({
                    ...formData,
                    address: item.display_name,
                    latitude: item.lat,
                    longitude: item.lon,
                  });
                  setSearchQuery(item.display_name);
                  setLocationResults([]);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.display_name}
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={getCurrentLocation}
          className="mt-3 text-sm text-teal-600"
        >
          Use current location
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl font-semibold"
        >
          Book Service Now
        </button>
      </form>
    </div>
  );
};

export default BookServiceForm;
