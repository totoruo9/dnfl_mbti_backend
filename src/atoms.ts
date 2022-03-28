import React, { DetailedReactHTMLElement } from "react";
import {atom, GetRecoilValue, RecoilState, ResetRecoilState, selector, SetRecoilState} from "recoil";
import { createImportSpecifier } from "typescript";

interface IQuestionItem {
    id?: string;
    value?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export interface ICreatedItem {
    [key:string]: [string, {value:string, result:string, id?:string}];
}

export const atomItem = atom({
    key: "atomItem",
    default: ["a", "b", "c", "d", "f", "g"],
});

export const questionItem = atom<IQuestionItem[]>({
    key: "questionItem",
    default: []
})

export const createdItem = atom<ICreatedItem[]>({
    key: "createdItem",
    default: []
})

interface IQustionData {
    answer: {
        [key: string]: {
            value: string;
            result: string;
            id?: string;
        }
    };
    question: string;
    modify?:boolean;
    id?: string;
}

export const questionItemSelector = selector<IQustionData[]>({
    key: "questionItemSelector",
    get: ({get}) => {
        const list = get(createdItem);

        const tet = list.map((item) => {
            const cloneObj = (obj:{}) => JSON.parse(JSON.stringify(obj));
            const copied = cloneObj(item);

            const filedId = `${Date.now()}id`;
            copied.id = filedId;

            const answerArray = [];
            for(const prop in item.answer) {
                const answerData = cloneObj(item.answer[prop]);
                answerData.id = prop;
                answerArray.push(answerData);
            };
            copied.answer = answerArray;

            copied.modify = false;

            return copied;
        })

        console.log(tet);

        return tet;
    },
    set: ({set}, newValue) => set(createdItem, (test) => {
        console.log("setter!!");
        console.log(newValue);
        console.log(test);
        return test;
    }),
})