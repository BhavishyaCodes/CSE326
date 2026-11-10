/**
 * PRACTICE CORNER - QUESTION BANK
 * 
 * Contains curated questions across 6 core academic subjects.
 * Each subject contains multiple choice questions with 4 options,
 * the correct answer index (0 to 3), and a detailed explanation.
 * 
 * Pure JavaScript Object - No external database needed!
 */

const SUBJECTS_DATA = {
  maths: {
    id: "maths",
    name: "Mathematics",
    description: "Algebra, Calculus, Geometry, Probability & Matrices",
    color: "#3b82f6",
    bgColor: "#eff6ff",
    accentColor: "#1d4ed8",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19l4-14h4l4 14"/>
      <path d="M6 13h8"/>
      <path d="M18 7v10"/>
      <path d="M15 12h6"/>
    </svg>`,
    questions: [
      {
        id: 1,
        question: "What is the derivative of f(x) = 3x² + 5x - 7 with respect to x?",
        options: ["6x + 5", "3x + 5", "6x - 7", "6x² + 5"],
        correct: 0,
        explanation: "Using the power rule d/dx(x^n) = n*x^(n-1): the derivative of 3x² is 6x, the derivative of 5x is 5, and the constant -7 differentiates to 0. So f'(x) = 6x + 5."
      },
      {
        id: 2,
        question: "What is the value of log₁₀(1000)?",
        options: ["1", "2", "3", "10"],
        correct: 2,
        explanation: "Since 10³ = 1000, by definition of logarithms log₁₀(1000) = 3."
      },
      {
        id: 3,
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "In Euclidean geometry, the interior angles of any triangle always add up to exactly 180 degrees (or π radians)."
      },
      {
        id: 4,
        question: "If a fair coin is tossed twice, what is the probability of getting two heads?",
        options: ["1/2", "1/4", "3/4", "1/8"],
        correct: 1,
        explanation: "The possible outcomes are HH, HT, TH, TT (4 outcomes). Only 1 outcome is HH, so probability = 1/4 (25%)."
      },
      {
        id: 5,
        question: "What is the solution to the quadratic equation x² - 5x + 6 = 0?",
        options: ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = -6"],
        correct: 0,
        explanation: "Factorize (x - 2)(x - 3) = 0. Therefore, x = 2 or x = 3."
      },
      {
        id: 6,
        question: "What is the value of sin(90°) + cos(0°)?",
        options: ["0", "1", "2", "0.5"],
        correct: 2,
        explanation: "sin(90°) = 1 and cos(0°) = 1. Therefore, 1 + 1 = 2."
      },
      {
        id: 7,
        question: "What is the determinant of a 2x2 matrix [[2, 3], [1, 4]]?",
        options: ["5", "8", "11", "5"],
        correct: 0,
        explanation: "Determinant of [[a, b], [c, d]] is (a*d - b*c). Here (2*4 - 3*1) = 8 - 3 = 5."
      },
      {
        id: 8,
        question: "What is the limit of (sin x) / x as x approaches 0?",
        options: ["0", "1", "Infinity", "Undefined"],
        correct: 1,
        explanation: "This is a fundamental calculus limit: lim (x→0) sin(x)/x = 1 (proved via Squeeze Theorem or L'Hôpital's Rule)."
      },
      {
        id: 9,
        question: "What is the 10th term of the arithmetic progression 2, 5, 8, 11...?",
        options: ["27", "29", "31", "33"],
        correct: 1,
        explanation: "Formula for nth term: a_n = a + (n - 1)d. Here a = 2, d = 3. So a_10 = 2 + (9 * 3) = 2 + 27 = 29."
      },
      {
        id: 10,
        question: "If radius of a circle is doubled, by what factor does its area increase?",
        options: ["2 times", "4 times", "8 times", "Remains same"],
        correct: 1,
        explanation: "Area of a circle is A = π*r². If r becomes 2r, the new area is π*(2r)² = 4πr², which is 4 times the original area."
      },
      {
        id: 11,
        question: "What is the value of 5! (5 factorial)?",
        options: ["60", "100", "120", "720"],
        correct: 2,
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120."
      },
      {
        id: 12,
        question: "The slope of a horizontal line is:",
        options: ["0", "1", "Undefined", "-1"],
        correct: 0,
        explanation: "A horizontal line has zero vertical rise for any horizontal run, so slope = Δy / Δx = 0."
      }
    ]
  },

  physics: {
    id: "physics",
    name: "Physics",
    description: "Mechanics, Thermodynamics, Optics, Electricity & Magnetism",
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    accentColor: "#6d28d9",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)"/>
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)"/>
    </svg>`,
    questions: [
      {
        id: 101,
        question: "What is the SI unit of electric force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 1,
        explanation: "Like all mechanical and electrostatic forces, force is measured in Newtons (N) in the SI system."
      },
      {
        id: 102,
        question: "Which law of thermodynamics states that energy cannot be created or destroyed?",
        options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
        correct: 1,
        explanation: "The First Law of Thermodynamics is the Law of Conservation of Energy: ΔU = Q - W."
      },
      {
        id: 103,
        question: "What is the speed of light in vacuum approximately?",
        options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
        correct: 1,
        explanation: "The speed of light in vacuum is approximately 299,792,458 m/s, usually rounded to 3 × 10⁸ m/s."
      },
      {
        id: 104,
        question: "According to Newton's Second Law, force is equal to:",
        options: ["Mass × Velocity", "Mass × Acceleration", "Weight / Gravity", "Work / Time"],
        correct: 1,
        explanation: "Newton's Second Law states F = m * a (Force = Mass × Acceleration)."
      },
      {
        id: 105,
        question: "What type of lens is used to correct myopia (nearsightedness)?",
        options: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
        correct: 1,
        explanation: "Myopia occurs when images focus in front of the retina. A diverging (concave) lens spreads the light rays to focus on the retina."
      },
      {
        id: 106,
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Coulomb"],
        correct: 2,
        explanation: "The SI unit of electrical resistance is the Ohm (symbol: Ω), defined by Ohm's Law (R = V / I)."
      },
      {
        id: 107,
        question: "What phenomenon explains the bending of light when passing from one medium to another?",
        options: ["Reflection", "Refraction", "Diffraction", "Polarization"],
        correct: 1,
        explanation: "Refraction is the bending of light waves when they pass between media with different refractive indices due to a change in wave speed."
      },
      {
        id: 108,
        question: "What is the acceleration due to gravity on Earth's surface approximately?",
        options: ["9.8 m/s²", "8.9 m/s²", "10.8 m/s²", "6.67 m/s²"],
        correct: 0,
        explanation: "Standard acceleration due to Earth's gravity (g) is approximately 9.80665 m/s²."
      },
      {
        id: 109,
        question: "Sound waves in air are:",
        options: ["Transverse waves", "Longitudinal waves", "Electromagnetic waves", "Stationary waves"],
        correct: 1,
        explanation: "Sound waves in air are longitudinal compression waves where air molecules oscillate parallel to the direction of wave travel."
      },
      {
        id: 110,
        question: "Work done on an object is zero when the angle between Force and Displacement is:",
        options: ["0°", "45°", "90°", "180°"],
        correct: 2,
        explanation: "Work W = F * d * cos(θ). Since cos(90°) = 0, no work is done when force is perpendicular to displacement."
      },
      {
        id: 111,
        question: "Which color of visible light has the shortest wavelength?",
        options: ["Red", "Green", "Violet", "Yellow"],
        correct: 2,
        explanation: "Violet light has the shortest wavelength (~380-450 nm) and highest frequency in the visible spectrum, while red has the longest (~700 nm)."
      },
      {
        id: 112,
        question: "Electric current is the rate of flow of:",
        options: ["Neutrons", "Protons", "Electric charge (electrons)", "Photons"],
        correct: 2,
        explanation: "Current (I = Q/t) is defined as the flow of electric charges (electrons in metallic conductors) per unit time."
      }
    ]
  },

  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    description: "Periodic Table, Bonding, Organic Chemistry & Reactions",
    color: "#10b981",
    bgColor: "#ecfdf5",
    accentColor: "#047857",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 2v7.5l-5 9.5a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9.5V2"/>
      <path d="M8 2h8"/>
      <path d="M7 16h10"/>
    </svg>`,
    questions: [
      {
        id: 201,
        question: "What is the pH value of pure distilled water at 25°C?",
        options: ["0", "7", "14", "5"],
        correct: 1,
        explanation: "Pure water has equal concentrations of H+ and OH- ions ([H+] = 10⁻⁷ M), yielding a neutral pH of 7."
      },
      {
        id: 202,
        question: "What is the chemical formula for common table salt?",
        options: ["KCl", "NaCl", "Na2CO3", "NaHCO3"],
        correct: 1,
        explanation: "Common table salt is Sodium Chloride, which has the chemical formula NaCl."
      },
      {
        id: 203,
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correct: 2,
        explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere, followed by oxygen at ~21%."
      },
      {
        id: 204,
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        correct: 1,
        explanation: "Carbon has 6 protons in its atomic nucleus, giving it atomic number 6 (atomic mass is ~12)."
      },
      {
        id: 205,
        question: "Which bond is formed by the sharing of electrons between atoms?",
        options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
        correct: 1,
        explanation: "Covalent bonds form when pairs of electrons are shared between two non-metal atoms."
      },
      {
        id: 206,
        question: "What is the common name of Sodium Bicarbonate (NaHCO₃)?",
        options: ["Washing soda", "Baking soda", "Bleaching powder", "Caustic soda"],
        correct: 1,
        explanation: "NaHCO₃ is widely known as baking soda. (Na₂CO₃·10H₂O is washing soda)."
      },
      {
        id: 207,
        question: "Which metal is liquid at room temperature?",
        options: ["Iron", "Lead", "Mercury", "Silver"],
        correct: 2,
        explanation: "Mercury (Hg) is the only standard metallic element that is liquid at standard room temperature (25°C)."
      },
      {
        id: 208,
        question: "What is Avogadro's number?",
        options: ["6.022 × 10²³", "3.00 × 10⁸", "1.602 × 10⁻¹⁹", "9.8 × 10¹"],
        correct: 0,
        explanation: "Avogadro's constant is approximately 6.022 × 10²³ entities per mole of substance."
      },
      {
        id: 209,
        question: "Rusting of iron is an example of which chemical reaction?",
        options: ["Reduction only", "Oxidation / Redox reaction", "Decomposition", "Neutralization"],
        correct: 1,
        explanation: "Rusting occurs when iron reacts with oxygen and moisture, where iron loses electrons (oxidation) forming hydrated iron(III) oxide."
      },
      {
        id: 210,
        question: "Which acid is present in lemons and citrus fruits?",
        options: ["Acetic acid", "Citric acid", "Formic acid", "Lactic acid"],
        correct: 1,
        explanation: "Citric acid gives citrus fruits (lemons, oranges, limes) their signature sour taste."
      },
      {
        id: 211,
        question: "What is the hardest naturally occurring substance on Earth?",
        options: ["Granite", "Titanium", "Diamond", "Quartz"],
        correct: 2,
        explanation: "Diamond, an allotrope of pure carbon with tetrahedral lattice bonding, is the hardest natural mineral (Mohs scale 10)."
      },
      {
        id: 212,
        question: "In the periodic table, elements in the same vertical column are called:",
        options: ["Periods", "Groups", "Series", "Blocks"],
        correct: 1,
        explanation: "Vertical columns in the periodic table are called Groups (or families) and share similar valence electron configurations."
      }
    ]
  },

  computers: {
    id: "computers",
    name: "Computer Basics",
    description: "Hardware, Binary, Web Technologies, Networks & Logic",
    color: "#06b6d4",
    bgColor: "#ecfeff",
    accentColor: "#0e7490",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>`,
    questions: [
      {
        id: 301,
        question: "What does HTML stand for in web development?",
        options: [
          "Hyper Tool Markup Language",
          "HyperText Markup Language",
          "HighText Machine Language",
          "Hyperlink Text Management List"
        ],
        correct: 1,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language used to structure web pages."
      },
      {
        id: 302,
        question: "Which of the following is considered the 'Brain' of a computer?",
        options: ["RAM", "Hard Disk", "CPU (Central Processing Unit)", "Motherboard"],
        correct: 2,
        explanation: "The CPU executes instructions, performs mathematical and logical calculations, and controls hardware devices."
      },
      {
        id: 303,
        question: "How many bits are in one single Byte?",
        options: ["4 bits", "8 bits", "16 bits", "32 bits"],
        correct: 1,
        explanation: "One byte consists of exactly 8 binary digits (bits). A 4-bit unit is called a nibble."
      },
      {
        id: 304,
        question: "Which CSS property is used to change the background color of an element?",
        options: ["color", "bg-color", "background-color", "element-background"],
        correct: 2,
        explanation: "In standard CSS, 'background-color' is the property used to set the background color of any element."
      },
      {
        id: 305,
        question: "What is the primary role of JavaScript in a web page?",
        options: [
          "To structure headings and paragraphs",
          "To provide visual styling and colors",
          "To add interactivity and dynamic behavior",
          "To store data on the server hard drive"
        ],
        correct: 2,
        explanation: "HTML provides structure, CSS provides presentation/styling, and JavaScript adds interactive logic and dynamic behavior."
      },
      {
        id: 306,
        question: "Which protocol is used to securely transfer web pages over the internet?",
        options: ["FTP", "HTTP", "HTTPS", "SMTP"],
        correct: 2,
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication over a computer network using TLS/SSL."
      },
      {
        id: 307,
        question: "What does RAM stand for?",
        options: [
          "Random Access Memory",
          "Read Access Module",
          "Rapid Action Memory",
          "Run Active Matrix"
        ],
        correct: 0,
        explanation: "RAM stands for Random Access Memory, high-speed volatile working memory used by the operating system and running programs."
      },
      {
        id: 308,
        question: "In JavaScript, which symbol is used for strict equality comparison?",
        options: ["=", "==", "===", "!="],
        correct: 2,
        explanation: "The '===' operator checks both value AND type equality without performing type coercion."
      },
      {
        id: 309,
        question: "What does IP stand for in 'IP Address'?",
        options: ["Internal Program", "Internet Protocol", "Interface Point", "Integrated Path"],
        correct: 1,
        explanation: "IP stands for Internet Protocol, which governs packet routing and unique device addresses across the internet."
      },
      {
        id: 310,
        question: "What is the binary representation of decimal number 10?",
        options: ["1001", "1010", "1100", "1110"],
        correct: 1,
        explanation: "10 in binary is: (1 × 8) + (0 × 4) + (1 × 2) + (0 × 1) = 1010₂."
      },
      {
        id: 311,
        question: "Which HTML tag is used to create a clickable button?",
        options: ["<clickable>", "<button>", "<input type='click'>", "<btn>"],
        correct: 1,
        explanation: "The standard semantic HTML element for clickable buttons is `<button>`."
      },
      {
        id: 312,
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<script src='file.js'>", "<js href='file.js'>", "<link rel='script' href='file.js'>", "<code src='file.js'>"],
        correct: 0,
        explanation: "The `<script src='...'>` tag is the sanctioned way to include external JavaScript files in HTML."
      }
    ]
  },

  gk: {
    id: "gk",
    name: "General Knowledge",
    description: "World Geography, History, Space, Nature & Discoveries",
    color: "#f59e0b",
    bgColor: "#fffbeb",
    accentColor: "#b45309",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>`,
    questions: [
      {
        id: 401,
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correct: 1,
        explanation: "Mars appears reddish in the sky due to the large amount of iron oxide (rust) on its surface."
      },
      {
        id: 402,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3,
        explanation: "The Pacific Ocean is the world's largest and deepest ocean basin, covering more than 30% of the Earth's surface."
      },
      {
        id: 403,
        question: "Who was the first human to travel into outer space?",
        options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
        correct: 1,
        explanation: "Soviet cosmonaut Yuri Gagarin orbited the Earth on April 12, 1961 aboard Vostok 1."
      },
      {
        id: 404,
        question: "What is the capital city of Japan?",
        options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"],
        correct: 2,
        explanation: "Tokyo has been the capital and the seat of government of Japan since 1868."
      },
      {
        id: 405,
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correct: 1,
        explanation: "The Nile River in Africa is traditionally recognized as the longest river in the world, spanning about 6,650 km."
      },
      {
        id: 406,
        question: "In which year did the United Nations (UN) come into existence?",
        options: ["1919", "1945", "1950", "1939"],
        correct: 1,
        explanation: "The United Nations was officially founded on October 24, 1945 following the conclusion of World War II."
      },
      {
        id: 407,
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Brazil", "South Africa", "Australia", "Indonesia"],
        correct: 2,
        explanation: "The Great Barrier Reef is situated off the coast of Queensland in northeastern Australia."
      },
      {
        id: 408,
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        correct: 1,
        explanation: "Alexander Graham Bell received the first official patent for the electromagnetic telephone in 1876."
      },
      {
        id: 409,
        question: "What is the highest mountain peak in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correct: 2,
        explanation: "Mount Everest in the Himalayas reaches 8,848.86 meters above sea level."
      },
      {
        id: 410,
        question: "Which continent has the most number of countries?",
        options: ["Asia", "Europe", "Africa", "South America"],
        correct: 2,
        explanation: "Africa contains 54 fully recognized sovereign member states of the United Nations, more than any other continent."
      },
      {
        id: 411,
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correct: 1,
        explanation: "William Shakespeare wrote the famous tragedy 'Romeo and Juliet' in the 1590s."
      },
      {
        id: 412,
        question: "Which organ in the human body produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Heart"],
        correct: 2,
        explanation: "The beta cells of the Islets of Langerhans in the pancreas produce the hormone insulin to regulate blood glucose."
      }
    ]
  },

  english: {
    id: "english",
    name: "English & Grammar",
    description: "Vocabulary, Parts of Speech, Idioms & Accurate Usage",
    color: "#f43f5e",
    bgColor: "#fff1f2",
    accentColor: "#be123c",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>`,
    questions: [
      {
        id: 501,
        question: "Identify the part of speech of the word 'rapidly' in: 'The train moved rapidly.'",
        options: ["Noun", "Adjective", "Adverb", "Preposition"],
        correct: 2,
        explanation: "'Rapidly' modifies the action verb 'moved' by describing how it moved, making it an adverb."
      },
      {
        id: 502,
        question: "What is the synonym of the word 'Benevolent'?",
        options: ["Cruel", "Kind / Generous", "Greedy", "Lazy"],
        correct: 1,
        explanation: "'Benevolent' means well-meaning, charitable, and kindly."
      },
      {
        id: 503,
        question: "Which of the following sentences has correct subject-verb agreement?",
        options: [
          "Either my mother or my sisters is going.",
          "Either my mother or my sisters are going.",
          "Either my mother or my sisters was going.",
          "Either my mother or my sisters has gone."
        ],
        correct: 1,
        explanation: "When subjects are joined by 'or'/'nor', the verb agrees with the closer subject. 'Sisters' is plural, so 'are going' is correct."
      },
      {
        id: 504,
        question: "What is the antonym of the word 'Abundant'?",
        options: ["Plentiful", "Scarce", "Rich", "Lavish"],
        correct: 1,
        explanation: "'Abundant' means existing in large quantities, while 'Scarce' means rare or in short supply."
      },
      {
        id: 505,
        question: "What does the idiom 'Bite the bullet' mean?",
        options: [
          "To eat something hard",
          "To endure a painful or unavoidable situation bravely",
          "To start an argument",
          "To shoot accurately"
        ],
        correct: 1,
        explanation: "'To bite the bullet' means to face a tough, unavoidable situation with courage."
      },
      {
        id: 506,
        question: "Choose the correctly spelled word:",
        options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
        correct: 0,
        explanation: "'Accommodate' has double 'c' and double 'm' (A-c-c-o-m-m-o-d-a-t-e)."
      },
      {
        id: 507,
        question: "Which punctuation mark is used to indicate direct speech or quotation?",
        options: ["Hyphen", "Quotation marks (\")", "Semicolon", "Ellipsis"],
        correct: 1,
        explanation: "Quotation marks (\" \") enclose the exact spoken or quoted words."
      },
      {
        id: 508,
        question: "Fill in the blank: 'Neither of the boys ___ present in class yesterday.'",
        options: ["were", "was", "are", "have"],
        correct: 1,
        explanation: "'Neither' when used as a pronoun is singular and takes a singular verb: 'was'."
      },
      {
        id: 509,
        question: "What is a group of lions called?",
        options: ["A pack", "A herd", "A pride", "A flock"],
        correct: 2,
        explanation: "The collective noun for a family or group of lions is a 'pride'."
      },
      {
        id: 510,
        question: "Identify the figure of speech: 'The stars danced playfully in the moonlit sky.'",
        options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
        correct: 2,
        explanation: "Personification gives human qualities or actions (dancing playfully) to non-human things (stars)."
      },
      {
        id: 511,
        question: "What is the past participle of the irregular verb 'write'?",
        options: ["Wrote", "Written", "Writing", "Writes"],
        correct: 1,
        explanation: "The principal parts of 'write' are: present = write, past simple = wrote, past participle = written."
      },
      {
        id: 512,
        question: "Choose the word with the prefix meaning 'against':",
        options: ["Antidote", "Bilingual", "Submarine", "Preheat"],
        correct: 0,
        explanation: "The prefix 'anti-' means against or opposite to (e.g., antidote works against poison)."
      }
    ]
  }
};
