import { createApp, env } from '@/config';

const app = createApp();

// Start server
app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
}); 