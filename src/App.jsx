import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

const App = () => {
	return (
		<FeedbackProvider>
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
										<FeedbackForm />
										<FeedbackStats />
										<FeedbackList />
									</React.Fragment>
								}
							/>
							<Route path="/about" element={<AboutPage />} />
						</Routes>
					</div>
					<AboutIconLink />
				</React.Fragment>
			</Router>
		</FeedbackProvider>
	);
};

export default App;
