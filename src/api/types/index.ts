import { DefaultContext, Request } from 'koa';

type NonNullable<T> = Exclude<T, null | undefined>;

export type RequestBody<T extends NonNullable<Request['body']>> = {
  request: { body: T };
} & DefaultContext;

export type PostType = 'title' | 'body' | 'commentAll' | 'commentPos' | 'commentNeu' | 'commentNeg';

export type ConcordanceRequest = {
  word: string;
  cqlEnable: boolean;
  media: string | null;
  postType: PostType | null;
  boards: string[] | null;
  start: string;
  end: string;
  windowSize: string;
  page: number;
  fetchNumber: number;
};

// ------ blacklab types ------

export type BlacklabErrorResponse = {
  error: { code: string; message: string };
};

export type Boards = {
  indexName: string;
  fieldName: string;
  isAnnotatedField: boolean;
  displayName: string;
  description: string;
  uiType: string;
  type: string;
  analyzer: string;
  unknownCondition: string;
  unknownValue: string;
  displayValues: { [key: string]: any };
  fieldValues: { [key: string]: number };
  valueListComplete: boolean;
};

export interface ConcordanceResponse {
  summary: Summary;
  hits: Hit[] | [];
  docInfos: DocInfos | {};
}

export interface DocInfos {
  [key: string]: DocInfo;
}

export interface DocInfo {
  fromInputFile: string[];
  year: string[];
  author: string[];
  media: string[];
  title: string[];
  docId: string[];
  board: string[];
  lengthInTokens: number;
  mayView: boolean;
}

export interface Hit {
  docPid: string;
  start: number;
  end: number;
  left: HitData;
  match: HitData;
  right: HitData;
}

export interface HitData {
  punct: string[];
  pos: string[];
  word: string[];
}

export interface Summary {
  searchParam: SearchParam;
  searchTime: number;
  countTime: number;
  windowFirstResult: number;
  requestedWindowSize: number;
  actualWindowSize: number;
  windowHasPrevious: boolean;
  windowHasNext: boolean;
  stillCounting: boolean;
  numberOfHits: number;
  numberOfHitsRetrieved: number;
  stoppedCountingHits: boolean;
  stoppedRetrievingHits: boolean;
  numberOfDocs: number;
  numberOfDocsRetrieved: number;
  docFields: DocFields;
  metadataFieldDisplayNames: MetadataFieldDisplayNames;
}

export interface DocFields {
  pidField: string;
  titleField: string;
  authorField: string;
  dateField: string;
}

export interface MetadataFieldDisplayNames {
  author: string;
  board: string;
  docId: string;
  fromInputFile: string;
  media: string;
  title: string;
  year: string;
}

export interface SearchParam {
  filter: string;
  first: string;
  indexname: string;
  number: string;
  patt: string;
  wordsaroundhit: string;
}
