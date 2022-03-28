import React, { DetailedReactHTMLElement } from "react";
import {atom, selector} from "recoil";

interface IQuestionItem {
    id?: string;
    value?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export interface ICreatedItem {
    [key:string]: [string, {value:string, result:string}];
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

export const test = selector({
    key: "test",
    get: ({get}) => {
        const list = get(createdItem);
        console.log(list);
    },
})