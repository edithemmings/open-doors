import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Settings1Contact from '../Settings/Settings1Contact/Settings1Contact'
import Settings2Hours from '../Settings/Settings2Hours/Settings2Hours'
import Settings3Types from '../Settings/Settings3Types/Settings3Types'
import Settings4Tags from '../Settings/Settings4Tags/Settings4Tags'


class AllSettings extends Component {
    state = {
        contact: {
            name: this.props.reduxState.userShelter.name,
            location: this.props.reduxState.userShelter.location,
            phone: this.props.reduxState.userShelter.phone,
            website: this.props.reduxState.userShelter.website
        },
        moreInfo: {
            id: this.props.reduxState.userShelter.id,
            guest_types: this.props.reduxState.userShelter.types,
            hours: this.props.reduxState.userShelter.hours,
            tags: this.props.reduxState.userShelter.tags,
        }
    }
    handleEditContact = (event, keyName) => {
        this.setState({
            shelter: {
                ...this.state.contact,
                [keyName]: event.target.value
            }
        })
    }
    handleEditMoreInfo = (keyName, data) => {
        this.setState({
            moreInfo: {
                ...this.state.moreInfo,
                [keyName]: data
            }
        })
    }
    componentDidUpdate() {
        console.log(this.state)
    }
    render() {
        return (
            <>
                <div>
                    <Settings1Contact
                        shelter={this.state.contact}
                        handleEdit={this.handleEditContact}
                    />
                    {/* <Settings2Hours
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    />
                    <Settings3Types
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    />
                    <Settings4Tags
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    /> */}
                    <Button>Save</Button>
                </div>

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(AllSettings);