import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GBody from "./GBody";
import { motion } from "framer-motion";

interface dataType {
  Id: number;
  groupName: string;
  groupNumber: string;
}

interface propsType {
  data: dataType;
  index: number;
  activeRow: number;
  setActiveRow: React.Dispatch<React.SetStateAction<number>>;
}

function GroupItem({ data, index, activeRow, setActiveRow }: propsType) {
  console.log(index);
  const handleClick = () => {
    if (activeRow === index) {
      setActiveRow(0);
    } else {
      setActiveRow(index);
    }
  };
  const isActive = (num: any) => {
    return num === index;
  };

  const handleEditData = (item: string | dataType) => {
    const itemString = typeof item === "object" ? JSON.stringify(item) : item;

    localStorage.setItem("editGroupData", itemString);
  };

  return (
    <TableItem
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index / 10,
        duration: 0.1,
      }}>
      <Head>
        <HeadSplit>
          <ArrowButton
            style={isActive(activeRow) ? { transform: "rotate(-180deg)" } : {}}
            onClick={handleClick}>
            <i className="fa-solid fa-angle-down"></i>
          </ArrowButton>
        </HeadSplit>
        <HeadSplit>
          <i className="fa-solid fa-user-group"></i>
          <p>{data.groupName}</p>
        </HeadSplit>
        <HeadSplit>
          <i className="fa-solid fa-hashtag"></i>
          <p>{data.groupNumber}</p>
        </HeadSplit>
        <HeadSplit>
          <Link to={`delete/${data.Id}`}>
            <DelButton>
              <i className="fa-regular fa-trash-can"></i>
            </DelButton>
          </Link>
          <Link to={`edit/${data.Id}`} onClick={() => handleEditData(data)}>
            <EditButton>
              <i className="fa-solid fa-gear"></i>
            </EditButton>
          </Link>
        </HeadSplit>
      </Head>
      {isActive(activeRow) ? <GBody groupNumber={data.groupNumber} /> : null}
    </TableItem>
  );
}

export default GroupItem;

const TableItem = styled(motion.div)`
  min-height: 50px;
  width: 100%;
  border-bottom: 1px solid #949ca1;
  box-sizing: content-box;
`;

const Head = styled.div`
  height: 50px;
  width: 100%;
  background-color: #f1f6f9;
  display: flex;
`;
const HeadSplit = styled.div`
  height: 100%;
  display: flex;
  &:nth-child(1) {
    width: 55px;

    justify-content: center;
    align-items: center;
  }
  &:nth-child(2) {
    width: calc((100% - 140px) / 2);
    align-items: center;
    color: #283f5c;
    font-size: 15px;
    font-weight: 700;

    p {
      margin-left: 10px;
    }
  }
  &:nth-child(3) {
    width: calc((100% - 140px) / 2);
    align-items: center;
    color: #283f5c;
    font-size: 15px;
    font-weight: 700;
    p {
      margin-left: 10px;
    }
  }
  &:nth-child(4) {
    width: 85px;
    align-items: center;
  }
`;

const ArrowButton = styled.button`
  height: 30px;
  width: 30px;
  cursor: pointer;
  background: none;
  font-size: 18px;
  border: none;
  color: #283f5c;
  transition: transform 0.1s linear;

  i {
    margin-top: 5px;
  }
`;

const DelButton = styled.button`
  height: fit-content;
  width: 35px;
  border: 1px solid #ff4d4d;
  cursor: pointer;
  padding: 4px;
  background: none;
  font-size: 15px;
  color: #ff4d4d;
  border-radius: 5px;
  &:hover {
    background-color: #ff4d4d;
    color: white;
  }
`;
const EditButton = styled(DelButton)`
  border: 1px solid #3742fa;
  margin-left: 5px;
  color: #3742fa;
  &:hover {
    background-color: #3742fa;
  }
`;
