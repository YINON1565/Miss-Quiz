import { Question } from './question';
import { Review } from './review';
import { User } from './user';
import { TestActivity } from './test-activity';

export interface Test {
  _id?: string;
  timeLimt?: number;
  title: string;

  subtitle?: string;
  description?: string;
  videoUrl?: string;
  imgUrl?: string;
  audioUrl?: string;
  link?: string;

  activities?: TestActivity[];
  tags?: string[];
  lastUpdatedAt?: number;
  reviews?: Review[];

  isPublish: boolean;
  createor?: User;
  createdAt?: number;
  questions: Question[];
}
