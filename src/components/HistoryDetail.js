import React from 'react';
import style from './HistoryDetail.module.scss';
import {
  convertMsToMinutes,
  convertMsToSeconds,
  convertTimeFormat,
} from '../utils';

const HistoryDetail = ({ historyInfo }) => {
  return (
    <div className={style.container}>
      <h5 className={style.title}>게임 이름</h5>
      <div className={style.gameName}>{historyInfo.game.name}</div>
      <h5 className={style.title}>같이 플레이한 유저들</h5>
      <ul className={style.players}>
        {historyInfo.users.map((user) => {
          const minutes = convertMsToMinutes(user.clearTime);
          const seconds = convertMsToSeconds(user.clearTime);
          const formated = convertTimeFormat(minutes, seconds);

          return (
            <li key={user._id}>
              <img src={user.id.image} />
              {user.id.name}
              {formated} 남기고 탈출 했슴둥!
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryDetail;
