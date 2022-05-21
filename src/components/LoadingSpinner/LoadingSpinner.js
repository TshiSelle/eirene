import React from 'react'
import './loadingSpinner.css'

const LoadingSpinner = (props) => {
	const displayIcon = props.display ? ' ' : ' hide';
  return (
    <div className={"loading loading--full-height"+displayIcon} ></div>
  );
}

export default LoadingSpinner