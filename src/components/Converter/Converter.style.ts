import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2em;
  line-height: 1.1;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 2px solid lightgray;
`;

export const Result = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;
