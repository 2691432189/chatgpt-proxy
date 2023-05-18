import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatgptService {
  chatGptApi;
  private importDynamic = new Function(
    'modulePath',
    'return import(modulePath)',
  );

  private openKey = '0fzYaZ';

  constructor() {
    this.importGpt();
  }

  private async importGpt(): Promise<any> {
    const { ChatGPTAPI } = await this.importDynamic('chatgpt');

    this.chatGptApi = new ChatGPTAPI({
      apiKey: this.openKey,
      completionParams: {
        model: 'gpt-3.5-turbo',
      },
    });
  }

  queryChatGpt() {
    return this.chatGptApi;
  }
}
