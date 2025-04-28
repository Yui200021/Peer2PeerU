import React, { useEffect ,useState} from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
const Home = () => {
  const[featuredItems, setFeaturedItems]= useState([]);

  useEffect(() =>{
    axios.get('http://localhost:8000/featured')
      .then(response =>{
        setFeaturedItems(response.data.items)
      })
      .catch(error => {
        console.error("Error fetching featured items:", error)
      })
  }, [])
  return (
    <>
      <Navbar />
      <div className="home-container">

        {/* Left Image */}
        <div className="home-left">
          <img src="/HomeCover.png" alt="Home Cover" className="home-cover-img" />
        </div>

        {/* Right Content */}
        <div className="home-right">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for items..."
              className="home-search-input"
            />
            <button className="search-button">Search</button>
          </div>
          {/* listings */}
          <div className="featured-listings">
            <h2>Featured Items</h2>
            <div className="items-grid">
              {featuredItems && featuredItems.map((item, index)=>(
                <div key= {index} className='item-card'>
                {item}
                </div>
              ))}
              
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default Home;
