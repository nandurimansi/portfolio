import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2, AlertCircle, Linkedin, ExternalLink, Mail, Github } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { profile } from '@/data/portfolio';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY ||
  'b3ede7b9-4e22-4dd7-9ca9-a034dfad9d29';

export function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const recipientEmail = profile.email || 'nandurimansi@gmail.com';

  const handleOpenInMail = () => {
    const subject = encodeURIComponent(
      form.name
        ? `Portfolio Inquiry from ${form.name}`
        : 'Portfolio Inquiry / Collaboration'
    );
    const bodyLines = [
      form.message
        ? form.message
        : 'Hi Mansi,\n\nI came across your portfolio and would like to connect with you regarding web development opportunities.',
      '',
      '---',
      `Sender: ${form.name || 'Portfolio Visitor'}`,
      form.email ? `Email: ${form.email}` : '',
      'Sent from Nanduri Mansi Portfolio',
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\n'));
    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill out every field.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');

    let dbSaved = false;
    let emailSent = false;
    let failureReason = '';

    // 1. Forward directly to Gmail via Web3Forms
    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('message', form.message);
      formData.append('subject', `Portfolio Message from ${form.name}`);
      formData.append('from_name', `${form.name} (via Portfolio)`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        emailSent = true;
      } else {
        failureReason = data.message || 'Email delivery failed.';
      }
    } catch (emailErr) {
      console.warn('Web3Forms dispatch error:', emailErr);
    }

    // 2. Persist in Supabase database
    try {
      const { error: dbError } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        message: form.message,
      });
      if (!dbError) {
        dbSaved = true;
      }
    } catch (dbErr) {
      console.warn('Supabase insert error:', dbErr);
    }

    if (emailSent || dbSaved) {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } else {
      setError(
        failureReason || 'Failed to deliver message. Please use "Open in Mail" instead.'
      );
      setStatus('error');
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-white">Get in Touch</h2>
        <p className="text-xs text-white/60 mt-1 leading-relaxed">
          Open to discussing full-stack web development, internship opportunities, hackathon ideas, and collaborative software projects.
        </p>
      </div>

      {/* Quick Connect Cards: LinkedIn, GitHub & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Verified LinkedIn Connect Card */}
        <div className="rounded-xl border border-blue-500/25 bg-blue-500/10 p-3 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
              <Linkedin className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">LinkedIn</p>
              <p className="text-[10px] text-blue-300/80 truncate">in/nanduri-mansi</p>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/nanduri-mansi/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 py-1 text-[11px] font-medium transition"
          >
            <span>Profile</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        {/* GitHub Connect Card */}
        <div className="rounded-xl border border-purple-500/25 bg-purple-500/10 p-3 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
              <Github className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">GitHub</p>
              <p className="text-[10px] text-purple-300/80 truncate">nandurimansi</p>
            </div>
          </div>
          <a
            href="https://github.com/nandurimansi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 py-1 text-[11px] font-medium transition"
          >
            <span>GitHub</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>

        {/* Direct Email Connect Card */}
        <div className="rounded-xl border border-accent-400/25 bg-accent-500/10 p-3 flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500/20 text-accent-300 shrink-0">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Direct Email</p>
              <p className="text-[10px] text-accent-300/80 truncate">nanduri.mansi</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenInMail}
            className="flex items-center justify-center gap-1 rounded-lg bg-accent-500/20 hover:bg-accent-500/30 text-accent-200 py-1 text-[11px] font-medium transition"
          >
            <Mail className="h-2.5 w-2.5" />
            <span>Open Mail</span>
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Message delivered!</p>
              <p className="text-xs text-white/60 mt-1">
                Your message has been sent directly to Mansi's email and database.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleOpenInMail}
                className="flex items-center gap-1.5 rounded-lg border border-accent-400/40 bg-accent-500/20 hover:bg-accent-500/30 text-accent-200 px-3.5 py-1.5 text-xs font-medium transition"
              >
                <Mail className="h-3.5 w-3.5" /> Also open in Mail client
              </button>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs text-white/60 hover:text-white transition px-2 py-1"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <Field
              label="Your Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Enter your name"
            />
            <Field
              label="Your Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="you@example.com"
            />
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                rows={4}
                placeholder="Write your message or inquiry here…"
                className="w-full resize-none rounded-lg border border-white/10 bg-ink-800/70 px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition focus:border-accent-400/50 focus:ring-1 focus:ring-accent-400/40"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </div>
            )}

            {/* Action Buttons: Send Message + Open in Mail */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-accent-400 px-4 py-2.5 text-sm font-medium text-ink-950 transition hover:brightness-110 disabled:opacity-60 shadow-sm"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenInMail}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 px-4 py-2.5 text-sm font-medium text-white transition shadow-sm shrink-0"
                title="Open your email client (Gmail, Outlook, Apple Mail)"
              >
                <Mail className="h-4 w-4 text-accent-300" />
                <span>Open in Mail</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-white/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-ink-800/70 px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition focus:border-accent-400/50 focus:ring-1 focus:ring-accent-400/40"
      />
    </div>
  );
}
