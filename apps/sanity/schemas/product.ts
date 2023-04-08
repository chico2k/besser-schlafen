import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {
      name: 'review',
      title: 'Review',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => [Rule.required().error('A Slug is required')],
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => [Rule.required().error('A Category is required')],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => [Rule.required().error('A main image is required')],
      fields: [
        {
          title: 'Alternative Text',
          name: 'altText',
          type: 'string',
          validation: (Rule) => [Rule.required().error('Alternative image text is required')],
        },
      ],
    }),
    defineField({
      title: 'URL',
      name: 'link',
      validation: (Rule) => [Rule.required().error('A Url is required')],
      type: 'object',
      fields: [
        {
          title: 'URL',
          name: 'href',
          type: 'url',
        },
      ],
    }),
    defineField({
      title: 'Good',
      name: 'goodContent',
      type: 'array',
      group: 'review',
      of: [
        {
          marks: {decorators: [], annotations: []},
          styles: [],
          title: 'Block',
          type: 'block',

          lists: [{title: 'Bullet', value: 'bullet'}],
        },
      ],
    }),
    defineField({
      title: 'Bad',
      name: 'badContent',
      type: 'array',
      group: 'review',
      of: [
        {
          marks: {decorators: [], annotations: []},
          styles: [],
          title: 'Block',
          type: 'block',

          lists: [{title: 'Bullet', value: 'bullet'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
