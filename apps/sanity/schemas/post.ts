import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
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
      validation: (Rule) => [
        Rule.required().max(100).error('A Title of max. 100 characters is required'),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [
        Rule.required().error('A Description of max. 200 characters is required'),
      ],
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
      name: 'author',
      validation: (Rule) => [Rule.required().error('A Author is required')],
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
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
      title: 'published',
      name: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => [Rule.required().max(3).error('Categories is required - (max three)')],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: {type: 'product'}}],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => [
        Rule.required().max(200).error('A SEO Title of max. 100 characters is required'),
      ],
    }),

    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => [Rule.required().max(3).error('Max three key words')],
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
