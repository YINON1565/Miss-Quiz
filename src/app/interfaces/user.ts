import { Activity } from './activity';
import { Preference } from './preference';
import { Test } from './test';

export interface User {
    _id?: string,
    joinAt?: number,
    // age?: number,
    name: string,
    email: string,
    password: string
    phone?: string,
    photoUrl?: string,
    isAdmin?: boolean,
    tests?: Test[]
    // activity: {test: Test[]}
    // activities: Activity[],
    // preferences: Preference[]
}
