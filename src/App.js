import './App.scss';
import { Component } from 'react';
import firebase from './firebase.js';
import InputNewItem from './InputNewItem.js';
import RemoveItem from './RemoveItem.js';
import UpdateItem from './UpdateItem.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit as farEdit, faSave as farSave, faTrashAlt as farTrashAlt, faCheckSquare as farCheckSquare, faSquare as farSquare, faPlusSquare as farPlusSquare, faMinusSquare as farMinusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(farEdit, farSave, farTrashAlt, farCheckSquare, farSquare, farPlusSquare, farMinusSquare);

class App extends Component {

  constructor() {
    super();
    this.state = { 
      departments: [],
      enterItemError: '',
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
          enterItemError: 'Enter an item to your list'
        }) 
      } else {
        let deptArray = Object.keys(firebaseDataObject).map((key) => {
          return [(key), firebaseDataObject[key]];
        })
        this.setState({
          departments: deptArray,
          enterItemError: ''
        })
      }
    })
  }

  // function to remove item
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

  // function to toggle item completed
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
      <div className='contentWrapper'>
        {/* header section */}
        <header>
          <h1>Aisle <span className='attack'>Attack!</span></h1>
          <h2>A grocery list that stores the location of the stuff you want</h2>
        </header>
        {/* main content */}
        <main >
          {/* item input fields component */}
          <InputNewItem />
          <section className='wrapper'>
            {/* message when no items on list */}
            <h2 className='noItemErrorMsg'>{this.state.enterItemError}</h2> 
            {/* loop through items and location to render to screen */}
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
                    <ul className='itemsList'>
                      <li>
                        {/* show dept/aisle name */}
                        <h3 className='location'>{singleDept[0]}</h3>
                          {
                            itemsArray.map((item, index) => {
                              return (
                                <ul key={item[0]} >
                                  <li className='addedItem'>
                                    {/* edit dept component */}
                                    <UpdateItem
                                      item={item[1][1]}
                                      itemKey={item[0]} 
                                      dept={dept[0]}
                                    />
                                    <div className='itemWrapper'>
                                      {/* call function to toggle completed or not */}
                                      <div 
                                      className='itemAndCheck' 
                                      onClick={ () => { this.markCompleted(item[0], dept, item[1][0]) }}>
                                      {/* conditional to toggle checked or not checked */}
                                      <button aria-label='toggle completed'>
                                        <FontAwesomeIcon 
                                          className='icon'
                                          icon={ (completed[index]) 
                                          ? ['far', 'check-square'] 
                                          : ['far', 'square'] 
                                        }/>
                                      </button>
                                      {/* conditional to toggle completed or not styling on item */}
                                      <p 
                                        className={ (completed[index]) 
                                        ? 'done' 
                                        : 'notDone' 
                                      }>
                                        {item[1]}
                                      </p>
                                    </div>
                                  </div>
                                    
                                
                                    <RemoveItem         
                                      remove={ () => {
                                        this.removeItemFromDb(item[0], dept) 
                                      }}
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
          </section>
        </main>
        {/* footer section */}
        <footer>
          Crafted by <a href='www.jonraftsode.com'>jonCraftsCode</a> at <a href='www.junocollege.com'>Juno college</a>
        </footer>
      </div>
    )
  }
}

export default App;
