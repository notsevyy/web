export default function ContactPanel() {
  return (
    <div className="backdrop-blur-md bg-white/60 border border-black/10 rounded-3xl shadow-xl px-12 py-10 max-w-3xl w-full mx-4">
      <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">Contact Us</h2>

      <div className="space-y-5">
        <a
          href="mailto:awssbg@tip.edu.ph"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-black/5 hover:bg-white/60 transition-colors"
        >
          <span className="text-2xl">✉</span>
          <div>
            <p className="text-gray-900 font-medium">Email</p>
            <p className="text-gray-500 text-sm">awssbg@tip.edu.ph</p>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-black/5 hover:bg-white/60 transition-colors"
        >
          <span className="text-2xl">👥</span>
          <div>
            <p className="text-gray-900 font-medium">Facebook Group</p>
            <p className="text-gray-500 text-sm">Join our community</p>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-black/5 hover:bg-white/60 transition-colors"
        >
          <span className="text-2xl">💬</span>
          <div>
            <p className="text-gray-900 font-medium">Discord Server</p>
            <p className="text-gray-500 text-sm">Chat with the team</p>
          </div>
        </a>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-black/5">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-gray-900 font-medium">Location</p>
            <p className="text-gray-500 text-sm">
              Technological Institute of the Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
