import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// remove item button
const RemoveItem = ({ remove }) => {
        return (
            <button onClick={ remove } aria-label='delete item from list' className='removeButton'>
                <FontAwesomeIcon 
                    className='icon'
                    icon={['far', 'minus-square']}
                />
                <span className='removeText'>Delete</span>
            </button>
        )
    }

export default RemoveItem;