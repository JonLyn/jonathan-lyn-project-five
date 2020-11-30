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
      departments: [],
      items: []
    }
  }

  removeItem = (keyOfItemToDelete) => {

    console.log(keyOfItemToDelete)

    const copyOfItemsArray = [this.state.items]
    console.log(copyOfItemsArray)

    copyOfItemsArray[0].forEach((itemKey) => {
      console.log('each key', itemKey)
      if (itemKey[0] === keyOfItemToDelete) {
        console.log('yes')
        const itemsLeft = itemKey.filter((item, index) => {
          return itemKey === index
        })
        console.log('itemsleft', itemsLeft)
        this.setState({
          items: itemsLeft
        })
      }
    })
    
  }  





  // connect to Firebase and get existing and updated data from the database
  componentDidMount() {

      // console.log(this.state.departments)
    const dbRef = firebase.database().ref();

    dbRef.on('value', (data) => {
      const firebaseDataObject = data.val();

      // console.log(firebaseDataObject);
      let deptArray = Object.keys(firebaseDataObject).map((key) => [(key), firebaseDataObject[key]]);

      // console.log('depo array', deptArray)

      this.setState({
        departments: deptArray
      })

      console.log(this.state.departments)

      let itemAndKeyArray = [];
      this.state.departments.map((singleDept) => {
        for (let idKey in singleDept[1]) {
          const itemIds = [idKey, singleDept[1][idKey]]
          itemAndKeyArray.push(itemIds)
        }
        this.setState({
          items: itemAndKeyArray
        })
        console.log(this.state.items)
      })

      
  })
  }

  render() { 
    return (
      <div className='wrapper'>
        <InputNewItem />
        {
          this.state.departments.map((singleDept, i) => {

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
                            
                            <button onClick={ () => { this.removeItem(item[0]) }}>Remove</button>

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