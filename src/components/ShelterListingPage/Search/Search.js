import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';


//--------------COMPONENT------------------//

class Search extends Component {
 

    render() {
        return (
            <div className="Search">
                <h2>Find Shelter by Tags</h2>
                 {/* <Form> */}
                     <Form.Group>
                        <label>HTML checkboxes</label>
                        <Form.Field label='This one' control='input' type='checkbox' />
                        <Form.Field label='That one' control='input' type='checkbox' /> 
                     </Form.Group>
                 {/* </Form> */}


            </div>
        )
    }
}

export default Search;