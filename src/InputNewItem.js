import { Component } from 'react';
import firebase from './firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DepartmentList from './DepartmentList.js';

class InputNewItem extends Component {

    constructor() {
        super();
        this.state = {
            userInput: '',
            dept: "don't know",
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
            <form 
                onSubmit={(this.state.userInput !== '' && this.state.dept !== 'choose location') 
                ? this.handleSubmit 
                : null} 
                className='newItemForm'
            >
                <div className='itemInput'>
                    <label htmlFor="newItem">Item: </label>
                    <input 
                        className='inputField'
                        type="text"
                        id='newItem'
                        value={this.state.userInput}
                        onChange={this.handleInputChange}
                        placeholder="Enter an item"
                        required
                    />
                </div>
                <div className='deptInput'>
                    <label htmlFor="location"> Dept / aisle: </label>
                    <select 
                        className='selectField'
                        name="location" id="location" 
                        onChange={this.handleDeptChange} 
                        value={this.state.dept}>
                            <DepartmentList 
                        required    
                    />
                        
                    </select>

                    <button className='addButton' aria-label='add item to list'>
                        <FontAwesomeIcon      
                            icon={["far", "plus-square"]} 
                            type="submit" 
                        />      
                    </button>
                </div>
            </form>
        )
    }
}

export default InputNewItem;