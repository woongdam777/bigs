import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FormContainer, 
  Input,
  TextArea,
  Select,
  Button,

} from '../styles/BoardWriteStyles';

export default function BoardWrite({ onComplete }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("NOTICE");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      category
    };

    try {
      const response = await axiosInstance.post(
        'https://front-mission.bigs.or.kr/boards',
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onComplete(response.data);
    } catch (error) {
      console.error("게시글 작성 실패:", error.message);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="NOTICE">공지사항</option>
          <option value="FREE">자유</option>
          <option value="QNA">Q&A</option>
          <option value="ETC">기타</option>
        </Select>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          required
        />
        <Button type="submit">작성완료</Button>
        <Button type="button" onClick={onComplete}>취소</Button>
      </form>
    </FormContainer>
  );
}
