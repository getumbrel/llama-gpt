import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OpenAIModelID {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_AZ = 'gpt-35-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k',

  LLAMA_7B_CHAT_GGMLV3_Q4_0 = '/models/llama-2-7b-chat.bin',
  LLAMA_13B_CHAT_GGMLV3_Q4_0 = '/models/llama-2-13b-chat.bin',
  LLAMA_70B_CHAT_GGMLV3_Q4_0 = '/models/llama-2-70b-chat.bin',
  
  LLAMA_7B_CHAT_GGMLV3_Q4_0_MAC = './models/llama-2-7b-chat.bin',
  LLAMA_13B_CHAT_GGMLV3_Q4_0_MAC = './models/llama-2-13b-chat.bin',
  LLAMA_70B_CHAT_GGMLV3_Q4_0_MAC = './models/llama-2-70b-chat.bin',
  
  CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M = '/models/code-llama-7b-chat.gguf',
  CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M = '/models/code-llama-13b-chat.gguf',
  CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M = '/models/code-llama-34b-chat.gguf',
  
  CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC = './models/code-llama-7b-chat.gguf',
  CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC = './models/code-llama-13b-chat.gguf',
  CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC = './models/code-llama-34b-chat.gguf',
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'GPT-4-32K',
    maxLength: 96000,
    tokenLimit: 32000,
  },
  [OpenAIModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0]: {
    id: OpenAIModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0,
    name: 'Llama 2 7B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0]: {
    id: OpenAIModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0,
    name: 'Llama 2 13B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0]: {
    id: OpenAIModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0,
    name: 'Llama 2 70B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: OpenAIModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 7B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: OpenAIModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 13B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: OpenAIModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 70B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M]: {
    id: OpenAIModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 7B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M]: {
    id: OpenAIModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 13B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M]: {
    id: OpenAIModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 34B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: OpenAIModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 7B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: OpenAIModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 13B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: OpenAIModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 34B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
};
