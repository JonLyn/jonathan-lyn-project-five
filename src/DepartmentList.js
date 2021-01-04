import { Component, Fragment } from 'react';

// drop down list locations
class DepartmentList extends Component {
  render() {
    return (
      <Fragment>
        <option value='choose location' disabled>Choose location</option>
        <option value='don\t know'>Don't know</option>
        <option value='bakery'>Bakery</option>
        <option value='dairy'>Dairy</option>
        <option value='deli'>Deli</option>
        <option value='freezer'>Freezer</option>
        <option value='meat'>Meat</option>
        <option value='misc.'>Misc.</option>
        <option value='pharmacy'>Pharmacy</option>
        <option value='produce'>Produce</option>
        <option value='seafood'>Seafood</option>
        <option value='aisle 1'>Aisle 1</option>
        <option value='aisle 2'>Aisle 2</option>
        <option value='aisle 3'>Aisle 3</option>
        <option value='aisle 4'>Aisle 4</option>
        <option value='aisle 5'>Aisle 5</option>
        <option value='aisle 6'>Aisle 6</option>
        <option value='aisle 7'>Aisle 7</option>
        <option value='aisle 8'>Aisle 8</option>
        <option value='aisle 9'>Aisle 9</option>
        <option value='aisle 10'>Aisle 10</option>
        <option value='aisle 11'>Aisle 11</option>
        <option value='aisle 12'>Aisle 12</option>
        <option value='aisle 13'>Aisle 13</option>
        <option value='aisle 14'>Aisle 14</option>
        <option value='aisle 15'>Aisle 15</option>
      </Fragment>
    )
  }
}

export default DepartmentList;