import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import urls from "../urls";
import { useObjectIsEmpty } from "../customHooks/useObjectIsEmpty";
import { Link } from "react-router-dom";

interface propsType {
  groupNumber: string;
}
interface dataType {
  Id: number;
  name: string;
  lastname: string;
  mail: string;
  personalid: number | string;
  birthdate: string;
  groupNumber: string;
}

function GBody({ groupNumber }: propsType) {
  useEffect(() => {
    getStudents();
    getTeachers();
  }, []);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getStudents = async () => {
    try {
      const res = await axios.get(
        `${urls.baseGroup}?tableName=students&groupNumber=${groupNumber}`
      );
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getTeachers = async () => {
    try {
      const res = await axios.get(
        `${urls.baseGroup}?tableName=teachers&groupNumber=${groupNumber}`
      );
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const studentRow = students.map((item: dataType, index) => {
    return (
      <Box key={index}>
        <Person>
          {item.name} {item.lastname}
        </Person>
        <PersonalID>{item.personalid}</PersonalID>
        <Link to={`remove-student/${item.Id}`}>
          <Remove>
            <i className="fa-regular fa-trash-can"></i>
          </Remove>
        </Link>
      </Box>
    );
  });
  const teacherRow = teachers.map((item: dataType, index) => {
    return (
      <Box key={index}>
        <Person>
          {item.name} {item.lastname}
        </Person>
        <PersonalID>{item.personalid}</PersonalID>
        <Link to={`remove-teacher/${item.Id}`}>
          <Remove>
            <i className="fa-regular fa-trash-can"></i>
          </Remove>
        </Link>
      </Box>
    );
  });
  const emptyBoxText = "Empty";
  return (
    <MainCon>
      <StudentsCon>
        <Title>Students({students.length})</Title>
        {useObjectIsEmpty(students) ? (
          <NoneBox>{emptyBoxText}</NoneBox>
        ) : (
          studentRow
        )}
      </StudentsCon>
      <TeachersCon>
        <Title>Teachers({teachers.length})</Title>
        {useObjectIsEmpty(teachers) ? (
          <NoneBox>{emptyBoxText}</NoneBox>
        ) : (
          teacherRow
        )}
      </TeachersCon>
    </MainCon>
  );
}

export default GBody;

const expandAnimation = keyframes`
  0%{
    max-height: 0;
  }
  50%{
    padding: 0px 0 20px 0;
  }
  100% {
    max-height: 40vh;
    padding: 0px 0 20px 0;
  }
`;
const overflowAnimation = keyframes`
  from{
    overflow: hidden;
  }
  
  to {
    overflow: auto;
  }
`;
const MainCon = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background-color: #e9eff3;
  animation-name: ${expandAnimation};
  animation-duration: 0.3s;

  animation-fill-mode: forwards;
`;

const StudentsCon = styled.div`
  overflow: inherit;
  animation-name: ${overflowAnimation};
  animation-duration: 0;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
  width: 50%;
`;

const TeachersCon = styled(StudentsCon)``;

const NoneBox = styled.p`
  width: 100%;
  text-align: center;
  font-weight: 700;
  color: rgba(255, 77, 77, 0.7);
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  position: sticky;
  backdrop-filter: blur(1px);
  background-color: rgba(233, 239, 243, 0.8);
  top: 0;

  color: #283f5c;
`;

const Box = styled.div`
  width: calc(100% - 40px);
  margin: 0 20px;
  height: 30px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  padding: 5px 0;
`;

const Person = styled.div`
  width: calc((60% - 15px));
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  padding: 0 25px;
  color: #283f5c;
`;

const PersonalID = styled(Person)`
  width: calc((40% - 15px));
`;

const Remove = styled.button`
  height: 30px;
  width: 30px;
  cursor: pointer;
  border: 1px solid #ff4d4d;
  border-radius: 5px;
  background: none;
  color: #ff4d4d;
  font-size: 15px;
  &:hover {
    background-color: #ff4d4d;
    color: white;
  }
`;
