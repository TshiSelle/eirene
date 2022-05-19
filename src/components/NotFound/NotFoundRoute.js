import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundRoute = () => {
	return (
		<>
			<CenterText>
				<h2>Woops! Looks like you're lost.</h2>
				<h1>
					Try heading back to <Link to={'/'}>homepage.</Link>
				</h1>
			</CenterText>
		</>
	);
};

const CenterText = styled.div`
	text-align: center;
	padding: 50px
`;

export default NotFoundRoute;
