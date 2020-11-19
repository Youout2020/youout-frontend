import React from 'react';

import styles from './UserPage.module.scss';

const ImageBox = ({ name, image, email }) => {
  return (
    <div className={styles.imageBox}>
      <img src={image} alt='user-image' />
      <p>
        {name}
        ({email})
      </p>
    </div>
  );
};

const ContentsBox = ({ boxTitle, contents, loadMore }) => {
  return (
    <div className={styles.contentsBox}>
      <p className={styles.text}>{boxTitle}</p>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <button>
              {content.text}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.moreButton}
        onClick={() => loadMore()}
      >
      more
      </button>
    </div>
  );
};

const UserPage = ({
  image,
  name,
  email,
  histories,
  games,
  navigation: { moreHistories, moreGames },
}) => {
  const nomalizedHistories = histories.map((history) => {
    const { _id: id, game: { name }  } = history;
    return { id, text: name };
  });

  const nomalizedGames = games.map((game) => {
    const { _id: id, name } = game;
    return { id, text: name };
  });

  return (
    <>
      <ImageBox
        name={name}
        image={image}
        email={email}
      />
      <ContentsBox
        boxTitle='내가 플레이한 방'
        contents={nomalizedHistories}
        loadMore={moreHistories}
      />
      <ContentsBox
        boxTitle='내가 만든 방'
        contents={nomalizedGames}
        loadMore={moreGames}
      />
    </>
  );
};

export default UserPage;