interface HeaderCellProps {
    label: string;
}

const HeaderCell = ({ label }: HeaderCellProps) => {
    return (
        <th className='bg-blackHeader p-1 border border-black'>{label}</th>
    );
};

export default HeaderCell;