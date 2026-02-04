import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";
import { useUser } from "../../context/UserContext";
import { LayoutDashboard, Wrench, Users, DollarSign, Menu, X } from 'lucide-react';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${fixhubTheme.admin.bgMain};
`;

const Sidebar = styled.aside`
  width: 250px;
  background: ${fixhubTheme.admin.bgSecondary};
  border-right: 1px solid ${fixhubTheme.admin.borderDefault};
  padding: 24px 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1000;
  
  @media (max-width: 768px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const Logo = styled.div`
  padding: 0 24px 24px;
  font-size: 24px;
  font-weight: 700;
  color: ${fixhubTheme.admin.primaryMint};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
`;

const Nav = styled.nav`
  margin-top: 24px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: ${fixhubTheme.admin.textSecondary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${fixhubTheme.admin.bgHover};
    color: ${fixhubTheme.admin.textPrimary};
  }
  
  &.active {
    background: ${fixhubTheme.admin.bgHover};
    color: ${fixhubTheme.admin.primaryMint};
    border-left: 3px solid ${fixhubTheme.admin.primaryMint};
  }
`;

const MainContent = styled.div`
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TopBar = styled.header`
  background: ${fixhubTheme.admin.bgSecondary};
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Title = styled.h1`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 20px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const UserName = styled.span`
  color: ${fixhubTheme.admin.textSecondary};
  font-size: 14px;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const LogoutBtn = styled.button`
  padding: 8px 16px;
  background: ${fixhubTheme.admin.danger};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const Content = styled.main`
  padding: 32px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const AdminLayout = () => {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <LayoutContainer>
      <Overlay $isOpen={sidebarOpen} onClick={closeSidebar} />
      <Sidebar $isOpen={sidebarOpen}>
        <Logo>FixHub Admin</Logo>
        <Nav>
          <NavItem to="/admin/dashboard" onClick={closeSidebar}>
            <LayoutDashboard size={18} /> Dashboard
          </NavItem>
          <NavItem to="/admin/technicians" onClick={closeSidebar}>
            <Wrench size={18} /> Technicians
          </NavItem>
          <NavItem to="/admin/customers" onClick={closeSidebar}>
            <Users size={18} /> Customers
          </NavItem>
          <NavItem to="/admin/earnings" onClick={closeSidebar}>
            <DollarSign size={18} /> Earnings
          </NavItem>
        </Nav>
      </Sidebar>
      
      <MainContent>
        <TopBar>
          <LeftSection>
            <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </MenuButton>
            <Title>Admin Panel</Title>
          </LeftSection>
          <UserSection>
            <UserName>{user?.fullname?.firstname || 'Admin'}</UserName>
            <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
          </UserSection>
        </TopBar>
        
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
