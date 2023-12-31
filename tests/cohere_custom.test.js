import 'dotenv/config';
import fs from 'fs';
import assert from 'node:assert';
import test from 'node:test';
import { parse } from 'csv-parse/sync';

import cohereClassify from '../cohere/custom_model.js';

const phrases = parse(fs.readFileSync('quotation_phrases_test.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
});

test.skip.describe('Cohere custom model tests', () => {
  for (const phrase of phrases) {
    test.it(`${phrase.phrase}`, async () => {
      const classification = await cohereClassify(phrase.phrase);
      assert.equal(
        classification,
        phrase.label,
        `${phrase.phrase} should be equal [[${phrase.label}]]`
      );
    });
  }
});
