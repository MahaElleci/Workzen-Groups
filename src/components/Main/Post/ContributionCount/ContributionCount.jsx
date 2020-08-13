import React, { useState } from "react";
import { useSelector } from "react-redux";

import AppModal from "../../../Shared/Modal/Modal";
import Icon from "../../../Shared/IcoMoon/IcoMoon";
import EmptyState from "../../../Shared/EmptyState/EmptyState";
import Loader from "../../../Shared/Loader/Loader";

import { getSeenList_service } from "../../../../Services/post-services";
import { getUsers_service } from "../../../../Services/sitecore-services";

import "./styles.scss";

const ContributionCount = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seenList, setSeenList] = useState([]);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  async function getSeenList() {
    setShowModal(true);
    setIsLoading(true);
    const response = await getSeenList_service(data.id);
    const userIds = response.data.map((user) => user.userId);

    if (response.status === 200) {
      const infoResponse = await getUsers_service(userIds);
      const filteredSeenList = infoResponse.data
        ? infoResponse.data.filter((user) => user.id !== data.userId)
        : [];
      infoResponse.data ? setSeenList(filteredSeenList) : setSeenList([]);
    }
    setIsLoading(false);
  }
  return (
    <>
      <AppModal
        header={"People viewed this post"}
        size={"md"}
        centered={true}
        body={
          isLoading ? (
            <div className="loader-placeholder">
              <Loader />
            </div>
          ) : seenList.length > 0 ? (
            seenList.map((item, i) => {
              return (
                <div key={i} className="groups-widget-wrapper__item">
                  <img
                    alt="userimage"
                    className="groups-widget-wrapper__item__image"
                    src={
                      item.image
                        ? item.image
                        : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                    }
                  />
                  <div className="groups-widget-wrapper__item__text">
                    <a href="#" className="title">
                      {item.displayName}
                    </a>
                    <p className="subtitle">{item.jobTitle}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState message="No views yet" />
          )
        }
        shown={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="groups-contribution-count">
        <div className="groups-contribution-count__item-wrap d-flex">
          <div className="item">
            <span className="counter">{kFormatter(data.likeCount)}</span>{" "}
            <Icon size="14" disableFill="true" color="#858EA2" icon="like" />
          </div>
          <div className="item">
            <span className="counter">{kFormatter(data.commentCount)}</span>{" "}
            {data.commentCount === 1 ? "Comment" : "Comments"}
          </div>
        </div>
        <div
          className="groups-contribution-count__item-wrap pointer"
          onClick={() => getSeenList(true)}
        >
          Seen by{" "}
          <span className="counter">
            {data.isSeen ? data.seenCount - 1 : data.seenCount}
          </span>
        </div>
      </div>
    </>
  );
};

export default ContributionCount;
