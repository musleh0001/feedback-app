import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			rating: 10,
			text: "This is feedback item 1 coming from the backend",
		},
		{
			id: 2,
			rating: 8,
			text: "This is feedback item 2 coming from the backend",
		},
		{
			text: "This is feedback item 3 coming from the backend",
			rating: 10,
			id: 3,
		},
	]);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	const addFeedback = (newFeedback) => {
		// newFeedback.id = uuidv4();
		newFeedback = { ...newFeedback, id: uuidv4() };
		setFeedback([newFeedback, ...feedback]);
	};

	return <FeedbackContext.Provider value={{ feedback, handleDelete, addFeedback }}>{children}</FeedbackContext.Provider>;
};

export default FeedbackContext;
