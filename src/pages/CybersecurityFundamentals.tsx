import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, ArrowLeft, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  moduleId: string;
  text: string;
  type: 'yesno' | 'text';
  correctAnswer: string;
  userAnswer?: string;
  showHint?: boolean;
}

function CybersecurityFundamentals() {
  const [activeSection, setActiveSection] = useState("what-is-cybersecurity");
  const [activeSubSection, setActiveSubSection] = useState("");
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      moduleId: "cia-triad",
      text: "Is encryption a method to ensure confidentiality?",
      type: "yesno",
      correctAnswer: "yes"
    },
    {
      id: 2,
      moduleId: "cia-triad",
      text: "Does role-based access control (RBAC) help maintain confidentiality?",
      type: "yesno",
      correctAnswer: "yes"
    },
    {
      id: 3,
      moduleId: "cia-triad",
      text: "What is used to check if data has been altered?",
      type: "text",
      correctAnswer: "checksums"
    },
    {
      id: 4,
      moduleId: "cia-triad",
      text: "What tool can verify the integrity of downloaded files?",
      type: "text",
      correctAnswer: "hashing algorithm"
    },
    {
      id: 5,
      moduleId: "cia-triad",
      text: "Is a disaster recovery plan important for ensuring availability?",
      type: "yesno",
      correctAnswer: "yes"
    },
    {
      id: 6,
      moduleId: "cia-triad",
      text: "Which attack targets the availability of services?",
      type: "text",
      correctAnswer: "denial of service"
    },
    {
      id: 7,
      moduleId: "cia-triad",
      text: "In the CIA Triad, what principle focuses on ensuring systems are always functioning?",
      type: "text",
      correctAnswer: "availability"
    },
    {
      id: 8,
      moduleId: "windows-fundamentals",
      text: "What is the purpose of the 'Users' directory, and what type of data is typically stored there?",
      type: "text",
      correctAnswer: "user profiles"
    },
    {
      id: 9,
      moduleId: "windows-fundamentals",
      text: "How would you list all files in the current directory from the command prompt?",
      type: "text",
      correctAnswer: "dir"
    },
    {
      id: 10,
      moduleId: "windows-fundamentals",
      text: "Explain the command to change directories from C:\\Users\\YourUsername to C:\\Users\\YourUsername\\Documents.",
      type: "text",
      correctAnswer: "cd documents"
    },
    {
      id: 11,
      moduleId: "windows-fundamentals",
      text: "Does NTFS support file encryption and permissions?",
      type: "yesno",
      correctAnswer: "yes"
    },
    {
      id: 12,
      moduleId: "windows-fundamentals",
      text: "Is Windows Defender capable of blocking network-based attacks?",
      type: "yesno",
      correctAnswer: "yes"
    }
  ]);

  const sections = [
    {
      id: "what-is-cybersecurity",
      title: "What is Cybersecurity",
      content: {
        introduction: "Cybersecurity refers to the practice of protecting systems, networks, and data from cyber threats such as hacking, malware, and unauthorized access. It involves a combination of technologies, processes, and best practices designed to safeguard digital assets from attacks or breaches. In the digital age, where almost every aspect of our lives is connected to the internet, cybersecurity is essential for ensuring privacy, security, and the overall trustworthiness of online systems.",
        sections: [
          {
            title: "Why Cybersecurity is Important",
            content: [
              "Protection from Data Breaches: With the increasing amount of sensitive information stored online, protecting that data from unauthorized access is critical. A breach can lead to financial loss, legal consequences, and reputational damage.",
              "Safeguarding Privacy: Cybersecurity helps protect individuals' private information, including personal, financial, and health data. Without it, this information could be exploited for identity theft, fraud, or blackmail.",
              "Preventing Financial Loss: Cyber attacks can result in significant financial damage, either through direct theft or operational disruptions. By securing systems, organizations can avoid these costly consequences.",
              "Maintaining Trust: Businesses and individuals rely on secure systems to foster trust. If security is compromised, customers and partners may lose confidence in the services being provided."
            ]
          },
          {
            title: "The Evolving Threat Landscape",
            content: [
              "Malware: Malicious software designed to disrupt or gain unauthorized access to a computer system.",
              "Phishing: Fraudulent attempts to obtain sensitive information, typically by email or social engineering techniques.",
              "Ransomware: A type of malware that locks users out of their system or data and demands payment to restore access.",
              "Man-in-the-Middle (MitM) Attacks: Attacks where an attacker intercepts and potentially alters communications between two parties.",
              "Denial of Service (DoS) Attacks: Attacks that overwhelm a system, making it unavailable to users."
            ]
          }
        ]
      }
    },
    {
      id: "careers-in-cybersecurity",
      title: "Careers in Cybersecurity",
      content: {
        introduction: "Cybersecurity is one of the fastest-growing fields, offering job security, competitive salaries, and exciting challenges. With the rise in cyber threats, organizations worldwide need skilled professionals to protect their digital assets. A career in cybersecurity allows you to work in various industries, from finance and healthcare to government and technology. Whether you enjoy problem-solving, ethical hacking, or analyzing cyber threats, there's a role suited for you.",
        sections: [
          {
            title: "Security Operations Center (SOC) Analyst",
            image: "/Fundamentals/soc.png", // Add image path
            content: [
              "Job Description:",
              "SOC Analysts are the first line of defense against cyber threats. They monitor security alerts, investigate potential incidents, and respond to cyberattacks in real time. They work in a Security Operations Center (SOC), analyzing logs and network traffic to detect malicious activity.",
              "",
              "Key Responsibilities:",
              "- Monitor and analyze security alerts from SIEM tools.",
              "- Investigate suspicious activities and escalate threats.",
              "- Respond to security incidents and document findings.",
              "- Perform threat intelligence analysis.",
              "- Conduct vulnerability assessments.",
              "",
              "Required Skills:",
              "- Knowledge of SIEM tools (Splunk, ELK, etc.).",
              "- Familiarity with Windows, Linux, and networking fundamentals.",
              "- Understanding of malware analysis and threat intelligence.",
              "- Strong analytical and problem-solving skills."
            ]
          },
          {
            title: "Security Engineer",
            image: "/Fundamentals/Engineer.png", // Add image path
            content: [
              "Job Description:",
              "Security Engineers design, implement, and maintain security controls to protect an organization’s infrastructure. They focus on strengthening defenses to prevent cyber threats.",
              "",
              "Key Responsibilities:",
              "- Develop and implement security policies and procedures.",
              "- Configure and manage firewalls, IDS/IPS, and endpoint security solutions.",
              "- Perform security assessments and penetration testing.",
              "- Automate security processes.",
              "- Conduct security training for employees.",
              "",
              "Required Skills:",
              "- Strong understanding of networking and system administration.",
              "- Proficiency in scripting languages (Python, Bash, PowerShell).",
              "- Experience with cloud security (AWS, Azure, GCP).",
              "- Knowledge of cryptography and secure coding practices."
            ]
          },
          {
            title: "Incident Responder",
            image: "/Fundamentals/Responder.png", // Add image path
            content: [
              "Job Description:",
              "Incident Responders handle cybersecurity incidents, mitigating damage and preventing recurrence. They work to identify, contain, and remediate cyberattacks.",
              "",
              "Key Responsibilities:",
              "- Analyze and contain security incidents.",
              "- Conduct forensic analysis on compromised systems.",
              "- Develop incident response plans and playbooks.",
              "- Work with SOC analysts to investigate threats.",
              "- Provide recommendations for security improvements.",
              "",
              "Required Skills:",
              "- Proficiency in digital forensics and malware analysis.",
              "- Understanding of attack techniques (MITRE ATT&CK framework).",
              "- Experience with EDR, SIEM, and forensic tools.",
              "- Strong communication and report-writing skills."
            ]
          },
          {
            title: "Digital Forensics Analyst",
            image: "/Fundamentals/Forensics.png", // Add image path
            content: [
              "Job Description:",
              "Digital Forensics Analysts investigate cybercrimes by analyzing digital evidence. They work on legal cases, corporate investigations, and incident response teams.",
              "",
              "Key Responsibilities:",
              "- Collect and analyze digital evidence from computers, servers, and mobile devices.",
              "- Recover deleted files and trace cybercriminal activities.",
              "- Prepare forensic reports and provide expert testimony.",
              "- Use forensic tools such as Autopsy, EnCase, and FTK.",
              "- Maintain the integrity and chain of custody of evidence.",
              "",
              "Required Skills:",
              "- Deep knowledge of file systems and operating systems.",
              "- Experience with forensic tools and methodologies.",
              "- Strong attention to detail and analytical thinking.",
              "- Understanding of cyber laws and compliance requirements."
            ]
          },
          {
            title: "Malware Analyst",
            image: "/Fundamentals/Malware.png", // Add image path
            content: [
              "Job Description:",
              "Malware Analysts study malicious software to understand how it works and how to defend against it. They reverse-engineer malware to uncover its purpose and mitigate threats.",
              "",
              "Key Responsibilities:",
              "- Analyze malware samples using dynamic and static analysis techniques.",
              "- Reverse-engineer malware using tools like IDA Pro and Ghidra.",
              "- Develop signatures and countermeasures to detect and remove malware.",
              "- Research emerging threats and document findings.",
              "- Collaborate with incident responders and threat intelligence teams.",
              "",
              "Required Skills:",
              "- Proficiency in assembly language and reverse engineering.",
              "- Knowledge of Windows internals and sandbox environments.",
              "- Experience with debugging tools (OllyDbg, x64dbg).",
              "- Strong programming skills (Python, C, C++)."
            ]
          },
          {
            title: "Penetration Tester",
            image: "/Fundamentals/PTester.png", // Add image path
            content: [
              "Job Description:",
              "Penetration Testers (ethical hackers) simulate cyberattacks to identify security weaknesses in systems, networks, and applications.",
              "",
              "Key Responsibilities:",
              "- Conduct vulnerability assessments and penetration tests.",
              "- Exploit security flaws to demonstrate potential risks.",
              "- Provide remediation recommendations to fix vulnerabilities.",
              "- Write detailed reports on findings.",
              "- Keep up with the latest hacking techniques and tools.",
              "", // Blank line
              "Required Skills:",
              "- Strong understanding of networking, web applications, and operating systems.",
              "- Proficiency in penetration testing tools (Burp Suite, Metasploit, Nmap).",
              "- Knowledge of scripting (Python, Bash) and exploit development.",
              "- Certifications such as OSCP, CEH are a plus."
            ]
          },
          {
            title: "Career Growth Opportunities",
            image: "/Fundamentals/career.png", // Add image path
            content: [
              "Cybersecurity offers numerous opportunities for career advancement. Professionals can start in entry-level roles and progress to specialized or leadership positions such as:",
              "- Security Architect: Designs security frameworks and ensures overall security posture.",
              "- Threat Hunter: Proactively searches for hidden threats within an organization.",
              "- Chief Information Security Officer (CISO): Leads an organization’s cybersecurity strategy and teams.",
              "- Red Team vs. Blue Team Specialist: Focuses on offensive (Red) or defensive (Blue) security strategies.",
              "- Cybersecurity Consultant: Provides security expertise to various organizations.",
              "",
              "With continuous learning, certifications (CISSP, OSCP, GIAC, etc.), and hands-on experience, professionals can shape their careers based on their interests and skills."
            ]
          }
        ]
      }
    },
    {
      id: "cia-triad",
      title: "The CIA Triad",
      content: {
        introduction: "The CIA Triad is the core concept of cybersecurity. It represents the three foundational principles that are essential to securing information systems and ensuring the protection of sensitive data. The CIA Triad stands for Confidentiality, Integrity, and Availability. These principles are the guiding framework that helps security professionals define the requirements and measures necessary for building secure systems.\n\nTogether, the CIA Triad forms the foundation for protecting information in every context, whether it's in the cloud, on-premises, or during communication between users. This module will dive deep into each component of the triad, providing a comprehensive understanding of why they are critical for cybersecurity.",
        sections: [
          {
            title: "Overview",
            content: [
              "Confidentiality: Ensuring that sensitive data is accessible only to those authorized to view it. This involves encryption, access control policies, and strong authentication mechanisms.",
              "Integrity: Ensuring that data is accurate and trustworthy. Integrity measures ensure that data cannot be altered without detection and that systems operate as expected without unauthorized changes.",
              "Availability: Ensuring that systems, services, and data are available when needed. This involves protection from denial-of-service attacks, regular backups, and disaster recovery plans."
            ]
          },
          {
            title: "1. Confidentiality: Protecting Sensitive Information",
            content: [
              "What is Confidentiality?",
              "Confidentiality refers to ensuring that information is only accessible to authorized individuals or systems. This principle is crucial for protecting sensitive data from unauthorized access, use, or disclosure. Confidentiality is particularly important when dealing with personal data, financial information, intellectual property, and any other classified information.",
              "Why is Confidentiality Important?",
              "Confidentiality is essential because it prevents unauthorized users from accessing or leaking sensitive data, which could lead to privacy violations, identity theft, and financial loss. Unauthorized disclosure of confidential information could also result in a breach of trust and legal ramifications, especially in regulated industries like healthcare and finance.",
              "Methods to Achieve Confidentiality:",
              "- Encryption: Encrypting data ensures that even if it is intercepted, it cannot be read without the decryption key. Data encryption can be applied both in transit (when moving across the network) and at rest (when stored on servers or databases).",
              "- Access Control: Access control mechanisms regulate who can access specific data and under what circumstances. This involves using role-based access control (RBAC) or discretionary access control (DAC) to limit access based on the user's role, level of authorization, or other factors.",
              "- Authentication: Strong authentication techniques are used to verify the identity of users or systems before granting them access to sensitive data. Multi-factor authentication (MFA) adds an extra layer of security by requiring more than one form of identification, such as a password and a fingerprint.",
              "- Data Masking & Tokenization: These techniques protect data by obscuring sensitive information within a database, ensuring that only authorized users can view the original data.",
              "Real-World Example:",
              "Imagine you're using an online banking app. To maintain confidentiality, the app uses encryption to protect your login credentials, account balance, and transaction details. Without encryption, anyone with access to the network could potentially intercept this sensitive data."
            ]
          },
          {
            title: "2. Integrity: Ensuring Data Accuracy",
            content: [
              "What is Integrity?",
              "Integrity refers to maintaining the accuracy and consistency of data throughout its lifecycle. This means that data should remain unaltered unless modified by authorized personnel or systems. Integrity ensures that the data you rely on for decision-making, business processes, and legal purposes is trustworthy and accurate.",
              "Why is Integrity Important?",
              "Without integrity, data becomes unreliable, which can lead to incorrect decisions, actions, and outcomes. Data corruption, whether intentional or accidental, can have devastating consequences, especially in industries like finance, healthcare, and national security. For example, altered financial data could lead to fraudulent transactions, or tampered medical records could lead to improper treatments.",
              "Methods to Achieve Integrity:",
              "- Hashing: A hash function generates a unique string (hash value) from the original data. If the data is altered, the hash value will change, providing an easy way to detect any tampering. Common hash algorithms include SHA-256, MD5, and SHA-1.",
              "- Checksums: Similar to hashing, checksums are used to verify the integrity of data. If the checksum of received data matches the checksum of the original data, the integrity is preserved. If they don't match, it means the data has been altered.",
              "- Digital Signatures: Digital signatures are used to verify both the origin and integrity of a message or document. This is particularly useful in ensuring that a document hasn't been tampered with during transmission.",
              "- Version Control: Keeping track of changes made to files or systems over time ensures that you can revert to previous versions if necessary, helping maintain data integrity.",
              "Real-World Example:",
              "Think about a company sending a critical report via email to a client. To ensure the document's integrity, the company uses a digital signature, so the client can verify that the document hasn't been altered in transit. Additionally, if the data is hashed before transmission, both parties can independently verify that the report is intact."
            ]
          },
          {
            title: "3. Availability: Ensuring Access",
            content: [
              "What is Availability?",
              "Availability ensures that data, applications, and systems are accessible when needed by authorized users. If a system or service goes down, it could disrupt business operations, lead to financial losses, and damage the reputation of a company or individual.",
              "Why is Availability Important?",
              "In today's connected world, downtime is not just an inconvenience—it can be costly. For example, an e-commerce site experiencing downtime may lose sales, while an online banking system may prevent customers from completing transactions. Ensuring that services are consistently available helps organizations maintain their operations and build trust with their users.",
              "Methods to Achieve Availability:",
              "- Redundancy: By implementing redundant systems, networks, and components, organizations can minimize the risk of downtime. For instance, using multiple servers to host critical applications or websites ensures that if one server fails, another can take over.",
              "- Load Balancing: Distributing workloads across multiple servers helps prevent any one server from becoming overwhelmed, ensuring that users can access services even during high traffic periods.",
              "- Regular Backups: Creating and storing backups of critical data ensures that data can be restored if it's lost, corrupted, or stolen. Backup solutions should be automated and tested regularly to ensure reliability.",
              "- Disaster Recovery Plans: A well-developed disaster recovery plan ensures that, in the event of a cyber attack, natural disaster, or system failure, critical services and data can be quickly restored to minimize downtime.",
              "- Network Monitoring and Intrusion Detection Systems (IDS): Continuous monitoring of network traffic and system performance can help detect potential threats before they cause disruptions. IDS systems can also identify potential attacks or failures that could impact availability.",
              "Real-World Example:",
              "Consider an online gaming platform. The company employs load balancing to handle peak traffic during game releases, ensuring that players can log in and play without lag. In addition, regular backups are performed to safeguard player data, and a disaster recovery plan ensures quick restoration in case of a server crash."
            ]
          },
          {
            title: "Summary",
            content: [
              "Summary of the CIA Triad:",
              "- Confidentiality ensures that only authorized individuals or systems can access sensitive information.",
              "- Integrity guarantees that data remains accurate, trustworthy, and untampered with.",
              "- Availability ensures that systems and data are available and accessible when needed.",
              "These three principles—confidentiality, integrity, and availability—work together to provide a strong foundation for securing information systems and protecting data from potential threats. As you continue your journey in cybersecurity, understanding and applying the CIA Triad will be critical to building and maintaining secure environments."
            ]
          },
          {
            title: "Quiz",
            isQuiz: true
          }
        ]
      }
    },
    {
      id: "windows-fundamentals",
      title: "Windows Fundamentals",
      content: {
        introduction: "Windows is the most widely used operating system across industries, mobile devices, and personal systems. Understanding Windows fundamentals is crucial for cybersecurity professionals, especially those working in Blue Team roles.",
        sections: [
          {
            title: "Introduction to Windows",
            content: [
              "What is Windows?",
              "Overview of Windows as an operating system family developed by Microsoft.",
              "First released in 1985, Windows has evolved into the most widely used operating system across industries, mobile devices, and personal systems.",
              "Different editions of Windows for various uses, including personal computing, servers, and enterprise environments.",
              "",
              "Windows for Blue Team:",
              "The importance of understanding Windows fundamentals in the context of cybersecurity.",
              "How knowledge of the OS's structure, file systems, and user management supports Blue Team defense efforts.",
              "Further reading on system hardening, forensics, and threat hunting in Windows environments.",
              "",
              "Windows Versions:",
              "Introduction to the different editions of Windows.",
              "Personal versions (Windows 10, Windows 11, etc.) and Server editions (Windows Server 2019, Windows Server 2022).",
              "Highlighting key differences in usage, functionality, and release history.",
              "",
              "Windows Usage Areas:",
              "Windows in IT: Commonly used in enterprise environments, personal computing, and embedded systems.",
              "Specialized versions for various use cases like gaming, corporate environments, and mobile devices.",
              "",
              "Why Use Windows?",
              "Benefits of using Windows: User-friendly GUI, extensive application support, and robust ecosystem.",
              "Discuss the stability, security features, and continual improvements that come with each version."
            ]
          },
          {
            title: "Windows File Systems",
            content: [
              "What is a File System?",
              "Explanation of file systems as essential data structures that manage and store files on physical drives.",
              "The role of the file system in organizing data and enabling easy retrieval by the operating system.",
              "",
              "Common Windows File Systems:",
              "FAT (File Allocation Table): A historical file system used on older devices and external drives.",
              "exFAT (Extensible File Allocation Table): Designed for flash drives and SD cards; optimized for portable storage devices.",
              "NTFS (New Technology File System): The default file system for Windows, known for its security features, support for large files, and data integrity.",
              "",
              "Why NTFS?",
              "Detailed explanation of NTFS features like journaling, file permissions, encryption, and support for large volumes.",
              "Practical considerations for Blue Team analysts: How NTFS impacts security and forensics, with a focus on its use in Windows environments."
            ]
          },
          {
            title: "Windows Directory Structure",
            content: [
              "Understanding Windows Directory Structure:",
              "The root directory (typically 'C:') and the general folder structure.",
              "Key system folders like Program Files, Users, Windows, and hidden directories.",
              "The structure of user profiles, installation folders, and system files.",
              "",
              "Windows Core Folders:",
              "Program Files: Where software is installed; the distinction between 32-bit and 64-bit systems.",
              "Users: Contains personal folders for each user on the system, including Documents, Pictures, and Desktop files.",
              "Windows Folder: Contains the operating system's core files, drivers, and system data.",
              "ProgramData: Hidden folder used by applications to store data shared across all users."
            ]
          },
          {
            title: "Command Line Basics",
            content: [
              "What is the Command Line?",
              "Introduction to the Command Prompt (CMD) in Windows as a tool for interacting with the operating system.",
              "Differences between GUI-based operations and command-line operations.",
              "",
              "Basic Command Line Commands:",
              "Help: Display information about other commands.",
              "dir: List files and directories in the current directory.",
              "cd: Change directories in the file system.",
              "echo: Output text to the screen.",
              "hostname: Display the computer's network name.",
              "ping: Test network connectivity.",
              "",
              "Network Command Line Tools:",
              "ipconfig: Display IP configuration details.",
              "netstat: View active network connections and their statuses.",
              "nslookup: Resolve domain names to IP addresses.",
              "",
              "File Management via Command Line:",
              "type: Display the contents of a file.",
              "copy, move, and rename: Basic file manipulation commands.",
              "mkdir and rmdir: Create and delete directories.",
              "tree: Display a directory tree structure."
            ]
          },
          {
            title: "User Accounts and Permissions",
            content: [
              "Types of User Accounts in Windows:",
              "Administrator vs. Standard User accounts and their respective privileges.",
              "How the system determines which user has access to system resources.",
              "",
              "Managing User Accounts:",
              "How to add, modify, or remove user accounts from Windows.",
              "The role of local users and groups in managing system permissions.",
              "Using lusrmgr.msc (Local Users and Groups Management) to manage accounts.",
              "",
              "User Profiles and Folder Structure:",
              "Where user profiles are stored (typically in C:\\Users).",
              "Key subfolders under each user profile: Desktop, Downloads, Documents.",
              "The process of profile creation when a user logs into a system for the first time.",
              "",
              "Group Permissions and Security:",
              "How groups work in Windows and the permissions they provide.",
              "How users inherit group permissions, and what this means for security.",
              "The importance of managing group membership for proper access control."
            ]
          },
          {
            title: "Security Features in Windows",
            content: [
              "User Account Control (UAC):",
              "UAC's role in preventing unauthorized changes to the system by prompting users for approval before executing privileged actions.",
              "",
              "Windows Defender and Antivirus Protection:",
              "Overview of Windows Defender's capabilities for real-time protection against malware.",
              "Best practices for configuring and using Defender in a security-conscious environment.",
              "",
              "Windows Firewall:",
              "How the built-in firewall protects against unauthorized network traffic.",
              "How to configure rules for allowing or blocking connections to and from the system."
            ]
          },
          {
            title: "Quiz",
            isQuiz: true
          }
        ]
      }
    }
  ];

  const handleAnswerSubmit = (id: number, answer: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          userAnswer: answer.toLowerCase().trim()
        };
      }
      return q;
    }));
  };

  const toggleHint = (id: number) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          showHint: !q.showHint
        };
      }
      return q;
    }));
  };

  const getHint = (answer: string) => {
    if (!answer) return '';
    const words = answer.split(' ');
    return words.map(word => {
      const firstLetter = word[0].toUpperCase();
      const asterisks = '*'.repeat(word.length - 1);
      return `${firstLetter}${asterisks}`;
    }).join(' ');
  };

  const isAnswerCorrect = (question: Question) => {
    if (!question.userAnswer) return undefined;
    return question.userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
  };

  const getCurrentModuleQuestions = () => {
    return questions.filter(q => q.moduleId === activeSection);
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    revealElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [activeSection, activeSubSection]);

  const activeContent = sections.find(section => section.id === activeSection)?.content;
  const activeSubSectionContent = activeContent?.sections?.find(s => s.title === activeSubSection);

  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/learning-paths" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Learning Paths
              </Link>
              <span className="text-xl font-bold animate-fadeIn">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-primary-dark/50 py-8 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 animate-fadeIn">
            <Book className="w-8 h-8 text-primary-blue animate-pulse-slow" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">{sections.find(s => s.id === activeSection)?.title}</h1>
              <p className="text-gray-400 text-sm mt-1">Master the essential concepts and foundations of cybersecurity</p>
              <div className="mt-2 progress-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 bg-primary-dark/30 min-h-[calc(100vh-11rem)] border-r border-primary-blue/20 glass-effect">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 gradient-text">Course Sections</h2>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubSection("");
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center justify-between hover-card transition-all ${
                    activeSection === section.id
                      ? 'bg-primary-blue/20 text-primary-blue'
                      : 'hover:bg-primary-blue/10'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section.title}
                  <ChevronRight className={`w-4 h-4 transform transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          {activeContent && (
            <div className="space-y-8">
              {!activeSubSection && (
                <>
                  <h1 className="text-3xl font-bold text-primary-blue mb-4 reveal-scale">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h1>
                  <p className="text-lg mb-8 whitespace-pre-line reveal">{activeContent.introduction}</p>
                </>
              )}
              
              {activeSubSection && activeSubSectionContent && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold gradient-text reveal">{activeSubSectionContent.title}</h2>
                  
                  {activeSubSectionContent.isQuiz ? (
                    <div className="space-y-6">
                      {getCurrentModuleQuestions().map((question, index) => (
                        <div 
                          key={question.id} 
                          className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover-card glass-effect reveal"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
                          <div className="flex items-center space-x-4">
                            {question.type === 'yesno' ? (
                              <div className="space-x-4">
                                <button
                                  onClick={() => handleAnswerSubmit(question.id, 'yes')}
                                  className={`px-4 py-2 rounded-md ${
                                    question.userAnswer === 'yes'
                                      ? 'bg-primary-blue text-background'
                                      : 'border border-primary-blue text-primary-blue'
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleAnswerSubmit(question.id, 'no')}
                                  className={`px-4 py-2 rounded-md ${
                                    question.userAnswer === 'no'
                                      ? 'bg-primary-blue text-background'
                                      : 'border border-primary-blue text-primary-blue'
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center space-x-4">
                                  <input
                                    type="text"
                                    className="flex-1 bg-background border border-primary-blue/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary-blue"
                                    placeholder="Enter your answer"
                                    onChange={(e) => handleAnswerSubmit(question.id, e.target.value)}
                                  />
                                  <button
                                    onClick={() => toggleHint(question.id)}
                                    className="p-2 text-primary-blue hover:text-secondary-blue transition-colors"
                                    title="Show hint"
                                  >
                                    <HelpCircle className="w-6 h-6" />
                                  </button>
                                </div>
                                {question.showHint && (
                                  <div className="text-sm text-primary-blue animate-fadeIn">
                                    Hint: {getHint(question.correctAnswer)}
                                  </div>
                                )}
                              </div>
                            )}
                            {question.userAnswer && (
                              isAnswerCorrect(question) ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-500" />
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
<div className="prose prose-invert max-w-none">
  {activeSubSectionContent.image && (
    <div className="mb-6 reveal-scale flex justify-center">
      <div className="border-4 border-primary-blue/20 rounded-lg p-2 shadow-lg bg-primary-dark/20">
        <img
          src={activeSubSectionContent.image}
          alt={activeSubSectionContent.title}
          className="w-80 h-80 object-cover rounded-lg" // Adjust width and height as needed
        />
      </div>
    </div>
  )}
  {activeSubSectionContent.content.map((item, i) => {
    if (item.startsWith('-')) {
      return (
        <ul key={i} className="list-disc list-inside reveal-left" style={{ animationDelay: `${i * 100}ms` }}>
          <li className="text-gray-200 hover:text-primary-blue transition-colors">{item.substring(2)}</li>
        </ul>
      );
    }
    
    if (item.includes(':')) {
      const [title, ...rest] = item.split(':');
      return (
        <div key={i} className="mb-4 reveal-right" style={{ animationDelay: `${i * 100}ms` }}>
          <span className="font-bold">{title}:</span>
          {rest.length > 0 && (
            <span className="text-gray-200 hover:text-white transition-colors">
              {rest.join(':')}
            </span>
          )}
        </div>
      );
    }
    
    return (
      <p key={i} className="text-gray-200 reveal" style={{ animationDelay: `${i * 100}ms` }}>
        {item}
      </p>
    );
  })}
</div>

                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {activeContent?.sections && activeContent.sections.length > 0 && (
          <div className="w-64 bg-primary-dark/30 min-h-[calc(100vh-11rem)] border-l border-primary-blue/20 glass-effect">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 gradient-text">Module Sections</h2>
              <div className="space-y-2">
                {activeContent.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSubSection(section.title)}
                    className={`w-full text-left px-4 py-2 rounded-md hover-card transition-all ${
                      activeSubSection === section.title
                        ? 'bg-primary-blue/20 text-primary-blue'
                        : 'hover:bg-primary-blue/10'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CybersecurityFundamentals;
