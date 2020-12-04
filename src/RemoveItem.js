import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoveItem = ({ remove }) => {
        return (
            <button onClick={ remove } aria-label='delete item from list'><FontAwesomeIcon icon={["far", "minus-square"]}/></button>
        )
    }

export default RemoveItem;