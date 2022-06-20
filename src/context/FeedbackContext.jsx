import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	const fetchFeedback = async () => {
		const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);
		const data = await response.json();
		setFeedback(data);
		setIsLoading(false);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await fetch(`http://localhost:5000/feedback/${id}`, { method: "DELETE" });
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	const addFeedback = async (newFeedback) => {
		const response = await fetch("http://localhost:5000/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFeedback),
		});
		const data = await response.json();

		// newFeedback.id = uuidv4();
		// newFeedback = { ...newFeedback, id: uuidv4() };
		setFeedback([data, ...feedback]);
	};

	// set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	const updateFeedback = async (id, updItem) => {
		const response = await fetch(`http://localhost:5000/feedback/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updItem),
		});
		const data = await response.json();
		setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...data } : item)));
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				handleDelete,
				isLoading,
				addFeedback,
				editFeedback,
				feedbackEdit,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
