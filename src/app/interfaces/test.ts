import {Question} from './question'
import { Review } from './review';
import {User} from './user'
import { Watched } from './watched';
// import {Category} from './category'

export interface Test {
    _id?:string,
    title: string,
    createor?: User,
    createdAt?: number,
    lastUpdatedAt?: number,
    timeLeft?: number 
    categories: string[],
    questions: Question[],
    watcheds: Watched[],
    totalAnswered: number,
    totalCorrectAnswered: number,
    // userUseds: number, 
    // totalWatched: number,
    // totalUsed: number, 
    // totalScore: number,
    reviews: Review[],
    isPublish: boolean
}
