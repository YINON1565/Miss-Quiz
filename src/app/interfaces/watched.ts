export interface Watched {
    _id: string,
    userId?: string,
    isUsed: boolean,
    totalAnswered: number,
    totalCorrectAnswered: number,
}
