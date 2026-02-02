import React from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";

const Badge = styled.span`
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 12px;
  
  ${props => props.status === 'active' && `
    background: ${fixhubTheme.admin.success}20;
    color: ${fixhubTheme.admin.success};
  `}
  
  ${props => props.status === 'blocked' && `
    background: ${fixhubTheme.admin.danger}20;
    color: ${fixhubTheme.admin.danger};
  `}
`;

const StatusBadge = ({ isBlocked }) => {
  return (
    <Badge status={isBlocked ? 'blocked' : 'active'}>
      {isBlocked ? 'Blocked' : 'Active'}
    </Badge>
  );
};

export default StatusBadge;
