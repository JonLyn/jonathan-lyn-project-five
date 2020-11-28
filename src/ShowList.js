const ShowList = ({ dept, itemArray }) => {
    return (
        <li className="listItem">
            <h2>{dept}</h2>
            <p>{items}</p>
        </li>
    )
}

export default ShowList;