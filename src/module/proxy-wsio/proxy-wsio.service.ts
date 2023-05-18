import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { ProxyService } from '../proxy/proxy.service';

@Injectable()
export class ProxyWsioService {
  constructor(
    private readonly chatgptService: ChatgptService,
    private readonly proxyService: ProxyService,
  ) {}

  queryChatGpt(msData) {
    const observable = new Observable((subscriber) => {
      const chatgptProxy = this.chatgptService.queryChatGpt();
      (async () => {
        const { id, text } = await chatgptProxy.sendMessage(msData.text, {
          onProgress: (partialResponse) => {
            subscriber.next({
              event: 'message',
              data: {
                text: partialResponse.text,
              },
            });
          },
          parentMessageId: msData.id,
        });

        subscriber.next({
          event: 'message',
          data: {
            id,
          },
        });

        this.proxyService.addDialogue(msData.text, text);
      })();
    });

    return observable.pipe(map((data) => data));
  }
}
