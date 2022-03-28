import styled from "styled-components";
import {useForm, SubmitHandler} from "react-hook-form";
import React from "react";
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

interface IFormValue {
    question: string;
    [key:string]: string;
}

interface IAnserData {
    result: string;
    value: string;
    id?: string;
}

function CreateQuestion () {
    const {register, handleSubmit, resetField, reset} = useForm();
    const [answerId, setAnserId] = useState(["id_1", "id_2"]);
    const [createdAnswer, setCreatedAnswer] = useRecoilState(createdItem);

    const onSubmit:SubmitHandler<ICreatedItem> = (event) => {
        setCreatedAnswer(prev => [...prev, event]);
        reset();
    }

    const onAddAnswer = () => {
        setAnserId(prev => [...prev, `id_${prev.length+1}`])
    }

    return(
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <QuestionForm {...register("question")} placeholder="질문을 입력해주세요." />

                {
                    answerId.map((item, index) => (
                        <AnswerComponent key={item} register={register} qustionName={item} placeholder="답변을 입력해주세요." />
                    ))
                }

                <MoreItem onClick={onAddAnswer}>More +</MoreItem>

                <ButtonWrap>
                    <button>다시 입력하기</button>
                    <button>등록</button>
                </ButtonWrap>
            </FormWrap>
        </Wrapper>
    )
};

export default CreateQuestion;