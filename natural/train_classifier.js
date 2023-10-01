var natural = require('natural');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

var classifier = new natural.BayesClassifier(natural.PorterStemmerRu);

classifier.events.on('trainedWithDocument', function (obj) {
  console.log('Finished training', obj);
});

function train() {
  console.log('training model');
  classifier.train();
  console.log(classifier.classify('Aceita pets?'));
  console.log(classifier.classify('Oi'));
  // classifier.save('classifier.json', function (err, classifier) {
  classifier.save('classifier2.json', function (err, classifier) {
    console.log('model saved!');
  });
}

console.log('adding quotation');
// let i = 1;
// fs.createReadStream(path.resolve(__dirname, '../', 'labeled_quotations.csv'))
fs.createReadStream(path.resolve(__dirname, '../', 'frases_teste.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    // if (i <= 50000) {
    classifier.addDocument(row.phrase, row.label);
    // }
    // i++;
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    train();
  });
