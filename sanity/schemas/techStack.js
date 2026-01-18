export default {
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'iconLibrary',
      title: 'Icon Library',
      type: 'string',
      description: 'Icon library: si (Simple Icons), fa (Font Awesome), di (Devicons), tb (Tabler Icons)',
      options: {
        list: [
          { title: 'Simple Icons (si)', value: 'si' },
          { title: 'Font Awesome (fa)', value: 'fa' },
          { title: 'Devicons (di)', value: 'di' },
          { title: 'Tabler Icons (tb)', value: 'tb' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'si',
    },
    {
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon component name (e.g., SiReact, FaNodeJs, DiGit, TbBrandTypescript)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Icon Color',
      type: 'string',
      description: 'Hex color code for the icon (e.g., #61DAFB for React blue)',
      validation: (Rule) => Rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        name: 'hex color',
        invert: false,
      }).error('Must be a valid hex color code (e.g., #61DAFB)'),
      initialValue: '#587B7F',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which items appear (lower numbers appear first)',
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
      title: 'name',
      subtitle: 'icon',
    },
  },
};
