import styled from "styled-components";
import {useForm, SubmitHandler} from "react-hook-form";
import React from "react";

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

const AnswerComponent = styled.div`
    width: 100%;
    background: ${props => props.theme.colorSet.blackWhite.gray300};
    height: ${props => props.theme.boxSet.height.md};
    margin-bottom: ${props => props.theme.paddingSet.pd_8};
    display: flex;
    border-radius: ${props => props.theme.boxSet.borderRadius};
`;

const AnswerValue = styled.input`
    width: 85%;
    border: 0;
    background: rgba(0,0,0,0);
    color: ${props => props.theme.colorSet.blackWhite.gray900};
    padding: ${props => props.theme.paddingSet.pd_4} ${props => props.theme.paddingSet.pd_12};

    &::placeholder {
        color: ${props => props.theme.colorSet.blackWhite.gray500};
    }
`;

const AnswerResult = styled.select`
    width: 15%;
    border: 2px solid ${props => props.theme.colorSet.blackWhite.gray300};
    border-radius: ${props => props.theme.boxSet.borderRadius};
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

}



function CreateQuestion () {
    const {register, handleSubmit, resetField} = useForm();

    const onSubmit:SubmitHandler<IFormValue> = (event) => {
        console.log(event);
        resetField("question");
        resetField("first");
        resetField("second");
        resetField("third");
    }

    return(
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <QuestionForm {...register("question")} placeholder="질문을 입력해주세요." />
                <AnswerComponent>
                    <AnswerValue {...register("first")} placeholder="답변을 입력해주세요" />
                    <AnswerResult>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </AnswerResult>
                </AnswerComponent>
                <AnswerComponent>
                    <AnswerValue {...register("second")} placeholder="답변을 입력해주세요" />
                    <AnswerResult>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </AnswerResult>
                </AnswerComponent>
                <AnswerComponent>
                    <AnswerValue {...register("third")} placeholder="답변을 입력해주세요" />
                    <AnswerResult>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </AnswerResult>
                </AnswerComponent>

                <MoreItem>More +</MoreItem>

                <ButtonWrap>
                    <button>다시 입력하기</button>
                    <button>등록</button>
                </ButtonWrap>
            </FormWrap>
        </Wrapper>
    )
};

export default CreateQuestion;