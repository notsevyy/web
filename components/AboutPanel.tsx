const timeline = [
  { year: "2021", title: "Placeholder", desc: "Placeholder" },
  { year: "2022", title: "Placeholder", desc: "Placeholder" },
  { year: "2023", title: "Placeholder", desc: "Placeholder" },
  { year: "2024", title: "Placeholder", desc: "Placeholder" },
];

export default function AboutPanel() {
  return (
    <div className="backdrop-blur-md bg-white/60 border border-black/10 rounded-3xl shadow-xl px-12 py-10 max-w-3xl w-full mx-4">
      <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">About Us</h2>
      <div className="space-y-6">
        {timeline.map((item) => (
          <div key={item.year} className="border-l border-black/10 pl-4">
            <h3 className="text-gray-900 font-medium">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
