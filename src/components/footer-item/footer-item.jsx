import React, {Component} from 'react';
import styles from './style.css'

export class FooterItem extends Component {
    static defaultProps = {}

    render() {
        const {header, content} = this.props
        return (
            <div className="footer-content-wrapper">
                <span className="footer-item-header">{header}</span>
                <span className="footer-item-content">{content}</span>
            </div>
        )
    }
}

