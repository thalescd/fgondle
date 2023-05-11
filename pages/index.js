import Select from 'react-select'
import React, { useEffect, useState } from 'react';
import styles from './index.module.css'

export async function getStaticProps() {
  const apiUrl = "https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json";

  const toNormalCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, function (str) { return str.toUpperCase(); });
  };

  const getStarRating = (num) => {
    let stars = '';
    for (let i = 0; i < num; i++) {
      stars += '★';
    }
    return stars;
  };

  const filterServantInfo = (fullData) => {
    let newData = [];
    for (let i in fullData) {
      try {
        let id = fullData[i]["collectionNo"];
        let name = fullData[i]["name"];
        let className = toNormalCase(fullData[i]["className"]);
        let npType = toNormalCase(fullData[i]["noblePhantasms"][0]["card"]);
        let npTarget;
        let rarity = getStarRating(fullData[i]["rarity"]);
        let gender = toNormalCase(fullData[i]["gender"]);
        let icon = fullData[i]["extraAssets"]["faces"]["ascension"][1];

        if (typeof icon === "undefined") {
          throw new Error("No icon");
        }
        switch (fullData[i]["noblePhantasms"][0]["effectFlags"]["0"]) {
          case "attackEnemyOne":
            npTarget = "Single Target";
            break;
          case "attackEnemyAll":
            npTarget = "AoE";
            break;
          case "support":
            npTarget = "No Traget";
            break;
        }
        let data = {
          "id": id,
          "name": name,
          "class": className,
          "npType": npType,
          "npTarget": npTarget,
          "rarity": rarity,
          "gender": gender,
          "icon": icon,
        };
        newData.push(data);
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    newData.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    return newData;
  };

  console.log("Getting servant data...");
  const atlasResponse = await fetch(apiUrl).then(res => res.json());
  console.log("Servants data acquired!");
  const servants = filterServantInfo(atlasResponse);
  console.log("Servants data filtered!");
  return {
    props: { servants },
    revalidate: 86400
  }
}

function Home({ servants }) {

  const GAMESTATE = {
    WIN: 1,
    LOSE: 2,
    PLAYING: 3,
  };

  const limitTurns = 7;
  const [selected, setSelected] = useState([]);
  const [target, setTarget] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [turn, setTurn] = useState([]);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const index = Math.floor(Math.random() * servants.length);
    setTarget(servants[index]);
    setGameState(GAMESTATE.PLAYING);
    setSelected([]);
    setTurn(1);
  };

  const customOption = (servant) => (
    <div className={`${styles.selection}`}>
      <img className={`${styles.servantIcon} ${styles.servantIconSelection}`} src={servant.icon} alt="Icon" />
      <span>{servant.name}</span>
    </div>
  );

  const addSelected = (newSelection) => {
    if (!selected.includes(newSelection)) {
      setSelected([...selected, newSelection]);
    }
  };

  const handleSelection = (newSelection) => {
    addSelected(newSelection);
    if (newSelection.id == target.id) {
      setGameState(GAMESTATE.WIN);
    } else {
      if (turn == limitTurns) {
        setGameState(GAMESTATE.LOSE);
      } else {
        setTurn(turn + 1);
      }
    }
  };

  const checkGuess = (key, value) => {
    if (target[key] == value) {
      return true;
    }
    return false;
  };

  const resetButton = () => (
    <button onClick={startGame}>Play again</button>
  );

  return (
    <div className={`${styles.container} ${styles.text}`}>
      <span>Turn {turn}/{limitTurns}</span>;
      {(() => {
        switch (gameState) {
          case GAMESTATE.WIN:
            return <span>You win {resetButton()}</span>;
          case GAMESTATE.LOSE:
            return <span>You lose, the right answer was {customOption(target)} {resetButton()}</span>;
          case GAMESTATE.PLAYING:
            return <Select
              placeholder={"Select a servant..."}
              options={servants}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              formatOptionLabel={customOption}
              onChange={handleSelection}
            />;
        }
      })()}
      <table>
        <thead>
          <tr>
            <th className={`${styles.cell} ${styles.headerCell}`}>Icon</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>Name</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>Class</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>NP Type</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>NP Target</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>Rarity</th>
            <th className={`${styles.cell} ${styles.headerCell}`}>Gender</th>
          </tr>
        </thead>
        <tbody>
          {[...selected].reverse().map((servant) => (
            <tr key={servant.id}>
              <td className={`${styles.cell} ${styles.iconCell}`}>
                <img className={`${styles.servantIcon} ${styles.servantIconCell}`} src={servant.icon} alt={servant.name} />
              </td>
              {Object.keys(servant).map((key) => {
                if (key === 'id' || key === 'icon') {
                  return null;
                }
                const isRight = checkGuess(key, servant[key]);
                return <td className={`${isRight ? styles.right : styles.wrong} ${styles.cell}`} key={key}>{servant[key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;