import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  it('renders button text', () => {
    const wrapper = mount(<Button text='확인' />);
    expect(wrapper.props().text).toBe('확인');
  });
});