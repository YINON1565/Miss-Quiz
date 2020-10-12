import { Injectable } from '@angular/core';
import { Answer } from 'src/app/interfaces/answer';
import { Question } from 'src/app/interfaces/question';
import { Test } from 'src/app/interfaces/test';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';
import { TestService } from '../test/test.service';
// import { TreeTestService } from '../treeTest/tree-test.service';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class MockTestService {
  constructor(
    private _util: UtilService,
    private _auth: AuthService,
    private _test: TestService // private _treeTest: TreeTestService
  ) {}

  public getTestFromTestStr(testStr: string) : Question[] {
    return testStr
      .split(/([0-9]+.)/)
      .filter((t, i) => t && !(i % 2))
      .map((qStr) =>
        qStr
          .split(/\n/gi)
          .map((l) => l.trim())
          .filter((l) => l)
          .map((l, i) => (i === 0 ? l : l.substring(3, l.length)))
      )
      .filter(q=> q.length >= 3)
      .map((q) => ({
        _id: this._util.makeId(),
        questionContent: q[0],
        isMultipleChoice: false,
        correctAnswerIds: [],
        answers: q
          .splice(1, q.length)
          .filter(ans=> ans.trim())
          .map((ans) => ({ _id: this._util.makeId(), answerContent: ans })),
      }));
  }

  public setTests(count: number): void {
    for (let i = 0; i < count; i++) {
      let test = this.setTest(
        this._util.makeLorem(25, 'he'),
        this._auth.userValue,
        Date.now() + 360000 * 24 * this._util.getRandomInt(-1000, 1000),
        Math.random() > 0.5 ? 600 * this._util.getRandomInt(1, 9) : null,
        this.setQuestions(this._util.getRandomInt(10, 36))
        // this._treeTest.getRandomTags()
      );
      test.questions.forEach((q) => {
        q.isMultipleChoice
          ? (q.correctAnswerIds = [
              q.answers[this._util.getRandomInt(0, 3)]._id,
              q.answers[this._util.getRandomInt(4, 6)]._id,
            ])
          : q.correctAnswerIds.push(
              q.answers[this._util.getRandomInt(0, 3)]._id
            );
      });
      this._test.addTest(test).subscribe();
    }
  }

  public setTest(
    title: string,
    creator: User,
    createdAt: number,
    timeLimit: number,
    questions: Question[]
    // tags: string[],
  ): Test {
    return {
      title,
      creator,
      createdAt,
      lastUpdatedAt: null,
      timeLimit,
      questions,
      activities: [],
      changes: 0,
      reviews: [],
      isPublish: true,
      // tags
    };
  }

  public setQuestions(count: number): Question[] {
    const question = [];
    for (let i = 0; i < count; i++) {
      let isMultipleChoice = Math.random() > 0.8;
      question.push(
        this.setQuestion(
          isMultipleChoice,
          this._util.makeLorem(40, 'he'),
          this.setAnswers(isMultipleChoice ? 6 : 4),
          []
        )
      );
    }
    return question;
  }
  public setQuestion(
    isMultipleChoice: boolean,
    questionContent: string,
    answers: Answer[],
    correctAnswerIds: string[]
  ): Question {
    return {
      _id: this._util.makeId(10),
      isMultipleChoice,
      questionContent,
      answers,
      correctAnswerIds,
    };
  }

  public setAnswers(count: number): Answer[] {
    const answers = [];
    for (let i = 0; i < count; i++) {
      answers.push(this.setAnswer(this._util.makeLorem(45, 'he')));
    }
    return answers;
  }
  public setAnswer(answerContent: string): Answer {
    return {
      _id: this._util.makeId(10),
      answerContent,
    };
  }
}
