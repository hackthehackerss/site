import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Book, Trophy, Star, Quote, CheckCircle2 } from 'lucide-react';
import UserProfileButton from '../components/UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');

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
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="logo-glitch">
                <img 
                  src="/logo-shield.png" 
                  alt="HackTheHackers Logo" 
                  className="h-10 w-auto animate-float"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/learning-paths" className="text-primary-blue hover:text-primary-blue/80">Learning Paths</Link>
              <Link to="/challenges" className="text-primary-blue hover:text-primary-blue/80">Challenges</Link>
              <Link to="/leaderboard" className="text-primary-blue hover:text-primary-blue/80">Leaderboard</Link>
              <Link to="/Pricing" className="text-primary-blue hover:text-primary-blue/80">Plan & Pricing</Link>
              {profile ? (
                <UserProfileButton />
              ) : (
                <>
                  <Link to="/signin" className="text-primary-blue hover:text-primary-blue/80">Sign In</Link>
                  <Link to="/signup" className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-secondary-red transition">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="logo-glitch inline-block">
              <img 
                src="/logo-full.png" 
                alt="HackTheHackers Full Logo" 
                className="h-64 mx-auto mb-8 animate-float"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4 reveal-scale">
              Become a Blue Team Expert
            </h1>
            <h2 className="text-3xl text-primary-blue mb-8 reveal">
              Hands-On Training for Real-World Threats
            </h2>
            <p className="text-2xl text-primary-red font-semibold mb-12 reveal">
              Your Cybersecurity Journey Starts Here
            </p>
            <div className="flex justify-center gap-4 reveal">
              <Link 
                to="/learning-paths" 
                className="bg-primary-blue text-background px-8 py-3 rounded-md hover:bg-secondary-blue transition"
              >
                Start Learning
              </Link>
              <Link 
                to="/challenges" 
                className="border border-primary-red text-primary-red px-8 py-3 rounded-md hover:bg-primary-red hover:text-white transition"
              >
                View Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary-dark/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-left">
              <Shield className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Learning Paths</h3>
              <p className="text-gray-400">Structured courses covering incident response, threat hunting, and security operations.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-red/20 hover:border-primary-red transition reveal">
              <Terminal className="w-12 h-12 text-primary-red mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Hands-on Labs</h3>
              <p className="text-gray-400">Practice in realistic environments with guided exercises and real-world scenarios.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-right">
              <Trophy className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <p className="text-gray-400">Test your skills with CTF-style challenges and earn badges for your achievements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths Preview */}
<div className="py-24" id="learning-paths">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold mb-12 text-center reveal">
      <span className="text-primary-blue">Learning</span> Paths
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Cybersecurity Fundamentals",
          description: "Master the essential concepts and foundations of cybersecurity.",
          modules: 15,
          hours: 30,
          path: "/cybersecurity-fundamentals",
          free: true,
          image: "/cybersecurity-fundamentals.png"
        },
        {
          title: "SOC Analyst",
          description: "Master Security Operations Center processes and tools.",
          modules: 12,
          hours: 24,
          path: "/soc-analyst",
          free: false,
          image: "/soc-analyst.png"
        },
        {
          title: "Incident Response",
          description: "Master incident handling and response procedures.",
          modules: 8,
          hours: 16,
          path: "/incident-response",
          free: false,
          image: "/incident-response.png"
        },
        {
          title: "DFIR",
          description: "Digital Forensics And Incident Response",
          modules: 10,
          hours: 20,
          path: "/threat-hunting",
          free: false,
          image: "/DFIR.png"
        },
        {
          title: "Malware Analysis",
          description: "Learn to analyze and understand malicious software.",
          modules: 14,
          hours: 28,
          path: "/malware-analysis",
          free: false,
          image: "/malware-analysis.png"
        },
        {
          title: "Cyber Threat Intelligence",
          description: "Master the art of threat intelligence analysis and implementation.",
          modules: 8,
          hours: 16,
          path: "/cyber-threat-intelligence",
          free: false,
          image: "/cyber-threat-intelligence.png"
        }
      ].map((path, index) => (
        <Link 
          key={index} 
          to={path.free || profile?.subscription ? path.path : '/Pricing'}
          className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition reveal group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Learning Path Image */}
          <img 
            src={path.image} 
            alt={path.title} 
            className="w-full h-30 object-cover rounded-t-lg mb-4" 
          />
          
          <Book className="w-8 h-8 text-primary-blue mb-4" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold">{path.title}</h3>
            {path.free && (
              <span className="bg-primary-blue/20 text-primary-blue text-xs px-2 py-1 rounded-full">
                Free
              </span>
            )}
          </div>
          <p className="text-gray-400 mb-4">{path.description}</p>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{path.modules} Modules</span>
            <span>{path.hours} Hours</span>
          </div>
          {!path.free && !profile?.subscription && (
            <div className="mt-4 pt-4 border-t border-primary-blue/20 text-center">
              <span className="text-primary-blue text-sm">
                Subscribe to unlock this path
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
  </div>
</div>

      {/* Infinite Loop Carousel with Faded Entry and Exit */}

<section class="d-flex flex-column vh-100 justify-content-center align-items-center">
    <div class="container brandsCarousel">
        <div class="d-flex carouselTrack">
<!---

IMPORTANT: The content below includes the original logos, which will appear once in the carousel. To create the seamless infinite loop effect, you will need to clone the original logos. Each logo should be wrapped in a <div> with the class name 'brandLogo' or a custom class name of your choice.

--->
            <div class="brandLogo">
                <svg id="brandLogo-01" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-02" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-03" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-04" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-05" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 0C5.408-.02.005 5.37.005 11.992h4.638c0-4.923 4.882-8.731 10.064-6.855a6.95 6.95 0 014.147 4.148c1.889 5.177-1.924 10.055-6.84 10.064v-4.61H7.391v4.623h4.61V24c7.86 0 13.967-7.588 11.397-15.83-1.115-3.59-3.985-6.446-7.575-7.575A12.8 12.8 0 0012.039 0zM7.39 19.362H3.828v3.564H7.39zm-3.563 0v-2.978H.85v2.978z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-06" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-07" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-08" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.427 0v24h15.146V0Zm9.994 10.25a1.568 1.568 0 0 1 1.567 1.568 1.568 1.568 0 0 1-1.567 1.568 1.568 1.568 0 0 1-1.568-1.568 1.568 1.568 0 0 1 1.568-1.568zm-2.157.16c.122 0 .245.005.369.015a2.268 2.268 0 0 0-.476 1.271 3.825 3.825 0 0 0-3.08 1.647 2.243 2.243 0 0 0-1.308-.335 5.159 5.159 0 0 1 4.495-2.599zm4.242 2.296a5.14 5.14 0 0 1 .74 3.905 5.139 5.139 0 0 1-.997 2.113 2.25 2.25 0 0 0-.75-1.167 3.837 3.837 0 0 0 .125-3.818 2.26 2.26 0 0 0 .882-1.033zm-8.616.982a1.568 1.568 0 0 1 1.568 1.568 1.568 1.568 0 0 1-1.568 1.568 1.568 1.568 0 0 1-1.567-1.568 1.568 1.568 0 0 1 1.567-1.568Zm.933 3.618a3.818 3.818 0 0 0 2.604 1.986c.127.027.256.048.385.063.01.476.17.932.459 1.31a5.161 5.161 0 0 1-1.114-.114 5.105 5.105 0 0 1-3.675-3.08 2.26 2.26 0 0 0 1.34-.165zm5.244.427a1.568 1.568 0 0 1 1.568 1.568 1.568 1.568 0 0 1-1.568 1.568A1.568 1.568 0 0 1 12.5 19.3a1.568 1.568 0 0 1 1.568-1.568z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-09" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053c0 .513.044.945.13 1.292.087.34.235.618.44.828.203.21.475.359.803.451.334.093.754.136 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.672.672 0 0 1-.39-.173.693.693 0 0 1-.173-.377 4.002 4.002 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241-.327.161-.6.384-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214c.018-.588.16-1.02.433-1.299.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09-.458-.495-1.1-.742-1.917-.742zm10.065.006a3.252 3.252 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.145 3.145 0 0 0-.254 1.273c0 .452.08.878.241 1.274.161.395.39.742.674 1.032.284.29.637.526 1.045.693.408.173.86.26 1.342.26 1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699-.464 0-.847-.105-1.138-.321a1.588 1.588 0 0 1-.593-.872l-.019-.056h4.915v-.587c0-.451-.08-.872-.235-1.267a3.393 3.393 0 0 0-.661-1.033 3.013 3.013 0 0 0-1.02-.692 3.345 3.345 0 0 0-1.311-.248zm-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261zm7.073 3.814a.606.606 0 0 0-.606.606.606.606 0 0 0 .606.606.606.606 0 0 0 .606-.606.606.606 0 0 0-.606-.606zm-.008.105a.5.5 0 0 1 .002 0 .5.5 0 0 1 .5.501.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .498-.5zm-.233.155v.699h.13v-.285h.093l.173.285h.136l-.18-.297a.191.191 0 0 0 .118-.056c.03-.03.05-.074.05-.136 0-.068-.02-.117-.063-.154-.037-.038-.105-.056-.185-.056zm.13.099h.154c.019 0 .037.006.056.012a.064.064 0 0 1 .037.031c.013.013.012.031.012.056a.124.124 0 0 1-.012.055.164.164 0 0 1-.037.031c-.019.006-.037.013-.056.013h-.154Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" fill="var(--light-gray)"/></svg>
            </div>
<!---

IMPORTANT: The content below includes clones of the original logos, which are necessary to create a seamless infinite loop effect.

--->
            <div class="brandLogo">
                <svg id="brandLogo-01" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-02" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-03" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-04" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-05" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 0C5.408-.02.005 5.37.005 11.992h4.638c0-4.923 4.882-8.731 10.064-6.855a6.95 6.95 0 014.147 4.148c1.889 5.177-1.924 10.055-6.84 10.064v-4.61H7.391v4.623h4.61V24c7.86 0 13.967-7.588 11.397-15.83-1.115-3.59-3.985-6.446-7.575-7.575A12.8 12.8 0 0012.039 0zM7.39 19.362H3.828v3.564H7.39zm-3.563 0v-2.978H.85v2.978z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-06" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-07" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-08" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.427 0v24h15.146V0Zm9.994 10.25a1.568 1.568 0 0 1 1.567 1.568 1.568 1.568 0 0 1-1.567 1.568 1.568 1.568 0 0 1-1.568-1.568 1.568 1.568 0 0 1 1.568-1.568zm-2.157.16c.122 0 .245.005.369.015a2.268 2.268 0 0 0-.476 1.271 3.825 3.825 0 0 0-3.08 1.647 2.243 2.243 0 0 0-1.308-.335 5.159 5.159 0 0 1 4.495-2.599zm4.242 2.296a5.14 5.14 0 0 1 .74 3.905 5.139 5.139 0 0 1-.997 2.113 2.25 2.25 0 0 0-.75-1.167 3.837 3.837 0 0 0 .125-3.818 2.26 2.26 0 0 0 .882-1.033zm-8.616.982a1.568 1.568 0 0 1 1.568 1.568 1.568 1.568 0 0 1-1.568 1.568 1.568 1.568 0 0 1-1.567-1.568 1.568 1.568 0 0 1 1.567-1.568Zm.933 3.618a3.818 3.818 0 0 0 2.604 1.986c.127.027.256.048.385.063.01.476.17.932.459 1.31a5.161 5.161 0 0 1-1.114-.114 5.105 5.105 0 0 1-3.675-3.08 2.26 2.26 0 0 0 1.34-.165zm5.244.427a1.568 1.568 0 0 1 1.568 1.568 1.568 1.568 0 0 1-1.568 1.568A1.568 1.568 0 0 1 12.5 19.3a1.568 1.568 0 0 1 1.568-1.568z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-09" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053c0 .513.044.945.13 1.292.087.34.235.618.44.828.203.21.475.359.803.451.334.093.754.136 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.672.672 0 0 1-.39-.173.693.693 0 0 1-.173-.377 4.002 4.002 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241-.327.161-.6.384-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214c.018-.588.16-1.02.433-1.299.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09-.458-.495-1.1-.742-1.917-.742zm10.065.006a3.252 3.252 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.145 3.145 0 0 0-.254 1.273c0 .452.08.878.241 1.274.161.395.39.742.674 1.032.284.29.637.526 1.045.693.408.173.86.26 1.342.26 1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699-.464 0-.847-.105-1.138-.321a1.588 1.588 0 0 1-.593-.872l-.019-.056h4.915v-.587c0-.451-.08-.872-.235-1.267a3.393 3.393 0 0 0-.661-1.033 3.013 3.013 0 0 0-1.02-.692 3.345 3.345 0 0 0-1.311-.248zm-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261zm7.073 3.814a.606.606 0 0 0-.606.606.606.606 0 0 0 .606.606.606.606 0 0 0 .606-.606.606.606 0 0 0-.606-.606zm-.008.105a.5.5 0 0 1 .002 0 .5.5 0 0 1 .5.501.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .498-.5zm-.233.155v.699h.13v-.285h.093l.173.285h.136l-.18-.297a.191.191 0 0 0 .118-.056c.03-.03.05-.074.05-.136 0-.068-.02-.117-.063-.154-.037-.038-.105-.056-.185-.056zm.13.099h.154c.019 0 .037.006.056.012a.064.064 0 0 1 .037.031c.013.013.012.031.012.056a.124.124 0 0 1-.012.055.164.164 0 0 1-.037.031c-.019.006-.037.013-.056.013h-.154Z" fill="var(--light-gray)"/></svg>
            </div>
            <div class="brandLogo">
                <svg id="brandLogo-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" fill="var(--light-gray)"/></svg>
            </div>
        </div>
    </div>
      <style>
      :root {
    --off-white: #fafaf0;
    --light-gray: #9ca6a2;
}

@keyframes infiniteLoop {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(calc(-100px * 10), 0, 0);
    }
}

section {
    background: var(--off-white);
}

.brandsCarousel {
    max-width: 960px;
    max-height: 100px;
    margin: auto;
    overflow: hidden;
    position: relative;
}

.brandsCarousel::before,
.brandsCarousel::after {
    content: "";
    width: 100px;
    height: 100px;
    background: linear-gradient(
        to right,
        rgba(250, 250, 240, 1) 0%,
        rgba(250, 250, 240, 0) 100%
    );
    position: absolute;
    z-index: 2;
}

.brandsCarousel::before {
    top: 0;
    left: 0;
}

.brandsCarousel::after {
    top: 0;
    right: 0;
    transform: rotateZ(180deg);
}

.carouselTrack {
    width: calc(100px * 20);
    animation: infiniteLoop 10s linear infinite;
    animation-fill-mode: forwards;
    will-change: transform;
}

.brandLogo {
    width: 100px;
    height: 50px;
    align-items: center;
    margin: auto;
    overflow: hidden;
}

.brandLogo svg {
    width: 100px;
    height: 50px;
}

/*

NOTE: The content below includes copyright notice information;
      You may safely omit this content, as it is not essential to the functionality of the carousel.

*/

:root {
    --dark-gray: #71797e;
    --heart-red: #a60311;
    --light-blue: #0096ff;
}

@import url(https://fonts.bunny.net/css?family=source-code-pro:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);

@keyframes beat {
    to {
        transform: scale(1.2);
    }
}

.copyrightNotice {
    font-family: "Source Code Pro", monospace;
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark-gray);
}

#heart {
    width: 1rem;
    height: 1rem;
    animation: beat 0.25s infinite alternate;
}

a {
    text-decoration: none;
    color: var(--light-blue);
    position: relative;
}

a::after {
    content: "";
    width: 0;
    height: 0.125rem;
    left: 0;
    bottom: 0;
    transition: width 0.4s ease;
    background: var(--light-blue);
    position: absolute;
}

a:hover::after {
    width: 100%;
}

      </style>
      {/* Infinite Loop Carousel with Faded Entry and Exit */}

      {/* User Reviews Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-16 text-center reveal">
            <span className="text-primary-blue">What Our</span> Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                role: "Security Team Lead",
                review: "This platform has been an incredible resource for my team. The training is clear, well-structured, and practical. The content covers everything from basic concepts to advanced techniques. Highly recommend it for anyone serious about improving their Blue Team skills!",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100"
              },
              {
                name: "Sarah L.",
                role: "Cybersecurity Professional",
                review: "As a cybersecurity professional, I was looking for a comprehensive training solution for my team. This platform provided exactly what we needed! The hands-on labs are particularly useful, and I feel much more confident tackling security incidents now.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100"
              },
              {
                name: "Alex T.",
                role: "Security Operations Manager",
                review: "I've gone through several courses, but this one stands out. The Windows security training was top-notch, and the practical exercises gave me real-world experience. I can immediately apply what I learned to my day-to-day job. Will definitely recommend it to my colleagues!",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100"
              },
              {
                name: "Emily K.",
                role: "Incident Response Analyst",
                review: "This platform is a game-changer! The modules are engaging, and the content is incredibly relevant to current cybersecurity threats. I'm much more confident when responding to security incidents now. The support team is also very responsive and helpful!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100"
              },
              {
                name: "Michael P.",
                role: "Blue Team Lead",
                review: "The Blue Team training platform has transformed the way we approach incident response. The training is detailed and well-organized, with a perfect balance of theory and practical application. It's a must-have for anyone looking to strengthen their security operations!",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100"
              }
            ].map((review, index) => (
              <div 
                key={index} 
                className={`reveal ${
                  index === 1 ? 'lg:col-span-2' : ''
                } bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 hover:border-primary-blue transition relative hover-card glass-effect`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-blue/20" />
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-primary-blue"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-primary-blue text-sm">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-400 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Copyright and Contact */}
      <footer className="bg-primary-dark py-6 border-t border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © 2025 HackTheHackers. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/terms" className="text-primary-blue hover:text-secondary-blue transition">
                Terms of Use
              </Link>
              <Link 
                to="/contact" 
                className="bg-primary-blue text-background px-4 py-2 rounded-md hover:bg-secondary-blue transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
