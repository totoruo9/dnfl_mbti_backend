import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { atomItem } from "../atoms";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import { useState } from "react";

const Item = styled.div`
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: ${props => props.theme.textSet.color.gray300};
    margin-bottom: ${props => props.theme.paddingSet.pd_4};
    color: ${props => props.theme.textSet.color.gray900};
`;

const MoreItem = styled.div`
    height: ${props => props.theme.boxSet.height.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.textSet.color.white};
    background: ${props => props.theme.colorSet.blackWhite.gray700};
    cursor: pointer;
`;

function DropItem () {
    const itemValue = useRecoilValue(atomItem);
    const [formState, setFormState] = useState(false);
    const {register, handleSubmit} = useForm();
    
    const onMoreBtn = () => {
        setFormState(prev => !prev);
    }

    return (
        <>
            {itemValue.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index} >
                    {(provied) => (
                        <Item {...provied.dragHandleProps} {...provied.draggableProps} ref={provied.innerRef}>{item}</Item>
                    )}
                </Draggable>
            ))}
            {formState
                ? (
                    <form>
                        <input type="text" placeholder="답변을 입력해주세요." />
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>

                        <button>send</button>
                    </form>
                )
                : (
                    <MoreItem onClick={onMoreBtn}>More+</MoreItem>
            )}
        </>
    )
}

export default DropItem;