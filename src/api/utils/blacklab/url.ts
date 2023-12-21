import { config } from '@config';

type BlacklabUrlAction = { kind: 'boards' } | { kind: 'concordance'; params: string };

const getBlacklabURL = (action: BlacklabUrlAction) => {
  const params = new URLSearchParams();
  params.set('outputformat', 'json');

  switch (action.kind) {
    case 'boards':
      return `${config.blackURL}/indexes/fields/board?${params.toString()}`;
    case 'concordance':
      return `${config.blackURL}/indexes/hits?${action.params}`;
    default:
      throw new Error('Invalid kind');
  }
};

export default getBlacklabURL;
