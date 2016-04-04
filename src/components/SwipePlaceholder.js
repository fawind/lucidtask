import React from 'react';
import './swipePlaceholder.css';

const SwipePlaceholder = () => (
  <div className="todoContainer">
    <div className="swipePlaceholder">
      <i className="material-icons" id="done">done</i>
      <span className="hidden">|</span>
      <i className="material-icons" id="clear">clear</i>
    </div>
  </div>
);

export default SwipePlaceholder;
