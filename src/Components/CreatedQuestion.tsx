import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createdItem, ICreatedItem, questionItem, questionItemSelector } from "../atoms";
import DropItem from "./DropItem";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => props.theme.paddingSet.pd_8};
`;

const Board = styled.div`
    background: ${props => props.theme.colorSet.blackWhite.white};
    width: 380px;
    min-height : 300px;
    border-radius: ${props => props.theme.boxSet.borderRadius};
    padding: ${props => props.theme.paddingSet.pd_16} ${props => props.theme.paddingSet.pd_8};
    box-shadow: ${props => props.theme.boxSet.box_shadow};
`;

const Title = styled.h3`
    font-size: ${props => props.theme.textSet.size.title};
    text-align: center;
    padding-bottom: ${props => props.theme.paddingSet.pd_12};
    color: ${props => props.theme.textSet.color.gray900};
    font-weight: ${props => props.theme.textSet.weight.extra_bold};
`;

interface ICreatedQ {
    question: string;
    answer: {
        [key:string]: {
            value: string;
            result: string;
        };
    }
}

function CreatedQuestion ({question, answer, boardId}:any) {
    const setCreatedQuestion = useSetRecoilState(questionItemSelector);

    const onModify = () => {
        setCreatedQuestion((prev): any => {
            return boardId;
        })
    }

    return (
        <Wrapper>
            <Board>
                <Title>{question}</Title>
                {
                    answer.map(({value, result}:any) => {
                        return (
                            <div key={result+value}>
                                <span>{value} <strong>{result}</strong></span>
                            </div>
                        )
                    })
                }
                <button onClick={onModify}>수정하기</button>
            </Board>
        </Wrapper>
    );
};

export default CreatedQuestion