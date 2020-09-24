import {Answer} from './answer'

export interface Question {
    _id?: string,
    questionContent: string,
    answers?: Answer[]
    isCorrectAnswered: boolean,
    answeredIdx: number
}
