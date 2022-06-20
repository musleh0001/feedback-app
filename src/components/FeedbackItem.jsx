import { useContext } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import FeedbackContext from "../context/FeedbackContext";

import Card from "./shared/Card";

const FeedbackItem = ({ item }) => {
	const { handleDelete } = useContext(FeedbackContext);

	return (
		<Card>
			<div className="num-display">{item.rating}</div>
			<button onClick={() => handleDelete(item.id)} className="close">
				<FaTimes color="purple" />
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	);
};

export default FeedbackItem;

FeedbackItem.propTypes = {
	item: PropTypes.object.isRequired,
};
