import ServantSelection from '../components/ServantSelection';
import React, { useEffect, useState } from 'react';
import ResetButton from '../components/ResetButton';
import SelectionOption from '../components/SelectionOption';
import SelectedTable from '../components/SelectedTable';
import TurnCounter from '../components/TurnCounter';
import styles from '../styles/index.module.css';
import RegionSelection from '../components/RegionSelection';
import { filterServantInfo } from '../utils/utils'
import { Servant, GameState, Region } from '../utils/constants'

export async function getStaticProps() {
  const apiJPUrl: string = "https://api.atlasacademy.io/export/JP/nice_servant_lang_en.json";
  const apiNAUrl: string = "https://api.atlasacademy.io/export/NA/nice_servant.json";

  const getData = async (url: string, region: string): Promise<Servant[]> => {
    console.log(`Getting servant data from ${region}...`);
    const atlasResponse = await fetch(url).then(res => res.json());
    const servants: Servant[] = filterServantInfo(atlasResponse);
    console.log(`Returning servant data from ${region}...`);
    return servants;
  };

  const servantsJp: Servant[] = await getData(apiJPUrl, Region.JP);
  const servantsNa: Servant[] = await getData(apiNAUrl, Region.NA);

  return {
    props: {
      servantsJp,
      servantsNa
    },
    revalidate: 86400
  }
}

function Home({ servantsJp, servantsNa }) {

  const TURN_LIMIT: number = 7;
  const [servants, setServants] = useState<Servant[]>(servantsJp);
  const [selectedServant, setSelectedServant] = useState<Servant | null>(null);
  const [selectedList, setSelectedList] = useState<Servant[]>([]);
  const [target, setTarget] = useState<Servant>();
  const [gameState, setGameState] = useState<number>();
  const [turn, setTurn] = useState<number>(1);
  const [region, setRegion] = useState<string>(Region.JP);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const index: number = Math.floor(Math.random() * servants.length);
    setTarget(servants[index]);
    setGameState(GameState.Playing);
    setSelectedServant(null);
    setSelectedList([]);
    setTurn(1);
  };

  const handleServantSelection = (newSelection: Servant): void => {
    setSelectedServant(newSelection);
    if (!selectedList.includes(newSelection)) {
      setSelectedList([...selectedList, newSelection]);
      if (newSelection.id === target.id) {
        setGameState(GameState.Win);
      } else {
        if (turn === TURN_LIMIT) {
          setGameState(GameState.Lose);
        } else {
          setTurn(turn + 1);
        }
      }
    }
  };

  function handleRegionSelection(event: React.ChangeEvent<HTMLInputElement>): void {
    setRegion(event.target.value);
    setServants(event.target.value === Region.JP ? servantsJp : servantsNa);
    startGame();
  }

  return (
    <div className={`${styles.container} ${styles.text}`}>
      <h1 className={styles.title}>FGOndle</h1>
      <RegionSelection
        selectedValue={region}
        onChange={handleRegionSelection}
      />
      {(() => {
        switch (gameState) {
          case GameState.Win:
            return <span>
              You win
              <ResetButton onClick={startGame} />
            </span>;
          case GameState.Lose:
            return <span>
              You lose, the right answer is <SelectionOption option={target} />
              <ResetButton onClick={startGame} />
            </span>;
          case GameState.Playing:
            return <ServantSelection
              handleServantSelection={handleServantSelection}
              selectedServant={selectedServant}
              servants={servants}
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