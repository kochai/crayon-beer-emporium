import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Header from './Header';

function MockChildComponent() {
    return <div>Child Element</div>;
}

describe('Header', () => {
    it('renders header with proper text and child component', () => {
        render(<Header text='Sample Header Text'>
            <MockChildComponent />
        </Header>);
        expect(screen.getByText('Sample Header Text')).toBeInTheDocument();
        expect(screen.getByText('Child Element')).toBeInTheDocument();
    })
})