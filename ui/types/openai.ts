import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OpenAIModelID {
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
