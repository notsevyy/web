"use client";

type HomePanelProps = {
  onNavigate: (index: number) => void;
};

const GFORM_URL = "https://forms.gle/T34GWb27BUFfe4JV7";
const APPLICATIONS_OPEN = true;

const pillBase =
  "relative overflow-hidden px-14 py-5 rounded-full text-2xl font-mono tracking-wide font-medium text-white border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all cursor-pointer";

const cardBase =
  "backdrop-blur-md bg-white/60 border border-black/10 rounded-2xl shadow-xl w-96 text-center";

const glossyHighlight =
  "pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent";

const glossyJoin =
  "relative overflow-hidden w-full max-w-sm px-14 py-4 rounded-full text-2xl font-mono tracking-wide font-medium text-white bg-gradient-to-b from-orange-300 to-accent border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:brightness-105 transition-all flex items-center justify-center text-center";

export default function HomePanel({ onNavigate }: HomePanelProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-start justify-center gap-10">
        <div className="flex flex-col items-center">
          <div
            className={`${pillBase} relative z-10 -mb-4 bg-gradient-to-b from-yellow-300 to-yellow-500`}
          >
            <span className={glossyHighlight} />
            <span className="relative">What We Do</span>
          </div>
          <div className={`${cardBase} pt-8 p-6`}>
            <p className="text-gray-400 font-mono text-sm">Placeholder</p>
          </div>
        </div>

        <img
          src="/images/club-logo.png"
          alt="AWSSBG TIP Club"
          className="w-72 h-72 rounded-full object-contain"
        />

        <div className="flex flex-col items-center">
          <div
            className={`${pillBase} relative z-10 -mb-4 bg-gradient-to-b from-orange-300 to-accent`}
          >
            <span className={glossyHighlight} />
            <span className="relative">The Members</span>
          </div>
          <div className={`${cardBase} pt-8 p-6`}>
            <p className="text-gray-400 font-mono text-sm">Placeholder</p>
          </div>
        </div>
      </div>

      {APPLICATIONS_OPEN ? (
        <a
          href={GFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={glossyJoin}
        >
          <span className={glossyHighlight} />
          <span className="relative">Join Us</span>
        </a>
      ) : (
        <div className={`${glossyJoin} opacity-50 cursor-not-allowed pointer-events-none`}>
          <span className={glossyHighlight} />
          <span className="relative">Join Us</span>
        </div>
      )}
    </div>
  );
}
