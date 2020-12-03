import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoveItem = ({ remove }) => {
        return (
            <p><FontAwesomeIcon onClick={ remove } icon="trash-alt"/></p>
        )
    }

export default RemoveItem;