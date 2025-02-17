import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import styled from "styled-components";

const BoardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BoardTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const BoardInfo = styled.div`
  color: #666;
  margin-bottom: 20px;
`;

const BoardContent = styled.div`
  line-height: 1.6;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const EditButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;

const BoardImage = styled.img`
  max-width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
`;

export default function BoardDetail({ boardId, onBack }) {
  const [board, setBoard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editFile, setEditFile] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const response = await axiosInstance.get(`https://front-mission.bigs.or.kr/boards/${boardId}`);
      setBoard(response.data);
      setEditTitle(response.data.title);
      setEditContent(response.data.content);
    } catch (error) {
      console.error("게시글 조회 실패:", error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      title: editTitle,
      content: editContent,
      category: board.boardCategory
    }).toString();
  
    try {
      const response = await axiosInstance.patch(
        `https://front-mission.bigs.or.kr/boards/${boardId}?${queryParams}`,
        editFile ? { file: editFile } : null,
        {
          headers: {
            "Content-Type": editFile ? "multipart/form-data" : "application/json",
          },
        }
      );
      setBoard(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("게시글 수정 실패:", error.message);
    }
  };
  

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(board.title);
    setEditContent(board.content);
    setEditFile(null);
  };

  if (!board) return <div>Loading...</div>;

  return (
    <BoardContainer>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목"
          />
          <TextArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="내용"
          />
          <Input
            type="file"
            onChange={(e) => setEditFile(e.target.files[0])}
          />
          <Button type="submit">저장</Button>
          <Button type="button" onClick={handleCancel}>취소</Button>
        </form>
      ) : (
        <>
          <BoardTitle>{board.title}</BoardTitle>
          <BoardInfo>
            <p>게시글번호: {board.id}</p>
            <p>카테고리: {board.boardCategory}</p>
            <p>작성일: {new Date(board.createdAt).toLocaleString()}</p>
          </BoardInfo>
          <EditButton onClick={handleEdit}>글 수정</EditButton>
          {board.imageUrl && <BoardImage src={board.imageUrl} alt="게시글 이미지" />}
          <BoardContent>{board.content}</BoardContent>
          <Button onClick={onBack}>목록으로 돌아가기</Button>
        </>
      )}
    </BoardContainer>
  );
}
