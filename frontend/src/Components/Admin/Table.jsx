import React from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";

const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${fixhubTheme.admin.bgCard};
  border-radius: 8px;
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  
  @media (max-width: 768px) {
    -webkit-overflow-scrolling: touch;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: ${fixhubTheme.admin.textMuted};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
  background: ${fixhubTheme.admin.bgSecondary};
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${fixhubTheme.admin.textSecondary};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
`;

const Tr = styled.tr`
  &:hover {
    background: ${fixhubTheme.admin.bgHover};
  }
  &:last-child td {
    border-bottom: none;
  }
`;

const Table = ({ columns, data, renderRow }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <Th key={idx}>{col}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <Tr key={idx}>{renderRow(item)}</Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
