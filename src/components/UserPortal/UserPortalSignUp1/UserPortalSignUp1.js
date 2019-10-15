import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Form, Grid, Dropdown } from 'semantic-ui-react'

class ShelterPortalHome extends Component {
    state = {
        allDays: [
            { text: 'Monday' },
            { text: 'Tuesday' },
            { text: 'Wednesday' },
            { text: 'Friday' },
            { text: 'Saturday' },
            { text: 'Sunday' },
            { text: 'Every day' },
            { text: 'Monday-Friday' },
            { text: 'Saturday-Sunday' }
        ],
        selectedDays: [
            { id: 1, day: 'Monday', opens: '5:00 PM', closes: '9:00 AM' },
            { id: 2, day: 'Tuesday', opens: '7:00 PM', closes: '9:00 AM' },
        ]
    }
    render() {
        return (
            <>
                <div>
                    <label>Shelter Name</label>
                    <Input fluid placeholder={'Shelter Name'} />
                    <label>Full Street Address</label>
                    <Input fluid placeholder={'Full Street Address'} />
                    <label>Phone Number</label>
                    <Input fluid placeholder={'Phone Number'} />
                    <label>Website URL</label>
                    <Input fluid placeholder={'Website URL'} />
                    <br />
                    <br />
                    <div>
                        <label>Hours</label>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    Day of the Week
                            </Grid.Column>
                                <Grid.Column width={4}>
                                    <label>Opens</label>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <label>Closes</label>
                                </Grid.Column>
                            </Grid.Row>
                            {this.state.selectedDays.map(selectedDay => (
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        {selectedDay.day}
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        {selectedDay.opens}
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        {selectedDay.closes}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button size='mini' value={selectedDay.id}>X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Dropdown
                                        placeholder='Select Day'
                                        fluid
                                        search
                                        selection
                                        options={this.state.allDays}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input fluid placeholder={'Opens'} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input fluid placeholder={'Closes'} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Button>Add</Button>
                    </div>
                    <Button>Next</Button>

                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);