import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoadingSpinner from './shared/LoadingSpinner';

const BeerCatalogPage = lazy(() => import('./features/beerCatalog/components/BeerCatalogPage'))
const BeerDetailsPage = lazy(() => import('./features/beerDetails/components/BeerDetailsPage'))
const BeerManagementPage = lazy(() => import('./features/beerManagement/components/ManagementView'))

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Suspense fallback={<LoadingSpinner/>}>
                        <BeerCatalogPage/>
                    </Suspense>
                }/>
                <Route path="/beer/:id" element={
                    <Suspense fallback={<LoadingSpinner/>}>
                        <BeerDetailsPage/>
                    </Suspense>
                }/>
                <Route path="/management" element={
                    <Suspense fallback={<LoadingSpinner/>}>
                        <BeerManagementPage/>
                    </Suspense>
                }/>
            </Routes>
        </Router>
    );
}

export default App
