// server/initializeDB.js
const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Profile = require('./models/Profile');
const Publication = require('./models/Publication');
const Education = require('./models/Education');
const Experience = require('./models/Experience');

// Sample Data
const sampleProfile = {
  name: "Dr. Aarti Karande",
  title: "Professor",
  department: "Computer Science and Engineering",
  university: "Visvesvaraya National Institute of Technology",
  email: "admin@aartimkarande.in",
  phone: "+91 992 062 5758",
  address: "Department of CSE, VNIT, Nagpur, Maharashtra, India",
  about: "Dr. Aarti Milind Karande works at the Sardar Patel Institute of Technology (S.P.I.T.) as an assistant professor. She earned her Ph.D. in Computer Engineering, S.P.I.T. from Mumbai University and her post doctorate from CDAC in the field of enterprise architecture, where she developed the framework needed to manage business process agility.",
  researchInterests: [
    "Machine Learning",
    "Data Mining",
    "Artificial Intelligence",
    "Big Data Analytics",
    "Computer Vision"
  ],
  imageUrl: "professor-portfolio/server/uploads/profilepic.jpg",
  socialLinks: [
    {
      platform: "Google Scholar",
      url: "https://scholar.google.com/citations?user=EXAMPLE",
      iconClass: "fab fa-google"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/example",
      iconClass: "fab fa-linkedin"
    },
    {
      platform: "ResearchGate",
      url: "https://researchgate.net/profile/example",
      iconClass: "fab fa-researchgate"
    }
  ]
};

const samplePublications = [
  {
    title: "Advanced Machine Learning Techniques for Data Analysis",
    authors: ["D. K. Kalbande", "A. B. Patil", "C. D. Sharma"],
    journal: "International Journal of Computer Applications",
    year: 2022,
    doi: "10.1234/123456789",
    link: "https://doi.org/10.1234/123456789",
    category: "journal"
  },
  // Add more publications as needed
];

const sampleEducation = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "University of Mumbai",
    year: "2005",
    description: "Thesis on Machine Learning Algorithms"
  },
  // Add more education entries
];

const sampleExperience = [
  {
    position: "Professor",
    institution: "Shah And Anchor College, Mumbai University, Jun'01",
    duration: "2015 - Present",
    description: [
      "Teaching undergraduate and postgraduate courses",
      "Supervising PhD students",
      "Conducting research in AI/ML"
    ],
    current: true
  },
  // Add more experience entries
];

// Initialize Database
async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.db.dropDatabase();
    console.log('Database cleared');

    // Insert sample data
    const profile = await Profile.create(sampleProfile);
    const publications = await Publication.insertMany(samplePublications);
    const education = await Education.insertMany(sampleEducation);
    const experience = await Experience.insertMany(sampleExperience);

    console.log('Database initialized with sample data');
    console.log({
      profile: profile._id,
      publications: publications.length,
      education: education.length,
      experience: experience.length
    });

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

initializeDatabase();