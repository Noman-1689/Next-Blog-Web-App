import {
  Target,
  Users,
  Zap,
  Globe,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  {
    label: "Active Readers",
    value: "120K+",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Articles Published",
    value: "450+",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    label: "Global Contributors",
    value: "85",
    icon: Globe,
    color: "text-emerald-500",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24 space-y-24">
      {/* --- HERO SECTION --- */}
      <header className="py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6">
            <Target className="w-5 h-5" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.9]">
            We bridge the gap between{" "}
            <span className="text-blue-600">code</span> and{" "}
            <span className="text-gray-400">creativity.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Founded in 2024, DevScribe was built for the next generation of
            builders. We believe that technical writing shouldn't be dry, and
            design shouldn't be an afterthought.
          </p>
        </div>
      </header>

      {/* --- STATS GRID (BENTO STYLE) --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-8 bg-gray-50 rounded-4xl border border-gray-100 flex flex-col items-center text-center space-y-4 group hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500"
          >
            <div
              className={`p-4 rounded-2xl bg-white shadow-sm ${stat.color} group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-gray-900">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* --- THE VISION (CONTENT SPLIT) --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-100 shadow-inner">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-80" />
          <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-transparent" />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Built by engineers, <br /> designed for everyone.
          </h2>
          <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
            <p>
              The digital landscape is evolving faster than ever. From the rise
              of AI-driven interfaces to the shift toward edge computing,
              staying ahead requires more than just documentation—it requires a
              community.
            </p>
            <p>
              At DevScribe, we curate high-signal content that helps developers
              and designers level up their craft without the noise of
              traditional social media.
            </p>
          </div>
          <button className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            Join our Community
          </button>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-gray-900">The Core Team.</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The humans behind the pixels and the prose.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="group text-center space-y-4">
              <div className="relative aspect-square rounded-4xl overflow-hidden bg-gray-100 mb-6">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />{" "}
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-tighter text-xs">
                  Photo coming soon
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-900">Alex Rivers</h4>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-widest">
                  Founding Editor
                </p>
              </div>
              <div className="flex justify-center gap-4 text-gray-300">
                <Github className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
