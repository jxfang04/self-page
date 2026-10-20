// Personal content lives here. After editing, run `npm run build`.
// Leave unknown URLs and the portrait empty; the page handles them gracefully.
export default {
  name: 'Jiaxin Fang',
  initials: 'JF',
  role: 'PhD Student',
  sidebarRole: 'Researcher in the field of Robotics',
  availability: 'I am open to research collaborations and welcome conversations about studies and life as an intern.',
  affiliation: 'Fudan University',
  current: 'Intern at COCO Matrix',
  location: 'Fudan University · COCO Matrix',
  email: 'jxfang26@m.fudan.edu.cn',
  otherEmail: 'f18195030@gmail.com',
  avatar: 'assets/IMG_4058.jpeg',
  links: { github: 'https://github.com/jxfang04', openreview: 'https://openreview.net/profile?id=%7EJiaxin_Fang1', scholar: 'https://scholar.google.com/citations?user=G9eYz_UAAAAJ', cv: '' },
  tagline: 'Stay curious. Keep exploring.',
  bannerTagline: 'Setbacks are unavoidable, But give up is unforgivable',
  intro: 'Research, ideas, and the things I discover along the way.',
  biography: [
    'I’m Jiaxin Fang, a PhD student in the College of Computer Science and Artificial Intelligence at Fudan University, where I joined the direct-entry PhD program in 2026. My research focuses on robotics, particularly world action models, agent systems, and dexterous manipulation.',
    'I am also a research intern at COCO Matrix, where I investigate how robot policies can use the current scene context to iteratively improve their performance in real time and adapt to human preferences. My engineering experience spans the full robotics development stack: defining pre-training data, training models, post-training for specific robot embodiments, and building the infrastructure that delivers policy-generated action chunks to robots.',
    'My long-term research goal is to build policies that continuously adapt and improve in response to real-time environmental context. I believe physical intelligence can make the world a better place.'
  ],
  interests: [],
  researchAreas: [
    {
      title: 'Robotics',
      label: 'Primary research focus',
      topics: [
        { title: 'World Action Model Policies', description: 'How can we design a compact latent space that dynamically captures all information useful to the action expert, enabling action prediction to make the fullest use of relevant context?' },
        { title: 'In-Context Learning', description: 'How can real-world physical properties guide robots toward human-preferred behavior without updating model weights, while enabling robot policies to remember and reuse these preferences?' }
      ]
    },
    {
      title: 'Efficient AI',
      label: 'Research direction',
      description: 'I am also interested in accelerating video and image generation models.',
      topics: [
        { title: 'Feature Cache and Resume', description: 'Caching and reusing intermediate features to reduce redundant computation in generative models.' },
        { title: 'Asynchronous Reconstruction', description: 'Accelerating video and image generation through asynchronous computation.' }
      ]
    }
  ],
  experience: [
    { organization: 'COCO Matrix', role: 'Research Intern', start: '2026-05', end: '', period: 'May 2026 — Present', mentors: ['Yuxiang Gao', 'Mengdi Xu'] },
    { organization: 'SAI EPIC Lab', role: 'Research Intern', start: '2024-12', end: '2025-07', period: 'Dec 2024 — Jul 2025', mentors: ['Linfeng Zhang'] }
  ],
  projects: [], // { title: 'Project title', description: 'Description', category: 'Research', year: '2026', url: 'https://...', image: 'assets/...' }
  publications: [
    {
      title: 'BridgeWAM: Bridging Video and Action Experts via Latent Bridge Queries',
      authors: ['Jiaxin Fang', 'Ruitong Liu', 'Zeyu Lai', 'Xingyu Wang', 'Mingyuan Jia', 'Pingyue Sheng', 'Weikang Wan', 'Mengdi Xu', 'Yuxiang Gao'],
      year: '2026',
      status: 'Submitted to ICLR 2027 Main Track',
      arxiv: '2610.14746',
      image: 'assets/bridgewam-teaser.png',
      imageAlt: 'BridgeWAM overview: latent bridge queries connect video and action experts, with simulation and real-world evaluation results.',
      url: 'https://arxiv.org/abs/2610.14746'

    },
    {
      title: 'Rethinking World-Action Model for Compositional and In-Context Robotic Manipulation',
      authors: ['Shukai Gong', 'Xuanran Zhai', 'Yintianrun Zhang', 'Ruopeng Cui', 'Ye Huang', 'Yiyang Fu', 'Dexuan Lyu', 'Chaojie Li', 'Xinyi Song', 'Peiwen Lin', 'Chuang Wang', 'Mingyuan Jia', 'Yufan Deng', 'Jiaxin Fang', 'Bo Liang', 'Jiaxin Li', 'Yuxiang Gao', 'Hao Liu', 'Daquan Zhou'],
      year: '2026',
      arxiv: '2610.02368',
      image: 'assets/vigar-overview.png',
      imageAlt: 'ViGAR overview: visual subgoal planning and subgoal execution for compositional and in-context robotic manipulation.',
      url: 'https://arxiv.org/abs/2610.02368'
    },
    {
      title: 'DFM-VLA: Iterative Action Refinement for Robot Manipulation via Discrete Flow Matching',
      authors: ['Jiayi Chen', 'Wenxuan Song', 'Jiaxin Fang', 'Ruiqing Yin', 'Jingbo Wang', 'Shuai Chen', 'Jieyuan Pei', 'Yikai Qin', 'Feifan Chen', 'Haodong Yan', 'Zhide Zhong', 'Wen Chen', 'Yan Wang', 'Yuxiang Gao', 'Haoang Li'],
      year: '2026',
      arxiv: '2603.26320v4',
      image: 'assets/dfm-vla-overview.png',
      imageAlt: 'DFM-VLA architecture overview: language, vision, and noisy action tokens enter a bidirectional transformer for iterative action refinement.',
      url: 'https://arxiv.org/abs/2603.26320v4'

    },
    {
      title: 'Accelerate Diffusion Transformers with Feature Momentum',
      authors: ['Jiaxin Fang', 'Chang Zou', 'Jiacheng Liu', 'Yuanhuiyi Lyu', 'Xuming Hu', 'Linfeng Zhang'],
      year: '2025',
      image: 'assets/femo-comparison.png',
      overviewImage: 'assets/femo-overview.png',
      overviewImageAlt: 'FeMo overview: momentum-based feature prediction across diffusion timesteps and a comparison with TaylorSeer in feature space.',
      imageLayout: 'balanced',
      imageAlt: 'FeMo qualitative comparisons with other acceleration methods on FLUX and DiT image generation.',
      imageUrl: 'https://openreview.net/pdf?id=ih1oyr0j6y',
      linkLabel: 'OpenReview · PDF',
      url: 'https://openreview.net/pdf?id=ih1oyr0j6y'
    }
  ],
  demos: [
    { title: 'Close the Laptop', videos: [{ src: 'assets/videos/bridgewam/close_the_laptop.mp4' }] },
    { title: 'Put Away the Drink', videos: [0, 1, 2].map(i => ({ src: `assets/videos/bridgewam/drink-${i}.mp4`, poster: `assets/videos/bridgewam/drink-${i}.jpg` })) },
    { title: 'Put Away the Mouse', videos: [0, 1, 2].map(i => ({ src: `assets/videos/bridgewam/mouse-${i}.mp4`, poster: `assets/videos/bridgewam/mouse-${i}.jpg` })) },
    { title: 'Put Away the Pen', videos: [0, 1].map(i => ({ src: `assets/videos/bridgewam/pen-${i}.mp4`, poster: `assets/videos/bridgewam/pen-${i}.jpg` })) }
  ],
  hobbies: [
    { title: 'Climbing', icon: '🧗' },
    { title: 'Cycling', icon: '🚴' },
    { title: 'Hiking', icon: '🥾' },
    { title: 'Exploring Cafés & Restaurants', icon: '☕' },
    { title: 'Tennis', icon: '🎾' },
    { title: 'Badminton', icon: '🏸' },
    { title: 'Swimming', icon: '🏊' }
  ],
  hobbyPhotos: [
    {
        "src": "assets/hobbies/1.jpg",
        "width": 1080,
        "height": 1613,
        "alt": "Flowering trees over a sunlit green path"
    },
    {
        "src": "assets/hobbies/7.jpg",
        "width": 1080,
        "height": 1440,
        "alt": "Boats on a lake beneath the evening sky"
    },
    {
        "src": "assets/hobbies/2.jpg",
        "width": 1440,
        "height": 1080,
        "alt": "A boat crossing blue water with an island in the distance"
    },
    {
        "src": "assets/hobbies/14.webp",
        "width": 1194,
        "height": 648,
        "alt": "Reaching toward a cloudy sky beside the sea"
    },
    {
        "src": "assets/hobbies/9.jpg",
        "width": 1080,
        "height": 1412,
        "alt": "A peace sign at a mountain viewpoint"
    },
    {
        "src": "assets/hobbies/4.jpg",
        "width": 1920,
        "height": 1080,
        "alt": "Green mountains framed by trees and traditional rooftops"
    },
    {
        "src": "assets/hobbies/10.jpg",
        "width": 1440,
        "height": 1080,
        "alt": "Coffee and desserts beside a sunny window"
    },
    {
        "src": "assets/hobbies/5.jpg",
        "width": 1080,
        "height": 1440,
        "alt": "Sunlit green leaves above a flowing stream"
    },
    {
        "src": "assets/hobbies/6.jpg",
        "width": 1440,
        "height": 1080,
        "alt": "Small boats on a lake at sunset"
    },
    {
        "src": "assets/hobbies/13.jpg",
        "width": 1317,
        "height": 1080,
        "alt": "Watching the sunset over a harbor skyline"
    }
],
  news: [
    { date: '2026.10', status: 'Submitted', text: 'Our work BridgeWAM is now available on arXiv and has been submitted to the ICLR 2027 Main Track.', url: 'https://arxiv.org/abs/2610.14746' }
  ],
  contact: 'For research conversations or simply to say hello, feel free to reach out. I’d be happy to connect.'
};
