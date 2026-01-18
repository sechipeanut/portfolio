import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { client, PROJECTS_QUERY } from '../lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(PROJECTS_QUERY);
        console.log('Fetched projects:', data);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        // Fallback to default projects
        setProjects([
          {
            _id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: '#',
            github: '#',
            image: '🛍️'
          },
          {
            _id: '2',
            title: 'Task Management App',
            description: 'Collaborative project management tool with real-time updates, drag-and-drop interface, and team collaboration features.',
            tech: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
            link: '#',
            github: '#',
            image: '✅'
          },
          {
            _id: '3',
            title: 'Social Media Dashboard',
            description: 'Analytics dashboard for social media metrics with data visualization, automated reporting, and multi-platform integration.',
            tech: ['Next.js', 'Chart.js', 'PostgreSQL', 'API'],
            link: '#',
            github: '#',
            image: '📊'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="experience" className="py-20 px-6 bg-secondary bg-opacity-30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg">
            Some of my recent work and side projects
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                className="group bg-tertiary bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary border-opacity-20 hover:border-opacity-50 hover:shadow-2xl hover:shadow-primary/20"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-primary to-tertiary flex items-center justify-center overflow-hidden">
                {project.image ? (
                  // Check if it's a URL string
                  typeof project.image === 'string' && (project.image.startsWith('http://') || project.image.startsWith('https://')) ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', project.image);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-6xl">📷</span>';
                      }}
                    />
                  ) : project.image.asset ? (
                    // Sanity image asset
                    <img 
                      src={project.image.asset.url || urlFor(project.image).width(600).height(400).url()} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', project.image);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-6xl">📷</span>';
                      }}
                    />
                  ) : (
                    // Emoji or other string
                    <span className="text-6xl">{project.image}</span>
                  )
                ) : (
                  <span className="text-6xl">📷</span>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.link || project.github) && (
                  <div className="flex gap-4 pt-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${project.github ? 'flex-1' : 'w-full'} text-center px-4 py-2 bg-primary hover:bg-opacity-80 text-white text-sm font-medium rounded-lg transition-all duration-300`}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${project.link ? 'flex-1' : 'w-full'} text-center px-4 py-2 border border-primary hover:bg-primary hover:bg-opacity-10 text-white text-sm font-medium rounded-lg transition-all duration-300`}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
