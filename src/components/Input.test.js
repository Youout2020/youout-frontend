import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from './Input';

describe('<Input />', () => {
  const mockFn = jest.fn();

  it('should render label and input text', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input type='text' id='1' labelName='주소' name='address' onChange={mockFn} placeholder='address' />
    );

    const label = getByText('주소');
    const input = getByPlaceholderText('address');
    expect(label).toBeInTheDocument;
    expect(input).toBeInTheDocument;
    expect(input).toHaveProperty('type', 'text');
  });
});
