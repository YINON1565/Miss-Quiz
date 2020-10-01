import {Answer} from './answer'

export interface Question {
    _id?: string,
    questionContent: string,
    answers?: Answer[]
    isMultipleChoice : boolean,
    correctAnswerIds: string[]
}
