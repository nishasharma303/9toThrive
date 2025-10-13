import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export interface JobPosting {
  id?: string;
  // Basic Info
  title: string;
  company: string;
  department: string;
  location: string;
  workMode: string;
  jobType: string;
  openings: number;
  
  // Requirements
  experience: string;
  education: string;
  skills: string;
  
  // Compensation
  salaryMin: string;
  salaryMax: string;
  salaryVisible: boolean;
  
  // Details
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  
  // Settings
  closingDate: string;
  priority: string;
  screeningQuestions: string;
  isDraft: boolean;
  
  // Visibility Settings
  recruiterName: string;
  recruiterEmail: string;
  recruiterPhone: string;
  recruiterVisible: boolean;
  openingsVisible: boolean;

  // Metadata
  applicants: number;
  shortlisted: number;
  interviewed: number;
  offered: number;
  views: number;
  applicationRate: string;
  postedDate: string;
  daysActive: number;
  status: string;
  performance: string;

  // Timestamps
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Create a new job posting
export const createJobPosting = async (jobData: Omit<JobPosting, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "jobposting"), {
      ...jobData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating job posting:", error);
    throw error;
  }
};

// Get all job postings
export const getAllJobPostings = async (): Promise<JobPosting[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "jobposting"));
    const jobPostings: JobPosting[] = [];
    
    querySnapshot.forEach((doc) => {
      jobPostings.push({
        id: doc.id,
        ...doc.data(),
      } as JobPosting);
    });
    
    return jobPostings;
  } catch (error) {
    console.error("Error getting job postings:", error);
    throw error;
  }
};

// Get job posting by ID
export const getJobPostingById = async (id: string): Promise<JobPosting | null> => {
  try {
    const docRef = doc(db, "jobposting", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as JobPosting;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting job posting:", error);
    throw error;
  }
};

// Update job posting
export const updateJobPosting = async (id: string, jobData: Partial<JobPosting>): Promise<void> => {
  try {
    const docRef = doc(db, "jobposting", id);
    await updateDoc(docRef, {
      ...jobData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    throw error;
  }
};

// Delete job posting
export const deleteJobPosting = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "jobposting", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting job posting:", error);
    throw error;
  }
};

// Get job postings by status
export const getJobPostingsByStatus = async (status: string): Promise<JobPosting[]> => {
  try {
    const q = query(
      collection(db, "jobposting"), 
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const jobPostings: JobPosting[] = [];
    
    querySnapshot.forEach((doc) => {
      jobPostings.push({
        id: doc.id,
        ...doc.data(),
      } as JobPosting);
    });
    
    return jobPostings;
  } catch (error) {
    console.error("Error getting job postings by status:", error);
    throw error;
  }
};