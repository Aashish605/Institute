import { sequelize } from './Db/db.js'
import { Course, Notice, Mock } from './Model/index.js'

const seed = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Database synced')

    // --- Courses ---
    const courses = [
      {
        title: 'BE | BArch | BSc CSIT Entrance Preparation (Online)',
        description:
          'Comprehensive online preparation for engineering and computer science entrance exams. Features live classes, recorded sessions, and extensive practice materials.',
        image: 'https://placehold.co/600x400/004e8f/ffffff?text=Entrance+Preparation',
        oldPrice: 8000,
        newPrice: 5000,
        discount: '38%',
        features: [
          { icon: 'https://img.icons8.com/color/48/online--v1.png', text: 'Live Online Classes' },
          { icon: 'https://img.icons8.com/color/48/video-record.png', text: 'Recorded Sessions' },
          { icon: 'https://img.icons8.com/color/48/test-passed.png', text: 'Weekly Mock Tests' },
          { icon: 'https://img.icons8.com/color/48/mentor.png', text: 'Expert Mentorship' },
        ],
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'IQ'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
      {
        title: 'Bridge Course (Science, Management)',
        description:
          'A foundational bridge course designed for SEE-appeared students transitioning into Science or Management streams at the +2 level.',
        image: 'https://placehold.co/600x400/f7921d/ffffff?text=Bridge+Course',
        oldPrice: 15000,
        newPrice: 13000,
        discount: '13%',
        features: [
          { icon: 'https://img.icons8.com/color/48/classroom.png', text: 'Classroom & Online' },
          { icon: 'https://img.icons8.com/color/48/teacher.png', text: 'Expert Faculty' },
          { icon: 'https://img.icons8.com/color/48/books.png', text: 'Comprehensive Materials' },
          { icon: 'https://img.icons8.com/color/48/support.png', text: 'Doubt Clearing Sessions' },
        ],
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Account', 'Economics'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
      {
        title: 'Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)',
        description:
          'Focused preparation for health science and diploma engineering entrance exams. Covers all subjects with regular assessments.',
        image: 'https://placehold.co/600x400/004e8f/ffffff?text=Health+Science',
        oldPrice: 3500,
        newPrice: 2000,
        discount: '43%',
        features: [
          { icon: 'https://img.icons8.com/color/48/test.png', text: 'Subject-wise Tests' },
          { icon: 'https://img.icons8.com/color/48/analytics.png', text: 'Performance Analytics' },
          { icon: 'https://img.icons8.com/color/48/books.png', text: 'Study Materials' },
          { icon: 'https://img.icons8.com/color/48/quiz.png', text: 'Practice Questions' },
        ],
        subjects: ['Science', 'Mathematics', 'English', 'General Knowledge'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
      {
        title: 'IOE Entrance Crash Course',
        description:
          'Intensive crash course for IOE engineering entrance. Last-minute revision, tips, and full-length mock tests to boost your score.',
        image: 'https://placehold.co/600x400/f7921d/ffffff?text=Crash+Course',
        oldPrice: 12000,
        newPrice: 8000,
        discount: '33%',
        features: [
          { icon: 'https://img.icons8.com/color/48/rocket.png', text: 'Fast-track Learning' },
          { icon: 'https://img.icons8.com/color/48/exam.png', text: 'Full-length Mock Tests' },
          { icon: 'https://img.icons8.com/color/48/idea.png', text: 'Tips & Tricks' },
          { icon: 'https://img.icons8.com/color/48/check-all.png', text: 'Weekly Progress Review' },
        ],
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'IQ'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
    ]

    for (const course of courses) {
      await Course.create(course)
    }
    console.log(`Seeded ${courses.length} courses`)

    // --- Notices ---
    const notices = [
      {
        Title: 'Admission Open for 2081 Batch',
        Description:
          'Admissions are now open for the 2081 academic year. Enroll in our entrance preparation courses and bridge programs. Limited seats available!',
        Img: 'https://placehold.co/800x400/004e8f/ffffff?text=Admission+Open',
      },
      {
        Title: 'Mock Test Schedule - Week 12',
        Description:
          'The Week 12 mock test will be held on Saturday at 10:00 AM. All students are required to be present. Check the notice board for room assignments.',
        Img: 'https://placehold.co/800x400/f7921d/ffffff?text=Mock+Test+Schedule',
      },
      {
        Title: 'New Batch for Bridge Course',
        Description:
          'A new batch for the Bridge Course (Science & Management) starts from next Monday. Early bird discounts available until the end of this week.',
        Img: 'https://placehold.co/800x400/004e8f/ffffff?text=New+Batch',
      },
      {
        Title: 'Result Publication Notice',
        Description:
          'The results for the Week 10 mock test have been published. Students can view their results and rank on the Mock Test page.',
        Img: 'https://placehold.co/800x400/f7921d/ffffff?text=Results+Published',
      },
    ]

    for (const notice of notices) {
      await Notice.create(notice)
    }
    console.log(`Seeded ${notices.length} notices`)

    // --- Mock Results ---
    const mocks = [
      {
        Title: 'Mock Test Week 10',
        Week: 'Week 10',
        Description:
          'Results for the 10th weekly mock test covering Mathematics, Physics, and Chemistry.',
        Img: 'https://placehold.co/600x400/004e8f/ffffff?text=Mock+Week+10',
      },
      {
        Title: 'Mock Test Week 11',
        Week: 'Week 11',
        Description:
          'Results for the 11th weekly mock test. Topics included Algebra, Mechanics, and Thermodynamics.',
        Img: 'https://placehold.co/600x400/f7921d/ffffff?text=Mock+Week+11',
      },
      {
        Title: 'Mock Test Week 12',
        Week: 'Week 12',
        Description:
          'Full-length entrance simulation test. Covers all subjects as per the latest entrance exam pattern.',
        Img: 'https://placehold.co/600x400/004e8f/ffffff?text=Mock+Week+12',
      },
      {
        Title: 'Special Revision Test',
        Week: 'Week 13',
        Description:
          'Special revision test focused on high-weightage topics identified from previous year question papers.',
        Img: 'https://placehold.co/600x400/f7921d/ffffff?text=Revision+Test',
      },
    ]

    for (const mock of mocks) {
      await Mock.create(mock)
    }
    console.log(`Seeded ${mocks.length} mock results`)

    console.log('✅ All seed data inserted successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
