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
      '/static/images/projects/gifs/heatmap_demo.gif',
    ],
    href: 'https://github.com/nfadeluca/homeprices',
  },
  {
    title: 'Report Builder',
    description: `
      I've been working on an AI-Powered DOCX Report Builder that leverages a powerful Large Language Model (LLM) to transform document creation. It features advanced text parsing, prompt engineering, and custom templates for high-quality reports. Using vector data stores and the Retrieval-Augmented Generation (RAG) method, it ensures superior context and precise data fetching. A Python backend handles communication with the LLM API, enhancing efficiency.
      Integrated with a full-stack web application, it seamlessly connects with CRM components, boosting productivity. Managed via Azure DevOps, it has a streamlined pipeline for staging and production, enabling continuous integration, smooth updates, and reliable deployment.
      Designed for scalability, it adapts to various business needs, generating detailed financial reports, market analyses, and customized documents. Unfortunately, I can't share images or the repository due to confidentiality, but feel free to ask me about it!`,
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
