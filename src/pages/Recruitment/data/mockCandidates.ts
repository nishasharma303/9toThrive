// src/data/mockCandidates.ts

import { CandidateProfile } from '@/pages/Recruitment/types/matching.types';

export const mockCandidates: CandidateProfile[] = [
  // FULL STACK DEVELOPERS (MERN/MEAN) - High Quality
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@iitd.ac.in",
    college: "IIT Delhi",
    branch: "Computer Science",
    cgpa: 9.2,
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express", "HTML", "CSS", "Git", "REST API", "Redux"],
    experience: 1,
    projects: [
      {
        title: "Full Stack E-commerce Platform",
        description: "Built a complete MERN stack e-commerce application with user authentication, product catalog, shopping cart, payment gateway integration (Razorpay), order management, and admin dashboard. Implemented JWT authentication and role-based access control.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "JWT", "Razorpay"],
        duration: "4 months",
        link: "https://github.com/priya/ecommerce"
      },
      {
        title: "Real-time Chat Application",
        description: "Developed a real-time messaging app using Socket.io with features like group chats, file sharing, online status indicators, and message encryption.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
        duration: "2 months"
      },
      {
        title: "Task Management Dashboard",
        description: "Created a collaborative task management system with drag-and-drop functionality, team collaboration, deadline tracking, and progress analytics.",
        technologies: ["React", "Node.js", "MongoDB", "Redux", "Chart.js"],
        duration: "2 months"
      }
    ],
    phssScore: 89,
    resume: "/resumes/priya_sharma.pdf"
  },
  {
    id: "2",
    name: "Rahul Verma",
    email: "rahul.v@bits.edu",
    college: "BITS Pilani",
    branch: "Information Technology",
    cgpa: 8.8,
    skills: ["Java", "Spring Boot", "MySQL", "Hibernate", "REST API", "Microservices", "Docker", "Git", "JUnit"],
    experience: 2,
    projects: [
      {
        title: "Microservices Banking System",
        description: "Architected and developed a microservices-based banking application with separate services for accounts, transactions, and user management. Implemented service discovery with Eureka and API Gateway.",
        technologies: ["Java", "Spring Boot", "MySQL", "Docker", "Microservices", "Eureka"],
        duration: "5 months",
        link: "https://github.com/rahul/banking-microservices"
      },
      {
        title: "Inventory Management API",
        description: "Built a RESTful API for inventory management with features like stock tracking, supplier management, and automated reordering. Implemented JWT security and role-based permissions.",
        technologies: ["Spring Boot", "MySQL", "Hibernate", "JWT", "REST API"],
        duration: "3 months"
      }
    ],
    phssScore: 85,
    resume: "/resumes/rahul_verma.pdf"
  },
  {
    id: "3",
    name: "Ananya Reddy",
    email: "ananya@nitt.edu",
    college: "NIT Trichy",
    branch: "Computer Science",
    cgpa: 9.0,
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux", "Git", "Webpack", "REST API"],
    experience: 1.5,
    projects: [
      {
        title: "Enterprise Dashboard Application",
        description: "Developed a comprehensive analytics dashboard using React and TypeScript with data visualization, real-time updates, and responsive design. Integrated multiple third-party APIs for data aggregation.",
        technologies: ["React", "TypeScript", "Redux", "Chart.js", "Tailwind CSS", "REST API"],
        duration: "4 months",
        link: "https://dashboard.vercel.app"
      },
      {
        title: "SaaS Product Landing Pages",
        description: "Created multiple high-converting landing pages for SaaS products with A/B testing, SEO optimization, and conversion tracking.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
        duration: "2 months"
      }
    ],
    phssScore: 87,
    resume: "/resumes/ananya_reddy.pdf"
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@iitb.ac.in",
    college: "IIT Bombay",
    branch: "Computer Science",
    cgpa: 9.5,
    skills: ["Python", "Django", "PostgreSQL", "Machine Learning", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Docker", "AWS"],
    experience: 2,
    projects: [
      {
        title: "AI-Powered Recommendation Engine",
        description: "Built a collaborative filtering recommendation system for e-commerce using machine learning algorithms. Achieved 87% accuracy and deployed on AWS with auto-scaling.",
        technologies: ["Python", "TensorFlow", "Django", "PostgreSQL", "AWS", "Docker"],
        duration: "5 months",
        link: "https://github.com/vikram/recommendation-engine"
      },
      {
        title: "Predictive Analytics Platform",
        description: "Developed a predictive analytics dashboard for sales forecasting using LSTM neural networks and time series analysis.",
        technologies: ["Python", "TensorFlow", "Django", "Pandas", "NumPy", "Chart.js"],
        duration: "3 months"
      }
    ],
    phssScore: 92,
    resume: "/resumes/vikram_singh.pdf"
  },
  {
    id: "5",
    name: "Sneha Patel",
    email: "sneha.p@iiith.ac.in",
    college: "IIIT Hyderabad",
    branch: "Computer Science",
    cgpa: 8.9,
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express", "REST API", "Git", "AWS", "GraphQL", "TypeScript"],
    experience: 1.5,
    projects: [
      {
        title: "Social Media Platform",
        description: "Created a full-stack social networking platform with user profiles, posts, likes, comments, real-time notifications, and friend system. Implemented GraphQL API for efficient data fetching.",
        technologies: ["React", "Node.js", "MongoDB", "GraphQL", "Apollo", "Socket.io"],
        duration: "6 months",
        link: "https://github.com/sneha/social-platform"
      },
      {
        title: "Content Management System",
        description: "Built a headless CMS with rich text editor, media management, version control, and multi-user collaboration features.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "AWS S3"],
        duration: "3 months"
      }
    ],
    phssScore: 88,
    resume: "/resumes/sneha_patel.pdf"
  },

  // FRONTEND SPECIALISTS
  {
    id: "6",
    name: "Arjun Mehta",
    email: "arjun.m@vit.ac.in",
    college: "VIT Vellore",
    branch: "Computer Science",
    cgpa: 8.5,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Redux", "Git", "Vercel"],
    experience: 1,
    projects: [
      {
        title: "E-learning Platform Frontend",
        description: "Developed the complete frontend for an e-learning platform with course catalog, video player, progress tracking, and student dashboard using Next.js for SEO optimization.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
        duration: "4 months",
        link: "https://elearning.vercel.app"
      },
      {
        title: "Design System Library",
        description: "Created a reusable component library with 50+ components, storybook documentation, and npm package distribution.",
        technologies: ["React", "TypeScript", "Styled-components", "Storybook"],
        duration: "2 months"
      }
    ],
    phssScore: 83,
    resume: "/resumes/arjun_mehta.pdf"
  },
  {
    id: "7",
    name: "Meera Krishnan",
    email: "meera.k@anna.edu",
    college: "Anna University",
    branch: "Information Technology",
    cgpa: 8.2,
    skills: ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "RxJS", "NgRx", "Bootstrap", "Git"],
    experience: 2,
    projects: [
      {
        title: "Enterprise Resource Planning Dashboard",
        description: "Built an ERP system frontend with modules for inventory, sales, HR, and finance using Angular with state management and lazy loading.",
        technologies: ["Angular", "TypeScript", "NgRx", "RxJS", "Bootstrap"],
        duration: "5 months"
      },
      {
        title: "Admin Panel Template",
        description: "Created a comprehensive admin panel template with charts, tables, forms, and user management features.",
        technologies: ["Angular", "TypeScript", "Chart.js", "Bootstrap"],
        duration: "2 months"
      }
    ],
    phssScore: 81,
    resume: "/resumes/meera_krishnan.pdf"
  },

  // BACKEND SPECIALISTS
  {
    id: "8",
    name: "Karthik Iyer",
    email: "karthik@nitk.ac.in",
    college: "NIT Karnataka",
    branch: "Computer Science",
    cgpa: 9.1,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Microservices", "GraphQL"],
    experience: 3,
    projects: [
      {
        title: "Scalable Booking System API",
        description: "Architected and implemented a high-performance booking system API handling 10K+ requests/sec with Redis caching, message queues, and database sharding.",
        technologies: ["Node.js", "Express", "MongoDB", "Redis", "RabbitMQ", "Docker"],
        duration: "6 months",
        link: "https://github.com/karthik/booking-api"
      },
      {
        title: "Authentication Microservice",
        description: "Built a standalone authentication service with OAuth2, JWT, refresh tokens, and multi-factor authentication support.",
        technologies: ["Node.js", "PostgreSQL", "Redis", "JWT", "OAuth2"],
        duration: "2 months"
      }
    ],
    phssScore: 90,
    resume: "/resumes/karthik_iyer.pdf"
  },
  {
    id: "9",
    name: "Aditya Kapoor",
    email: "aditya.k@iitm.ac.in",
    college: "IIT Madras",
    branch: "Computer Science",
    cgpa: 9.3,
    skills: ["Python", "FastAPI", "Django", "PostgreSQL", "Redis", "Docker", "AWS", "Celery", "REST API"],
    experience: 2,
    projects: [
      {
        title: "High-Performance API Gateway",
        description: "Developed an API gateway using FastAPI with rate limiting, request validation, caching, and load balancing. Achieved 5x performance improvement over Django.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
        duration: "4 months",
        link: "https://github.com/aditya/api-gateway"
      },
      {
        title: "Async Task Processing System",
        description: "Built an asynchronous task processing system with Celery for background jobs, scheduled tasks, and distributed computing.",
        technologies: ["Python", "Celery", "Redis", "RabbitMQ", "PostgreSQL"],
        duration: "2 months"
      }
    ],
    phssScore: 91,
    resume: "/resumes/aditya_kapoor.pdf"
  },

  // DATA SCIENCE / ML SPECIALISTS
  {
    id: "10",
    name: "Divya Nair",
    email: "divya.n@nitw.ac.in",
    college: "NIT Warangal",
    branch: "Computer Science",
    cgpa: 8.7,
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "SQL", "Data Visualization"],
    experience: 1.5,
    projects: [
      {
        title: "Computer Vision Image Classification",
        description: "Developed a CNN-based image classification model achieving 94% accuracy on custom dataset. Deployed using TensorFlow Serving with REST API.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask"],
        duration: "4 months",
        link: "https://github.com/divya/image-classifier"
      },
      {
        title: "NLP Sentiment Analysis Engine",
        description: "Built a sentiment analysis system for product reviews using BERT and transformers with 91% accuracy on test data.",
        technologies: ["Python", "PyTorch", "Transformers", "NLTK", "Pandas"],
        duration: "3 months"
      },
      {
        title: "Predictive Maintenance System",
        description: "Created a time-series forecasting model to predict equipment failures using LSTM neural networks.",
        technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
        duration: "2 months"
      }
    ],
    phssScore: 89,
    resume: "/resumes/divya_nair.pdf"
  },

  // MOBILE DEVELOPERS
  {
    id: "11",
    name: "Rohan Deshmukh",
    email: "rohan.d@iiitb.ac.in",
    college: "IIIT Bangalore",
    branch: "Information Technology",
    cgpa: 9.0,
    skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Firebase", "REST API", "Git", "iOS", "Android"],
    experience: 2,
    projects: [
      {
        title: "Cross-Platform Food Delivery App",
        description: "Developed a complete food delivery mobile application with real-time order tracking, payment integration, push notifications, and restaurant management.",
        technologies: ["React Native", "TypeScript", "Redux", "Firebase", "Stripe"],
        duration: "5 months",
        link: "https://github.com/rohan/food-delivery"
      },
      {
        title: "Fitness Tracking App",
        description: "Built a health and fitness app with step counting, calorie tracking, workout plans, and social sharing features.",
        technologies: ["React Native", "TypeScript", "Firebase", "HealthKit"],
        duration: "3 months"
      }
    ],
    phssScore: 89,
    resume: "/resumes/rohan_deshmukh.pdf"
  },
  {
    id: "12",
    name: "Kavya Menon",
    email: "kavya.m@manipal.edu",
    college: "Manipal Institute of Technology",
    branch: "Computer Science",
    cgpa: 8.4,
    skills: ["Flutter", "Dart", "Firebase", "REST API", "Git", "Provider", "SQLite", "iOS", "Android"],
    experience: 1.5,
    projects: [
      {
        title: "E-commerce Mobile App",
        description: "Created a feature-rich e-commerce app with product catalog, cart, checkout, order history, and user reviews using Flutter.",
        technologies: ["Flutter", "Dart", "Firebase", "Provider", "Stripe"],
        duration: "4 months"
      },
      {
        title: "Expense Tracker App",
        description: "Developed a personal finance management app with budget tracking, expense categories, and visual reports.",
        technologies: ["Flutter", "Dart", "SQLite", "Charts"],
        duration: "2 months"
      }
    ],
    phssScore: 84,
    resume: "/resumes/kavya_menon.pdf"
  },

  // DEVOPS / CLOUD SPECIALISTS
  {
    id: "13",
    name: "Siddharth Rao",
    email: "sid.rao@iitk.ac.in",
    college: "IIT Kanpur",
    branch: "Computer Science",
    cgpa: 9.6,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "Linux", "Python", "Bash", "Ansible"],
    experience: 3,
    projects: [
      {
        title: "Cloud Infrastructure Automation",
        description: "Designed and implemented infrastructure-as-code solution using Terraform for multi-region AWS deployment with auto-scaling and disaster recovery.",
        technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins"],
        duration: "6 months",
        link: "https://github.com/siddharth/infra-automation"
      },
      {
        title: "CI/CD Pipeline Implementation",
        description: "Built automated deployment pipelines with GitLab CI, Docker, and Kubernetes reducing deployment time by 70%.",
        technologies: ["GitLab CI", "Docker", "Kubernetes", "Ansible"],
        duration: "3 months"
      }
    ],
    phssScore: 95,
    resume: "/resumes/siddharth_rao.pdf"
  },

  // MORE FULL STACK DEVELOPERS
  {
    id: "14",
    name: "Isha Gupta",
    email: "isha.g@dtu.ac.in",
    college: "Delhi Technological University",
    branch: "Software Engineering",
    cgpa: 8.6,
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS", "Git", "Socket.io", "AWS"],
    experience: 1,
    projects: [
      {
        title: "Collaborative Project Management Tool",
        description: "Built a Trello-like project management application with real-time collaboration, drag-and-drop boards, team chat, and file sharing.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
        duration: "5 months",
        link: "https://github.com/isha/project-mgmt"
      },
      {
        title: "Video Streaming Platform",
        description: "Developed a Netflix-style video streaming app with user authentication, video upload, streaming, and recommendation system.",
        technologies: ["React", "Node.js", "MongoDB", "AWS S3", "FFmpeg"],
        duration: "4 months"
      }
    ],
    phssScore: 86,
    resume: "/resumes/isha_gupta.pdf"
  },
  {
    id: "15",
    name: "Aman Joshi",
    email: "aman.j@nitd.ac.in",
    college: "NIT Durgapur",
    branch: "Computer Science",
    cgpa: 7.9,
    skills: ["Vue.js", "Node.js", "PostgreSQL", "Express", "JavaScript", "Nuxt.js", "TypeScript", "Git"],
    experience: 2,
    projects: [
      {
        title: "Healthcare Management System",
        description: "Developed a complete hospital management system with patient records, appointment scheduling, billing, and inventory management.",
        technologies: ["Vue.js", "Node.js", "PostgreSQL", "Express", "Nuxt.js"],
        duration: "6 months"
      },
      {
        title: "Real Estate Listing Platform",
        description: "Built a property listing website with advanced search, filters, virtual tours, and agent management.",
        technologies: ["Vue.js", "Node.js", "PostgreSQL", "Mapbox"],
        duration: "3 months"
      }
    ],
    phssScore: 80,
    resume: "/resumes/aman_joshi.pdf"
  },
  {
    id: "16",
    name: "Shreya Kulkarni",
    email: "shreya.k@coep.ac.in",
    college: "COEP Pune",
    branch: "Information Technology",
    cgpa: 8.8,
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Redux", "TypeScript", "Git", "Docker"],
    experience: 1.5,
    projects: [
      {
        title: "Job Portal Platform",
        description: "Created a comprehensive job portal with job posting, application tracking, resume parsing, company profiles, and candidate matching algorithm.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
        duration: "5 months",
        link: "https://job-portal.vercel.app"
      },
      {
        title: "Blogging Platform with CMS",
        description: "Developed a Medium-style blogging platform with rich text editor, markdown support, tags, and analytics.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Docker"],
        duration: "3 months"
      }
    ],
    phssScore: 87,
    resume: "/resumes/shreya_kulkarni.pdf"
  },

  // PYTHON/DJANGO DEVELOPERS
  {
    id: "17",
    name: "Harsh Agarwal",
    email: "harsh.a@thapar.edu",
    college: "Thapar University",
    branch: "Computer Science",
    cgpa: 8.3,
    skills: ["Python", "Django", "PostgreSQL", "REST API", "Redis", "Celery", "Docker", "Git", "AWS"],
    experience: 2,
    projects: [
      {
        title: "Learning Management System",
        description: "Built a complete LMS with course management, video lessons, quizzes, progress tracking, and certificate generation.",
        technologies: ["Django", "Python", "PostgreSQL", "Redis", "Celery"],
        duration: "5 months"
      },
      {
        title: "API Marketplace Platform",
        description: "Developed a platform for buying and selling APIs with usage tracking, billing, and API key management.",
        technologies: ["Django", "PostgreSQL", "Redis", "Stripe", "Docker"],
        duration: "4 months"
      }
    ],
    phssScore: 84,
    resume: "/resumes/harsh_agarwal.pdf"
  },
  {
    id: "18",
    name: "Pooja Yadav",
    email: "pooja.y@jiit.ac.in",
    college: "JIIT Noida",
    branch: "Computer Science",
    cgpa: 8.1,
    skills: ["Python", "Flask", "MySQL", "REST API", "JavaScript", "HTML", "CSS", "Git", "Docker"],
    experience: 1,
    projects: [
      {
        title: "Inventory Management System",
        description: "Created an inventory tracking system with barcode scanning, stock alerts, supplier management, and reporting.",
        technologies: ["Flask", "Python", "MySQL", "JavaScript", "Chart.js"],
        duration: "3 months"
      },
      {
        title: "URL Shortener Service",
        description: "Built a URL shortening service with custom aliases, analytics, QR code generation, and API access.",
        technologies: ["Flask", "MySQL", "Redis", "Docker"],
        duration: "1 month"
      }
    ],
    phssScore: 79,
    resume: "/resumes/pooja_yadav.pdf"
  },

  // MORE DATA SCIENCE
  {
    id: "19",
    name: "Nikhil Bansal",
    email: "nikhil.b@iitg.ac.in",
    college: "IIT Guwahati",
    branch: "Computer Science",
    cgpa: 9.4,
    skills: ["Python", "Data Science", "Machine Learning", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "SQL", "Tableau"],
    experience: 2,
    projects: [
      {
        title: "Customer Churn Prediction Model",
        description: "Developed a machine learning model to predict customer churn with 89% accuracy using ensemble methods and feature engineering.",
        technologies: ["Python", "Scikit-learn", "Pandas", "XGBoost", "SHAP"],
        duration: "3 months",
        link: "https://github.com/nikhil/churn-prediction"
      },
      {
        title: "Sales Forecasting System",
        description: "Built a time-series forecasting model for retail sales using ARIMA and Prophet achieving 92% forecast accuracy.",
        technologies: ["Python", "Prophet", "Pandas", "NumPy", "Tableau"],
        duration: "2 months"
      }
    ],
    phssScore: 93,
    resume: "/resumes/nikhil_bansal.pdf"
  },
  {
    id: "20",
    name: "Ritika Chopra",
    email: "ritika.c@pec.edu.in",
    college: "PEC Chandigarh",
    branch: "Information Technology",
    cgpa: 8.5,
    skills: ["Python", "Data Analysis", "Pandas", "NumPy", "SQL", "Power BI", "Excel", "Matplotlib", "Seaborn"],
    experience: 1.5,
    projects: [
      {
        title: "Financial Analytics Dashboard",
        description: "Created an interactive financial analytics dashboard with KPIs, trend analysis, and automated reporting using Power BI and Python.",
        technologies: ["Python", "Pandas", "Power BI", "SQL", "Excel"],
        duration: "3 months",
        link: "https://github.com/ritika/financial-analytics"
      },
      {
        title: "Market Basket Analysis",
        description: "Performed association rule mining on retail transaction data to identify product purchase patterns and cross-selling opportunities.",
        technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
        duration: "1 month"
      }
    ],
    phssScore: 85,
    resume: "/resumes/ritika_chopra.pdf"
  },

  // JAVA/SPRING DEVELOPERS
  {
    id: "21",
    name: "Akash Kumar",
    email: "akash.k@nits.ac.in",
    college: "NIT Silchar",
    branch: "Computer Science",
    cgpa: 7.8,
    skills: ["Java", "Spring Boot", "MySQL", "Hibernate", "REST API", "Maven", "Git", "JUnit"],
    experience: 1,
    projects: [
      {
        title: "Student Information System",
        description: "Developed a comprehensive student management system with attendance, grades, courses, and parent portal.",
        technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "Thymeleaf"],
        duration: "4 months"
      },
      {
        title: "Hotel Booking API",
        description: "Built a RESTful API for hotel reservations with room management, booking, payment processing, and email notifications.",
        technologies: ["Spring Boot", "MySQL", "JWT", "JavaMail"],
        duration: "2 months"
      }
    ],
    phssScore: 76,
    resume: "/resumes/akash_kumar.pdf"
  },
  {
    id: "22",
    name: "Tanvi Shah",
    email: "tanvi.s@srmist.edu.in",
    college: "SRM Institute of Technology",
    branch: "Computer Science",
    cgpa: 8.9,
    skills: ["Java", "Spring Boot", "MongoDB", "Kafka", "Microservices", "Docker", "Kubernetes", "AWS"],
    experience: 2.5,
    projects: [
      {
        title: "Event-Driven Microservices Architecture",
        description: "Architected an event-driven system using Kafka for order processing with separate microservices for inventory, payment, and notifications.",
        technologies: ["Java", "Spring Boot", "Kafka", "MongoDB", "Docker"],
        duration: "6 months"
      },
      {
        title: "Payment Gateway Integration Service",
        description: "Developed a unified payment service integrating multiple payment providers with transaction management and webhooks.",
        technologies: ["Spring Boot", "MySQL", "Stripe", "Razorpay", "AWS"],
        duration: "3 months"
      }
    ],
    phssScore: 90,
    resume: "/resumes/tanvi_shah.pdf"
  },

  // ADDITIONAL HIGH-QUALITY CANDIDATES (23-72)
  {
    id: "23",
    name: "Aarav Mehta",
    email: "aarav.m@iitd.ac.in",
    college: "IIT Delhi",
    branch: "Computer Science",
    cgpa: 9.1,
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "GraphQL", "AWS", "Docker"],
    experience: 2,
    projects: [
      {
        title: "GraphQL API for Multi-tenant SaaS",
        description: "Built a scalable GraphQL API with tenant isolation, subscription-based billing, and real-time updates.",
        technologies: ["Node.js", "GraphQL", "MongoDB", "Apollo", "AWS"],
        duration: "5 months"
      }
    ],
    phssScore: 88,
    resume: "/resumes/aarav_mehta.pdf"
  },
  {
    id: "24",
    name: "Ishaan Kapoor",
    email: "ishaan.k@iitb.ac.in",
    college: "IIT Bombay",
    branch: "Computer Science",
    cgpa: 9.4,
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker", "AWS", "REST API"],
    experience: 2.5,
    projects: [
      {
        title: "High-Performance CMS Backend",
        description: "Developed a content management system backend handling 50K+ daily active users with caching and optimization.",
        technologies: ["Django", "PostgreSQL", "Redis", "Celery", "AWS"],
        duration: "4 months"
      }
    ],
    phssScore: 92,
    resume: "/resumes/ishaan_kapoor.pdf"
  },
  {
    id: "25",
    name: "Saanvi Sharma",
    email: "saanvi.s@bits.edu",
    college: "BITS Pilani",
    branch: "Information Technology",
    cgpa: 8.7,
    skills: ["React", "Redux", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "Git"],
    experience: 1.5,
    projects: [
      {
        title: "E-commerce Storefront with Next.js",
        description: "Created a high-performance e-commerce frontend with SSR, SEO optimization, and perfect Lighthouse scores.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        duration: "3 months"
      }
    ],
    phssScore: 86,
    resume: "/resumes/saanvi_sharma.pdf"
  },
  {
    id: "26",
    name: "Anika Gupta",
    email: "anika.g@nitt.ac.in",
    college: "NIT Trichy",
    branch: "Computer Science",
    cgpa: 8.5,
    skills: ["Angular", "TypeScript", "Node.js", "MongoDB", "RxJS", "NgRx", "Git"],
    experience: 2,
    projects: [
      {
        title: "HR Management System",
        description: "Built a complete HR system with employee management, payroll, leave tracking, and performance reviews.",
        technologies: ["Angular", "Node.js", "MongoDB", "NgRx"],
        duration: "5 months"
      }
    ],
    phssScore: 84,
    resume: "/resumes/anika_gupta.pdf"
  },
  {
    id: "27",
    name: "Vivaan Rao",
    email: "vivaan.r@iiith.ac.in",
    college: "IIIT Hyderabad",
    branch: "Computer Science",
    cgpa: 9.2,
    skills: ["Python", "Machine Learning", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy"],
    experience: 1.5,
    projects: [
      {
        title: "Medical Image Classification",
        description: "Developed a deep learning model for detecting diseases from X-ray images with 93% accuracy.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
        duration: "4 months"
      }
    ],
    phssScore: 91,
    resume: "/resumes/vivaan_rao.pdf"
  },
  {
    id: "28",
    name: "Diya Patel",
    email: "diya.p@vit.ac.in",
    college: "VIT Vellore",
    branch: "Computer Science",
    cgpa: 8.3,
    skills: ["React Native", "JavaScript", "Firebase", "Redux", "REST API", "Git"],
    experience: 1,
    projects: [
      {
        title: "Social Networking Mobile App",
        description: "Created a social media app with posts, stories, messaging, and real-time notifications.",
        technologies: ["React Native", "Firebase", "Redux"],
        duration: "4 months"
      }
    ],
    phssScore: 82,
    resume: "/resumes/diya_patel.pdf"
  },
  {
    id: "29",
    name: "Krishna Nair",
    email: "krishna.n@nitk.ac.in",
    college: "NIT Karnataka",
    branch: "Computer Science",
    cgpa: 9.0,
    skills: ["Java", "Spring Boot", "MySQL", "Microservices", "Docker", "Kubernetes", "AWS"],
    experience: 3,
    projects: [
      {
        title: "Distributed Order Management System",
        description: "Architected a microservices-based order management system with event sourcing and CQRS pattern.",
        technologies: ["Java", "Spring Boot", "Kafka", "MySQL", "Docker"],
        duration: "6 months"
      }
    ],
    phssScore: 89,
    resume: "/resumes/krishna_nair.pdf"
  },
  {
    id: "30",
    name: "Kabir Singh",
    email: "kabir.s@iitm.ac.in",
    college: "IIT Madras",
    branch: "Computer Science",
    cgpa: 9.5,
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins", "Python", "Bash", "Ansible"],
    experience: 3,
    projects: [
      {
        title: "Multi-Cloud Infrastructure Platform",
        description: "Built infrastructure automation for AWS, Azure, and GCP with Terraform and service mesh implementation.",
        technologies: ["Terraform", "AWS", "Kubernetes", "Istio"],
        duration: "7 months"
      }
    ],
    phssScore: 94,
    resume: "/resumes/kabir_singh.pdf"
  },
    
  // Continue with 30 more quality candidates (31-60) with varied skills [FIXED NAMES]
  ...[
    {
      id: "31",
      name: "Varun Gupta",
      email: "varun.gupta@college.edu",
      college: "IIT Delhi",
      branch: "Computer Science",
      cgpa: 8,
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript", "Git"],
      experience: 0,
      projects: [{ title: "Production Project for Varun Gupta", description: "Enterprise-grade application using React and Node.js with advanced features, optimization, and deployment.", technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript"], duration: "3 months", link: "https://github.com/varun/project" }],
      phssScore: 70,
      resume: "/resumes/varun_gupta.pdf"
    },
    {
      id: "32",
      name: "Sunita Kumar",
      email: "sunita.kumar@college.edu",
      college: "IIT Bombay",
      branch: "Information Technology",
      cgpa: 8.08,
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS"],
      experience: 1,
      projects: [{ title: "Production Project for Sunita Kumar", description: "Enterprise-grade application using Python and Django with advanced features, optimization, and deployment.", technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"], duration: "4 months", link: "https://github.com/sunita/project" }],
      phssScore: 71,
      resume: "/resumes/sunita_kumar.pdf"
    },
    {
      id: "33",
      name: "Mohan Sharma",
      email: "mohan.sharma@college.edu",
      college: "BITS Pilani",
      branch: "Software Engineering",
      cgpa: 8.16,
      skills: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"],
      experience: 2,
      projects: [{ title: "Production Project for Mohan Sharma", description: "Enterprise-grade application using Java and Spring Boot with advanced features, optimization, and deployment.", technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"], duration: "5 months", link: "https://github.com/mohan/project" }],
      phssScore: 72,
      resume: "/resumes/mohan_sharma.pdf"
    },
    {
      id: "34",
      name: "Kavita Patel",
      email: "kavita.patel@college.edu",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 8.24,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      experience: 3,
      projects: [{ title: "Production Project for Kavita Patel", description: "Enterprise-grade application using React and TypeScript with advanced features, optimization, and deployment.", technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"], duration: "6 months", link: "https://github.com/kavita/project" }],
      phssScore: 73,
      resume: "/resumes/kavita_patel.pdf"
    },
    {
      id: "35",
      name: "Suresh Reddy",
      email: "suresh.reddy@college.edu",
      college: "IIIT Hyderabad",
      branch: "Information Technology",
      cgpa: 8.32,
      skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"],
      experience: 0,
      projects: [{ title: "Production Project for Suresh Reddy", description: "Enterprise-grade application using Python and Machine Learning with advanced features, optimization, and deployment.", technologies: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"], duration: "3 months", link: "https://github.com/suresh/project" }],
      phssScore: 74,
      resume: "/resumes/suresh_reddy.pdf"
    },
    {
      id: "36",
      name: "Geeta Iyer",
      email: "geeta.iyer@college.edu",
      college: "VIT Vellore",
      branch: "Software Engineering",
      cgpa: 8.4,
      skills: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"],
      experience: 1,
      projects: [{ title: "Production Project for Geeta Iyer", description: "Enterprise-grade application using Angular and TypeScript with advanced features, optimization, and deployment.", technologies: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"], duration: "4 months", link: "https://github.com/geeta/project" }],
      phssScore: 75,
      resume: "/resumes/geeta_iyer.pdf"
    },
    {
      id: "37",
      name: "Deepak Kapoor",
      email: "deepak.kapoor@college.edu",
      college: "IIT Delhi",
      branch: "Computer Science",
      cgpa: 8.48,
      skills: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"],
      experience: 2,
      projects: [{ title: "Production Project for Deepak Kapoor", description: "Enterprise-grade application using Vue.js and JavaScript with advanced features, optimization, and deployment.", technologies: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"], duration: "5 months", link: "https://github.com/deepak/project" }],
      phssScore: 76,
      resume: "/resumes/deepak_kapoor.pdf"
    },
    {
      id: "38",
      name: "Meena Bansal",
      email: "meena.bansal@college.edu",
      college: "IIT Bombay",
      branch: "Information Technology",
      cgpa: 8.56,
      skills: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"],
      experience: 3,
      projects: [{ title: "Production Project for Meena Bansal", description: "Enterprise-grade application using Flutter and Dart with advanced features, optimization, and deployment.", technologies: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"], duration: "6 months", link: "https://github.com/meena/project" }],
      phssScore: 77,
      resume: "/resumes/meena_bansal.pdf"
    },
    {
      id: "39",
      name: "Sameer Agarwal",
      email: "sameer.agarwal@college.edu",
      college: "BITS Pilani",
      branch: "Software Engineering",
      cgpa: 8.64,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      experience: 0,
      projects: [{ title: "Production Project for Sameer Agarwal", description: "Enterprise-grade application using AWS and Docker with advanced features, optimization, and deployment.", technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"], duration: "3 months", link: "https://github.com/sameer/project" }],
      phssScore: 78,
      resume: "/resumes/sameer_agarwal.pdf"
    },
    {
      id: "40",
      name: "Rina Joshi",
      email: "rina.joshi@college.edu",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 8.72,
      skills: ["React Native", "JavaScript", "Redux", "Firebase"],
      experience: 1,
      projects: [{ title: "Production Project for Rina Joshi", description: "Enterprise-grade application using React Native and JavaScript with advanced features, optimization, and deployment.", technologies: ["React Native", "JavaScript", "Redux", "Firebase"], duration: "4 months", link: "https://github.com/rina/project" }],
      phssScore: 79,
      resume: "/resumes/rina_joshi.pdf"
    },
    {
      id: "41",
      name: "Vijay Kulkarni",
      email: "vijay.kulkarni@college.edu",
      college: "IIIT Hyderabad",
      branch: "Information Technology",
      cgpa: 8.8,
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript", "Git"],
      experience: 2,
      projects: [{ title: "Production Project for Vijay Kulkarni", description: "Enterprise-grade application using React and Node.js with advanced features, optimization, and deployment.", technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript"], duration: "5 months", link: "https://github.com/vijay/project" }],
      phssScore: 80,
      resume: "/resumes/vijay_kulkarni.pdf"
    },
    {
      id: "42",
      name: "Tina Mehta",
      email: "tina.mehta@college.edu",
      college: "VIT Vellore",
      branch: "Software Engineering",
      cgpa: 8.88,
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS"],
      experience: 3,
      projects: [{ title: "Production Project for Tina Mehta", description: "Enterprise-grade application using Python and Django with advanced features, optimization, and deployment.", technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"], duration: "6 months", link: "https://github.com/tina/project" }],
      phssScore: 81,
      resume: "/resumes/tina_mehta.pdf"
    },
    {
      id: "43",
      name: "Anand Rao",
      email: "anand.rao@college.edu",
      college: "IIT Delhi",
      branch: "Computer Science",
      cgpa: 8.96,
      skills: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"],
      experience: 0,
      projects: [{ title: "Production Project for Anand Rao", description: "Enterprise-grade application using Java and Spring Boot with advanced features, optimization, and deployment.", technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"], duration: "3 months", link: "https://github.com/anand/project" }],
      phssScore: 82,
      resume: "/resumes/anand_rao.pdf"
    },
    {
      id: "44",
      name: "Pooja Nair",
      email: "pooja.nair@college.edu",
      college: "IIT Bombay",
      branch: "Information Technology",
      cgpa: 9.04,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      experience: 1,
      projects: [{ title: "Production Project for Pooja Nair", description: "Enterprise-grade application using React and TypeScript with advanced features, optimization, and deployment.", technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"], duration: "4 months", link: "https://github.com/pooja/project" }],
      phssScore: 83,
      resume: "/resumes/pooja_nair.pdf"
    },
    {
      id: "45",
      name: "Rajesh Menon",
      email: "rajesh.menon@college.edu",
      college: "BITS Pilani",
      branch: "Software Engineering",
      cgpa: 9.12,
      skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"],
      experience: 2,
      projects: [{ title: "Production Project for Rajesh Menon", description: "Enterprise-grade application using Python and Machine Learning with advanced features, optimization, and deployment.", technologies: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"], duration: "5 months", link: "https://github.com/rajesh/project" }],
      phssScore: 84,
      resume: "/resumes/rajesh_menon.pdf"
    },
    {
      id: "46",
      name: "Neha Deshmukh",
      email: "neha.deshmukh@college.edu",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 9.2,
      skills: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"],
      experience: 3,
      projects: [{ title: "Production Project for Neha Deshmukh", description: "Enterprise-grade application using Angular and TypeScript with advanced features, optimization, and deployment.", technologies: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"], duration: "6 months", link: "https://github.com/neha/project" }],
      phssScore: 85,
      resume: "/resumes/neha_deshmukh.pdf"
    },
    {
      id: "47",
      name: "Sandeep Shah",
      email: "sandeep.shah@college.edu",
      college: "IIIT Hyderabad",
      branch: "Information Technology",
      cgpa: 9.28,
      skills: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"],
      experience: 0,
      projects: [{ title: "Production Project for Sandeep Shah", description: "Enterprise-grade application using Vue.js and JavaScript with advanced features, optimization, and deployment.", technologies: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"], duration: "3 months", link: "https://github.com/sandeep/project" }],
      phssScore: 86,
      resume: "/resumes/sandeep_shah.pdf"
    },
    {
      id: "48",
      name: "Priya Chopra",
      email: "priya.chopra@college.edu",
      college: "VIT Vellore",
      branch: "Software Engineering",
      cgpa: 9.36,
      skills: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"],
      experience: 1,
      projects: [{ title: "Production Project for Priya Chopra", description: "Enterprise-grade application using Flutter and Dart with advanced features, optimization, and deployment.", technologies: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"], duration: "4 months", link: "https://github.com/priya/project" }],
      phssScore: 87,
      resume: "/resumes/priya_chopra.pdf"
    },
    {
      id: "49",
      name: "Pravin Kumar",
      email: "pravin.kumar@college.edu",
      college: "IIT Delhi",
      branch: "Computer Science",
      cgpa: 9.44,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      experience: 2,
      projects: [{ title: "Production Project for Pravin Kumar", description: "Enterprise-grade application using AWS and Docker with advanced features, optimization, and deployment.", technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"], duration: "5 months", link: "https://github.com/pravin/project" }],
      phssScore: 88,
      resume: "/resumes/pravin_kumar.pdf"
    },
    {
      id: "50",
      name: "Anjali Sharma",
      email: "anjali.sharma@college.edu",
      college: "IIT Bombay",
      branch: "Information Technology",
      cgpa: 9.52,
      skills: ["React Native", "JavaScript", "Redux", "Firebase"],
      experience: 3,
      projects: [{ title: "Production Project for Anjali Sharma", description: "Enterprise-grade application using React Native and JavaScript with advanced features, optimization, and deployment.", technologies: ["React Native", "JavaScript", "Redux", "Firebase"], duration: "6 months", link: "https://github.com/anjali/project" }],
      phssScore: 89,
      resume: "/resumes/anjali_sharma.pdf"
    },
    {
      id: "51",
      name: "Chetan Gupta",
      email: "chetan.gupta@college.edu",
      college: "BITS Pilani",
      branch: "Software Engineering",
      cgpa: 8.0,
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript", "Git"],
      experience: 0,
      projects: [{ title: "Production Project for Chetan Gupta", description: "Enterprise-grade application using React and Node.js with advanced features, optimization, and deployment.", technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript"], duration: "3 months", link: "https://github.com/chetan/project" }],
      phssScore: 90,
      resume: "/resumes/chetan_gupta.pdf"
    },
    {
      id: "52",
      name: "Swati Verma",
      email: "swati.verma@college.edu",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 8.08,
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS"],
      experience: 1,
      projects: [{ title: "Production Project for Swati Verma", description: "Enterprise-grade application using Python and Django with advanced features, optimization, and deployment.", technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"], duration: "4 months", link: "https://github.com/swati/project" }],
      phssScore: 91,
      resume: "/resumes/swati_verma.pdf"
    },
    {
      id: "53",
      name: "Gaurav Singh",
      email: "gaurav.singh@college.edu",
      college: "IIIT Hyderabad",
      branch: "Information Technology",
      cgpa: 8.16,
      skills: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"],
      experience: 2,
      projects: [{ title: "Production Project for Gaurav Singh", description: "Enterprise-grade application using Java and Spring Boot with advanced features, optimization, and deployment.", technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "Microservices"], duration: "5 months", link: "https://github.com/gaurav/project" }],
      phssScore: 92,
      resume: "/resumes/gaurav_singh.pdf"
    },
    {
      id: "54",
      name: "Jyoti Patel",
      email: "jyoti.patel@college.edu",
      college: "VIT Vellore",
      branch: "Software Engineering",
      cgpa: 8.24,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      experience: 3,
      projects: [{ title: "Production Project for Jyoti Patel", description: "Enterprise-grade application using React and TypeScript with advanced features, optimization, and deployment.", technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"], duration: "6 months", link: "https://github.com/jyoti/project" }],
      phssScore: 93,
      resume: "/resumes/jyoti_patel.pdf"
    },
    {
      id: "55",
      name: "Nitin Reddy",
      email: "nitin.reddy@college.edu",
      college: "IIT Delhi",
      branch: "Computer Science",
      cgpa: 8.32,
      skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"],
      experience: 0,
      projects: [{ title: "Production Project for Nitin Reddy", description: "Enterprise-grade application using Python and Machine Learning with advanced features, optimization, and deployment.", technologies: ["Python", "Machine Learning", "TensorFlow", "Pandas", "NumPy"], duration: "3 months", link: "https://github.com/nitin/project" }],
      phssScore: 94,
      resume: "/resumes/nitin_reddy.pdf"
    },
    {
      id: "56",
      name: "Smita Iyer",
      email: "smita.iyer@college.edu",
      college: "IIT Bombay",
      branch: "Information Technology",
      cgpa: 8.4,
      skills: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"],
      experience: 1,
      projects: [{ title: "Production Project for Smita Iyer", description: "Enterprise-grade application using Angular and TypeScript with advanced features, optimization, and deployment.", technologies: ["Angular", "TypeScript", "RxJS", "NgRx", "Node.js"], duration: "4 months", link: "https://github.com/smita/project" }],
      phssScore: 70,
      resume: "/resumes/smita_iyer.pdf"
    },
    {
      id: "57",
      name: "Rohan Kapoor",
      email: "rohan.kapoor@college.edu",
      college: "BITS Pilani",
      branch: "Software Engineering",
      cgpa: 8.48,
      skills: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"],
      experience: 2,
      projects: [{ title: "Production Project for Rohan Kapoor", description: "Enterprise-grade application using Vue.js and JavaScript with advanced features, optimization, and deployment.", technologies: ["Vue.js", "JavaScript", "Node.js", "PostgreSQL", "Express"], duration: "5 months", link: "https://github.com/rohan/project" }],
      phssScore: 71,
      resume: "/resumes/rohan_kapoor.pdf"
    },
    {
      id: "58",
      name: "Lata Bansal",
      email: "lata.bansal@college.edu",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 8.56,
      skills: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"],
      experience: 3,
      projects: [{ title: "Production Project for Lata Bansal", description: "Enterprise-grade application using Flutter and Dart with advanced features, optimization, and deployment.", technologies: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"], duration: "6 months", link: "https://github.com/lata/project" }],
      phssScore: 72,
      resume: "/resumes/lata_bansal.pdf"
    },
    {
      id: "59",
      name: "Aditya Agarwal",
      email: "aditya.agarwal@college.edu",
      college: "IIIT Hyderabad",
      branch: "Information Technology",
      cgpa: 8.64,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      experience: 0,
      projects: [{ title: "Production Project for Aditya Agarwal", description: "Enterprise-grade application using AWS and Docker with advanced features, optimization, and deployment.", technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"], duration: "3 months", link: "https://github.com/aditya/project" }],
      phssScore: 73,
      resume: "/resumes/aditya_agarwal.pdf"
    },
    {
      id: "60",
      name: "Usha Joshi",
      email: "usha.joshi@college.edu",
      college: "VIT Vellore",
      branch: "Software Engineering",
      cgpa: 8.72,
      skills: ["React Native", "JavaScript", "Redux", "Firebase"],
      experience: 1,
      projects: [{ title: "Production Project for Usha Joshi", description: "Enterprise-grade application using React Native and JavaScript with advanced features, optimization, and deployment.", technologies: ["React Native", "JavaScript", "Redux", "Firebase"], duration: "4 months", link: "https://github.com/usha/project" }],
      phssScore: 74,
      resume: "/resumes/usha_joshi.pdf"
    }
  ],

  // Last 12 candidates (61-72) - Premium quality
  {
    id: "61",
    name: "Aditi Sharma",
    email: "aditi.s@iitd.ac.in",
    college: "IIT Delhi",
    branch: "Computer Science",
    cgpa: 9.6,
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "GraphQL", "AWS", "Docker", "Microservices"],
    experience: 3,
    projects: [
      {
        title: "Enterprise SaaS Platform",
        description: "Led development of a multi-tenant SaaS platform serving 10K+ businesses with microservices architecture.",
        technologies: ["React", "Node.js", "GraphQL", "MongoDB", "AWS", "Docker"],
        duration: "8 months"
      }
    ],
    phssScore: 96,
    resume: "/resumes/aditi_sharma.pdf"
  },
  {
    id: "62",
    name: "Aryan Patel",
    email: "aryan.p@iitb.ac.in",
    college: "IIT Bombay",
    branch: "Computer Science",
    cgpa: 9.7,
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "AWS", "Docker"],
    experience: 2.5,
    projects: [
      {
        title: "AI-Powered Chatbot Platform",
        description: "Developed an NLP-based chatbot platform using transformers and BERT achieving 95% accuracy.",
        technologies: ["Python", "PyTorch", "Transformers", "FastAPI", "AWS"],
        duration: "6 months"
      }
    ],
    phssScore: 97,
    resume: "/resumes/aryan_patel.pdf"
  },
  {
    id: "63",
    name: "Zara Khan",
    email: "zara.k@bits.edu",
    college: "BITS Pilani",
    branch: "Computer Science",
    cgpa: 9.3,
    skills: ["Java", "Spring Boot", "Microservices", "Kafka", "PostgreSQL", "Docker", "Kubernetes"],
    experience: 3,
    projects: [
      {
        title: "Real-time Analytics Platform",
        description: "Built a real-time data processing platform handling millions of events per day using Kafka streams.",
        technologies: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
        duration: "7 months"
      }
    ],
    phssScore: 94,
    resume: "/resumes/zara_khan.pdf"
  },
  {
    id: "64",
    name: "Ravi Kumar",
    email: "ravi.k@nitt.ac.in",
    college: "NIT Trichy",
    branch: "Computer Science",
    cgpa: 9.2,
    skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
    experience: 2,
    projects: [
      {
        title: "High-Traffic News Portal",
        description: "Developed a news portal with SSR handling 1M+ monthly visitors with CDN and caching optimization.",
        technologies: ["Next.js", "React", "PostgreSQL", "AWS", "CloudFront"],
        duration: "5 months"
      }
    ],
    phssScore: 91,
    resume: "/resumes/ravi_kumar.pdf"
  },
  {
    id: "65",
    name: "Maya Reddy",
    email: "maya.r@iiith.ac.in",
    college: "IIIT Hyderabad",
    branch: "Computer Science",
    cgpa: 9.4,
    skills: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    experience: 2.5,
    projects: [
      {
        title: "High-Performance API Platform",
        description: "Created a FastAPI-based platform with 10K+ req/sec throughput using async programming and caching.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
        duration: "4 months"
      }
    ],
    phssScore: 93,
    resume: "/resumes/maya_reddy.pdf"
  },
  {
    id: "66",
    name: "Arjun Verma",
    email: "arjun.v@vit.ac.in",
    college: "VIT Vellore",
    branch: "Computer Science",
    cgpa: 8.9,
    skills: ["React Native", "TypeScript", "Node.js", "MongoDB", "Firebase", "AWS"],
    experience: 2,
    projects: [
      {
        title: "Fintech Mobile Application",
        description: "Developed a secure fintech app with biometric authentication, UPI integration, and transaction tracking.",
        technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
        duration: "6 months"
      }
    ],
    phssScore: 90,
    resume: "/resumes/arjun_verma.pdf"
  },
  {
    id: "67",
    name: "Sanya Iyer",
    email: "sanya.i@nitk.ac.in",
    college: "NIT Karnataka",
    branch: "Computer Science",
    cgpa: 9.1,
    skills: ["Angular", "TypeScript", "Node.js", "PostgreSQL", "NgRx", "RxJS", "Docker"],
    experience: 2.5,
    projects: [
      {
        title: "Banking Dashboard Application",
        description: "Built a comprehensive banking dashboard with real-time transactions, analytics, and reporting.",
        technologies: ["Angular", "TypeScript", "Node.js", "PostgreSQL", "NgRx"],
        duration: "6 months"
      }
    ],
    phssScore: 89,
    resume: "/resumes/sanya_iyer.pdf"
  },
  {
    id: "68",
    name: "Karan Joshi",
    email: "karan.j@iitm.ac.in",
    college: "IIT Madras",
    branch: "Computer Science",
    cgpa: 9.5,
    skills: ["Python", "Data Science", "Machine Learning", "SQL", "Tableau", "AWS", "Spark"],
    experience: 2,
    projects: [
      {
        title: "Big Data Analytics Platform",
        description: "Developed a big data analytics platform processing terabytes of data using Spark and machine learning.",
        technologies: ["Python", "Spark", "SQL", "Tableau", "AWS"],
        duration: "7 months"
      }
    ],
    phssScore: 94,
    resume: "/resumes/karan_joshi.pdf"
  },
  {
    id: "69",
    name: "Neha Kapoor",
    email: "neha.k@iitk.ac.in",
    college: "IIT Kanpur",
    branch: "Computer Science",
    cgpa: 9.3,
    skills: ["React", "Node.js", "GraphQL", "MongoDB", "AWS", "Docker", "TypeScript"],
    experience: 2,
    projects: [
      {
        title: "GraphQL Federation Gateway",
        description: "Implemented a federated GraphQL gateway connecting 10+ microservices with unified API.",
        technologies: ["Node.js", "GraphQL", "Apollo Federation", "MongoDB"],
        duration: "5 months"
      }
    ],
    phssScore: 92,
    resume: "/resumes/neha_kapoor.pdf"
  },
  {
    id: "70",
    name: "Dev Malhotra",
    email: "dev.m@iitg.ac.in",
    college: "IIT Guwahati",
    branch: "Computer Science",
    cgpa: 9.6,
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "Python", "Ansible", "Jenkins"],
    experience: 3,
    projects: [
      {
        title: "Cloud Cost Optimization Platform",
        description: "Built an automated cost optimization platform reducing AWS bills by 40% using ML predictions.",
        technologies: ["AWS", "Python", "Terraform", "Kubernetes"],
        duration: "6 months"
      }
    ],
    phssScore: 95,
    resume: "/resumes/dev_malhotra.pdf"
  },
  {
    id: "71",
    name: "Tara Singh",
    email: "tara.s@pec.edu.in",
    college: "PEC Chandigarh",
    branch: "Computer Science",
    cgpa: 8.8,
    skills: ["Flutter", "Dart", "Firebase", "Node.js", "MongoDB", "REST API"],
    experience: 1.5,
    projects: [
      {
        title: "Healthcare Appointment App",
        description: "Created a doctor appointment booking app with telemedicine, prescription management, and reminders.",
        technologies: ["Flutter", "Dart", "Firebase", "Node.js"],
        duration: "5 months"
      }
    ],
    phssScore: 87,
    resume: "/resumes/tara_singh.pdf"
  },
  {
    id: "72",
    name: "Rohan Khanna",
    email: "rohan.k@nitd.ac.in",
    college: "NIT Durgapur",
    branch: "Computer Science",
    cgpa: 9.0,
    skills: ["Java", "Spring Boot", "Microservices", "MySQL", "Docker", "Kubernetes", "AWS"],
    experience: 2.5,
    projects: [
      {
        title: "E-commerce Microservices Platform",
        description: "Architected a complete e-commerce platform with 15+ microservices handling 100K+ daily orders.",
        technologies: ["Java", "Spring Boot", "MySQL", "Kafka", "Docker"],
        duration: "8 months"
      }
    ],
    phssScore: 90,
    resume: "/resumes/rohan_khanna.pdf"
  }
];