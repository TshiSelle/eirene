import React from 'react';
import styled from 'styled-components';
import Spinner from './spinner';

const FullPageSpinner = (props) => (
  <FullPageSpinnerContainer>
    <Spinner big />
  </FullPageSpinnerContainer>);

const FullPageSpinnerContainer = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  font-weight: 700;
  font-size: 1.4em;
`;

export default FullPageSpinner;
