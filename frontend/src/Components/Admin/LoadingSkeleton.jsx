import React from "react";
import styled, { keyframes } from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

const Skeleton = styled.div`
  background: ${fixhubTheme.admin.bgHover};
  background-image: linear-gradient(
    to right,
    ${fixhubTheme.admin.bgHover} 0%,
    ${fixhubTheme.admin.borderDefault} 20%,
    ${fixhubTheme.admin.bgHover} 40%,
    ${fixhubTheme.admin.bgHover} 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s linear infinite;
  border-radius: 4px;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0'};
`;

export const TableSkeleton = () => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} height="50px" margin="8px 0" />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div>
    <Skeleton height="80px" margin="0 0 16px 0" />
    <Skeleton height="80px" margin="0 0 16px 0" />
    <Skeleton height="80px" />
  </div>
);

export default Skeleton;
