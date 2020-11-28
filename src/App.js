import './App.css';
import { Component } from 'react';
import firebase from './firebase.js';
import InputNewItem from './InputNewItem.js';
import ShowList from './ShowList.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      departments: [],
    }
  }

  // connect to Firebase and get existing and updated data from the database
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {
      const firebaseDataObject = data.val();

      let deptArray = [];
      for (let deptKey in firebaseDataObject) {
        const eachItem = firebaseDataObject[deptKey];
        const formattedDepts = {
          dept: deptKey,
          items: {
            eachItem
          }
        };

        deptArray.push(formattedDepts);

        console.log(deptArray)

        this.setState({
          departments: deptArray
        })
      }
    })

    let itemArray = [];
    for (let itemKey in eachItem) {
      const individualItem = eachItem[itemKey]
      itemArray.push(individualItem);
    }
    
  }

    // User input field to enter item to be added to list - class componenent

    // Add item to list button - class component

    // Save item to firebase

    // Render item to list with the following: - class component
        // A completed / not-completed checkbox
        // An empty aisle #/dept input field to be saved to associated item in an array 
        // Remove item from list (but not firebase) button and functionality

    // Mark item as completed functionality - class component

    // Prompt user to enter aisle/dept when marking as complete - function component

    // Sort by aisle #/dept button - class component

  render() { 
      return (
          <div className='wrapper'>
            <InputNewItem />
            {
              this.state.departments.map((dept, i) => {
                console.log(dept);
                return (
                  <ul>
                    <ShowList 
                      key={i}
                      dept={dept.dept}
                      items={itemArray}
                    />
                  </ul>
                  
                )
              })
            }
            
          </div>
      )
  }
}

export default App;
