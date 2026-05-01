import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Rocket,
  Send,
  ShieldCheck,
  X
} from "lucide-react";

const projects = [
  {
    title: "Quikcart",
    category: "MERN e-commerce platform",
    period: "May 2024 - Sep 2024",
    description:
      "Implemented JWT authentication, profile management, email password resets, shopping cart item management, Save for Later, product browsing, secure Paytm payments, order handling, and admin dashboards.",
    stack: ["MERN", "Tailwind CSS", "Chart.js", "Socket.io"],
    accent: "coral"
  },
  {
    title: "Airline Reservation System Server",
    category: "REST API backend",
    period: "Dec 2023 - Apr 2024",
    description:
      "Led development of a flight reservation backend using an MVC pattern, microservices, Sequelize data models, seat selection flows, concurrent booking handling, cron jobs, RabbitMQ, and notifications.",
    stack: ["TypeScript", "Node.js", "Sequelize", "RabbitMQ"],
    accent: "teal"
  }
];

const skills = [
  { name: "Languages", detail: "C++, C#, JavaScript, SQL", icon: Code2 },
  { name: "Frameworks", detail: "ASP.NET Core, React.js", icon: Braces },
  { name: "Databases", detail: "SQL Server, MySQL", icon: Database },
  { name: "Tools", detail: "Git, GitHub, Linux", icon: ShieldCheck }
];

const experience = [
  {
    role: ".NET Developer",
    organization: "GI Pharma Middle East Fzco",
    period: "Feb 2025 - Current",
    location: "Delhi",
    bullets: [
      "Developed and maintained web applications using ASP.NET Core and C#.",
      "Worked extensively with SQL Server, stored procedures, and modules such as budget and overhead management.",
      "Implemented frontend features with JavaScript and AJAX while handling debugging, performance optimization, and session management.",
      "Created ERP packages for sales, budget, and overhead modules."
    ]
  }
];

const internships = [
  {
    role: "Full Stack Developer Intern",
    organization: "C-DAC, Patna",
    period: "Feb 2024 - Aug 2024",
    location: "Patna, Bihar",
    bullets: [
      "Built government-funded projects including CWPI Analytics, DAE dashboards, IGIMS, and BAU systems using React.js, Tailwind CSS, MySQL, Node.js, and Chart.js.",
      "Implemented role-based routing and secure authentication in IGIMS using Node.js, Express.js, LocalStorage, Context API, and Socket.io for real-time status updates.",
      "Enabled doctors to update patient check-up status in real time and integrated a Google Calendar-like academic calendar for student data."
    ]
  },
  {
    role: "Frontend Developer Intern",
    organization: "Babynama, GagaHealth",
    period: "May 2023 - Oct 2023",
    location: "Remote",
    bullets: [
      "Programmed babynama.com from scratch using Next.js, TypeScript, and Tailwind CSS.",
      "Integrated payment APIs, improving conversion rates and supporting a smoother payment flow.",
      "Engineered more than five reusable React components, reducing development time and improving website performance."
    ]
  }
];

const education = [
  {
    school: "Nalanda College Of Engineering, Chandi",
    degree: "Bachelor of Technology in Computer Science Engineering",
    period: "Dec 2020 - Aug 2024",
    score: "CGPA: 8.13"
  },
  {
    school: "Sunderwati Mahila College, Bhagalpur",
    degree: "Senior School Certificate Examination (PCM)",
    period: "Apr 2017 - Mar 2019",
    score: "Percentage: 83.2"
  },
  {
    school: "New Horizon School, Bhagalpur",
    degree: "Secondary School Examination",
    period: "Jun 2017",
    score: "CGPA: 9.8"
  }
];

const contact = {
  email: "shreyancebgp28@gmail.com",
  phone: "+917256998409",
  phoneLabel: "+91 7256998409",
  location: "Bhagalpur, Bihar",
  linkedin: "https://www.linkedin.com/in/developer-shreya/",
  github: "https://github.com/shreypilot"
};

const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email
)}&su=${encodeURIComponent("Portfolio inquiry")}`;

function PortfolioScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08090d, 9, 24);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.2, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.35);
    const keyLight = new THREE.PointLight(0xff7a59, 75, 30);
    keyLight.position.set(-5, 4, 5);
    const fillLight = new THREE.PointLight(0x31d3c6, 70, 28);
    fillLight.position.set(5, -1, 6);
    scene.add(ambient, keyLight, fillLight);

    const materialA = new THREE.MeshStandardMaterial({
      color: 0xff7a59,
      emissive: 0x3b1209,
      roughness: 0.28,
      metalness: 0.45
    });
    const materialB = new THREE.MeshStandardMaterial({
      color: 0x31d3c6,
      emissive: 0x063937,
      roughness: 0.22,
      metalness: 0.42
    });
    const materialC = new THREE.MeshStandardMaterial({
      color: 0xd9f56a,
      emissive: 0x344000,
      roughness: 0.3,
      metalness: 0.35
    });
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xf6f2df,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });

    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 2), materialB);
    orb.position.set(1.85, 0.65, -0.2);
    root.add(orb);

    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.92, 0.25, 180, 18), materialA);
    knot.position.set(-1.8, -0.35, 0.2);
    root.add(knot);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.012, 12, 120), wireMaterial);
    ring.rotation.set(1.08, 0.2, -0.36);
    root.add(ring);

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), wireMaterial);
    cube.position.set(0, -1.1, -1.4);
    cube.rotation.set(0.5, 0.65, 0.2);
    root.add(cube);

    const satellites = [];
    const satelliteGeo = new THREE.SphereGeometry(0.13, 18, 18);
    const satelliteMaterials = [materialA, materialB, materialC];
    for (let index = 0; index < 18; index += 1) {
      const satellite = new THREE.Mesh(satelliteGeo, satelliteMaterials[index % 3]);
      satellite.userData = {
        radius: 2.5 + (index % 6) * 0.28,
        speed: 0.35 + (index % 5) * 0.06,
        offset: index * 0.72,
        height: -1.1 + (index % 4) * 0.72
      };
      satellites.push(satellite);
      root.add(satellite);
    }

    const particleCount = 620;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = (Math.random() - 0.5) * 20;
      particlePositions[stride + 1] = (Math.random() - 0.5) * 12;
      particlePositions[stride + 2] = (Math.random() - 0.5) * 12;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf6f2df,
      size: 0.028,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    let frameId = 0;
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const animate = (timeMs) => {
      const time = timeMs * 0.001;
      root.rotation.y += (pointer.x * 0.18 - root.rotation.y) * 0.025;
      root.rotation.x += (pointer.y * 0.1 - root.rotation.x) * 0.025;

      orb.rotation.x = time * 0.35;
      orb.rotation.y = time * 0.22;
      knot.rotation.x = time * 0.2;
      knot.rotation.y = time * 0.45;
      cube.rotation.x = time * 0.16;
      cube.rotation.z = time * 0.21;
      ring.rotation.z = time * 0.08;
      particles.rotation.y = time * 0.025;

      satellites.forEach((satellite) => {
        const { radius, speed, offset, height } = satellite.userData;
        satellite.position.set(
          Math.cos(time * speed + offset) * radius,
          height + Math.sin(time * speed * 1.3 + offset) * 0.18,
          Math.sin(time * speed + offset) * radius - 0.2
        );
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      mount.removeChild(renderer.domElement);
      particleGeometry.dispose();
      particleMaterial.dispose();
      satelliteGeo.dispose();
      [materialA, materialB, materialC, wireMaterial].forEach((material) => material.dispose());
      [orb.geometry, knot.geometry, ring.geometry, cube.geometry].forEach((geometry) => {
        geometry.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div className="scene" ref={mountRef} aria-hidden="true" data-testid="three-scene" />;
}

function IconLink({ href, icon: Icon, label }) {
  return (
    <a className="icon-link" href={href} aria-label={label} title={label}>
      <Icon size={18} />
    </a>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <main>
      <PortfolioScene />
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeNav} aria-label="Shreya Kumari home">
          <span>SK</span>
          Shreya Kumari
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setNavOpen((value) => !value)}
        >
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={navOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#experience" onClick={closeNav}>
            Experience
          </a>
          <a href="#work" onClick={closeNav}>
            Work
          </a>
          <a href="#skills" onClick={closeNav}>
            Skills
          </a>
          <a href="#contact" onClick={closeNav}>
            Contact
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Software developer</p>
          <h1>Shreya Kumari</h1>
          <p className="hero-copy">
            .NET and React developer building ERP modules, dashboards,
            full-stack web apps and production-ready user interfaces.
          </p>

          <div className="hero-actions" aria-label="Portfolio actions">
            <a className="button primary" href="#work">
              <Rocket size={18} />
              View work
            </a>
            <a className="button ghost" href="/Shreya_Resume.pdf" download>
              <Download size={18} />
              Resume
            </a>
            <IconLink href={contact.github} icon={Github} label="GitHub profile" />
            <IconLink href={contact.linkedin} icon={Linkedin} label="LinkedIn profile" />
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Portfolio highlights">
        <div>
          <strong>Current role</strong>
          <span>.NET Developer at GI Pharma Middle East Fzco</span>
        </div>
        <div>
          <strong>Core stack</strong>
          <span>ASP.NET Core, React.js, SQL Server, Node.js</span>
        </div>
        <div>
          <strong>Education</strong>
          <span>B.Tech CSE, CGPA 8.13</span>
        </div>
      </section>

      <section className="section intro-section">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Software developer with hands-on .NET, React, database, and API experience.</h2>
        </div>
        <p className="section-copy">
          Shreya has built enterprise ERP modules, government-funded dashboards, healthcare systems,
          e-commerce features, payment flows, and reservation APIs. Her work spans ASP.NET Core,
          C#, SQL Server, React.js, Node.js, TypeScript, MySQL, Socket.io, and Tailwind CSS.
        </p>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Current production work in .NET, SQL Server, ERP, and frontend features.</h2>
        </div>

        <div className="resume-list">
          {experience.map((item) => (
            <article className="resume-card" key={item.organization}>
              <div className="resume-card-header">
                <div>
                  <span>{item.period}</span>
                  <h3>{item.organization}</h3>
                  <p>{item.role}</p>
                </div>
                <small>{item.location}</small>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section internship-section">
        <div className="section-heading">
          <p className="eyebrow">Internships</p>
          <h2>Full-stack and frontend internships across public systems and healthcare products.</h2>
        </div>

        <div className="resume-list">
          {internships.map((item) => (
            <article className="resume-card" key={item.organization}>
              <div className="resume-card-header">
                <div>
                  <span>{item.period}</span>
                  <h3>{item.organization}</h3>
                  <p>{item.role}</p>
                </div>
                <small>{item.location}</small>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2>Resume projects covering commerce, authentication, APIs, bookings, and real-time flows.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title}>
              <div className="project-topline">
                <span>{project.category}</span>
                <ArrowUpRight size={18} />
              </div>
              <h3>{project.title}</h3>
              <small>{project.period}</small>
              <p>{project.description}</p>
              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h2>Computer science foundation with strong academic performance.</h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.school}>
              <span>{item.period}</span>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <strong>{item.score}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Practical skills for shipping complete web products.</h2>
        </div>

        <div className="skill-grid">
          {skills.map(({ name, detail, icon: Icon }) => (
            <article className="skill-card" key={name}>
              <div className="skill-icon">
                <Icon size={21} />
              </div>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Have a .NET, React, dashboard, or full-stack product to build?</h2>
          <p>
            Shreya is based in Bhagalpur, Bihar and is available for software development,
            frontend, backend, and full-stack implementation work.
          </p>
          <div className="contact-lines">
            <a href={emailComposeUrl} target="_blank" rel="noreferrer">
              <Mail size={17} />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`}>
              <Send size={17} />
              {contact.phoneLabel}
            </a>
            <span>
              <MapPin size={17} />
              {contact.location}
            </span>
          </div>
        </div>
        <a className="button primary" href={emailComposeUrl} target="_blank" rel="noreferrer">
          <Mail size={18} />
          Email Shreya
        </a>
      </section>

      <footer className="site-footer">
        <span>Shreya Kumari</span>
        <div>
          <a
            href={emailComposeUrl}
            aria-label="Email Shreya"
            title="Email Shreya"
            target="_blank"
            rel="noreferrer"
          >
            <Send size={17} />
          </a>
          <a href={contact.github} aria-label="GitHub" title="GitHub">
            <Github size={17} />
          </a>
          <a href={contact.linkedin} aria-label="LinkedIn" title="LinkedIn">
            <Linkedin size={17} />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
