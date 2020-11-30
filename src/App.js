import './App.css';
import { Component } from 'react';
import firebase from './firebase.js';
import InputNewItem from './InputNewItem.js';
// import ShowList from './ShowList.js';
// import RemoveItem from './RemoveItem.js'

class App extends Component {

  constructor() {
    super();
    this.state = { 
      originalDepartments: [],
      departments: [],
      items: [],
      enterItem: ''
    }
  }

  // connect to Firebase and get existing and updated data from the database
  componentDidMount() {

      // console.log(this.state.departments)
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {

      const firebaseDataObject = data.val();

      if (firebaseDataObject === null) {
        this.setState({
          enterItem: 'Enter an item to your list'
        }) 
      } else {
        let deptArray = Object.keys(firebaseDataObject).map((key) => [(key), firebaseDataObject[key]]);

      this.setState({
        departments: deptArray,
        enterItem: ''
      })
      }      
    })
  }
  
  removeItemFromDb = (itemKey, dept) => {
    const dbRef = firebase.database().ref();
    let deptOrAisle = `/${dept[0]}/`;

    dbRef.child( deptOrAisle + itemKey).remove();

    dbRef.on('value', (data) => {
      const firebaseDataObject = data.val();

      if (firebaseDataObject === null) {
        this.setState({
        departments: []
      })
      }

      
    })
  }


  // handleReload = (e) => {
  //   e.preventDefault();
  //   const dbRef = firebase.database().ref();
  //   dbRef.set(this.state.originalDepartments);
  // }

  render() { 
    return (
      <div className='wrapper'>
        <InputNewItem />
        <h2>{this.state.enterItem}</h2>

        {/* <button onClick={this.handleReload}>Load prior list</button> */}
        {
          this.state.departments.map((singleDept, i) => {
            let dept = singleDept;
            let itemsArray = [];
            for (let idKey in singleDept[1]) {
              const itemIds = [idKey, singleDept[1][idKey]]
              itemsArray.push(itemIds)
            }

            console.log(itemsArray)


            return (
              <ul key={i}>
                <li>
                  <p>{singleDept[0]}</p>
                  
                  {
                    itemsArray.map((item) => {
                      return (
                     
                          <div key={item[0]}>
                            
                            <p>{item[1]}</p>
                            
                            <button onClick={ () => { this.removeItemFromDb(item[0], dept) }}>Remove</button>

                          </div>
                            // {/* <RemoveItem 
                            //   item={item[1]}
                            //   remove={ () => { this.removeItem(i) }}
                            // /> */}
                       
                      
                      )
                    })
                  }
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