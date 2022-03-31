import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactFlow, { Background, Handle, MiniMap, Position } from "react-flow-renderer";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { createdItem, flowItems } from "../atoms";

const QuestionWrap = styled.div`
    display: flex;
    height: 100vh;
    background: ${props => props.theme.colorSet.point};
    max-width: 200px;
    position: fixed;
    left: 0;
    top:0;
    padding: ${props => props.theme.paddingSet.pd_20};
    color: ${props => props.theme.colorSet.blackWhite.white};
    flex-direction: column;
`;

const QuestionTitle = styled.h2`
    margin-bottom: ${props => props.theme.paddingSet.pd_16};
    font-size: ${props => props.theme.textSet.size.title};
    font-weight: ${props => props.theme.textSet.weight.bold};
`;

const QuestionCard = styled.div`
    height: ${props => props.theme.boxSet.height.sm};
    background: ${props => props.theme.colorSet.blackWhite.white};
    border-radius: ${props => props.theme.boxSet.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colorSet.blackWhite.gray700};
    padding: 0 ${props => props.theme.paddingSet.pd_8};
    margin-bottom: ${props => props.theme.paddingSet.pd_12};
`;

const AnswerResult = styled.strong`
    display: inline-block;
    padding: ${props => props.theme.paddingSet.pd_4} ${props => props.theme.paddingSet.pd_8};
    background: ${props => props.theme.colorSet.blackWhite.gray700};
    color: ${props => props.theme.colorSet.blackWhite.white};
    margin-left: ${props => props.theme.paddingSet.pd_4};
    border-radius: ${props => props.theme.boxSet.borderRadius};
`;

const CardWrap = styled.div`
    margin-left: 200px;
    width: 200px;
    height: 200px;
    background: ${props => props.theme.colorSet.blackWhite.white};
    box-shadow: ${props => props.theme.boxSet.box_shadow};
    display: flex;
    flex-direction: column;
    border-radius: ${props => props.theme.boxSet.borderRadius};
`;

const DropArea = styled.div`
    width: 100%;
    background: ${props => props.theme.colorSet.blackWhite.gray300};
    height: 100%;
`;

const initialNodes = [
    {
        id: 'agaewt12',
        type: "testNode",
        data: { label: 123 },
        position: { x: 250, y: 25 },
    },
  
    {
        id: 'agewga',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '212gqd',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: 'agaewt12', target: 'agewga' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
];

const testFn = () => {
    return (
        <div style={{height:50, background: "#fff"}}>
            <Handle type="target" position={Position.Top} />
            <div>TEST!!!</div>
            <Handle type="source" position={Position.Bottom} id="a" style={{left:30}} />
            <Handle type="source" position={Position.Bottom} id="b" style={{left:10}} />
        </div>
    )
}

const nodeTypes = {
    testNode : testFn
}


function Diagram () {
    const questionCard = useRecoilValue(flowItems);
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    

    console.log(questionCard);

    const onDragend = (event:any) => {
        console.log(event);
    };
    

    return (
        <>
            <h1>
                Start Diagram
            </h1>
            <DragDropContext onDragEnd={onDragend}>
                <Droppable droppableId="questionBoard">
                    {(provided) => (
                        <QuestionWrap>
                            <QuestionTitle>질문 목록</QuestionTitle>
                            <div ref={provided.innerRef}>
                                {
                                    questionCard.questionList.map((item, index) => (
                                        <Draggable index={index} draggableId={item.id || "test"} key={item.id || "test"}>
                                            {(provider) => (
                                                <QuestionCard ref={provider.innerRef} {...provider.dragHandleProps} {...provider.draggableProps}>
                                                    {item.question}
                                                    {item.answer.map(answer => {
                                                        return (
                                                            <AnswerResult>{answer.result}</AnswerResult>
                                                        )
                                                    })}
                                                </QuestionCard>
                                            )}
                                        </Draggable>
                                    ))
                                }
                            </div>
                            {provided.placeholder}
                        </QuestionWrap>
                    )}
                </Droppable>

                <Droppable droppableId="firstQuestion">
                    {(provided) => (
                        <CardWrap>
                            <QuestionTitle>배치영역</QuestionTitle>
                            <DropArea ref={provided.innerRef}></DropArea>
                        </CardWrap>
                    )}
                </Droppable>
                <div style={{height: 300}}>
                    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
                        <MiniMap />
                        <Background />
                    </ReactFlow>
                </div>
            </DragDropContext>
        </>
    )
}

export default Diagram;