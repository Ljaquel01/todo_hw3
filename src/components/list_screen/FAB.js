import React, { Component } from 'react'

export default class FAB extends Component {

    render() {
        return (
            <div>
                <div className="fixed-action-btn FAB">
                    <div className="btn-floating btn-large green accent-3">
                        <i className="large material-icons">mode_edit</i>
                    </div>
                    <ul>
                      <li><div className="btn-floating grey"><i className="material-icons">insert_chart</i></div></li>
                      <li><div className="btn-floating grey"><i className="material-icons">format_quote</i></div></li>
                      <li><div className="btn-floating grey"><i className="material-icons">delete</i></div></li>
                    </ul>
                </div>
            </div>
        )
    }
}
