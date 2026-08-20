import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, KeyRound, LogIn, Smartphone } from 'lucide-react';
import { getProfile, loginWithCode, loginWithPassword, sendVerificationCode } from '../lib/userSystemApi';

type LoginMode = 'password' | 'code';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>('password');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = (text: string, ok = false) => {
    setMessage(text);
    setIsSuccess(ok);
  };

  const saveLogin = async (result: Awaited<ReturnType<typeof loginWithPassword>>) => {
    localStorage.setItem('phyagentos_user_token', result.access_token);
    const profile = await getProfile(result.access_token);
    localStorage.setItem('phyagentos_user_profile', JSON.stringify(profile));
    window.dispatchEvent(new Event('phyagentos-auth-updated'));
    showMessage(`登录成功，用户 ID：${profile.id}。正在返回首页...`, true);
    window.setTimeout(() => navigate('/'), 700);
  };

  const handlePasswordLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      await saveLogin(await loginWithPassword(String(form.get('account')), String(form.get('password'))));
    } catch (error) {
      showMessage(error instanceof Error ? error.message : '登录失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      await saveLogin(await loginWithCode(String(form.get('phone')), String(form.get('code'))));
    } catch (error) {
      showMessage(error instanceof Error ? error.message : '登录失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendCode = async () => {
    const input = document.querySelector<HTMLInputElement>('#login-phone');
    const phone = input?.value.trim() || '';
    setIsSending(true);
    try {
      const result = await sendVerificationCode(phone, 'login');
      showMessage(result.debug_code ? `验证码已发送，开发验证码：${result.debug_code}` : '验证码已发送', true);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : '发送失败');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-[100dvh] px-6 pt-28 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-bg-secondary px-4 py-2 text-sm font-semibold text-brand-accent-light shadow-glow-soft">
            <LogIn className="h-4 w-4" />
            User System MVP
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight text-brand-text sm:text-6xl">
            登录 PhyAgentOS
            <span className="block text-gradient">开始调试账号系统</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-text-secondary sm:text-lg">
            支持手机号或邮箱密码登录，也可以使用手机验证码登录。当前验证码是 Mock 服务，开发环境会直接显示调试验证码。
          </p>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-bg-secondary/90 p-6 shadow-large backdrop-blur-xl sm:p-8">
          <div className="mb-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMode('password');
                setMessage('');
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                mode === 'password'
                  ? 'bg-brand-accent text-brand-text-on-accent shadow-glow-soft'
                  : 'bg-brand-text/[0.04] text-brand-text-secondary hover:text-brand-text'
              }`}
            >
              密码登录
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('code');
                setMessage('');
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                mode === 'code'
                  ? 'bg-brand-accent text-brand-text-on-accent shadow-glow-soft'
                  : 'bg-brand-text/[0.04] text-brand-text-secondary hover:text-brand-text'
              }`}
            >
              验证码登录
            </button>
          </div>

          {mode === 'password' ? (
            <form className="grid gap-4" onSubmit={handlePasswordLogin}>
              <label className="grid gap-2 text-sm font-semibold text-brand-text">
                账号
                <input
                  name="account"
                  required
                  className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent"
                  placeholder="手机号或邮箱"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-text">
                密码
                <input
                  name="password"
                  type="password"
                  required
                  className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent"
                  placeholder="请输入密码"
                />
              </label>
              <button className="mt-2 flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent font-semibold text-brand-text-on-accent shadow-glow-soft transition hover:bg-brand-accent-light" disabled={isSubmitting}>
                <KeyRound className="h-4 w-4" />
                登录
              </button>
            </form>
          ) : (
            <form className="grid gap-4" onSubmit={handleCodeLogin}>
              <label className="grid gap-2 text-sm font-semibold text-brand-text">
                手机号
                <input
                  id="login-phone"
                  name="phone"
                  required
                  className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent"
                  placeholder="13800138000"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-text">
                验证码
                <div className="grid gap-2 sm:grid-cols-[1fr_132px]">
                  <input
                    name="code"
                    required
                    maxLength={6}
                    className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent"
                    placeholder="6 位验证码"
                  />
                  <button type="button" onClick={handleSendCode} disabled={isSending} className="h-12 rounded-lg bg-brand-text/[0.06] px-4 text-sm font-semibold text-brand-text transition hover:bg-brand-text/[0.1]">
                    发送验证码
                  </button>
                </div>
              </label>
              <button className="mt-2 flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent font-semibold text-brand-text-on-accent shadow-glow-soft transition hover:bg-brand-accent-light" disabled={isSubmitting}>
                <Smartphone className="h-4 w-4" />
                登录
              </button>
            </form>
          )}

          <p className={`mt-5 min-h-6 text-sm ${isSuccess ? 'text-brand-accent-light' : 'text-brand-warning'}`}>
            {message}
          </p>
          <p className="mt-3 text-center text-sm text-brand-text-secondary">
            没有账号？
            <Link className="font-semibold text-brand-accent-light hover:underline" to="/register">
              注册
            </Link>
          </p>
          <Link className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-brand-text-tertiary hover:text-brand-text" to="/">
            返回首页
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
