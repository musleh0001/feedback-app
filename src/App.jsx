import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FeedbackData from "./data/FeedbackData";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

const App = () => {
	const [feedback, setFeedback] = useState(FeedbackData);

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

	return (
		<Router>
			<React.Fragment>
				<Header />
				<div className="container">
					<Routes>
						<Route
							exact
							path="/"
							element={
								<React.Fragment>
									<FeedbackForm handleAdd={addFeedback} />
									<FeedbackStats feedback={feedback} />
									<FeedbackList feedback={feedback} handleDelete={handleDelete} />
								</React.Fragment>
							}
						/>
						<Route path="/about" element={<AboutPage />} />
					</Routes>
				</div>
				<AboutIconLink />
			</React.Fragment>
		</Router>
	);
};

export default App;
