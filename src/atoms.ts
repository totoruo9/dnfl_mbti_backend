import React from "react";
import {atom, selector} from "recoil";

interface IQuestionItem {
    id?: string;
    value?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export interface IQustionData {
    answer: {
        [key: string]: {
            value: string;
            result: string;
            id?: string;
        }
    }[];
    question: string;
    modify?:boolean;
    id?: string;
}
export interface ICreatedItem {
    [key:string]: [string, {value:string, result:string, id?:string, modify?: boolean}];
}

export const atomItem = atom({
    key: "atomItem",
    default: ["a", "b", "c", "d", "f", "g"],
});

export const questionItem = atom<IQuestionItem[]>({
    key: "questionItem",
    default: []
})

export const createdItem = atom<IQustionData[]>({
    key: "createdItem",
    default: []
})



// export const questionItemSelector = selector<IQustionData[]>({
//     key: "questionItemSelector",
//     get: ({get}) => {
//         const list = get(createdItem);

//         const tet = list.map((item) => {
//             const cloneObj = (obj:{}) => JSON.parse(JSON.stringify(obj));
//             const copied = cloneObj(item);

//             const answerArray = [];
//             for(const prop in item.answer) {
//                 const answerData = cloneObj(item.answer[prop]);
//                 answerData.id = prop;
//                 answerArray.push(answerData);
//             };
//             copied.answer = answerArray;

//             copied.modify = false;

//             return copied;
//         })

//         return tet;
//     },
//     set: ({set}, newValue: any) => {
//         set(createdItem, (prev):any => {
//             let findItemIndex = 0;
//             const findItem = prev.find((item, index) => {
//                 findItemIndex = index;
//                 return item.id === newValue
//             });

//             const changeModify:any = {...findItem, modify: true};

//             const copyedArray = [...prev];
//             copyedArray.splice(findItemIndex, 1);
//             copyedArray.splice(findItemIndex, 0, changeModify);

//             return copyedArray;
//         })
//     },
// })