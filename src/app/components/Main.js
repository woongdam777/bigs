"use client";

import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import Logout from './Logout'
import BoardList from './BoardList';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>대시보드</h1>
      <p>환영합니다</p>
      <p>아이디: {user?.username || 'N/A'}</p>
      <p>이름: {user?.name || '사용자'}님.</p>
      <Logout />
      <BoardList />
    </div>
  );
}



export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
}
