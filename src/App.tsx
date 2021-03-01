import React from 'react';
import './assets/style/page.scss';
import { HomePage } from './pages/home';
import { AppStateProvider } from './utils/context/stores';

function App() {
	return (
		<div className="App">
			<AppStateProvider>
				<HomePage />
			</AppStateProvider>
		</div>
	);
}

export default App;
