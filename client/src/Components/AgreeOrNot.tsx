import axios from "axios";
import React from "react";
import styled from "styled-components";
import urls from "../urls";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function AgreeOrNot() {
  const location = useLocation();
  const navigate = useNavigate();
  const tableName = location.pathname.split("/")[1];
  const whatDo = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];
  const handleYes = async () => {
    const groupNumber = "No Group";
    if (whatDo === "delete") {
      try {
        await axios.delete(`${urls.base}/${id}?tableName=${tableName}`);
        navigate("..");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    if (whatDo === "remove-student") {
      await axios.put(`${urls.remove}/${id}?tableName=students`, groupNumber);
      navigate("..");
      window.location.reload();
    }
    if (whatDo === "remove-teacher") {
      await axios.put(`${urls.remove}/${id}?tableName=teachers`, groupNumber);
      navigate("..");
      window.location.reload();
    }
  };
  let stringWithoutLastLetter = tableName.slice(0, -1);

  return (
    <ModalCon key="modalcon">
      <ModalBox
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}>
        <p>
          <b>Are you sure you want to delete?</b>
          <br />
          {stringWithoutLastLetter} data won't be recovered
        </p>
        <div>
          <YesButton onClick={handleYes}>YES</YesButton>
          <NoButton onClick={() => navigate("..")}>NO</NoButton>
        </div>
      </ModalBox>
    </ModalCon>
  );
}

export default AgreeOrNot;

const ModalCon = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBox = styled(motion.div)`
  background-color: aliceblue;
  border: none;
  border-radius: 10px;
  box-sizing: content-box;
  padding: 30px;

  p {
    color: #283f5c;
    text-align: center;
    line-height: 25px;
  }
  div {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

const YesButton = styled.button`
  font-weight: 600;
  text-transform: uppercase;
  height: fit-content;
  width: calc(50% - 10px);
  padding: 5px 0;
  border: none;
  cursor: pointer;
  background-color: #ff4d4d;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const NoButton = styled(YesButton)`
  background: #1976d2;
`;
