import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  BoardContainer, 
  BoardTitle,
  BoardInfo,
  BoardContent,
  Button,
  EditButton,
  BoardImage,
  Input,
  TextArea,
  DeleteButton,
  ButtonContainer
} from '../styles/BoardDetailStyles';

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
      const response = await axiosInstance.get(
        `https://front-mission.bigs.or.kr/boards/${boardId}`
      );
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
      category: board.boardCategory,
    }).toString();

    try {
      const response = await axiosInstance.patch(
        `https://front-mission.bigs.or.kr/boards/${boardId}?${queryParams}`,
        editFile ? { file: editFile } : null,
        {
          headers: {
            "Content-Type": editFile
              ? "multipart/form-data"
              : "application/json",
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

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(
          `https://front-mission.bigs.or.kr/boards/${boardId}`
        );
        alert("게시글이 성공적으로 삭제되었습니다.");
        onBack();
      } catch (error) {
        console.error("게시글 삭제 실패:", error.message);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
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
          <Input type="file" onChange={(e) => setEditFile(e.target.files[0])} />
          <Button type="submit">저장</Button>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
        </form>
      ) : (
        <>
          <BoardTitle>{board.title}</BoardTitle>
          <BoardInfo>
            <p>게시글번호: {board.id}</p>
            <p>카테고리: {board.boardCategory}</p>
            <p>작성일: {new Date(board.createdAt).toLocaleString()}</p>
          </BoardInfo>
          {board.imageUrl && (
            <BoardImage src={board.imageUrl} alt="게시글 이미지" />
          )}
          <BoardContent>{board.content}</BoardContent>
          <ButtonContainer>
            <EditButton onClick={handleEdit}>글 수정</EditButton>
            <DeleteButton onClick={handleDelete}>글 삭제</DeleteButton>
            <Button onClick={onBack}>목록으로 돌아가기</Button>
          </ButtonContainer>
        </>
      )}
    </BoardContainer>
  );
}
