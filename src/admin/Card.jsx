// Card.js
import React from 'react';
import '../styles/pipeline.css'; // Ensure the CSS file is correctly linked

const Card = ({ name }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
