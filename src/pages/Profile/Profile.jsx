import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

 
  const userData = {
    name: "John Doe",
    email: "john.doe@university.edu",
    university: "Sample University",
    major: "Computer Science",
    year: "Junior",
    bio: "Passionate about technology and learning new things. Always eager to learn and grow in the field of computer science. Looking forward to collaborating on interesting projects.",
    aboutMe: {
      personalInfo: "I am a junior Computer Science student with a passion for technology and innovation. I enjoy solving complex problems and building applications that make a difference.",
      languages: ["English (Native)", "Spanish (Intermediate)"]
    },
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=4CAF50&color=fff&size=150",
    reviews: [
      {
        reviewer: "Jane Smith",
        role: "Project Manager",
        company: "Tech Solutions Inc.",
        rating: 5,
        comment: "John is an exceptional developer with great attention to detail. He consistently delivers high-quality work and is a pleasure to work with.",
        date: "2023-12-15"
      },
      {
        reviewer: "Mike Johnson",
        role: "Senior Developer",
        company: "Tech Solutions Inc.",
        rating: 4,
        comment: "Strong technical skills and great problem-solving abilities. John shows great potential in software development.",
        date: "2023-11-20"
      }
    ]
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img 
              src={imagePreview || userData.avatar} 
              alt="Profile" 
              className="profile-avatar" 
            />
            <div className="image-upload">
              <label htmlFor="profile-image" className="upload-button">
                Change Photo
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden-input"
              />
            </div>
          </div>
          <h1>{userData.name}</h1>
          <p className="email">{userData.email}</p>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h2>University Information</h2>
            <p><strong>University:</strong> {userData.university}</p>
            <p><strong>Major:</strong> {userData.major}</p>
            <p><strong>Year:</strong> {userData.year}</p>
          </div>

          <div className="detail-section about-me-section">
            <h2>About Me</h2>
            <div className="about-me-content">
              <div className="about-me-item">
                <h3>Personal Info</h3>
                <p>{userData.aboutMe.personalInfo}</p>
              </div>

              <div className="about-me-item">
                <h3>Languages</h3>
                <ul className="languages-list">
                  {userData.aboutMe.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Reviews</h2>
            <div className="reviews-container">
              {userData.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <h4>{review.reviewer}</h4>
                      <p className="reviewer-role">{review.role} at {review.company}</p>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;