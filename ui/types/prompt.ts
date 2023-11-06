import { LlamaModel } from './openai';

export interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  model: LlamaModel;
  folderId: string | null;
}
