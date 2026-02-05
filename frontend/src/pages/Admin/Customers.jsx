import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from 'sonner';
import fixhubTheme from "../../theme/fixhubTheme";
import { getAllCustomers, blockUnblockUser } from "../../Services/adminService";
import Button from "../../components/admin/Button";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { CardSkeleton } from "../../components/admin/LoadingSkeleton";
import { User, Mail, Phone } from 'lucide-react';
import { HandleMessageUIError, HandleMessageUISuccess } from '../../utils/toastConfig';

const Container = styled.div`
  max-width: 1400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PageTitle = styled.h2`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 28px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const SearchBar = styled.input`
  padding: 10px 16px;
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 6px;
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 14px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${fixhubTheme.admin.primaryMint};
  }
  
  &::placeholder {
    color: ${fixhubTheme.admin.textMuted};
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, #1a2332 0%, #1f2937 100%);
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(45, 212, 191, 0.15);
    border-color: ${fixhubTheme.admin.primaryMint};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${fixhubTheme.admin.info}, ${fixhubTheme.admin.primaryMint});
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 18px;
  margin: 0 0 8px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserEmail = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 13px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserPhone = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
  padding: 12px;
  border-top: 1px solid ${fixhubTheme.admin.borderDefault};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
  background: rgba(88, 166, 255, 0.05);
  border-radius: 8px;
`;

const Stat = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 12px;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  color: ${fixhubTheme.admin.info};
  font-size: 20px;
  font-weight: 700;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background: ${props => props.active ? fixhubTheme.admin.primaryMint : fixhubTheme.admin.bgCard};
  color: ${props => props.active ? fixhubTheme.admin.bgMain : fixhubTheme.admin.textSecondary};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${fixhubTheme.admin.primaryMintHover};
    color: ${fixhubTheme.admin.bgMain};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: ${fixhubTheme.admin.danger}20;
  color: ${fixhubTheme.admin.danger};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${fixhubTheme.admin.danger};
`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.fullname?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomers();
      console.log('Customers data:', data);
      setCustomers(data.customers || []);
      setFilteredData(data.customers || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await blockUnblockUser(selectedUser._id);
      await fetchCustomers();
      toast.success(`Customer ${selectedUser.isBlocked ? 'unblocked' : 'blocked'} successfully!`, HandleMessageUISuccess());
      setModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user status", HandleMessageUIError());
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) return <CardSkeleton />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Header>
        <PageTitle>Customers Management</PageTitle>
        <SearchBar
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <CardsGrid>
        {paginatedData.map((customer) => (
          <Card key={customer._id}>
            <CardHeader>
              <UserInfo>
                <UserName>
                  <User size={16} />
                  {customer.fullname?.firstname} {customer.fullname?.lastname}
                </UserName>
                <UserEmail>
                  <Mail size={12} />
                  {customer.email}
                </UserEmail>
                <UserPhone>
                  <Phone size={12} />
                  {customer.phone}
                </UserPhone>
              </UserInfo>
              <StatusBadge isBlocked={customer.isBlocked} />
            </CardHeader>
            
            <StatsRow>
              <Stat>
                <StatLabel>Total Bookings</StatLabel>
                <StatValue>{customer.totalBookings || 0}</StatValue>
              </Stat>
            </StatsRow>
            
            <CardFooter>
              <Button
                variant={customer.isBlocked ? "success" : "danger"}
                size="small"
                onClick={() => handleBlockClick(customer)}
              >
                {customer.isBlocked ? "Unblock" : "Block"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardsGrid>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title={selectedUser?.isBlocked ? "Unblock Customer" : "Block Customer"}
        message={`Are you sure you want to ${selectedUser?.isBlocked ? 'unblock' : 'block'} ${selectedUser?.fullname?.firstname}? ${!selectedUser?.isBlocked ? 'They will not be able to login.' : ''}`}
        onConfirm={handleConfirmBlock}
        onCancel={() => setModalOpen(false)}
        confirmText={selectedUser?.isBlocked ? "Unblock" : "Block"}
      />
    </Container>
  );
};

export default Customers;
