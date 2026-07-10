import { sequelize } from './Db/db.js'
import bcrypt from 'bcryptjs'
import { User, Course, Notice, Mock, ContentBlock, Testimonial, Enrollment, Payment, Contact } from './Model/index.js'

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
      await Mock.findOrCreate({ where: { Title: mock.Title }, defaults: mock })
    }
    console.log(`Seeded ${mocks.length} mock results`)

    // --- Content Blocks ---
    const contentBlocks = [
        { key: 'hero_heading', value: 'Empowering Learning for' },
        { key: 'hero_headingHighlight', value: 'Everyone' },
        { key: 'hero_subtitle', value: 'Join Mirror where expert-led teaching, data-driven performance analytics, and a mentorship-driven community come together to give you the clarity, confidence, and competence to excel.' },
        { key: 'hero_image', value: 'Home/Interview.png' },
        { key: 'hero_cta', value: 'Join Mirror Today!' },
        { key: 'about_aboutUs_heading', value: 'About Us' },
        { key: 'about_aboutUs_text', value: 'Mirror Academy is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations.' },
        { key: 'about_introduction_heading', value: 'Introduction' },
        { key: 'about_whyChooseUs_heading', value: 'Why Students Choose Us' },
        { key: 'about_message_heading', value: 'Message From Mirror Family' },
        { key: 'contact_phone', value: '+977 01-5360880' },
        { key: 'contact_mobile', value: '+977 9851198288' },
        { key: 'contact_email', value: 'info@piacademy.edu.np' },
        { key: 'contact_location', value: 'Maitighar, Kathmandu, Nepal' },
        { key: 'contact_hours', value: 'Sunday - Friday: 9:00 AM - 5:00 PM' },
        { key: 'social_facebook', value: 'https://facebook.com' },
        { key: 'social_instagram', value: 'https://instagram.com' },
        { key: 'social_tiktok', value: 'https://tiktok.com' },
        { key: 'social_whatsapp', value: '9779843340238' },
        { key: 'site_name', value: 'Mirror' },
        { key: 'site_tagline', value: 'Building a strong foundation for your future' },
        { key: 'site_copyright', value: 'Mirror' },
        { key: 'footer_aboutText', value: 'Mirror is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations.' },
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
      { name: 'Aarav Sharma', role: 'Student', company: 'IOE Entrance 2081', avatar: 'https://i.pravatar.cc/100?img=11', content: 'Mirror Academy\'s crash course was a game-changer for my IOE prep. The mock tests mirrored the real exam perfectly, and the weekly reviews helped me fix my weak areas. Scored in the top 100!', rating: 5 },
      { name: 'Priya Adhikari', role: 'Student', company: 'Bridge Course, Science', avatar: 'https://i.pravatar.cc/100?img=12', content: 'The bridge course made my transition from SEE to +2 Science so smooth. The teachers broke down complex topics into simple concepts. I felt confident going into my first semester.', rating: 5 },
      { name: 'Sagar Thapa', role: 'Student', company: 'BSc CSIT Prep', avatar: 'https://i.pravatar.cc/100?img=20', content: 'I joined for CSIT entrance prep and the structured curriculum was exactly what I needed. The doubt-clearing sessions were incredibly helpful. Highly recommend for anyone aiming for top colleges.', rating: 5 },
      { name: 'Anjana Karki', role: 'Student', company: 'Staff Nurse Entrance', avatar: 'https://i.pravatar.cc/100?img=23', content: 'The health science entrance prep was thorough and well-organized. Practice questions and subject-wise tests covered everything that appeared in the exam. Grateful to the entire team!', rating: 5 },
      { name: 'Rohit Basnet', role: 'Student', company: 'BE Entrance Prep', avatar: 'https://i.pravatar.cc/100?img=33', content: 'What really helped me was the performance analytics — I could track my progress week by week. The mentorship program kept me motivated throughout the preparation.', rating: 5 },
      { name: 'Sneha Pandey', role: 'Student', company: 'Bridge Course, Management', avatar: 'https://i.pravatar.cc/100?img=42', content: 'I was nervous about switching to Management in +2, but the bridge course gave me a solid foundation. The faculty made learning enjoyable and the study materials were top-notch.', rating: 4 },
      { name: 'Bibek Gurung', role: 'Student', company: 'Diploma Engg Prep', avatar: 'https://i.pravatar.cc/100?img=55', content: 'Affordable yet high-quality preparation. The mock tests every week kept me on track, and the expert feedback helped me improve my speed and accuracy. Thank you Mirror!', rating: 5 },
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
        email: 'admin@mirror.com',
        password: hashedPassword,
        isAdmin: true,
        isEmailVerified: true,
        number: '9851198288',
        school: 'Mirror Academy',
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
    ]

    for (const c of contacts) {
      await Contact.findOrCreate({
        where: { email: c.email, subject: c.subject },
        defaults: c,
      })
    }
    console.log(`Seeded ${contacts.length} contacts`)

    console.log('✅ All seed data inserted successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
