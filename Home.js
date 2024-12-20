import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
        <h1>Welcome to HeyJuice Order Management</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
        <div>
          <h2>Welcome to HeyJuice – Your Healthy Lifestyle Partner!</h2>
        </div>

        <h3>
          At HeyJuice, we believe health starts with what you drink. <br />
          Indulge in our fresh, natural, and nutrient-packed juices, crafted with care from the highest quality fruits
          and vegetables. <br />
          Whether you're at work, home, or on the go, HeyJuice brings you the perfect blend of taste and wellness.
          <br />
          <br />
          🌱 <strong>Why HeyJuice?</strong>
          <br />
          Freshly made on demand to preserve nutrients and flavor.
          <br />
          No added sugars, just pure goodness.
          <br />
          Tailored to your lifestyle: from fruity delights to vibrant veggie blends.
          <br />
          <br />
          🥝 <strong>Order Easily, Live Healthily</strong>
          <br />
          Explore our menu, customize your choices, and track your orders in real-time – all from our user-friendly
          platform. <br />
          Delivered straight to your doorstep, because your well-being is our priority.
          <br />
          <br />
          🍹 <strong>Start your healthy journey with HeyJuice today – where freshness meets convenience!</strong>
        </h3>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <h3>Our Products:</h3>
            <ul style={{ listStyleType: 'circle', textAlign: 'left' }}>
              <li>Rambutan Juice: 12,500</li>
              <li>Papaya Lime Juice: 23,500</li>
              <li>Bali Orange Juice: 20,500</li>
              <li>Jackfruit Smoothie: 17,500</li>
              <li>Cempedak Juice: 16,800</li>
              <li>Duku Juice: 14,200</li>
              <li>Kedondong Juice: 12,900</li>
              <li>Java Apple Juice: 17,700</li>
              <li>Tamarillo Juice: 10,600</li>
              <li>Ambarella Juice: 16,400</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Link
          to="/login"
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Login
        </Link>
        <Link
          to="/add-order"
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Add Order
        </Link>
        <Link
          to="/add-payment"
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: 'purple',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Add Payment
        </Link>
      </div>
    </div>
  );
};

export default Home;
