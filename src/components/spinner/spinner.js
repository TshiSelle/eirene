import React from 'react';

import './spinner.css';

const getSizeClass = (small, medium, big) => {
  if (big) return 'lds-big';
  if (medium) return 'lds-medium';
  if (small) return 'lds-small';
  return 'lds-medium';
};

// If no size prop is given, this will assume medium.
const Spinner = (props) => {
  const { big, medium, small, noPadding } = props;
  return <div className={`lds-dual-ring ${getSizeClass(small, medium, big)} ${noPadding ? 'no-padding' : ''}`} />;
};

Spinner.defaultProps = {
  noPadding: false
};

export default Spinner;
