import React, { Component } from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Checkbox,
    FormHelperText
} from '@material-ui/core';


class SearchModal extends Component {

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Search by Tags:</FormLabel>
                <FormGroup>
                    {this.props.tags ? this.props.tags.map(tagObj => {
                        return <FormControlLabel
                            control={<Checkbox
                                checked={this.props.form.tags ? this.props.form.tags['id' + tagObj.id] : false}
                                color="primary"
                                onChange={(e) => this.props.handleChange(e, tagObj.id, 'tags')}
                            />}
                            label={tagObj.tag}
                            key={tagObj.id}
                        />
                    }) : ''}
                </FormGroup>
                <FormLabel component="legend">Search by Tags:</FormLabel>
                <FormGroup>
                    {this.props.types ? this.props.types.map(typeObj => {
                        return <FormControlLabel
                            control={<Checkbox
                                checked={this.props.form.types ? this.props.form.types['id' + typeObj.id] : false}
                                color="primary"
                                onChange={(e) => this.props.handleChange(e, typeObj.id, 'types')}
                            />}
                            label={typeObj.type}
                            key={typeObj.id}
                        />
                    }) : ''}
                </FormGroup>
                <FormHelperText></FormHelperText>
            </FormControl>
        )
    }
}

export default SearchModal;