import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";
import { getCompletedBookings } from "../../Services/adminService";
import Table from "../../Components/Admin/Table";
import { TableSkeleton } from "../../Components/Admin/LoadingSkeleton";

const Container = styled.div`
  max-width: 1400px;
`;

const PageTitle = styled.h2`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 28px;
  margin: 0 0 24px 0;
`;

const EarningsCard = styled.div`
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
`;

const EarningsInfo = styled.div``;

const EarningsLabel = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 14px;
  margin-bottom: 8px;
`;

const EarningsValue = styled.div`
  color: ${fixhubTheme.admin.primaryMint};
  font-size: 36px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: ${fixhubTheme.admin.textSecondary};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
`;

const ErrorMessage = styled.div`
  background: ${fixhubTheme.admin.danger}20;
  color: ${fixhubTheme.admin.danger};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${fixhubTheme.admin.danger};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: ${fixhubTheme.admin.textMuted};
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 8px;
`;

const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      console.log('Fetching earnings...');
      const data = await getCompletedBookings();
      console.log('Earnings data:', data);
      setEarnings(data);
      setError(null);
    } catch (err) {
      console.error('Earnings error:', err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to load earnings data";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <TableSkeleton />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  const completedServices = earnings?.completedServices || [];

  return (
    <Container>
      <PageTitle>Earnings Overview</PageTitle>

      <EarningsCard>
        <EarningsInfo>
          <EarningsLabel>Total Admin Commission (10%)</EarningsLabel>
          <EarningsValue>₹{earnings?.totalAdminEarnings?.toFixed(2) || '0.00'}</EarningsValue>
        </EarningsInfo>
        <EarningsInfo>
          <EarningsLabel>Total Services Completed</EarningsLabel>
          <EarningsValue>{earnings?.totalCompletedServices || 0}</EarningsValue>
        </EarningsInfo>
      </EarningsCard>

      {completedServices.length === 0 ? (
        <EmptyState>No completed services yet</EmptyState>
      ) : (
        <Table
          columns={["Technician Name", "Service Name", "Service Charge", "Technician Income (90%)", "Admin Commission (10%)"]}
          data={completedServices}
          renderRow={(service) => (
            <>
              <Td>{service.technicianName || 'N/A'}</Td>
              <Td>{service.serviceName || 'N/A'}</Td>
              <Td>₹{service.serviceCharge?.toFixed(2) || '0.00'}</Td>
              <Td>₹{service.technicianIncome?.toFixed(2) || '0.00'}</Td>
              <Td>₹{service.adminCommission?.toFixed(2) || '0.00'}</Td>
            </>
          )}
        />
      )}
    </Container>
  );
};

export default Earnings;
