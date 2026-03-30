"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaNodeJs,
  FaDocker,
  FaAws,
  FaLinux,
  FaGitAlt
} from "react-icons/fa";

import {
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiMysql,
  SiMongodb,
  SiExpress,
  SiPostman,
  SiNginx
} from "react-icons/si";

const techIcons = [
  { icon: <SiJavascript />, color: "text-yellow-400" },
  { icon: <SiPython />, color: "text-blue-400" },
  { icon: <SiOpenjdk />, color: "text-red-500" },
  { icon: <SiMysql />, color: "text-blue-500" },
  { icon: <SiMongodb />, color: "text-green-500" },
  { icon: <FaNodeJs />, color: "text-green-400" },
  { icon: <SiExpress />, color: "text-gray-300" },
  { icon: <FaDocker />, color: "text-blue-400" },
  { icon: <FaAws />, color: "text-orange-400" },
  { icon: <FaGitAlt />, color: "text-orange-500" },
  { icon: <SiPostman />, color: "text-orange-500" },
  { icon: <FaLinux />, color: "text-yellow-300" },
  { icon: <SiNginx />, color: "text-green-400" },
];

export default function FloatingTech() {

  // Generate positions ONLY once
  const positions = useMemo(() => {
    return techIcons.map(() => ({
      top: Math.random() * 80 + 5,
      left: Math.random() * 90 + 2,
      duration: 4 + Math.random() * 6
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">

      {techIcons.map((tech, i) => (
        <motion.div
          key={i}
          className={`absolute ${tech.color} opacity-30 text-5xl`}
          style={{
            top: `${positions[i].top}%`,
            left: `${positions[i].left}%`
          }}
          animate={{ y: [0, -30, 0] }}
          transition={{
            duration: positions[i].duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {tech.icon}
        </motion.div>
      ))}

    </div>
  );
}