// Generates an original, royalty-free meditation loop for Boss Battle Islands.
// Run from the repository root with: node tools/generate-study-music.js
const fs = require('fs');
const path = require('path');

const sampleRate = 22050;
const durationSeconds = 64;
const sampleCount = sampleRate * durationSeconds;
const outputPath = path.resolve(__dirname, '../assets/audio/study_meditation_bgm.wav');

// Eight gentle chords, each lasting eight seconds. The final chord blends back
// into the first so the browser can loop the file without an obvious seam.
const chords = [
  [130.81, 164.81, 196.00, 246.94], // Cmaj7
  [110.00, 130.81, 164.81, 196.00], // Am7
  [87.31, 110.00, 130.81, 164.81],  // Fmaj7
  [98.00, 146.83, 196.00, 220.00],  // Gsus2
  [130.81, 164.81, 196.00, 246.94],
  [110.00, 130.81, 164.81, 220.00],
  [87.31, 130.81, 164.81, 196.00],
  [98.00, 146.83, 196.00, 246.94]
];
const melody = [
  261.63, 329.63, 392.00, 493.88,
  440.00, 329.63, 261.63, 196.00,
  261.63, 392.00, 329.63, 493.88,
  440.00, 392.00, 293.66, 246.94
];

function smoothstep(value) {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
}

function chordTone(frequencies, time) {
  let value = 0;
  frequencies.forEach((frequency, index) => {
    const phase = index * 0.73;
    value += Math.sin(2 * Math.PI * frequency * time + phase) * 0.12;
    value += Math.sin(2 * Math.PI * frequency * 1.003 * time + phase) * 0.055;
  });
  return value;
}

const dataSize = sampleCount * 2;
const wav = Buffer.allocUnsafe(44 + dataSize);
wav.write('RIFF', 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write('WAVE', 8);
wav.write('fmt ', 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);       // PCM
wav.writeUInt16LE(1, 22);       // mono
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(dataSize, 40);

let noiseSeed = 24681357;
let softNoise = 0;
for (let i = 0; i < sampleCount; i++) {
  const time = i / sampleRate;
  const chordPosition = time / 8;
  const chordIndex = Math.floor(chordPosition) % chords.length;
  const nextChordIndex = (chordIndex + 1) % chords.length;
  const withinChord = time % 8;
  const blend = smoothstep((withinChord - 6) / 2);

  const currentPad = chordTone(chords[chordIndex], time);
  const nextPad = chordTone(chords[nextChordIndex], time);
  const breathing = 0.86 + 0.14 * Math.sin(2 * Math.PI * time / 8 - Math.PI / 2);
  let sample = (currentPad * (1 - blend) + nextPad * blend) * breathing;

  const beatIndex = Math.floor(time / 4) % melody.length;
  const bellAge = time % 4;
  const bellEnvelope = (1 - Math.exp(-bellAge * 30)) * Math.exp(-bellAge * 1.45);
  const bellFrequency = melody[beatIndex];
  const bell = Math.sin(2 * Math.PI * bellFrequency * time)
    + 0.34 * Math.sin(2 * Math.PI * bellFrequency * 2.01 * time);
  sample += bell * bellEnvelope * 0.11;

  // A nearly inaudible filtered-noise layer prevents the pad feeling sterile.
  noiseSeed = (1664525 * noiseSeed + 1013904223) >>> 0;
  const whiteNoise = noiseSeed / 0xffffffff * 2 - 1;
  softNoise += (whiteNoise - softNoise) * 0.006;
  sample += softNoise * 0.025;

  // Gentle saturation protects against peaks and keeps playback comfortable.
  sample = Math.tanh(sample * 0.72) * 0.72;
  wav.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, wav);
console.log(`Created ${outputPath} (${durationSeconds}s, ${sampleRate} Hz, mono PCM)`);
