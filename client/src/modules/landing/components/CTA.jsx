import Button from "../../../shared/landing/Button";

const CTA = () => {
  return (
    <section className="px-4 py-16 pb-32 sm:py-10 sm:pb-16 max-sm:py-6 max-sm:pb-12">
      <div className="container">
        <div className="relative bg-[linear-gradient(135deg,rgba(79,70,229,0.1)_0%,rgba(168,85,247,0.05)_100%)]
          border border-[rgba(79,70,229,0.2)] rounded-3xl py-20 px-8 text-center overflow-hidden
          sm:py-12 sm:px-6 max-sm:py-8 max-sm:px-4">

          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[300px] h-[300px] max-sm:w-[200px] max-sm:h-[200px]
            bg-[radial-gradient(circle,rgba(79,70,229,0.3)_0%,transparent_70%)]
            blur-[50px] pointer-events-none z-0" />

          <h2 className="relative z-10 text-[clamp(1.5rem,4vw,3rem)] font-bold mb-4 leading-tight">
            Ready to transform your journey?
          </h2>
          <p className="relative z-10 text-[#9CA3AF] text-xl mb-10 max-w-[600px] mx-auto leading-relaxed
            sm:text-base sm:mb-6 max-sm:text-[0.95rem] max-sm:mb-5">
            Join thousands of students, tutors, and recruiters already active on
            SkillsSphere-AI.
          </p>
          <div className="relative z-10 flex justify-center">
            <Button variant="primary" size="lg" to="/register"
              className="max-sm:w-full max-sm:max-w-[300px]">
              Create Free Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
