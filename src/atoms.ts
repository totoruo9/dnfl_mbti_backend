import React, { DetailedReactHTMLElement } from "react";
import {atom} from "recoil";

interface IQuestionItem {
    id?: string;
    value?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export const atomItem = atom({
    key: "atomItem",
    default: ["a", "b", "c", "d", "f", "g"],
});

export const questionItem = atom<IQuestionItem[]>({
    key: "questionItem",
    default: []
})