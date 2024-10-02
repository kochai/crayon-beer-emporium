import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import {MemoryRouter} from 'react-router-dom';
import BeerCatalogPage from './BeerCatalogPage'

describe('BeerCatalogPage', () => {
    it('renders loading indicator', () => {
        render(
            <MemoryRouter>
                <BeerCatalogPage/>
            </MemoryRouter>
        );
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    })
})