import React, { Component } from 'react'

export class ContributionCount extends Component {
    render() {
        return (
            <div className="contribution-count">
                <div className="contribution-count__item">
                    <span className="counter">0</span> Comments
                </div>
                <div className="contribution-count__item">
                    Seen by <span className="counter">33</span>
                </div>
            </div>
        )
    }
}

export default ContributionCount
