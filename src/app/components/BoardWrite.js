import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FormContainer,
  Input,
  TextArea,
  Select,
  Button,
} from "../styles/BoardWriteStyles";

export default function BoardWrite({ onComplete }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("NOTICE");
  const [addFile, setAddFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const jsonData = JSON.stringify({
      title: title,
      content: content,
      category: category,
    });
  
    formData.append('request', new Blob([jsonData], { type: 'application/json' }));
  
    if (addFile) {
      formData.append('file', addFile);
    }

    try {
      const response = await axiosInstance.post(
        "https://front-mission.bigs.or.kr/boards",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        onComplete(response.data);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error.response?.data || error.message);
      console.error("Status:", error.response?.status);
      console.error("Headers:", error.response?.headers);
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
        <Input
          type="file"
          onChange={(e) => setAddFile(e.target.files[0])}
          accept="image/*"
        />
        <Button type="submit">작성완료</Button>
        <Button type="button" onClick={() => onComplete()}>
          취소
        </Button>
      </form>
    </FormContainer>
  );
}
