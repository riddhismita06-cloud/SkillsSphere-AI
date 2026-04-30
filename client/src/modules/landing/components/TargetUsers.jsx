import { BookOpen, Briefcase, Users } from "lucide-react";
import Card from "../../../shared/landing/Card";

const TargetUsers = () => {
  const users = [
    {
      icon: <BookOpen className="text-primary" size={40} />,
      role: "Students",
      description:
        "Accelerate your learning curve, practice intelligently, and become undeniably job-ready.",
      hoverBorder: "hover:border-primary",
    },
    {
      icon: <Users style={{ color: "#10B981" }} size={40} />,
      role: "Tutors",
      description:
        "Host rich, interactive live classes and provide personalized mentorship to fuel student growth.",
      hoverBorder: "hover:border-secondary",
    },
    {
      icon: <Briefcase style={{ color: "#F59E0B" }} size={40} />,
      role: "Recruiters",
      description:
        "Source top-tier talent quickly using AI-backed skill profiling and detailed analytics.",
      hoverBorder: "hover:border-[#F59E0B]",
    },
  ];

  return (
    <section className="py-32 px-4 relative sm:py-16 max-sm:py-8">
      <div className="container">
        <div className="text-center mb-16 max-w-[700px] mx-auto sm:mb-12 max-sm:mb-6">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold mb-4 leading-tight">
            Built For The <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg leading-relaxed sm:text-base max-sm:text-[0.95rem]">
            A cohesive platform supporting every stage of the talent lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10 sm:grid-cols-1 sm:gap-8 max-sm:gap-4">
          {users.map((user, index) => (
            <Card
              key={index}
              className={`text-center p-12 sm:p-8 max-sm:p-4 ${user.hoverBorder}`}
              hoverEffect={true}
            >
              <div className="mb-6 flex justify-center max-sm:mb-4">{user.icon}</div>
              <h3 className="text-2xl font-bold mb-4 leading-snug sm:text-xl max-sm:text-lg max-sm:mb-2">
                {user.role}
              </h3>
              <p className="text-[#9CA3AF] text-base leading-relaxed max-sm:text-[0.9rem]">
                {user.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
