import styled from "styled-components";
import {useForm, SubmitHandler} from "react-hook-form";
import AnswerComponent from "./AnswerComponent";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { createdItem, ICreatedItem } from "../atoms";
import { useEffect } from "react";
import ButtonWrap from "./ButtonWrap";
import atomModify from "../hooks/atomModify";

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

function CreateQuestion ({question="", answer, boardId=""}:any) {
    const {register, handleSubmit, reset, resetField} = useForm();
    const [answerId, setAnswerId] = useState([`${Math.random().toString(36).substr(2, 16)}`, `${Math.random().toString(36).substr(2, 16)}`]);
    const [createdAnswer, setCreatedAnswer] = useRecoilState(createdItem);

    useEffect(() => {
        if(boardId !== "") {
            const findItem = createdAnswer.find((item, index) => {
                return item.id === boardId;
            });
    
            const itemId = findItem?.answer.map((item) => {
                return item.id;
            });
    
            setAnswerId((prev:any):any => prev = itemId);
        };
    }, []);
    

    const onSubmit:SubmitHandler<ICreatedItem> = (event) => {
        const cloneObj = (obj:{}) => JSON.parse(JSON.stringify(obj));
        const copied = cloneObj(event);

        const filedId = `${Date.now()}id`;
        copied.id = filedId;

        const answerArray = [];
        for(const prop in event.answer) {
            const answerData = cloneObj(event.answer[prop]);
            if(answerData.value && answerData.result){
                answerData.id = prop;
                answerArray.push(answerData);
            };
        };
        copied.answer = answerArray;

        copied.modify = false;

        
        /* ?????? ????????? ???????????? ?????? db??? ???????????? ?????? ?????? ????????? ??? ?????? ?????? */
        if(boardId) {
            atomModify({
                atom: createdAnswer,
                setAtom: setCreatedAnswer,
                boardId,
                answerArray,
                inputValue: event,
                modify: false
            });
            return ;
        }

        setCreatedAnswer(prev => [...prev, copied]);
        reset();
    };

    const onAddAnswer = () => {
        const newId =  Math.random().toString(36).substr(2, 16);
        setAnswerId(prev => [...prev, newId]);
    };

    return(
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <QuestionForm {...register("question", {value: question, required: "????????? ??????????????????!"})} placeholder="????????? ??????????????????." />

                {
                    answerId.map((item, index) =>(
                        <AnswerComponent boardId={boardId} key={item} register={register} qustionName={item} placeholder="????????? ??????????????????." value={answer} index={index} setAnswerId={setAnswerId} resetField={resetField} />
                    ))
                }

                <MoreItem onClick={onAddAnswer}>More +</MoreItem>

                <ButtonWrap boardId={boardId} reset={reset} />
            </FormWrap>
        </Wrapper>
    )
};

export default CreateQuestion;