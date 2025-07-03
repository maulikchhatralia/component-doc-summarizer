export default async function handler(req, res) {
  const { text } = req.body;

  const speechKey = process.env.AZURE_TTS_KEY;
  const speechRegion = process.env.AZURE_TTS_REGION;

  if (!speechKey || !speechRegion) {
    return res.status(500).json({ error: "Missing Azure TTS credentials" });
  }

  const ssml = `
    <speak version='1.0' xml:lang='en-US'>
      <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
        ${text}
      </voice>
    </speak>`;

  const response = await fetch(`https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': speechKey,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
      'User-Agent': 'component-doc-summarizer'
    },
    body: ssml
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Azure TTS REST API call failed' });
  }

  const buffer = await response.arrayBuffer();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(Buffer.from(buffer));
}
