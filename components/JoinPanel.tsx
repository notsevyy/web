const GFORM_URL = "https://forms.gle/REPLACE_ME";

export default function JoinPanel() {
  return (
    <div className="backdrop-blur-md bg-white/60 border border-black/10 rounded-3xl shadow-xl px-12 py-10 max-w-lg w-full mx-4 text-center">
      <h2 className="text-3xl font-serif text-gray-900 mb-4">Join Us</h2>
      <p className="text-gray-500 mb-8">
        Fill out the form and an officer will follow up.
      </p>
      <a
        href={GFORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block backdrop-blur-md bg-white/60 border border-black/10 rounded-full px-10 py-3 text-gray-900 font-medium shadow-lg hover:bg-white/80 transition-colors"
      >
        Open Application Form ↗
      </a>
    </div>
  );
}
