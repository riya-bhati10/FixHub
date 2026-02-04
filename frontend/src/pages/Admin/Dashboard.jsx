import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fixhubTheme from "../../theme/fixhubTheme";
import { getDashboardStats, getChartData } from "../../Services/adminService";
import { CardSkeleton } from "../../components/Admin/LoadingSkeleton";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Wrench, CheckCircle, DollarSign, TrendingUp, Activity } from 'lucide-react';

const Container = styled.div`
  max-width: 1600px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h2`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 28px;
  margin: 0 0 8px 0;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 14px;
  margin: 0;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.$color || fixhubTheme.admin.primaryMint};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`;

const CardTitle = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
`;

const CardValue = styled.div`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const CardChange = styled.div`
  color: ${props => props.$positive ? fixhubTheme.admin.success : fixhubTheme.admin.danger};
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChartCard = styled.div`
  background: ${fixhubTheme.admin.bgCard};
  border: 1px solid ${fixhubTheme.admin.borderDefault};
  border-radius: 8px;
  padding: 24px;
  height: fit-content;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 16px;
  margin: 0;
  font-weight: 600;
`;

const ChartPeriod = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 13px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: start;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${fixhubTheme.admin.borderDefault};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 12px;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background: ${fixhubTheme.admin.bgMain};
  border-radius: 8px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  color: ${fixhubTheme.admin.textMuted};
  font-size: 12px;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  color: ${fixhubTheme.admin.textPrimary};
  font-size: 18px;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  background: ${fixhubTheme.admin.danger}20;
  color: ${fixhubTheme.admin.danger};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${fixhubTheme.admin.danger};
`;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({ weeklyData: [], monthlyData: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, chartsData] = await Promise.all([
        getDashboardStats(),
        getChartData()
      ]);
      setStats(statsData);
      setChartData(chartsData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CardSkeleton />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Header>
        <PageTitle>Dashboard</PageTitle>
        <Subtitle>Monitor your platform performance and key metrics</Subtitle>
      </Header>

      <MainGrid>
        <LeftSection>
          <CardsGrid>
            <Card $color={fixhubTheme.admin.primaryMint}>
              <CardHeader>
                <CardTitle>Total Technicians</CardTitle>
                <CardIcon $bg={`${fixhubTheme.admin.primaryMint}20`} $color={fixhubTheme.admin.primaryMint}>
                  <Wrench size={20} />
                </CardIcon>
              </CardHeader>
              <CardValue>{stats?.totalTechnicians || 0}</CardValue>
              <CardChange $positive={true}>
                <TrendingUp size={14} /> +12% from last month
              </CardChange>
            </Card>

            <Card $color={fixhubTheme.admin.info}>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
                <CardIcon $bg={`${fixhubTheme.admin.info}20`} $color={fixhubTheme.admin.info}>
                  <Users size={20} />
                </CardIcon>
              </CardHeader>
              <CardValue>{stats?.totalCustomers || 0}</CardValue>
              <CardChange $positive={true}>
                <TrendingUp size={14} /> +8% from last month
              </CardChange>
            </Card>

            <Card $color={fixhubTheme.admin.success}>
              <CardHeader>
                <CardTitle>Completed Services</CardTitle>
                <CardIcon $bg={`${fixhubTheme.admin.success}20`} $color={fixhubTheme.admin.success}>
                  <CheckCircle size={20} />
                </CardIcon>
              </CardHeader>
              <CardValue>{stats?.totalCompletedServices || 0}</CardValue>
              <CardChange $positive={true}>
                <TrendingUp size={14} /> +15% from last week
              </CardChange>
            </Card>

            <Card $color={fixhubTheme.admin.warning}>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardIcon $bg={`${fixhubTheme.admin.warning}20`} $color={fixhubTheme.admin.warning}>
                  <DollarSign size={20} />
                </CardIcon>
              </CardHeader>
              <CardValue>₹{stats?.totalRevenue || 0}</CardValue>
              <CardChange $positive={true}>
                <TrendingUp size={14} /> +10% commission
              </CardChange>
            </Card>
          </CardsGrid>

          <ChartCard>
            <ChartHeader>
              <ChartTitle>Weekly Services Overview</ChartTitle>
              <ChartPeriod>Last 7 days</ChartPeriod>
            </ChartHeader>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.weeklyData}>
                <defs>
                  <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={fixhubTheme.admin.primaryMint} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={fixhubTheme.admin.primaryMint} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={fixhubTheme.admin.borderDefault} vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke={fixhubTheme.admin.textMuted}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke={fixhubTheme.admin.textMuted}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: fixhubTheme.admin.bgSecondary,
                    border: `1px solid ${fixhubTheme.admin.borderDefault}`,
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  labelStyle={{ color: fixhubTheme.admin.textPrimary }}
                />
                <Area 
                  type="monotone" 
                  dataKey="services" 
                  stroke={fixhubTheme.admin.primaryMint}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorServices)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </LeftSection>

        <RightSection>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>User Growth</ChartTitle>
              <ChartPeriod>Last 6 months</ChartPeriod>
            </ChartHeader>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={fixhubTheme.admin.borderDefault} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke={fixhubTheme.admin.textMuted}
                  style={{ fontSize: '11px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke={fixhubTheme.admin.textMuted}
                  style={{ fontSize: '11px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: fixhubTheme.admin.bgSecondary,
                    border: `1px solid ${fixhubTheme.admin.borderDefault}`,
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke={fixhubTheme.admin.info}
                  strokeWidth={2}
                  dot={{ fill: fixhubTheme.admin.info, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <StatsRow>
              <StatItem>
                <StatLabel>Active</StatLabel>
                <StatValue style={{ color: fixhubTheme.admin.success }}>
                  {(stats?.totalTechnicians || 0) + (stats?.totalCustomers || 0) - (stats?.totalBlockedUsers || 0)}
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Blocked</StatLabel>
                <StatValue style={{ color: fixhubTheme.admin.danger }}>
                  {stats?.totalBlockedUsers || 0}
                </StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Total</StatLabel>
                <StatValue>
                  {(stats?.totalTechnicians || 0) + (stats?.totalCustomers || 0)}
                </StatValue>
              </StatItem>
            </StatsRow>
          </ChartCard>

          <ChartCard>
            <ChartHeader>
              <ChartTitle>Recent Activity</ChartTitle>
            </ChartHeader>
            <ActivityList>
              <ActivityItem>
                <ActivityIcon $bg={`${fixhubTheme.admin.success}20`} $color={fixhubTheme.admin.success}>
                  <CheckCircle size={18} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>New service completed</ActivityTitle>
                  <ActivityTime>2 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon $bg={`${fixhubTheme.admin.info}20`} $color={fixhubTheme.admin.info}>
                  <Users size={18} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>New customer registered</ActivityTitle>
                  <ActivityTime>15 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon $bg={`${fixhubTheme.admin.primaryMint}20`} $color={fixhubTheme.admin.primaryMint}>
                  <Wrench size={18} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Technician verified</ActivityTitle>
                  <ActivityTime>1 hour ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon $bg={`${fixhubTheme.admin.warning}20`} $color={fixhubTheme.admin.warning}>
                  <DollarSign size={18} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Payment received</ActivityTitle>
                  <ActivityTime>2 hours ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </ChartCard>
        </RightSection>
      </MainGrid>
    </Container>
  );
};

export default AdminDashboard;
