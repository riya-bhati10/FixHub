import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../Landing/api';

const Reviews = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Fetching reviews for technician:', user._id);
      
      const response = await api.get(`/reviews/technician/${user._id}`);
      console.log('Reviews response:', response.data);
      
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      console.error('Error response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`material-symbols-outlined text-lg ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}>
        star
      </span>
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F4C5C] mb-2">Customer Reviews</h1>
        <p className="text-slate-600">See what customers are saying about your service</p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-teal-100 text-sm mb-2">Average Rating</p>
            <p className="text-4xl font-extrabold">{getAverageRating()}</p>
            <div className="flex justify-center gap-1 mt-2">
              {getRatingStars(Math.round(getAverageRating()))}
            </div>
          </div>
          <div>
            <p className="text-teal-100 text-sm mb-2">Total Reviews</p>
            <p className="text-4xl font-extrabold">{reviews.length}</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm mb-2">5 Star Reviews</p>
            <p className="text-4xl font-extrabold">{reviews.filter(r => r.rating === 5).length}</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#1F7F85] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading reviews...</p>
          </div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-[#DCEBEC] p-6 hover:border-[#1F7F85] hover:shadow-lg transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] flex items-center justify-center text-white font-bold text-lg">
                    {review.customerName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F4C5C]">{review.customerName}</h3>
                    <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-amber-500 fill-current">star</span>
                    <span className="text-sm font-bold text-amber-700">{review.rating}</span>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {getRatingStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-sm text-slate-700 leading-relaxed">{review.review}</p>

              {/* Service Name */}
              {review.serviceName && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500">Service: <span className="font-semibold text-[#1F7F85]">{review.serviceName}</span></p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-5xl text-slate-400">rate_review</span>
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No Reviews Yet</h3>
          <p className="text-slate-500">Complete more jobs to receive customer reviews</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
