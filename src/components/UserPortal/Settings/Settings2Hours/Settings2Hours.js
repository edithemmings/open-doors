import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'

class Settings2Hours extends Component {
    state = {
        allDays: [
            { id: 1, day: 'Monday' },
            { id: 2, day: 'Tuesday' },
            { id: 3, day: 'Wednesday' },
            { id: 4, day: 'Friday' },
            { id: 5, day: 'Saturday' },
            { id: 6, day: 'Sunday' },
            { id: 7, day: 'Every day' },
            { id: 8, day: 'Monday-Friday' },
            { id: 9, day: 'Saturday-Sunday' }
        ],
        inputHour: {
            open: '',
            close: ''
        }
    }
    handleHourChange = (event, keyName) => {
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                [keyName]: event.target.value
            }
        })
    }
    handleHourAdd = () => {
        let totalHours = this.props.shelter.hours
        if (this.state.inputHour) {
            totalHours.push(this.state.inputHour);
        }
        this.props.handleEdit('hours', totalHours)
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                open: '',
                close: ''
            }
        })
    }
    deleteHour = (event) => {
        let remainingHours = []
        this.props.shelter.hours.forEach(hour => {
            if (hour.day != event.target.value){
                remainingHours.push(hour)
            }
        })
        this.props.handleEdit('hours', remainingHours)
    }
    render() {
        return (
            <div>
                <div> 
                    <Grid celled >
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <span className='tableLabel'>Day of the Week</span>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <span className='tableLabel'>Opens</span>   
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <span className='tableLabel'>Closes</span>  
                            </Grid.Column>
                        </Grid.Row>
                        {this.props.shelter.hours ? this.props.shelter.hours.map(selectedDay => (
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    {selectedDay.day}
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    {selectedDay.open}
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    {selectedDay.close}
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Button 
                                        size='mini' 
                                        value={selectedDay.day}
                                        onClick={this.deleteHour}
                                    >X</Button>
                                </Grid.Column>
                            </Grid.Row>
                        )) : ''}
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <select className="dropdown"
                                    onChange={(e) => this.handleHourChange(e, 'day')}>
                                    {this.state.allDays.map(day => (
                                        <option key={day.id}>{day.day}</option>
                                    ))}
                                </select>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input
                                    fluid
                                    placeholder={'Opens'}
                                    value={this.state.inputHour.open}
                                    onChange={(e) => this.handleHourChange(e, 'open')}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input
                                    fluid
                                    placeholder={'Closes'}
                                    value={this.state.inputHour.close}
                                    onChange={(e) => this.handleHourChange(e, 'close')}
                                />
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Button onClick={this.handleHourAdd}>Add</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(Settings2Hours);