import { PostType } from 'types';

type PostTypeFactories = { [key in PostType as string]: string };

const postTypeFactories: PostTypeFactories = {
  title: ' within <title/>',
  body: ' within <body/>',
  comment: ' within <comment/>',
  commentPos: ' within <comment c_type="pos"/>',
  commentNeg: ' within <comment c_type="neg"/>',
  commentNeu: ' within <comment c_type="neu"/>',
  commentFemale: ' within <comment c_gender="F"/>',
  commentMale: ' within <comment c_gender="M"/>',
};

function createWithin(postType: PostType | null) {
  if (postType === null || <string>postType === '') return '';
  return postTypeFactories[postType];
}

function createQueryWord(cqlEnable: boolean, word: string) {
  if (cqlEnable) return word;

  const words = word.split(' ');
  const queryList = words.map((value) => `[word="${value}"]`);
  return queryList.join('');
}

function buildTextPattern(cqlEnable: boolean, word: string, postType: PostType | null) {
  const within = createWithin(postType);
  const queryWord = createQueryWord(cqlEnable, word);
  const isCQL = word.includes('::');

  if (!isCQL) return `${queryWord}${within}`;

  const queryList = queryWord.split('::');
  queryList.splice(1, 0, within);
  queryList.splice(2, 0, '::');
  return queryList.join('');
}

export default buildTextPattern;
