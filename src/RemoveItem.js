import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoveItem = ({ remove }) => {
        return (
            <p><FontAwesomeIcon onClick={ remove } icon={["far", "minus-square"]}/></p>
        )
    }

export default RemoveItem;