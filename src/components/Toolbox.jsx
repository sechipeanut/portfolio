import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { client, TECH_STACK_QUERY } from '../lib/sanity';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as DiIcons from 'react-icons/di';
import * as TbIcons from 'react-icons/tb';

const Toolbox = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to dynamically get icon component
  const getIcon = (library, iconName) => {
    const iconLibraries = {
      si: SiIcons,
      fa: FaIcons,
      di: DiIcons,
      tb: TbIcons,
    };

    const IconLibrary = iconLibraries[library?.toLowerCase()] || SiIcons;
    const IconComponent = IconLibrary[iconName];

    return IconComponent || SiIcons.SiReact; // Fallback icon
  };

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(TECH_STACK_QUERY);
        console.log('Tech stack data from Sanity:', data);
        setTools(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tech stack:', err);
        setError('Failed to load tech stack');
        // Fallback to default tools
        setTools([
          { _id: '1', name: 'React', iconLibrary: 'si', iconName: 'SiReact', color: '#61DAFB' },
          { _id: '2', name: 'TypeScript', iconLibrary: 'si', iconName: 'SiTypescript', color: '#3178C6' },
          { _id: '3', name: 'JavaScript', iconLibrary: 'si', iconName: 'SiJavascript', color: '#F7DF1E' },
          { _id: '4', name: 'Node.js', iconLibrary: 'fa', iconName: 'FaNodeJs', color: '#339933' },
          { _id: '5', name: 'Tailwind CSS', iconLibrary: 'si', iconName: 'SiTailwindcss', color: '#06B6D4' },
          { _id: '6', name: 'Vite', iconLibrary: 'si', iconName: 'SiVite', color: '#646CFF' },
          { _id: '7', name: 'Git', iconLibrary: 'fa', iconName: 'FaGitAlt', color: '#F05032' },
          { _id: '8', name: 'Docker', iconLibrary: 'fa', iconName: 'FaDocker', color: '#2496ED' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return (
    <section id="toolbox" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tech Stack</h2>
          <p className="text-gray-400 text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-400 mt-4">Loading tech stack...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool._id}
                className="group relative bg-tertiary bg-opacity-50 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-70 border border-primary border-opacity-20 hover:border-opacity-50 hover:shadow-xl hover:shadow-primary/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: 'easeOut'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                  {React.createElement(getIcon(tool.iconLibrary, tool.iconName), {
                    className: "text-6xl",
                    style: { color: tool.color || '#587B7F' }
                  })}
                </div>
                <h3 className="text-white font-semibold text-center text-sm">
                  {tool.name}
                </h3>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Toolbox;
