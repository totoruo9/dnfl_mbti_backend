import styled from "styled-components";
import {useForm, SubmitHandler} from "react-hook-form";
import React, { ReactEventHandler } from "react";
import AnswerComponent from "./AnswerComponent";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { createdItem, ICreatedItem } from "../atoms";

const Wrapper = styled.div`
    width: 380px;
    min-height: 300px;
    background: ${props => props.theme.colorSet.blackWhite.white};
    border-radius: ${props => props.theme.boxSet.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.theme.boxSet.box_shadow};
    margin: ${props => props.theme.paddingSet.pd_8};
`;

const FormWrap = styled.form`
    width: 100%;
    padding: ${props => props.theme.paddingSet.pd_16};
`;

const QuestionForm = styled.input`
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colorSet.blackWhite.gray300};
    width: 100%;
    font-size: ${props => props.theme.textSet.size.lg};
    padding: ${props => props.theme.paddingSet.pd_8};
    text-align: center;
    margin-bottom: ${props => props.theme.paddingSet.pd_20};
`;

const MoreItem = styled.div`
    height: ${props => props.theme.boxSet.height.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.textSet.color.white};
    background: ${props => props.theme.colorSet.blackWhite.gray500};
    cursor: pointer;
    border-radius: ${props => props.theme.boxSet.borderRadius};
`;

const ButtonWrap = styled.div`
    display: flex;
    height: ${props => props.theme.boxSet.height.lg};
    margin-top: ${props => props.theme.paddingSet.pd_20};
    
    button {
        width: 50%;
        border: 0;
        background: ${props => props.theme.colorSet.blackWhite.gray700};
        color: ${props => props.theme.colorSet.blackWhite.white};

        &:first-child {
            background: ${props => props.theme.colorSet.blackWhite.white};
            border: 1px solid ${props => props.theme.colorSet.blackWhite.gray500};
            color: ${props => props.theme.colorSet.blackWhite.gray500};
            font-weight: ${props => props.theme.textSet.weight.regular};
            margin-right: 2px;
        }

        &:last-child {
            background: ${props => props.theme.colorSet.main};
            margin-left: 2px;
        }
    }
`;

function CreateQuestion ({question="", answer, boardId=""}:any) {
    const {register, handleSubmit, reset} = useForm();
    const [answerId, setAnserId] = useState(["id_1", "id_2"]);
    const [createdAnswer, setCreatedAnswer] = useRecoilState(createdItem);

    const onSubmit:SubmitHandler<ICreatedItem> = (event) => {
        const cloneObj = (obj:{}) => JSON.parse(JSON.stringify(obj));
        const copied = cloneObj(event);

        const filedId = `${Date.now()}id`;
        copied.id = filedId;

        const answerArray = [];
        for(const prop in event.answer) {
            const answerData = cloneObj(event.answer[prop]);
            answerData.id = prop;
            answerArray.push(answerData);
        };
        copied.answer = answerArray;

        copied.modify = false;

        
        /* 이미 생성된 게시판의 경우 db를 추가하는 것이 아닌 수정할 수 있게 설정 */
        if(boardId) {
            let findItemIndex = 0;
            const findItem = createdAnswer.find((item, index) => {
                findItemIndex = index;
                return item.id === boardId;
            });

            const changeModify:any = {
                ...findItem,
                modify: false,
                answer: answerArray,
                question: event.question
            };

            const copyedArray = [...createdAnswer];
            copyedArray.splice(findItemIndex, 1);
            copyedArray.splice(findItemIndex, 0, changeModify);

            return setCreatedAnswer(copyedArray);
        }

        setCreatedAnswer(prev => [...prev, copied]);
        reset();
    };

    const onAddAnswer = () => {
        setAnserId(prev => [...prev, `id_${prev.length+1}`])
    };

    const onResetBtn = (event:React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("RESET!!");

        let findItemIndex = 0;
        const findItem = createdAnswer.find((item, index) => {
            findItemIndex = index;
            return item.id === boardId;
        });

        const changeModify:any = {
            ...findItem,
            answer: [],
            question: "",
        };

        const copyedArray = [...createdAnswer];
        copyedArray.splice(findItemIndex, 1);
        copyedArray.splice(findItemIndex, 0, changeModify);

        setCreatedAnswer(copyedArray);

        reset();
    }

    return(
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <QuestionForm {...register("question", {value: question, required: "질문을 입력해주세요!"})} placeholder="질문을 입력해주세요." />

                {
                    answerId.map((item, index) => (
                        <AnswerComponent key={item} register={register} qustionName={item} placeholder="답변을 입력해주세요." value={answer} />
                    ))
                }

                <MoreItem onClick={onAddAnswer}>More +</MoreItem>

                <ButtonWrap>
                    <button onClick={onResetBtn}>다시 입력하기</button>
                    <button>등록</button>
                </ButtonWrap>
            </FormWrap>
        </Wrapper>
    )
};

export default CreateQuestion;