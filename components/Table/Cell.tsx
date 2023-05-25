import { PropsWithChildren } from "react"

export default function Cell(props: PropsWithChildren<{ isRight?: boolean }>) {
    const { isRight } = props;
    const isRightClass = isRight === true ? 'bg-greenRight' : isRight === false ? 'bg-redWrong' : '';
    const cellClassName = `border border-black`;

    return (
        <td className={`${isRightClass} ${cellClassName}`}>

            {props.children}

        </td>
    );
}