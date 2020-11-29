import './App.css';
import { Component } from 'react';
import firebase from './firebase.js';
import InputNewItem from './InputNewItem.js';
// import ShowList from './ShowList.js';

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

      console.log(firebaseDataObject);
      let deptArray = Object.keys(firebaseDataObject).map((key) => [(key), firebaseDataObject[key]]);

      // console.log(deptArray[1])

      // let itemArray = Object.values(deptArray[1])
      // console.log(itemArray);
      // let itemArray = Object.keys(deptArray).map((keys) => [(keys), deptArray[keys]]);
      // console.log('items', itemArray);


      this.setState({
        departments: deptArray
      })
      console.log(this.state.departments)

      // let itemArray = []

      // let itemArray = [];
      // let deptArray = [];
      // for (let deptKey in firebaseDataObject) {

      //   const individualChicken = firebaseDataObject[deptKey];
      //   console.log(individualChicken);
        
      //   const formattedDepts = {
      //     dept: deptKey,
      //     items: [individualChicken]
      //   }
      //   deptArray.push(formattedDepts);

      //   console.log('format', formattedDepts);

      //   this.setState({
      //     departments: testArray
      //   })



        // console.log('state', this.state.departments)
  

        
    //     for (let itemKey in firebaseDataObject[deptKey]) {
    //       console.log('itemkey', itemKey);

    //       const individualItem = firebaseDataObject[deptKey][itemKey];

    //       console.log('for in item', individualItem);
    //       itemArray.push(individualItem);
        
    //       const eachItem = itemArray
    //       console.log(eachItem);
          
          
    //       console.log('depos', this.state.departments)
    //       console.log('items', this.state.items)
    //     }
    //   }
    //   console.log('itemmssss', itemArray);
    //   this.setState({
    //     items: itemArray
    // })
  })
  }

  render() { 
      return (
          <div className='wrapper'>
            <InputNewItem />
            {
              this.state.departments.map((singleDept, i) => {
                return (
                  <ul key={i}>
                    <li>
                      <p>{singleDept[0]}</p>
                      {
                        Object.values(singleDept[1]).map((item, i) => {
                          return (
                            <p key={i}>{item}</p>
                          )
                        })
                      }
                       

                      {/* <p>{singleDept[1]}</p> */}
                        {/* {
                          this.state.items.map((singleItem, index) => {
                            return (
                              <ul key={index}>
                                <li>
                                  <p>{singleItem}</p>
                                </li>
                              </ul>
                            )
                          })
                        } */}
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
