import React from 'react';
import Card from './Card';

const Stage = ({ stage, opportunities, addOpportunity }) => {
  const handleAddOpportunity = () => {
    const newOpportunity = prompt('Enter opportunity name:');
    if (newOpportunity) {
      addOpportunity(stage, newOpportunity);
    }
  };

  return (
    <div className="stage">
      <h4>{stage}</h4>
      <button className="add-opportunity" onClick={handleAddOpportunity}>Add Opportunity</button>
      <div>
        {opportunities.map((opp, index) => (
          <Card key={index} name={opp} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
