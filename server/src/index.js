import 'dotenv/config';
import { createApp } from './app.js';
import { selectProvider } from './providers/index.js';

const provider = selectProvider();
const port = Number(process.env.PORT) || 4000;

createApp(provider).listen(port, () => {
  console.log(`StoryPlay API on http://localhost:${port} (source: ${provider.name === 'tmdb' ? 'TMDB' : 'offline catalogue'})`);
});
