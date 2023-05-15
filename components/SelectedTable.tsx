import React from 'react';
import TableHeader from './TableHeader';
import SelectedRow from './SelectedRow';
import { Servant } from '../utils/constants';

interface SelectedTableProps {
    selectedList: Servant[];
    target: Servant;
}

function SelectedTable({ selectedList, target }: SelectedTableProps) {
    const checkGuess = (key: string, value: string | number) => {
        if (target[key] == value) {
            return true;
        }
        return false;
    };

    return (
        <table>
            <TableHeader />
            <tbody>
                {selectedList.map((servant) => (
                    <SelectedRow servant={servant} checkGuess={checkGuess} />
                ))}
            </tbody>
        </table>
    );
}

export default SelectedTable;
