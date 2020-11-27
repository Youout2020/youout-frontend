import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultPage from './ResultPage';

describe('<ResultPage />', () => {
  const mockStore = jest.fn();
  const mockFn = jest.fn();
  const store = createStore(mockStore);
  const users = [
    {
      _id: 1,
      username: '하지현',
      image: 'src',
      isClearUser: true,
      formattedClearTime: '07:28',
    },
    {
      _id: 2,
      username: '박경우',
      image: 'src',
      isClearUser: false,
      formattedClearTime: '',
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <ResultPage users={users} renderHome={mockFn} />
      </Provider>
    );
  });

  it('should show cleartime when user escaped game', () => {
    wrapper.getByText('하지현 07:28 남기고 탈출 했슴둥!');
  });

  it('should show escape in progress when user is playing game', () => {
    wrapper.getByText('박경우 아직 탈출중임둥!');
  });

  it('should fire onClick event', () => {
    const button = wrapper.getByText('홈으로');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
