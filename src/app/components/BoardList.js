import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import styled from "styled-components";
import BoardDetail from "./BoardDetail";
import BoardWrite from "./BoardWrite";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.$active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CategoryButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.$active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 2fr;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 2fr;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const categoryMap = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
  };

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
    <>
       <div>
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
      </div>

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

      <button onClick={handleWriteClick}>글작성</button>
      <PaginationContainer>
        <ArrowButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &lt;
        </ArrowButton>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => handlePageChange(index)}
            $active={currentPage === index}
          >
            {index + 1}
          </PageButton>
        ))}
        <ArrowButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          &gt;
        </ArrowButton>
      </PaginationContainer>
    </>
  );
}
