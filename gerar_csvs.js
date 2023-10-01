const path = require('path');
const fs = require('fs');
const csv = require('fast-csv');
// gerando aquivo
let writeStream = fs.createWriteStream('n_labeled_quotations.csv');
let i = 0;
fs.createReadStream(path.resolve(__dirname, 'nao_cotacao.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    if (i <= 50000) {
      writeStream.write(
        `${row.text_request.replace(
          /[,\.]|\p{Emoji}|\t|\r?\n/g,
          ''
        )},nao_cotacao\n`,
        'utf-8'
      );
    }
    i++;
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
  });

//   fiz uma reserva semana passada e queria saber sobre checkin,nao_cotacao
// voces tem sabonete nos quartos?, nao_cotacao
// qual o melhor quarto de voces?, nao_cotacao
// nao gostei do quarto, nao_cotacao
// os quarto tem ar condicionado?, nao_cotacao
