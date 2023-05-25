import { Servant } from '../../utils/constants';
import ServantImage from '../ServantImage';
import Cell from './Cell';

interface SelectedTableProps {
    servant: Servant;
    checkGuess: () => boolean;
}

const Row = ({ servant, checkGuess }) => {
    return <tr key={servant.id}>
        <Cell>
            <div className="flex justify-center items-center">
                <ServantImage
                    imageUrl={servant.icon}
                    alt={servant.name}
                />
            </div>
        </Cell>
        {Object.keys(servant).map((key) => {
            if (key === 'id' || key === 'icon') {
                return null;
            }
            return <Cell isRight={checkGuess(key, servant[key])} key={key}>
                {servant[key]}
            </Cell>
        })}
    </tr>;
};

export default Row;