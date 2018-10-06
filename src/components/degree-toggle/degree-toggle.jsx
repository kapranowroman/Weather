import React, {Component} from 'react'
import styles from './style.css'

export class DegreeToggle extends Component {

    static defaultProps = {}
    handleOnChange = (obj) => {
        this.props.onChange(obj.target.checked ? 'imperial' : 'metric')
    }

    render() {
        return (
            <div className="degree-toggle">
                <div><span>&deg; </span></div>
                <div>
                    <label className="switch">
                        <input type="checkbox" onChange={this.handleOnChange}/>
                        <div className="slider">
                            <div className="carret"></div>
                            <div className="slider-letters">
                                <span className="item first">C</span>
                                <span className="item second">F</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        )
    }
}

