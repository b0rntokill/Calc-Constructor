import { nanoid } from "nanoid";
import Button from "./components/calc-elements/button/button";
import SmartOutput from "./components/calc-elements/smart-output/smart-output";
import { CalcElementsData } from "./types/state";

export const initialElementsData: CalcElementsData = [
    {
        id: nanoid(),
        fixedPlace: '0',
        rows: [
            [
                { component: SmartOutput, type: 'output', },
            ]
        ]
    },
    {
        id: nanoid(),
        rows: [
            [
                { content: "/", component: Button, type: 'operator', widthClass: 'small' },
                { content: "x", component: Button, type: 'operator', widthClass: 'small' },
                { content: "-", component: Button, type: 'operator', widthClass: 'small' },
                { content: "+", component: Button, type: 'operator', widthClass: 'small' },
            ]
        ]
    },
    {
        id: nanoid(),
        rows: [
            [
                { content: "7", component: Button, type: 'number', widthClass: 'medium' },
                { content: "8", component: Button, type: 'number', widthClass: 'medium' },
                { content: "9", component: Button, type: 'number', widthClass: 'medium' },
            ],
            [
                { content: "4", component: Button, type: 'number', widthClass: 'medium' },
                { content: "5", component: Button, type: 'number', widthClass: 'medium' },
                { content: "6", component: Button, type: 'number', widthClass: 'medium' },
            ],
            [
                { content: "1", component: Button, type: 'number', widthClass: 'medium' },
                { content: "2", component: Button, type: 'number', widthClass: 'medium' },
                { content: "3", component: Button, type: 'number', widthClass: 'medium' },
            ],
            [
                { content: "0", component: Button, type: 'number', widthClass: 'medium-grow' },
                { content: ",", component: Button, type: 'number', widthClass: 'medium' },
            ],
        ]
    },
    {
        id: nanoid(),
        rows: [
            [
                { content: "=", component: Button, type: 'operator', widthClass: 'large', componentProps: {propClass: 'second'} }
            ]
        ]
    }
];