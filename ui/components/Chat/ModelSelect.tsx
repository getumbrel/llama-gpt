import { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { LlamaModel } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';
import useModel from '@/hooks/useModel';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');
  const { runModel, isModelLoading } = useModel();

  const {
    state: { models, defaultModelId, currentModel },
    handleUpdateCurrentModel,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = models.find(
      (model) => e.target.value.includes(model.id),
    ) as LlamaModel
    runModel(model.codeName);
    handleUpdateCurrentModel(model);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Model')}
      </label>
      <div className="w-full rounded-lg border border-neutral-600 bg-transparent pr-2 text-neutral-900 dark:border-neutral-700 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          // remove selectedConversation model because we can't have different models 
          // per conversation as you won't be able to run it anyways without changing the model
          value={currentModel ? currentModel.id : ''}
          disabled={isModelLoading}
          onChange={handleChange}
        >
          <option value="" disabled hidden>Select a model</option>
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-[#1d1c21] dark:text-white"
            >
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
        <a
          href="https://platform.openai.com/account/usage"
          target="_blank"
          className="flex items-center"
        >
          <IconExternalLink size={18} className={'inline mr-1'} />
          {t('View Account Usage')}
        </a>
      </div> */}
    </div>
  );
};
