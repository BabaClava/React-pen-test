import React, { Component } from 'react';
import s from './StatusBar.module.sass';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEdit: false 
        }
        this.editStatusToggler = this.editStatusToggler.bind(this)
    }
    editStatusToggler() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    
    render() { 
        return ( 
            <>
                {
                    
                    this.state.isEdit
                        ? <div>
                            <input type="text" 
                                value={this.props.status} 
                                autoFocus={true}
                                onBlur={this.editStatusToggler}
                            />
                          </div>
                        : <div>
                            <span className={s.statusBar}
                                onDoubleClick={this.editStatusToggler}
                            >{this.props.status}</span>
                          </div>
                }
            </>
         );
    }
}
 
export default StatusBar;