import { z } from 'zod';
// eslint-disable-next-line import/newline-after-import
require('dotenv').config();

const configSchema = z
  .object({
    // blacklab
    BLACKLAB_HOST: z.string().min(1),
  })
  .transform((env) => ({
    blackURL: `http://${env.BLACKLAB_HOST}:8080/blacklab-server`,
  }));

export const config = configSchema.parse(process.env);
export default () => config;
