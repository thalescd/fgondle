import TableHeader from './TableHeader';
import Row from './Row';
import { Servant } from '../../utils/constants';

interface SelectedTableProps {
    selectedList: Servant[];
    target: Servant;
}

function Table({ selectedList, target }: SelectedTableProps) {
    const checkGuess = (key: string, value: string | number) => {
        if (target[key] == value) {
            return true;
        }
        return false;
    };

    return (
        <table className='w-full text-white text-shadow text-center text-lg'>
            <colgroup>
                <col width={83}/>
            </colgroup>
            <TableHeader />
            <tbody>
                {selectedList.map((servant) => (
                    <Row key={servant.id} servant={servant} checkGuess={checkGuess} />
                ))}
            </tbody>
        </table>
    );
}

export default Table;
