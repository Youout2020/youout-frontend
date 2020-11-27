import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card, { Popup } from './Card';

describe('<Card />', () => {
  let utils;
  beforeEach(() => {
    utils = render(<Card gamePhase='keyword' title='title' />);
  });

  it('should show props correctly', () => {
    utils.getByText('keyword');
    utils.getByText('title');
  });
});
