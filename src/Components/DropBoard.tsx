import {Droppable, Draggable} from "react-beautiful-dnd";
import DropItem from "./DropItem";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => props.theme.paddingSet.pd_8};
`;

const Title = styled.h3`
    font-size: ${props => props.theme.textSet.size.title};
    text-align: center;
    padding-bottom: ${props => props.theme.paddingSet.pd_12};
    color: ${props => props.theme.textSet.color.gray900};
    font-weight: ${props => props.theme.textSet.weight.extra_bold};
`;

const Board = styled.div`
    background: ${props => props.theme.colorSet.blackWhite.white};
    width: 380px;
    min-height : 300px;
    border-radius: ${props => props.theme.boxSet.borderRadius};
    padding: ${props => props.theme.paddingSet.pd_16} ${props => props.theme.paddingSet.pd_8};
    box-shadow: ${props => props.theme.boxSet.box_shadow};
`;

function DropBoard (){
    return (
        <Wrapper>
            <Droppable droppableId="one">
            {(provied) => (
                <Board ref={provied.innerRef}>
                    <Title>One</Title>
                    <DropItem />
                    {provied.placeholder}
                </Board>
            )}
            </Droppable>
        </Wrapper>
    )
};

export default DropBoard;