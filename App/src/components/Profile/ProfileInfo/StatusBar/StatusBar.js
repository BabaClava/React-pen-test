import React, { Component } from 'react';
import s from './StatusBar.module.sass';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEdit: false,
            status: this.props.status
        };
        this.editStatusStart = this.editStatusStart.bind(this);
        this.editStatusEnd = this.editStatusEnd.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.state.status
            });
        }
    }
    editStatusStart() {
        this.setState({
            isEdit: true
        });
    }
    editStatusEnd() {
        this.setState({
            isEdit: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange(e) {
        this.setState({
            status: e.currentTarget.value
        });
    }
    
    render() { 
        return ( 
            <>
                {
                    this.state.isEdit
                    ? <div>
                        <input type="text" 
                            value={this.state.status}
                            autoFocus={true}
                            onBlur={this.editStatusEnd}
                            onChange={this.onStatusChange}
                        />
                      </div>
                    : <div>
                        <span className={s.statusBar}
                            onDoubleClick={this.editStatusStart}
                        >{this.props.status || '===='}</span>
                      </div>
                }
            </>
         );
    }
}
 
export default StatusBar;