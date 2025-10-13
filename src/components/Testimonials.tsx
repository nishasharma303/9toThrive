import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

const testimonials = [
  {
    text: "9toThrive made my placement journey incredibly smooth. I connected with amazing recruiters and landed my dream job within weeks!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Priya Sharma",
    role: "Computer Science Student",
  },
  {
    text: "Finding talented candidates has never been easier. The platform is intuitive and the quality of applicants is exceptional.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Rahul Verma",
    role: "HR Manager, Tech Corp",
  },
  {
    text: "The comprehensive dashboard and reporting tools have transformed how we manage campus placements. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Dr. Anjali Patel",
    role: "Placement Officer, ABC University",
  },
  {
    text: "The seamless integration between students and recruiters is phenomenal. It's exactly what we needed for our placement cell.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Vikram Singh",
    role: "Career Counselor",
  },
  {
    text: "Outstanding platform with excellent support. Our placement success rate has increased by 40% since we started using it.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Neha Kapoor",
    role: "Training & Placement Head",
  },
  {
    text: "The real-time analytics and insights help us make data-driven decisions. A game-changer for campus recruitment.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Arjun Mehta",
    role: "Recruitment Manager",
  },
  {
    text: "Easy to use, powerful features, and great results. Our students are getting placed faster than ever before.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Sanya Gupta",
    role: "Placement Coordinator",
  },
  {
    text: "The collaborative features make it simple to manage multiple recruitment drives simultaneously. Highly efficient!",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Karan Malhotra",
    role: "Campus Relations Head",
  },
  {
    text: "9toThrive bridges the gap between academia and industry perfectly. Our partnership with companies has never been stronger.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Divya Iyer",
    role: "Industry Relations Officer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative" style={{ backgroundColor: '#011627ff' }}>
      <div className="container z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg" style={{ borderColor: '#e25c28ff', color: '#e25c28ff' }}>
              Testimonials
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-5" style={{ color: '#e25c28ff' }}>
            What People Say
          </h2>
          <p className="text-center mt-5" style={{ color: '#f1f7edff' }}>
            Hear from students, recruiters, and placement officers who've found success
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
