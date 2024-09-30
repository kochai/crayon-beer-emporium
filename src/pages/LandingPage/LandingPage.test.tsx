import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
    it('renders loading indicator', () => {
        render(<LandingPage/>);
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    })
})