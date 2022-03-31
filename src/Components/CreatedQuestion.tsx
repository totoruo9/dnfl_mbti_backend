import { useRecoilState } from "recoil";
import styled from "styled-components";
import { createdItem } from "../atoms";
import atomModify from "../hooks/atomModify";

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
    margin-bottom: ${props => props.theme.paddingSet.pd_20};
    color: ${props => props.theme.textSet.color.gray900};
    font-weight: ${props => props.theme.textSet.weight.extra_bold};
    height: ${props => props.theme.boxSet.height.md};
    border-bottom: 1px solid ${props => props.theme.colorSet.blackWhite.gray300};
`;

const SAnswerWrap = styled.div`
    border: 1px solid ${props => props.theme.colorSet.blackWhite.gray300};
    line-height: ${props => props.theme.boxSet.height.sm};
    border-radius: ${props => props.theme.boxSet.borderRadius};
    margin-bottom: ${props => props.theme.paddingSet.pd_8};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.paddingSet.pd_4} ${props => props.theme.paddingSet.pd_12};

    strong {
        display: inline-block;
        background: ${props => props.theme.colorSet.blackWhite.gray700};
        color: ${props => props.theme.colorSet.blackWhite.white};
        padding: 0 ${props => props.theme.paddingSet.pd_12};
        border-radius: ${props => props.theme.boxSet.borderRadius};
        margin-left: ${props => props.theme.paddingSet.pd_8}
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    margin-top: ${props => props.theme.paddingSet.pd_20};
    align-items: center;
    justify-content: center;

`;

const ModifyBtn = styled.button`
    background: ${props => props.theme.colorSet.point};
    height: ${props => props.theme.boxSet.height.lg};
    color: ${props => props.theme.colorSet.blackWhite.white};
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - ${props => props.theme.boxSet.height.lg} - ${props => props.theme.paddingSet.pd_8});
    border: 0;
    cursor: pointer;
`;

const DeleteBtn = styled.div`
    width: ${props => props.theme.boxSet.height.lg};
    height: ${props => props.theme.boxSet.height.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.colorSet.main};
    margin-left: ${props => props.theme.paddingSet.pd_8};
    border-radius: ${props => props.theme.boxSet.borderRadius};
    cursor: pointer;
`;

interface ICreatedQuestion {
    question: string;
    answer: {
        value: string;
        id: string;
        result: string;
    }[];
    boardId: string;
}

function CreatedQuestion ({question, answer, boardId}:any) {
    const [createdQuestion, setCreatedQuestion] = useRecoilState(createdItem);

    const onModify = () => {
        atomModify({
            modify: true,
            boardId: boardId,
            atom: createdQuestion,
            setAtom: setCreatedQuestion
        });
    }

    const onDeleteBoard = () => {
        const findItem = createdQuestion.filter(item => item.id !== boardId);
        setCreatedQuestion(findItem);
    }

    return (
        <Wrapper>
            <Board>
                <Title>{question}</Title>
                {
                    answer.map(({value, result, id}:any) => {
                        return (
                            <SAnswerWrap key={id}>
                                <span>{value} <strong>{result}</strong></span>
                            </SAnswerWrap>
                        )
                    })
                }
                <BtnWrapper>
                    <ModifyBtn onClick={onModify}>수정하기</ModifyBtn>
                    <DeleteBtn onClick={onDeleteBoard}>❌</DeleteBtn>
                </BtnWrapper>
            </Board>
        </Wrapper>
    );
};

export default CreatedQuestion