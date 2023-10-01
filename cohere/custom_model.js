import cohere from 'cohere-ai';
const apiKey = process.env.COHERENCE_API_KEY;

cohere.init(apiKey);
async function classify(input) {
  const classification = await cohere.classify({
    model: '5df44de1-dd06-4dd3-b979-4de2e9fcd4b3-ft',
    inputs: [input],
  });

  console.log(classification);
  return classification.body.classifications[0].prediction;
}

export default classify;
