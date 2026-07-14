import { sequelize } from './Db/db.js'
import bcrypt from 'bcryptjs'
import { User, Course, Notice, Mock, ContentBlock, Testimonial, Enrollment, Payment, Contact } from './Model/index.js'

const seed = async () => {
  try {
    await sequelize.sync({ force: true })
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
      {
        title: 'MBBS & BDS Entrance Preparation',
        description:
          'Comprehensive preparation for medical entrance exams including MBBS and BDS. Covers all science subjects with intensive practice sessions.',
        image: 'https://placehold.co/600x400/004e8f/ffffff?text=Medical+Prep',
        oldPrice: 10000,
        newPrice: 7000,
        discount: '30%',
        features: [
          { icon: 'https://img.icons8.com/color/48/stethoscope.png', text: 'Medical Focus' },
          { icon: 'https://img.icons8.com/color/48/test-passed.png', text: 'Mock Tests' },
          { icon: 'https://img.icons8.com/color/48/teacher.png', text: 'Expert Faculty' },
          { icon: 'https://img.icons8.com/color/48/analytics.png', text: 'Performance Tracking' },
        ],
        subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Mathematics'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
      {
        title: 'Loksewa Preparation Course',
        description:
          'Targeted preparation for Loksewa civil service exams. Covers general knowledge, reasoning, and subject-specific content.',
        image: 'https://placehold.co/600x400/f7921d/ffffff?text=Loksewa+Prep',
        oldPrice: 6000,
        newPrice: 4000,
        discount: '33%',
        features: [
          { icon: 'https://img.icons8.com/color/48/knowledge.png', text: 'GK & Current Affairs' },
          { icon: 'https://img.icons8.com/color/48/reasoning.png', text: 'Reasoning Skills' },
          { icon: 'https://img.icons8.com/color/48/test-passed.png', text: 'Practice Sets' },
          { icon: 'https://img.icons8.com/color/48/mentor.png', text: 'Expert Guidance' },
        ],
        subjects: ['General Knowledge', 'English', 'Mathematics', 'Reasoning', 'Nepali'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
      {
        title: 'CEE (Common Entrance Exam) Preparation',
        description:
          'Focused preparation for the CEE conducted by Tribhuvan University for science and management programs.',
        image: 'https://placehold.co/600x400/004e8f/ffffff?text=CEE+Prep',
        oldPrice: 7500,
        newPrice: 5500,
        discount: '27%',
        features: [
          { icon: 'https://img.icons8.com/color/48/books.png', text: 'Comprehensive Coverage' },
          { icon: 'https://img.icons8.com/color/48/exam.png', text: 'Past Papers' },
          { icon: 'https://img.icons8.com/color/48/teacher.png', text: 'Expert Faculty' },
          { icon: 'https://img.icons8.com/color/48/support.png', text: 'Doubt Sessions' },
        ],
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
        materialsLink: '#',
        mockTestLink: '/mock',
      },
    ]

    for (const course of courses) {
      await Course.findOrCreate({ where: { title: course.title }, defaults: course })
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
      {
        Title: 'Scholarship Announcement',
        Description:
          'Merit-based scholarships now available for top-performing students. Apply through the admin office with your latest academic transcripts.',
        Img: 'https://placehold.co/800x400/004e8f/ffffff?text=Scholarship',
      },
      {
        Title: 'Guest Lecture Series',
        Description:
          'We are hosting a guest lecture series with industry experts every Saturday this month. Open to all enrolled students.',
        Img: 'https://placehold.co/800x400/f7921d/ffffff?text=Guest+Lecture',
      },
      {
        Title: 'Holiday Notice: Important Festival',
        Description:
          'The institute will remain closed for three days on the occasion of the upcoming festival. Regular classes will resume on Monday.',
        Img: 'https://placehold.co/800x400/004e8f/ffffff?text=Holiday+Notice',
      },
    ]

    for (const notice of notices) {
      await Notice.findOrCreate({ where: { Title: notice.Title }, defaults: notice })
    }
    console.log(`Seeded ${notices.length} notices`)

    // --- Mock Results ---
    const mocks = [
      {
        Title: 'Mock Test Week 10',
        Week: 'Week 10',
        Description:
          'Results for the 10th weekly mock test covering Mathematics, Physics, and Chemistry.',
      },
      {
        Title: 'Mock Test Week 11',
        Week: 'Week 11',
        Description:
          'Results for the 11th weekly mock test. Topics included Algebra, Mechanics, and Thermodynamics.',
      },
      {
        Title: 'Mock Test Week 12',
        Week: 'Week 12',
        Description:
          'Full-length entrance simulation test. Covers all subjects as per the latest entrance exam pattern.',
      },
      {
        Title: 'Special Revision Test',
        Week: 'Week 13',
        Description:
          'Special revision test focused on high-weightage topics identified from previous year question papers.',
      },
      {
        Title: 'Mock Test Week 14',
        Week: 'Week 14',
        Description:
          'Comprehensive test covering all science subjects with emphasis on numerical problems.',
      },
      {
        Title: 'Full Syllabus Mock - Midterm',
        Week: 'Week 15',
        Description:
          'Midterm full syllabus mock test simulating the actual entrance exam environment.',
      },
    ]

    for (const mock of mocks) {
      await Mock.findOrCreate({ where: { Title: mock.Title }, defaults: mock })
    }
    console.log(`Seeded ${mocks.length} mock results`)

    // --- Content Blocks ---
    const contentBlocks = [
        { key: 'hero_heading', value: 'Empowering Learning for' },
        { key: 'hero_headingHighlight', value: 'Everyone' },
        { key: 'hero_tagline', value: "Nepal's Premier Learning Institute" },
        { key: 'hero_subtitle', value: 'Join us where expert-led teaching, data-driven performance analytics, and a mentorship-driven community come together to give you the clarity, confidence, and competence to excel.' },
        { key: 'hero_image', value: 'Hero.webp' },
        { key: 'hero_cta', value: 'Get Started Today' },
        { key: 'about_hero_title', value: 'About Us' },
        { key: 'about_hero_subtitle', value: 'Building a strong foundation for your future' },
        { key: 'about_aboutUs_heading', value: 'About Us' },
        { key: 'about_aboutUs_text', value: 'We are a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations.' },
        { key: 'about_approach_text', value: 'Our approach combines expert-led teaching, data-driven performance analytics, and a strong mentorship-driven community to give students the clarity, confidence, and competence they need to excel.' },
        { key: 'about_introduction_heading', value: 'Introduction' },
        { key: 'about_intro_text', value: 'We believe that every student has the potential to excel — with the right guidance, strategy, and environment.' },
        { key: 'about_closing_text', value: "We don't just prepare you for exams — we help you unlock your full academic potential." },
        { key: 'about_whyChooseUs_heading', value: 'Why Students Choose Us' },
        { key: 'about_whyChooseUs_footer', value: 'Founded by passionate educators and experienced faculty members, our institute contributes towards developing qualitative future professionals.' },
        { key: 'about_message_heading', value: 'Message From Our Team' },
        { key: 'about_message_para1', value: 'Dear prospective students and guardians, we take great delight in extending a warm welcome to you all at our institute—founded by experienced educators and graduates of leading institutions.' },
        { key: 'about_message_para2', value: 'Our only goal is to support our students academically and maximize their outputs in competitive examinations.' },
        { key: 'about_message_para3', value: 'Our prime location is easily accessible. We are equipped with adequate infrastructure, quality books, and qualified instructors.' },
        { key: 'about_message_para4', value: 'Together we can grow and create an impact in your chosen field.' },
        { key: 'about_message_sender', value: 'The Team' },
        { key: 'about_cta_text', value: 'Ready to start your journey?' },
        { key: 'contact_heading', value: 'Get in Touch' },
        { key: 'contact_subtitle', value: 'Have questions about our programs or want to learn more? We would love to hear from you.' },
        { key: 'contact_phone', value: '+977 01-5360880' },
        { key: 'contact_mobile', value: '+977 9851198288' },
        { key: 'contact_email', value: 'info@institute.edu.np' },
        { key: 'contact_location', value: 'Kathmandu, Nepal' },
        { key: 'contact_hours', value: 'Sunday - Friday: 9:00 AM - 5:00 PM' },
        { key: 'social_facebook', value: 'https://facebook.com' },
        { key: 'social_instagram', value: 'https://instagram.com' },
        { key: 'social_tiktok', value: 'https://tiktok.com' },
        { key: 'social_whatsapp', value: '9779843340238' },
        { key: 'site_name', value: 'Institute' },
        { key: 'site_tagline', value: 'Building a strong foundation for your future' },
        { key: 'site_copyright', value: 'Institute' },
        { key: 'footer_aboutText', value: 'We are a student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations.' },
        { key: 'footer_rights', value: 'All Right Reserved' },
        { key: 'mock_heading', value: 'Weekly Mock Test Results' },
        { key: 'mock_subtitle', value: 'Topper of each mock test receives a cash incentive to motivate and reward hard work!' },
        { key: 'notice_heading', value: 'Latest Notices' },
        { key: 'course_heading', value: 'Explore Our Courses' },
        { key: 'course_subtitle', value: 'Transform your future with our expert-led, comprehensive courses' },
        { key: 'login_heading', value: 'Sign in to your account' },
    ];

    await ContentBlock.bulkCreate(contentBlocks, { updateOnDuplicate: ['value', 'updatedAt'] });
    console.log(`Seeded ${contentBlocks.length} content blocks`)

    // --- Testimonials ---
    const testimonials = [
      { name: 'Aarav Sharma', role: 'Student', company: 'IOE Entrance 2081', avatar: 'https://i.pravatar.cc/100?img=11', content: 'The crash course was a game-changer for my IOE prep. The mock tests mirrored the real exam perfectly, and the weekly reviews helped me fix my weak areas. Scored in the top 100!', rating: 5 },
      { name: 'Priya Adhikari', role: 'Student', company: 'Bridge Course, Science', avatar: 'https://i.pravatar.cc/100?img=12', content: 'The bridge course made my transition from SEE to +2 Science so smooth. The teachers broke down complex topics into simple concepts. I felt confident going into my first semester.', rating: 5 },
      { name: 'Sagar Thapa', role: 'Student', company: 'BSc CSIT Prep', avatar: 'https://i.pravatar.cc/100?img=20', content: 'I joined for CSIT entrance prep and the structured curriculum was exactly what I needed. The doubt-clearing sessions were incredibly helpful. Highly recommend for anyone aiming for top colleges.', rating: 5 },
      { name: 'Anjana Karki', role: 'Student', company: 'Staff Nurse Entrance', avatar: 'https://i.pravatar.cc/100?img=23', content: 'The health science entrance prep was thorough and well-organized. Practice questions and subject-wise tests covered everything that appeared in the exam. Grateful to the entire team!', rating: 5 },
      { name: 'Rohit Basnet', role: 'Student', company: 'BE Entrance Prep', avatar: 'https://i.pravatar.cc/100?img=33', content: 'What really helped me was the performance analytics — I could track my progress week by week. The mentorship program kept me motivated throughout the preparation.', rating: 5 },
      { name: 'Sneha Pandey', role: 'Student', company: 'Bridge Course, Management', avatar: 'https://i.pravatar.cc/100?img=42', content: 'I was nervous about switching to Management in +2, but the bridge course gave me a solid foundation. The faculty made learning enjoyable and the study materials were top-notch.', rating: 4 },
      { name: 'Bibek Gurung', role: 'Student', company: 'Diploma Engg Prep', avatar: 'https://i.pravatar.cc/100?img=55', content: 'Affordable yet high-quality preparation. The mock tests every week kept me on track, and the expert feedback helped me improve my speed and accuracy.', rating: 5 },
      { name: 'Maya Tamang', role: 'Student', company: 'MBBS Prep', avatar: 'https://i.pravatar.cc/100?img=47', content: 'The biology classes were incredibly detailed and the mock tests closely followed the actual exam pattern. I felt fully prepared on exam day. Highly recommended for medical aspirants!', rating: 5 },
      { name: 'Kiran Acharya', role: 'Student', company: 'Loksewa Prep', avatar: 'https://i.pravatar.cc/100?img=59', content: 'The Loksewa preparation course covered everything from general knowledge to reasoning. The regular current affairs updates and mock interviews were particularly helpful.', rating: 5 },
    ];
    for (const t of testimonials) {
      await Testimonial.findOrCreate({ where: { name: t.name }, defaults: t });
    }
    console.log(`Seeded ${testimonials.length} testimonials`)

    // --- Users ---
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)

    const users = [
      {
        displayName: 'Admin User',
        email: 'admin@institute.com',
        password: hashedPassword,
        isAdmin: true,
        isEmailVerified: true,
        number: '9851198288',
        school: 'Institute',
      },
      {
        displayName: 'Aarav Sharma',
        email: 'aarav@example.com',
        password: hashedPassword,
        isEmailVerified: true,
        number: '9841234567',
        class: '12',
        school: 'Trinity College',
      },
      {
        displayName: 'Priya Adhikari',
        email: 'priya@example.com',
        password: hashedPassword,
        isEmailVerified: true,
        number: '9847654321',
        class: '11',
        school: 'St. Xavier\'s College',
      },
      {
        displayName: 'Rohit Basnet',
        email: 'rohit@example.com',
        password: hashedPassword,
        isEmailVerified: true,
        number: '9851122334',
        class: '12',
        school: 'Liverpool College',
      },
      {
        displayName: 'Maya Tamang',
        email: 'maya@example.com',
        password: hashedPassword,
        isEmailVerified: true,
        number: '9861234567',
        class: '12',
        school: 'Golden Gate College',
      },
      {
        displayName: 'Kiran Acharya',
        email: 'kiran@example.com',
        password: hashedPassword,
        isEmailVerified: true,
        number: '9845678901',
        class: '12',
        school: 'Valley College',
      },
    ]

    const createdUsers = []
    for (const u of users) {
      const [user, created] = await User.findOrCreate({
        where: { email: u.email },
        defaults: u,
      })
      if (created) createdUsers.push(user)
      else createdUsers.push(user)
    }
    console.log(`Seeded ${createdUsers.length} users`)

    // --- Enrollments & Payments ---
    const allCourses = await Course.findAll()
    const adminUser = createdUsers.find(u => u.isAdmin)
    const students = createdUsers.filter(u => !u.isAdmin)

    let enrollCount = 0
    for (let i = 0; i < students.length; i++) {
      const student = students[i]
      const course = allCourses[i % allCourses.length]

      const [enrollment, created] = await Enrollment.findOrCreate({
        where: { userId: student.id, courseId: course.id },
      })

      if (created) {
        await Payment.findOrCreate({
          where: { userId: student.id, courseId: course.id },
          defaults: {
            userId: student.id,
            courseId: course.id,
            course: course.title,
            userName: student.displayName,
            userEmail: student.email,
            receipt: 'https://placehold.co/400x300/004e8f/ffffff?text=Receipt',
            reference: `TXN${String(1000 + i).padStart(6, '0')}`,
            paymentType: i % 2 === 0 ? 'online' : 'cash',
            status: 'verified',
          },
        })
        enrollCount++
      }
    }
    console.log(`Seeded ${enrollCount} enrollments with payments`)

    // --- Contacts ---
    const contacts = [
      {
        userId: adminUser?.id || null,
        fullName: 'Sita Rai',
        email: 'sita@example.com',
        phone: '9812345678',
        subject: 'Course Inquiry',
        message: 'I would like to know more about the IOE Entrance Crash Course. What is the duration and when does the next batch start?',
      },
      {
        fullName: 'Ram Pandey',
        email: 'ram@example.com',
        phone: '9823456789',
        subject: 'Admission',
        message: 'Is there any scholarship available for the Bridge Course? I have scored above 3.6 GPA in SEE.',
      },
      {
        fullName: 'Gita Sharma',
        email: 'gita@example.com',
        phone: '9845671234',
        subject: 'Fee Inquiry',
        message: 'I would like to know about the fee structure for the MBBS preparation course. Are there any installment options available?',
      },
    ]

    for (const c of contacts) {
      await Contact.findOrCreate({
        where: { email: c.email, subject: c.subject },
        defaults: c,
      })
    }
    console.log(`Seeded ${contacts.length} contacts`)

    console.log('All seed data inserted successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
