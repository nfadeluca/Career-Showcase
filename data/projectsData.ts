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
]

export default projectsData
