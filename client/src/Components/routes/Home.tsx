import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import logo from "../../Lotties/mainlogo.json";

function Home() {
  return (
    <Main>
      <LottieCon>
        <Lottie animationData={logo}></Lottie>
      </LottieCon>
      <H1>student managment system</H1>
      <P>created by: Nika Chikovani</P>
    </Main>
  );
}

export default Home;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 25px;
  text-align: center;
  text-transform: capitalize;
  width: fit-content;
  color: #283f5c;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
`;

const P = styled.p`
  color: #3a5372;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7);
  font-weight: 600;
  text-align: center;
`;

const LottieCon = styled.div`
  height: 20vw;
  width: 20vw;
`;
