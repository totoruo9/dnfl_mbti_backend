import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { createdItem } from "./atoms";
import CreateQuestion from "./Components/CreateQuestion";
import CreatedQuestion from "./Components/CreatedQuestion";

const Wrapper = styled.div`
    width:100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 20px;
    flex-wrap: wrap;
`;

function App() {
  const createdAnswer = useRecoilValue(createdItem);

  return (
    <Wrapper>
      {
        createdAnswer.map((item) => (
          item.modify
            ? <CreateQuestion key={item.id}  question={item.question} answer={item.answer} modify={item.modify} boardId={item.id} />
            : <CreatedQuestion key={item.id} question={item.question} answer={item.answer} modify={item.modify} boardId={item.id} />
        ))
      }
      <CreateQuestion />
    </Wrapper>
  );
}

export default App;
