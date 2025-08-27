import { Course, BlogPost, Testimonial } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'B.Tech Computer Science',
    category: 'UG',
    duration: '4 Years',
    description: 'Bachelor of Technology in Computer Science Engineering',
    eligibility: '10+2 with Physics, Chemistry, Mathematics',
    fees: '₹1,00,000 - ₹8,00,000 per year',
    featured: true,
  },
  {
    id: '2',
    title: 'MBBS',
    category: 'UG',
    duration: '5.5 Years',
    description: 'Bachelor of Medicine and Bachelor of Surgery',
    eligibility: '10+2 with Physics, Chemistry, Biology',
    fees: '₹5,00,000 - ₹25,00,000 per year',
    featured: true,
  },
  {
    id: '3',
    title: 'BBA',
    category: 'UG',
    duration: '3 Years',
    description: 'Bachelor of Business Administration',
    eligibility: '10+2 from recognized board',
    fees: '₹50,000 - ₹3,00,000 per year',
    featured: true,
  },
  {
    id: '4',
    title: 'MBA',
    category: 'PG',
    duration: '2 Years',
    description: 'Master of Business Administration',
    eligibility: 'Bachelor degree with minimum 50% marks',
    fees: '₹2,00,000 - ₹20,00,000 per year',
    featured: true,
  },
  {
    id: '5',
    title: 'BCA',
    category: 'UG',
    duration: '3 Years',
    description: 'Bachelor of Computer Applications',
    eligibility: '10+2 with Mathematics',
    fees: '₹30,000 - ₹2,00,000 per year',
    featured: false,
  },
  {
    id: '6',
    title: 'B.Com',
    category: 'UG',
    duration: '3 Years',
    description: 'Bachelor of Commerce',
    eligibility: '10+2 from recognized board',
    fees: '₹20,000 - ₹1,50,000 per year',
    featured: false,
  },
  {
    id: '7',
    title: 'PhD Computer Science',
    category: 'PhD',
    duration: '3-5 Years',
    description: 'Doctor of Philosophy in Computer Science',
    eligibility: 'Masters degree with minimum 55% marks',
    fees: '₹50,000 - ₹2,00,000 per year',
    featured: false,
  },
];

export const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Career Opportunities in Technology for 2025',
    slug: 'top-10-career-opportunities-technology-2025',
    excerpt: 'Discover the most promising technology careers that will dominate 2025 and beyond.',
    content: `Technology continues to evolve at a rapid pace, creating new career opportunities and transforming existing roles. Here are the top 10 technology careers to watch in 2025:

1. **Artificial Intelligence Engineer**: With AI becoming mainstream, companies need specialists to develop and implement AI solutions.

2. **Cybersecurity Analyst**: As cyber threats increase, organizations prioritize security experts to protect their digital assets.

3. **Data Scientist**: The demand for professionals who can analyze and interpret complex data continues to grow.

4. **Cloud Solutions Architect**: As businesses migrate to the cloud, architects who can design scalable solutions are in high demand.

5. **DevOps Engineer**: The integration of development and operations requires specialists who can streamline processes.

6. **Mobile App Developer**: With mobile usage continuing to rise, skilled app developers remain highly sought after.

7. **Blockchain Developer**: As blockchain technology expands beyond cryptocurrency, developers are needed for various applications.

8. **IoT Specialist**: The Internet of Things creates opportunities for professionals who can connect and manage smart devices.

9. **UX/UI Designer**: User experience remains crucial for digital products, making designers essential team members.

10. **Full-Stack Developer**: Versatile developers who can work on both front-end and back-end remain valuable assets.

Each of these careers offers excellent growth potential and competitive salaries. The key is to continuously update your skills and stay current with industry trends.`,
    category: 'Career',
    author: 'Suraj Verma',
    publishedAt: '2025-01-15',
    featuredImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    seoTitle: 'Top 10 Technology Career Opportunities for 2025 | RC Consultancy',
    seoDescription: 'Explore the most promising technology careers in 2025. Get expert guidance on AI, cybersecurity, data science, and more from RC Consultancy.',
  },
  {
    id: '2',
    title: 'Complete Guide to Medical College Admissions in India',
    slug: 'complete-guide-medical-college-admissions-india',
    excerpt: 'Everything you need to know about MBBS admissions, NEET preparation, and medical college selection.',
    content: `Getting admission to a medical college in India is highly competitive. This comprehensive guide will help you navigate the process successfully.

**NEET UG Examination:**
The National Eligibility cum Entrance Test (NEET) is the single entrance exam for MBBS and BDS admissions in India. Here's what you need to know:

- **Eligibility**: Candidates must have completed 10+2 with Physics, Chemistry, Biology, and English
- **Age Limit**: Minimum 17 years, maximum 25 years (30 for reserved categories)
- **Exam Pattern**: 180 questions (45 each from Physics, Chemistry, Botany, and Zoology)
- **Duration**: 3 hours and 20 minutes

**Preparation Strategy:**
1. Start early - begin preparation in Class 11
2. Follow NCERT textbooks as the foundation
3. Take regular mock tests
4. Focus on weak areas through targeted practice
5. Join a reputable coaching institute if needed

**College Selection:**
Consider these factors when choosing medical colleges:
- NIRF rankings and reputation
- Faculty quality and student-teacher ratio
- Infrastructure and hospital facilities
- Fee structure and affordability
- Location and hostel facilities

**Admission Process:**
1. NEET UG exam (usually conducted in May)
2. Result declaration (June)
3. Counselling registration
4. Choice filling and locking
5. Seat allotment rounds
6. Document verification and fee payment

**Important Documents:**
- NEET admit card and scorecard
- 10th and 12th mark sheets
- Transfer certificate
- Migration certificate
- Caste certificate (if applicable)
- Income certificate for fee concessions

Remember, consistency and dedication are key to success in medical entrance exams. Start your preparation early and stay focused on your goal.`,
    category: 'Education',
    author: 'Deepanshu Verma',
    publishedAt: '2025-01-10',
    featuredImage: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
    seoTitle: 'MBBS Admission Guide 2025: NEET Preparation & Medical College Selection',
    seoDescription: 'Complete guide to medical college admissions in India. Learn about NEET preparation, college selection, and admission process from expert counselors.',
  },
  {
    id: '3',
    title: 'Personal Finance Tips for Fresh Graduates',
    slug: 'personal-finance-tips-fresh-graduates',
    excerpt: 'Essential financial advice for new graduates entering the workforce.',
    content: `Starting your career is exciting, but managing finances can be overwhelming. Here are essential tips for fresh graduates:

**1. Create a Budget**
Track your income and expenses to understand where your money goes. Use the 50/30/20 rule:
- 50% for needs (rent, food, utilities)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

**2. Build an Emergency Fund**
Start with ₹10,000 and gradually build it to cover 3-6 months of expenses. This fund will help you handle unexpected costs without debt.

**3. Start Investing Early**
Even small amounts invested regularly can grow significantly due to compound interest. Consider:
- SIP in mutual funds
- Public Provident Fund (PPF)
- ELSS for tax benefits

**4. Get Health Insurance**
Don't rely solely on employer insurance. Get a personal health insurance policy to protect against medical emergencies.

**5. Avoid Credit Card Debt**
Use credit cards responsibly. Pay the full balance each month to avoid high interest charges.

**6. Plan for Taxes**
Understand tax deductions under Section 80C, 80D, and others to minimize your tax liability.

**7. Set Financial Goals**
Define short-term and long-term goals like buying a car, house, or retirement planning.

**8. Track Your Credit Score**
Monitor your credit score regularly and maintain it above 750 for better loan terms.

Starting good financial habits early will set you up for long-term success. Don't hesitate to seek professional financial advice when needed.`,
    category: 'Finance',
    author: 'Suraj Verma',
    publishedAt: '2025-01-08',
    featuredImage: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg',
    seoTitle: 'Personal Finance Tips for Fresh Graduates | Money Management Guide',
    seoDescription: 'Essential financial advice for new graduates. Learn budgeting, investing, and money management strategies from RC Consultancy finance experts.',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    course: 'B.Tech Computer Science',
    message: 'RC Consultancy helped me get admission to my dream college. Their guidance throughout the process was invaluable.',
    rating: 5,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    course: 'MBBS',
    message: 'The team at RC Consultancy provided excellent support for my NEET preparation and college selection. Highly recommended!',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: '3',
    name: 'Anjali Patel',
    course: 'MBA',
    message: 'Thanks to RC Consultancy, I secured admission in a top MBA program. Their career counseling was spot on.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
];