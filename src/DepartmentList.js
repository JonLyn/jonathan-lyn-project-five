import { Component, Fragment } from 'react';

class DepartmentList extends Component {
    render() { 
        return (
            <Fragment>
                <option value="placeholder" disabled>Choose location</option>
                <option value="Don't know">Don't know</option>
                <option value="Deli">Deli</option>
                <option value="Meat">Meat</option>
                <option value="Produce">Produce</option>
                <option value="Seafood">Seafood</option>
            </Fragment>
        )
    }
}

export default DepartmentList;