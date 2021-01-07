import { Component } from 'react';
import firebase from './firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DepartmentList from './DepartmentList.js';

class InputNewItem extends Component {

  constructor() {
    super();
    this.state = {
      userInput: '',
      dept: 'choose location',
    }
  }

  // set user input to state
  handleInputChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  // set dept chosen to state
  handleDeptChange = (e) => {
    this.setState({
      dept: e.target.value
    })
  }

  // submit function to send user inputs to firebase
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
        // condition to check if both input and location are chosen
        onSubmit={(this.state.userInput !== '' && this.state.dept !== 'choose location')
          ? this.handleSubmit
          : null}
        className='newItemForm'>
        <div className='itemInput'>
          {/* item input text area */}
          <label htmlFor='newItem'>Item: </label>
          <input
            className='inputField'
            type='text'
            id='newItem'
            value={this.state.userInput}
            onChange={this.handleInputChange}
            placeholder='Enter an item'
            required
          />
        </div>
        <div className='deptInput'>
          {/* location dropdown */}
          <label htmlFor='location'> Dept / aisle: </label>
          <select
            className='selectField'
            name='location' id='location'
            onChange={this.handleDeptChange}
            value={this.state.dept}>
            {/* location selections component */}
            <DepartmentList
              required
            />
          </select>
          {/* button to submit user inputs */}
          <button className='addButton' aria-label='add item to list'>
            <FontAwesomeIcon
              className='icon'
              icon={['far', 'plus-square']}
              type='submit'
            />
            <span className='addText'>Adds</span>
          </button>
        </div>
      </form>
    )
  }
}

export default InputNewItem;