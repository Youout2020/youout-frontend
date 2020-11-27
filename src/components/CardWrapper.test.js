import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardWrapper from './CardWrapper';

describe('<CardWrapper />', () => {
  const mockSetCardShowing = jest.fn();
  const mockSubmitAnswer = jest.fn();
  const mockSetAnswer = jest.fn();

  it('should show keyword card when game phase is keyword', () => {
    const { getByText } = render(
      <CardWrapper
        keyword='바나나'
        quiz='바나나를 먹은 사람은?'
        gamePhase='keyword'
        userAnswer='바나나'
        resultMessage='정답'
        userAlertList={[]}
        isCardShowing={true}
        onSetCardShowing={mockSetCardShowing}
        onSubmitAnswer={mockSubmitAnswer}
        onSetAnswer={mockSetAnswer}
        recognizedKeywordList={[]}
      />
    );

    getByText('keyword');
  });

  it('should show small keyword card after 3 seconds', async () => {
    jest.useFakeTimers();

    const wrapper = render(
      <CardWrapper
        keyword='바나나'
        quiz='바나나를 먹은 사람은?'
        gamePhase='keyword'
        userAnswer='바나나'
        resultMessage='정답'
        userAlertList={[]}
        isCardShowing={true}
        onSetCardShowing={mockSetCardShowing}
        onSubmitAnswer={mockSubmitAnswer}
        onSetAnswer={mockSetAnswer}
        recognizedKeywordList={[]}
      />
    );

    expect(mockSetCardShowing).toBeCalledTimes(0);
    jest.advanceTimersByTime(3000);
    expect(mockSetCardShowing).toBeCalledTimes(1);
  });
});
