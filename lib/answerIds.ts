export const AnswerId = {
  YES: 'YES',
  NO: 'NO',
  AGREE: 'AGREE',
  DISAGREE: 'DISAGREE',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  HOPEFULLY: 'HOPEFULLY',
  DONT_KNOW: 'DONT_KNOW',
} as const;

export type AnswerId = (typeof AnswerId)[keyof typeof AnswerId];

export interface LocalizedAnswerOption {
  id: AnswerId;
  label: string;
}
