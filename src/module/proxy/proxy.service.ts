import { Injectable } from '@nestjs/common';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { Observable, map } from 'rxjs';
import { randomSeries } from 'yancey-js-util';
import { hitHandling, sortArr } from '../../commom/utils/proxy.utils';

@Injectable()
export class ProxyService {
  // sse连接
  queryChatGpt(msgId: string, msgText: string, chatgptService: ChatgptService) {
    const observable = new Observable((subscriber) => {
      const chatGptApi = chatgptService.queryChatGpt();

      (async function () {
        const { id } = await chatGptApi.sendMessage(msgText, {
          onProgress: (partialResponse) => {
            subscriber.next({
              data: partialResponse.text.replace(/\n/g, '<br>'),
              end: 0,
            });
          },
          parentMessageId: msgId,
        });

        subscriber.next({
          data: id.toString(),
          end: 1,
        });
      })();
    });

    return observable.pipe(
      map(({ data, end }) => ({
        data,
        id: randomSeries(9),
        end,
      })),
    );
  }

  // 自动分类
  async autoSort(
    sortList: any[],
    questionList: any[],
    chatgptService: ChatgptService,
  ) {
    const chatGptApi = chatgptService.queryChatGpt();
    const currentSortList = sortList || sortArr;
    const sortText = currentSortList.map(
      (item) => `${item.tagId}.${item.tagName}`,
    );
    const resultList = {};

    for (let index = 0; index < questionList.length; index++) {
      const item = questionList[index];

      const { text } = await chatGptApi.sendMessage(
        `你是考题分类助手，你要从[${sortText.join(
          ',',
        )}]中选择考题的分类并返回对应的分类序号和分类名称。回复格式必须为:[分类名称 - 分类序号]。\n考题： ${
          item.title
        }`,
        {
          completionParams: {
            temperature: 0,
            presence_penalty: -2,
          },
        },
      );

      const { tagName, tagId } = hitHandling(text, currentSortList);

      resultList[item.questionsId] = {
        questionsId: item.questionsId,
        title: item.title,
        tagName,
        tagId,
      };

      if (index === questionList.length - 1) return resultList;
    }
  }
}
