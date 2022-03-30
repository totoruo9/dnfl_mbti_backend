import { IQustionData } from "../atoms";

interface IAtomModify {
    boardId: string;
    atom: IQustionData[];
    setAtom: any;
    answerArray?: any;
    inputValue?: any;
    modify: boolean;
}

function atomModify ({boardId, atom, setAtom, answerArray, inputValue, modify}:IAtomModify) {
    let findItemIndex = 0;
    const findItem = atom.find((item: any, index: number) => {
        findItemIndex = index;
        return item.id === boardId;
    });

    const changeModify:any = {
        ...findItem,
        modify
    };

    answerArray && (changeModify.answer = answerArray);
    inputValue && (changeModify.question = inputValue.question);

    const copyedArray = [...atom];
    copyedArray.splice(findItemIndex, 1);
    copyedArray.splice(findItemIndex, 0, changeModify);

    return setAtom(copyedArray);
};

export default atomModify;