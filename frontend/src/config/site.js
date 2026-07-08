export const SITE = {
  name: "Mirror",
  shortName: "Mirror",
  tagline: "Building a strong foundation for your future",
  description:
    "Mirror is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations.",
  url: import.meta.env.VITE_SITE_URL || "https://institute-frontend-gamma.vercel.app",
  pageTitle: "Mirror Academy",
  copyright: `(c)${new Date().getFullYear()} Mirror`,
  logo: "/logo.png",
  favicon: "/vite.svg",
  fontFamily: "Poppins",
  ogImage: "",
};

export const THEME = {
  primary: "#004e8f",
  secondary: "#f7921d",
};

export const API = {
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://institute-xi.vercel.app' : ''),
};

export const HERO = {
  heading: "Empowering Learning for",
  headingHighlight: "Everyone",
  subtitle:
    "Join Mirror where expert-led teaching, data-driven performance analytics, and a mentorship-driven community come together to give you the clarity, confidence, and competence to excel.",
  image: "Home/Interview.png",
  video: {
    url: "https://www.facebook.com/plugins/video.php?height=500&href=https%3A%2F%2Fwww.facebook.com%2F61555638202803%2Fvideos%2F1042443771036432%2F&show_text=false&width=560&t=0",
    width: "560",
    height: "472",
  },
  features: [
    {
      icon: "Home/Learning.png",
      title: "Engaging Hybrid Learning Experiences",
      feature:
        "Experience a perfect blend of live sessions and recorded classes delivered by top professionals tailored to meet your needs.",
    },
    {
      icon: "/Home/Mentor.png",
      title: "Personalized Mentorship",
      feature:
        "Enjoy tailored guidance from experienced mentors who assist you in navigating your academic journey effectively.",
    },
    {
      icon: "Home/Libray.png",
      title: "Comprehensive Course Library",
      feature:
        "Access a structured content library that simplifies your study process and enriches your learning experience across various subjects.",
    },
  ],
  cta: "Join Mirror Today!",
};

export const ADS = {
  title: "Run your Ads here!",
  description:
    "Promote your educational services, products, or events to a highly engaged audience of learners and educators. Contact us to feature your advertisement on Mirror.",
  image: "/ad.png",
  cta: "Contact Us",
  ctaLink: "/contact",
};

export const ABOUT = {
  hero: {
    title: "About Mirror",
    subtitle: "Building a strong foundation for  your future",
    image: "/About/image.png",
  },
  sections: {
    aboutUs: {
      heading: "About Us",
      paragraphs: [
        "Mirror Academy is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. Founded by passionate educators and exam specialists, we exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.",
        "Our approach combines expert-led teaching, data-driven performance analytics, and a strong mentorship-driven community to give students the clarity, confidence, and competence they need to excel.",
      ],
    },
    introduction: {
      heading: "Introduction",
      paragraphs: [
        "At Mirror Academy, we believe that every student has the potential to excel — with the right guidance, strategy, and environment. That's why we offer a comprehensive, student-focused approach to entrance exam preparation, available both online and offline. Here's what sets us apart:",
      ],
      highlights: [
        "Focused Entrance Preparation with a strong emphasis on conceptual clarity and foundational understanding",
        "Chapter-wise tests, full-length exams, and smart analytics to track performance and guide improvement",
        "High-quality recorded video lectures, extensive practice sets, and interactive doubt-solving communities",
        "Mentorship from toppers and expert faculty who know what it takes to succeed",
        "Personalized support, flexible learning modes, and a vibrant, motivating student community",
      ],
      closing:
        "At Mirror Academy, we don't just prepare you for exams — we help you unlock your full academic potential.",
    },
    whyChooseUs: {
      heading: "Why Students Choose Us",
      items: [
        {
          icon: "About/expert.png",
          title: "Expert Instructors",
          description:
            "Our team consists of efficient and knowledgeable instructors with extensive experience in competitive exam preparation.",
        },
        {
          icon: "About/learning.png",
          title: "Flexible Learning",
          description:
            "Students can practice anytime and anywhere through online exams and get results that enhance their abilities.",
        },
        {
          icon: "About/support.png",
          title: "Dedicated Support",
          description:
            "Regular QAD, doubt clearing sessions, and special guidance by IOE Ambassadors every week.",
        },
      ],
      footer:
        "Founded by Pulchowk Campus graduates and front-line faculty members, PI contributes towards the development of qualitative future engineers who tend to establish a well-settled destiny in the field of engineering.",
    },
    message: {
      heading: "Message From Mirror Family",
      image: "About/person.png",
      content: [
        "Dear prospective students/Guardians, we take great delight in extending a warm welcome to you all at Mirror Academy—founded by the front-liner faculties of engineering entrance and graduates of Pulchowk Campus. Choosing Mirror guarantees you for making your future bright ahead.",
        "Our only goal is to support our students academically and maximise their outputs in the competitive examination. We will make our every effort count in paving the excellent way for engineering aspirants towards their dream.",
        "Our prime location Kathmandu Valley, Maitighar, is easily accessible from different corners of the valley. We are equipped with adequate infrastructure, quality books and qualified instructors to enforce excellent accomplishments. Together we can grow and create an impact in the field of engineering.",
        "Finally, we assume Mirror shall be considered as a place where your talent is furnished and you shall prepare yourself for a rewarding career in your interested field of engineering/IT and eventually to be a morally honoured and cultured citizen.",
        "Wishing you all the best and hoping for your gracious visit.\nThank you all.\n- Mirror Family",
      ],
    },
    cta: {
      text: "Ready to start your journey with Mirror Academy?",
      button: "Contact Us",
      link: "/contact",
    },
  },
};

export const CONTACT = {
  heading: "Get in Touch",
  subtitle:
    "Have questions about our programs or want to learn more about Mirror Academy? We'd love to hear from you.",
  info: {
    location: {
      label: "Our Location",
      lines: ["Maitighar, Kathmandu, Nepal", "Opposite St. Xavier's College, Kathmandu, Nepal"],
    },
    phone: {
      label: "Phone",
      value: "+977 01-5360880",
      href: "tel:+977015360880",
    },
    mobile: {
      label: "Mobile",
      value: "+977 9851198288",
      href: "tel:+9779851198288",
    },
    email: {
      label: "Email",
      value: "info@piacademy.edu.np",
      href: "mailto:info@piacademy.edu.np",
    },
    hours: {
      label: "Office Hours",
      weekday: "Sunday - Friday: 9:00 AM - 5:00 PM",
      saturday: "Saturday: Closed",
    },
    map: {
      title: "Find Us",
      subtitle: "Visit our institute in Birendranagar, Surkhet, Nepal",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.9261731741432!2d81.6145144607149!3d28.596655761428817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a2856f6815a925%3A0xe39c3b7fb150b978!2sExpert%20Education%20and%20Visa%20Service%2C%20Surkhet%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1750089763717!5m2!1sen!2snp",
    },
  },
};

export const SOCIAL = {
  facebook: import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "https://tiktok.com",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "9779843340238",
  developerCredit: {
    text: "Ashish Khadka",
    url: "https://www.facebook.com/aashish.khadka.37625",
  },
};

export const NAV_COURSES = [
  {
    title: "BE | BArch | BSc CSIT Entrance Preparation (Online)",
    price: "NPR.5000",
    slug: "BE | BArch | BSc CSIT Entrance Preparation (Online)",
  },
  {
    title: "Bridge Course (Science,Management)",
    price: "NPR.13000",
    slug: "Bridge Course (Science,Management)",
  },
  {
    title: "Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)",
    price: "NPR.2000",
    slug: "Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ram Shahi",
    description: "St.Xavier College, Scholarship",
    subtext: "Rank : 1 Entrance 2081",
    quote:
      "I've been a part of Pi Academy for the part three years, and it's been a rewarding journey. Our bridge course equips SEE-appeared students with a strong academic base for +2, while the IOE Entrance preparation is result-driven and highly focused. With expert faculty, regular mock tests, and a disciplined learning environment, PI Academy ensures every student gets the support they need to succeed. If you're serious about your future, this is the place to be!",
    avatar: "Home/person.png",
  },
];

export const PAYMENTS = {
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD || "drsfbaluf",
    uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET || "image_preset",
  },
  bank: {
    name: "Citizen Bank International",
    accountName: "Mirror",
    accountNumber: "****************",
    qrImage: "/logo.png",
    qrLabel: "Mirror",
  },
  contact: {
    phone: "+977 9851198288",
    email: "neobridge.edu.np",
    location: "Birendranagar,Surkhet, Nepal",
  },
  instructions: [
    "Use the account details shown below",
    "Upload your receipt image and click on the 'Submit Payment for Verification' button",
    "Manual payments will be verified by our team within 1-2 business days",
    "If you encounter any issues, please contact our support team",
  ],
};

export const FOOTER = {
  aboutHeading: "About Us",
  aboutText:
    "Mirror is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. We exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.",
  quickLinks: {
    heading: "Quick Links",
    links: [
      { label: "Menu", to: "" },
      { label: "About Us", to: "/about" },
      { label: "Log In", to: "/login" },
    ],
  },
  connectHeading: "Connect with Us",
  rights: "All Right Reserved",
};

export const MOCK = {
  heading: "Weekly Mock Test Results",
  subtitle:
    "Topper of each mock test receives a cash incentive to motivate and reward hard work!",
  viewButton: "View Result",
  placeholderImage: "Course/Bridge.png",
};

export const NOTICE = {
  heading: "Latest Notices",
  viewButton: "View Notice",
};

export const COURSES = {
  heading: "Explore Our Courses",
  subtitle: "Transform your future with our expert-led, comprehensive courses",
  enrollButton: "Enroll Now",
  learnMoreButton: "Learn More",
};

export const LOGIN = {
  heading: "Sign in to your account",
  subtitle: "Welcome back! Please login/Register to your account.",
  buttonText: "Google",
  footer: "Sign up to access full feature of the website",
};

export const PROFILE = {
  heading: "My Profile",
  notLoggedIn: "Not logged in",
  loading: "Loading Your Data",
  updateButton: "Update Profile",
  alreadyUpdated: "Already Updated",
  updating: "Updating...",
  logOut: "Log Out",
};

export const VERIFY = {
  heading: "Payment Receipts",
  subtitle: "View submitted payment receipts and their verification status.",
  pending: "Pending",
  verified: "Verified",
  markVerified: "Mark as Verified",
  verifying: "Verifying...",
};
