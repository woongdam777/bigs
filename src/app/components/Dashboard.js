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
          <p>환영합니다</p>
          <p>아이디: {user?.username || 'N/A'}</p>
          <p>이름: {user?.name || '사용자'}님.</p>
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
