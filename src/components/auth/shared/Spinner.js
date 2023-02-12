import React from "react";
import RingLoader from "react-spinners/RingLoader";

const Spinner = ({size}) => {
	return (
		<>
			<div
				className="w-100 d-flex align-items-center justify-content-center"
				style={{ minHeight: "100vh" }}
			>
				<RingLoader
        color={'#36d7b7'}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
			</div>
		</>
	);
};

export default Spinner;
