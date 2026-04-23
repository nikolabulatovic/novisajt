export interface AnimatedTextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface AnimatedTextLine {
  line: AnimatedTextSegment[];
}

export type AnimatedTextBlock = AnimatedTextLine[];
