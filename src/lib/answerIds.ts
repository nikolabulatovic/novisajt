export const AnswerId = {
  YES: 'YES',
  NO: 'NO',
  AGREE: 'AGREE',
  DISAGREE: 'DISAGREE',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  HOPEFULLY: 'HOPEFULLY',
  DONT_KNOW: 'DONT_KNOW',
  WILL_STOP: 'WILL_STOP',
  NOT_AN_ANIMAL: 'NOT_AN_ANIMAL',
  NOT_IN_THEIR_PLACE: 'NOT_IN_THEIR_PLACE',
} as const;

export type AnswerId = (typeof AnswerId)[keyof typeof AnswerId];

export interface LocalizedAnswerOption {
  id: AnswerId;
  label: string;
}
