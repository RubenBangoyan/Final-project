import React from 'react';
import { useNavigate } from 'react-router-dom';

const LookingWorkFormStep = () => {
  const navigate = useNavigate();

  navigate('/');
  return (
    <>
      <div>Looking</div>
    </>
  );
};

export default LookingWorkFormStep;
