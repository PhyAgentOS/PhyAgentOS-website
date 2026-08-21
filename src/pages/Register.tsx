import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquareText, UserPlus } from 'lucide-react';
import { registerUser, sendVerificationCode } from '../lib/userSystemApi';

export default function Register() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMessage = (text: string, ok = false) => {
    setMessage(text);
    setIsSuccess(ok);
  };

  const handleSendCode = async () => {
    const input = document.querySelector<HTMLInputElement>('#register-phone');
    const phone = input?.value.trim() || '';
    setIsSending(true);
    try {
      const result = await sendVerificationCode(phone, 'register');
      showMessage(result.debug_code ? `验证码已发送，开发验证码：${result.debug_code}` : '验证码已发送', true);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : '发送失败');
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      username: String(form.get('username')),
      phone: String(form.get('phone')),
      email: String(form.get('email')),
      password: String(form.get('password')),
      confirm_password: String(form.get('confirm_password')),
      code: String(form.get('code')),
    };

    if (payload.password !== payload.confirm_password) {
      showMessage('两次输入的密码不一致');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await registerUser(payload);
      showMessage(`注册成功，用户 ID：${user.id}。现在可以返回登录页。`, true);
      event.currentTarget.reset();
    } catch (error) {
      showMessage(error instanceof Error ? error.message : '注册失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[100dvh] px-6 pt-28 pb-16 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_500px] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-bg-secondary px-4 py-2 text-sm font-semibold text-brand-accent-light shadow-glow-soft">
            <UserPlus className="h-4 w-4" />
            账号注册
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight text-brand-text sm:text-6xl">
            注册 PhyAgentOS
            <span className="block text-gradient">开启个人操作体验</span>
          </h1>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-bg-secondary/90 p-6 shadow-large backdrop-blur-xl sm:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              用户名
              <input name="username" required minLength={2} maxLength={64} className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              手机号
              <div className="grid gap-2 sm:grid-cols-[1fr_132px]">
                <input id="register-phone" name="phone" required className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" placeholder="13800138000" />
                <button type="button" onClick={handleSendCode} disabled={isSending} className="h-12 rounded-lg bg-brand-text/[0.06] px-4 text-sm font-semibold text-brand-text transition hover:bg-brand-text/[0.1]">
                  <MessageSquareText className="mx-auto h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">发送验证码</span>
                </button>
              </div>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              邮箱（选填）
              <input name="email" type="email" className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              验证码
              <input name="code" required maxLength={6} className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" placeholder="6 位验证码" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              密码
              <input name="password" type="password" required minLength={8} className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-brand-text">
              确认密码
              <input name="confirm_password" type="password" required minLength={8} className="h-12 rounded-lg border border-brand-border bg-brand-bg px-4 text-brand-text outline-none transition focus:border-brand-accent" />
            </label>
            <button className="mt-2 flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent font-semibold text-brand-text-on-accent shadow-glow-soft transition hover:bg-brand-accent-light" disabled={isSubmitting}>
              <UserPlus className="h-4 w-4" />
              注册
            </button>
          </form>

          <p className={`mt-5 min-h-6 text-sm ${isSuccess ? 'text-brand-accent-light' : 'text-brand-warning'}`}>
            {message}
          </p>
          <p className="mt-3 text-center text-sm text-brand-text-secondary">
            已有账号？
            <Link className="font-semibold text-brand-accent-light hover:underline" to="/login">
              登录
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
