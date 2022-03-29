import styled from "styled-components";

const Wrapper = styled.div`
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

interface IAnserComponent {
    qustionName: any;
    placeholder: string;
    register: any;
    modify?: boolean;
    value: {
        id: string,
        result: string,
        value: string
    }[]
}

function AnswerComponent({qustionName, placeholder, register, modify, value=[]}:IAnserComponent){
    let getValue;
    if(value.length !== 0) {
        getValue = value.find(item => item.id === qustionName)
    }

    return (
        <Wrapper>
            <AnswerValue {...register(`answer.${qustionName}.value`, {value: getValue?.value})} placeholder={placeholder} />
            <AnswerResult {...register(`answer.${qustionName}.result`, {value: getValue?.result})}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </AnswerResult>
        </Wrapper>
    )
}

export default AnswerComponent;