const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, UnderlineType
} = require("docx");
const fs = require("fs");

// ── Helpers ──────────────────────────────────────────────────────────────────
const bold = (text, size = 22) =>
  new TextRun({ text, bold: true, size });

const normal = (text, size = 20) =>
  new TextRun({ text, size });

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    children: [normal(text, 20)],
    spacing: { after: 60 },
  });

const sectionHeading = (text) =>
  new Paragraph({
    children: [bold(text.toUpperCase(), 22)],
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
    },
  });

const jobTitle = (company, period) =>
  new Paragraph({
    children: [
      bold(company, 21),
      new TextRun({ text: `   ${period}`, size: 20, italics: true, color: "555555" }),
    ],
    spacing: { before: 180, after: 40 },
  });

const roleTitle = (title) =>
  new Paragraph({
    children: [bold(title, 20)],
    spacing: { after: 80 },
  });

// ── Document ─────────────────────────────────────────────────────────────────
const doc = new Document({
  sections: [{
    properties: {},
    children: [

      // ── NAME & CONTACT ──
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [bold("THADDEUS E. OBI", 32)],
        spacing: { after: 60 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [normal("69 Old Burnhamthorpe Road  ●  Toronto, ON  M9C 3J6", 19)],
        spacing: { after: 40 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [normal("T: +1(647)-464-1982  ●  E: thaddeus.obi@gmail.com", 19)],
        spacing: { after: 120 },
      }),

      // ── TITLE ──
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [bold("Senior Full Stack Developer — React & C#/.NET", 26)],
        spacing: { after: 200 },
      }),

      // ── SUMMARY ──
      sectionHeading("Professional Summary"),
      new Paragraph({
        children: [normal(
          "Results-driven Senior Full Stack Developer with 10+ years of experience designing, building, and maintaining " +
          "scalable web applications across the full stack. Deep expertise in React (TypeScript, Hooks, Redux) on the " +
          "frontend and C#/ASP.NET Core on the backend, complemented by strong database skills (MySQL, PostgreSQL, " +
          "Oracle, DynamoDB) and hands-on cloud experience (AWS, GCP). Proven track record of setting architectural " +
          "standards, leading code reviews, mentoring peers, and delivering measurable business outcomes in Agile/Scrum " +
          "environments. Comfortable working remotely and collaborating across cross-functional teams.",
          20
        )],
        spacing: { after: 100 },
      }),

      // ── TECHNICAL SKILLS ──
      sectionHeading("Technical Skills"),

      new Paragraph({ children: [bold("Frontend:", 20)], spacing: { after: 40 } }),
      bullet("React (Hooks, Context, Redux, MobX), TypeScript, JavaScript (ES6+), Next.js, Angular"),
      bullet("HTML5, CSS3, SASS/LESS, Bootstrap, Responsive & Accessible Design (WCAG)"),
      bullet("jQuery, AJAX, GraphQL (client-side)"),

      new Paragraph({ children: [bold("Backend:", 20)], spacing: { before: 100, after: 40 } }),
      bullet("C# / ASP.NET Core & Framework, Node.js, PHP (Laravel, CodeIgniter), Nest.js"),
      bullet("RESTful APIs, OAuth / Auth0, GraphQL"),

      new Paragraph({ children: [bold("Databases:", 20)], spacing: { before: 100, after: 40 } }),
      bullet("MySQL, PostgreSQL, Oracle DB, DynamoDB, SQL optimisation & data modelling"),

      new Paragraph({ children: [bold("Cloud, DevOps & Tooling:", 20)], spacing: { before: 100, after: 40 } }),
      bullet("AWS, GCP, Docker, Kubernetes, CI/CD (Jenkins, GitHub Actions), Nginx, Apache"),
      bullet("Git, Agile/Scrum, Jira, Linux/Bash, Redis, Memcached, New Relic"),
      bullet("AI-assisted development: Amazon Q, Kiro, Claude Code"),

      // ── EXPERIENCE ──
      sectionHeading("Professional Experience"),

      // TravelBrands
      jobTitle("TravelBrands Inc. — Toronto, Canada", "June 2017 – April 2026"),
      roleTitle("Senior Full Stack Software Developer"),
      bullet(
        "Architected and delivered full-stack web applications using React (TypeScript, Hooks, Redux), " +
        "C#/ASP.NET, Next.js, and Nest.js — serving B2B & B2C clients across airline, vacation, and cruise verticals."
      ),
      bullet(
        "Set architectural standards and led code reviews; mentored junior and intermediate developers to " +
        "improve code quality, consistency, and performance across the team."
      ),
      bullet(
        "Built and maintained RESTful APIs and backend services in C#/.NET, Node.js, PHP/Laravel, and Nest.js, " +
        "boosting booking throughput and reporting speed by over 20%."
      ),
      bullet(
        "Migrated legacy jQuery widgets to modern React component libraries; introduced TypeScript across " +
        "frontend codebases to improve maintainability and reduce runtime errors."
      ),
      bullet(
        "Designed and optimised complex SQL queries and data models across MySQL, PostgreSQL, Oracle DB, " +
        "and DynamoDB; integrated Memcached and Redis for caching layers."
      ),
      bullet(
        "Developed secure booking portals integrating Sabre & Intair APIs, OAuth/Auth0, and WordPress/Gutenberg " +
        "e-commerce solutions; maintained CI/CD pipelines on AWS using Docker and Jenkins."
      ),
      bullet(
        "Conducted proof-of-concept work, participated in full SDLC, and leveraged AI tools (Amazon Q, Kiro, " +
        "Claude Code) to accelerate development and code quality."
      ),

      // Ruby Life
      jobTitle("Ruby Life Inc. — Toronto, Canada", "September 2016 – May 2017"),
      roleTitle("Application Developer"),
      bullet(
        "Delivered responsive single-page applications from concept to production using React, Node.js, " +
        "Laravel, and RESTful APIs in a TDD, Agile, and CI/CD environment."
      ),
      bullet(
        "Maintained microservices (email notifications, logging, reCaptcha, translations, image handling) " +
        "using PHP, JavaScript, Twig, LESS/SASS, and AWS."
      ),
      bullet("Mentored junior developers and conducted code reviews to ensure quality and performance standards."),

      // TELUS
      jobTitle("TELUS Communications — Toronto, Canada", "June 2016 – August 2016"),
      roleTitle("Web Application Developer"),
      bullet(
        "Built custom WordPress plugins and responsive multi-lingual themes; developed an internal employee " +
        "portal using PHP, JavaScript/jQuery, MySQL, Vagrant, and SASS."
      ),

      // User In Mind
      jobTitle("User In Mind — Toronto, Canada", "December 2015 – May 2016"),
      roleTitle("PHP & WordPress Developer"),
      bullet(
        "Implemented a staff scheduling application using ASP.NET/C#, PHP, WordPress, MySQL, REST APIs, " +
        "Angular JS, Bootstrap, and Jenkins."
      ),

      // CIO London
      jobTitle("CIO — London, UK", "June 2007 – September 2015"),
      roleTitle("System Admin & Solutions Developer"),
      bullet(
        "Managed business applications generating $500K+/month; designed invoice & payroll systems for a " +
        "150+ staff organisation using PHP, ASP.NET/C#, SQL/MySQL, JavaScript, and jQuery."
      ),

      // ── EDUCATION ──
      sectionHeading("Education"),
      new Paragraph({ children: [bold("MBA — IT Management", 20)], spacing: { after: 30 } }),
      new Paragraph({ children: [normal("University of Bedfordshire, UK  |  2012 – 2013", 19)], spacing: { after: 100 } }),

      new Paragraph({ children: [bold("M.Sc. — Computing and Information Systems", 20)], spacing: { after: 30 } }),
      new Paragraph({ children: [normal("University of Greenwich, UK  |  2008 – 2010  (ICAS-assessed as equivalent to Canadian Master's Degree)", 19)], spacing: { after: 100 } }),

      new Paragraph({ children: [bold("Diploma — Management of Information Systems", 20)], spacing: { after: 30 } }),
      new Paragraph({ children: [normal("Maritime Greenwich College, UK  |  2007 – 2008", 19)], spacing: { after: 100 } }),

      new Paragraph({ children: [bold("HND / OND — Science Technology", 20)], spacing: { after: 30 } }),
      new Paragraph({ children: [normal("The Federal Polytechnic, Nigeria  |  1994 – 1999  (ICAS-assessed as equivalent to Canadian Applied Bachelor's Degree)", 19)], spacing: { after: 100 } }),

      // ── CERTIFICATIONS ──
      sectionHeading("Certifications"),
      bullet("Oracle Certified Professional (OCP)"),
      bullet("CompTIA A+ Certification (UK)"),
      bullet("Business and Careers Program — St. Gabriel's Learning Centre, Canada (2015)"),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [normal("Additional professional experience and references available upon request.", 18)],
        spacing: { before: 300 },
      }),
    ],
  }],
});

// ── Write file ────────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Thaddeus_Obi_Resume.docx", buffer);
  console.log("✅  Resume saved → Thaddeus_Obi_Resume.docx");
});
