interface Project {
  title: string
  description: string
  href?: string
  imgSrcs?: string[]
}

const projectsData: Project[] = [
  {
    title: 'Home Prices',
    description: `Heatmap displaying prices of single-family homes across the USA using Zillow data. Friend & I thought it would be a good idea to work on during our Sophomore year.`,
    imgSrcs: [
      '/static/images/projects/heatmap1.png',
      '/static/images/projects/heatmap2.png',
      '/static/images/projects/heatmap3.png',
      '/static/images/projects/gifs/heatmap_demo.gif',
    ],
    href: 'https://github.com/nfadeluca/homeprices',
  },
  {
    title: 'Report Builder',
    description: `GPT 3.5-turbo AI Powered docx report-builder. Includes text parsing, prompt templating, prompt engineering techniques, custom template creation, and much more. 
                  Also uses vector data stores with use of RAG method to simulate superior context and data fetching. \n
                  Unfortunately I can't post images of this one or link the repository as it's largely confidential, but feel free to ask me about it!`,
    imgSrcs: [],
    href: '',
  },
  {
    title: 'Painter',
    description: `Simple painter program with GUI I made Sophomore year using basic Java libraries with as little outside help as possible. Decided I wanted to actually make something with a GUI for once.`,
    imgSrcs: ['/static/images/projects/gifs/painter_demo.gif'],
    href: 'https://github.com/nfadeluca/Painter',
  },
]

export default projectsData
