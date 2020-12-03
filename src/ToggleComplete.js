
const ToggleComplete = ({ toggle, completed, item }) => {
    return (
        <span >
            <p onClick={ toggle } className={ {completed} ? "done" : "notDone" }>{item}</p> 
           
            
        </span> 
        )
}

export default ToggleComplete;

 
            {/* // <p className="done">{item}</p>: <p className="notDone">{item}> */}
                {/* {
                    ( {completed} )
                    ? <p className="done">{item}</p>
                    : <p className="notDone">{item}</p>
                } 
            </p> */}