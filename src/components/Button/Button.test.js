import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './index';

describe('<Button />', () => {
  const mockFn = jest.fn();
  let utils;
  beforeEach(() => {
    utils = render(<Button text='confirm' onClick={mockFn} />);
  });

  it('should show props correctly', () => {
    utils.getByText('confirm');
  });

  it('should fire onClick event', () => {
    const button = utils.getByText('confirm');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
