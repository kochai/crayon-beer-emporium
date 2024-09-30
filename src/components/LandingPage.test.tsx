import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
    it('renders hello world', () => {
        render(<LandingPage />)
        expect(screen.getByText('Landing Page')).toBeInTheDocument()
    })
})