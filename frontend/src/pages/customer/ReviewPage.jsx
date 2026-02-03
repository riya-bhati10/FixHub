import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import api from '../Landing/api';

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const customerNavLinks = [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Book Service', path: '/customer/book-service' },
    { label: 'My Bookings', path: '/customer/my-bookings' }
  ];

  useEffect(() => {
    if (!booking) {
      navigate('/customer/my-bookings');
    }
  }, [booking, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Submitting review with data:', {
        bookingId: booking._id,
        technicianId: booking.technician?._id,
        rating: rating,
        comment: comment.trim()
      });

      await api.post('/reviews', {
        bookingId: booking._id,
        technicianId: booking.technician?._id,
        rating: rating,
        comment: comment.trim()
      });

      alert('Thank you for your review!');
      navigate('/customer/my-bookings');
    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.isDuplicate) {
        alert('You have already reviewed this service!');
      } else {
        setError(error.response?.data?.message || 'Failed to submit review');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar userType="customer" navLinks={customerNavLinks} showProfile showNotifications />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C5C] mb-2">Rate Your Experience</h1>
          <p className="text-slate-600">Help others by sharing your feedback</p>
        </div>

        {/* Technician Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#DCEBEC] p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {booking.technician?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0F4C5C]">{booking.technician?.name}</h3>
              <p className="text-sm text-slate-600 capitalize">{booking.service?.type}</p>
              <p className="text-xs text-slate-500 mt-1">Completed on {new Date(booking.serviceDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border-2 border-[#DCEBEC] p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Star Rating */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-[#0F4C5C] mb-4 text-center">
              How would you rate this service?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-all duration-200 hover:scale-125"
                >
                  <span 
                    className={`material-symbols-outlined text-5xl sm:text-6xl ${
                      star <= (hoverRating || rating) 
                        ? 'text-amber-400 fill-current' 
                        : 'text-slate-300'
                    }`}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center mt-3 text-sm font-semibold text-[#1F7F85]">
                {rating === 5 && '⭐ Excellent!'}
                {rating === 4 && '👍 Very Good!'}
                {rating === 3 && '😊 Good!'}
                {rating === 2 && '😐 Fair'}
                {rating === 1 && '😞 Poor'}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-[#0F4C5C] mb-3">
              Share your experience
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience... Was the technician professional? How was the quality of work?"
              rows="6"
              maxLength="500"
              className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-xl focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none resize-none placeholder:text-slate-400"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-slate-500">Be specific and honest</p>
              <p className={`text-xs font-medium ${
                comment.length >= 450 ? 'text-red-500' : 'text-slate-500'
              }`}>
                {comment.length}/500
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate('/customer/my-bookings')}
              className="flex-1 px-6 py-3 border-2 border-[#DCEBEC] text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0 || !comment.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  Submit Review
                </>
              )}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm text-emerald-500">lock</span>
            Your review helps improve our service quality
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
