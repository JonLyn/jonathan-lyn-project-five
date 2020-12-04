import { Component, Fragment } from 'react';

class DepartmentList extends Component {
    render() { 
        return (
            <Fragment>
                <option value="choose location" disabled>Choose location</option>
                <option value="don't know">Don't know</option>
                <option value="deli">Deli</option>
                <option value="meat">Meat</option>
                <option value="produce">Produce</option>
                <option value="seafood">Seafood</option>
            </Fragment>
        )
    }
}

export default DepartmentList;