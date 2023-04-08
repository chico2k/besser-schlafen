import {defineField, defineType} from 'sanity'

const colorOptions = [
  {title: 'green', value: 'green'},
  {title: 'blue', value: 'blue'},
  {title: 'orange', value: 'orange'},
  {title: 'purple', value: 'purple'},
  {title: 'pink', value: 'pink'},
]

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required().max(100).error('A Title of max. 100 characters is required'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => [Rule.required().error('A Slug of max. 100 characters is required')],
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      validation: (Rule) => [Rule.required().error('A Main Image is required')],
      options: {
        hotspot: true,
      },
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
      name: 'color',
      title: 'Color for the homepage',
      type: 'string',
      validation: (Rule) => [Rule.required().error('A color for the category is required')],
      options: {
        list: [...colorOptions],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
