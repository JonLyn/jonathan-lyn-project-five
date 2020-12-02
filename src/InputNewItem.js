import { Component } from 'react';
import firebase from './firebase.js';

class InputNewItem extends Component {

    constructor() {
        super();
        this.state = {
            userInput: '',
            dept: 'Unknown'
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
            <form>
                <label htmlFor="newItem">Enter new item to list: </label>
                <input 
                    type="text"
                    id='newItem'
                    value={this.state.userInput}
                    onChange={this.handleInputChange}
                />
                <label htmlFor="location"> Department or aisle: </label>
                <select name="location" id="location" onChange={this.handleDeptChange}>
                    <option value="Unknown">Unknown</option>
                    <option value="Deli">Deli</option>
                    <option value="Meat">Meat</option>
                    <option value="Produce">Produce</option>
                    <option value="Seafood">Seafood</option>
                </select>
                <button onClick={this.handleSubmit}>Add item</button>      
            </form>
        )
    }
}

export default InputNewItem;