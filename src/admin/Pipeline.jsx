import React, { useState } from 'react';
import Stage from './Stage';
import '../styles/pipeline.css'; 

const Pipeline = () => {
  const [opportunities, setOpportunities] = useState({
    leadGeneration: [],
    qualification: [],
    proposal: [],
    negotiation: [],
    closed: [],
  });

  // Hardcoded stage IDs for each stage
  const stageIds = {
    leadGeneration: 1,
    qualification: 2,
    proposal: 3,
    negotiation: 4,
    closed: 5,
  };

  const addOpportunity = async (stage, opportunityName) => {
    const requestBody = {
      stageId: stageIds[stage], // Get the stageId from the hardcoded values
      stage: stage,
      opportunityName: opportunityName,
      description: 'Opportunity description here', // You can customize this
      // createdAt is not included as it will be handled by the API
    };

    try {
      debugger;
      const response = await fetch('https://localhost:7294/API/AddOpportunity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Log the response for debugging

      // Update local state with the new opportunity
      setOpportunities((prev) => ({
        ...prev,
        [stage]: [...prev[stage], opportunityName],
      }));
    } catch (error) {
      console.error('Error adding opportunity:', error);
    }
  };

  return (
    <div className="pipeline">
      {Object.keys(opportunities).map((stage) => (
        <Stage key={stage} stage={stage} opportunities={opportunities[stage]} addOpportunity={addOpportunity} />
      ))}
    </div>
  );
};

export default Pipeline;
