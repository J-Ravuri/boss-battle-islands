const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const questionRoot = path.join(root, 'data/questions');
const expectedLevelOneSkills = new Set([
  'eng.vocabulary.context',
  'eng.vocabulary.synonym-antonym',
  'eng.vocabulary.phrase',
  'eng.retrieval.explicit-detail',
  'eng.retrieval.sequence',
  'eng.retrieval.paraphrase',
  'eng.retrieval.evidence-check',
  'eng.inference.cause-purpose',
  'eng.inference.setting-consequence',
  'eng.character.feelings-motives',
  'eng.character.traits-relationships',
  'eng.summary.main-idea',
  'eng.summary.concise-summary',
  'eng.summary.text-purpose',
  'eng.argument.claim-reason',
  'eng.argument.evidence-quality',
  'eng.argument.fact-opinion',
  'eng.argument.counterargument',
  'math.word-problems.multistep',
  'math.money.decimals',
  'math.data.read-compare',
  'math.fractions.equivalence-comparison',
  'math.fractions.calculation',
  'math.fractions.quantity',
  'math.probability.basic',
  'math.percentages.amount',
  'math.percentages.change',
  'math.percentages.reverse-convert',
  'math.time.elapsed',
  'math.time.timetables',
  'math.time.calendar',
  'math.measurement.perimeter-area',
  'math.measurement.volume',
  'math.measurement.units-capacity',
  'math.ratio.scale',
  'math.sequences.patterns',
  'math.multiplication-division',
  'math.statistics.interpretation'
]);

function questionFiles(levelId) {
  const directory = path.join(questionRoot, levelId);
  return fs.readdirSync(directory)
    .filter(filename => filename.endsWith('.json') && filename !== 'manifest.json' && filename !== 'validation-report.json')
    .map(filename => path.join(directory, filename));
}

function readQuestions(levelId) {
  return questionFiles(levelId).flatMap(filepath => {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return Array.isArray(data.questions) ? data.questions : [];
  });
}

const levelOne = readQuestions('level-1');
const levelTwo = readQuestions('level-2');
const levelThree = readQuestions('level-3');
const allQuestions = [...levelOne, ...levelTwo, ...levelThree];
const errors = [];

if (levelOne.length !== 120) errors.push(`Expected 120 Level 1 questions, found ${levelOne.length}.`);
if (levelTwo.length !== 100) errors.push(`Expected 100 Level 2 questions, found ${levelTwo.length}.`);
if (levelThree.length !== 100) errors.push(`Expected 100 Level 3 questions, found ${levelThree.length}.`);

for (const question of levelOne) {
  const expectedDomain = question.id.startsWith('E') ? 'english' : 'mathematics';
  if (question.domain !== expectedDomain) {
    errors.push(`${question.id}: expected domain ${expectedDomain}, found ${question.domain}.`);
  }
  if (!expectedLevelOneSkills.has(question.skillId)) {
    errors.push(`${question.id}: missing or unknown skillId ${question.skillId}.`);
  }
}

for (const question of allQuestions) {
  if (!Array.isArray(question.options) || !question.options.includes(question.answer)) {
    errors.push(`${question.id}: answer is not present in options.`);
  }
}

const retrieval = levelOne.filter(question => question.id.startsWith('E2-'));
for (const question of retrieval) {
  if (!question.explanation.startsWith('Correct:') || !question.explanation.includes('Transfer:')) {
    errors.push(`${question.id}: retrieval explanation does not use the approved teaching template.`);
  }
}

const upgradedSpelling = [...levelTwo, ...levelThree]
  .filter(question => question.explanation.startsWith('Correct:'));
for (const question of upgradedSpelling) {
  if (!question.explanation.includes('Transfer:')) {
    errors.push(`${question.id}: upgraded spelling explanation is missing a transfer cue.`);
  }
}
if (upgradedSpelling.length < 40) {
  errors.push(`Expected at least 40 upgraded spelling explanations, found ${upgradedSpelling.length}.`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Phase 1 learning content valid: ${allQuestions.length} questions, ` +
    `${levelOne.length} Level 1 tags, ${retrieval.length} retrieval explanations, ` +
    `${upgradedSpelling.length} spelling explanations upgraded.`
  );
}
