/**
 * PRACTICE CORNER - CORE JAVASCRIPT APPLICATION LOGIC
 * 
 * Clean, well-commented client-side JavaScript.
 * Handles:
 * 1. Screen / View navigation (Single Page Architecture)
 * 2. Dynamic subject rendering
 * 3. Quiz engine (shuffling, question rendering, selection, timer)
 * 4. Score calculation & detailed review breakdown
 * 5. LocalStorage study history persistence (no external database required)
 * 6. Keyboard accessibility (1-4, A-D, Enter)
 */

// ==========================================
// 1. APPLICATION STATE
// ==========================================
const appState = {
  currentSubjectKey: null,
  currentSubjectData: null,
  selectedQuestionCount: 5,
  isTimedMode: true,
  timePerQuestionSeconds: 30,
  
  // Active quiz variables
  quizQuestions: [],
  currentQuestionIndex: 0,
  userAnswers: [], // Stores: { questionId, selectedIndex, isCorrect, questionObj }
  selectedOptionIndex: null,
  timerInterval: null,
  secondsRemaining: 30,
  quizStartTime: null,
  totalQuizSecondsElapsed: 0
};

// Storage Keys
const STORAGE_HISTORY_KEY = 'practice_quiz_study_history';
const STORAGE_THEME_KEY = 'practice_quiz_theme_mode';

// ==========================================
// 2. DOM ELEMENT REFERENCES
// ==========================================
const elements = {
  // Navigation / Views
  navLinks: document.querySelectorAll('.nav-link'),
  views: {
    home: document.getElementById('view-home'),
    subjects: document.getElementById('view-subjects'),
    quiz: document.getElementById('view-quiz'),
    results: document.getElementById('view-results'),
    history: document.getElementById('view-history')
  },

  // Theme toggle
  themeToggleBtn: document.getElementById('theme-toggle-btn'),

  // Home stats
  homeTotalAttempts: document.getElementById('home-total-attempts'),
  homeAvgScore: document.getElementById('home-avg-score'),
  homeSubjectCount: document.getElementById('home-subject-count'),
  homeRecentList: document.getElementById('home-recent-list'),

  // Subjects View
  subjectsGrid: document.getElementById('subjects-grid'),

  // Setup Modal
  setupModal: document.getElementById('quiz-setup-modal'),
  modalSubjectTitle: document.getElementById('modal-subject-title'),
  modalSubjectDesc: document.getElementById('modal-subject-desc'),
  countButtons: document.querySelectorAll('.count-pill-btn'),
  timerToggleCheckbox: document.getElementById('modal-timer-toggle'),
  modalStartBtn: document.getElementById('modal-start-btn'),
  modalCloseBtn: document.getElementById('modal-close-btn'),

  // Quiz View
  quizSubjectBadge: document.getElementById('quiz-subject-badge'),
  quizProgressText: document.getElementById('quiz-progress-text'),
  quizProgressBar: document.getElementById('quiz-progress-bar'),
  quizTimerBox: document.getElementById('quiz-timer-box'),
  quizTimerSeconds: document.getElementById('quiz-timer-seconds'),
  questionText: document.getElementById('question-text'),
  optionsList: document.getElementById('options-list'),
  nextQuestionBtn: document.getElementById('next-question-btn'),
  quitQuizBtn: document.getElementById('quit-quiz-btn'),

  // Results View
  resultsSubjectBadge: document.getElementById('results-subject-badge'),
  resultsScoreText: document.getElementById('results-score-text'),
  resultsPercentage: document.getElementById('results-percentage'),
  resultsPerformanceMsg: document.getElementById('results-performance-msg'),
  statCorrectCount: document.getElementById('stat-correct-count'),
  statWrongCount: document.getElementById('stat-wrong-count'),
  statTimeTaken: document.getElementById('stat-time-taken'),
  statAccuracyRate: document.getElementById('stat-accuracy-rate'),
  reviewListContainer: document.getElementById('review-list-container'),
  retakeQuizBtn: document.getElementById('retake-quiz-btn'),

  // History View
  historyTableBody: document.getElementById('history-table-body'),
  historyEmptyNotice: document.getElementById('history-empty-notice'),
  clearHistoryBtn: document.getElementById('clear-history-btn')
};

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderSubjects();
  refreshHomeStats();
  setupEventListeners();

  // Handle URL hash navigation or default to home
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateToView(initialHash);
});

// ==========================================
// 4. VIEW NAVIGATION (SPA Router)
// ==========================================
function navigateToView(viewName) {
  // If target view does not exist, default to home
  if (!elements.views[viewName]) {
    viewName = 'home';
  }

  // Hide all views
  Object.values(elements.views).forEach(view => {
    if (view) view.classList.add('hidden-view');
  });

  // Reveal requested view
  elements.views[viewName].classList.remove('hidden-view');

  // Update navbar active state
  elements.navLinks.forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update hash without scrolling jumps
  window.location.hash = `#${viewName}`;

  // Hook specific view refreshers
  if (viewName === 'home') {
    refreshHomeStats();
  } else if (viewName === 'history') {
    renderHistoryTable();
  } else if (viewName === 'subjects') {
    renderSubjects();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 5. THEME TOGGLING (Dark & Light Mode)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'light';
  applyTheme(savedTheme);

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.innerHTML = theme === 'dark' 
      ? '☀️ <span class="theme-label">Light Mode</span>' 
      : '🌙 <span class="theme-label">Dark Mode</span>';
  }
}

// ==========================================
// 6. SUBJECTS RENDERING
// ==========================================
function renderSubjects() {
  if (!elements.subjectsGrid) return;
  elements.subjectsGrid.innerHTML = '';

  const studyHistory = getStudyHistory();

  Object.keys(SUBJECTS_DATA).forEach(subjectKey => {
    const subject = SUBJECTS_DATA[subjectKey];

    // Find highest score in this subject from history
    const subjectAttempts = studyHistory.filter(h => h.subjectKey === subjectKey);
    let bestScoreBadge = '<span class="best-badge unattempted">Not Attempted</span>';
    if (subjectAttempts.length > 0) {
      const maxScore = Math.max(...subjectAttempts.map(a => a.percentage));
      bestScoreBadge = `<span class="best-badge">Best: ${maxScore}%</span>`;
    }

    const card = document.createElement('article');
    card.className = 'subject-card';
    card.style.setProperty('--card-accent', subject.color);

    card.innerHTML = `
      <div class="subject-card-header">
        <div class="subject-icon-wrap" style="color: ${subject.color};">
          ${subject.icon}
        </div>
        ${bestScoreBadge}
      </div>
      <div class="subject-card-body">
        <h3 class="subject-title">${subject.name}</h3>
        <p class="subject-desc">${subject.description}</p>
      </div>
      <div class="subject-card-footer">
        <span class="question-count-badge">📚 ${subject.questions.length} Questions</span>
        <button type="button" class="btn btn-outline start-subject-btn" data-subject="${subjectKey}">
          Practice &rarr;
        </button>
      </div>
    `;

    // Clicking anywhere on card opens the setup modal
    card.addEventListener('click', (e) => {
      openSetupModal(subjectKey);
    });

    elements.subjectsGrid.appendChild(card);
  });
}

// ==========================================
// 7. SETUP MODAL (Question count & Timer)
// ==========================================
function openSetupModal(subjectKey) {
  const subject = SUBJECTS_DATA[subjectKey];
  if (!subject) return;

  appState.currentSubjectKey = subjectKey;
  appState.currentSubjectData = subject;

  elements.modalSubjectTitle.textContent = `Practice ${subject.name}`;
  elements.modalSubjectDesc.textContent = subject.description;

  // Set default selection
  appState.selectedQuestionCount = 5;
  elements.countButtons.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.count, 10) === appState.selectedQuestionCount);
  });

  elements.timerToggleCheckbox.checked = true;
  appState.isTimedMode = true;

  elements.setupModal.classList.remove('hidden');
  elements.setupModal.classList.add('open');
}

function closeSetupModal() {
  elements.setupModal.classList.remove('open');
  elements.setupModal.classList.add('hidden');
}

// ==========================================
// 8. QUIZ ENGINE (Start, Next, Scoring)
// ==========================================
function startQuiz() {
  closeSetupModal();

  const allQuestions = [...appState.currentSubjectData.questions];
  // Shuffle questions randomly
  shuffleArray(allQuestions);

  // Take requested count
  const countToTake = Math.min(appState.selectedQuestionCount, allQuestions.length);
  appState.quizQuestions = allQuestions.slice(0, countToTake);

  // Reset quiz state
  appState.currentQuestionIndex = 0;
  appState.userAnswers = [];
  appState.selectedOptionIndex = null;
  appState.quizStartTime = Date.now();

  // Configure timer display
  appState.isTimedMode = elements.timerToggleCheckbox.checked;
  if (appState.isTimedMode) {
    elements.quizTimerBox.style.display = 'inline-flex';
  } else {
    elements.quizTimerBox.style.display = 'none';
  }

  // Navigate to quiz screen
  navigateToView('quiz');

  // Render first question
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  clearInterval(appState.timerInterval);
  appState.selectedOptionIndex = null;
  elements.nextQuestionBtn.disabled = true;

  const currentQ = appState.quizQuestions[appState.currentQuestionIndex];
  const totalQ = appState.quizQuestions.length;

  // Update header badges
  elements.quizSubjectBadge.textContent = appState.currentSubjectData.name;
  elements.quizSubjectBadge.style.borderColor = appState.currentSubjectData.color;
  elements.quizProgressText.textContent = `Question ${appState.currentQuestionIndex + 1} of ${totalQ}`;

  // Update Progress Bar
  const progressPercent = ((appState.currentQuestionIndex + 1) / totalQ) * 100;
  elements.quizProgressBar.style.width = `${progressPercent}%`;

  // Update question text
  elements.questionText.textContent = currentQ.question;

  // Render Options
  elements.optionsList.innerHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  currentQ.options.forEach((optText, idx) => {
    const optionBtn = document.createElement('button');
    optionBtn.type = 'button';
    optionBtn.className = 'quiz-option-btn';
    optionBtn.setAttribute('data-index', idx);
    optionBtn.setAttribute('role', 'radio');
    optionBtn.setAttribute('aria-checked', 'false');

    optionBtn.innerHTML = `
      <span class="option-pill-badge">${optionLetters[idx]}</span>
      <span class="option-text">${escapeHtml(optText)}</span>
    `;

    optionBtn.addEventListener('click', () => {
      selectOption(idx);
    });

    elements.optionsList.appendChild(optionBtn);
  });

  // Next / Finish button label
  if (appState.currentQuestionIndex === totalQ - 1) {
    elements.nextQuestionBtn.innerHTML = 'Finish Quiz & View Results &#10003;';
  } else {
    elements.nextQuestionBtn.innerHTML = 'Next Question &rarr;';
  }

  // Start countdown timer if enabled
  if (appState.isTimedMode) {
    startQuestionTimer();
  }
}

function selectOption(index) {
  appState.selectedOptionIndex = index;

  const buttons = elements.optionsList.querySelectorAll('.quiz-option-btn');
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
    } else {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
    }
  });

  // Enable Next button
  elements.nextQuestionBtn.disabled = false;
}

function startQuestionTimer() {
  appState.secondsRemaining = appState.timePerQuestionSeconds;
  updateTimerUI();

  appState.timerInterval = setInterval(() => {
    appState.secondsRemaining--;
    updateTimerUI();

    if (appState.secondsRemaining <= 0) {
      clearInterval(appState.timerInterval);
      // Auto move forward (marked as skipped/timeout if nothing selected)
      handleQuestionTimeout();
    }
  }, 1000);
}

function updateTimerUI() {
  elements.quizTimerSeconds.textContent = `${appState.secondsRemaining}s`;

  if (appState.secondsRemaining <= 5) {
    elements.quizTimerBox.classList.add('timer-warning');
  } else {
    elements.quizTimerBox.classList.remove('timer-warning');
  }
}

function handleQuestionTimeout() {
  // If user selected an option right before timeout, keep it; otherwise -1 (unanswered)
  const chosenIndex = appState.selectedOptionIndex !== null ? appState.selectedOptionIndex : -1;
  recordAnswerAndAdvance(chosenIndex, true);
}

function handleNextQuestionClick() {
  if (appState.selectedOptionIndex === null) return;
  recordAnswerAndAdvance(appState.selectedOptionIndex, false);
}

function recordAnswerAndAdvance(selectedIndex, wasTimeout = false) {
  clearInterval(appState.timerInterval);

  const currentQ = appState.quizQuestions[appState.currentQuestionIndex];
  const isCorrect = selectedIndex === currentQ.correct;

  appState.userAnswers.push({
    questionId: currentQ.id,
    questionText: currentQ.question,
    options: currentQ.options,
    correctIndex: currentQ.correct,
    selectedIndex: selectedIndex,
    isCorrect: isCorrect,
    explanation: currentQ.explanation,
    wasTimeout: wasTimeout
  });

  // Move to next question or show results
  if (appState.currentQuestionIndex < appState.quizQuestions.length - 1) {
    appState.currentQuestionIndex++;
    renderCurrentQuestion();
  } else {
    finishQuizAndShowResults();
  }
}

// ==========================================
// 9. QUIZ RESULTS & EXPLANATION REVIEW
// ==========================================
function finishQuizAndShowResults() {
  clearInterval(appState.timerInterval);

  // Compute total time
  const totalElapsedMs = Date.now() - appState.quizStartTime;
  const totalSeconds = Math.max(1, Math.round(totalElapsedMs / 1000));
  appState.totalQuizSecondsElapsed = totalSeconds;

  // Calculate scores
  const totalCount = appState.userAnswers.length;
  const correctCount = appState.userAnswers.filter(a => a.isCorrect).length;
  const wrongCount = totalCount - correctCount;
  const percentage = Math.round((correctCount / totalCount) * 100);

  // Update UI text
  elements.resultsSubjectBadge.textContent = appState.currentSubjectData.name;
  elements.resultsScoreText.textContent = `${correctCount} / ${totalCount}`;
  elements.resultsPercentage.textContent = `${percentage}%`;

  // Performance encouraging feedback
  let message = "";
  if (percentage >= 90) {
    message = "🌟 Outstanding! You have mastered this topic brilliantly!";
  } else if (percentage >= 75) {
    message = "👏 Excellent work! A very strong conceptual understanding!";
  } else if (percentage >= 50) {
    message = "👍 Good effort! Review the explanations below to improve further.";
  } else {
    message = "📖 Keep practicing! Read the answer keys below and try again.";
  }
  elements.resultsPerformanceMsg.textContent = message;

  // Stats pills
  elements.statCorrectCount.textContent = correctCount;
  elements.statWrongCount.textContent = wrongCount;
  elements.statTimeTaken.textContent = formatDuration(totalSeconds);
  elements.statAccuracyRate.textContent = `${percentage}%`;

  // Save to study history in LocalStorage
  saveQuizAttempt({
    id: Date.now(),
    dateString: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    subjectKey: appState.currentSubjectKey,
    subjectName: appState.currentSubjectData.name,
    correctCount: correctCount,
    totalCount: totalCount,
    percentage: percentage,
    durationSeconds: totalSeconds
  });

  // Render question-by-question review with explanations
  renderResultsReview();

  // Switch to results view
  navigateToView('results');
}

function renderResultsReview() {
  elements.reviewListContainer.innerHTML = '';
  const optionLetters = ['A', 'B', 'C', 'D'];

  appState.userAnswers.forEach((ans, index) => {
    const reviewCard = document.createElement('div');
    reviewCard.className = `review-item-card ${ans.isCorrect ? 'review-correct' : 'review-wrong'}`;

    const statusBadge = ans.isCorrect
      ? '<span class="status-pill status-pill-correct">✓ Correct</span>'
      : (ans.selectedIndex === -1 
          ? '<span class="status-pill status-pill-timeout">⏱ Timed Out</span>'
          : '<span class="status-pill status-pill-wrong">✗ Incorrect</span>');

    const userAnswerText = ans.selectedIndex !== -1 
      ? `(${optionLetters[ans.selectedIndex]}) ${escapeHtml(ans.options[ans.selectedIndex])}`
      : `<em>No answer selected (Time Expired)</em>`;

    const correctAnswerText = `(${optionLetters[ans.correctIndex]}) ${escapeHtml(ans.options[ans.correctIndex])}`;

    reviewCard.innerHTML = `
      <div class="review-header">
        <span class="review-q-num">Question ${index + 1}</span>
        ${statusBadge}
      </div>
      <h4 class="review-question-text">${escapeHtml(ans.questionText)}</h4>
      
      <div class="review-answers-grid">
        <div class="review-ans-box ${ans.isCorrect ? 'box-correct' : 'box-wrong'}">
          <span class="review-ans-label">Your Selection:</span>
          <span class="review-ans-val">${userAnswerText}</span>
        </div>
        <div class="review-ans-box box-correct">
          <span class="review-ans-label">Correct Answer:</span>
          <span class="review-ans-val">${correctAnswerText}</span>
        </div>
      </div>

      <div class="review-explanation-box">
        <strong>💡 Key Concept & Explanation:</strong>
        <p>${escapeHtml(ans.explanation)}</p>
      </div>
    `;

    elements.reviewListContainer.appendChild(reviewCard);
  });
}

// ==========================================
// 10. LOCAL STORAGE PRACTICE LOGS
// ==========================================
function getStudyHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error reading study history from localStorage:', e);
    return [];
  }
}

function saveQuizAttempt(attemptObj) {
  try {
    const history = getStudyHistory();
    history.unshift(attemptObj); // Place newest first
    // Keep last 50 attempts
    if (history.length > 50) history.pop();
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving attempt to localStorage:', e);
  }
}

function clearAllHistory() {
  if (confirm("Are you sure you want to clear all practice records?")) {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
    renderHistoryTable();
    refreshHomeStats();
    renderSubjects();
  }
}

function renderHistoryTable() {
  const history = getStudyHistory();

  if (!history || history.length === 0) {
    elements.historyEmptyNotice.style.display = 'block';
    elements.historyTableBody.innerHTML = '';
    return;
  }

  elements.historyEmptyNotice.style.display = 'none';
  elements.historyTableBody.innerHTML = '';

  history.forEach(item => {
    const row = document.createElement('tr');
    
    const passed = item.percentage >= 50;
    const badgeClass = passed ? 'badge-passed' : 'badge-failed';
    const badgeLabel = passed ? 'Passed' : 'Needs Practice';

    row.innerHTML = `
      <td><strong>${escapeHtml(item.subjectName)}</strong></td>
      <td>${item.dateString}</td>
      <td>${item.correctCount} / ${item.totalCount}</td>
      <td><strong>${item.percentage}%</strong></td>
      <td>${formatDuration(item.durationSeconds)}</td>
      <td><span class="status-badge ${badgeClass}">${badgeLabel}</span></td>
    `;
    elements.historyTableBody.appendChild(row);
  });
}

function refreshHomeStats() {
  const history = getStudyHistory();
  const totalCount = history.length;

  if (elements.homeTotalAttempts) {
    elements.homeTotalAttempts.textContent = totalCount;
  }

  if (elements.homeAvgScore) {
    if (totalCount === 0) {
      elements.homeAvgScore.textContent = '0%';
    } else {
      const sum = history.reduce((acc, curr) => acc + curr.percentage, 0);
      const avg = Math.round(sum / totalCount);
      elements.homeAvgScore.textContent = `${avg}%`;
    }
  }

  if (elements.homeSubjectCount) {
    elements.homeSubjectCount.textContent = Object.keys(SUBJECTS_DATA).length;
  }

  // Render recent 3 attempts on home page
  if (elements.homeRecentList) {
    elements.homeRecentList.innerHTML = '';
    const recentThree = history.slice(0, 3);
    if (recentThree.length === 0) {
      elements.homeRecentList.innerHTML = '<li class="no-records-item">No quizzes completed yet. Take your first quiz!</li>';
    } else {
      recentThree.forEach(item => {
        const li = document.createElement('li');
        li.className = 'recent-log-item';
        li.innerHTML = `
          <div class="log-info">
            <span class="log-subj">${escapeHtml(item.subjectName)}</span>
            <span class="log-date">${item.dateString}</span>
          </div>
          <div class="log-score ${item.percentage >= 50 ? 'log-high' : 'log-low'}">
            ${item.correctCount}/${item.totalCount} (${item.percentage}%)
          </div>
        `;
        elements.homeRecentList.appendChild(li);
      });
    }
  }
}

// ==========================================
// 11. EVENT LISTENERS & KEYBOARD CONTROLS
// ==========================================
function setupEventListeners() {
  // Navigation Links
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      if (targetView) navigateToView(targetView);
    });
  });

  // Modal count pills selection
  elements.countButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.countButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedQuestionCount = parseInt(btn.dataset.count, 10);
    });
  });

  // Modal actions
  elements.modalStartBtn.addEventListener('click', startQuiz);
  elements.modalCloseBtn.addEventListener('click', closeSetupModal);
  elements.setupModal.addEventListener('click', (e) => {
    if (e.target === elements.setupModal) {
      closeSetupModal();
    }
  });

  // Next Question Button
  elements.nextQuestionBtn.addEventListener('click', handleNextQuestionClick);

  // Quit Quiz Confirmation
  elements.quitQuizBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to exit? Your current quiz progress will not be saved.")) {
      clearInterval(appState.timerInterval);
      navigateToView('subjects');
    }
  });

  // Retake quiz button
  if (elements.retakeQuizBtn) {
    elements.retakeQuizBtn.addEventListener('click', () => {
      if (appState.currentSubjectKey) {
        openSetupModal(appState.currentSubjectKey);
      } else {
        navigateToView('subjects');
      }
    });
  }

  // Clear history button
  if (elements.clearHistoryBtn) {
    elements.clearHistoryBtn.addEventListener('click', clearAllHistory);
  }

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    // Only active during active quiz view
    const isQuizActive = !elements.views.quiz.classList.contains('hidden-view');
    if (!isQuizActive) return;

    // Keys 1, 2, 3, 4
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const opts = elements.optionsList.querySelectorAll('.quiz-option-btn');
      if (opts[idx]) {
        selectOption(idx);
      }
    }

    // Keys a, b, c, d
    if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
      const charMap = { a: 0, b: 1, c: 2, d: 3 };
      const idx = charMap[e.key.toLowerCase()];
      const opts = elements.optionsList.querySelectorAll('.quiz-option-btn');
      if (opts[idx]) {
        selectOption(idx);
      }
    }

    // Enter key to advance if an option is selected
    if (e.key === 'Enter') {
      if (!elements.nextQuestionBtn.disabled) {
        handleNextQuestionClick();
      }
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (elements.views[hash] && elements.views[hash].classList.contains('hidden-view')) {
      navigateToView(hash);
    }
  });
}

// ==========================================
// 12. HELPER UTILITIES
// ==========================================
// Fisher-Yates array shuffling
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Format seconds into "1m 24s" or "45s"
function formatDuration(totalSeconds) {
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}m ${secs}s`;
}

// Sanitize HTML to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
