import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, BarChart3 } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#011627ff' }}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#e25c28ff' }}>
            Start Your Placement Journey Today!
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto" style={{ color: '#f1f7edff' }}>
            Join thousands of students, recruiters, and placement officers who are already thriving
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-hover transition-all duration-300 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300"
              style={{
                borderColor: '#e25c28ff',
                color: '#e25c28ff',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e25c28ff';
                e.currentTarget.style.color = '#f1f7edff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#e25c28ff';
              }}
            >
              Schedule a Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Students", action: "Build Your Profile", link: "/student/resume-upload" },
              { icon: Briefcase, label: "Recruiters", action: "Post Jobs" , link: "/Recruitment"},
              { icon: BarChart3, label: "Placement Cell", action: "Manage Drives", link: "/placement" },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative"
                style={{ backgroundColor: 'rgba(1, 22, 39, 0.5)', borderColor: 'rgba(226, 92, 40, 0.3)' }}
              >
                <item.icon className="mx-auto mb-3" style={{ color: '#f1f7edff' }} size={32} />
                <h3 className="text-lg font-semibold mb-1 flex items-center justify-center gap-2" style={{ color: '#e25c28ff' }}>
                  {item.label}
                  <ArrowRight 
                    className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" 
                    size={18}
                    style={{ color: '#e25c28ff' }}
                  />
                </h3>
                <p className="text-sm" style={{ color: '#f1f7edff' }}>{item.action}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;