import React from 'react';
import './styles.scss';

function Comments({ data }) {
    return (
        <div className="comment">
            <div className="comment__user-info">
                <img alt="User" className="comment__user-image" src={data.userInfo.image} />
                <div className="comment__user-text">
                    <a href="#" className="username">{data.userInfo.name}</a>
                    <small className="time-stamp">{data.timeCreated}</small>
                </div>
            </div>
            <div className="comment__content">
                {data.content}
            </div>
        </div>
    )
}

export default Comments

