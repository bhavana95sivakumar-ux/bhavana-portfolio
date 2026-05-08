export const SCHOLAR_USER_ID = "1GZzUakAAAAJ";

export const JOURNALS_REVIEWED = 30;

export type Stats = {
  publications: number;
  citations: number;
  hIndex: number;
  i10Index: number;
  journalsReviewed: number;
};

export const FALLBACK_STATS: Stats = {
  publications: 27,
  citations: 312,
  hIndex: 11,
  i10Index: 12,
  journalsReviewed: JOURNALS_REVIEWED,
};
