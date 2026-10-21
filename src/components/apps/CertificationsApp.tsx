import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Search,
  Copy,
  Check,
  ShieldCheck,
  Users,
  Eye,
  Maximize2,
  X,
  FileCheck,
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { certifications, achievements, type Certification } from '@/data/portfolio';

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

export function CertificateCardImage({
  cert,
  onEnlarge,
  isModal = false,
}: {
  cert: Certification;
  onEnlarge?: () => void;
  isModal?: boolean;
}) {
  const [extIndex, setExtIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const currentSrc = cert.imageUrl
    ? cert.imageUrl
    : `/certificates/${cert.id}${EXTENSIONS[extIndex]}`;

  const handleError = () => {
    if (!cert.imageUrl && extIndex < EXTENSIONS.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-ink-950 border border-white/10 group/img shadow-md ${
        isModal ? 'max-h-[70vh]' : ''
      }`}
    >
      {!imgFailed ? (
        <>
          <img
            src={currentSrc}
            alt={cert.title}
            onLoad={() => setImgLoaded(true)}
            onError={handleError}
            className={`h-full w-full object-contain p-1.5 transition-transform duration-300 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            } ${!isModal ? 'group-hover/img:scale-105' : ''}`}
          />
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900/80">
              <span className="font-mono text-[10px] text-white/50 animate-pulse flex items-center gap-1.5">
                <FileCheck className="h-3.5 w-3.5 text-accent-400" />
                Checking for /public/certificates/{cert.id}.png…
              </span>
            </div>
          )}
        </>
      ) : (
        /* Fallback: Verified digital certificate canvas */
        <div className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-4 bg-gradient-to-br from-ink-900 via-ink-850 to-ink-950 border border-amber-500/25">
          {/* Guilloché styled decorative borders */}
          <div className="pointer-events-none absolute inset-1.5 rounded border border-amber-400/25" />
          <div className="pointer-events-none absolute inset-2.5 rounded border border-amber-400/10" />

          {/* Certificate Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                {cert.issuer}
              </span>
            </div>
            <span className="font-mono text-[9px] text-white/50">
              {cert.issueDate}
            </span>
          </div>

          {/* Certificate Body */}
          <div className="relative z-10 text-center py-1 sm:py-2 space-y-1">
            <p className="font-mono text-[8px] uppercase tracking-widest text-white/40">
              Certificate of Verified Completion
            </p>
            <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Nanduri Mansi
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-accent-300 leading-snug line-clamp-2">
              {cert.title}
            </p>
            {cert.achievement && (
              <span className="inline-block text-[9px] font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30 rounded px-2 py-0.5 mt-0.5">
                {cert.achievement}
              </span>
            )}
          </div>

          {/* Certificate Footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1.5 text-[8px] sm:text-[9px] font-mono text-white/50">
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Credential</span>
            </div>
            {cert.credentialId ? (
              <span className="truncate max-w-[140px] text-white/60">
                ID: {cert.credentialId}
              </span>
            ) : (
              <span className="text-white/40">Official Program</span>
            )}
          </div>
        </div>
      )}

      {/* Enlarge Overlay Trigger */}
      {onEnlarge && !isModal && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEnlarge();
          }}
          className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/75 px-2 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md opacity-0 group-hover/img:opacity-100 transition hover:bg-black hover:text-accent-300 border border-white/15 shadow-sm"
          title="Click to view full screen"
        >
          <Maximize2 className="h-3 w-3" /> Enlarge
        </button>
      )}
    </div>
  );
}

export function IssuerLogo({
  cert,
  size = 'md',
}: {
  cert: Certification;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [hasError, setHasError] = useState(false);

  const containerSizes = {
    sm: 'h-6 min-w-[32px] max-w-[75px] px-1.5 py-0.5',
    md: 'h-8 min-w-[36px] max-w-[105px] px-2 py-1',
    lg: 'h-11 min-w-[48px] max-w-[130px] px-3 py-1.5',
  };

  const imgHeights = {
    sm: 'h-3.5',
    md: 'h-5',
    lg: 'h-7',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-white/95 shadow-sm border border-white/20 shrink-0 transition-transform ${containerSizes[size]}`}
    >
      {cert.issuerLogo && !hasError ? (
        <img
          src={cert.issuerLogo}
          alt={cert.issuer}
          className={`${imgHeights[size]} w-auto max-w-full object-contain`}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <Award
          className={`${
            size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'
          } text-slate-800`}
        />
      )}
    </div>
  );
}

export function CertificationsApp() {
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [alwaysShowPreview, setAlwaysShowPreview] = useState(false);

  const filtered = certifications.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.issuer.toLowerCase().includes(query.toLowerCase()) ||
      (c.credentialId &&
        c.credentialId.toLowerCase().includes(query.toLowerCase()))
  );

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Search & Preview Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>Certifications & Verified Learning</span>
            <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-[10px] font-mono text-accent-300 border border-accent-400/20">
              Hover to preview
            </span>
          </h2>
          <p className="text-xs text-white/50 mt-0.5">
            Hover cursor over any card to open certificate preview. Click to enlarge.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search credentials…"
              className="w-full rounded-lg border border-white/10 bg-ink-800/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/35 outline-none focus:border-accent-400/50"
            />
          </div>

          {/* Toggle Always Preview */}
          <button
            onClick={() => setAlwaysShowPreview((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono transition ${
              alwaysShowPreview
                ? 'border-accent-400/50 bg-accent-500/20 text-accent-200'
                : 'border-white/10 bg-ink-800/80 text-white/60 hover:text-white'
            }`}
            title="Toggle to keep all certificate previews visible"
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span className="hidden sm:inline">
              {alwaysShowPreview ? 'Hide All' : 'Show All'}
            </span>
          </button>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((c, i) => {
          const isHovered = hoveredId === c.id;
          const showPreview = isHovered || alwaysShowPreview;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedCert(c)}
              className={`group flex flex-col justify-between rounded-xl border p-4 space-y-3 cursor-pointer transition-all duration-200 ${
                showPreview
                  ? 'border-accent-400/60 bg-ink-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                  : 'border-white/10 bg-ink-700/40 hover:border-white/25'
              }`}
            >
              <div className="space-y-3">
                {/* Provider Brand Header: Logo + Bigger Provider Name */}
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IssuerLogo cert={c} size="md" />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white tracking-tight leading-snug truncate group-hover:text-accent-300 transition-colors">
                        {c.issuer}
                      </h4>
                      <span className="text-[10px] font-mono text-white/50 block">
                        {c.issueDate}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 font-mono text-[10px]">
                    {showPreview ? (
                      <span className="flex items-center gap-1 rounded-full bg-accent-500/20 px-2 py-0.5 text-accent-300 font-semibold border border-accent-400/30 shadow-sm">
                        <Eye className="h-3 w-3 animate-pulse" /> Preview Open
                      </span>
                    ) : (
                      <span className="rounded bg-white/5 px-2 py-0.5 text-white/40 border border-white/10">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Course / Program Title & Achievement */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-medium text-white/95 leading-snug group-hover:text-accent-200 transition">
                    {c.title}
                  </h3>

                  {c.achievement && (
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-1 text-[10px] font-medium text-amber-200">
                      <Award className="h-3 w-3 text-amber-400 shrink-0" />
                      <span className="leading-tight">{c.achievement}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Hover Preview Drawer */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden pt-2 border-t border-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(c);
                    }}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-accent-300">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Certificate Preview
                        </span>
                        <span className="text-[9px] text-white/50 group-hover:text-white flex items-center gap-0.5">
                          Click to enlarge <Maximize2 className="h-2.5 w-2.5" />
                        </span>
                      </div>
                      <CertificateCardImage
                        cert={c}
                        onEnlarge={() => setSelectedCert(c)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Footer: Credential ID & Actions */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                {c.credentialId ? (
                  <div className="flex items-center justify-between text-[10px] font-mono bg-ink-800/80 px-2.5 py-1 rounded border border-white/10">
                    <span className="text-white/60 truncate mr-2">
                      ID: {c.credentialId}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(c.credentialId!);
                      }}
                      className="text-accent-300 hover:text-white transition shrink-0 p-0.5"
                      title="Copy Credential ID"
                    >
                      {copiedId === c.credentialId ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] text-white/45">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>Course Completion & Technical Recognition</span>
                  </div>
                )}

                {c.verificationUrl && (
                  <div className="pt-1 flex justify-end">
                    <a
                      href={c.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] text-blue-300 hover:text-blue-200 transition font-mono"
                    >
                      <ExternalLink className="h-3 w-3" /> Verify Online
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-8 text-center text-xs text-white/40">
          No certifications found matching "{query}".
        </div>
      )}

      {/* Leadership & Achievements */}
      <div className="pt-2 border-t border-white/10">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-300 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-amber-400" /> Hackathon Leadership & Team Achievements
        </h3>
        {achievements.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 space-y-2"
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
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-white/55">
              <Users className="h-3.5 w-3.5 text-white/40 shrink-0" />
              <span>Team Cybrix members: {a.collaborators.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen Certificate Enlarged Lightbox Modal */}
      {selectedCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full overflow-hidden rounded-2xl border border-white/20 bg-ink-950 p-6 shadow-2xl space-y-4"
            >
              {/* Modal Top Bar: Prominent Provider Identity */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <IssuerLogo cert={selectedCert} size="lg" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {selectedCert.issuer}
                      </h4>
                      {selectedCert.achievement && (
                        <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-medium text-amber-300 border border-amber-500/30">
                          {selectedCert.achievement}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-sm sm:text-base font-semibold text-white/90">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-white/50 font-mono mt-0.5">
                      Issued: {selectedCert.issueDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition shrink-0"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate Image Canvas */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <CertificateCardImage cert={selectedCert} isModal={true} />
              </div>

              {/* Certificate Details & Upload Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
                {selectedCert.credentialId ? (
                  <div className="flex items-center gap-2 font-mono text-white/70">
                    <span>Credential ID:</span>
                    <code className="bg-ink-800 px-2 py-0.5 rounded text-accent-300 text-[11px]">
                      {selectedCert.credentialId}
                    </code>
                    <button
                      onClick={() => handleCopy(selectedCert.credentialId!)}
                      className="text-white/50 hover:text-white transition"
                      title="Copy ID"
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verified Technical Program</span>
                  </div>
                )}

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/20 px-3 py-1.5 text-xs text-blue-200 font-medium hover:bg-blue-500/30 transition shadow-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Verify Certificate Online
                  </a>
                )}

                <p className="text-[10px] text-white/40 italic flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-accent-400" />
                  Image saved in: <span className="font-mono text-accent-300">public/certificates/{selectedCert.id}.png</span>
                </p>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
}
