import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatgptService } from '../chatgpt/chatgpt.service';
import { Observable, map } from 'rxjs';
import { randomSeries } from 'yancey-js-util';
import { hitHandling, sortArr } from '../../commom/utils/proxy.utils';
import { Dialogue } from './entities/proxy.entity';

@Injectable()
export class ProxyService {
  constructor(
    @InjectRepository(Dialogue) private readonly dialogue: Repository<Dialogue>,
    private readonly chatgptService: ChatgptService,
  ) {}

  // sse连接
  queryChatGpt(msgId: string, msgText: string) {
    const chatgptProxy = this.chatgptService.queryChatGpt();

    const observable = new Observable((subscriber) => {
      (async () => {
        const { id, text } = await chatgptProxy.sendMessage(msgText, {
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

        this.addDialogue(msgText, text);
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
  async autoSort(sortList: any[], questionList: any[]) {
    const chatgptProxy = this.chatgptService.queryChatGpt();
    const currentSortList = sortList || sortArr;
    const sortText = currentSortList.map(
      (item) => `${item.tagId}.${item.tagName}`,
    );
    const resultList = {};

    for (let index = 0; index < questionList.length; index++) {
      const item = questionList[index];

      const { text } = await chatgptProxy.sendMessage(
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

  addDialogue(userText: string, botText: string) {
    const dialogueData = new Dialogue();
    dialogueData.botText = botText;
    dialogueData.userText = userText;

    this.dialogue.save(dialogueData);
  }
}
