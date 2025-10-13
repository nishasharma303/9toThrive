// src/data/mockCandidates.ts

import { CandidateProfile } from '@/pages/Recruitment/types/matching.types';

export const mockCandidates: CandidateProfile[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@iitd.ac.in",
    college: "IIT Delhi",
    branch: "Computer Science",
    cgpa: 9.2,
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express", "HTML", "CSS", "Git"],
    experience: 0,
    projects: [
      {
        title: "E-commerce Website",
        description: "Built a full-stack e-commerce application using MERN stack with user authentication, product catalog, shopping cart, and payment integration using Razorpay.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
        duration: "3 months",
        link: "https://github.com/priya/ecommerce"
      },
      {
        title: "Todo App with Authentication",
        description: "Developed a task management application with user login, CRUD operations, and responsive design.",
        technologies: ["React", "Node.js", "MongoDB", "CSS"],
        duration: "1 month"
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
    skills: ["DSA", "Java", "Spring Boot", "MySQL", "Problem Solving", "OOP"],
    experience: 0.5,
    projects: [
      {
        title: "Library Management System",
        description: "Created a library management system with book issuing, returning, fine calculation, and admin dashboard using Spring Boot and MySQL.",
        technologies: ["Java", "Spring Boot", "MySQL", "Bootstrap"],
        duration: "2 months",
        link: "https://github.com/rahul/library-system"
      },
      {
        title: "DSA Problem Tracker",
        description: "Built a web app to track DSA problems solved across different platforms like LeetCode, CodeForces with progress analytics.",
        technologies: ["Java", "Spring Boot", "MySQL"],
        duration: "1 month"
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
    skills: ["UI/UX Design", "Figma", "React", "JavaScript", "HTML", "CSS", "Responsive Design"],
    experience: 0,
    projects: [
      {
        title: "Portfolio Website Builder",
        description: "Designed and developed a drag-and-drop portfolio website builder with pre-made templates and customization options.",
        technologies: ["React", "JavaScript", "CSS", "Figma"],
        duration: "2 months",
        link: "https://portfolio-builder.vercel.app"
      },
      {
        title: "Restaurant Landing Page",
        description: "Created a modern, responsive landing page for a restaurant with online menu and reservation form.",
        technologies: ["HTML", "CSS", "JavaScript", "Figma"],
        duration: "2 weeks"
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
    skills: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    experience: 0,
    projects: [
      {
        title: "House Price Prediction",
        description: "Developed a machine learning model to predict house prices using regression algorithms. Achieved 85% accuracy on test dataset.",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
        duration: "2 months",
        link: "https://github.com/vikram/house-price-ml"
      },
      {
        title: "Sales Data Analysis Dashboard",
        description: "Analyzed sales data and created interactive visualizations to identify trends and insights using Python libraries.",
        technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        duration: "1 month"
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
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "Express", "REST API", "Git"],
    experience: 0,
    projects: [
      {
        title: "Blog Platform",
        description: "Created a full-stack blogging platform with user authentication, post creation, comments, and like features using MERN stack.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
        duration: "3 months",
        link: "https://github.com/sneha/blog-platform"
      },
      {
        title: "Weather Dashboard",
        description: "Built a weather application that fetches real-time weather data using API integration with search functionality.",
        technologies: ["React", "JavaScript", "REST API", "CSS"],
        duration: "2 weeks"
      }
    ],
    phssScore: 88,
    resume: "/resumes/sneha_patel.pdf"
  },
  {
    id: "6",
    name: "Arjun Mehta",
    email: "arjun.m@vit.ac.in",
    college: "VIT Vellore",
    branch: "Computer Science",
    cgpa: 8.5,
    skills: ["JavaScript", "HTML", "CSS", "React", "Git", "Bootstrap"],
    experience: 0,
    projects: [
      {
        title: "Calculator App",
        description: "Developed a scientific calculator web application with basic and advanced mathematical operations.",
        technologies: ["JavaScript", "HTML", "CSS"],
        duration: "1 week"
      },
      {
        title: "Movie Search App",
        description: "Created a movie search application using OMDB API with details display and responsive design.",
        technologies: ["React", "JavaScript", "CSS", "Bootstrap"],
        duration: "2 weeks"
      }
    ],
    phssScore: 75,
    resume: "/resumes/arjun_mehta.pdf"
  },
  {
    id: "7",
    name: "Meera Krishnan",
    email: "meera.k@anna.edu",
    college: "Anna University",
    branch: "Information Technology",
    cgpa: 8.2,
    skills: ["Python", "Django", "HTML", "CSS", "JavaScript", "MySQL"],
    experience: 0,
    projects: [
      {
        title: "Student Management System",
        description: "Built a student management system with attendance tracking, grade management, and report generation using Django.",
        technologies: ["Python", "Django", "MySQL", "Bootstrap"],
        duration: "2 months"
      },
      {
        title: "Personal Portfolio",
        description: "Created a personal portfolio website showcasing projects and skills with contact form.",
        technologies: ["HTML", "CSS", "JavaScript"],
        duration: "1 week"
      }
    ],
    phssScore: 70,
    resume: "/resumes/meera_krishnan.pdf"
  },
  {
    id: "8",
    name: "Karthik Iyer",
    email: "karthik@nitk.ac.in",
    college: "NIT Karnataka",
    branch: "Computer Science",
    cgpa: 9.1,
    skills: ["DSA", "C++", "Python", "Problem Solving", "Competitive Programming", "Algorithms"],
    experience: 0,
    projects: [
      {
        title: "Coding Contest Platform",
        description: "Developed a competitive programming platform with problem submission, automated testing, and leaderboard system.",
        technologies: ["Python", "Django", "MySQL", "C++"],
        duration: "3 months",
        link: "https://github.com/karthik/coding-platform"
      },
      {
        title: "Algorithm Visualizer",
        description: "Created a web application to visualize sorting and searching algorithms step-by-step.",
        technologies: ["JavaScript", "HTML", "CSS"],
        duration: "2 weeks"
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
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Express", "Git"],
    experience: 0.5,
    projects: [
      {
        title: "Task Management App",
        description: "Built a collaborative task management application with team features, deadline tracking, and priority settings using TypeScript.",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        duration: "3 months",
        link: "https://github.com/aditya/task-manager"
      },
      {
        title: "Expense Tracker",
        description: "Developed an expense tracking application with category-wise spending analysis and monthly reports.",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        duration: "1 month"
      }
    ],
    phssScore: 91,
    resume: "/resumes/aditya_kapoor.pdf"
  },
  {
    id: "10",
    name: "Divya Nair",
    email: "divya.n@nitw.ac.in",
    college: "NIT Warangal",
    branch: "Computer Science",
    cgpa: 8.7,
    skills: ["Python", "Data Analysis", "Pandas", "NumPy", "Excel", "SQL", "Data Visualization"],
    experience: 0,
    projects: [
      {
        title: "COVID-19 Data Analysis",
        description: "Analyzed COVID-19 dataset to identify trends, create visualizations, and predict future cases using Python libraries.",
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
        duration: "1 month",
        link: "https://github.com/divya/covid-analysis"
      },
      {
        title: "E-commerce Sales Dashboard",
        description: "Created an interactive dashboard to analyze e-commerce sales data with insights on revenue, products, and regions.",
        technologies: ["Python", "Pandas", "Plotly", "SQL"],
        duration: "2 weeks"
      }
    ],
    phssScore: 84,
    resume: "/resumes/divya_nair.pdf"
  },
  {
    id: "11",
    name: "Rohan Deshmukh",
    email: "rohan.d@iiitb.ac.in",
    college: "IIIT Bangalore",
    branch: "Information Technology",
    cgpa: 9.0,
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JavaScript", "Postman"],
    experience: 0.5,
    projects: [
      {
        title: "RESTful API for E-commerce",
        description: "Developed a complete backend REST API for e-commerce with user management, product catalog, cart, and order processing.",
        technologies: ["Node.js", "Express", "MongoDB", "JWT"],
        duration: "2 months",
        link: "https://github.com/rohan/ecommerce-api"
      },
      {
        title: "Authentication System",
        description: "Built a secure authentication system with JWT tokens, password hashing, and role-based access control.",
        technologies: ["Node.js", "Express", "MongoDB", "bcrypt", "JWT"],
        duration: "2 weeks"
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
    skills: ["React", "JavaScript", "HTML", "CSS", "Bootstrap", "Git"],
    experience: 0,
    projects: [
      {
        title: "Recipe Finder App",
        description: "Created a recipe search application with ingredient-based search, favorites, and detailed cooking instructions.",
        technologies: ["React", "JavaScript", "CSS", "Bootstrap", "API"],
        duration: "1 month",
        link: "https://recipe-finder-app.vercel.app"
      },
      {
        title: "Quiz Application",
        description: "Developed an interactive quiz app with timer, score tracking, and multiple choice questions.",
        technologies: ["React", "JavaScript", "CSS"],
        duration: "2 weeks"
      }
    ],
    phssScore: 78,
    resume: "/resumes/kavya_menon.pdf"
  },
  {
    id: "13",
    name: "Siddharth Rao",
    email: "sid.rao@iitk.ac.in",
    college: "IIT Kanpur",
    branch: "Computer Science",
    cgpa: 9.6,
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Scikit-learn", "Data Science"],
    experience: 0,
    projects: [
      {
        title: "Image Classification Model",
        description: "Developed a CNN-based image classification model to classify 10 different categories with 91% accuracy using TensorFlow.",
        technologies: ["Python", "TensorFlow", "Keras", "NumPy"],
        duration: "2 months",
        link: "https://github.com/siddharth/image-classifier"
      },
      {
        title: "Spam Email Classifier",
        description: "Built a machine learning model to classify emails as spam or ham using NLP techniques and Naive Bayes algorithm.",
        technologies: ["Python", "Scikit-learn", "NLTK", "Pandas"],
        duration: "3 weeks"
      }
    ],
    phssScore: 95,
    resume: "/resumes/siddharth_rao.pdf"
  },
  {
    id: "14",
    name: "Isha Gupta",
    email: "isha.g@dtu.ac.in",
    college: "Delhi Technological University",
    branch: "Software Engineering",
    cgpa: 8.6,
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "HTML", "CSS", "Git"],
    experience: 0,
    projects: [
      {
        title: "Chat Application",
        description: "Created a real-time chat application with Socket.io, user authentication, and group chat functionality.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
        duration: "2 months",
        link: "https://github.com/isha/chat-app"
      },
      {
        title: "Notes App",
        description: "Developed a notes application with create, edit, delete functionality and local storage persistence.",
        technologies: ["React", "JavaScript", "CSS"],
        duration: "1 week"
      }
    ],
    phssScore: 82,
    resume: "/resumes/isha_gupta.pdf"
  },
  {
    id: "15",
    name: "Aman Joshi",
    email: "aman.j@nitd.ac.in",
    college: "NIT Durgapur",
    branch: "Computer Science",
    cgpa: 7.9,
    skills: ["Python", "Django", "HTML", "CSS", "JavaScript", "MySQL"],
    experience: 0.5,
    projects: [
      {
        title: "Attendance Management System",
        description: "Built an attendance tracking system for educational institutions with reports and analytics dashboard.",
        technologies: ["Python", "Django", "MySQL", "Bootstrap"],
        duration: "2 months",
        link: "https://github.com/aman/attendance-system"
      },
      {
        title: "URL Shortener",
        description: "Developed a URL shortening service with custom aliases and click tracking.",
        technologies: ["Django", "Python", "MySQL"],
        duration: "1 week"
      }
    ],
    phssScore: 72,
    resume: "/resumes/aman_joshi.pdf"
  },
  {
    id: "16",
    name: "Shreya Kulkarni",
    email: "shreya.k@coep.ac.in",
    college: "COEP Pune",
    branch: "Information Technology",
    cgpa: 8.8,
    skills: ["React", "Node.js", "PostgreSQL", "Express", "JavaScript", "Git"],
    experience: 0,
    projects: [
      {
        title: "Job Portal",
        description: "Created a job portal platform with job posting, application tracking, and resume upload functionality.",
        technologies: ["React", "Node.js", "PostgreSQL", "Express"],
        duration: "3 months",
        link: "https://job-portal-demo.vercel.app"
      },
      {
        title: "Contact Manager",
        description: "Developed a contact management application with search, filter, and CRUD operations.",
        technologies: ["React", "Node.js", "MongoDB"],
        duration: "2 weeks"
      }
    ],
    phssScore: 86,
    resume: "/resumes/shreya_kulkarni.pdf"
  },
  {
    id: "17",
    name: "Harsh Agarwal",
    email: "harsh.a@thapar.edu",
    college: "Thapar University",
    branch: "Computer Science",
    cgpa: 8.3,
    skills: ["DSA", "C++", "Python", "Problem Solving", "OOP", "Git"],
    experience: 0,
    projects: [
      {
        title: "Student Grade Calculator",
        description: "Built a C++ application to calculate student grades with semester-wise GPA and CGPA calculation.",
        technologies: ["C++", "OOP"],
        duration: "1 week"
      },
      {
        title: "Tic-Tac-Toe Game",
        description: "Developed a console-based tic-tac-toe game with player vs player and player vs computer modes.",
        technologies: ["Python", "Algorithms"],
        duration: "1 week"
      }
    ],
    phssScore: 76,
    resume: "/resumes/harsh_agarwal.pdf"
  },
  {
    id: "18",
    name: "Pooja Yadav",
    email: "pooja.y@jiit.ac.in",
    college: "JIIT Noida",
    branch: "Computer Science",
    cgpa: 8.1,
    skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Git"],
    experience: 0,
    projects: [
      {
        title: "Landing Page for Startup",
        description: "Designed and developed a modern, responsive landing page for a tech startup with contact form integration.",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        duration: "1 week",
        link: "https://startup-landing.vercel.app"
      },
      {
        title: "To-Do List",
        description: "Created a simple to-do list application with add, delete, and mark as complete functionality.",
        technologies: ["JavaScript", "HTML", "CSS"],
        duration: "3 days"
      }
    ],
    phssScore: 74,
    resume: "/resumes/pooja_yadav.pdf"
  },
  {
    id: "19",
    name: "Nikhil Bansal",
    email: "nikhil.b@iitg.ac.in",
    college: "IIT Guwahati",
    branch: "Computer Science",
    cgpa: 9.4,
    skills: ["DSA", "C++", "Python", "Algorithms", "Problem Solving", "System Design"],
    experience: 0,
    projects: [
      {
        title: "File Compression Tool",
        description: "Implemented a file compression and decompression tool using Huffman coding algorithm in C++.",
        technologies: ["C++", "Data Structures", "Algorithms"],
        duration: "2 weeks",
        link: "https://github.com/nikhil/file-compressor"
      },
      {
        title: "Snake Game",
        description: "Developed a classic snake game using Python with increasing difficulty levels and score tracking.",
        technologies: ["Python", "Pygame"],
        duration: "1 week"
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
    skills: ["Python", "Data Analysis", "Pandas", "SQL", "Excel", "Data Visualization"],
    experience: 0.5,
    projects: [
      {
        title: "Customer Churn Analysis",
        description: "Analyzed telecom customer data to predict churn using machine learning models with 82% accuracy.",
        technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
        duration: "1 month",
        link: "https://github.com/ritika/churn-analysis"
      },
      {
        title: "Stock Market Data Analysis",
        description: "Performed exploratory data analysis on stock market data with trend visualization and insights.",
        technologies: ["Python", "Pandas", "Plotly", "NumPy"],
        duration: "2 weeks"
      }
    ],
    phssScore: 81,
    resume: "/resumes/ritika_chopra.pdf"
  },
  {
    id: "21",
    name: "Akash Kumar",
    email: "akash.k@nits.ac.in",
    college: "NIT Silchar",
    branch: "Computer Science",
    cgpa: 7.8,
    skills: ["JavaScript", "HTML", "CSS", "React", "Git"],
    experience: 0,
    projects: [
      {
        title: "Simple Portfolio Website",
        description: "Created a personal portfolio website with project showcase, about section, and contact form.",
        technologies: ["HTML", "CSS", "JavaScript"],
        duration: "1 week"
      },
      {
        title: "Random Quote Generator",
        description: "Built a random quote generator using API with tweet functionality and favorite quotes save.",
        technologies: ["JavaScript", "HTML", "CSS", "API"],
        duration: "2 days"
      }
    ],
    phssScore: 68,
    resume: "/resumes/akash_kumar.pdf"
  },
  {
    id: "22",
    name: "Tanvi Shah",
    email: "tanvi.s@srmist.edu.in",
    college: "SRM Institute of Technology",
    branch: "Computer Science",
    cgpa: 8.9,
    skills: ["Python", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "Data Science"],
    experience: 0,
    projects: [
      {
        title: "Diabetes Prediction Model",
        description: "Developed a machine learning model to predict diabetes using patient health data with logistic regression and random forest algorithms.",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
        duration: "1 month",
        link: "https://github.com/tanvi/diabetes-prediction"
      },
      {
        title: "Iris Flower Classification",
        description: "Built a multi-class classification model to classify iris flowers using K-NN and decision tree algorithms.",
        technologies: ["Python", "Scikit-learn", "Matplotlib"],
        duration: "1 week"
      }
    ],
    phssScore: 87,
    resume: "/resumes/tanvi_shah.pdf"
  }
  ,
  // generated additional candidates (23..72) with realistic names
  ...(() => {
    const names = [
      "Aarav Mehta","Ishaan Kapoor","Saanvi Sharma","Anika Gupta","Vivaan Rao",
      "Diya Patel","Krishna Nair","Kabir Singh","Mira Reddy","Aditya Menon",
      "Neha Joshi","Rohan Malhotra","Tanvi Desai","Kabir Shah","Priyansh Varma",
      "Kavya Iyer","Siddharth Reddy","Ritika Sen","Arjun Bhatia","Meera Nair",
      "Ananya Kulkarni","Harsh Verma","Pooja Yadav","Nikhil Bhatt","Rhea Kapoor",
      "Yash Gupta","Stuti Rao","Karan Mehra","Simran Kaur","Vikash Choudhary",
      "Shruti Deshmukh","Aman Gill","Isha Rathi","Siddharth Kapoor","Naina Sharma",
      "Rajat Sinha","Prachi Joshi","Devansh Patel","Sonal Sharma","Kunal Agarwal",
      "Madhav Iyer","Anjali Nair","Tejas Bhatt","Leena Thomas","Rohit Kapoor",
      "Esha Menon","Vivek Kumar","Nitika Singh","Adithya Rao","Siddharth Rao"
    ];

    const skillsPool = ["React","Node.js","TypeScript","Python","Django","Flask","Java","Spring","AWS","Docker","Kubernetes","SQL","MongoDB","CSS","HTML","Figma","Machine Learning","Pandas","NumPy","TensorFlow"];

    return Array.from({ length: 50 }).map((_, idx) => {
      const i = 23 + idx;
      const name = names[idx % names.length];
      const topSkills = [skillsPool[idx % skillsPool.length], skillsPool[(idx + 3) % skillsPool.length], skillsPool[(idx + 7) % skillsPool.length]];
      return {
        id: String(i),
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}${i}@example.edu`,
        college: ["IIT Delhi","IIT Bombay","BITS Pilani","NIT Trichy","IIIT Hyderabad"][i % 5],
        branch: ["Computer Science","Information Technology","Electronics","Mechanical"][i % 4],
        cgpa: +((7 + (i % 30) * 0.08).toFixed(2)),
        skills: topSkills,
        experience: +(i % 6),
        projects: [
          {
            title: `Project ${i}A`,
            description: `Project ${i}A description showcasing ${topSkills[0]} work and impact.`,
            technologies: [topSkills[0], topSkills[1]],
            duration: `${1 + (i % 6)} months`
          }
        ],
        phssScore: 60 + (i % 40),
        resume: `/resumes/candidate_${i}.pdf`
      };
    });
  })()
];