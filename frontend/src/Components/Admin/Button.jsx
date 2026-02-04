import React from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";

const StyledButton = styled.button`
  padding: ${props => props.size === 'small' ? '6px 12px' : '10px 20px'};
  font-size: ${props => props.size === 'small' ? '13px' : '14px'};
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' && `
    background: ${fixhubTheme.admin.primaryMint};
    color: ${fixhubTheme.admin.bgMain};
    &:hover {
      background: ${fixhubTheme.admin.primaryMintHover};
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #dc2626;
    color: white;
    &:hover {
      background: #b91c1c;
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: ${fixhubTheme.admin.success};
    color: white;
    &:hover {
      background: #2f8540;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = ({ children, variant = "primary", size = "medium", ...props }) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
