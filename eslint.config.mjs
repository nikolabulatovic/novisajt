import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from 'eslint/config';

// Next already registers the jsx-a11y plugin — only apply recommended *rules*
// (spreading flatConfigs.recommended would try to redefine the plugin).
const { rules: jsxA11yRecommendedRules } = jsxA11y.flatConfigs.recommended;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      ...jsxA11yRecommendedRules,
      // Keep Next's Image in the alt-text rule (recommended resets the Next override)
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      // Off in "recommended"; catches icon-only buttons like Choice pills
      'jsx-a11y/control-has-associated-label': 'error',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Must be last — turn off rules that conflict with Prettier
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
