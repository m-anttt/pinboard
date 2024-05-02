import { createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SANITY_PROJECT_ID, SANITY_TOKEN } from './config';

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-04-27',
  useCdn: true,
  token: SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)