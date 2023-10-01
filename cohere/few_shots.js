import cohere from 'cohere-ai';
cohere.init(process.env.COHERENCE_API_KEY);

async function classify(input) {
  const response = await cohere.classify({
    model: 'embed-multilingual-v2.0',
    inputs: [input],
    examples: [
      { text: 'Gostaria de reservar um quarto para outubro', label: 'cotacao' },
      { text: 'qual valor do quarto para o natal\n', label: 'cotacao' },
      { text: 'quero fazer uma reserva para o fds', label: 'cotacao' },
      { text: 'quanto fica para 2 adultos e 1 crianca', label: 'cotacao' },
      { text: 'qual o melhor quarto de vcs?', label: 'nao_cotacao' },
      { text: 'no quarto tem toalha?', label: 'nao_cotacao' },
      { text: 'no quaro tem sabonete?', label: 'nao_cotacao' },
      { text: 'a piscina tem cloro?', label: 'nao_cotacao' },
      { text: 'nao gostei do quarto', label: 'nao_cotacao' },
      {
        text: 'fiz uma reserva semana passada e queria saber sobre checkin',
        label: 'nao_cotacao',
      },
      { text: 'valor dia 10 ao dia 12?', label: 'cotacao' },
      { text: 'aceitam pets?', label: 'nao_cotacao' },
      { text: 'quanto ta a diaria?', label: 'cotacao' },
      { text: 'quero me hospedar esse fim de semana', label: 'cotacao' },
      { text: 'esqueci uma coisa no dia 12/10', label: 'nao_cotacao' },
    ],
  });
  return response.body.classifications[0].prediction;
}

export default classify;
