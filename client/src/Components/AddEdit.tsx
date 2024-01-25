import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import urls from "../urls";
import { motion, AnimatePresence } from "framer-motion";

function AddEdit() {
  const [addValue, setAddValue] = useState({
    name: "",
    lastname: "",
    groupNumber: "",
    mail: "",
    personalid: "",
    birthdate: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "personalid" ? parseInt(value, 10) || "" : value;

    setAddValue((prev) => ({ ...prev, [name]: parsedValue }));
    console.log(addValue);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const tableName = location.pathname.split("/")[1];
  const addOrEdit = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];

  const handleSubmit = async (e: any) => {
    if (Object.values(addValue).some((value) => value === "")) {
      return;
    }
    if (addOrEdit === "add") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.post(`${urls.base}?tableName=${tableName}`, addValue);
      } catch (err) {
        console.log(err);
      }
    }
    if (addOrEdit === "edit") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.put(`${urls.base}/${id}?tableName=${tableName}`, addValue);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getDataForEdit();
    getGroup();
    defaultGroupValue();
  }, []);

  console.log(addValue);

  const defaultGroupValue = () => {
    if (addOrEdit == "add") {
      setAddValue((prev) => ({ ...prev, groupNumber: "No Group" }));
    }
  };

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("..");
  };

  const getDataForEdit = () => {
    const editData = localStorage.getItem("editData");
    if (editData && addOrEdit === "edit") {
      const dataBeforModife = JSON.parse(editData);
      const birthdate = new Date(dataBeforModife.birthdate);
      const formatedBirthdate = birthdate.toISOString().split("T")[0];

      setAddValue({ ...dataBeforModife, birthdate: formatedBirthdate });
    }
  };

  const [groupData, setGroupData] = useState([]);
  const getGroup = async () => {
    try {
      const res = await axios.get(urls.groups);
      setGroupData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(typeof addValue.groupNumber);

  const optionValues = groupData.map((item: any, index) => {
    return (
      <option key={index} value={item.groupNumber}>
        {item.groupNumber}
      </option>
    );
  });

  return (
    <ModalCon>
      <AnimatePresence>
        <ModalBox
          key="modalbox"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}>
          <ModalTitle>
            {addOrEdit === "edit" ? "Edit" : "Add"} {tableName}{" "}
            {addOrEdit === "edit" ? "data" : null}
          </ModalTitle>
          <InputCombinedBox>
            <InputBox>
              <span>first name</span>
              <Input
                type="text"
                required
                onChange={handleChange}
                name="name"
                value={addValue.name}
              />
            </InputBox>
            <InputBox>
              <span>last name</span>
              <Input
                type="text"
                required
                onChange={handleChange}
                name="lastname"
                value={addValue.lastname}
              />
            </InputBox>
          </InputCombinedBox>
          <InputBox>
            <span>group id</span>
            <Select
              onChange={handleChange}
              value={addValue.groupNumber}
              name="groupNumber">
              <option value="No Group">No Group</option>
              {optionValues}
            </Select>
          </InputBox>

          <InputBox>
            <span>mail</span>
            <Input
              type="email"
              required
              onChange={handleChange}
              name="mail"
              value={addValue.mail}
            />
          </InputBox>
          <InputBox>
            <span>personal Id</span>
            <Input
              type="number"
              required
              onChange={handleChange}
              name="personalid"
              value={addValue.personalid}
            />
          </InputBox>
          <InputBox>
            <span>birthdate</span>
            <Input
              min="1900-01-01"
              type="date"
              required
              onChange={handleChange}
              name="birthdate"
              value={addValue.birthdate}
            />
          </InputBox>
          <ButtonBox>
            <InputSubmit onClick={handleSubmit} type="submit" />
            <Button onClick={handleCancel}>cancel</Button>
          </ButtonBox>
        </ModalBox>
      </AnimatePresence>
    </ModalCon>
  );
}

export default AddEdit;

const ModalCon = styled.div`
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

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  color: #27374d;
`;
const ModalBox = styled(motion.form)`
  box-sizing: content-box;
  max-width: 280px;
  border-radius: 10px;
  width: 100%;
  background-color: aliceblue;
  padding: 30px 25px 30px 25px;
`;

const InputSubmit = styled.input`
  height: 30px;
  font-size: 16px;
  width: calc(50% - 10px);
  background-color: #1976d2;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  transition: box-shadow 0.2s;
  text-transform: uppercase;
  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;
const Button = styled.button`
  text-transform: uppercase;
  height: 30px;
  font-size: 16px;
  width: calc(50% - 10px);
  background-color: #1976d2;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  transition: box-shadow 0.2s;
  color: aliceblue;
  background-color: #ff4d4d;
  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none !important;
  padding: 0 20px;
  border-radius: 5px;
  text-align: center;

  border: 1px solid #1976d2;
  &:focus:required:invalid {
    border: 1px solid red;
  }
  &[name="personalid"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &[name="birthdate"] {
    cursor: pointer;
  }
`;
const InputBox = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  align-items: center;
  & > span {
    text-transform: capitalize;
    margin-bottom: 5px;
    font-size: 14px;
    color: #27374d;
  }
`;

const ButtonBox = styled.div`
  margin-top: 20px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const Select = styled.select`
  outline: none !important;
  width: 100%;
  height: 100%;
  border: 1px solid #1976d2;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const InputCombinedBox = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
  div {
    width: calc(50% - 10px);
  }
`;
