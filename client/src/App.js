import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, ExternalLink, ChevronRight, Link} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Change Images Based on Time of Day
  const getTimeOfDayImage = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return '/images/morning.jpg';
    if (hour >= 12 && hour < 18) return '/images/afternoon.jpg';
    if (hour >= 18 && hour < 21) return '/images/evening.jpg';
    return '/images/night.jpg';
  };

  const [heroImage, setHeroImage] = useState(getTimeOfDayImage());


  // Jumps to Section when Clicked from NavBar (smooth)  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  const projects = [
    {
      title: "Mini Casino",
      period: "March 2025 – April 2025",
      description: "Full stack web-based casino application with Spring Boot backend and React frontend, featuring user authentication, betting system, and persistent account management.",
      tech: ["Spring Boot", "React", "PostgreSQL"], 
      link: "https://github.com/AndePark/Casino"
    },
    {
      title: "Spotify Image AI",
      period: "April 2024 – Sept 2024",
      description: "Spotify playlist cover image generator using OpenAI's DALL-E 2 API to create dynamic artwork based on audio features like danceability, energy, and tempo.",
      tech: ["Express", "React", "OpenAI API"],
      link: "https://github.com/AndePark/Spotify-Image-AI"
    },
    {
      title: "Code Comprehension Tutor",
      period: "May 2024 – Aug 2024",
      description: "Web application for assessing code comprehension using Ollama LLM to generate code from plain English explanations with functional equivalence testing.",
      tech: ["React", "TypeScript", "Ollama", "Docker"],
      link: "https://github.com/AndePark/LLM-Tutor"
    },
    {
      title: "Grocery Store Price Tracker",
      period: "March 2024",
      description: "Application for managing grocery lists with real-time price comparisons across grocery stores in the UBC area.",
      tech: ["Express", "React", "MongoDB"],
      link: "https://github.com/AndePark/Grocery-Store-Picker"
    }
  ];

  const experience = [
    {
      company: "Ocean Networks Canada",
      role: "Software Engineer Intern",
      period: "May 2023 – Dec 2023",
      highlights: [
        "Refactored 3 legacy webpages using React/TypeScript, reducing navigation clicks from 5 to 2",
        "Increased data capture rate by 30% through full-stack dashboard with React/Python",
        "Migrated NoSQL to relational database with ETL pipeline, improving data persistence by 20%"
      ]
    },
    {
      company: "NETGEAR",
      role: "Software Engineer Intern",
      period: "Sept 2022 – April 2023",
      highlights: [
        "Automated manual tests with Python scripts, achieving 45% faster testing turnover",
        "Reduced testing efforts from 2-5 minutes through automation while ensuring repeatability",
        "Documented and verified software defects for efficient issue resolution"
      ]
    }
  ];

  const skills = {
    "Languages": ["Java", "Python", "C/C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    "Frameworks": ["React", "Node.js", "Express.js", "Spring Boot"],
    "Tools": ["Docker", "Kubernetes", "AWS", "Git", "Cypress", "Postman"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Andrew Park
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize hover:text-blue-400 transition-colors py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <img
          src={heroImage}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold">
              Software Engineer
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl">
              Computer Science graduate from UBC specializing in full-stack development, 
              with experience building scalable web applications and data pipelines.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:andrewpark2396@gmail.com" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors">
                <Mail size={20} />
                Get in Touch
              </a>
              <a href="https://github.com/andepark" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors">
                <Github size={20} />
                GitHub
              </a>
              <a href="https://linkedin.com/in/andepark" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition-colors">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">About Me</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-300">
              <p className="text-lg leading-relaxed">
                I'm a recent Computer Science graduate from the University of British Columbia 
                with a passion for building efficient, user-focused applications. My experience 
                spans full-stack development, database optimization, and automated testing.
              </p>
              <p className="text-lg leading-relaxed">
                During my internships at Ocean Networks Canada and NETGEAR, I've worked on 
                everything from refactoring legacy systems to building data pipelines that 
                process real-time information. I enjoy tackling complex problems and creating 
                solutions that make a tangible impact.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-blue-400">Skills</h4>
                <div className="space-y-3">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-sm text-slate-400 mb-1">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12">Experience</h3>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors border border-slate-700">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-semibold text-blue-400">{job.company}</h4>
                    <p className="text-lg text-slate-300">{job.role}</p>
                  </div>
                  <p className="text-slate-400 mt-2 md:mt-0">{job.period}</p>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-slate-300">
                      <ChevronRight className="flex-shrink-0 mt-1 text-blue-400" size={20} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-12">Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-6 hover:transform hover:scale-105 transition-all border border-slate-700">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                    {project.title}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Link size={20}/>
                    </a>
                  </h4>
                </div>
                <p className="text-sm text-slate-400 mb-3">{project.period}</p>
                <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-slate-300 text-lg">
                I'm currently looking for new opportunities. Whether you have a question or 
                just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <a href="mailto:andrewpark2396@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                  <Mail size={24} />
                  andrewpark2396@gmail.com
                </a>
                <a href="tel:6474632231" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                  <Phone size={24} />
                  (647) 463-2231
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none"
              />
              <button
                onClick={handleSubmit}
                disabled={formStatus === 'sending'}
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending...' : 
                 formStatus === 'success' ? 'Message Sent!' : 
                 formStatus === 'error' ? 'Failed - Try Again' : 
                 'Send Message'}
              </button>
              {formStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2">Failed to send message. Please try again or email directly.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>Thank You For Visiting</p>
        </div>
      </footer>
    </div>
  );
}