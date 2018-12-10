import React, { Component } from 'react';
import './PopularityIcon.css';

export default class PopularityIcon extends Component {
    getClass = (popularity) => {
        switch (true) {
            case popularity > 0:
                return 'green';
            case popularity < 0:
                return 'red';
            default:
                return 'yellow';
        }
    };

    getSigned = (popularity) => {
        return popularity > 0 ? `+${popularity}` : popularity;
    };

    render() {
        return (
            <b className={this.getClass(this.props.popularity)}>
                {this.getSigned(this.props.popularity)}
            </b>
        );
    }
}
