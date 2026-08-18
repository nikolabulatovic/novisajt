export const AnswerId = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  YES: 'YES',
  NO: 'NO',
  AGREE: 'AGREE',
  DISAGREE: 'DISAGREE',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  HOPEFULLY: 'HOPEFULLY',
  DONT_KNOW: 'DONT_KNOW',
  WILL_STOP: 'WILL_STOP',
  NOT_RESPONSIBLE: 'NOT_RESPONSIBLE',
  NOT_IN_THEIR_PLACE: 'NOT_IN_THEIR_PLACE',
} as const;

export type AnswerId = (typeof AnswerId)[keyof typeof AnswerId];

export interface LocalizedAnswerOption {
  id: AnswerId;
  label: string;
}
