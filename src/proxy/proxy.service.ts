import { Injectable } from '@nestjs/common';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { Observable, map } from 'rxjs';
import { randomSeries } from 'yancey-js-util';

@Injectable()
export class ProxyService {
  queryChatGpt(msgId: string, msgText: string, chatgptService: ChatgptService) {
    const observable = new Observable((subscriber) => {
      const chatGptApi = chatgptService.queryChatGpt();

      (async function () {
        const { id } = await chatGptApi.sendMessage(msgText, {
          onProgress: (partialResponse) => {
            subscriber.next({
              data: partialResponse.text.replace(/\n/g, '<br>'),
              type: 'text',
            });
          },
          parentMessageId: msgId,
        });

        subscriber.next({
          data: id.toString(),
          type: 'end',
        });
      })();
    });

    return observable.pipe(
      map(({ data, type }) => ({
        data,
        id: randomSeries(9),
        type,
        retry: 5,
      })),
    );
  }
}
