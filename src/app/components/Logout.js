"use client";

import React from "react";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const handleLogout = () => {

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    console.log("로그아웃 성공: 쿠키가 삭제되었습니다.");
    alert("로그아웃 되었습니다.");


    window.location.href = "/";
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
