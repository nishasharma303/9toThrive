import { motion } from "framer-motion";
import { UserPlus, Link2, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account as a student, recruiter, or placement officer in minutes.",
    step: "01",
  },
  {
    icon: Link2,
    title: "Connect",
    description: "Build meaningful connections between students and opportunities through our platform.",
    step: "02",
  },
  {
    icon: Trophy,
    title: "Hire or Get Hired",
    description: "Match with the perfect opportunity and kickstart your professional journey.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#011627ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#e25c28ff' }}>
            How It Works
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f1f7edff' }}>
            Three simple steps to transform your placement experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute -top-4 -right-4 text-6xl font-bold" style={{ color: 'rgba(226, 92, 40, 0.2)' }}>
                    {step.step}
                  </div>
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10">
                    <step.icon className="text-white" size={40} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#e25c28ff' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#f1f7edff' }}>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-6 w-12">
                  <div className="relative h-0.5 bg-gradient-to-r from-[#e25c28ff] to-transparent animate-pulse shadow-[0_0_15px_rgba(226,92,40,0.6)]">
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-[#e25c28ff] animate-pulse shadow-[0_0_15px_rgba(226,92,40,0.6)]" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
