import { useAuth } from '../context/AuthContext';
import Logout from './Logout';
import BoardList from './BoardList';
import {
  DashboardContainer,
  LeftSection,
  RightSection,
  Logo,
  UserInfo,
} from '../styles/DashboardStyles';


function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <LeftSection>
        <Logo>BIGS</Logo>
        <UserInfo>
          <p>환영합니다. {user?.name || '사용자'}님.</p>
          <p>{user?.username || 'N/A'}</p>
        </UserInfo>
        <Logout />
      </LeftSection>
      <RightSection>
        <BoardList />
      </RightSection>
    </DashboardContainer>
  );
}

export default Dashboard;
