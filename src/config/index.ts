interface Config {
  port: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
};

export default config;

export { default as env } from './env';
export { createApp } from './app'; 