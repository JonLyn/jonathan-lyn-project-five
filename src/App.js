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
      items: []
    }
  }

  // connect to Firebase and get existing and updated data from the database
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {
      const firebaseDataObject = data.val();
      // console.log(firebaseDataObject)

      let deptArray = [];
      let itemArray = [];

      for (let deptKey in firebaseDataObject) {
        // console.log(deptKey);
        // console.log(firebaseDataObject);
        
        // const eachItem = [firebaseDataObject[deptKey]];
        // const formattedDepts = {
        //   dept: deptKey,
        //   items: eachItem
        // };
        // deptArray.push(formattedDepts);

      
        // this.setState({
        //   departments: deptArray
        // })

        // console.log('depos', this.state.departments)
       

        for (let itemKey in firebaseDataObject[deptKey]) {

          const individualItem = firebaseDataObject[deptKey][itemKey];
          
          itemArray.push(individualItem);
          this.setState({
            items: individualItem
          })
          console.log(itemArray);
        }
      }
    })
  }

  render() { 
      return (
          <div className='wrapper'>
            <InputNewItem />
            {
              this.state.departments.map((singleDept, i) => {
                console.log(singleDept);
                return (
                  <ul  key={i}>
                    <li>
                      <p>{singleDept.dept}</p>
                      <p>{singleDept.items}</p>

                    </li>
                    {/* <ShowList 
                      dept={singleDept.dept}
                      items={singleDept.items}
                    /> */}

                  </ul>
                  
                )
              })
            }
            
          </div>
      )
  }
}

export default App;
