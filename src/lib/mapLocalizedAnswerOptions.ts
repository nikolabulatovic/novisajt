interface LabelKeyedOption {
  id: string;
  labelKey: string;
}

interface LabeledOption {
  id: string;
  label: string;
}

export function mapLocalizedAnswerOptions(
  options: readonly LabelKeyedOption[],
  translate: (key: string) => string,
): LabeledOption[] {
  return options.map((option) => ({
    id: option.id,
    label: translate(option.labelKey),
  }));
}
