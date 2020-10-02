import { Question } from './question';
import { Review } from './review';
import { User } from './user';
import { TestActivity } from './test-activity';
import { TestChange } from './test-change';

export interface Test {
  _id?: string;
  timeLimit?: number;
  title: string;

  subtitle?: string;
  description?: string;
  videoUrl?: string;
  imgUrl?: string;
  audioUrl?: string;
  link?: string;

  activities?: TestActivity[];
  changes?: number;
  // changes?: TestChange[];
  tags?: string[];
  lastUpdatedAt?: number;
  reviews?: Review[];
  
  isPublish: boolean;
  creator?: User;
  createdAt?: number;
  questions: Question[];
}
