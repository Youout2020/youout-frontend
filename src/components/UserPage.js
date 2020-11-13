import React from 'react';

import styles from './UserPage.module.scss';

const UserPage = ({ image, name, email, histories, games }) => {
  return (
    <>
      <div className={styles.imageContainer}>
        <img src={image} alt='user-image'/>
        <p>
          {name}
          ({email})
        </p>
      </div>
      <div className={styles.historiesContainer}>
        <p>내가 플레이한 방</p>
        <ul>
          {histories.map((history) => (
            <li key={history.id}>
              <button>
                {history.name}+{history.clearTime}
              </button>
            </li>
          ))}
        </ul>
        <button>more</button>
      </div>
      <div className={styles.myRoomsContainer}>
        <p>내가 만든 방</p>
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <button>
                {game.name}
              </button>
            </li>
          ))}
        </ul>
        <button>more</button>
      </div>
    </>
  );
};

export default UserPage;
