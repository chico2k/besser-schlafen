import {schemaTypes} from './schemas'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

export default defineConfig({
  name: 'default',
  title: 'sanity',
  projectId: String(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  dataset: process.env.NEXT_PUBLIC_SANITY_CDN || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
