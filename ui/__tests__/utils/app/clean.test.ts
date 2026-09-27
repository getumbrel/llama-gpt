import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import {
  cleanConversationHistory,
  cleanSelectedConversation,
} from '@/utils/app/clean';

import { describe, expect, it } from 'vitest';

describe('temperature 0', () => {
  it('keeps a saved temperature of 0 when cleaning history', () => {
    const [cleaned] = cleanConversationHistory([
      {
        id: '1',
        name: 'greedy',
        messages: [],
        temperature: 0,
      },
    ]);

    expect(cleaned.temperature).toBe(0);
  });

  it('fills a missing temperature when cleaning history', () => {
    const [cleaned] = cleanConversationHistory([
      {
        id: '1',
        name: 'unset',
        messages: [],
      },
    ]);

    expect(cleaned.temperature).toBe(DEFAULT_TEMPERATURE);
  });

  it('keeps a saved temperature of 0 on the selected conversation', () => {
    const cleaned = cleanSelectedConversation({
      id: '1',
      name: 'greedy',
      messages: [],
      temperature: 0,
      prompt: 'stay',
      folderId: null,
    } as any);

    expect(cleaned.temperature).toBe(0);
  });
});
