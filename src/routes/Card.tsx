import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { createdItem } from "../atoms";
import CreateQuestion from "../Components/CreateQuestion";
import CreatedQuestion from "../Components/CreatedQuestion";
import { Link } from "react-router-dom";

const Wrapper = styled.main`
    width:100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  width:100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

function Card() {
  const createdAnswer = useRecoilValue(createdItem);

  return (
    <Wrapper>
      <h2>생성된 질문 : {createdAnswer.length}</h2>
      <CardWrapper>
        {
          createdAnswer.map((item) => (
            item.modify
              ? <CreateQuestion key={item.id}  question={item.question} answer={item.answer} modify={item.modify} boardId={item.id} />
              : <CreatedQuestion key={item.id} question={item.question} answer={item.answer} modify={item.modify} boardId={item.id} />
          ))
        }
        <CreateQuestion />
      </CardWrapper>

      <Link to="/diagram">다음 (질문 배치하기)</Link>
    </Wrapper>
  );
}

export default Card;
