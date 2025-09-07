import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders, resetStorage } from './test-utils';

describe('Products browse, search and filters', () => {
  beforeEach(() => resetStorage());

  test('renders initial product grid with count', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText(/Candles/i)).toBeInTheDocument();
    // 6 products in mock data
    expect(screen.getByText(/6 products/i)).toBeInTheDocument();
  });

  test('search narrows results', () => {
    renderWithProviders(<App />, { route: '/' });
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'jasmine' } });

    // Monsoon Jasmine should be found
    expect(screen.getByText(/Monsoon Jasmine/i)).toBeInTheDocument();
    // Some not matching may disappear like Masala Chai
    expect(screen.queryByText(/Masala Chai Glow/i)).not.toBeInTheDocument();

    // Count should update
    expect(screen.getByText(/1 products?/i)).toBeInTheDocument();
  });

  test('filter by scent and size updates list', () => {
    renderWithProviders(<App />, { route: '/' });

    const filters = screen.getByLabelText(/Product filters/i);
    const jasmineCb = within(filters).getByLabelText(/Jasmine/);
    fireEvent.click(jasmineCb);

    // Now only products with Jasmine remain (Monsoon Jasmine)
    expect(screen.getByText(/Monsoon Jasmine/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sandalwood Serenity/i)).not.toBeInTheDocument();

    // Also filter by size Large (Monsoon Jasmine supports Medium, Large so still visible)
    const largeCb = within(filters).getByLabelText(/Large/);
    fireEvent.click(largeCb);

    expect(screen.getByText(/Monsoon Jasmine/i)).toBeInTheDocument();
  });

  test('price filter range affects results', () => {
    renderWithProviders(<App />, { route: '/' });

    const filters = screen.getByLabelText(/Product filters/i);
    const under20 = within(filters).getByLabelText(/Under \$20/i);
    fireEvent.click(under20);

    // Under $20: products priced < 20: Sandalwood 19.99, Masala Chai 17.0, Mango Lassi 18.5
    expect(screen.getByText(/Sandalwood Serenity/i)).toBeInTheDocument();
    expect(screen.getByText(/Masala Chai Glow/i)).toBeInTheDocument();
    expect(screen.getByText(/Mango Lassi Delight/i)).toBeInTheDocument();
    // Example above $20 disappears
    expect(screen.queryByText(/Monsoon Jasmine/i)).not.toBeInTheDocument();
  });
});
