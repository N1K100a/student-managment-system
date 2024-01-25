import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Teachers from "./Components/routes/Teachers";
import Groups from "./Components/routes/Groups";
import Students from "./Components/routes/Students";
import { GlobalStyles } from "./styles/GlobalStyles";
import NavigationCon from "./Components/NavigationCon";
import { Helmet } from "react-helmet";
import Home from "./Components/routes/Home";
import AddEdit from "./Components/AddEdit";
import NavCloseOpen from "./Components/NavCloseOpen";
import { AnimatePresence } from "framer-motion";
import AgreeOrNot from "./Components/AgreeOrNot";
import GroupAddEdit from "./Components/GroupAddEdit";

function App() {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );
  const [navIsActive, setNavIsActive] = useState(
    windowWidth > 999 ? true : false
  );

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const handleResize = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    setWindowWidth(width);
    if (width > 1000) {
      setNavIsActive(true);
    } else {
      setNavIsActive(false);
    }
  };
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <title>Student Managment System</title>
        <script
          src="https://kit.fontawesome.com/07b627abf9.js"
          crossOrigin="anonymous"></script>
      </Helmet>
      <BrowserRouter>
        <MainApp>
          <AnimatePresence>
            {navIsActive ? <NavigationCon windowWidth={windowWidth} /> : null}
          </AnimatePresence>
          {windowWidth < 1001 ? (
            <NavCloseOpen
              navIsActive={navIsActive}
              setNavIsActive={setNavIsActive}
            />
          ) : null}
          <AnimatePresence>
            <RouteCon key="routercon">
              <Routes key="routes">
                <Route path="/" element={<Home />} />
                <Route key="route1" path="/students" element={<Students />}>
                  <Route path="add" element={<AddEdit />} />
                  <Route path="edit/:id" element={<AddEdit />} />
                  <Route path="delete/:id" element={<AgreeOrNot />} />
                </Route>
                <Route key="route2" path="/teachers" element={<Teachers />}>
                  <Route path="add" element={<AddEdit />} />
                  <Route path="edit/:id" element={<AddEdit />} />
                  <Route path="delete/:id" element={<AgreeOrNot />} />
                </Route>
                <Route key="route3" path="/groups" element={<Groups />}>
                  <Route path="delete/:id" element={<AgreeOrNot />} />
                  <Route path="edit/:id" element={<GroupAddEdit />} />
                  <Route path="add" element={<GroupAddEdit />} />
                  <Route path="remove-student/:id" element={<AgreeOrNot />} />
                  <Route path="remove-teacher/:id" element={<AgreeOrNot />} />
                </Route>
              </Routes>
            </RouteCon>
          </AnimatePresence>
        </MainApp>
      </BrowserRouter>
    </>
  );
}

export default App;

const MainApp = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ecf0f1;
  display: flex;
`;

const RouteCon = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  margin: 50px 0;
`;
