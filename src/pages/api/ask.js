
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: "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" });

export default async function handler(req, res) {
  const { component, question } = req.body;
  const docPath = path.resolve('./documents', `${component}.txt`);
  const context = fs.readFileSync(docPath, 'utf8');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `You are a helpful assistant summarizing: ${component}` },
      { role: 'user', content: `Context: ${context}\n\nQ: ${question}` }
    ],
  });

  const answer = completion.choices[0].message.content;
  res.status(200).json({ answer });
}
