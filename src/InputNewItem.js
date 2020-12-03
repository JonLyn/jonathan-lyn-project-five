import { Component } from 'react';
import firebase from './firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DepartmentList from './DepartmentList.js';

class InputNewItem extends Component {

    constructor() {
        super();
        this.state = {
            userInput: '',
            dept: 'Unknown',
        }
    }

    handleInputChange = (e) => {
        this.setState({
            userInput: e.target.value
        }) 
    }

    handleDeptChange = (e) => {
        this.setState({
            dept: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let inputted = this.state.userInput
        let itemNotCompletedArray = [false, inputted]
        const dbRef = firebase.database().ref();
        dbRef.child(this.state.dept).push(itemNotCompletedArray);
        this.setState({
            userInput: ''
        })
    }

    render() { 
        return (
            <form onSubmit={(this.state.userInput !== '') ? this.handleSubmit : null} >
                <label htmlFor="newItem">Enter item: </label>
                <input 
                    type="text"
                    id='newItem'
                    value={this.state.userInput}
                    onChange={this.handleInputChange}
                    placeholder="Please enter an item"
                    required
                />
                <label htmlFor="location"> Dept / aisle: </label>
                <select name="location" id="location" onChange={this.handleDeptChange}>
                    <DepartmentList />
                </select>
                <button>
                    <FontAwesomeIcon      
                        icon={["far", "plus-square"]} 
                        type="submit" 
                    />      
                </button>
            </form>
        )
    }
}

export default InputNewItem;