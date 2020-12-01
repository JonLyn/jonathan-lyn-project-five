import './App.scss';
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
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {

      const firebaseDataObject = data.val();

      if (firebaseDataObject === null) {
        this.setState({
          enterItem: 'Enter an item to your list'
        }) 
      } else {
        let deptArray = Object.keys(firebaseDataObject).map((key) => {
          return [(key), firebaseDataObject[key]];
        })
        
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

    console.log(itemKey)

    dbRef.child(deptOrAisle + itemKey).remove();

    dbRef.on('value', (data) => {
      const firebaseDataObject = data.val();

      if (firebaseDataObject === null) {
        this.setState({
        departments: []
      })
      }
    })
  }

  markCompleted = (itemKey, dept) => {
    const dbRef = firebase.database().ref();
    let completePath = `/${dept[0]}/${itemKey}/`;

    dbRef.child(completePath).update({0: true});

  }



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

                            <button onClick={ () => { this.markCompleted(item[0], dept) } }>Complete</button>

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
