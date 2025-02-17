import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import BoardDetail from "./BoardDetail";
import BoardWrite from "./BoardWrite";
import {
  BoardContainer,
  CategoryContainer,
  CategoryButton,
  TableContainer,
  TableHeader,
  TableRow,
  WriteButton,
  PaginationContainer,
  PageButton
} from '../styles/BoardListStyles';

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "https://front-mission.bigs.or.kr/boards/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리 목록 조회 실패:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const fetchBoards = async () => {
    try {
      let url = `https://front-mission.bigs.or.kr/boards?page=${currentPage}&size=10`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const response = await axiosInstance.get(url);
      setBoards(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("게시글 목록 조회 실패:", error.message);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "전체" ? null : category);
    setCurrentPage(0);
  };

  const handleBoardClick = (boardId) => {
    setSelectedBoardId(boardId);
  };

  const handleBackToList = () => {
    setSelectedBoardId(null);
  };

  const handleWriteClick = () => {
    setIsWriting(true);
  };

  const handleCreateComplete = () => {
    setIsWriting(false);
    fetchBoards();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isWriting) {
    return <BoardWrite onComplete={handleCreateComplete} />;
  }

  if (selectedBoardId) {
    return <BoardDetail boardId={selectedBoardId} onBack={handleBackToList} />;
  }

  return (
    <BoardContainer>
      <CategoryContainer>
        <CategoryButton
          onClick={() => handleCategoryChange("전체")}
          $active={selectedCategory === null}
        >
          전체
        </CategoryButton>
        {Object.entries(categories).map(([key, value]) => (
          <CategoryButton
            key={key}
            onClick={() => handleCategoryChange(key)}
            $active={selectedCategory === key}
          >
            {value}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <TableContainer>
        <TableHeader>
          <span>카테고리</span>
          <span>게시글번호</span>
          <span>제목</span>
          <span>작성일</span>
        </TableHeader>
        {boards
          .filter(board => !selectedCategory || board.category === selectedCategory)
          .map((board) => (
            <TableRow key={board.id} onClick={() => handleBoardClick(board.id)}>
              <span>{categories[board.category]}</span>
              <span>{board.id}</span>
              <span>{board.title}</span>
              <span>{new Date(board.createdAt).toLocaleString()}</span>
            </TableRow>
          ))}
      </TableContainer>

      <WriteButton onClick={handleWriteClick}>글작성</WriteButton>

      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &lt;
        </PageButton>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index)}
            $active={currentPage === index}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          &gt;
        </PageButton>
      </PaginationContainer>
    </BoardContainer>
  );
}
