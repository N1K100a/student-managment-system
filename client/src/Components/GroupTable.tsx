import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GroupItem from "./GroupItem";
import axios from "axios";
import urls from "../urls";
import { Outlet } from "react-router-dom";
import { useDebounce } from "../customHooks/useDebounce";
import { Link } from "react-router-dom";

function GroupTable() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const searchValueString = encodeURIComponent(JSON.stringify(searchValue));
      const res = await axios.get(
        `${urls.groups}&searchValue=${searchValueString}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const reversedData = [...data].reverse();
  const [activeRow, setActiveRow] = useState(0);
  const tableRow = reversedData.map((item, index) => {
    return (
      <GroupItem
        setActiveRow={setActiveRow}
        activeRow={activeRow}
        key={index}
        index={index + 1}
        data={item}
      />
    );
  });
  let possibleFetchRef = useRef(false);

  const [searchValue, setSearchValue] = useState({
    groupName: "",
    groupNumber: "",
  });
  const handleSearch = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setSearchValue((prev) => ({ ...prev, [name]: value }));
    possibleFetchRef.current = true;
  };
  console.log(searchValue);
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (possibleFetchRef.current) {
      getData();
    }
  }, [debounceSearch]);
  return (
    <TableOuter>
      <TableCon>
        <TableHead>
          <HeadSplits>
            <i className="fa-solid fa-user-group"></i>
            <FilterInput
              onChange={handleSearch}
              name="groupName"
              placeholder="Group Name..."
            />
          </HeadSplits>
          <HeadSplits>
            <i className="fa-solid fa-hashtag"></i>
            <FilterInput
              onChange={handleSearch}
              name="groupNumber"
              placeholder="Group Number..."
            />
          </HeadSplits>
          <Link to="add">
            <AddButton>
              <i className="fa-solid fa-plus"></i>
            </AddButton>
          </Link>
        </TableHead>
        {tableRow}
      </TableCon>
      <Outlet></Outlet>
    </TableOuter>
  );
}

export default GroupTable;

const TableOuter = styled.div`
  width: calc(100vw - 250px);
  height: 100%;
  @media (max-width: 1000px) {
    width: 100vw;
  }
`;
const TableCon = styled.div`
  margin: 0 20px;
  overflow: auto;
  background-color: #ecf0f1;
  height: 100%;
  border: 1px solid #949ca1;
  border-radius: 10px;
`;

const HeadSplits = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-right: 10px;
    color: #283f5c;
  }
`;

const TableHead = styled.div`
  height: 50px;
  width: 100%;
  background-color: #d6e1e4;
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  ${HeadSplits}:nth-child(1) {
    width: calc((100% - 85px) / 2);
  }
  ${HeadSplits}:nth-child(2) {
    width: calc((100% - 85px) / 2);
  }
`;
const FilterInput = styled.input`
  height: 30px;
  width: calc(100% - 80px);
  font-weight: 600;
  cursor: pointer;
  padding: 0 10px;
  background: none;
  border: none;
  outline: none !important;
  color: #2f3542;
`;

const AddButton = styled.button`
  height: 30px;
  padding: 0 10px;
  background: none;
  margin-right: 10px;
  color: #2ed573;
  border-radius: 5px;
  border: 1px solid #2ed573;
  cursor: pointer;
  font-size: 16px;
  width: 75px;
  flex-shrink: 0;
  &:hover {
    background-color: #2ed573;
    color: white;
  }
`;
