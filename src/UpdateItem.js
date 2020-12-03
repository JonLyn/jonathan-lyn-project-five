import { Component } from 'react';
import firebase from "./firebase.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UpdateItem extends Component {

    constructor() {
        super()
        this.state = {
            itemToEdit: '',
            newDept: 'Unknown',
            showDropdown: false
        }
    }

    handleShowDropdown = (e) => {
        e.preventDefault();
        const { item } = this.props;
        let updatedItem = Object.values({ item })
        let showDropdownBool = this.state.showDropdown
        this.setState({
            itemToEdit: updatedItem[0],
            showDropdown: !showDropdownBool
        })
        console.log(showDropdownBool)
    }


    handleDeptUpdate = (e) => {
        const { item } = this.props;
        let updatedItem = Object.values({ item })
        this.setState({
            newDept: e.target.value,
            // itemToEdit: updatedItem[0]
        })
        // console.log('values', Object.values({ item }))
        // console.log(updatedItem[0])
        // console.log(this.state.itemToEdit)
    }

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
            <div>
                <FontAwesomeIcon onClick={this.handleShowDropdown} icon="pen-square" className="edit"/>
                {/* <button onClick={this.handleShowDropdown}>Edit</button> */}
                {
                    (this.state.showDropdown)
                    ? <form>
                    <label htmlFor="location"> Change location: </label>
                    <select name="location" id="location" onChange={this.handleDeptUpdate}>
                        {/* <option value="">Change</option> */}
                        <option value="Unknown">Unknown</option>
                        <option value="Deli">Deli</option>
                        <option value="Meat">Meat</option>
                        <option value="Produce">Produce</option>
                        <option value="Seafood">Seafood</option>
                    </select>
                    <FontAwesomeIcon onClick={this.handleUpdateSubmit} icon="save" className="save"/>      
                </form>
                : null
                }
            </div>
        )
    }
}
export default UpdateItem;



// updateItem = (itemKey, dept) => {
//     const dbRef = firebase.database().ref();
    
    // get new dept name from dropdown and setState 
    // get item name from item array and setState
    // push to firebase under new dept
    // remove old instance
//   }

  // updateItem = (e, dept) => {
  //   this.setState({
  //     newDept: e.target.value
  //   })
  //   const dbRef = firebase.database().ref();
  //   // let completePath = `/${dept[0]}/${itemKey}/`;
  //   const newDepartment = this.state.newDept

  //   dbRef.child(dept).update({newDepartment});
  // }