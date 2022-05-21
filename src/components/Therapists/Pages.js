import Pagination from "react-bootstrap/esm/Pagination";

const Pages = (props) => {
	return (
		<>
			{props.items && (
				<Pagination  onChange={(e) => setpageNumberOption(e.target.value)}>
					{props.items}
					{console.log("length = ",props.items.length)}
				</Pagination>
			)}
		</>
	);
};

export default Pages;
