import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { createdItem } from "../atoms";
import atomModify from "../hooks/atomModify";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${props => props.theme.paddingSet.pd_8};
`;

const AnswerWrapper = styled.div`
    width: 100%;
    background: ${props => props.theme.colorSet.blackWhite.gray300};
    height: ${props => props.theme.boxSet.height.md};
    display: flex;
    border-radius: ${props => props.theme.boxSet.borderRadius};
    justify-content: space-between;
`;

const AnswerValue = styled.input`
    width: 80%;
    border: 0;
    background: rgba(0,0,0,0);
    color: ${props => props.theme.colorSet.blackWhite.gray900};
    padding: ${props => props.theme.paddingSet.pd_4} ${props => props.theme.paddingSet.pd_12};

    &::placeholder {
        color: ${props => props.theme.colorSet.blackWhite.gray500};
    }
`;

const AnswerResult = styled.select`
    width: 20%;
    border: 2px solid ${props => props.theme.colorSet.blackWhite.gray300};
    border-radius: ${props => props.theme.boxSet.borderRadius};
`;

const RemoveItemBtn = styled.div`
    min-width: ${props => props.theme.boxSet.height.sm};
    height: ${props => props.theme.boxSet.height.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

interface IAnserComponent {
    qustionName: any;
    placeholder: string;
    register: any;
    value: {
        id: string;
        result: string;
        value: string;
    }[];
    index: number;
    setAnswerId: any;
    boardId: string;
    resetField: any;
}

function AnswerComponent({boardId, qustionName, placeholder, register, value=[], index, setAnswerId, resetField}:IAnserComponent){
    const [createdQuestion, setCreatedQuestion] = useRecoilState(createdItem);
    
    const delAnswerWrapper = async () => {
        let copiedArray:string[] = [];

        await setAnswerId((prev:any) => {
            copiedArray = [...prev];
            copiedArray.splice(index, 1);

            resetField(`answer.${prev[index]}.value`);
            resetField(`answer.${prev[index]}.result`);

            return copiedArray;
        });

        const findItem = createdQuestion.find(item => item.id === boardId);
        const answerArray = findItem?.answer.filter((item:any) => {
            return copiedArray.indexOf(item.id) !== -1;
        });

        console.log(answerArray);

        await atomModify({
            boardId: boardId,
            atom: createdQuestion,
            setAtom: setCreatedQuestion,
            modify: true,
            answerArray
        });
    };

    let getValue;
    if(value.length !== 0) {
        getValue = value.find(item => item.id === qustionName);
    };

    return (
        <Wrapper>
            <AnswerWrapper>
                <AnswerValue {...register(`answer.${qustionName}.value`, {value: getValue?.value, register: "답변을 입력해주세요!"})} placeholder={placeholder} />
                <AnswerResult {...register(`answer.${qustionName}.result`, {value: getValue?.result})}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </AnswerResult>
            </AnswerWrapper>
            {
                index >= 2
                    ? <RemoveItemBtn onClick={delAnswerWrapper}>❌</RemoveItemBtn>
                    : null
            }
        </Wrapper>
    )
}

export default AnswerComponent;