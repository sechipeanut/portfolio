import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Use false for development to avoid CORS issues
  apiVersion: '2024-01-18', // Use current date
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional: only needed for write operations
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Queries
export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  description,
  tech,
  link,
  github,
  image,
  order
}`;

export const TECH_STACK_QUERY = `*[_type == "techStack"] | order(order asc) {
  _id,
  name,
  iconLibrary,
  iconName,
  color,
  order
}`;
