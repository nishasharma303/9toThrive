import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SignInDialog from "@/components/SignInDialog";
import { BackgroundPaths } from "@/components/ui/background-paths";
import DisplayCards from "@/components/ui/display-cards";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#011627ff' }}>
      <BackgroundPaths />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{ color: '#e25c28ff' }}
            >
              Connect. Grow. Thrive.
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed"
              style={{ color: '#F1F7ED' }}
            >
              Empowering students to connect with top recruiters and placement officers.
              Your journey from campus to career starts here.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-card transition-all duration-300 group hover:border-2"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e25c28ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <SignInDialog
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:border-[#e25c28ff]"
                    style={{
                      borderColor: '#e25c28ff',
                      color: '#F1F7ED',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Sign In
                  </Button>
                }
              />
            </motion.div>
          </motion.div>

          {/* Right side - Display Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden md:flex justify-center items-center"
          >
            <DisplayCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
