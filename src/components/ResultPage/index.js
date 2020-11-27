import React from 'react';
import Header from '../Header';
import Button from '../Button';
import PropTypes from 'prop-types';
import style from './ResultPage.module.scss';

const ResultPage = ({ users, renderHome }) => {
  return (
    <Header title='결과'>
      <div className={style.container}>
        <div className={style.title}>기록</div>
        <ul className={style.players}>
          {
            users.map((user) => {
              return (
                <li key={user._id}>
                  <img src={user.image} className={style.userIcon} />
                  {
                    user.isClearUser
                      ? `${user.username} ${user.formattedClearTime} 남기고 탈출 했슴둥!`
                      : `${user.username} 아직 탈출중임둥!`
                  }
                </li>
              );
            })
          }
        </ul>
        <Button
          className='basicButton'
          text='홈으로'
          onClick={renderHome}
        />
      </div>
    </Header>
  );
};

ResultPage.propTypes = {
  users: PropTypes.array.isRequired,
  renderHome: PropTypes.func.isRequired,
};

export default ResultPage;
