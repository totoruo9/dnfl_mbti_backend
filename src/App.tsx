import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import DropBoard from "./Components/DropBoard";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { createdItem, ICreatedItem, questionItem } from "./atoms";
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

// const MoreItem = styled.div`
//   background: ${props => props.theme.colorSet.blackWhite.gray500};
//   width: 390px;
//   margin: 0 ${props => props.theme.paddingSet.pd_8};
//   height: 300px;
//   border-radius: ${props => props.theme.boxSet.borderRadius};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   span {
//     text-align: center;
//     color: ${props => props.theme.colorSet.blackWhite.white};
//     font-size: ${props => props.theme.textSet.size.title};
//   }
// `;

function App() {
  // const [questionWrap, setQuestionWrap] = useRecoilState(questionItem);
  const createdAnswer = useRecoilValue(createdItem);

  // const onAddBoard = () => {
  //   const createData = {
  //     id: `${questionWrap.length+1}ID${Date.now()}`,
  //     value: <CreateQuestion key={`${questionWrap.length+1}ID${Date.now()}`} />
  //   }

  //   console.log(createData);

  //   setQuestionWrap(prev => [...prev, createData]);
  //   console.log(questionWrap);
  // }

  console.log(createdAnswer);

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
      {/* {
        questionWrap.map(item => {
          return item.value
        })
      } */}
      {/* <MoreItem onClick={onAddBoard}>
        <span>
          +<br />
          More Item
        </span>
      </MoreItem> */}
    </Wrapper>
  );
}

export default App;
