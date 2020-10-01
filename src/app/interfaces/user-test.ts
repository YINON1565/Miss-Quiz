import { UserQuestion } from './user-question';

export interface UserTest {
    testId?: string;
    title: string;
    timeLimt: number;
    timeLeft: number;
    totalAnswered: number;
    totalCorrectAnswered: number;
    activeAt: number;
    questions: UserQuestion[] 
}
