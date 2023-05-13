import Select from 'react-select'
import React, { useEffect, useState } from 'react';
import ResetButton from '../components/ResetButton';
import SelectionOption from '../components/SelectionOption';
import SelectedTable from '../components/SelectedTable';
import TurnCounter from '../components/TurnCounter';
import styles from '../styles/index.module.css';
import RegionSelection from '../components/RegionSelection';

export async function getStaticProps() {
  const apiJPUrl = "https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json";
  const apiNAUrl = "https://api.atlasacademy.io/export/NA/nice_servant.json";

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

  const getData = async (url, region) => {
    console.log(`Getting servant data from ${region}...`);
    const atlasResponse = await fetch(url).then(res => res.json());
    const servants = filterServantInfo(atlasResponse);
    console.log(`Returning servant data from ${region}...`);
    return servants;
  }

  const servantsJp = await getData(apiJPUrl, "JP");
  const servantsNa = await getData(apiNAUrl, "NA");

  return {
    props: {
      servantsJp,
      servantsNa
    },
    revalidate: 86400
  }
}

function Home({ servantsJp, servantsNa }) {

  const GAMESTATE = {
    WIN: 1,
    LOSE: 2,
    PLAYING: 3,
  };

  const TURN_LIMIT = 7;
  const [servants, setServants] = useState(servantsJp);
  const [selectedServant, setSelectedServant] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [target, setTarget] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [turn, setTurn] = useState([]);
  const [region, setRegion] = useState("JP");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const index = Math.floor(Math.random() * servants.length);
    setTarget(servants[index]);
    setGameState(GAMESTATE.PLAYING);
    setSelectedServant(null);
    setSelectedList([]);
    setTurn(1);
  };

  const handleServantSelection = (newSelection) => {
    setSelectedServant(newSelection);
    if (!selectedList.includes(newSelection)) {
      setSelectedList([...selectedList, newSelection]);
      if (newSelection.id == target.id) {
        setGameState(GAMESTATE.WIN);
      } else {
        if (turn == TURN_LIMIT) {
          setGameState(GAMESTATE.LOSE);
        } else {
          setTurn(turn + 1);
        }
      }
    }
  };

  function handleRegionSelection(event) {
    setRegion(event.target.value);
    setServants(event.target.value === "JP" ? servantsJp : servantsNa);
    startGame();
  }

  const formatOptionLabel = ({ name, icon }) => (
    <SelectionOption option={{ name, icon }} />
  );

  return (
    <div className={`${styles.container} ${styles.text}`}>
      <h1 className={styles.title}>FGOndle</h1>
      <RegionSelection
        selectedValue={region}
        onChange={handleRegionSelection}
      />
      {(() => {
        switch (gameState) {
          case GAMESTATE.WIN:
            return <span>
              You win
              <ResetButton onClick={startGame} />
            </span>;
          case GAMESTATE.LOSE:
            return <span>
              You lose, the right answer is <SelectionOption option={target} />
              <ResetButton onClick={startGame} />
            </span>;
          case GAMESTATE.PLAYING:
            return <Select
              placeholder={"Select a servant..."}
              options={servants}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              formatOptionLabel={formatOptionLabel}
              onChange={handleServantSelection}
              value={selectedServant}
            />;
        }
      })()}
      <TurnCounter turn={turn} limitTurns={TURN_LIMIT} />
      <SelectedTable
        selectedList={[...selectedList].reverse()}
        target={target}
      />
    </div>
  );
};

export default Home;