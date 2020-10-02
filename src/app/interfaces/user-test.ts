import { UserQuestion } from './user-question';

export interface UserTest {
    testId?: string;
    title: string;
    timeLimit: number;
    timeLeft: number;
    totalAnswered: number;
    totalCorrectAnswered: number;
    activeAt: number;
    questions: UserQuestion[] 
}
