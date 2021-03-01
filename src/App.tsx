import React from 'react';
import './assets/style/page.scss';
import { HomePage } from './pages/home';
import { AppStateProvider } from './utils/context/stores';
import ErrorBoundary from './utils/error-boundary';

function App() {
	return (
		<div className="App">
			<AppStateProvider>
				<ErrorBoundary>
					<HomePage />
				</ErrorBoundary>
			</AppStateProvider>
		</div>
	);
}

export default App;
