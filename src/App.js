import './App.scss';
import { Component } from 'react';
import firebase from './firebase.js';
import InputNewItem from './InputNewItem.js';
// import ShowList from './ShowList.js';
import RemoveItem from './RemoveItem.js';
// import ToggleComplete from './ToggleComplete.js';
import UpdateItem from './UpdateItem.js';

// import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faPenSquare, faSave, faTrashAlt, faCheckSquare, faSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { faEdit as farEdit, faSave as farSave, faTrashAlt as farTrashAlt, faCheckSquare as farCheckSquare, faSquare as farSquare, faPlusSquare as farPlusSquare, faMinusSquare as farMinusSquare } from '@fortawesome/free-regular-svg-icons'




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(farEdit, farSave, farTrashAlt, farCheckSquare, farSquare, farPlusSquare, farMinusSquare);


class App extends Component {

  constructor() {
    super();
    this.state = { 
      departments: [],
      enterItem: '',
      newDept: ''
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

  markCompleted = (itemKey, dept, bool) => {
    const dbRef = firebase.database().ref();
    let completePath = `/${dept[0]}/${itemKey}/`;
    if (bool === false) {
      dbRef.child(completePath).update({0: true});
    } else {
      dbRef.child(completePath).update({0: false});
    }
  }

  render() { 
    return (
      <div className='wrapper'>
        <InputNewItem />
        <h2>{this.state.enterItem}</h2>
        {
          this.state.departments.map((singleDept, i) => {
            let dept = singleDept;
            let itemsArray = [];
            let completed = []
            for (let idKey in singleDept[1]) {
              const itemIds = [idKey, singleDept[1][idKey]];
              itemsArray.push(itemIds);
              completed.push(singleDept[1][idKey][0]);
            } 
            return (
              <div key={i}>
                <ul>
                  <li>
                    <p>{singleDept[0]}</p>
                      {
                        itemsArray.map((item, index) => {
                          return (
                            <ul key={item[0]}>
                              <li>
                                <div className="item"onClick={ () => { this.markCompleted(item[0], dept, item[1][0]) }}>
                                  <FontAwesomeIcon icon={ (completed[index]) ? ["far", "check-square"] : ["far", "square"] }/>
                                    <p className={ (completed[index]) ? "done" : "notDone" }>
                                      {item[1]}
                                    </p>
                                </div>
                            
                              <RemoveItem         
                                remove={ () => {
                                  this.removeItemFromDb(item[0], dept) 
                                }}
                              />
                            
                              <UpdateItem
                                item={item[1][1]}
                                itemKey={item[0]} 
                                dept={dept[0]}
                              />
                                </li>
                              </ul>
                          )
                        })
                      }
                  </li>
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;

          // console.log(dept[1])
                                // console.log(Object.keys(dept[1]))
                                // console.log('itemkey', item[0])
                                // console.log('dept', dept)




{/* return (
            this.state.departments.forEach((dept) => {
              // console.log(dept[0]);
              // console.log('dept1', dept[1]);
              for (let product in dept[1]) {
                console.log(dept[1][product]);
                
                dept[1][product].map((item) => {
                  // console.log('item equals', item)
                  <ul key={'test'}>
                    <li>
                      <p>hello</p>
                    </li>
                  </ul>
                })


                }
              })
          ) */}



           // {/* <RemoveItem 
                            //   item={item[1]}
                            //   remove={ () => { this.removeItem(i) }}
                            // /> */}




       {/* <ShowList 
                  dept={singleDept.dept}
                  items={singleDept.items}
                /> */}


                // <label htmlFor="location"> Department or aisle: </label>
                //               <select name="location" id="location" onChange={ (e) => {this.updateItem(e, dept)} }>
                //                   <option value="Unknown">Unknown</option>
                //                   <option value="Deli">Deli</option>
                //                   <option value="Meat">Meat</option>
                //                   <option value="Produce">Produce</option>
                //                   <option value="Seafood">Seafood</option>
                //               </select>

                    {/* <ToggleComplete 
                                  // onClick={ () => { this.markCompleted(item[0], dept, item[1][0]) } }
                                  // toggle={ () => { this.markCompleted(item[0], dept, item[1][0]) }}  
                                  // completedIndexArray={completed[index]}
                                  // item={item[1]}
                                  /> */}
                              {/* {
                                (completed[index])
                                ? <p className="done">{item[1]}</p>
                                : <p className="notDone">{item[1]}</p>
                              }  */}