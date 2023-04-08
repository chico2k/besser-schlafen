import {projectId} from './sanity.config'
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_CDN,
  },
})
