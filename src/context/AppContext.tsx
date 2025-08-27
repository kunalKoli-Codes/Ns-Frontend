import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Course, BlogPost, Enquiry, Testimonial, JobLead } from '../types';
import { mockCourses, mockBlogs, mockTestimonials } from '../data/mockData';

interface AppState {
  courses: Course[];
  blogs: BlogPost[];
  enquiries: Enquiry[];
  testimonials: Testimonial[];
  jobLeads: JobLead[];
  isAdmin: boolean;
  currentUser: string | null;
}

type AppAction = 
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: string }
  | { type: 'ADD_BLOG'; payload: BlogPost }
  | { type: 'UPDATE_BLOG'; payload: BlogPost }
  | { type: 'DELETE_BLOG'; payload: string }
  | { type: 'ADD_ENQUIRY'; payload: Enquiry }
  | { type: 'UPDATE_ENQUIRY_STATUS'; payload: { id: string; status: 'New' | 'In Progress' | 'Resolved' } }
  | { type: 'ADD_JOB_LEAD'; payload: JobLead }
  | { type: 'UPDATE_JOB_LEAD'; payload: JobLead }
  | { type: 'LOGIN_ADMIN'; payload: string }
  | { type: 'LOGOUT_ADMIN' };

const initialState: AppState = {
  courses: mockCourses,
  blogs: mockBlogs,
  enquiries: [],
  testimonials: mockTestimonials,
  jobLeads: [],
  isAdmin: false,
  currentUser: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] };
    case 'UPDATE_COURSE':
      return {
        ...state,
        courses: state.courses.map(course => 
          course.id === action.payload.id ? action.payload : course
        ),
      };
    case 'DELETE_COURSE':
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload),
      };
    case 'ADD_BLOG':
      return { ...state, blogs: [...state.blogs, action.payload] };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.id !== action.payload),
      };
    case 'ADD_ENQUIRY':
      return { ...state, enquiries: [...state.enquiries, action.payload] };
    case 'UPDATE_ENQUIRY_STATUS':
      return {
        ...state,
        enquiries: state.enquiries.map(enquiry => 
          enquiry.id === action.payload.id 
            ? { ...enquiry, status: action.payload.status }
            : enquiry
        ),
      };
    case 'ADD_JOB_LEAD':
      return { ...state, jobLeads: [...state.jobLeads, action.payload] };
    case 'UPDATE_JOB_LEAD':
      return {
        ...state,
        jobLeads: state.jobLeads.map(lead => 
          lead.id === action.payload.id ? action.payload : lead
        ),
      };
    case 'LOGIN_ADMIN':
      return { ...state, isAdmin: true, currentUser: action.payload };
    case 'LOGOUT_ADMIN':
      return { ...state, isAdmin: false, currentUser: null };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}