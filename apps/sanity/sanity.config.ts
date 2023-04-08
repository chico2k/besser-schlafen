import {schemaTypes} from './schemas'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

export const projectId = 'ck5j20li'

export default defineConfig({
  name: 'default',
  title: 'sanity',
  projectId,
  dataset: process.env.PUBLIC_SANITY_CDN || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
