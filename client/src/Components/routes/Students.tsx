import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../Table";
import axios from "axios";
import { Outlet } from "react-router-dom";
import urls from "../../urls";

function Students() {
  const [data, setData] = useState([]);

  const [searchValue, setSearchValue] = useState({
    name: "",
    lastname: "",
    mail: "",
    personalid: "",
    birthdate: "",
    groupNumber: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(urls.students);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Table
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        data={data}
        setData={setData}
      />

      <Outlet></Outlet>
    </div>
  );
}

export default Students;
