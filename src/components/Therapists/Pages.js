import Pagination from "react-bootstrap/esm/Pagination";

const Pages = (props) => {
	return (
		<>
			{props.items && (
				<Pagination  onChange={(e) => setpageNumberOption(e.target.value)}>
					{props.items}
				</Pagination>
			)}
		</>
	);
};

export default Pages;
