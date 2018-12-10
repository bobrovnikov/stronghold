import React, { Component } from 'react';

export default class Book extends Component {
    render() {
        return (
            <div class="book">
                <p className={this.props.popularity < 50 ? 'red' : 'green'}>{this.props.popularity}</p>
                <p className={this.props.gold > 0 ? 'green' : 'red'}>{this.props.gold}</p>
                <p>{this.props.population}/{this.props.housing}</p>
            </div>
        )
    }
};
