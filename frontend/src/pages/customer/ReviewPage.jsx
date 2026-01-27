import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const ReviewPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(4);
  const [technicianRating, setTechnicianRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS_t3U432J-bz1X01Yjo5HKZfKjFqizHpeuALQs0IXpw9Jsa7H2txcdDCsFrpElXH8CbEK1CZ1OGowGI3eNQbqtB7hBsk-ry_I8VThxBBLHAA9Imx56qiEsma_W89eprQ_XrjOQMhU3LQDj-_TzABDcXj1NXTxcgk8HIZLUhs1MoELdtETDkWeTw4ZIs1-LNLswyoHFyh27Ky-qcJYkD2zg9gPr-K8E7m3RuIs3PK18Fzf8LQvE7wXSwqrxUJz-Ojxk3IyOM-6R14',
      alt: 'Photo showing a newly installed HVAC system'
    }
  ]);

  const handleOverallRating = (rating) => {
    setOverallRating(rating);
  };

  const handleTechnicianRating = (rating) => {
    setTechnicianRating(rating);
  };

  const handleReviewChange = (e) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setReviewText(text);
    }
  };

  const handlePhotoUpload = (e) => {
    // Simulate file upload
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: photos.length + 1,
          url: event.target.result,
          alt: 'Uploaded photo'
        };
        setPhotos([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      overallRating,
      technicianRating,
      reviewText,
      photos: photos.filter(photo => photo.id !== 1)
    });
    // Show success message
    alert('Thank you for your feedback! Your review has been submitted.');
  };

  const handleSkip = () => {
    // Handle skip action
    console.log('Review skipped');
    navigate('/dashboard');
  };

  // Star component
  const Star = ({ filled, onClick, size = 'text-5xl', disabled = false }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${size} transition-all duration-200 ${
        filled 
          ? 'text-[#1F7F85] hover:text-[#0F4C5C] scale-110' 
          : 'text-[#DCEBEC] hover:text-[#6FC2C6]'
      } ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-125'}`}
      aria-label={filled ? 'Filled star' : 'Empty star'}
    >
      ★
    </button>
  );

  // Star Rating component
  const StarRating = ({ rating, onRatingChange, totalStars = 5, size = 'text-5xl', disabled = false }) => {
    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            filled={index < rating}
            onClick={() => !disabled && onRatingChange(index + 1)}
            size={size}
            disabled={disabled}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#1A2E35] font-['Manrope']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="container mx-auto px-4 py-8 pt-0">
        <div className="max-w-6xl mx-auto">
        

          {/* Main Card */}
          <div className="bg-white shadow-xl shadow-[#1F7F85]/5 border border-[#AEE3E6]/50 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Ratings */}
              <div className="space-y-8">
                {/* Overall Rating Section */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-[#1A2E35]">
                    Overall Service Rating
                  </h2>
                  <div className="flex justify-center">
                    <StarRating
                      rating={overallRating}
                      onRatingChange={handleOverallRating}
                      size="text-6xl"
                    />
                  </div>
                  <p className="text-sm font-bold text-[#1F7F85] bg-[#DCEBEC]/50 inline-block px-4 py-1">
                    {overallRating === 5 ? 'Excellent! 😊' :
                     overallRating === 4 ? 'Good! 👍' :
                     overallRating === 3 ? 'Average! 🙂' :
                     overallRating === 2 ? 'Poor! 😕' :
                     'Very Poor! 😞'}
                  </p>
                </div>

                <hr className="border-[#DCEBEC]" />

                {/* Technician Rating Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1A2E35]">
                    Rate Your Technician
                  </h2>
                  
                  <div className="bg-[#DCEBEC]/30 p-6 border border-[#AEE3E6]">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Technician Avatar */}
                      <div className="relative">
                        <div className="w-24 h-24 overflow-hidden border-4 border-white shadow-lg shadow-[#1F7F85]/10">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCypqfgxcRUHIbOrPY0JiYOuJV21fzkqNo4geVH9MsWzoo72mmLaKC4AKCmuTK0K7egqJmy0aaGNM6Uq36-de-hxkJTWSCxvY98Vz8biLchNjqqBR53OvvnmT9sXt9_474TTC4QJZJndY_e4k6wyE_hmQod289yR77lG9HTZ3_VketTQUKYfxIFw9I1B-9ocJ2KPihcFo3VC19D6oxZAO1ntoFhsXdakvAQiCOs0Gl70A2q5J9kmWoNoJHnguXlsucb5XSu8RdOOlc"
                            alt="Profile photo of technician Alex Thompson"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#1F7F85] text-white text-xs font-bold px-2 py-1 border-2 border-white">
                          ★ 4.9
                        </div>
                      </div>

                      {/* Technician Info */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#1A2E35] mb-1">
                          Alex Thompson
                        </h3>
                        <p className="text-[#5F7D83] font-medium mb-3">
                          HVAC Master Specialist
                        </p>
                      
                      </div>

                      {/* Technician Stars */}
                      <div className="flex flex-col items-center gap-2">
                        <StarRating
                          rating={technicianRating}
                          onRatingChange={handleTechnicianRating}
                          size="text-3xl"
                        />
                        <span className="text-sm font-bold text-[#5F7D83]">
                          {technicianRating}/5 stars
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inputs */}
              <div className="space-y-8">
                {/* Review Text Section */}
                <div className="space-y-4">
                  <label className="text-xl font-bold text-[#1A2E35]">
                    Write Your Review
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full min-h-[180px] border-2 border-[#DCEBEC] bg-[#F7FBFC] text-[#1A2E35] p-5 text-base resize-none focus:border-[#1F7F85] focus:ring-4 focus:ring-[#1F7F85]/10 transition-all duration-200 placeholder:text-[#5F7D83]/50"
                      placeholder="Tell us about your experience... Was the technician punctual? Professional? How was the quality of work?"
                      value={reviewText}
                      onChange={handleReviewChange}
                      maxLength={500}
                    />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        reviewText.length === 500 ? 'text-red-500' : 'text-[#5F7D83]'
                      }`}>
                        {reviewText.length}/500
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-[#5F7D83] flex items-center gap-2 font-medium">
                    <span className="material-symbols-outlined text-lg">info</span>
                    Be specific about what you liked or what could be improved
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-4">
                  <label className="text-xl font-bold text-[#1A2E35]">
                    Add Photos <span className="text-base font-normal text-[#5F7D83]">(Optional)</span>
                  </label>
                  <p className="text-[#5F7D83] text-sm">
                    Upload photos of the completed work. This helps other customers see real results.
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* Upload Button */}
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[#6FC2C6] bg-[#F7FBFC] hover:bg-[#DCEBEC] hover:border-[#1F7F85] transition-all cursor-pointer group relative">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                      <div className="text-[#1F7F85] group-hover:scale-110 transition-transform">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-[#1F7F85] mt-2 uppercase tracking-wider">
                        Add Photos
                      </span>
                      <span className="absolute bottom-2 text-[10px] text-[#5F7D83]">
                        Max 5MB
                      </span>
                    </label>

                    {/* Uploaded Photos */}
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="aspect-square overflow-hidden relative group border border-[#DCEBEC]"
                      >
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-2 bg-white/20 hover:bg-red-500 text-white transition-colors backdrop-blur-sm"
                            aria-label="Delete photo"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#DCEBEC]">
              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto bg-[#1F7F85] hover:bg-[#0F4C5C] text-white font-bold text-lg py-4 px-12 shadow-lg shadow-[#1F7F85]/20 hover:shadow-[#1F7F85]/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit Review
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-6">
                <div className="flex items-center justify-center gap-2 text-sm text-[#5F7D83]">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your review is anonymous</span>
                  <span className="w-1 h-1 bg-[#DCEBEC]"></span>
                  <svg className="w-4 h-4 text-[#1F7F85]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure & encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-[#5F7D83]/60 text-xs font-bold uppercase tracking-widest">
            <p>ServicePro Customer Feedback System • All reviews are verified</p>
          </div>
        </div>
      </div>

      {/* Toast Notification (hidden by default) */}
      <div className="fixed bottom-4 right-4 hidden" id="success-toast">
        <div className="bg-green-500 text-white px-6 py-3 shadow-lg">
          Review submitted successfully! Thank you for your feedback.
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;