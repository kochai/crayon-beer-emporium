import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import BeerCatalogPage from './BeerCatalogPage'

describe('BeerCatalogPage', () => {
    it('renders loading indicator', () => {
        render(<BeerCatalogPage/>);
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    })
})