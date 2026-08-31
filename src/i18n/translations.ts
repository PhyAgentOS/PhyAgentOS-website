export type Lang = 'en' | 'zh';

export interface TranslationShape {
  nav: {
    conceptFilm: string;
    features: string;
    architecture: string;
    scenarios: string;
    benchmark: string;
    gettingStartedDocs: string;
    hardware: string;
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
    statAlgorithms: string;
    statSkills: string;
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
    flowLabel: string;
    flow: string[];
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
    statusReal: string;
    statusMujoco: string;
    statusIsaac: string;
    statusPending: string;
    imagePending: string;
    filters: string[];
    items: { type: string; description: string }[];
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
  liveDemo: {
    label: string;
    title: string;
    highlight: string;
    description: string;
    step: string;
    chapters: { label: string; description: string }[];
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
    collaboratorsLabel: string;
    collaboratorsTitle: string;
    collaboratorsDescription: string;
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
      conceptFilm: 'Concept Film',
      features: 'Features',
      architecture: 'Architecture',
      scenarios: 'Scenarios',
      benchmark: 'Benchmarks',
      gettingStartedDocs: 'Getting Started Docs',
      hardware: 'Hardware',
      team: 'Team',
      activities: 'Activities',
      themes: 'Themes',
      github: 'GitHub',
      getStarted: 'Get Started',
    },
    footer: {
      tagline: 'A unified, transparent, and auditable runtime foundation for physical agents.',
      physicalAgentOS: 'Recursive Self-Improving Physical Agent Operating System',
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
      label: 'The Harness for Physical Agents',
      titleLine1: 'Recursive Self-Improving Physical Agent',
      titleLine2: 'Operating System',
      subtitle: 'PhyAgentOS - A unified, transparent, and auditable runtime foundation for physical agents',
      description: 'Any robot configuration can be integrated quickly for plug-and-play operation; algorithms and tools can be freely combined to rapidly build agent skills, putting complex tasks one click away; cognitive-physical decoupling unifies intelligent decision-making and physical execution, with support for long-term memory and continuous evolution; one protocol connects games, simulation, and real robots for seamless virtual-to-real migration.',
      getStarted: 'Get Started',
      technicalReport: 'Technical Report',
      watchDemo: 'Watch Demo',
      developerCommunity: 'Developer Community',
      activeEvent: 'Ongoing Activities',
      statTargets: 'Supported Targets',
      statAlgorithms: 'Supported Algorithms',
      statSkills: 'System Skills',
    },
    communityPage: {
      description: 'Connect with PhyAgentOS developers and follow the latest project updates.',
      discordTitle: 'Join us on Discord',
      discordDescription: 'Chat with developers worldwide, ask questions, and take part in community discussions.',
      joinDiscord: 'Join Discord',
      feishu: 'Feishu Developer Group',
      bilibili: 'Bilibili',
      xiaohongshu: 'Xiaohongshu',
      scanToJoin: 'Scan the QR code to follow or join',
    },
    problemSolution: {
      label: 'Why PhyAgentOS?',
      title: 'Turning physical-agent execution into',
      highlight: 'a verifiable system',
      description: 'PhyAgentOS replaces fragmented, best-effort automation with one governed loop for execution, evidence, recovery, and learning.',
      items: [
        {
          pain: 'Fragmented execution stacks',
          detail: 'Agents reach into policies, simulators, Dora nodes, and hardware SDKs through incompatible paths.',
          solution: 'One physical execution plane',
          solutionDetail: 'Every physical Query, Action, and Session crosses the versioned Forge Gateway Tool API; the Agent never bypasses that boundary.',
        },
        {
          pain: 'Execution mistaken for task success',
          detail: 'A terminal action status says what ran—not whether the user-visible goal was achieved.',
          solution: 'Evidence-grounded verification',
          solutionDetail: 'Execution, Evidence, and Verdict remain separate. A task-level Verifier evaluates explicit criteria and constraints against captured evidence.',
        },
        {
          pain: 'Retries lose state and duplicate effects',
          detail: 'After timeouts or restarts, blindly resending a command can repeat an unknown physical action.',
          solution: 'Crash-safe AgentTask recovery',
          solutionDetail: 'SQLite persists bindings, PlanRevisions, and invocation identities. Recovery queries known work first, then lets the Planner append a bounded revision.',
        },
        {
          pain: 'Experience becomes global noise',
          detail: 'Learning from isolated tool calls mixes unrelated failures and can mutate workflows without trustworthy support.',
          solution: 'Verified, scoped self-improvement',
          solutionDetail: 'Terminal AgentTasks form redacted episodes. Independent verified tasks support Skill candidates or scoped Lessons without changing the original outcome.',
        },
      ],    },
    coreConcepts: {
      label: 'Core Philosophy',
      title: 'Six principles for',
      highlight: 'governed self-improvement',
      description: 'PhyAgentOS decouples physical execution, semantic verification, and recursive learning into distinct layers, then coordinates them through an auditable task-level loop.',
      items: [
        {
          title: 'One Execution Boundary',
          subtitle: 'Agent reasons; Forge executes',
          description: 'The Agent selects capabilities and defines success, but every physical Query, Action, and Session enters through the versioned Forge Tool API. Policies, Dora, simulators, and hardware stay behind the Gateway.',
          highlight: 'No direct Agent-to-hardware path',
        },
        {
          title: 'Freeze Before Execute',
          subtitle: 'Immutable task binding',
          description: 'An AgentTask freezes the activated Skill, Runtime identity, manifest and workflow digests, and required ToolSpecs. Task, revision, record, invocation, and attempt identities remain deliberately distinct.',
          highlight: 'Every run is attributable to an exact version',
        },
        {
          title: 'Evidence Before Verdict',
          subtitle: 'Execution is not task success',
          description: 'A Gateway terminal state is an immutable execution fact. Before/after observations form an EvidenceBundle, and the isolated Verification Service evaluates each criterion without rewriting what physically happened.',
          highlight: 'Execution · Evidence · Verdict stay separate',
        },
        {
          title: 'Planner-Led Recovery',
          subtitle: 'Resolve uncertainty before retry',
          description: 'Unknown or timed-out physical effects are queried by persisted invocation identity. A recovery verdict appends a budgeted, deadline-bound PlanRevision to the same AgentTask instead of silently replaying commands.',
          highlight: 'Never retry an unknown physical effect blindly',
        },
        {
          title: 'Installable Skill Runtime',
          subtitle: 'Capability and runtime evolve independently',
          description: 'Manifest-v2 Skill bundles from the Resource Registry or local sources declare workflows, ToolSpecs, artifacts, and named Dora profiles. Installation verifies SHA-256 inventories and activates only an explicitly started, healthy Runtime.',
          highlight: 'Core framework ships independently of heavy Skills',
        },
        {
          title: 'Verified Recursive Evolution',
          subtitle: 'Learn at task granularity',
          description: 'Verified AgentTask episodes produce Skill candidates from successes and scoped Lesson clusters from related failures. Promotion is guarded, versioned, reversible, and fail-open to execution.',
          highlight: 'Experience becomes governed reusable capability',
        },
      ],
    },
    architecture: {
      label: 'Architecture',
      title: 'Agent–Forge',
      highlight: 'Dual-Track Architecture',
      description: 'Track A encompasses reasoning, verification, and experience consolidation; Track B encompasses Skill Runtime and physical execution. The versioned Forge Tool API defines the unified and exclusive execution boundary.',
      trackA: 'Track A',
      trackASub: 'Agent & Evolution',
      trackB: 'Track B',
      trackBSub: 'Forge & Execution',
      protocol: 'Forge Tool API',
      sharedSurface: 'Versioned Contract',
      stateIsFile: 'Query · Action · Session',
      read: 'Read',
      write: 'Write',
      nodes: [
        { label: 'AgentLoop + Planner', sublabel: 'Reasoning', description: 'Understands the user goal, selects an activated Skill and live Forge Tool, defines task-level criteria, and decides whether to continue or recover.' },
        { label: 'Skill Activation', sublabel: 'Immutable Binding', description: 'Loads the matching workflow and scoped Lessons, then freezes the exact Skill version, Runtime, manifest/workflow hashes, and required ToolSpecs into the AgentTask.' },
        { label: 'AgentTask Coordinator', sublabel: 'Task State', description: 'Aggregates one user-visible goal in SQLite with append-only PlanRevisions, Query/Action/Session records, invocation references, evidence, and verification attempts.' },
        { label: 'Verification & Experience', sublabel: 'Verdict → Evolution', description: 'An isolated Verification Service judges criteria from execution facts and evidence. A terminal AgentTask then becomes a redacted episode for guarded Skill promotion and scoped Lessons.' },
        { label: 'Skill Runtime', sublabel: 'Bundle Lifecycle', description: 'Installs and verifies manifest-v2 Skill bundles, manages named Dora profiles, persists health, and exposes only an explicitly started Runtime.' },
        { label: 'ForgeToolClient', sublabel: 'Tool API', description: 'Discovers ToolSpecs and invokes synchronous Query or asynchronous Action/Session through /tools and /invocations without bypassing the Gateway.' },
        { label: 'Forge Gateway', sublabel: 'Execution Authority', description: 'Owns ToolInvocation admission and terminal execution facts, resolves ToolEndpoints, and exposes observation streams; admission never implies task success.' },
        { label: 'ToolEndpoint + Dora', sublabel: 'Physical Effect', description: 'Runs the selected policy, simulator, or robot operation behind the Gateway; endpoint concurrency and target-specific controls remain outside the Agent.' },
      ],
      flowLabel: 'Auditable Task Loop',
      flow: ['Skill Binding', 'AgentTask + PlanRevision', 'Query / Action / Session', 'Execution + Evidence + Verdict', 'TaskEpisode → Skill / Lessons'],
    },
    scenarios: {
      label: 'Scenarios',
      title: 'One Protocol,',
      highlight: 'three task types',
      description: 'Seamlessly supports real robots, simulation, and game environments, covering the full pipeline from development and validation to deployment.',
      items: [
        {
          title: 'Game',
          subtitle: 'Local · Minecraft / Stardew Valley / Don\'t Starve',
          description: 'Minecraft, Stardew Valley, and Don\'t Starve as embodied intelligence testbeds: complex interactions, long-term planning, resource management, and open-world exploration. Validate Agent behavior at zero hardware cost, then transfer to real robots.',
          features: ['Minecraft bot control', 'Stardew Valley farming & social tasks', 'Don\'t Starve survival & crafting', 'Cross-game memory & planning validation'],
        },
        {
          title: 'Simulation',
          subtitle: 'Example · LIBERO / RoboCasa365 / CALVIN',
          description: 'Physics-accurate simulation at scale with LIBERO, CALVIN, and RoboCasa365. Evaluate transfer, long-horizon chains, and household manipulation through reproducible target sessions.',
          features: ['LIBERO benchmark suite', 'CALVIN ABC→D', 'RoboCasa365 target50', 'Reproducible evaluation'],
        },
        {
          title: 'Real Robot',
          subtitle: 'Example · PIPER / Go2 / XLeRobot',
          description: 'Full deployment on physical hardware via Target Adapters. Real-world perception, manipulation, and fleet coordination all through the same Session protocol.',
          features: ['Franka, Go2, XLeRobot, PIPER', 'ReKep / SAM3 grasping', 'Fleet multi-robot coordination', 'Semantic verification'],
        },
      ],
      note: 'Game explores Agent behavior in open-world and life-simulation games at minimal cost. Simulation benchmarks policies at scale. Real Robot closes the loop with physical data. Each new target = register one target_adapter:// entry in TARGETS.md.',
    },
    hardware: {
      label: 'Hardware',
      title: 'Supported',
      highlight: 'Targets',
      description: 'Through Target Adapter, PhyAgentOS covers game, debug, simulation, and real-robot targets, from Minecraft to desktop robotic arms, quadrupeds, and dual-arm systems, All targets are supported in simulation.',
      devices: 'Devices',
      statusReal: 'Real Verified',
      statusMujoco: 'MuJoCo Verified',
      statusIsaac: 'Isaac Verified',
      statusPending: 'Pending',
      imagePending: 'Image coming soon',
      filters: ['All', 'Arm', 'Quadruped', 'Humanoid', 'Wheeled', 'Hand'],
      items: [
        { type: 'Desktop Arm', description: 'Real-robot target with ReKep & SAM3 grasping pipeline. One-click deployment via Target Adapter.' },
        { type: 'Desktop Arm', description: 'Open desktop-arm hardware with real-device, MuJoCo, and Isaac Sim access for compact manipulation benchmarks.' },
        { type: 'Desktop Arm', description: 'Open-source desktop arm target available through MuJoCo for early-stage manipulation evaluation.' },
        { type: 'Desktop Arm', description: 'Collaborative desktop arm target with high-precision joint control, integrated through MuJoCo.' },
        { type: 'Desktop Arm', description: 'Desktop arm target for fine manipulation scenarios, available through MuJoCo integration.' },
        { type: 'Industrial Arm', description: 'Long-reach collaborative arm target for larger workspace tasks, available through MuJoCo.' },
        { type: 'Industrial Arm', description: 'Classic research-grade arm with torque sensing, widely used for manipulation algorithm validation in MuJoCo.' },
        { type: 'Industrial Arm', description: 'Industrial-grade precision arm target available through MuJoCo via Target Adapter.' },
        { type: 'Desktop Arm', description: 'High-precision desktop arm commonly used for teleoperation and MuJoCo-based data collection.' },
        { type: 'Desktop Arm', description: 'Unitree arm target available through MuJoCo for manipulation workflows.' },
        { type: 'Industrial Arm', description: 'Universal Robots collaborative arm target available through MuJoCo.' },
        { type: 'Industrial Arm', description: 'Kinova Gen3 collaborative arm target currently pending Target Adapter integration.' },
        { type: 'Desktop Arm', description: 'Collaborative desktop arm target currently pending Target Adapter integration.' },
        { type: 'Quadruped', description: 'Legged robot target. Mobile manipulation and semantic navigation supported on real robot and MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree quadruped target available through MuJoCo for locomotion and navigation evaluation.' },
        { type: 'Quadruped', description: 'Unitree A1 quadruped target available through MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree A2 quadruped target available through MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree AS2 quadruped target available through MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree B1 quadruped target available through MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree B2 quadruped target available through MuJoCo.' },
        { type: 'Quadruped', description: 'Unitree AlienGo quadruped target available through MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Full-size bipedal humanoid platform supporting whole-body motion on real robot and MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Fourier bipedal humanoid platform for general-purpose embodied tasks on real robot and MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Compact bipedal humanoid target suitable for rapid embodied evaluation in MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Unitree H1 bipedal humanoid target available through MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Unitree H1-2 bipedal humanoid target available through MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Unitree H2 bipedal humanoid target available through MuJoCo.' },
        { type: 'Bipedal Humanoid', description: 'Unitree H2-PLUS bipedal humanoid target available through MuJoCo.' },
        { type: 'Wheeled Robot', description: 'Unitree R1-A5 wheeled robot target available through MuJoCo.' },
        { type: 'Wheeled Robot', description: 'Wheeled robot combining efficient mobility with upper-body manipulation in MuJoCo.' },
        { type: 'Wheeled Robot', description: 'Wheeled robot platform for perception, navigation, and manipulation on real robot and MuJoCo.' },
        { type: 'Wheeled Robot', description: 'Wheeled robot hardware with real-device and MuJoCo access for long-horizon embodied tasks.' },
        { type: 'Mobile Manipulator', description: 'Compact wheeled manipulation platform with real-device and MuJoCo support.' },
        { type: 'Mobile Manipulator', description: 'Bimanual mobile manipulation target through a unified Session protocol on real robot and MuJoCo.' },
        { type: 'Mobile Manipulator', description: 'Aloha-style bimanual mobile manipulation target available through MuJoCo.' },
        { type: 'Dexterous Hand', description: '20-DoF dexterous hand end-effector target for fine-grained grasping on real robot and MuJoCo.' },
      ],
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
    teamPreview: {
      label: 'Team',
      title: 'Built by',
      highlight: 'researchers',
      description: 'PhyAgentOS is jointly developed by the HCP Laboratory at Sun Yat-sen University, Peng Cheng Laboratory, and X-Era Lab.',
      viewFullTeam: 'View full team',
      visitInstitution: 'Visit Website',
      institutions: [
        { name: 'Sun Yat-sen University', role: 'HCP Lab', description: 'Human Cyber Physical Intelligence Integration Lab' },
        { name: 'Peng Cheng Laboratory', role: 'Embodied Intelligence Research Institute', description: 'Peng Cheng National Laboratory' },
        { name: 'X-Era Lab', role: 'X-Era Lab', description: 'X-Era' },
      ],
      highlights: [
        { label: 'Research Lab', value: 'HCP @ SYSU' },
        { label: 'Partner', value: 'Peng Cheng Lab' },
        { label: 'Collaborator', value: 'X-Era Lab' },
        { label: 'License', value: 'MIT Open Source' },
      ],
      collaboratorsLabel: 'Ecosystem',
      collaboratorsTitle: 'Robot & Hardware',
      collaboratorsDescription: 'PhyAgentOS is compatible with robot platforms and hardware from the following partners.',
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
        { name: 'Sun Yat-sen University', role: 'Core Development Team', institution: 'Human-Cyber-Physical Intelligence Integration Laboratory (HCP Lab)' },
        { name: 'Peng Cheng National Laboratory', role: 'Embodied Intelligence Research Institute', institution: 'Peng Cheng National Laboratory' },
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
      conceptFilm: '概念短片',
      features: '核心特性',
      architecture: '系统架构',
      scenarios: '应用场景',
      benchmark: '性能基准',
      gettingStartedDocs: '入门文档',
      hardware: '硬件设备',
      team: '团队',
      activities: '活动',
      themes: '主题',
      github: 'GitHub',
      getStarted: '快速开始',
    },
    footer: {
      tagline: '统一、透明、可审计的的物理智能体运行底座。',
      physicalAgentOS: '递归自进化物理智能体操作系统',
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
      label: 'The Harness for Physical Agents',
      titleLine1: '递归自进化物理智能体',
      titleLine2: '操作系统',
      subtitle: 'PhyAgentOS-统一、透明、可审计的的物理智能体运行底座',
      description: '任意机器人构型快速接入，实现即插即用；多种算法与工具自由组合，快速构建智能体技能，复杂任务一触即达；通过认知-物理解耦统一智能决策与物理执行，并支持长期记忆与持续进化；一套协议贯通游戏、仿真与真机，实现虚实环境无缝迁移。',
      getStarted: '快速开始',
      technicalReport: '技术报告',
      watchDemo: '观看演示',
      developerCommunity: '开发者社区',
      activeEvent: '正在进行的活动',
      statTargets: '支持的构型',
      statAlgorithms: '支持的算法',
      statSkills: '系统技能',
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
      title: '把具身任务变成',
      highlight: '可验证的系统闭环',
      description: 'PhyAgentOS 用一条受治理的链路统一执行、证据、恢复与学习，取代割裂且难以复核的自动化流程。',
      items: [
        {
          pain: '物理执行链路割裂',
          detail: 'Agent 分别直连策略、仿真器、Dora 节点与硬件 SDK，接口和状态难以统一。',
          solution: '唯一物理执行面',
          solutionDetail: '所有物理 Query、Action 与 Session 都经由版本化 Forge Gateway Tool API；Agent 不绕过这一边界。',
        },
        {
          pain: '把执行完成当作任务成功',
          detail: '动作终态只能说明执行了什么，不能证明用户可见目标已经达成。',
          solution: '基于证据的语义验证',
          solutionDetail: 'Execution、Evidence、Verdict 三类事实严格分离；任务级 Verifier 依据明确 criteria、constraints 与采集证据逐项判定。',
        },
        {
          pain: '超时与重启导致重复动作',
          detail: '远端状态未知时盲目重发，可能让同一物理动作执行两次。',
          solution: '崩溃安全的 AgentTask 恢复',
          solutionDetail: 'SQLite 持久化绑定、PlanRevision 与 invocation 身份；恢复先核实已知执行，再由 Planner 追加有预算的新修订。',
        },
        {
          pain: '经验沉淀失去边界',
          detail: '从孤立工具调用学习会混入无关失败，也可能在证据不足时改写工作流。',
          solution: '经验证、按作用域自进化',
          solutionDetail: '终结的 AgentTask 形成去敏 episode；经独立任务验证后沉淀 Skill candidate 或 scoped Lesson，且不改变原任务结果。',
        },
      ],
    },
    coreConcepts: {
      label: '核心理念',
      title: '六项原则支撑',
      highlight: '可治理的递归自进化',
      description: 'PhyAgentOS 对物理执行、语义验证与递归学习进行分层解耦，并以可审计的任务级闭环实现协同运行。',
      items: [
        {
          title: '唯一执行边界',
          subtitle: 'Agent 负责认知，Forge 负责执行',
          description: 'Agent 选择能力并定义成功标准，但所有物理 Query、Action 与 Session 都进入版本化 Forge Tool API；策略、Dora、仿真器和硬件均位于 Gateway 之后。',
          highlight: '不存在 Agent 直达硬件的旁路',
        },
        {
          title: '执行前冻结',
          subtitle: '不可变任务绑定',
          description: 'AgentTask 冻结已激活 Skill、Runtime 身份、manifest/workflow 摘要及所需 ToolSpec；task、revision、record、invocation 与 attempt 身份始终明确区分。',
          highlight: '每次运行都能归因到精确版本',
        },
        {
          title: '先证据，后判定',
          subtitle: '执行完成不等于任务成功',
          description: 'Gateway 终态是不可改写的执行事实；动作前后观测组成 EvidenceBundle，隔离的 Verification Service 逐项判断 criteria，但不会改写物理世界中已发生的事实。',
          highlight: 'Execution · Evidence · Verdict 严格分离',
        },
        {
          title: 'Planner 主导恢复',
          subtitle: '重试前先消除不确定性',
          description: '物理效果未知或超时时，系统按已持久化 invocation 身份查询状态；恢复 verdict 在同一 AgentTask 上追加受预算与 deadline 约束的 PlanRevision，而不是静默重放命令。',
          highlight: '绝不盲目重试效果未知的物理动作',
        },
        {
          title: '可安装 Skill Runtime',
          subtitle: '能力与运行环境独立演进',
          description: '来自 Resource Registry 或本地来源的 Manifest v2 Skill Bundle 声明工作流、ToolSpec、制品和命名 Dora profile；安装过程校验 SHA-256 清单，只有显式启动且健康的 Runtime 才会被激活。',
          highlight: '核心框架与重型 Skill 独立分发',
        },
        {
          title: '经验证的递归自进化',
          subtitle: '在任务粒度学习',
          description: '经过验证的 AgentTask episode 将成功沉淀为 Skill candidate，将相关失败聚类为 scoped Lesson；晋升过程受门控、可版本化、可回滚，且 evolution 故障不改变执行结果。',
          highlight: '把经验转化为受治理的可复用能力',
        },
      ],
    },
    architecture: {
      label: '系统架构',
      title: 'Agent–Forge',
      highlight: '双轨架构',
      description: 'Track A 承载推理、验证与经验沉淀，Track B 承载 Skill Runtime 与物理执行；版本化 Forge Tool API 构成统一且唯一的执行边界。',
      trackA: 'Track A',
      trackASub: 'Agent 与进化层',
      trackB: 'Track B',
      trackBSub: 'Forge 与执行层',
      protocol: 'Forge Tool API',
      sharedSurface: '版本化契约',
      stateIsFile: 'Query · Action · Session',
      read: '读',
      write: '写',
      nodes: [
        { label: 'AgentLoop + Planner', sublabel: '推理', description: '理解用户目标，选择已激活 Skill 与在线 Forge Tool，定义任务级 criteria，并决定继续执行或进入恢复。' },
        { label: 'Skill Activation', sublabel: '不可变绑定', description: '加载匹配工作流与 scoped Lesson，并将精确 Skill 版本、Runtime、manifest/workflow hash 及所需 ToolSpec 冻结到 AgentTask。' },
        { label: 'AgentTask Coordinator', sublabel: '任务状态', description: '在 SQLite 中聚合一个用户可见目标，保存只追加的 PlanRevision、Query/Action/Session record、invocation 引用、证据与验证尝试。' },
        { label: 'Verification & Experience', sublabel: '判定 → 进化', description: '隔离的 Verification Service 根据执行事实与证据判定 criteria；终结的 AgentTask 随后成为去敏 episode，用于受控 Skill 晋升与 scoped Lesson。' },
        { label: 'Skill Runtime', sublabel: 'Bundle 生命周期', description: '安装并校验 Manifest v2 Skill Bundle，管理命名 Dora profile、持久化健康状态，并只暴露显式启动的 Runtime。' },
        { label: 'ForgeToolClient', sublabel: 'Tool API', description: '发现 ToolSpec，并通过 /tools 与 /invocations 调用同步 Query 或异步 Action/Session，始终不绕过 Gateway。' },
        { label: 'Forge Gateway', sublabel: '执行事实源', description: '负责 ToolInvocation 接纳与终态执行事实，解析 ToolEndpoint 并提供观测流；接纳成功不代表任务语义成功。' },
        { label: 'ToolEndpoint + Dora', sublabel: '物理效果', description: '在 Gateway 后运行选定策略、仿真器或机器人操作；Endpoint 并发与目标特定控制始终位于 Agent 之外。' },
      ],
      flowLabel: '可审计任务闭环',
      flow: ['Skill Binding', 'AgentTask + PlanRevision', 'Query / Action / Session', 'Execution + Evidence + Verdict', 'TaskEpisode → Skill / Lesson'],
    },
    scenarios: {
      label: '应用场景',
      title: '一套协议，',
      highlight: '三类任务',
      description: '无缝支持真机、仿真与游戏环境，贯通开发、验证与部署全流程。',
      items: [
        {
          title: '游戏',
          subtitle: '本地 · Minecraft / 星露谷 / 饥荒',
          description: '以 Minecraft、星露谷与饥荒为具身智能试验场：复杂交互、长期规划、资源管理与开放世界探索。零硬件成本验证 Agent 行为，再迁移至真机。',
          features: ['Minecraft bot 控制', '星露谷耕作与社交任务', '饥荒生存与制作', '跨游戏记忆与规划验证'],
        },
        {
          title: '仿真',
          subtitle: '示例 · LIBERO / RoboCasa365 / CALVIN',
          description: '基于 LIBERO、CALVIN 与 RoboCasa365 的大规模物理精确仿真，通过可复现的目标会话评估迁移、长程任务链与家庭操作能力。',
          features: ['LIBERO 基准套件', 'CALVIN ABC→D', 'RoboCasa365 target50', '可复现评估'],
        },
        {
          title: '真机',
          subtitle: '示例 · PIPER / Go2 / XLeRobot',
          description: '通过 Target Adapter 在物理硬件上完整部署。真实世界感知、操作与编队协同全部通过同一 Session 协议。',
          features: ['Franka、Go2、XLeRobot、PIPER', 'ReKep / SAM3 抓取', '编队多机协同', '语义验证'],
        },
      ],
      note: '游戏以极低硬件成本在开放世界与生存模拟游戏中探索 Agent 行为；仿真大规模评测策略；真机以物理数据闭环。每个新目标 = 在 TARGETS.md 中注册一个 target_adapter:// 条目。',
    },
    hardware: {
      label: '硬件设备',
      title: '支持的',
      highlight: '构型',
      description: '通过 Target Adapter，PhyAgentOS 覆盖游戏、调试、仿真与真机目标，从 Minecraft 到桌面机械臂再到四足机器人与双臂系统，所有构型均可仿真。',
      devices: '个设备',
      statusReal: '真机验证',
      statusMujoco: 'MuJoCo验证',
      statusIsaac: 'Isaac验证',
      statusPending: '等待接入',
      imagePending: '图片待补充',
      filters: ['全部', '机械臂', '四足', '人形', '轮式', '灵巧手'],
      items: [
        {'type': '桌面机械臂', 'description': '6自由度桌面机械臂，支持ReKep与SAM3抓取流水线。'},
        {'type': '桌面机械臂', 'description': '开源桌面机械臂，适合紧凑型操作评测。'},
        {'type': '桌面机械臂', 'description': '开源桌面机械臂早期型号。'},
        {'type': '桌面机械臂', 'description': '具备高精度关节控制的6自由度桌面协作机械臂。'},
        {'type': '桌面机械臂', 'description': '面向精细操作场景的开源桌面机械臂。'},
        {'type': '工业机械臂', 'description': '适合大范围操作任务的长臂展6自由度工业协作机械臂。'},
        {'type': '工业机械臂', 'description': '具备力矩感知能力的7自由度科研级机械臂。'},
        {'type': '工业机械臂', 'description': '具备力矩感知能力的7自由度工业级精密机械臂。'},
        {'type': '桌面机械臂', 'description': '用于遥操作与数据采集的高精度6自由度桌面机械臂。'},
        {'type': '桌面机械臂', 'description': '宇树科技推出的机械臂。'},
        {'type': '工业机械臂', 'description': 'Universal Robots 6自由度协作机械臂。'},
        {'type': '工业机械臂', 'description': 'Kinova 7自由度协作机械臂。'},
        {'type': '桌面机械臂', 'description': '4自由度桌面协作机械臂。'},
        {'type': '四足机器人', 'description': '配备激光雷达与12个电机的足式机器人，支持移动操作与语义导航。'},
        {'type': '四足机器人', 'description': '宇树四足机器人，用于运动与导航评测。'},
        {'type': '四足机器人', 'description': '宇树 A1 四足机器人平台。'},
        {'type': '四足机器人', 'description': '宇树 A2 四足机器人平台。'},
        {'type': '四足机器人', 'description': '宇树 AS2 四足机器人平台。'},
        {'type': '四足机器人', 'description': '宇树 B1 四足机器人平台。'},
        {'type': '四足机器人', 'description': '宇树 B2 四足机器人平台。'},
        {'type': '四足机器人', 'description': '宇树 AlienGo 四足机器人平台。'},
        {'type': '双足人形', 'description': '全尺寸双足人形机器人，支持全身运动与操作。'},
        {'type': '双足人形', 'description': '傅利叶双足人形机器人，面向通用具身任务。'},
        {'type': '双足人形', 'description': '适合快速评测的紧凑型双足人形机器人。'},
        {'type': '双足人形', 'description': '宇树 H1 双足人形机器人平台。'},
        {'type': '双足人形', 'description': '宇树 H1-2 双足人形机器人平台。'},
        {'type': '双足人形', 'description': '宇树 H2 双足人形机器人平台。'},
        {'type': '双足人形', 'description': '宇树 H2-PLUS 双足人形机器人平台。'},
        {'type': '轮式机器人', 'description': '宇树 R1-A5 轮式机器人平台。'},
        {'type': '轮式机器人', 'description': '兼顾移动效率与上肢操作的轮式机器人。'},
        {'type': '轮式机器人', 'description': '面向感知、导航与操作流程的轮式机器人平台。'},
        {'type': '轮式机器人', 'description': '适合长程具身任务的轮式机器人。'},
        {'type': '移动操作机器人', 'description': '用于移动操作任务的紧凑型轮式操作平台。'},
        {'type': '移动操作机器人', 'description': '具备双臂的移动操作机器人。'},
        {'type': '移动操作机器人', 'description': 'Aloha 风格的双臂移动操作机器人。'},
        {'type': '灵巧手', 'description': '20自由度灵巧手末端执行器，用于精细抓取评测。'},
      ],
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
      collaboratorsLabel: '生态',
      collaboratorsTitle: '合作伙伴',
      collaboratorsDescription: 'PhyAgentOS 兼容以下伙伴厂商的机器人平台与硬件设备。',
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
        { quote: '会话中心化 Runtime 让 sim-to-real 迁移毫不费力。同一 Session 协议在 LIBERO 与我们的 Franka 机械臂上行为完全一致。', author: '研究团队', role: '中山大学 HCP 实验室 / X-Era Lab' },
        { quote: 'Target Adapter 将我们的集成成本从数千行代码压缩到单个约 100 行的文件。AdapterPlan 自动组合的设计确实优雅。', author: '贡献者', role: '开源社区' },
        { quote: '三层安全，即 Critic、Preflight、SafetyGuard，终于让我们有信心在真实硬件上部署学习到的策略。', author: '开发者', role: '机器人工程师' },
      ],
    },
    docsCTA: {
      label: '文档',
      title: '入门所需的',
      highlight: '一切资料',
      description: '涵盖 Runtime 架构、用户操作与硬件集成的全面文档。',
      viewDocumentation: '查看文档',
      starOnGithub: '在 GitHub 上 Star',
      joinDiscussion: '参与讨论',
      items: [
        { title: '系统架构', subtitle: '技术文档', description: '深入了解会话中心化 Runtime：WatchdogSupervisor、SessionRunner、双重 SkillRuntime、Target Adapter 与 Bridge，以及 Markdown + YAML 文件协议矩阵。' },
        { title: '用户手册', subtitle: '安装与操作', description: '使用 `paos` 安装、初始化工作区、运行 `paos agent`、连接 Runtime 服务，并为真机部署配置语义验证。' },
        { title: '开发者指南', subtitle: '二次开发', description: '编写 Target Adapter、在 SKILLRUNTIME.md 中注册技能 Runtime、通过 OpenPI 集成新策略，并遵循贡献工作流。' },
      ],
    },
    langToggle: {
      switchTo: 'Switch Language',
      en: 'EN',
      zh: '中',
    },
  },
};
