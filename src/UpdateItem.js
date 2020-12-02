import { Component } from 'react';
import firebase from "./firebase.js";

class UpdateItem extends Component {

    constructor() {
        super()
        this.state = {
            itemToEdit: '',
            newDept: 'Unknown',
            oldDept: ''
        }
    }


    handleDeptUpdate = (e) => {
        const { item } = this.props;
        let updatedItem = Object.values({ item })
        this.setState({
            newDept: e.target.value,
            itemToEdit: updatedItem[0]
        })
        // console.log('values', Object.values({ item }))
        // console.log(updatedItem[0])
        // console.log(this.state.itemToEdit)
    }

    handleUpdateSubmit = (e) => {
        // const { dept, itemKey } = this.props
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
            <form>
                <label htmlFor="location"> Change location: </label>
                <select name="location" id="location" onChange={this.handleDeptUpdate}>
                    <option value="Unknown">Unknown</option>
                    <option value="Deli">Deli</option>
                    <option value="Meat">Meat</option>
                    <option value="Produce">Produce</option>
                    <option value="Seafood">Seafood</option>
                </select>
                <button onClick={this.handleUpdateSubmit}>Save</button>      
            </form>
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