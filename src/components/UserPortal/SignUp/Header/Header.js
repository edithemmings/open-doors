import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input } from 'semantic-ui-react'

class Header extends Component {
    alert = () => {
        alert('please use next/back buttons to navigate')
    }
    render() {
        return (
            <div>
                <Button
                    circular icon={this.props.icon1}
                    color={this.props.color1}
                    content={this.props.color1}
                    onClick={this.alert}
                    >
                    {this.props.value1}
                </Button>
                <Button
                    circular icon={this.props.icon2}
                    color={this.props.color2}
                    content={this.props.color2}
                    onClick={this.alert}>
                    {this.props.value2}
                </Button>
                <Button circular icon={this.props.icon3}
                    color={this.props.color3}
                    content={this.props.color3}
                    onClick={this.alert}>
                    {this.props.value3}
                </Button>
                <Button circular icon={this.props.icon4}
                    color={this.props.color4}
                    content={this.props.color4}
                    onClick={this.alert}>
                    {this.props.value4}
                </Button>
                <Button circular icon={this.props.icon5}
                    color={this.props.color5}
                    content={this.props.color5}
                    onClick={this.alert}>
                    {this.props.value5}
                </Button>
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(Header);