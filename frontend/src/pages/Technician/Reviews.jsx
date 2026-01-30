import React, { useState, useEffect } from 'react';
import { reviewService } from '../../Services/reviewService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Get current technician ID from localStorage or context
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'technician') {
        setError('Unauthorized access');
        return;
      }

      // Use either userId or _id depending on your user object structure
      const technicianId = user.userId || user._id || user.id;
      if (!technicianId) {
        setError('Technician ID not found');
        return;
      }

      const response = await reviewService.getTechnicianReviews(technicianId);
      const reviewsData = response.reviews || [];
      
      // Transform the data to match the component format
      const transformedReviews = reviewsData.map((review, index) => ({
        id: index + 1,
        customer: review.customerName,
        service: review.serviceName,
        rating: review.rating,
        comment: review.review,
        date: new Date(review.createdAt).toLocaleDateString()
      }));
      
      setReviews(transformedReviews);
      
      // Calculate average rating
      if (transformedReviews.length > 0) {
        const avg = transformedReviews.reduce((sum, review) => sum + review.rating, 0) / transformedReviews.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-slate-300 animate-spin">progress_activity</span>
          <p className="text-slate-500 mt-4 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-red-300">error</span>
          <p className="text-red-500 mt-4 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Reviews & Ratings</h1>
        <p className="text-fixhub-textMuted">Customer feedback and ratings for your services.</p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-fixhub-textDark mb-2">Overall Rating</h2>
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold text-fixhub-primary">{averageRating.toFixed(1)}</span>
              {renderStars(Math.round(averageRating))}
              <span className="text-fixhub-textMuted">({reviews.length} reviews)</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-fixhub-primary">{reviews.length}</div>
            <div className="text-fixhub-textMuted">Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-fixhub-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{review.customer.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-fixhub-textDark">{review.customer}</h3>
                  <p className="text-sm text-fixhub-textMuted">{review.service}</p>
                </div>
              </div>
              <div className="text-right">
                {renderStars(review.rating)}
                <p className="text-sm text-fixhub-textMuted mt-1">{review.date}</p>
              </div>
            </div>
            <p className="text-fixhub-textDark">{review.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No reviews yet</h3>
          <p className="text-fixhub-textMuted">Complete some jobs to start receiving customer reviews.</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;