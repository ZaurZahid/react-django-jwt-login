import React from "react";

const HomePage = ({ registration_message }) => (
  <div className="container">
    {registration_message && (
      <div className="alert alert-info text-center mt-4" role="alert">
        <strong>{registration_message}</strong>
      </div>
    )}
    <h3 className="text-center mt-4">Hello world.</h3>
  </div>
);

export default HomePage;
