import Button from "../../../shared/landing/Button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 overflow-hidden animate-slide-up
      before:content-[''] before:absolute before:top-[-20%] before:left-[-10%]
      before:w-1/2 before:h-1/2
      before:bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_70%)]
      before:pointer-events-none">
      <div className="container flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,4rem)] font-bold mb-6 tracking-tight leading-[1.1]">
          <span className="text-gradient">Learn.</span> Evaluate. <br /> Get Hired.
        </h1>
        <p className="text-lg text-[#9CA3AF] mx-auto mb-12 max-w-[90%] leading-relaxed
          sm:text-base sm:mb-8">
          An end-to-end AI-powered learning and hiring ecosystem. Master new
          skills, prove your expertise, and connect with top recruiters all in
          one unified platform.
        </p>
        <div className="flex flex-wrap gap-4 justify-center w-full
          max-sm:flex-col max-sm:gap-3">
          <Button variant="primary" size="lg" to="/register">
            Get Started
          </Button>
          <Button variant="secondary" size="lg" to="/login">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
