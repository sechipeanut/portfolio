export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: 'image',
      title: 'Project Image/Icon',
      type: 'string',
      description: 'Emoji or icon representation (e.g., 🛍️, 📊)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tech',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technologies (e.g., React, Node.js, MongoDB)',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'link',
      title: 'Live Demo Link',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'github',
      title: 'GitHub Repository Link',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which projects appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
};
