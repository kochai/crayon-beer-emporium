import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1 className="text-3xl font-bold underline">Craft Beer Emporium</h1>
                </header>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App
