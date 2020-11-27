import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  // it('should change input values', () => {
  //   const { getByPlaceholderText } = render(
  //     <Input type='text' id='1' value='' onChange={mockFn} labelName='주소' name='address' placeholder='address' />
  //   );

  //   const input = getByPlaceholderText('address');
  //   fireEvent.change(input, {
  //     target: {
  //       value: '강남구 대치동',
  //     }
  //   });
  //   expect(input).toHaveAttribute('강남구 대치동');
  // });
});
