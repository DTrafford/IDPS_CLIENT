import React, { Component } from 'react';
import AlertsTable from '../MaterialUI/AlertsTable.js';

export default class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [
                // {test: 'TEST'}
            ]
        }
    }

    componentWillUpdate() {
        console.log(this.props.alerts);
    }
    render() {
        return (
            <div>
                <h2 style={{paddingLeft: '20px'}}>Alerts</h2>
                {this.props.alerts.length === 0  ? <h2 style={{paddingLeft: '20px'}}>No Current Alerts</h2> 
                : 
                <AlertsTable alerts={this.props.alerts}/>
                }
            </div>
        )
    }
}
