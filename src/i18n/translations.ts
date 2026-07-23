export type Lang = 'en' | 'zh';

export interface TranslationShape {
  nav: {
    features: string;
    architecture: string;
    scenarios: string;
    hardware: string;
    roadmap: string;
    team: string;
    activities: string;
    themes: string;
    github: string;
    getStarted: string;
  };
  footer: {
    tagline: string;
    physicalAgentOS: string;
    product: string;
    resources: string;
    community: string;
    documentation: string;
    apiReference: string;
    techReport: string;
    issues: string;
    contribute: string;
    starOnGithub: string;
    contact: string;
    license: string;
    by: string;
    team: string;
    hackathon: string;
    madeWith: string;
    hcpLab: string;
    pengchengLab: string;
    xeraLab: string;
    basedOn: string;
  };
  hero: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    description: string;
    getStarted: string;
    technicalReport: string;
    watchDemo: string;
    developerCommunity: string;
    activeEvent: string;
    statTargets: string;
    statOpenSource: string;
    statRelease: string;
  };
  communityPage: {
    description: string;
    discordTitle: string;
    discordDescription: string;
    joinDiscord: string;
    feishu: string;
    bilibili: string;
    xiaohongshu: string;
    scanToJoin: string;
  };
  problemSolution: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    items: { pain: string; detail: string; solution: string; solutionDetail: string }[];
  };
  coreConcepts: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    items: { title: string; subtitle: string; description: string; highlight: string }[];
  };
  architecture: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    trackA: string;
    trackASub: string;
    trackB: string;
    trackBSub: string;
    protocol: string;
    sharedSurface: string;
    stateIsFile: string;
    read: string;
    write: string;
    nodes: { label: string; sublabel: string; description: string }[];
  };
  scenarios: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    items: { title: string; subtitle: string; description: string; features: string[] }[];
    note: string;
  };
  hardware: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    devices: string;
    statusVerified: string;
    statusInProgress: string;
    filters: string[];
    items: { type: string; description: string }[];
    deviceTable: {
      title: string;
      description: string;
      columns: {
        vendor: string;
        model: string;
        type: string;
        real: string;
        sim: string;
        tested: string;
      };
      rows: {
        vendor: string;
        model: string;
        type: string;
        real: boolean;
        sim: boolean;
        tested: boolean;
      }[];
    };
  };
  benchmark: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    chart1Title: string;
    chart1Subtitle: string;
    chartCalvinTitle: string;
    chartCalvinSubtitle: string;
    chartRobocasaTitle: string;
    chartRobocasaSubtitle: string;
    first: string;
    final: string;
    metric: string;
    averageLength: string;
    atomic: string;
    composite: string;
    overall: string;
    rescued: string;
    previousBenchmark: string;
    nextBenchmark: string;
  };
  roadmap: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    phases: { phase: string; title: string; period: string; items: { title: string }[] }[];
  };
  liveDemo: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    step: string;
    chapters: { label: string; description: string }[];
  };
  stats: {
    title: string;
    description: string;
    githubStars: string;
    githubStarsDesc: string;
    targetAdapters: string;
    targetAdaptersDesc: string;
    auditable: string;
    auditableDesc: string;
    openSource: string;
    openSourceDesc: string;
    contributors: string;
    contributorsDesc: string;
  };
  teamPreview: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    viewFullTeam: string;
    visitInstitution: string;
    institutions: { name: string; role: string; description: string }[];
    highlights: { label: string; value: string }[];
  };
  teamPage: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    coreTeam: string;
    contributors: string;
    openSourceCommunity: string;
    contributorsFrom: string;
    contributionDescription: string;
    viewContributors: string;
    contributionGuide: string;
    developerCommunity: string;
    contact: string;
    githubIssues: string;
    reportBugs: string;
    email: string;
    location: string;
    locationValue: string;
    members: { name: string; role: string; institution: string }[];
  };
  testimonials: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    items: { quote: string; author: string; role: string }[];
  };
  docsCTA: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    viewDocumentation: string;
    starOnGithub: string;
    joinDiscussion: string;
    items: { title: string; subtitle: string; description: string }[];
  };
  langToggle: {
    switchTo: string;
    en: string;
    zh: string;
  };
}

export const translations: Record<Lang, TranslationShape> = {
  en: {
    nav: {
      features: 'Features',
      architecture: 'Architecture',
      scenarios: 'Scenarios',
      hardware: 'Hardware',
      roadmap: 'Roadmap',
      team: 'Team',
      activities: 'Activities',
      themes: 'Themes',
      github: 'GitHub',
      getStarted: 'Get Started',
    },
    footer: {
      tagline: 'A unified, transparent, and auditable runtime foundation for physical agents.',
      physicalAgentOS: 'Self-Evolving Physical Agent OS',
      product: 'Product',
      resources: 'Resources',
      community: 'Community',
      documentation: 'Documentation',
      apiReference: 'User Manual',
      techReport: 'Technical Report',
      issues: 'Ask a Question',
      contribute: 'Contribute',
      starOnGithub: 'Star on GitHub',
      contact: 'Contact',
      license: 'MIT License',
      by: 'by',
      team: 'Team',
      hackathon: 'Hackathon',
      madeWith: 'Made with',
      hcpLab: 'HCP Lab',
      pengchengLab: 'Peng Cheng Lab',
      xeraLab: 'X-Era Lab',
      basedOn: 'Built with React, Three.js & GSAP',
    },
    hero: {
      label: 'Cognitive-Physical Decoupling · Session-Centered Runtime',
      titleLine1: 'Self-Evolving Physical Agent',
      titleLine2: 'Operating System',
      subtitle: 'PhyAgentOS - A unified, transparent, and auditable runtime foundation for physical agents',
      description: 'Heterogeneous robots plug in freely and work out of the box, making complex tasks one click away; embodied-model pipelines are automatically benchmarked and continuously evolved; long-term memory and self-evolution carry skills from games to simulation to real robots for seamless virtual-to-real migration.',
      getStarted: 'Get Started',
      technicalReport: 'Technical Report',
      watchDemo: 'Watch Demo',
      developerCommunity: 'Developer Community',
      activeEvent: 'Ongoing Activities',
      statTargets: 'Supported Targets',
      statOpenSource: 'Open Source',
      statRelease: 'Latest Release',
    },
    communityPage: {
      description: 'Connect with PhyAgentOS developers and follow the latest project updates.',
      discordTitle: 'Join us on Discord',
      discordDescription: 'Chat with developers worldwide, ask questions, and take part in community discussions.',
      joinDiscord: 'Join Discord',
      feishu: 'Feishu Community',
      bilibili: 'Bilibili',
      xiaohongshu: 'Xiaohongshu',
      scanToJoin: 'Scan the QR code to follow or join',
    },
    problemSolution: {
      label: 'Why PhyAgentOS?',
      title: 'Solving the hardest problems',
      highlight: 'in embodied AI',
      description: 'Four fundamental challenges that have blocked embodied intelligence, and how PhyAgentOS solves each one.',
      items: [
        {
          pain: 'LLM-direct-to-hardware coupling',
          detail: 'Reasoning and execution are tightly fused; switching robots means rewriting the entire pipeline.',
          solution: 'Cognitive-Physical Decoupling',
          solutionDetail: 'A session-centered runtime sits between planner and hardware. Adding a robot means implementing one Target Adapter (~100 lines); zero changes to the scheduling layer.',
        },
        {
          pain: 'Unverified dangerous actions',
          detail: 'Risky commands execute without validation, endangering hardware and environment.',
          solution: 'Three-Layer Safety',
          solutionDetail: 'Critic validation → Strict Preflight contract checks → Target-side SafetyGuard. Real-robot deployment mandates all three layers.',
        },
        {
          pain: 'Opaque internal state',
          detail: 'Debugging is a black box; understanding failures requires deep code diving.',
          solution: 'Fully Auditable File Protocols',
          solutionDetail: 'State, actions, and perception results are written to Markdown + YAML files (TARGETS.md, SESSIONS.md, SKILLRUNTIME.md, LESSONS.md). Every step is traceable and reproducible.',
        },
        {
          pain: 'Sim-to-real migration friction',
          detail: 'The same task behaves differently across simulation and real hardware.',
          solution: 'Zero-Friction Migration',
          solutionDetail: 'One Session protocol runs identically across simulation and real-world targets, declared via target_adapter:// URI.',
        },
      ],    },
    coreConcepts: {
      label: 'Core Concepts',
      title: 'Six principles that make',
      highlight: 'PhyAgentOS unique',
      description: 'Not just features; fundamental design decisions behind the session-centered runtime, including multi-granularity hierarchical memory and a multi-step reflection loop from the Game Agent branch.',
      items: [
        {
          title: 'Session-Centered Runtime',
          subtitle: 'One protocol, any target',
          description: 'A unified pipeline, WatchdogSupervisor → SessionRunner → SkillRuntime → TargetSessionHandle, replaces the legacy driver-centric model. The same Session protocol runs identically across debug, simulation, and real-robot targets.',
          highlight: 'Replaces the legacy Driver-Center architecture',
        },
        {
          title: 'Adapter + Bridge',
          subtitle: 'Three-way decoupling',
          description: 'TargetAdapter + PolicyAdapter + ActionBridge give explicit observation/action contracts. AdapterPlan is auto-composed, eliminating the target×skill combinatorial explosion of bespoke integrations.',
          highlight: 'No more target×skill combinatorial explosion',
        },
        {
          title: 'Dual Skill Runtimes',
          subtitle: 'Policy loop × Agent loop',
          description: 'PolicySkillRuntime maintains a closed-loop policy controller, while BuiltinSkillRuntime manages the agent interactive loop. Each has explicit execution contracts registered in SKILLRUNTIME.md.',
          highlight: 'Two runtimes, one contract surface',
        },
        {
          title: 'Multi-Layer Safety',
          subtitle: 'Verify before execute',
          description: 'Critic validation → Strict Preflight contract checks → Target-side SafetyGuard → Operator Override. High-risk actions must validate against EMBODIED.md before a session ever starts.',
          highlight: 'Real-robot deployment mandates all layers',
        },
        {
          title: 'Fully Auditable',
          subtitle: 'State is Markdown + YAML',
          description: 'TARGETS.md · SKILLRUNTIME.md · SESSIONS.md · ENVIRONMENT.md · LESSONS.md plus YAML sensor/perception/contract configs. Every state, action, and perception result is traceable and reproducible.',
          highlight: 'Every step is traceable and reproducible',
        },
        {
          title: 'Hierarchical Memory & Reflection',
          subtitle: 'Learn from experience autonomously',
          description: 'Multi-granularity hierarchical memory (Episodic LESSONS.md → Semantic MEMORY.md → Methodological skills/) plus a multi-step reflection loop (Plan→Reflect→Abstract→Skill). The Agent autonomously compacts, deduplicates lessons, and auto-creates reusable skills after sufficient verification.',
          highlight: 'Experience auto-converts to reusable skills',
        },
      ],
    },
    architecture: {
      label: 'Architecture',
      title: 'A session-centered',
      highlight: 'runtime',
      description: 'Cognition and execution decoupled through a shared file-protocol layer. Click any component to explore.',
      trackA: 'Track A',
      trackASub: 'Agent Layer',
      trackB: 'Track B',
      trackBSub: 'Execution Layer',
      protocol: 'Protocol',
      sharedSurface: 'Shared Layer',
      stateIsFile: 'State is File',
      read: 'Read',
      write: 'Write',
      nodes: [
        { label: 'Planner', sublabel: 'Reasoning', description: 'The cognitive planner decomposes tasks into executable sessions, reading AGENTS.md/SOUL.md/USER.md context and appending sessions to SESSIONS.md.' },
        { label: 'ContextBuilder', sublabel: 'Context Loading', description: 'Aggregates state from the Markdown protocol matrix (ENVIRONMENT.md, EMBODIED.md, LESSONS.md, TASK.md) into the agent context window.' },
        { label: 'Multi-Agent Critic', sublabel: 'Validation', description: 'Validates planned actions against EMBODIED.md constraints before execution. Intercepts dangerous operations with detailed reasoning.' },
        { label: 'Memory', sublabel: 'Lessons', description: 'Captures execution experience into LESSONS.md, covering both successes for reuse and failures analyzed to prevent recurrence.' },
        { label: 'WatchdogSupervisor', sublabel: 'Supervisor', description: 'The execution-plane supervisor that watches the session queue, launches SessionRunners, and enforces lifecycle (pending→running→succeeded/failed).' },
        { label: 'SessionRunner', sublabel: 'Sessions', description: 'Runs one session end-to-end: acquires a TargetSessionHandle, drives the SkillRuntime, and records results + artifacts.' },
        { label: 'SkillRuntime', sublabel: 'Skills', description: 'PolicySkillRuntime (closed-loop policy) and BuiltinSkillRuntime (agent interactive loop) execute skills against their declared contracts in SKILLRUNTIME.md.' },
        { label: 'Adapters & Bridge', sublabel: 'Targets', description: 'TargetAdapter + PolicyAdapter + ActionBridge decouple contracts. Simulation and real-world targets register in TARGETS.md via target_adapter:// URI.' },
      ],
    },
    scenarios: {
      label: 'Scenarios',
      title: 'One Runtime,',
      highlight: 'three task types',
      description: 'The same Session protocol supports three task types: games, simulation, and physical robots.',
      items: [
        {
          title: 'Game',
          subtitle: 'Local · Minecraft / Stardew Valley / Don\'t Starve',
          description: 'Minecraft, Stardew Valley, and Don\'t Starve as embodied intelligence testbeds: complex interactions, long-term planning, resource management, and open-world exploration. Validate Agent behavior at zero hardware cost, then transfer to real robots.',
          features: ['Minecraft bot control', 'Stardew Valley farming & social tasks', 'Don\'t Starve survival & crafting', 'Cross-game memory & planning validation'],
        },
        {
          title: 'Simulation',
          subtitle: 'Remote · benchmark',
          description: 'Physics-accurate simulation at scale with LIBERO, CALVIN, and RoboCasa365. Evaluate transfer, long-horizon chains, and household manipulation through reproducible target sessions.',
          features: ['LIBERO benchmark suite', 'CALVIN ABC→D', 'RoboCasa365 target50', 'Reproducible evaluation'],
        },
        {
          title: 'Real Robot',
          subtitle: 'Remote · deployment',
          description: 'Full deployment on physical hardware via Target Adapters. Real-world perception, manipulation, and fleet coordination all through the same Session protocol.',
          features: ['Franka, Go2, XLeRobot, PIPER', 'ReKep / SAM3 grasping', 'Fleet multi-robot coordination', 'Semantic verification'],
        },
      ],
      note: 'Game explores Agent behavior in open-world and life-simulation games at minimal cost. Simulation benchmarks policies at scale. Real Robot closes the loop with physical data. Each new target = register one target_adapter:// entry in TARGETS.md.',
    },
    hardware: {
      label: 'Hardware',
      title: 'Supported',
      highlight: 'Devices',
      description: 'Through Target Adapter, PhyAgentOS covers game, debug, simulation, and real-robot targets, from Minecraft to desktop robotic arms, quadrupeds, and dual-arm systems.',
      devices: 'Devices',
      statusVerified: 'Verified',
      statusInProgress: 'In Progress',
      filters: ['All', 'Arm', 'Quadruped', 'Humanoid', 'Wheeled', 'Simulation'],
      items: [
        { type: 'Desktop Arm', description: 'Real-robot target with ReKep & SAM3 grasping pipeline. One-click deployment via Target Adapter.' },
        { type: 'Desktop Arm', description: 'Collaborative arm target. ReKep deployment verified with precision control.' },
        { type: 'Quadruped', description: 'Legged robot target. Mobile manipulation and semantic navigation supported.' },
        { type: 'Industrial Arm', description: 'Industrial-grade precision arm target. Full protocol integration via Target Adapter.' },
        { type: 'Dual Arm', description: 'Bimanual dual-arm target. Dual-arm manipulation through a single Session protocol.' },
        { type: 'Desktop Arm', description: 'Open desktop-arm hardware with real-device and MuJoCo access, suitable for compact manipulation benchmarks.' },
        { type: 'Wheeled Robot', description: 'Compact wheeled manipulation platform with real-device and MuJoCo support for mobile operation tasks.' },
        { type: 'Wheeled Humanoid', description: 'Humanoid platform for perception, navigation, and manipulation workflows through the same runtime interface.' },
        { type: 'Bipedal Humanoid', description: 'Full-body humanoid platform for general-purpose embodied tasks, available through the hardware access pipeline.' },
        { type: 'Wheeled Humanoid', description: 'Wheeled humanoid hardware with real-device and MuJoCo access for long-horizon embodied tasks.' },
        { type: 'Simulation', description: 'LIBERO is a lifelong robot learning and knowledge-transfer benchmark for manipulation, with Spatial, Object, Goal, and LIBERO-100 suites for evaluating policy generalization and transfer.' },
        { type: 'Simulation', description: 'CALVIN ABC→D is a language-conditioned, long-horizon manipulation benchmark that evaluates five-subtask chains and transfer to the unseen environment D.' },
        { type: 'Simulation', description: 'RoboCasa365 evaluates atomic skills and composite household activities across diverse MuJoCo kitchen environments.' },
      ],
      deviceTable: {
        title: 'Supported Device Matrix',
        description: 'A comprehensive list of robots and hardware platforms supported or planned by PhyAgentOS.',
        columns: {
          vendor: 'Manufacturer',
          model: 'Model',
          type: 'Type',
          real: 'Real Robot',
          sim: 'Simulation',
          tested: 'Tested',
        },
        rows: [
          { vendor: 'Agilex', model: 'PIPER', type: 'Robotic Arm', real: true, sim: true, tested: true },
          { vendor: 'RealMan', model: 'RM65-B', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: '', model: 'BOBABOT', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: '', model: 'Elfin 5L', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: '', model: 'Fourier GR-3', type: 'Bipedal Humanoid', real: true, sim: true, tested: false },
          { vendor: 'Franka', model: 'Franka Emika Panda', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: 'Franka', model: 'Franka FR3', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'G1-D', type: 'Wheeled Humanoid', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'GO2', type: 'Quadruped Humanoid', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'G1', type: 'Bipedal Humanoid', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'R1', type: 'Bipedal Humanoid', real: false, sim: true, tested: false },
          { vendor: 'Huibo', model: 'Astra-Pro', type: 'Wheeled Humanoid', real: true, sim: true, tested: true },
          { vendor: 'Lekiwi', model: 'lekiwi', type: 'Wheeled', real: true, sim: true, tested: true },
          { vendor: 'HuggingFace', model: 'SO100', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: 'HuggingFace', model: 'SO101', type: 'Robotic Arm', real: true, sim: true, tested: true },
          { vendor: '', model: 'Stella Gaia Hand 20', type: 'Dexterous Hand', real: true, sim: true, tested: true },
          { vendor: '', model: 'ViperX300', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: '', model: 'XLerobot', type: 'Robotic Arm', real: false, sim: true, tested: false },
          { vendor: '', model: 'Zerith_H1_PRO', type: 'Wheeled Humanoid', real: true, sim: true, tested: true },
        ],
      },
    },
    benchmark: {
      label: 'Benchmark',
      title: 'Performance',
      highlight: "that's auditable",
      description: 'Agent-assisted validation on LIBERO, CALVIN ABC→D, and RoboCasa365 target50, with every recovery traceable through SESSIONS.md and LESSONS.md.',
      chart1Title: 'Agent-assisted LIBERO validation',
      chart1Subtitle: 'Overall task success rate before and after verifier-triggered retry.',
      chartCalvinTitle: 'Agent-assisted CALVIN ABC→D validation',
      chartCalvinSubtitle: 'Chain success across five-subtask sequences; Avg. Len. is the average number of completed subtasks per sequence.',
      chartRobocasaTitle: 'Agent-assisted RoboCasa365 target50 validation',
      chartRobocasaSubtitle: 'Episode success on the pretrain split: 18 atomic skills / 90 episodes and 32 composite activities / 160 episodes.',
      first: 'First attempt',
      final: 'After verifier retry',
      metric: 'Metric',
      averageLength: 'Avg. Len.',
      atomic: 'Atomic',
      composite: 'Composite',
      overall: 'Overall',
      rescued: 'Rescued episodes',
      previousBenchmark: 'Previous benchmark',
      nextBenchmark: 'Next benchmark',
    },
    roadmap: {
      label: 'Roadmap',
      title: 'Shipping the future',
      highlight: 'session by session',
      description: 'From the session-runtime MVP to semantic verification and fleet coordination: a clear, versioned trajectory.',
      phases: [
        {
          phase: 'Game Track',
          title: 'PhyAgentOS-G',
          period: '2026',
          items: [
            { title: 'Minecraft pipeline: cloud Agent connects to local game' },
            { title: 'Agent Loop integration: complex task completion in-game' },
            { title: 'Self-evolution with reflection: summarize experience from novel scenes' },
            { title: 'Hermes memory: multi-granularity hierarchy + multi-step Reflection loop' },
          ],
        },
        {
          phase: 'Phase 1',
          title: 'Session-Centered Runtime',
          period: '2025 - 2026',
          items: [
            { title: 'Hackathon baseline: plugin HAL, ReKep/SAM3 grasping & VLN' },
            { title: 'Session-Centered Runtime MVP: DummyTarget pipeline' },
            { title: 'Perception plugin system: Sensor/Perception YAML' },
            { title: 'Strict Policy/Builtin SkillRuntime separation' },
            { title: 'Onboarding & communication protocol spec' },
            { title: 'Cleaned protocols; main branch sim & real focus' },
            { title: 'CALVIN and RoboCasa365 support; SessionVerifier' },
          ],
        },
        {
          phase: 'Phase 2',
          title: 'Verification & Fleet',
          period: '2026',
          items: [
            { title: 'SessionVerifier: RGB-based semantic verification' },
            { title: 'Fleet multi-robot priority scheduling' },
            { title: 'Cross-robot skill migration' },
          ],
        },
        {
          phase: 'Phase 3',
          title: 'Autonomy & Coordination',
          period: '2026+',
          items: [
            { title: 'Autonomous task planning at scale' },
            { title: 'Advanced heterogeneous coordination' },
            { title: 'Closed-loop self-evolution engine' },
          ],
        },
      ],
    },
    liveDemo: {
      label: 'Live Demo',
      title: 'See it',
      highlight: 'in action',
      description: 'Watch PhyAgentOS run a full session lifecycle, from instruction to verified physical execution.',
      step: 'Step',
      chapters: [
        { label: 'Task Initiation', description: 'Natural-language instruction received by the Agent' },
        { label: 'Planning & Critic', description: 'Planner decomposes; Critic validates vs EMBODIED.md' },
        { label: 'Preflight', description: 'Strict contract checks before session starts' },
        { label: 'Session Execution', description: 'SessionRunner drives SkillRuntime + Target handle' },
        { label: 'Verify & Record', description: 'SessionVerifier checks RGB; results to LESSONS.md' },
      ],
    },
    stats: {
      title: 'Impact Metrics',
      description: 'PhyAgentOS accelerates embodied AI by unifying cognition and execution behind one session-centered runtime. Live metrics from our open-source community.',
      githubStars: 'GitHub Stars',
      githubStarsDesc: 'Community support',
      targetAdapters: 'Target Adapters',
      targetAdaptersDesc: 'sim · real-world',
      auditable: 'Auditable',
      auditableDesc: 'Markdown + YAML protocols',
      openSource: 'Open Source',
      openSourceDesc: 'MIT Licensed, always free',
      contributors: 'Contributors',
      contributorsDesc: 'Open source community',
    },
    teamPreview: {
      label: 'Team',
      title: 'Built by',
      highlight: 'researchers',
      description: 'PhyAgentOS is jointly developed by the HCP Laboratory at Sun Yat-sen University, Peng Cheng Laboratory, and X-Era Lab.',
      viewFullTeam: 'View full team',
      visitInstitution: 'Visit Website',
      institutions: [
        { name: 'Sun Yat-sen University', role: 'HCP Lab', description: 'Human Cyber Physical Intelligence Integration Lab' },
        { name: 'Peng Cheng Laboratory', role: 'Research Partner', description: 'Peng Cheng National Laboratory' },
        { name: 'X-Era Lab', role: 'X-Era Lab', description: 'X-Era' },
      ],
      highlights: [
        { label: 'Research Lab', value: 'HCP @ SYSU' },
        { label: 'Partner', value: 'Peng Cheng Lab' },
        { label: 'Collaborator', value: 'X-Era Lab' },
        { label: 'License', value: 'MIT Open Source' },
      ],
    },
    teamPage: {
      label: 'Team',
      title: 'The people behind',
      highlight: 'PhyAgentOS',
      description: 'A collaboration between Sun Yat-sen University, Peng Cheng Laboratory, and X-Era Lab, built with the open-source community.',
      coreTeam: 'Core Team',
      contributors: 'Contributors',
      openSourceCommunity: 'Open Source Community',
      contributorsFrom: 'Contributors from around the world',
      contributionDescription: 'PhyAgentOS is an open-source project that welcomes contributions from the community. Whether you are fixing bugs, adding new features, improving documentation, or sharing your use cases, every contribution matters.',
      viewContributors: 'View Contributors',
      contributionGuide: 'Contribution Guide',
      developerCommunity: 'Developer Community',
      contact: 'Contact',
      githubIssues: 'GitHub Issues',
      reportBugs: 'Report bugs & request features',
      email: 'Email',
      location: 'Location',
      locationValue: 'Guangzhou, China',
      members: [
        { name: 'HCP Lab', role: 'Core Development Team', institution: 'Sun Yat-sen University' },
        { name: 'Peng Cheng Lab', role: 'Research Partner', institution: 'Peng Cheng Laboratory' },
        { name: 'X-Era Lab', role: 'Research Collaborator', institution: 'X-Era Lab' },
      ],
    },
    testimonials: {
      label: 'Testimonials',
      title: 'What the community',
      highlight: 'is saying',
      description: 'Feedback from researchers, developers, and the open-source community building on PhyAgentOS.',
      items: [
        { quote: "The session-centered runtime makes sim-to-real migration effortless. One Session protocol, identical behavior across LIBERO and our Franka arm.", author: 'Research Team', role: 'HCP Lab, Sun Yat-sen University / X-Era Lab' },
        { quote: "Target Adapters collapsed our integration cost from thousands of lines to a single ~100-line file. The AdapterPlan auto-composition is genuinely elegant.", author: 'Contributors', role: 'Open Source Community' },
        { quote: "Three-layer safety, Critic, Preflight, SafetyGuard, finally gives us the confidence to deploy learned policies on real hardware.", author: 'Developers', role: 'Robotics Engineers' },
      ],
    },
    docsCTA: {
      label: 'Documentation',
      title: 'Everything you need',
      highlight: 'to get started',
      description: 'Comprehensive documentation covering the runtime architecture, user operation, and hardware integration.',
      viewDocumentation: 'View Documentation',
      starOnGithub: 'Star on GitHub',
      joinDiscussion: 'Join Discussion',
      items: [
        { title: 'Architecture', subtitle: 'Technical Documentation', description: 'Deep dive into the session-centered runtime: WatchdogSupervisor, SessionRunner, dual SkillRuntimes, Target Adapters & Bridges, and the Markdown + YAML file-protocol matrix.' },
        { title: 'User Manual', subtitle: 'Installation & Operation', description: 'Install with `paos`, onboard a workspace, run `paos agent`, connect runtime services, and configure semantic verification for real-robot deployment.' },
        { title: 'Developer Guide', subtitle: 'Secondary Development', description: 'Author a Target Adapter, register skill runtimes in SKILLRUNTIME.md, integrate new policies via OpenPI, and follow the contribution workflow.' },
      ],
    },
    langToggle: {
      switchTo: '切换语言',
      en: 'EN',
      zh: '中',
    },
  },

  zh: {
    nav: {
      features: '核心特性',
      architecture: '系统架构',
      scenarios: '应用场景',
      hardware: '硬件设备',
      roadmap: '路线图',
      team: '团队',
      activities: '活动',
      themes: '主题',
      github: 'GitHub',
      getStarted: '快速开始',
    },
    footer: {
      tagline: '统一、透明、可审计的的物理智能体运行底座。',
      physicalAgentOS: '自进化物理智能体操作系统',
      product: '产品',
      resources: '资源',
      community: '社区',
      documentation: '技术文档',
      apiReference: '用户手册',
      techReport: '技术报告',
      issues: '提问',
      contribute: '参与贡献',
      starOnGithub: '在 GitHub 上 Star',
      contact: '联系我们',
      license: 'MIT 许可证',
      by: '由',
      team: '团队',
      hackathon: '黑客松',
      madeWith: '由',
      hcpLab: 'HCP 实验室',
      pengchengLab: '鹏城实验室',
      xeraLab: 'X-Era Lab',
      basedOn: '使用 React、Three.js 与 GSAP 构建',
    },
    hero: {
      label: '认知-物理解耦 · 会话中心化运行时',
      titleLine1: '自进化物理智能体',
      titleLine2: '操作系统',
      subtitle: 'PhyAgentOS-统一、透明、可审计的的物理智能体运行底座',
      description: '异构机器人自由接入，即插即用，复杂任务一触即达；具身模型流水线自动评测、持续进化；长期记忆与自进化能力，Game → 仿真 → 真机，无缝虚实迁移。',
      getStarted: '快速开始',
      technicalReport: '技术报告',
      watchDemo: '观看演示',
      developerCommunity: '开发者社区',
      activeEvent: '正在进行的活动',
      statTargets: '支持的构型',
      statOpenSource: '开源协议',
      statRelease: '最新版本',
    },
    communityPage: {
      description: '与 PhyAgentOS 开发者交流，获取项目最新动态。',
      discordTitle: '加入 Discord 社区',
      discordDescription: '与全球开发者交流、提问，并参与社区讨论。',
      joinDiscord: '加入 Discord',
      feishu: '飞书开发者群',
      bilibili: '哔哩哔哩',
      xiaohongshu: '小红书',
      scanToJoin: '扫描二维码关注或加入',
    },
    problemSolution: {
      label: '为何选择 PhyAgentOS？',
      title: '解决具身智能领域',
      highlight: '最棘手的难题',
      description: '具身智能被四大根本性难题长期困扰，PhyAgentOS 逐一破解。',
      items: [
        {
          pain: '大模型直连硬件的紧耦合',
          detail: '推理与执行紧密绑定，切换机器人意味着重写整个流水线。',
          solution: '认知-物理解耦',
          solutionDetail: '会话中心化运行时位于规划器与硬件之间。新增机器人只需实现一个 Target Adapter（约 100 行）；调度层零改动。',
        },
        {
          pain: '危险动作缺乏验证',
          detail: '高风险指令未经校验即执行，危及硬件与环境安全。',
          solution: '三层安全机制',
          solutionDetail: 'Critic 校验 → 严格 Preflight 契约检查 → 目标侧 SafetyGuard。真机部署强制要求三层全部启用。',
        },
        {
          pain: '内部状态不透明',
          detail: '调试如同黑盒；理解失败原因需要深入代码挖掘。',
          solution: '全可审计文件协议',
          solutionDetail: '状态、动作与感知结果均写入 Markdown + YAML 文件（TARGETS.md、SESSIONS.md、SKILLRUNTIME.md、LESSONS.md）。每一步可追溯、可复现。',
        },
        {
          pain: '仿真与真机执行链路不一致',
          detail: '同一任务在仿真与真实硬件上行为不一致。',
          solution: '统一执行链路',
          solutionDetail: '同一套 Session 协议贯通仿真环境与真实硬件，具体接入方式通过 TARGETS.md 声明。',
        },
      ],
    },
    coreConcepts: {
      label: '核心理念',
      title: '六大原则让',
      highlight: 'PhyAgentOS 与众不同',
      description: '这不仅是功能，而是会话中心化运行时背后的根本性设计决策，包括来自游戏智能体分支的多粒度分层记忆与多步反思闭环。',
      items: [
        {
          title: '会话中心化运行时',
          subtitle: '一个协议，任意目标',
          description: '统一流水线 WatchdogSupervisor → SessionRunner → SkillRuntime → Target 替代了传统的驱动中心化模型。同一 Session 协议在调试、仿真与真机目标上行为完全一致。',
          highlight: '替代传统的驱动中心化架构',
        },
        {
          title: '适配器与桥接',
          subtitle: '三方解耦',
          description: 'TargetAdapter + PolicyAdapter + ActionBridge 提供明确的观测/动作契约。AdapterPlan 自动组合，消除了定制化集成的目标×技能组合爆炸问题。',
          highlight: '告别目标×技能的组合爆炸',
        },
        {
          title: '双重技能运行时',
          subtitle: '策略闭环 × 智能体闭环',
          description: 'PolicySkillRuntime 维护闭环策略控制器，BuiltinSkillRuntime 管理智能体交互闭环。两者各自在 SKILLRUNTIME.md 中注册明确的执行契约。',
          highlight: '两个运行时，一个契约面',
        },
        {
          title: '多层安全',
          subtitle: '执行前先验证',
          description: 'Critic 校验 → 严格 Preflight 契约检查 → 目标侧 SafetyGuard → 操作员覆盖。高风险动作在会话启动前必须通过 EMBODIED.md 约束校验。',
          highlight: '真机部署强制要求全部安全层',
        },
        {
          title: '全可审计',
          subtitle: '状态即 Markdown + YAML',
          description: 'TARGETS.md · SKILLRUNTIME.md · SESSIONS.md · ENVIRONMENT.md · LESSONS.md 加上 YAML 传感器/感知/契约配置。每个状态、动作与感知结果都可追溯、可复现。',
          highlight: '每一步都可追溯、可复现',
        },
        {
          title: '分层记忆与反思',
          subtitle: '自主学习，沉淀经验',
          description: '多粒度分层记忆架构（战术层 LESSONS.md → 战略层 MEMORY.md → 方法论层 skills/）加多步反思闭环（Plan→Reflect→Abstract→Skill）。Agent 自主压缩、去重经验教训，经过多次验证后自动调用 skill-creator 创建可复用技能。',
          highlight: '经验自动转化为可复用技能',
        },
      ],
    },
    architecture: {
      label: '系统架构',
      title: '会话中心化',
      highlight: '运行时',
      description: '认知与执行通过共享的文件协议层解耦。点击任意组件探索详情。',
      trackA: '轨道 A',
      trackASub: '智能体层',
      trackB: '轨道 B',
      trackBSub: '执行层',
      protocol: '协议',
      sharedSurface: '共享层',
      stateIsFile: '状态即文件',
      read: '读',
      write: '写',
      nodes: [
        { label: 'Planner', sublabel: '推理', description: '认知规划器将任务分解为可执行会话，读取 AGENTS.md/SOUL.md/USER.md 上下文，并向 SESSIONS.md 追加会话。' },
        { label: 'ContextBuilder', sublabel: '上下文加载', description: '聚合 Markdown 协议矩阵的状态（ENVIRONMENT.md、EMBODIED.md、LESSONS.md、TASK.md），注入智能体上下文窗口。' },
        { label: 'Multi-Agent Critic', sublabel: '校验', description: '在执行前依据 EMBODIED.md 约束校验规划动作。以详尽推理拦截危险操作。' },
        { label: 'Memory', sublabel: '经验', description: '将执行经验捕获至 LESSONS.md，既保存成功以复用，也分析失败以避免重蹈覆辙。' },
        { label: 'WatchdogSupervisor', sublabel: '监督者', description: '执行层监督者，监视会话队列、启动 SessionRunner 并强制执行生命周期（pending→running→succeeded/failed）。' },
        { label: 'SessionRunner', sublabel: '会话', description: '端到端运行单个会话：获取 TargetSessionHandle、驱动 SkillRuntime 并记录结果与产物。' },
        { label: 'SkillRuntime', sublabel: '技能', description: 'PolicySkillRuntime（闭环策略）与 BuiltinSkillRuntime（智能体交互闭环）依据 SKILLRUNTIME.md 中声明的契约执行技能。' },
        { label: 'Target', sublabel: '目标', description: '仿真和真实世界目标注册于 TARGETS.md，通过 TargetAdapter + PolicyAdapter + ActionBridge 实现契约解耦。' },
      ],
    },
    scenarios: {
      label: '应用场景',
      title: '一个运行时，',
      highlight: '三类任务',
      description: '同一套 Session 协议支持游戏、仿真与真机三类任务。',
      items: [
        {
          title: '游戏',
          subtitle: '本地 · Minecraft / 星露谷 / 饥荒',
          description: '以 Minecraft、星露谷与饥荒为具身智能试验场：复杂交互、长期规划、资源管理与开放世界探索。零硬件成本验证 Agent 行为，再迁移至真机。',
          features: ['Minecraft bot 控制', '星露谷耕作与社交任务', '饥荒生存与制作', '跨游戏记忆与规划验证'],
        },
        {
          title: '仿真',
          subtitle: '远程 · 基准评测',
          description: '基于 LIBERO、CALVIN 与 RoboCasa365 的大规模物理精确仿真，通过可复现的目标会话评估迁移、长程任务链与家庭操作能力。',
          features: ['LIBERO 基准套件', 'CALVIN ABC→D', 'RoboCasa365 target50', '可复现评估'],
        },
        {
          title: '真机',
          subtitle: '远程 · 部署',
          description: '通过 Target Adapter 在物理硬件上完整部署。真实世界感知、操作与编队协同全部通过同一 Session 协议。',
          features: ['Franka、Go2、XLeRobot、PIPER', 'ReKep / SAM3 抓取', '编队多机协同', '语义验证'],
        },
      ],
      note: '游戏以极低硬件成本在开放世界与生存模拟游戏中探索 Agent 行为；仿真大规模评测策略；真机以物理数据闭环。每个新目标 = 在 TARGETS.md 中注册一个 target_adapter:// 条目。',
    },
    hardware: {
      label: '硬件设备',
      title: '支持的',
      highlight: '设备',
      description: '通过 Target Adapter，PhyAgentOS 覆盖游戏、调试、仿真与真机目标，从 Minecraft 到桌面机械臂再到四足机器人与双臂系统。',
      devices: '个设备',
      statusVerified: '已验证',
      statusInProgress: '开发中',
      filters: ['全部', '机械臂', '四足', '人形', '轮式', '仿真'],
      items: [
        { type: '桌面机械臂', description: '支持 ReKep 与 SAM3 抓取流水线的真机目标。通过 Target Adapter 一键部署。' },
        { type: '桌面机械臂', description: '协作机械臂目标。ReKep 部署已验证，具备精密控制能力。' },
        { type: '四足机器人', description: '足式机器人目标。支持移动操作与语义导航。' },
        { type: '工业机械臂', description: '工业级精密机械臂目标。通过 Target Adapter 实现完整协议集成。' },
        { type: '双臂', description: '双臂操作目标。通过单一 Session 协议实现双臂协同操作。' },
        { type: '桌面机械臂', description: '开源桌面机械臂硬件，支持真机接入与 MuJoCo 接入，适合紧凑型操作评测。' },
        { type: '轮式机器人', description: '紧凑型轮式操作平台，支持真机与 MuJoCo，用于移动操作任务。' },
        { type: '轮式人形', description: '面向感知、导航与操作流程的人形平台，通过统一运行时接口接入。' },
        { type: '双足人形', description: '面向通用具身任务的全身人形平台，可通过硬件接入链路运行。' },
        { type: '轮式人形', description: '支持真机接入与 MuJoCo 接入的轮式人形硬件，适合长程具身任务。' },
        { type: '仿真', description: 'LIBERO 是面向终身机器人学习与知识迁移的机器人操作基准，包含 Spatial、Object、Goal、LIBERO-100 等任务套件，用于评估策略泛化与迁移能力。' },
        { type: '仿真', description: 'CALVIN ABC→D 是面向语言条件长程操作的仿真基准，用五步子任务链评估策略向未见环境 D 的迁移能力。' },
        { type: '仿真', description: 'RoboCasa365 在多样化的 MuJoCo 厨房环境中评估原子技能与复合家庭活动。' },
      ],
      deviceTable: {
        title: '设备支持矩阵',
        description: 'PhyAgentOS 已支持或计划支持的机器人与硬件平台完整列表。',
        columns: {
          vendor: '厂商',
          model: '型号',
          type: '类型',
          real: '真机',
          sim: '仿真',
          tested: '是否测试',
        },
        rows: [
          { vendor: 'Agilex', model: 'PIPER', type: '机械臂', real: true, sim: true, tested: true },
          { vendor: 'RealMan', model: 'RM65-B', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: '', model: 'BOBABOT', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: '', model: 'Elfin 5L', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: '', model: 'Fourier GR-3', type: '双足人形', real: true, sim: true, tested: false },
          { vendor: 'Franka', model: 'Franka Emika Panda', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: 'Franka', model: 'Franka FR3', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'G1-D', type: '轮式人形', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'GO2', type: '四足人形', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'G1', type: '双足人形', real: false, sim: true, tested: false },
          { vendor: 'Unitree', model: 'R1', type: '双足人形', real: false, sim: true, tested: false },
          { vendor: 'Huibo', model: 'Astra-Pro', type: '轮式人形', real: true, sim: true, tested: true },
          { vendor: 'Lekiwi', model: 'lekiwi', type: '轮式', real: true, sim: true, tested: true },
          { vendor: 'HuggingFace', model: 'SO100', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: 'HuggingFace', model: 'SO101', type: '机械臂', real: true, sim: true, tested: true },
          { vendor: '', model: 'Stella Gaia Hand 20', type: '灵巧手', real: true, sim: true, tested: true },
          { vendor: '', model: 'ViperX300', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: '', model: 'XLerobot', type: '机械臂', real: false, sim: true, tested: false },
          { vendor: '', model: 'Zerith_H1_PRO', type: '轮式人形', real: true, sim: true, tested: true },
        ],
      },
    },
    benchmark: {
      label: '性能基准',
      title: '可审计的',
      highlight: '性能表现',
      description: 'LIBERO、CALVIN ABC→D 与 RoboCasa365 target50 上的智能体辅助验证结果，每次恢复均可通过 SESSIONS.md 与 LESSONS.md 追溯。',
      chart1Title: '智能体辅助 LIBERO 验证',
      chart1Subtitle: '展示验证器触发重试前后的总体任务成功率。',
      chartCalvinTitle: '智能体辅助 CALVIN ABC→D 验证',
      chartCalvinSubtitle: '展示五步子任务序列的链式成功率；平均链长表示每个序列平均完成的子任务数量。',
      chartRobocasaTitle: '智能体辅助 RoboCasa365 target50 验证',
      chartRobocasaSubtitle: 'pretrain 划分上的回合成功率：18 项原子技能 / 90 回合，32 项复合活动 / 160 回合。',
      first: '首次执行',
      final: '验证器重试后',
      metric: '指标',
      averageLength: '平均链长',
      atomic: '原子技能',
      composite: '复合活动',
      overall: '总体',
      rescued: '挽救回合',
      previousBenchmark: '上一个基准',
      nextBenchmark: '下一个基准',
    },
    roadmap: {
      label: '路线图',
      title: '逐会话',
      highlight: '交付未来',
      description: '从会话运行时 MVP 到语义验证与编队协同，形成一条清晰、版本化的演进轨迹。',
      phases: [
        {
          phase: '游戏轨道',
          title: 'PhyAgentOS-G',
          period: '2026',
          items: [
            { title: 'Minecraft 全链路：云端 Agent 连接本地游戏服务器' },
            { title: 'Agent Loop 整合：游戏内完成复杂任务' },
            { title: '反思自进化：在全新场景中总结经验' },
            { title: 'Hermes 记忆：多粒度分层 + 多步反思闭环' },
          ],
        },
        {
          phase: '第一阶段',
          title: '会话中心化运行时',
          period: '2025 - 2026',
          items: [
            { title: '黑客松基线：插件 HAL、ReKep/SAM3 抓取与 VLN' },
            { title: '会话中心化运行时 MVP：DummyTarget 流水线' },
            { title: '感知插件系统：Sensor/Perception YAML' },
            { title: '严格的 Policy/Builtin SkillRuntime 分离' },
            { title: '入门流程与通信协议规范' },
            { title: '协议清理；主分支聚焦仿真与真机' },
            { title: 'CALVIN 与 RoboCasa365 支持；SessionVerifier' },
          ],
        },
        {
          phase: '第二阶段',
          title: '验证与编队',
          period: '2026',
          items: [
            { title: 'SessionVerifier：基于 RGB 的语义验证' },
            { title: '编队多机优先级调度' },
            { title: '跨机器人技能迁移' },
          ],
        },
        {
          phase: '第三阶段',
          title: '自主与协同',
          period: '2026+',
          items: [
            { title: '规模化自主任务规划' },
            { title: '高级异构协同' },
            { title: '闭环自进化引擎' },
          ],
        },
      ],
    },
    liveDemo: {
      label: '实时演示',
      title: '一睹',
      highlight: '实际运行',
      description: '观看 PhyAgentOS 运行完整的会话生命周期，从指令到经过验证的物理执行。',
      step: '步骤',
      chapters: [
        { label: '任务发起', description: 'Agent 接收自然语言指令' },
        { label: '规划与校验', description: 'Planner 分解任务；Critic 依据 EMBODIED.md 校验' },
        { label: '预检', description: '会话启动前的严格契约检查' },
        { label: '会话执行', description: 'SessionRunner 驱动 SkillRuntime 与 Target 句柄' },
        { label: '验证与记录', description: 'SessionVerifier 检查 RGB；结果写入 LESSONS.md' },
      ],
    },
    stats: {
      title: '影响力指标',
      description: 'PhyAgentOS 通过统一的会话中心化运行时融合认知与执行，加速具身智能开发。以下为开源社区的实时指标。',
      githubStars: 'GitHub Stars',
      githubStarsDesc: '社区支持',
      targetAdapters: '目标适配器',
      targetAdaptersDesc: '仿真 · 真实世界',
      auditable: '可审计',
      auditableDesc: 'Markdown + YAML 协议',
      openSource: '完全开源',
      openSourceDesc: 'MIT 许可，永久免费',
      contributors: '贡献者',
      contributorsDesc: '开源社区',
    },
    teamPreview: {
      label: '团队',
      title: '由',
      highlight: '研究者打造',
      description: 'PhyAgentOS 由中山大学 HCP 实验室、鹏城实验室与 X-Era Lab 联合开发。',
      viewFullTeam: '查看完整团队',
      visitInstitution: '访问官网',
      institutions: [
        { name: '中山大学', role: 'HCP 实验室', description: '人机物智能融合实验室' },
        { name: '鹏城国家实验室', role: '具身智能研究所', description: '鹏城国家实验室' },
        { name: '拓元智慧', role: 'X-Era Lab', description: '拓元智慧' },
      ],
      highlights: [
        { label: '研究实验室', value: 'HCP @ 中山大学' },
        { label: '合作伙伴', value: '鹏城实验室' },
        { label: '合作单位', value: 'X-Era Lab' },
        { label: '开源协议', value: 'MIT 开源' },
      ],
    },
    teamPage: {
      label: '团队',
      title: 'PhyAgentOS 背后的',
      highlight: '建设者',
      description: 'PhyAgentOS 由中山大学人机物智能融合实验室（HCP-Lab）、鹏城国家实验室和 X-Era Lab 联合开发，并与开源社区共同建设。',
      coreTeam: '核心团队',
      contributors: '贡献者',
      openSourceCommunity: '开源社区',
      contributorsFrom: '来自世界各地的贡献者',
      contributionDescription: 'PhyAgentOS 是一个欢迎社区参与的开源项目。无论是修复问题、增加功能、改进文档，还是分享使用案例，每一份贡献都很重要。',
      viewContributors: '查看贡献者',
      contributionGuide: '贡献指南',
      developerCommunity: '开发者社区',
      contact: '联系方式',
      githubIssues: 'GitHub Issues',
      reportBugs: '报告问题、提出功能需求',
      email: '邮箱',
      location: '所在地',
      locationValue: '中国广州',
      members: [
        { name: '中山大学', role: '核心开发团队', institution: '中山大学人机物智能融合实验室（HCP-Lab）' },
        { name: '鹏城国家实验室', role: '具身智能研究所', institution: '鹏城国家实验室' },
        { name: '拓元智慧', role: '研究合作伙伴', institution: 'X-Era Lab' },
      ],
    },
    testimonials: {
      label: '用户评价',
      title: '社区的',
      highlight: '真实声音',
      description: '来自研究者、开发者与开源社区在使用 PhyAgentOS 过程中的反馈。',
      items: [
        { quote: '会话中心化运行时让 sim-to-real 迁移毫不费力。同一 Session 协议在 LIBERO 与我们的 Franka 机械臂上行为完全一致。', author: '研究团队', role: '中山大学 HCP 实验室 / X-Era Lab' },
        { quote: 'Target Adapter 将我们的集成成本从数千行代码压缩到单个约 100 行的文件。AdapterPlan 自动组合的设计确实优雅。', author: '贡献者', role: '开源社区' },
        { quote: '三层安全，即 Critic、Preflight、SafetyGuard，终于让我们有信心在真实硬件上部署学习到的策略。', author: '开发者', role: '机器人工程师' },
      ],
    },
    docsCTA: {
      label: '文档',
      title: '入门所需的',
      highlight: '一切资料',
      description: '涵盖运行时架构、用户操作与硬件集成的全面文档。',
      viewDocumentation: '查看文档',
      starOnGithub: '在 GitHub 上 Star',
      joinDiscussion: '参与讨论',
      items: [
        { title: '系统架构', subtitle: '技术文档', description: '深入了解会话中心化运行时：WatchdogSupervisor、SessionRunner、双重 SkillRuntime、Target Adapter 与 Bridge，以及 Markdown + YAML 文件协议矩阵。' },
        { title: '用户手册', subtitle: '安装与操作', description: '使用 `paos` 安装、初始化工作区、运行 `paos agent`、连接运行时服务，并为真机部署配置语义验证。' },
        { title: '开发者指南', subtitle: '二次开发', description: '编写 Target Adapter、在 SKILLRUNTIME.md 中注册技能运行时、通过 OpenPI 集成新策略，并遵循贡献工作流。' },
      ],
    },
    langToggle: {
      switchTo: 'Switch Language',
      en: 'EN',
      zh: '中',
    },
  },
};
