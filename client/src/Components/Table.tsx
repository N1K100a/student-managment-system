import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDebounce } from "../customHooks/useDebounce";
import axios from "axios";
import urls from "../urls";
import { motion, AnimatePresence } from "framer-motion";

interface dataType {
  Id: number;
  name: string;
  lastname: string;
  mail: string;
  personalid: number | string;
  birthdate: string;
  groupNumber: string;
}

interface TableProps {
  data: dataType[];
  setSearchValue: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastname: string;
      mail: string;
      personalid: string;
      birthdate: string;
      groupNumber: string;
    }>
  >;
  searchValue: {
    name: string;
    lastname: string;
    mail: string;
    personalid: number | string;
    birthdate: string;
    groupNumber: string;
  };
  setData: React.Dispatch<React.SetStateAction<never[]>>;
}

function Table({ data, setSearchValue, searchValue, setData }: TableProps) {
  const location = useLocation();

  const reversedData = [...data].reverse();

  const tableRow = reversedData.map((item: dataType, index) => {
    const birthdate = new Date(item.birthdate);
    const formattedBirthdate = birthdate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    return (
      <Tr
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: index / 10 + 0.1,
          duration: 0.1,
        }}
        key={index}>
        <Td>{item.name}</Td>
        <Td>{item.lastname}</Td>
        <Td>{item.groupNumber ? item.groupNumber : "No Group"}</Td>
        <Td>{item.mail}</Td>
        <Td>{item.personalid}</Td>
        <Td>{formattedBirthdate}</Td>
        <Td>
          <Link to={`delete/${item.Id}`}>
            <DelButton>
              <i className="fa-regular fa-trash-can"></i>
            </DelButton>
          </Link>
          <Link to={`edit/${item.Id}`} onClick={() => handleEditData(item)}>
            <EditButton>
              <i className="fa-solid fa-gear"></i>
            </EditButton>
          </Link>
        </Td>
      </Tr>
    );
  });

  let possibleFetchRef = useRef(false);

  const handleEditData = (item: string | dataType) => {
    const itemString = typeof item === "object" ? JSON.stringify(item) : item;

    localStorage.setItem("editData", itemString);
  };

  const handleSearch = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "personalid" ? parseInt(value, 10) || "" : value;

    setSearchValue((prev) => ({ ...prev, [name]: parsedValue }));
    possibleFetchRef.current = true;
  };

  const fetchData = async () => {
    try {
      const searchValueString = encodeURIComponent(JSON.stringify(searchValue));
      const url = `${urls.base}?tableName=${
        location.pathname.split("/")[1]
      }&searchValue=${searchValueString}`;

      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // deleyed Search
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (possibleFetchRef.current) {
      fetchData();
    }
  }, [debounceSearch]);

  return (
    <TableOuter>
      <TableCon>
        <AnimatePresence>
          <RealTable key="table">
            <thead key="thead">
              <Tr>
                <Th>
                  <FilterInput
                    placeholder="First Name"
                    onChange={handleSearch}
                    name="name"
                  />
                </Th>
                <Th>
                  <FilterInput
                    placeholder="Last Name"
                    onChange={handleSearch}
                    name="lastname"
                  />
                </Th>
                <Th>
                  <FilterInput
                    placeholder="Group Number"
                    onChange={handleSearch}
                    name="groupNumber"
                  />
                </Th>
                <Th>
                  <FilterInput
                    placeholder="Mail"
                    onChange={handleSearch}
                    name="mail"
                  />
                </Th>
                <Th>
                  <FilterInput
                    type="number"
                    placeholder="Personal ID"
                    onChange={handleSearch}
                    name="personalid"
                  />
                </Th>
                <Th>
                  <FilterInput
                    type="date"
                    placeholder="BirthDate"
                    onChange={handleSearch}
                    name="birthdate"
                  />
                </Th>
                <Th>
                  <Link to={`${location.pathname}/add`}>
                    <AddButton>
                      <i className="fa-solid fa-plus"></i>
                    </AddButton>
                  </Link>
                </Th>
              </Tr>
            </thead>
            <tbody key="tbody">{tableRow}</tbody>
          </RealTable>
        </AnimatePresence>
      </TableCon>
    </TableOuter>
  );
}

export default Table;

const TableOuter = styled.div`
  width: calc(100vw - 250px);
  height: 100%;
  @media (max-width: 1000px) {
    width: 100vw;
  }
`;

const FilterInput = styled.input`
  height: 30px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  background: none !important;
  border: none;
  outline: none !important;
  color: #2f3542;
  &[name="personalid"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &[name="name"] {
  }
  &[name="lastname"] {
  }
  &[name="personalid"] {
  }
  &[name="birthdate"] {
    &::placeholder {
      opacity: 0.7;
    }
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
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

const TableCon = styled.div`
  margin: 0 20px;
  overflow: auto;
  background-color: #ecf0f1;
  height: 100%;
  border: 1px solid #949ca1;
  border-radius: 10px;
`;

const RealTable = styled.table`
  border-collapse: collapse;
  min-width: max-content;
  width: 100%;
`;
const Tr = styled(motion.tr)`
  background-color: #d6e1e4;
`;
const Th = styled.th`
  height: 50px;
  width: fit-content;
  &:last-child {
    min-width: 95px;
  }
`;

const Td = styled.td`
  background-color: #ced6e0;
  text-align: center;
  height: 50px;
  box-shadow: inset 0 0.5px #949ca1, inset 0 0.5px #949ca1;
  color: #283f5c;
  font-weight: 600;
  padding: 0 10px;
`;

const AddButton = styled.button`
  height: 30px;
  padding: 0 10px;
  background: none;
  color: #2ed573;
  border-radius: 5px;
  border: 1px solid #2ed573;

  cursor: pointer;
  font-size: 16px;
  width: 75px;
  &:hover {
    background-color: #2ed573;
    color: white;
  }
`;
