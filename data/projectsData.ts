interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Home Prices',
    description: `Heatmap displaying prices of single-family homes across the USA using Zillow data. Friend & I thought it would be a good idea to work on during our freshman year.`,
    imgSrc: '/static/images/heatmap.png',
    href: 'https://github.com/nfadeluca/homeprices',
  },
  {
    title: 'Report Builder',
    description: `GPT 3.5-turbo AI Powered docx report-builder. Includes text parsing, prompt templating, prompt engineering techniques, custom template creation`,
    imgSrc: '/static/images/heatmap.png',
    href: 'https://github.com/nfadeluca/homeprices',
  },
]

export default projectsData
