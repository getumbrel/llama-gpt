import { OPENAI_API_TYPE } from '../utils/app/const';

export interface LlamaModel {
  id: string;
  name: string;
  codeName: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum LlamaModelID {
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
export const fallbackModelID = LlamaModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0;

export const LlamaModels: Record<LlamaModelID, LlamaModel> = {
  [LlamaModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0]: {
    id: LlamaModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0,
    codeName: '7b',
    name: 'Llama 2 7B',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0]: {
    id: LlamaModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0,
    name: 'Llama 2 13B',
    codeName: '13b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0]: {
    id: LlamaModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0,
    name: 'Llama 2 70B',
    codeName: '70b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: LlamaModelID.LLAMA_7B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 7B',
    codeName: '7b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: LlamaModelID.LLAMA_13B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 13B',
    codeName: '13b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0_MAC]: {
    id: LlamaModelID.LLAMA_70B_CHAT_GGMLV3_Q4_0_MAC,
    name: 'Llama 2 70B',
    codeName: '70b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M]: {
    id: LlamaModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 7B',
    codeName: 'code-7b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M]: {
    id: LlamaModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 13B',
    codeName: 'code-13b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M]: {
    id: LlamaModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 34B',
    codeName: 'code-34b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: LlamaModelID.CODE_LLAMA_7B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 7B',
    codeName: 'code-7b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: LlamaModelID.CODE_LLAMA_13B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 13B',
    codeName: 'code-13b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [LlamaModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC]: {
    id: LlamaModelID.CODE_LLAMA_34B_CHAT_GGUF_Q4_K_M_MAC,
    name: 'Code Llama 34B',
    codeName: 'code-34b',
    maxLength: 12000,
    tokenLimit: 4000,
  },
};
