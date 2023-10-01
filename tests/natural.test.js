import fs from 'fs';
import assert from 'node:assert';
import test from 'node:test';
import { parse } from 'csv-parse/sync';

import newNaturalClassifier from '../natural/load_classifier.js';

const phrases = parse(fs.readFileSync('quotation_phrases_test.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
});

test.describe('Natural.js tests', (t) => {
  for (const phrase of phrases) {
    test.it(`${phrase.phrase}`, async () => {
      const naturalClassification = await newNaturalClassifier();
      const classification = await naturalClassification.classify(
        phrase.phrase
      );
      assert.equal(
        classification,
        phrase.label,
        `${phrase.phrase} should be equal [[${phrase.label}]]`
      );
    });
  }
});
