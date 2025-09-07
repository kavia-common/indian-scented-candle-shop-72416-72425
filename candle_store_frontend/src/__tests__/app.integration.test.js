import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

describe('App layout basics', () => {
  beforeEach(() => resetStorage());

  test('shows header brand and footer text across pages', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText(/Aaranya/i)).toBeInTheDocument();
    expect(screen.getByText(/Crafted in India/i)).toBeInTheDocument();
  });
});
