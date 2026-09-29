import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, TerminalSquare } from 'lucide-react';

type Command = {
  comment: string;
  line: string;
  expected: string;
  caution?: string;
};

type GuideContent = {
  eyebrow: string;
  title: string;
  intro: string;
  setupTitle: string;
  setupIntro: string;
  setupNote: string;
  officialGuide: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  expectedLabel: string;
  cautionLabel: string;
  steps: { title: string; description: string; commands: Command[] }[];
};

const guide: Record<'zh' | 'en', GuideContent> = {
  zh: {
    eyebrow: 'PIPER · MOVE-ARM-BY-EE',
    title: 'Piper机械臂快速启动',
    intro: '按顺序完成环境配置、Skill 安装、CAN 接口激活和真机启动。每条命令下方列出了应检查的状态与注意事项。',
    setupTitle: '0. 安装并配置 PAOS',
    setupIntro: '先完整按照 PhyAgentOS-core 官方 5-minute quick start 的操作。',
    setupNote: '完成标准：PAOS 环境安装完成，能够通过 paos agent 进行对话。',
    officialGuide: '打开官方 5-minute quick start',
    copyLabel: '复制命令',
    copiedLabel: '已复制',
    copyFailedLabel: '复制失败，请手动选择命令',
    expectedLabel: '检查结果',
    cautionLabel: '注意',
    steps: [
      {
        title: '1. 安装 Skill',
        description: '在安装 PAOS 的环境（例如同一个 conda 环境）中执行。',
        commands: [
          { comment: '安装 move-arm-by-ee Skill', line: 'paos skill install move-arm-by-ee', expected: '安装完成后，可用下一条命令查询 Skill 的版本和 profile。' },
          { comment: '查看版本与可用 profile', line: 'paos skill inspect move-arm-by-ee', expected: '应显示版本及全部 profile，其中包括 piper_real。' },
          { comment: '确认安装后的初始状态', line: 'paos skill status move-arm-by-ee', expected: 'State 显示 not started 属正常；此时还没有连接真机。' },
        ],
      },
      {
        title: '2. 连接硬件并激活 CAN',
        description: '先给机械臂上电，接好电脑与机械臂之间的 USB-CAN 通信链路。下面以接口 can0 为例。',
        commands: [
          { comment: '列出 CAN 接口，先确认实际设备名', line: 'ip -details link show type can', expected: '应能找到 CAN 接口及其名称，例如 can0；激活前 state DOWN 属正常。', caution: '若没有接口，请先检查 USB-CAN 转接器和连接。' },
          { comment: '设置波特率；此命令只配置，不激活接口', line: 'sudo ip link set can0 type can bitrate 1000000', expected: '配置完成后继续执行激活命令，并用最后的状态查询确认结果。', caution: '如果设备名不是 can0，请替换下列命令中的 can0。' },
          { comment: '激活 CAN 接口', line: 'sudo ip link set can0 up', expected: '接口应从 DOWN 变为 UP；下一条命令会显示实际状态。' },
          { comment: '检查 CAN 接口状态', line: 'ip -details link show can0', expected: '应看到 state UP。若仍为 DOWN，请先处理接口问题再启动 Skill。' },
        ],
      },
      {
        title: '3. 启动 Piper 真机 Profile',
        description: 'piper_real 指定 Piper 真机 runtime profile；其他 profile 可在第 1 步的 inspect 结果中查看。',
        commands: [
          { comment: '启动并连接真机', line: 'paos skill start move-arm-by-ee -p piper_real', expected: '驱动连接后，机械臂会自动移动到初始位姿；随后用下一步的 status 检查 Tool 就绪状态。', caution: '启动前清理机械臂周围的障碍物，确认急停可用；Dora CLI 需已按官方说明安装并位于 PATH 中。' },
        ],
      },
      {
        title: '4. 验证工具就绪',
        description: '不要仅凭启动命令返回判断真机可以操作，先检查 Runtime 与 Tool 状态。',
        commands: [
          { comment: '查询 Skill 与 Gateway 状态', line: 'paos skill status move-arm-by-ee', expected: '应看到 State: running、Gateway GET /tools: ready，且 motion.resolve_relative_pose、motion.move_pose、gripper.set_opening 三个 Tool 均为 ready。' },
        ],
      },
      {
        title: '5. 启动 Agent 对话',
        description: 'Skill 处于运行状态时，Agent 才会注入机械臂工具。下面两种方式任选其一。',
        commands: [
          { comment: '进入交互模式，可输入“把机械臂抬升 3 厘米”等指令', line: 'paos agent', expected: '进入 Agent 对话；可以继续输入“机械臂前伸 3 厘米”或“把夹爪打开 5 厘米”等请求。' },
          { comment: '或者只发送一条消息', line: 'paos agent -m "把机械臂抬升 3 厘米"', expected: '发送一条抬升机械臂的请求；这是交互模式的替代方式，无须两条命令都运行。' },
        ],
      },
      {
        title: '6. 结束并关闭 Skill',
        description: '完成真机操作后停止 Skill。',
        commands: [
          { comment: '停止 move-arm-by-ee Skill', line: 'paos skill stop move-arm-by-ee', expected: '断开前机械臂会回到初始位姿。', caution: '停止过程中也要保持机械臂周围无障碍。' },
        ],
      },
    ],
  },
  en: {
    eyebrow: 'PIPER · MOVE-ARM-BY-EE',
    title: 'Piper Robot Arm Quick Start',
    intro: 'Set up PAOS, install the Skill, activate CAN, and start the real robot in order. Each command includes the state to check and any important precautions.',
    setupTitle: '0. Install and configure PAOS',
    setupIntro: 'Complete the official PhyAgentOS-core 5-minute quick start first.',
    setupNote: 'Ready to continue when PAOS is installed and you can chat through paos agent.',
    officialGuide: 'Open the official 5-minute quick start',
    copyLabel: 'Copy command',
    copiedLabel: 'Copied',
    copyFailedLabel: 'Copy failed; select the command manually',
    expectedLabel: 'Check the result',
    cautionLabel: 'Note',
    steps: [
      {
        title: '1. Install the Skill',
        description: 'Run these commands in the same environment used to install PAOS, such as the same conda environment.',
        commands: [
          { comment: 'Install the move-arm-by-ee Skill', line: 'paos skill install move-arm-by-ee', expected: 'After installation, inspect the Skill version and profiles with the next command.' },
          { comment: 'Inspect the version and available profiles', line: 'paos skill inspect move-arm-by-ee', expected: 'The output should list the version and all profiles, including piper_real.' },
          { comment: 'Check the initial installed state', line: 'paos skill status move-arm-by-ee', expected: 'State: not started is normal before connecting the real robot.' },
        ],
      },
      {
        title: '2. Connect hardware and activate CAN',
        description: 'Power on the arm and connect the USB-CAN adapter. The commands below use can0 as an example.',
        commands: [
          { comment: 'List CAN interfaces and identify the actual device name', line: 'ip -details link show type can', expected: 'Look for a CAN interface such as can0. A DOWN state before activation is normal.', caution: 'If no interface appears, check the USB-CAN adapter and cable.' },
          { comment: 'Set the bitrate; this does not activate the interface', line: 'sudo ip link set can0 type can bitrate 1000000', expected: 'Continue with activation, then use the final status command to verify the result.', caution: 'Replace can0 in the commands below if your interface has a different name.' },
          { comment: 'Activate the CAN interface', line: 'sudo ip link set can0 up', expected: 'The interface should change from DOWN to UP. Check its actual state next.' },
          { comment: 'Check the CAN interface state', line: 'ip -details link show can0', expected: 'Look for state UP. Resolve interface problems before starting the Skill.' },
        ],
      },
      {
        title: '3. Start the real Piper profile',
        description: 'piper_real selects the Piper hardware runtime profile. Use the earlier inspect output to see other profiles.',
        commands: [
          { comment: 'Start the Skill and connect the robot', line: 'paos skill start move-arm-by-ee -p piper_real', expected: 'After the driver connects, the arm moves to its initial pose. Then check Tool readiness in the next step.', caution: 'Clear the arm workspace and confirm emergency stop is available. The Dora CLI must be installed and on PATH.' },
        ],
      },
      {
        title: '4. Verify tool readiness',
        description: 'Check Runtime and Tool status before controlling the robot.',
        commands: [
          { comment: 'Inspect Skill and Gateway status', line: 'paos skill status move-arm-by-ee', expected: 'Look for State: running, Gateway GET /tools: ready, and ready status for motion.resolve_relative_pose, motion.move_pose, and gripper.set_opening.' },
        ],
      },
      {
        title: '5. Chat with the Agent',
        description: 'The Skill must be running for the Agent to load arm tools. Choose either of these modes.',
        commands: [
          { comment: 'Start interactive mode and enter an arm instruction', line: 'paos agent', expected: 'The Agent opens a conversation. You can ask it to raise the arm by 3 cm, move it forward by 3 cm, or open the gripper by 5 cm.' },
          { comment: 'Or send just one message', line: 'paos agent -m "Raise the arm by 3 cm"', expected: 'Sends one arm-raising request. This is an alternative to interactive mode; you do not need to run both commands.' },
        ],
      },
      {
        title: '6. Stop the Skill',
        description: 'Stop the Skill when you have finished controlling the robot.',
        commands: [
          { comment: 'Stop move-arm-by-ee', line: 'paos skill stop move-arm-by-ee', expected: 'The arm returns to its initial pose before disconnecting.', caution: 'Keep the arm workspace clear while it stops.' },
        ],
      },
    ],
  },
};

export default function PiperQuickStart({ lang }: { lang: 'zh' | 'en' }) {
  const content = guide[lang];
  const [copyStatus, setCopyStatus] = useState<{ key: string; result: 'copied' | 'failed' } | null>(null);

  useEffect(() => {
    if (!copyStatus) return;
    const timeout = window.setTimeout(() => setCopyStatus(null), 2000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const copyCommand = async (key: string, command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus({ key, result: 'copied' });
    } catch {
      setCopyStatus({ key, result: 'failed' });
    }
  };

  return (
    <div id="piper-quick-start" className="rounded-3xl border border-brand-accent/25 bg-brand-bg-secondary p-5 shadow-soft sm:p-8">
      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-brand-accent">
        <TerminalSquare className="h-4 w-4" />
        {content.eyebrow}
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold text-brand-text sm:text-3xl">{content.title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-text-tertiary">{content.intro}</p>

      <div className="mt-7 space-y-5">
        <article className="rounded-2xl border border-brand-border bg-brand-bg p-5 sm:p-7">
          <h4 className="font-display text-lg font-bold text-brand-text">{content.setupTitle}</h4>
          <p className="mt-2 text-sm leading-7 text-brand-text-secondary">{content.setupIntro}</p>
          <a
            href="https://github.com/PhyAgentOS/PhyAgentOS-core#5-minute-quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent hover:underline"
          >
            {content.officialGuide}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="mt-3 text-sm leading-6 text-brand-text-secondary">{content.setupNote}</p>
        </article>

        {content.steps.map((step, stepIndex) => (
          <article key={step.title} className="rounded-2xl border border-brand-border bg-brand-bg p-5 sm:p-7">
            <h4 className="font-display text-lg font-bold text-brand-text">{step.title}</h4>
            <p className="mt-2 text-sm leading-7 text-brand-text-secondary">{step.description}</p>
            <div className="mt-5 space-y-5">
              {step.commands.map((command, commandIndex) => {
                const commandKey = `${stepIndex}-${commandIndex}`;
                const status = copyStatus?.key === commandKey ? copyStatus.result : null;
                return (
                <div key={command.line} className="min-w-0">
                  <p className="mb-2 text-sm font-medium text-brand-text-secondary">{command.comment}</p>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-xl bg-[#151b22] py-4 pl-4 pr-14 text-xs leading-6 text-[#e5f8eb] sm:text-sm"><code>{command.line}</code></pre>
                    <button
                      type="button"
                      onClick={() => void copyCommand(commandKey, command.line)}
                      aria-label={`${status === 'copied' ? content.copiedLabel : content.copyLabel}：${command.line}`}
                      title={status === 'copied' ? content.copiedLabel : content.copyLabel}
                      className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-[#e5f8eb] transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                    >
                      {status === 'copied' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  {status === 'failed' && <p role="status" className="mt-1 text-xs text-brand-accent">{content.copyFailedLabel}</p>}
                  <div className="mt-2 space-y-1 pl-1 text-sm leading-6">
                    <p className="text-brand-text-secondary"><span className="font-semibold text-brand-text">{content.expectedLabel}：</span>{command.expected}</p>
                    {command.caution && <p className="text-brand-text-secondary"><span className="font-semibold text-brand-accent">{content.cautionLabel}：</span>{command.caution}</p>}
                  </div>
                </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
