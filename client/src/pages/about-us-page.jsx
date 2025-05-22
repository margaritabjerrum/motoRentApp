import React from 'react';
import FaqAccordion from '../components/faq-acordion';

const AboutUs = () => {
  return (
    <div className="container py-5 mt-5 pt-4">
      <h1 className="text-center mb-4">About Us</h1>

      <div className="mb-4">
        <p className="lead">
          Welcome to <strong>RideShare Moto</strong> — your community-driven
          motorcycle rental platform.
        </p>
        <p>
          Whether you're a seasoned rider looking to explore a new city or
          someone who simply wants to enjoy a day on two wheels, our platform
          allows you to{' '}
          <strong>browse a wide selection of available motorcycles</strong>{' '}
          posted by owners from your area.
        </p>
      </div>

      <div className="mb-4">
        <h4>Want to Rent a Bike?</h4>
        <p>
          Once you've found a motorcycle you're interested in, simply click the{' '}
          <strong>"Contact the Owner"</strong> button and fill out a short form
          to send your rental inquiry. It's quick, easy, and gets you directly
          in touch with the owner.
        </p>
      </div>

      <div className="mb-4">
        <h4>Own a Bike? List It!</h4>
        <p>
          Got a bike sitting in the garage? Let it earn for you. Just click on{' '}
          <strong>"Add New Bike"</strong> in the navigation, fill in the
          motorcycle details, and post it on the platform. Riders will be able
          to see your listing and contact you directly.
        </p>
      </div>

      <div className="text-center">
        <p className="text-muted">
          Ride safe. Share the thrill. Powered by your community.
        </p>
      </div>
      <FaqAccordion />
    </div>
  );
};

export default AboutUs;
