"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { link } from "fs";

// Animation variants
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    rotate: 5,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const skillCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Custom hook for intersection observer
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return [ref, isInView] as const;
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <h1 className="text-xl font-bold text-gradient cursor-pointer">
                HS.js
              </h1>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { name: "Home", id: "home" },
                  { name: "About", id: "about" },
                  { name: "Experience", id: "experience" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "footer" },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.1,
                      color: "#667eea",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-900 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        />
        <motion.div
          style={{ y: textY }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Hi, I'm{" "}
              <motion.span
                className="text-gradient"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 8px rgba(102, 126, 234, 0.5)",
                }}
              >
                Hasnain
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Data Science & AI Engineer | Generative AI | Software Developer
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              MSc in Applied Computer Science student passionate about building
              intelligent systems and innovative solutions
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                  onClick={() => scrollToSection("footer")}
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              whileInView={{
                backgroundSize: ["0% 3px", "100% 3px"],
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
              className="text-4xl font-bold text-gray-900 mb-4 inline-block"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Passionate about leveraging cutting-edge AI technologies to solve
              real-world problems and create meaningful impact.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft} className="space-y-6">
              <motion.h3
                whileInView={{ color: ["#6b7280", "#1f2937"] }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-semibold text-gray-900"
              >
                My Journey
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 leading-relaxed"
              >
                Currently pursuing my Master's in Applied Computer Science at
                Georg August University, Göttingen, I combine academic
                excellence with practical industry experience. With a strong
                foundation in AI, machine learning, and software development,
                I'm passionate about building innovative solutions that bridge
                the gap between research and real-world applications.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 leading-relaxed"
              >
                My expertise spans from generative AI and natural language
                processing to full-stack development, allowing me to create
                comprehensive solutions that address complex challenges in
                healthcare, education, and social platforms.
              </motion.p>
            </motion.div>

            <motion.div variants={slideInRight} className="space-y-6">
              <motion.h3
                whileInView={{ color: ["#6b7280", "#1f2937"] }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-semibold text-gray-900"
              >
                Education Timeline
              </motion.h3>
              <motion.div variants={staggerContainer} className="space-y-4">
                <motion.div
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  className="border-l-4 border-primary pl-6 pb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-r-lg"
                >
                  <div className="flex items-center mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-primary rounded-full -ml-8 mr-4"
                    />
                    <Badge variant="secondary">2025 - Present</Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    MSc in Applied Computer Science
                  </h4>
                  <p className="text-gray-600">
                    Georg August University, Göttingen
                  </p>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  className="border-l-4 border-gray-300 pl-6 bg-gray-50 p-4 rounded-r-lg"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full -ml-8 mr-4"></div>
                    <Badge variant="outline">2021 - 2024</Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    BE in Information Technology
                  </h4>
                  <p className="text-gray-600">
                    Vidyalankar Institute of Technology, Mumbai
                  </p>
                  <motion.p
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-sm text-gray-500 mt-1 font-semibold"
                  >
                    CGPA: 8.98/10
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              whileInView={{
                backgroundSize: ["0% 3px", "100% 3px"],
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
              className="text-4xl font-bold text-gray-900 mb-4 inline-block"
            >
              Work Experience
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Building innovative solutions across diverse industries
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Jr. Data Science & AI Engineer",
                company: "ClientLink",
                period: "04/2025 - Present",
                type: "default",
                points: [
                  "Automated social media post classification and SQL data workflows, improving analytics efficiency for Hilti, Knauf, and Bonprix.",
                  "Implementing machine learning models for predictive analytics",
                  "Developed ML models to predict user session journeys, to gain actionable insights into customer behavior.",
                ],
              },
              {
                title: "Software Developer",
                company: "Catch IT",
                period: "03/2025 - 06/2025",
                type: "outline",
                points: [
                  "Developed an AI-powered image tagging solution that analyzes images and categorizes them.",
                  "Containerized the tagging solution using Docker and deployed it to Google Cloud Run for scalable and serverless execution.",
                  "Implemented Instagram Login in Flutter using the Graph API, enabling user auth and retrieval of profile details",
                ],
              },
              {
                title: "Generative AI Engineer",
                company: "Startino",
                period: "07/2024 - 09/2025",
                type: "outline",
                points: [
                  "Adapt Project (Healthcare Chatbot): Developed gamified milestone features to track user activities (e.g., running, sleeping, eating), reset daily streaks, and calculate dynamic milestones.",
                  "Designed cognitive architecture for intelligent agents, enabling seamless interaction across multimodal inputs.",
                ],
              },
              {
                title: "Software Developer Intern",
                company: "Mercor",
                period: "06/2023 - 10/2023",
                type: "outline",
                points: [
                  "Developed a sneaker API, reducing data retrieval time by 40%, integrating StockX and GOAT for seamless sneaker listings.",
                  "Built a responsive Next.js interface with advanced filtering, seller dashboards, and sales analytics, boosting seller engagement by 25%.",
                  " Implemented a secure payment gateway, allowing sellers to create Stripe accounts and conveniently manage transactions",
                ],
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="card-hover h-full bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="text-lg">
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={job.type === "default" ? "default" : "outline"}
                      >
                        {job.period}
                      </Badge>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={staggerContainer}
                      className="space-y-2 text-gray-600"
                    >
                      {job.points.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          variants={fadeInUp}
                          whileHover={{ x: 5, color: "#374151" }}
                        >
                          • {point}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              whileInView={{
                backgroundSize: ["0% 3px", "100% 3px"],
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
              className="text-4xl font-bold text-gray-900 mb-4 inline-block"
            >
              Featured Projects
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Innovative solutions that showcase my technical expertise
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "MediaFusion",
                subtitle: "Semantic Search & Multimodal AI Platform",
                description:
                  "Advanced platform combining semantic search with multimodal AI capabilities for enhanced content discovery and analysis.",
                technologies: [
                  "Python",
                  "LangChain",
                  "Vector DB",
                  "Transformers",
                ],
                link: "https://github.com/Hasnain01-hub/mediafusion",
              },
              {
                title: "GoalTube",
                subtitle: "YouTube AI-powered Learning Platform",
                description:
                  "AI-enhanced learning platform that transforms YouTube content into structured educational experiences with personalized recommendations.",
                technologies: [
                  "Next.js",
                  "OpenAI API",
                  "Firebase",
                  "YouTube API",
                ],
                link: "https://github.com/Hasnain01-hub/goaltube",
              },
              {
                title: "ReachME",
                subtitle: "Decentralized Social Platform",
                description:
                  "Blockchain-based social platform featuring Ethereum tipping system, promoting creator economy and decentralized interactions.",
                technologies: ["React", "Ethereum", "Web3", "Solidity"],
                link: "https://github.com/ronaklala/ReachMe",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="card-hover h-full bg-gradient-to-br from-white via-gray-50 to-blue-50">
                  <CardHeader>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.subtitle}</CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      variants={fadeInUp}
                      className="text-gray-600 mb-4"
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      variants={staggerContainer}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          variants={scaleIn}
                          whileHover={{ scale: 1.1, rotate: 2 }}
                        >
                          <Badge variant="secondary" className="text-sm">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.link, "_blank")}
                        className="w-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                      >
                        View Project
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.h2
              whileInView={{
                backgroundSize: ["0% 3px", "100% 3px"],
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
              className="text-4xl font-bold text-gray-900 mb-4 inline-block"
            >
              Awards & Achievements
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Recognition for innovation and technical excellence
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🏆",
                title: "12x Hackathon Winner",
                description:
                  "Multiple first-place victories in prestigious coding competitions",
              },
              {
                icon: "🎯",
                title: "3x Hackathon Judge",
                description:
                  "Evaluated innovative projects and mentored aspiring developers",
              },
              {
                icon: "📢",
                title: "Guest Speaker",
                description:
                  "Share insights on various database and its applications",
              },
            ].map((award, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                <Card className="text-center card-hover h-full bg-gradient-to-br from-white to-yellow-50">
                  <CardContent className="pt-6">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="text-4xl mb-4"
                    >
                      {award.icon}
                    </motion.div>
                    <motion.h3
                      variants={fadeInUp}
                      className="text-xl font-semibold mb-2"
                    >
                      {award.title}
                    </motion.h3>
                    <motion.p variants={fadeInUp} className="text-gray-600">
                      {award.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="section-padding bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <motion.h2
              whileInView={{
                backgroundSize: ["0% 3px", "100% 3px"],
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
              className="text-4xl font-bold text-gray-900 mb-4 inline-block"
            >
              Skills & Technologies
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600">
              Comprehensive toolkit for modern development
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "💻",
                title: "Programming Languages",
                skills: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
                gradient: "from-blue-50 to-indigo-100",
              },
              {
                icon: "🤖",
                title: "AI & Machine Learning",
                skills: [
                  "LangChain",
                  "LangGraph",
                  "pandas",
                  "Hugging Face",
                  "PyTorch",
                  "TensorFlow",
                  "OpenAI API",
                ],
                gradient: "from-purple-50 to-pink-100",
              },
              {
                icon: "🌐",
                title: "Web Development",
                skills: [
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "HTML5",
                  "CSS3",
                ],
                gradient: "from-green-50 to-emerald-100",
              },
              {
                icon: "📱",
                title: "Mobile Development",
                skills: ["Flutter", "React Native", "Android", "iOS"],
                gradient: "from-orange-50 to-red-100",
              },
              {
                icon: "🗄️",
                title: "Databases",
                skills: [
                  "PostgreSQL",
                  "MongoDB",
                  "Firebase",
                  "Vector DB",
                  "Redis",
                ],
                gradient: "from-teal-50 to-cyan-100",
              },
              {
                icon: "☁️",
                title: "Cloud & DevOps",
                skills: ["GCP", "Docker", "Kubernetes", "Git", "CI/CD"],
                gradient: "from-gray-50 to-slate-100",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={skillCardVariants}
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                className={`bg-gradient-to-br ${category.gradient} p-6 rounded-xl cursor-pointer`}
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                >
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                    className="text-2xl mr-2"
                  >
                    {category.icon}
                  </motion.span>
                  {category.title}
                </motion.h3>
                <motion.div
                  variants={staggerContainer}
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={scaleIn}
                      whileHover={{
                        scale: 1.1,
                        rotate: 2,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-sm hover:bg-white hover:shadow-md transition-all duration-200"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        id="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-gray-900 py-12"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} className="text-center">
            <motion.h6
              variants={fadeInUp}
              whileHover={{ scale: 1.05, color: "#667eea" }}
              className="text-lg font-bold text-white mb-2"
            >
              lets connect!
            </motion.h6>
            {/* <motion.p variants={fadeInUp} className="text-gray-400 mb-8">
              
            </motion.p> */}

            {/* Social Links */}
            <motion.div
              variants={staggerContainer}
              className="flex justify-center space-x-6 mb-8"
            >
              {[
                {
                  href: "https://github.com/Hasnain01-hub",
                  icon: (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                  hoverColor: "hover:bg-gray-700",
                },
                {
                  href: "https://www.linkedin.com/in/hasnain-sayyed-537164177/",
                  icon: (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  hoverColor: "hover:bg-blue-600",
                },
                {
                  href: "mailto:hasnainsayyed833@gmail.com",
                  icon: (
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  hoverColor: "hover:bg-red-600",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  variants={scaleIn}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    y: -5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 ${social.hoverColor} transition-all duration-300`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Separator className="bg-gray-700 mb-6" />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gray-400 text-sm">
              © 2025. Built with ❤️
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
