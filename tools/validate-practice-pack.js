const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const questionRoot = path.join(root, 'data/questions');
const practicePath = path.join(questionRoot, 'practice-camp/current-pack.json');
const manifestPath = path.join(questionRoot, 'practice-camp/manifest.json');
const errors = [];

function readJson(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(root, filepath)} could not be read: ${error.message}`);
    return null;
  }
}

function normalise(value) {
  return String(value || '').trim().toLocaleLowerCase('en-GB');
}

const manifest = readJson(manifestPath);
const pack = readJson(practicePath);

if (manifest) {
  if (manifest.levelId !== 'practice-camp') errors.push('Practice manifest levelId must be practice-camp.');
  if (manifest.kind !== 'practice') errors.push('Practice manifest kind must be practice.');
  if (!Array.isArray(manifest.files) || manifest.files.length !== 1 || manifest.files[0] !== 'current-pack.json') {
    errors.push('Practice manifest must reference only current-pack.json.');
  }
}

if (pack) {
  if (pack.levelId !== 'practice-camp') errors.push('Pack levelId must be practice-camp.');
  if (pack.sectionId !== 'P1') errors.push('Pack sectionId must be P1.');
  if (pack.mode !== 'replace') errors.push('Pack mode must be replace.');
  if (!pack.title || !pack.subject) errors.push('Pack title and subject are required.');
  if (!Array.isArray(pack.questions) || pack.questions.length !== 10) {
    errors.push(`Pack must contain exactly 10 questions; found ${pack.questions?.length ?? 0}.`);
  } else {
    const ids = new Set();
    const words = new Set();
    pack.questions.forEach((question, index) => {
      const label = question?.id || `question ${index + 1}`;
      if (!String(question?.id || '').startsWith('PC-')) errors.push(`${label}: ID must start with PC-.`);
      if (ids.has(question.id)) errors.push(`${label}: duplicate ID inside practice pack.`);
      ids.add(question.id);
      if (!question.question || !question.explanation) errors.push(`${label}: question and explanation are required.`);
      if (!question.domain || !question.skillId) errors.push(`${label}: domain and skillId are required.`);
      if (question.verified !== true) errors.push(`${label}: verified must be true after parent review.`);
      if (!Array.isArray(question.options) || question.options.length !== 4) {
        errors.push(`${label}: exactly four options are required.`);
      } else {
        const uniqueOptions = new Set(question.options.map(normalise));
        if (uniqueOptions.size !== 4) errors.push(`${label}: options must be distinct.`);
        if (!question.options.includes(question.answer)) errors.push(`${label}: answer must exactly match an option.`);
      }
      if (question.word) {
        const word = normalise(question.word);
        if (words.has(word)) errors.push(`${label}: duplicate target word "${question.word}" inside practice pack.`);
        words.add(word);
      }
    });

    const existingIds = new Map();
    const existingWords = new Map();
    for (const levelId of ['level-1', 'level-2', 'level-3', 'level-4']) {
      const directory = path.join(questionRoot, levelId);
      for (const filename of fs.readdirSync(directory)) {
        if (!filename.endsWith('.json') || filename === 'manifest.json' || filename === 'validation-report.json') continue;
        const existingPack = readJson(path.join(directory, filename));
        for (const question of existingPack?.questions || []) {
          existingIds.set(question.id, `${levelId}/${filename}`);
          if (question.word) existingWords.set(normalise(question.word), `${question.id} in ${levelId}/${filename}`);
        }
      }
    }
    pack.questions.forEach(question => {
      if (existingIds.has(question.id)) {
        errors.push(`${question.id}: duplicates an ID in ${existingIds.get(question.id)}.`);
      }
      if (question.word && existingWords.has(normalise(question.word))) {
        errors.push(`${question.id}: target word "${question.word}" duplicates ${existingWords.get(normalise(question.word))}.`);
      }
    });
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Practice Camp pack valid: ${pack.questions.length} reviewed questions in “${pack.title}”.`);
}
