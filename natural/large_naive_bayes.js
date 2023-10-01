import natural from 'natural';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

async function newClassifier() {
  return new Promise((r, rej) => {
    natural.BayesClassifier.load(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        'classifier_large_naive.json'
      ),
      null,
      function (err, _classifier) {
        if (err) {
          return rej(err);
        }
        return r(_classifier);
      }
    );
  });
}

export default newClassifier;
