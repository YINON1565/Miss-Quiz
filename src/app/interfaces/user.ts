import { UserActivity } from './user-activity';
import { Preference } from './preference';
import { Test } from './test';
import { UserTest } from './user-test';

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
    tests?: UserTest[]
    // tests?: Test[]
    // activity: {test: Test[]}
    activities?: UserActivity[],
    // preferences: Preference[]
    // Todo: add favorites object {color: '', backgroundcolor: ''}
}
