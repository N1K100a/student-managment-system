import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import urls from "../urls";
import axios from "axios";
import { motion } from "framer-motion";

function GroupAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const addOrEdit = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    getDataForEdit();
  }, []);

  const [addValue, setAddValue] = useState({
    groupName: "",
    groupNumber: "",
  });

  const getDataForEdit = () => {
    const editData = localStorage.getItem("editGroupData");
    if (editData && addOrEdit === "edit") {
      const dataBeforModife = JSON.parse(editData);

      setAddValue(dataBeforModife);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setAddValue((prev) => ({ ...prev, [name]: value }));
    console.log(addValue);
  };

  const handleSubmit = async (e: any) => {
    if (Object.values(addValue).some((value) => value === "")) {
      return;
    }
    if (addOrEdit === "add") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.post(urls.baseGroup, addValue);
      } catch (err) {
        console.log(err);
      }
    }
    if (addOrEdit === "edit") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.put(`${urls.baseGroup}/${id}`, addValue);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    navigate("..");
  };
  return (
    <MainCon>
      <ModalBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <ModalTitle>{addOrEdit} Group</ModalTitle>
        <InputBox>
          <span>Group Name</span>
          <Input
            name="groupName"
            required
            placeholder="..."
            value={addValue.groupName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <span>Group Number</span>
          <Input
            required
            name="groupNumber"
            placeholder="..."
            value={addValue.groupNumber}
            onChange={handleChange}
          />
        </InputBox>
        <Box>
          <SubmitButton value="Submit" type="submit" onClick={handleSubmit} />
          <CancelButton type="button" onClick={handleCancel}>
            CANCEL
          </CancelButton>
        </Box>
      </ModalBox>
    </MainCon>
  );
}

export default GroupAddEdit;

const MainCon = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.452);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBox = styled(motion.form)`
  padding: 30px 25px 50px 25px;
  width: 280px;
  box-sizing: content-box;
  border-radius: 10px;
  background-color: aliceblue;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  span {
    margin-bottom: 5px;
    font-size: 14px;
    color: #27374d;
  }
`;

const ModalTitle = styled.h3`
  text-transform: capitalize;
  margin-bottom: 20px;
  text-align: center;
  color: #27374d;
`;

const Input = styled.input`
  height: 30px;
  outline: none !important;
  border: 1px solid #1976d2;
  border-radius: 5px;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.7);
  &:focus:required:invalid {
    border: 1px solid red;
  }
`;

const SubmitButton = styled.input`
  height: 30px;
  font-size: 16px;
  width: calc(50% - 10px);
  background-color: #1976d2;
  cursor: pointer;
  color: aliceblue;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const CancelButton = styled.button`
  height: 30px;
  font-size: 16px;
  width: calc(50% - 10px);
  cursor: pointer;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  }
  color: aliceblue;
  background-color: #ff4d4d;
`;

const Box = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: auto;
  width: 100%;
`;
