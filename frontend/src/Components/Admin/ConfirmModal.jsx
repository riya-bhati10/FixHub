import React from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";
import Button from "./Button";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h3`
  color: ${fixhubTheme.admin.textPrimary};
  margin: 0 0 12px 0;
  font-size: 18px;
`;

const Message = styled.p`
  color: ${fixhubTheme.admin.textSecondary};
  margin: 0 0 24px 0;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Actions>
          <Button variant="primary" onClick={onCancel}>{cancelText}</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmText}</Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
