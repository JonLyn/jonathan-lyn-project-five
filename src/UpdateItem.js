import { Component } from 'react';
import firebase from './firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DepartmentList from './DepartmentList.js';

class UpdateItem extends Component {

  constructor() {
    super()
    this.state = {
      itemToEdit: '',
      newDept: "don't know",
      showDropdown: false
    }
  }

  // function to toggle dropdown menu to update location
  handleShowDropdown = (e) => {
    e.preventDefault();
    const { item } = this.props;
    let updatedItem = Object.values({ item })
    let showDropdownBool = this.state.showDropdown
    this.setState({
      itemToEdit: updatedItem[0],
      showDropdown: !showDropdownBool
    })
  }

  // set new location to state
  handleDeptUpdate = (e) => {
    this.setState({
      newDept: e.target.value,
    })
  }

  // function to submit new location of chosen item to firebase
  handleUpdateSubmit = (e) => {
    let deletePath = `/${this.props.dept}/${this.props.itemKey}/`
    e.preventDefault();
    let newInputted = this.state.itemToEdit
    let updatedItemNotCompletedArray = [false, newInputted]
    const dbRef = firebase.database().ref();
    dbRef.child(this.state.newDept).push(updatedItemNotCompletedArray)
    dbRef.child(deletePath).remove()
  }

  render() {
    return (
      <div className='update'>
        {/* edit button */}
        <button onClick={this.handleShowDropdown} className='edit' aria-label='edit department'>
          <FontAwesomeIcon
            className='icon'
            icon={['far', 'edit']}
          />
          <span className='editText'>Edit dept</span>
        </button>
        {/* condition to toggle updated location dropdown render */}
        {
          (this.state.showDropdown)
            ? <form className='dropdownAndSave'>
              <label htmlFor='location' ></label>
              <select name='location' id='location' onChange={this.handleDeptUpdate} className='updateDeptDropdown'>
                <DepartmentList />
              </select>
              <button onClick={this.handleUpdateSubmit} className='save' aria-label='save department change'>
                <FontAwesomeIcon
                  className='icon'
                  icon={['far', 'save']}
                />
                <span className='saveText'>Save</span>
              </button>
            </form>
            : null
        }
      </div>
    )
  }
}
export default UpdateItem;


