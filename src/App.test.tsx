import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('test cases for app',()=>{
    it('render app',()=>{
        render(<App/>)
        expect(screen.getByText('starwar')).toBeInTheDocument()
    })
})