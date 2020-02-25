import React from "react";
import './styles.scss';
const ContributionCount = ({ data }) => {
  return (
    <div className="contribution-count">
      <div className="contribution-count__item">
        <span className="counter">{data.commentList ? data.commentList.length : 0}</span> Comments
      </div>
      <div className="contribution-count__item">
        Seen by <span className="counter">{data.seenby}</span>
      </div>
    </div>
  );
};

export default ContributionCount;
