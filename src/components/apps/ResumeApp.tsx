import { Download, Printer, Briefcase, GraduationCap, Award, Users, CheckCircle } from 'lucide-react';
import { profile, resume, skillCategories } from '@/data/portfolio';

export function ResumeApp() {
  const handleDownload = () => {
    const text = [
      `${profile.name}`,
      `${profile.role}`,
      `Institution: ${profile.institution} (${profile.educationPeriod})`,
      `LinkedIn: https://www.linkedin.com/in/nanduri-mansi/`,
      '',
      'PROFESSIONAL SUMMARY',
      resume.summary,
      '',
      'WORK EXPERIENCE',
      ...resume.experiences.flatMap((e) => [
        `${e.role} — ${e.company} (${e.period})`,
        ...(e.certificateId ? [`Certificate ID: ${e.certificateId}`] : []),
        `Description: ${e.description}`,
        'Key Responsibilities & Learnings:',
        ...e.points.map((p) => `  - ${p}`),
        '',
      ]),
      'EDUCATION',
      ...resume.education.map(
        (ed) => `${ed.role} — ${ed.institution} (${ed.period})`
      ),
      '',
      'TECHNICAL SKILLS',
      ...skillCategories.map((sc) => `${sc.category}: ${sc.skills.join(', ')}`),
      '',
      'CERTIFICATIONS & PROFESSIONAL LEARNING',
      ...resume.certifications.map((c) =>
        `- ${c.title} — ${c.issuer} (${c.issueDate})${c.achievement ? ` [${c.achievement}]` : ''}${c.credentialId ? ` (ID: ${c.credentialId})` : ''}`
      ),
      '',
      'LEADERSHIP & HACKATHONS',
      ...resume.achievements.map((a) =>
        `${a.title} (${a.event}) - Role: ${a.role} (${a.team})\nTeammates: ${a.collaborators.join(', ')}\n${a.description}`
      ),
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nanduri-mansi-resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Resume Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>
          <p className="text-xs font-medium text-accent-300">{profile.role}</p>
          <p className="text-[11px] text-white/50">{profile.institution}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-accent-400/40 bg-accent-500/15 px-3 py-1.5 text-xs text-accent-200 transition hover:bg-accent-500/25 shadow-sm"
          >
            <Download className="h-3.5 w-3.5" /> Download TXT
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink-700/60 px-3 py-1.5 text-xs text-white/70 transition hover:text-white"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Summary */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-300">
          Professional Summary
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-white/75 bg-ink-800/40 p-3.5 rounded-xl border border-white/5">
          {resume.summary}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-300 flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" /> Work Experience
        </h3>
        <div className="space-y-4">
          {resume.experiences.map((e) => (
            <div
              key={e.role}
              className="rounded-xl border border-white/10 bg-ink-700/40 p-4 space-y-2.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <p className="text-sm font-semibold text-white">{e.role}</p>
                  <p className="text-xs text-accent-300 font-medium">
                    {e.company}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-white/50 block">
                    {e.period}
                  </span>
                  {e.status && (
                    <span className="text-[10px] text-emerald-300 font-mono">
                      {e.status}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-white/70 italic">{e.description}</p>

              {e.certificateId && (
                <div className="inline-block rounded bg-ink-800 px-2 py-0.5 text-[10px] font-mono text-white/60 border border-white/10">
                  Certificate ID: {e.certificateId}
                </div>
              )}

              <ul className="space-y-1.5 pt-1">
                {e.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-xs leading-relaxed text-white/70"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-300 flex items-center gap-1.5">
          <GraduationCap className="h-3.5 w-3.5" /> Education
        </h3>
        {resume.education.map((ed) => (
          <div
            key={ed.institution}
            className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-white/10 bg-ink-700/40 p-4"
          >
            <div>
              <p className="text-sm font-semibold text-white">
                {ed.institution}
              </p>
              <p className="text-xs text-white/60">{ed.role}</p>
            </div>
            <span className="font-mono text-xs text-accent-300 bg-ink-800/80 px-2.5 py-1 rounded border border-white/10">
              {ed.period}
            </span>
          </div>
        ))}
      </section>

      {/* Leadership & Achievements */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-300 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5" /> Leadership & Hackathons
        </h3>
        {resume.achievements.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <p className="text-sm font-semibold text-white">{a.title}</p>
                <p className="text-xs text-amber-300">
                  {a.role} · {a.team}
                </p>
              </div>
              <span className="text-[10px] font-mono text-white/50">
                {a.organization}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/75">
              {a.description}
            </p>
            <p className="text-[11px] text-white/50 flex items-center gap-1 pt-1">
              <Users className="h-3 w-3" /> Teammates:{' '}
              {a.collaborators.join(', ')}
            </p>
          </div>
        ))}
      </section>

      {/* Key Certifications Overview */}
      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-300 flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5" /> Verified Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {resume.certifications.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-white/10 bg-ink-800/60 p-3 space-y-1.5 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-2">
                {c.issuerLogo && (
                  <div className="flex h-6 min-w-[28px] max-w-[70px] items-center justify-center rounded bg-white/95 px-1.5 py-0.5 shadow-sm shrink-0">
                    <img
                      src={c.issuerLogo}
                      alt={c.issuer}
                      className="h-3.5 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <p className="text-xs font-semibold text-white truncate">
                  {c.issuer}
                </p>
              </div>
              <p className="text-xs font-medium text-white/80">{c.title}</p>
              <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-white/45 pt-1 border-t border-white/5">
                <span>{c.issueDate}</span>
                {c.credentialId && (
                  <span className="font-mono text-[9px] truncate max-w-[150px]">
                    ID: {c.credentialId}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
