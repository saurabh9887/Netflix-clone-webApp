import React, { useRef, useState } from "react";
import "./List.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ListItem from "../ListItem/ListItem";

const List = ({ list }) => {
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    setIsMoved(true);
    if (direction === "left" && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlideNumber(slideNumber - 1);
    } else if (direction === "right" && slideNumber < 5) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSlideNumber(slideNumber + 1);
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <IoIosArrowBack
          className="sliderArrow Left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="listItemContainer" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} key={i} />
          ))}
        </div>
        <IoIosArrowForward
          className="sliderArrow Right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
