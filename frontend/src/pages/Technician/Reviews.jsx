import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      customer: 'John Doe',
      service: 'AC Repair',
      rating: 5,
      comment: 'Excellent service! Fixed my AC quickly and professionally.',
      date: '2024-01-15'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      service: 'Plumbing Fix',
      rating: 4,
      comment: 'Good work, arrived on time and solved the problem.',
      date: '2024-01-14'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      service: 'Electrical Work',
      rating: 5,
      comment: 'Very knowledgeable and efficient. Highly recommended!',
      date: '2024-01-13'
    }
  ];

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

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
              <span className="text-4xl font-bold text-fixhub-primary">{averageRating}</span>
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