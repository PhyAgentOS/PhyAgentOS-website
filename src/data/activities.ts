import challengePoster from '../../pics/20260907-155708.jpg';
import pazhouCompetitionPoster from '../../pics/pazhou-algorithm-competition-2026.png';
import supermarketPoster from '../../pics/20260907-155721.jpg';
import livestreamPoster from '../../pics/20260907-155726.jpg';
import type { Lang } from '../i18n/translations';

type LocalizedText = Record<Lang, string>;

export interface Activity {
  id: string;
  poster: string;
  title: LocalizedText;
  description: LocalizedText;
  href?: string;
  linkLabel?: LocalizedText;
}

// Display order follows the supplied posters. Add an href when an event page is ready;
// entries without one remain visible with a "Coming soon" status.
export const activities: Activity[] = [
  {
    id: 'pazhou-algorithm-competition-2026',
    poster: pazhouCompetitionPoster,
    title: {
      zh: '琶洲算法大赛 × 具身智能世界模型挑战赛',
      en: 'Pazhou Algorithm Competition × Embodied Intelligence World Model Challenge',
    },
    description: {
      zh: '双赛道：未来演化预测 · PAOS Skill',
      en: 'Two tracks: future video generation · PAOS Skill',
    },
    href: 'https://www.aicompetition-pz.com/topic_detail/58',
  },
  {
    id: 'actphyscause-lovif-2026',
    poster: challengePoster,
    title: { zh: 'ActPhysCause Challenge', en: 'ActPhysCause Challenge' },
    description: { zh: 'LoViF 2026 @ ECCV · 具身因果世界模型评测', en: 'LoViF 2026 @ ECCV · Causal embodied world models' },
    href: 'https://actphyscause-challenge.x-era.com/',
  },
  {
    id: 'supermarket-live',
    poster: supermarketPoster,
    title: { zh: '超市直播活动', en: 'Supermarket Live' },
    description: { zh: '走进真实场景，看见物理智能的未来', en: 'Explore the future of physical AI in the real world' },
    href: 'https://weixin.qq.com/sph/AiNBWAv9sa',
    linkLabel: { zh: '前往视频号', en: 'Visit WeChat Channels' },
  },
  {
    id: 'phyagentos-live',
    poster: livestreamPoster,
    title: { zh: 'PhyAgentOS 系列直播', en: 'PhyAgentOS Live Series' },
    description: { zh: '技术分享 · 嘉宾对谈 · 社区互动', en: 'Tech talks · Guest conversations · Community' },
    href: 'https://space.bilibili.com/3546880296355920?spm_id_from=333.1007.0.0',
    linkLabel: { zh: '前往 B 站主页', en: 'Visit Bilibili' },
  },
];
