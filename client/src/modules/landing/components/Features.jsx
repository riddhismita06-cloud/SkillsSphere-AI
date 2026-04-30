import { FileSearch, FileText, LineChart, Mic, Video } from "lucide-react";
import Card from "../../../shared/landing/Card";

const Features = () => {
  const featuresList = [
    {
      icon: <Video className="text-primary" size={32} />,
      title: "Live Interactive Classrooms",
      description:
        "Real-time learning sessions with video, chat, and seamless collaboration tools tailored for immediate feedback.",
    },
    {
      icon: <FileText style={{ color: "#A855F7" }} size={32} />,
      title: "AI Resume Analyzer",
      description:
        "Get instant resume scoring with actionable, AI-driven improvement suggestions to stand out to recruiters.",
    },
    {
      icon: <FileSearch className="text-primary" size={32} />,
      title: "Resume vs JD Matcher",
      description:
        "ML-assisted comparison between candidate professional profile and specific role requirements.",
    },
    {
      icon: <Mic style={{ color: "#F59E0B" }} size={32} />,
      title: "AI Mock Interview System",
      description:
        "Realistic interview practice with structured, real-time feedback for continuous improvement.",
    },
    {
      icon: <LineChart style={{ color: "#10B981" }} size={32} />,
      title: "Skill Tracking Dashboard",
      description:
        "Actionable performance insights designed to help both students and tutors track long-term growth and success.",
    },
  ];

  return (
    <section className="py-32 px-4 bg-surface relative sm:py-16 max-sm:py-10">
      <div className="container">
        <div className="text-center mb-16 max-w-[700px] mx-auto sm:mb-12 max-sm:mb-8">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold mb-4 leading-tight">
            Core <span className="text-gradient">Features</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg leading-relaxed sm:text-base max-sm:text-[0.95rem]">
            Harness the power of Artificial Intelligence to elevate learning,
            prep for interviews, and land the perfect role.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8
          sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] sm:gap-6
          max-sm:grid-cols-1 max-sm:gap-4">
          {featuresList.map((feature, index) => (
            <Card key={index} className="flex flex-col p-10 bg-[#0B0F19] sm:p-7 max-sm:p-6" hoverEffect={true}>
              <div className="mb-6 inline-flex p-4 bg-white/[0.03] rounded-lg border border-white/5
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)] max-sm:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 leading-snug sm:text-lg max-sm:text-base max-sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-[#9CA3AF] text-[0.95rem] leading-relaxed max-sm:text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
