import { Injectable, PayloadTooLargeException } from '@nestjs/common';

@Injectable()
export class ChatgptService {
  chatGptApi;
  private importDynamic = new Function(
    'modulePath',
    'return import(modulePath)',
  );

  private openKey = '';

  constructor() {
    this.importGpt();
  }

  private async importGpt(): Promise<any> {
    const { ChatGPTAPI } = await this.importDynamic('chatgpt');

    try {
      this.chatGptApi = new ChatGPTAPI({
        apiKey: this.openKey,
        completionParams: {
          model: 'gpt-3.5-turbo-16k',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  queryChatGpt() {
    return this.chatGptApi;
  }

  async sendMessage(text, option) {
    try {
      return await this.chatGptApi.sendMessage(text, option);
    } catch (error) {
      throw new PayloadTooLargeException(
        'chatgpt请求错误，这可能是因为token超出4096长度导致，可重设id解决。如无效则代理出现问题。',
      );
    }
  }
}
