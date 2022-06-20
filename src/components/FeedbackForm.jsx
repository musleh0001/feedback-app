import React, { useContext, useState } from "react";

import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

const FeedbackForm = () => {
	const [text, setText] = useState("");
	const [rating, setRating] = useState(10);
	const [btnDisable, setBtnDisable] = useState(true);
	const [message, setMessage] = useState("");
	const { addFeedback } = useContext(FeedbackContext);

	const handleTextChange = (e) => {
		if (text === "") {
			setBtnDisable(true);
			setMessage(null);
		} else if (text !== "" && text.trim().length <= 10) {
			setBtnDisable(true);
			setMessage("Text must be at least 10 characters");
		} else {
			setMessage(null);
			setBtnDisable(false);
		}
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};

			addFeedback(newFeedback);
			setText("");
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={setRating} />
				<div className="input-group">
					<input type="text" placeholder="Write a review" onChange={handleTextChange} value={text} />
					<Button type="submit" isDisabled={btnDisable}>
						Send
					</Button>
				</div>

				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
};

export default FeedbackForm;
