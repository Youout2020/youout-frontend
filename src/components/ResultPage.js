import React from 'react';
import Header from './Header';
import Button from './Button';
import {
  convertMsToMinutes,
  convertMsToSeconds,
  convertTimeFormat,
} from '../utils';
import style from './ResultPage.module.scss';

const ResultPage = ({ users, gameInfo, renderHome }) => {
  return (
    <Header title='결과'>
      <div className={style.container}>
        <div className={style.title}>기록</div>
        <ul className={style.players}>
          {users.map((user) => {
            const minutes = convertMsToMinutes(user.clearTime);
            const seconds = convertMsToSeconds(user.clearTime);
            const formated = convertTimeFormat(minutes, seconds);
              console.log(user);
            return (
              <li key={user._id}>
                <img src={user.image} className={style.userIcon} />
                {Number.isNaN(minutes)
                  ? `${user.username} 아직 탈충중임둥!`
                  : `${user.username} ${formated} 남기고 탈출 했슴둥!`}
              </li>
            );
          })}
        </ul>
        <Button text='홈으로' onClick={renderHome} />
      </div>
    </Header>
  );
};

export default ResultPage;
