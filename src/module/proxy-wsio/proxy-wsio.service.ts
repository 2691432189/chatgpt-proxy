import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, map } from 'rxjs';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { QuestionAnalyze } from './entities/proxy.entity';

@Injectable()
export class ProxyWsioService {
  constructor(
    private readonly chatgptService: ChatgptService,
    @InjectRepository(QuestionAnalyze)
    private readonly questionAnalyze: Repository<QuestionAnalyze>,
  ) {}

  queryChatGpt(msData) {
    const observable = new Observable((subscriber) => {
      (async () => {
        const { id, text } = await this.chatgptService.sendMessage(
          msData.text,
          {
            onProgress: (partialResponse) => {
              subscriber.next({
                event: 'message',
                data: {
                  text: partialResponse.text,
                },
              });
            },
            parentMessageId: msData.id,
          },
        );

        subscriber.next({
          event: 'message',
          data: {
            id,
          },
        });

        this.saveQuestionAnalyze(msData.questionId, msData.text, text);
      })();
    });

    return observable.pipe(map((data) => data));
  }

  saveQuestionAnalyze(
    questionId: string,
    questionTitle: string,
    analyze: string,
  ) {
    const questionAnalyzeData = new QuestionAnalyze();
    questionAnalyzeData.questionId = questionId;
    questionAnalyzeData.questionTitle = questionTitle;
    questionAnalyzeData.analyze = analyze;

    this.questionAnalyze.save(questionAnalyzeData);
  }
}
