import { useRecoilState } from "recoil";
import styled from "styled-components";
import { createdItem } from "../atoms";

const SButtonWrap = styled.div`
    display: flex;
    height: ${props => props.theme.boxSet.height.lg};
    margin-top: ${props => props.theme.paddingSet.pd_20};
`;

const ConfirmBtn = styled.button`width: 50%;
    border: 0;
    color: ${props => props.theme.colorSet.blackWhite.white};
    background: ${props => props.theme.colorSet.main};
    margin-left: 2px;
    font-size: ${props=>props.theme.textSet.size.sm};
`;

const ResetBtn = styled.p`
    width: 50%;
    background: ${props => props.theme.colorSet.blackWhite.white};
    border: 1px solid ${props => props.theme.colorSet.blackWhite.gray500};
    color: ${props => props.theme.colorSet.blackWhite.gray500};
    font-weight: ${props => props.theme.textSet.weight.regular};
    margin-right: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props=>props.theme.textSet.size.sm};
`;

interface IButtonWrap {
    boardId: string;
    reset: any;
}

function ButtonWrap ({boardId, reset}:IButtonWrap) {
    const [createdAnswer, setCreatedAnswer] = useRecoilState(createdItem);

    const onResetBtn = () => {
        console.log("RESET!!");
        reset();

        let findItemIndex = 0;
        const findItem = createdAnswer.find((item, index) => {
            findItemIndex = index;
            return item.id === boardId;
        });

        const changeModify:any = {
            ...findItem,
            modify: true,
            answer: [],
            question: "",
        };

        if (createdAnswer.length <= 0 || boardId === "") {
            return;
        } 

        const copyedArray = [...createdAnswer];
        copyedArray.splice(findItemIndex, 1);
        copyedArray.splice(findItemIndex, 0, changeModify);

        setCreatedAnswer(copyedArray);
    }

    return(
        <SButtonWrap>
            <ResetBtn onClick={onResetBtn}>다시 입력하기</ResetBtn>
            <ConfirmBtn>등록</ConfirmBtn>
        </SButtonWrap>
    );
};

export default ButtonWrap