import { Trophy } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import SectionHeader from '../../components/layout/SectionHeader';
import { useLang } from '../../i18n/LanguageContext';

const images = {
  poster: '/media/challenge/beta-robotics-poster.jpg',
  architecture: '/media/challenge/phyagentos-architecture.jpg',
  gathering: '/media/challenge/beta-hackathon-gathering.jpg',
  champion: '/media/challenge/beta-champion-team.jpg',
};

export default function ChallengeRecap() {
  const { lang } = useLang();
  const copy = lang === 'zh'
    ? {
        label: '赛事回顾',
        title: 'PhyAgentOS 赋能',
        highlight: 'Physical AI 技术挑战赛冠军',
        description: '从 BETA Hackathon 2026 的 Robotics 赛道、统一开发平台到夺冠现场，回顾 PhyAgentOS 如何降低 Physical AI 的开发门槛。',
        articleTitle: 'PhyAgentOS 的“冠军级 Physical AI 底座”与开发者普惠之路',
        lead: '2026 年 4 月 27 日，美国旧金山。中山大学 HCP 实验室以 PhyAgentOS 物理智能体操作系统开源框架登上 BETA Hackathon 2026 的全球舞台。年仅 11 岁的开发者 Arjun 基于这一技术底座夺得全赛道总冠军，验证了从任务规划到真实执行闭环的可及性。',
        sections: [
          {
            title: '打造核心技术底座，定义 Robotics 赛道标准',
            body: '中山大学 HCP 实验室联合鹏城实验室，将 PhyAgentOS 确立为 Robotics 赛道的统一开发平台。参赛团队在同一技术基准上构建自进化具身智能体，并展示从自然语言指令到物理世界执行的完整闭环。',
            image: images.poster,
            alt: 'BETA Hackathon 2026 Robotics 赛道宣传海报',
            caption: 'BETA Hackathon 2026 Robotics 赛道',
          },
          {
            title: '降低门槛的技术创新',
            body: 'PhyAgentOS 以 State-as-a-File 为核心设计，将机器人状态、环境感知与动作规划以 Markdown 文件进行结构化记录。自然语言、代码 API 与状态-规划-执行循环三层接口，让开发者以更低成本驱动真实或仿真的机器人完成复杂物理交互。',
            image: images.architecture,
            alt: 'PhyAgentOS 框架图',
            caption: 'PhyAgentOS 框架图',
          },
          {
            title: '冠军诞生，全球开发者共同验证',
            body: 'Arjun 基于 PhyAgentOS 快速部署机器人系统，并在全部参赛队伍中夺得总冠军。赛事现场与获奖结果说明：统一、可复用的 Physical AI 基础设施，能够让不同背景的开发者更快把创意转化为可执行的具身智能应用。',
            image: images.gathering,
            alt: 'BETA Hackathon 2026 现场合影',
            caption: '全球开发者汇聚 BETA Hackathon 2026',
            secondaryImage: images.champion,
            secondaryAlt: 'BETA Hackathon 2026 获奖团队',
            secondaryCaption: '获奖团队 Carmelo 领奖现场',
          },
        ],
      }
    : {
        label: 'Challenge recap',
        title: 'PhyAgentOS powers a',
        highlight: 'Physical AI challenge champion',
        description: 'A focused recap of the BETA Hackathon 2026 Robotics track, its shared development platform, and the championship outcome enabled by PhyAgentOS.',
        articleTitle: 'A championship-grade Physical AI foundation for more developers',
        lead: 'On April 27, 2026 in San Francisco, the HCP Lab at Sun Yat-sen University brought the open-source PhyAgentOS runtime to BETA Hackathon 2026. Eleven-year-old developer Arjun built on the framework and won the overall championship, demonstrating a more accessible path from task planning to real-world execution.',
        sections: [
          {
            title: 'A shared foundation for the Robotics track',
            body: 'The HCP Lab at Sun Yat-sen University and Peng Cheng Laboratory established PhyAgentOS as the unified development platform for the Robotics track. Teams built self-evolving embodied agents on the same technical foundation and demonstrated the full path from natural-language instruction to physical-world execution.',
            image: images.poster,
            alt: 'BETA Hackathon 2026 Robotics track poster',
            caption: 'BETA Hackathon 2026 Robotics track',
          },
          {
            title: 'Lowering the barrier to Physical AI',
            body: 'Built around State-as-a-File, PhyAgentOS records robot state, environmental perception, and action planning as structured Markdown files. Its natural-language, code API, and state-plan-execute interfaces let developers drive real or simulated robots with less integration overhead.',
            image: images.architecture,
            alt: 'PhyAgentOS architecture diagram',
            caption: 'PhyAgentOS architecture',
          },
          {
            title: 'A championship proven by global builders',
            body: 'Arjun rapidly deployed a robot system with PhyAgentOS and won the overall championship. The event and its winners show how a unified, reusable Physical AI foundation can help developers from different backgrounds turn ideas into executable embodied applications sooner.',
            image: images.gathering,
            alt: 'BETA Hackathon 2026 attendees',
            caption: 'Builders gathered at BETA Hackathon 2026',
            secondaryImage: images.champion,
            secondaryAlt: 'BETA Hackathon 2026 winning team',
            secondaryCaption: 'Team Carmelo at the award ceremony',
          },
        ],
      };

  return (
    <section id="challenge-recap" className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 bg-brand-bg-secondary/30" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              label={copy.label}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <article className="mt-12 h-[68vh] overflow-y-auto overscroll-contain rounded-3xl border border-brand-border bg-brand-bg-secondary shadow-card sm:h-[72vh]">
              <header className="sticky top-0 z-10 border-b border-brand-border bg-brand-bg-secondary/95 px-6 py-5 backdrop-blur sm:px-8">
                <div className="flex items-center gap-3 text-brand-accent-dark">
                  <Trophy className="h-5 w-5" />
                  <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em]">{copy.label}</p>
                </div>
                <h3 className="mt-3 max-w-4xl font-display text-2xl font-bold leading-tight text-brand-text sm:text-3xl">
                  {copy.articleTitle}
                </h3>
              </header>

              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <p className="max-w-4xl border-l-2 border-brand-accent pl-5 text-base leading-8 text-brand-text-secondary sm:text-lg">
                  {copy.lead}
                </p>

                <div className="mt-10 space-y-12">
                  {copy.sections.map((section, index) => (
                    <section key={section.title} className="border-t border-brand-border pt-8 first:border-t-0 first:pt-0">
                      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:items-start">
                        <div>
                          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-brand-accent-dark">0{index + 1}</p>
                          <h4 className="mt-3 font-display text-2xl font-bold leading-tight text-brand-text">
                            {section.title}
                          </h4>
                          <p className="mt-4 text-sm leading-7 text-brand-text-secondary sm:text-base">
                            {section.body}
                          </p>
                        </div>
                        <figure className="overflow-hidden rounded-xl border border-brand-border bg-black/5">
                          <img src={section.image} alt={section.alt} className="max-h-[420px] w-full object-contain" loading="lazy" />
                          <figcaption className="border-t border-brand-border px-4 py-3 text-xs text-brand-text-tertiary">
                            {section.caption}
                          </figcaption>
                        </figure>
                      </div>

                      {section.secondaryImage && (
                        <figure className="mt-6 ml-auto max-w-lg overflow-hidden rounded-xl border border-brand-border bg-black/5">
                          <img src={section.secondaryImage} alt={section.secondaryAlt} className="w-full object-cover" loading="lazy" />
                          <figcaption className="border-t border-brand-border px-4 py-3 text-xs text-brand-text-tertiary">
                            {section.secondaryCaption}
                          </figcaption>
                        </figure>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
