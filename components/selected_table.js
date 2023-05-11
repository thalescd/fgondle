import TableHeader from './table_header';
import styles from '../styles/index.module.css';

function SelectedTable({ selectedList, target }) {
    const checkGuess = (key, value) => {
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
                    <tr key={servant.id}>
                        <td className={`${styles.cell} ${styles.iconCell}`}>
                            <img
                                className={`${styles.servantIcon} ${styles.servantIconCell}`}
                                src={servant.icon}
                                alt={servant.name}
                            />
                        </td>
                        {Object.keys(servant).map((key) => {
                            if (key === 'id' || key === 'icon') {
                                return null;
                            }
                            const isRight = checkGuess(key, servant[key]);
                            return <td
                                className={`${isRight ? styles.right : styles.wrong} ${styles.cell}`}
                                key={key}>{servant[key]}
                            </td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SelectedTable;
