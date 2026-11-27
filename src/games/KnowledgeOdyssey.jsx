import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  COMPREHENSIVE_DICTIONARY_CATEGORIES,
  COMPREHENSIVE_DICTIONARY_ENTRIES,
  createNumberSearchEntry,
} from './english-indonesian-dictionary.js';
import {
  Compass, BookOpen, Trophy, Settings, Volume2, VolumeX, Sparkles,
  Swords, Puzzle, Scroll, Map as MapIcon, User, Play, RotateCcw,
  CheckCircle2, XCircle, Lightbulb, Star, Award, Shield, Flame,
  ChevronRight, ChevronLeft, Sliders, Eye, Globe, Cpu, Atom,
  Calculator, Landmark, Languages, HelpCircle, Lock, Unlock,
  Save, Trash2, ArrowUp, Zap, Heart, Crown, Wand2, RefreshCw,
  Search, Bookmark, BookmarkCheck, Volume1, Layers, GraduationCap,
  X, Filter, BookMarked, Brain
} from 'lucide-react';

// ============================================================================
// 1. UI TRANSLATION DICTIONARY (INDONESIAN DEFAULT + ENGLISH SUPPORT)
// ============================================================================
const UI_TEXT = {
  id: {
    title: 'KNOWLEDGE ODYSSEY',
    startAdventure: 'Mulai Petualangan',
    continueOdyssey: 'Lanjutkan Petualangan',
    customTraining: 'Latihan Adaptif',
    worldMap: 'Peta Dunia Pengetahuan',
    knowledgeLibrary: 'Kamus & Pustaka Ilmu',
    heroProfile: 'Profil & Pencapaian',
    settings: 'Pengaturan',
    recommended: 'Rekomendasi Belajar Adaptif',
    mastery: 'Penguasaan',
    enterZone: 'Jelajahi Wilayah',
    storyMission: 'Misi Cerita',
    puzzleChallenge: 'Teka-Teki Kuno',
    quizBattle: 'Lawan Penjaga',
    controlsDesktop: 'Gunakan A/D atau Panah untuk berjalan, Spasi melompat, E berinteraksi',
    level: 'Level',
    levelUp: 'NAIK LEVEL!',
    nextQuestion: 'Lanjutkan Perjalanan',
    hint: 'Petunjuk Bijak',
    explanation: 'Penjelasan Edukatif',
    funFact: 'Fakta Menarik',
    learningTip: 'Tips Belajar',
    correctCallouts: ['HEBAT!', 'LUAR BIASA!', 'SEMPURNA!', 'BRILIAN!'],
    wrongCallout: 'Mari kita pelajari koreksinya!',
    checkSolution: 'Periksa Susunan',
    claimReward: 'Klaim Hadiah',
    selectZones: 'Pilih Wilayah Pengetahuan',
    difficulty: 'Tingkat Kesulitan',
    questionCount: 'Jumlah Soal',
    relaxedMode: 'Mode Santai (Tanpa Batas Waktu)',
    challengeMode: 'Mode Tantangan (25 Detik)',
    startSession: 'Mulai Sesi Pertarungan',
    victory: 'Misi Selesai!',
    customizeHero: 'Kustomisasi Karakter',
    coins: 'Koin Ilmu',
    achievements: 'Koleksi Pencapaian',
    progressReport: 'Laporan Penguasaan Materi',
    language: 'Bahasa Antarmuka',
    textSize: 'Ukuran Teks',
    reducedMotion: 'Kurangi Animasi',
    audioSubtitles: 'Teks Subtitle Audio',
    musicVolume: 'Volume Musik Latar',
    sfxVolume: 'Volume Efek Suara',
    saveProgress: 'Simpan Progres',
    resetProgress: 'Hapus Data Simpanan',
    savedSuccess: 'Progres petualangan berhasil disimpan!'
  },
  en: {
    title: 'KNOWLEDGE ODYSSEY',
    startAdventure: 'Start Adventure',
    continueOdyssey: 'Continue Odyssey',
    customTraining: 'Adaptive Training',
    worldMap: 'World Map',
    knowledgeLibrary: 'Knowledge Library',
    heroProfile: 'Hero Profile',
    settings: 'Settings',
    recommended: 'Adaptive Learning Recommendation',
    mastery: 'Mastery',
    enterZone: 'Explore Zone',
    storyMission: 'Story Mission',
    puzzleChallenge: 'Ancient Puzzle',
    quizBattle: 'Quiz Battle',
    controlsDesktop: 'Use A/D or Arrows to walk, Space to jump, E to interact',
    level: 'Level',
    levelUp: 'LEVEL UP!',
    nextQuestion: 'Continue Odyssey',
    hint: 'Sage Hint',
    explanation: 'Educational Explanation',
    funFact: 'Fun Fact',
    learningTip: 'Learning Tip',
    correctCallouts: ['GREAT!', 'AMAZING!', 'PERFECT!', 'BRILLIANT!'],
    wrongCallout: 'Let us review the correction!',
    checkSolution: 'Verify Arrangement',
    claimReward: 'Claim Reward',
    selectZones: 'Select Knowledge Zones',
    difficulty: 'Difficulty Level',
    questionCount: 'Question Count',
    relaxedMode: 'Relaxed Mode (Untimed)',
    challengeMode: 'Challenge Mode (25s Timer)',
    startSession: 'Start Battle Session',
    victory: 'Quest Complete!',
    customizeHero: 'Customize Explorer',
    coins: 'Knowledge Coins',
    achievements: 'Achievement Collection',
    progressReport: 'Mastery Progress Report',
    language: 'Interface Language',
    textSize: 'Text Size',
    reducedMotion: 'Reduced Motion',
    audioSubtitles: 'Audio Subtitles',
    musicVolume: 'Background Music Volume',
    sfxVolume: 'Sound Effects Volume',
    saveProgress: 'Save Progress',
    resetProgress: 'Reset Save Data',
    savedSuccess: 'Adventure progress saved!'
  }
};

function KnowledgeCursor() {
  const cursorRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    let frame = 0;
    let lastTime = performance.now();

    const render = (now) => {
      frame = 0;
      const elapsed = Math.min(Math.max(now - lastTime, 0), 50);
      const smoothing = 1 - Math.pow(0.78, elapsed / (1000 / 60));
      lastTime = now;

      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      if (
        Math.abs(targetRef.current.x - currentRef.current.x) > 0.1 ||
        Math.abs(targetRef.current.y - currentRef.current.y) > 0.1
      ) {
        frame = requestAnimationFrame(render);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const move = (event) => {
      if (event.pointerType === 'touch') return;
      targetRef.current = { x: event.clientX, y: event.clientY };
      cursorRef.current?.classList.add('knowledge-cursor-visible');
      schedule();
    };
    const down = (event) => {
      if (event.pointerType === 'touch') return;
      cursorRef.current?.classList.add('knowledge-cursor-click');
    };
    const up = () => cursorRef.current?.classList.remove('knowledge-cursor-click');
    const over = (event) => {
      const interactive = event.target.closest(
        'a, button, input, textarea, [role="button"], [data-cursor-pointer], canvas'
      );
      cursorRef.current?.classList.toggle('knowledge-cursor-hover', Boolean(interactive));
    };
    const leave = () => cursorRef.current?.classList.remove('knowledge-cursor-visible');

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointerover', over);
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={cursorRef} className="knowledge-cursor" aria-hidden="true">
      <span className="knowledge-cursor-orbit" />
      <span className="knowledge-cursor-core" />
      <span className="knowledge-cursor-spark knowledge-cursor-spark-a" />
      <span className="knowledge-cursor-spark knowledge-cursor-spark-b" />
    </div>
  );
}

// ============================================================================
// 4. INTERACTIVE PUZZLES & STORY MISSIONS PER ZONE (MULTI-VARIANT ROTATING POOL)
// ============================================================================
const ZONE_PUZZLES = {
  language: [
    {
      title: { en: 'Royal Scroll Sentence Builder', id: 'Penyusun Kalimat Gulungan Kerajaan' },
      instruction: {
        en: 'Arrange the words in the correct English grammatical order:',
        id: 'Susun kata-kata berikut menjadi kalimat bahasa Inggris yang benar:'
      },
      items: [
        { id: 'w1', label: 'Curious explorers' },
        { id: 'w2', label: 'always discover' },
        { id: 'w3', label: 'hidden wisdom' },
        { id: 'w4', label: 'in ancient books.' }
      ],
      correctOrder: ['w1', 'w2', 'w3', 'w4'],
      explanation: {
        en: 'Subject ("Curious explorers") + Adverb & Verb ("always discover") + Object ("hidden wisdom") + Prepositional Phrase ("in ancient books.").',
        id: 'Subjek ("Curious explorers") + Kata Keterangan & Kerja ("always discover") + Objek ("hidden wisdom") + Keterangan Tempat ("in ancient books.").'
      }
    },
    {
      title: { en: 'Tense Timeline Alignment', id: 'Penyelarasan Urutan Waktu Tenses' },
      instruction: {
        en: 'Order these English actions from EARLIEST past to FUTURE:',
        id: 'Urutkan peristiwa bahasa Inggris berikut dari MASA LAMPAU hingga MASA DEPAN:'
      },
      items: [
        { id: 'lt1', label: '1. She had studied before the sun rose. (Past Perfect)' },
        { id: 'lt2', label: '2. She discovered a golden map yesterday. (Past Simple)' },
        { id: 'lt3', label: '3. She is exploring the citadel right now. (Present Continuous)' },
        { id: 'lt4', label: '4. She will share her findings tomorrow. (Future Simple)' }
      ],
      correctOrder: ['lt1', 'lt2', 'lt3', 'lt4'],
      explanation: {
        en: 'Past Perfect ("had studied") happens before Past Simple ("discovered"), followed by Present Continuous ("is exploring") and Future ("will share").',
        id: 'Past Perfect ("had studied") terjadi sebelum Past Simple ("discovered"), diikuti Present Continuous ("is exploring") dan Future ("will share").'
      }
    },
    {
      title: { en: 'Academic Vocabulary Intensity Scale', id: 'Skala Intensitas Kosakata Akademik' },
      instruction: {
        en: 'Arrange these English words from MILDEST to STRONGEST intensity:',
        id: 'Urutkan kosakata bahasa Inggris berikut dari makna PALING RINGAN hingga TERKUAT:'
      },
      items: [
        { id: 'lv1', label: '1. Curious (Ingin tahu)' },
        { id: 'lv2', label: '2. Eager (Antusias)' },
        { id: 'lv3', label: '3. Passionate (Sangat bersemangat)' },
        { id: 'lv4', label: '4. Relentless (Tak kenal menyerah)' }
      ],
      correctOrder: ['lv1', 'lv2', 'lv3', 'lv4'],
      explanation: {
        en: 'Recognizing degrees of meaning (nuance) helps writers choose the most precise word in essays and speeches.',
        id: 'Memahami gradasi makna (nuansa kata) membantu penulis memilih kosakata paling presisi dalam esai dan pidato.'
      }
    }
  ],
  math: [
    {
      title: { en: 'Crystal Altar Ascending Order', id: 'Urutan Naik Altar Kristal' },
      instruction: {
        en: 'Order these mathematical values from SMALLEST to LARGEST:',
        id: 'Urutkan nilai matematika berikut dari yang TERKECIL hingga TERBESAR:'
      },
      items: [
        { id: 'm1', label: '1/4 (0.25)' },
        { id: 'm2', label: '40% (0.40)' },
        { id: 'm3', label: '3/5 (0.60)' },
        { id: 'm4', label: '√0.81 (0.90)' }
      ],
      correctOrder: ['m1', 'm2', 'm3', 'm4'],
      explanation: {
        en: 'Converting all numbers to decimals makes comparison clear: 0.25 < 0.40 < 0.60 < 0.90.',
        id: 'Mengubah semua bilangan ke bentuk desimal mempermudah perbandingan: 0,25 < 0,40 < 0,60 < 0,90.'
      }
    },
    {
      title: { en: 'Four Basic Operations Result Order', id: 'Urutan Hasil Empat Operasi Dasar' },
      instruction: {
        en: 'Arrange these arithmetic expressions from SMALLEST result to LARGEST result:',
        id: 'Urutkan operasi hitung dasar berikut dari hasil TERKECIL hingga TERBESAR:'
      },
      items: [
        { id: 'mb1', label: '72 ÷ 9 (= 8)' },
        { id: 'mb2', label: '45 − 28 (= 17)' },
        { id: 'mb3', label: '19 + 15 (= 34)' },
        { id: 'mb4', label: '7 × 8 (= 56)' }
      ],
      correctOrder: ['mb1', 'mb2', 'mb3', 'mb4'],
      explanation: {
        en: 'Evaluating each operation gives: 72 ÷ 9 = 8, 45 − 28 = 17, 19 + 15 = 34, and 7 × 8 = 56.',
        id: 'Menghitung tiap operasi menghasilkan: 72 ÷ 9 = 8, 45 − 28 = 17, 19 + 15 = 34, dan 7 × 8 = 56.'
      }
    },
    {
      title: { en: 'Geometric Polygon Sides Order', id: 'Urutan Jumlah Sisi Bangun Datar' },
      instruction: {
        en: 'Arrange these polygons from FEWEST sides to MOST sides:',
        id: 'Urutkan bangun datar berikut dari jumlah sisi PALING SEDIKIT hingga TERBANYAK:'
      },
      items: [
        { id: 'mg1', label: 'Triangle / Segitiga (3 sisi)' },
        { id: 'mg2', label: 'Pentagon / Segi Lima (5 sisi)' },
        { id: 'mg3', label: 'Hexagon / Segi Enam (6 sisi)' },
        { id: 'mg4', label: 'Octagon / Segi Delapan (8 sisi)' }
      ],
      correctOrder: ['mg1', 'mg2', 'mg3', 'mg4'],
      explanation: {
        en: 'Greek prefixes tell the side count: Tri- (3), Penta- (5), Hexa- (6), and Octa- (8).',
        id: 'Awalan bahasa Yunani menunjukkan jumlah sisinya: Tri- (3), Penta- (5), Heksa- (6), dan Okta- (8).'
      }
    }
  ],
  history: [
    {
      title: { en: 'Chronos Timeline Reconstruction', id: 'Rekonstruksi Lini Masa Kronos' },
      instruction: {
        en: 'Arrange these historical milestones from EARLIEST to MOST RECENT:',
        id: 'Urutkan peristiwa sejarah berikut dari yang PALING AWAL hingga TERBARU:'
      },
      items: [
        { id: 'h1', label: 'Construction of Great Pyramid of Giza (~2560 BCE)' },
        { id: 'h2', label: 'Golden Age of Srivijaya Empire (~800 CE)' },
        { id: 'h3', label: 'Gutenberg Movable-Type Printing Press (1440)' },
        { id: 'h4', label: 'Indonesian Proclamation of Independence (1945)' }
      ],
      correctOrder: ['h1', 'h2', 'h3', 'h4'],
      explanation: {
        en: 'Ancient Egypt (2560 BCE) → Srivijaya (800 CE) → Gutenberg Press (1440) → Indonesian Independence (1945).',
        id: 'Mesir Kuno (2560 SM) → Sriwijaya (800 M) → Mesin Cetak Gutenberg (1440) → Kemerdekaan Indonesia (1945).'
      }
    },
    {
      title: { en: 'Indonesian Archipelago Heritage Timeline', id: 'Lini Masa Sejarah Nusantara & Indonesia' },
      instruction: {
        en: 'Order these Nusantara & Indonesian milestones chronologically from EARLIEST to LATEST:',
        id: 'Urutkan tonggak sejarah Nusantara & Indonesia dari yang PALING AWAL hingga TERBARU:'
      },
      items: [
        { id: 'hn1', label: '1. Prasasti Kedukan Bukit Sriwijaya (682 M)' },
        { id: 'hn2', label: '2. Sumpah Palapa Gajah Mada di Majapahit (1336 M)' },
        { id: 'hn3', label: '3. Kebangkitan Nasional Budi Utomo (1908 M)' },
        { id: 'hn4', label: '4. Ikrar Sumpah Pemuda (28 Oktober 1928)' }
      ],
      correctOrder: ['hn1', 'hn2', 'hn3', 'hn4'],
      explanation: {
        en: 'Srivijaya (682 CE) → Majapahit Sumpah Palapa (1336 CE) → Budi Utomo (1908) → Sumpah Pemuda (1928).',
        id: 'Sriwijaya (682 M) → Sumpah Palapa Majapahit (1336 M) → Budi Utomo (1908) → Sumpah Pemuda (1928).'
      }
    }
  ],
  science: [
    {
      title: { en: 'Orbital Distance Alignment', id: 'Penyelarasan Jarak Orbit Planet' },
      instruction: {
        en: 'Arrange these planets from CLOSEST to the Sun to FARTHEST:',
        id: 'Urutkan planet berikut dari yang TERDEKAT dengan Matahari hingga TERJAUH:'
      },
      items: [
        { id: 's1', label: 'Mercury' },
        { id: 's2', label: 'Earth' },
        { id: 's3', label: 'Jupiter' },
        { id: 's4', label: 'Neptune' }
      ],
      correctOrder: ['s1', 's2', 's3', 's4'],
      explanation: {
        en: 'Mercury is the innermost rocky planet, followed by Earth (3rd), gas giant Jupiter (5th), and ice giant Neptune (8th).',
        id: 'Merkurius adalah planet terdalam, diikuti Bumi (ke-3), raksasa gas Jupiter (ke-5), dan raksasa es Neptunus (ke-8).'
      }
    },
    {
      title: { en: 'Biological Organization Hierarchy', id: 'Hierarki Organisasi Kehidupan Biologi' },
      instruction: {
        en: 'Arrange these biological structures from SMALLEST microscopic level to LARGEST:',
        id: 'Urutkan struktur biologi berikut dari tingkat TERKECIL hingga TERBESAR:'
      },
      items: [
        { id: 'sb1', label: '1. Molecule & DNA (Molekul & DNA)' },
        { id: 'sb2', label: '2. Living Cell (Sel Hidup)' },
        { id: 'sb3', label: '3. Tissue & Organ (Jaringan & Organ)' },
        { id: 'sb4', label: '4. Biosphere Ecosystem (Ekosistem Biosfer)' }
      ],
      correctOrder: ['sb1', 'sb2', 'sb3', 'sb4'],
      explanation: {
        en: 'Life builds upward from molecules (DNA) → cells → tissues & organs → complete organisms and ecosystems.',
        id: 'Kehidupan tersusun bertingkat mulai dari molekul (DNA) → sel → jaringan & organ → organisme dan ekosistem.'
      }
    }
  ],
  geography: [
    {
      title: { en: 'Continental Scale Comparator', id: 'Pembanding Luas Benua' },
      instruction: {
        en: 'Order these continents from LARGEST land area to SMALLEST:',
        id: 'Urutkan benua berikut dari luas daratan TERBESAR hingga TERKECIL:'
      },
      items: [
        { id: 'g1', label: 'Asia (44.6M km²)' },
        { id: 'g2', label: 'Africa (30.4M km²)' },
        { id: 'g3', label: 'North America (24.7M km²)' },
        { id: 'g4', label: 'Australia / Oceania (8.6M km²)' }
      ],
      correctOrder: ['g1', 'g2', 'g3', 'g4'],
      explanation: {
        en: 'Asia is the largest continent by both area and population, followed by Africa, North America, and Oceania.',
        id: 'Asia adalah benua terbesar berdasarkan luas maupun populasi, diikuti Afrika, Amerika Utara, dan Oseania.'
      }
    },
    {
      title: { en: 'Earth Atmosphere Layers Altitude', id: 'Urutan Lapisan Atmosfer Bumi' },
      instruction: {
        en: 'Arrange Earth’s atmospheric layers from LOWEST (closest to ground) to HIGHEST:',
        id: 'Urutkan lapisan atmosfer Bumi berikut dari yang TERENDAH (dekat permukaan) hingga TERTINGGI:'
      },
      items: [
        { id: 'ga1', label: '1. Troposphere (Tempat cuaca & awan terbentuk)' },
        { id: 'ga2', label: '2. Stratosphere (Lapisan ozon pelindung UV)' },
        { id: 'ga3', label: '3. Mesosphere (Tempat meteor terbakar)' },
        { id: 'ga4', label: '4. Thermosphere & Exosphere (Orbit satelit & aurora)' }
      ],
      correctOrder: ['ga1', 'ga2', 'ga3', 'ga4'],
      explanation: {
        en: 'Going upward from Earth’s surface: Troposphere → Stratosphere → Mesosphere → Thermosphere/Exosphere.',
        id: 'Dari permukaan Bumi ke atas: Troposfer → Stratosfer → Mesosfer → Termosfer/Eksosfer.'
      }
    }
  ],
  modern: [
    {
      title: { en: 'Algorithmic Data Pipeline', id: 'Alur Kerja Algoritma AI' },
      instruction: {
        en: 'Arrange the steps of building a Machine Learning system in logical order:',
        id: 'Susun tahapan membangun sistem Machine Learning secara logis:'
      },
      items: [
        { id: 'd1', label: '1. Collect & Clean Quality Data' },
        { id: 'd2', label: '2. Train Model on Patterns' },
        { id: 'd3', label: '3. Test Accuracy on New Data' },
        { id: 'd4', label: '4. Deploy Safely with Monitoring' }
      ],
      correctOrder: ['d1', 'd2', 'd3', 'd4'],
      explanation: {
        en: 'Every reliable AI system follows: Data Preparation → Model Training → Evaluation → Safe Deployment.',
        id: 'Setiap sistem AI yang andal mengikuti alur: Persiapan Data → Pelatihan Model → Evaluasi → Penerapan Aman.'
      }
    },
    {
      title: { en: 'Digital Data Storage Scale', id: 'Urutan Satuan Kapasitas Data Digital' },
      instruction: {
        en: 'Order these digital storage units from SMALLEST to LARGEST:',
        id: 'Urutkan satuan penyimpanan data digital berikut dari TERKECIL hingga TERBESAR:'
      },
      items: [
        { id: 'ds1', label: '1. Bit & Byte (8 bits = 1 karakter)' },
        { id: 'ds2', label: '2. Megabyte / MB (Foto digital)' },
        { id: 'ds3', label: '3. Gigabyte / GB (Aplikasi & video HD)' },
        { id: 'ds4', label: '4. Terabyte / TB (Pusat data & arsip besar)' }
      ],
      correctOrder: ['ds1', 'ds2', 'ds3', 'ds4'],
      explanation: {
        en: 'Each step scales up by roughly 1,024×: Byte → Kilobyte → Megabyte → Gigabyte → Terabyte.',
        id: 'Setiap tingkat meningkat sekitar 1.024 kali lipat: Byte → Kilobyte → Megabyte → Gigabyte → Terabyte.'
      }
    }
  ]
};

const STORY_MISSIONS = {
  language: [
    {
      speaker: { en: 'Lady Lyra the Poet', id: 'Penyair Lyra' },
      intro: {
        en: 'Greetings, Traveler! The Bridge of Eloquence lost its power runes. Verify whether this ancient inscription follows proper English grammar!',
        id: 'Salam, Pengembara! Jembatan Kefasihan kehilangan rune kekuatannya. Periksa apakah prasasti kuno berikut menggunakan tata bahasa Inggris yang benar!'
      },
      prompt: {
        en: 'Statement: "Neither the storm nor the dark clouds prevent the brave voyagers from reaching the lighthouse."',
        id: 'Pernyataan: "Neither the storm nor the dark clouds prevent the brave voyagers from reaching the lighthouse."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! With "neither...nor", the verb agrees with the closest noun ("clouds", which is plural), so "prevent" is grammatically accurate.',
        id: 'BENAR! Pada pola "neither...nor", kata kerja mengikuti kata benda terdekat ("clouds" yang berbentuk jamak), sehingga "prevent" tepat secara tata bahasa.'
      },
      loreCard: {
        id: 'lore-lang-1',
        title: { en: 'The Rule of Proximity in Grammar', id: 'Aturan Kedekatan dalam Tata Bahasa' },
        summary: {
          en: 'When subjects are joined by "either...or" or "neither...nor", the verb agrees with the subject closest to it.',
          id: 'Ketika subjek dihubungkan oleh "either...or" atau "neither...nor", kata kerja menyesuaikan subjek yang paling dekat dengannya.'
        }
      }
    },
    {
      speaker: { en: 'Lady Lyra the Poet', id: 'Penyair Lyra' },
      intro: {
        en: 'A messenger arrived from the Northern Archive with a report in Present Perfect tense. Verify if this sentence is grammatically valid!',
        id: 'Seorang utusan tiba dari Arsip Utara membawa laporan dalam Present Perfect tense. Periksa apakah kalimat ini valid!'
      },
      prompt: {
        en: 'Statement: "The royal scholars have wrote three encyclopedias since last winter."',
        id: 'Pernyataan: "The royal scholars have wrote three encyclopedias since last winter."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! After "have", we must use the Past Participle (Verb 3) "written", not Past Simple "wrote" → "have written".',
        id: 'SALAH! Setelah kata bantu "have", kita wajib memakai Past Participle (Verb 3) "written", bukan Past Simple "wrote" → "have written".'
      },
      loreCard: {
        id: 'lore-lang-2',
        title: { en: 'Irregular Past Participles (Write–Wrote–Written)', id: 'Kata Kerja Tak Beraturan (Write–Wrote–Written)' },
        summary: {
          en: 'Perfect tenses (have/has/had) always require the third form (V3) of irregular verbs.',
          id: 'Bentuk waktu Perfect (have/has/had) selalu memerlukan kata kerja bentuk ketiga (V3).'
        }
      }
    },
    {
      speaker: { en: 'Lady Lyra the Poet', id: 'Penyair Lyra' },
      intro: {
        en: 'Let us inspect a Second Conditional spell scroll! Determine whether this hypothetical sentence is correctly formed.',
        id: 'Mari periksa gulungan mantra Second Conditional! Tentukan apakah kalimat pengandaian ini disusun dengan benar.'
      },
      prompt: {
        en: 'Statement: "If I were an astronomer, I would chart every constellation in the southern sky."',
        id: 'Pernyataan: "If I were an astronomer, I would chart every constellation in the southern sky."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! In formal English subjunctive/Second Conditional, "If I were..." paired with "would + base verb" is completely correct.',
        id: 'BENAR! Dalam bentuk pengandaian formal (Second Conditional), "If I were..." yang dipasangkan dengan "would + kata kerja dasar" adalah tepat.'
      },
      loreCard: {
        id: 'lore-lang-3',
        title: { en: 'Subjunctive "Were" in Hypothetical Clauses', id: 'Penggunaan "Were" dalam Kalimat Pengandaian' },
        summary: {
          en: 'Use "were" for all subjects in imaginary "If" clauses paired with "would".',
          id: 'Gunakan "were" untuk semua subjek dalam klausa khayalan "If" yang berpasangan dengan "would".'
        }
      }
    }
  ],
  math: [
    {
      speaker: { en: 'Archmage Archimedes', id: 'Mahaguru Archimedes' },
      intro: {
        en: 'Welcome to the Crystal Observatory! Help me verify our levitation crystal balance calculation!',
        id: 'Selamat datang di Observatorium Kristal! Bantu aku memverifikasi perhitungan keseimbangan kristal melayang!'
      },
      prompt: {
        en: 'Statement: "If 3 blue crystals balance 12 gold ingots, then 7 blue crystals balance 28 gold ingots."',
        id: 'Pernyataan: "Jika 3 kristal biru seimbang dengan 12 batang emas, maka 7 kristal biru seimbang dengan 28 batang emas."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! 12 ÷ 3 = 4 gold ingots per crystal, and 7 × 4 = 28 gold ingots.',
        id: 'BENAR! 12 ÷ 3 = 4 batang emas per kristal, dan 7 × 4 = 28 batang emas.'
      },
      loreCard: {
        id: 'lore-math-1',
        title: { en: 'Unitary Method & Proportions', id: 'Metode Satuan & Proporsi' },
        summary: {
          en: 'Finding the value of 1 single unit first makes scaling up to any quantity fast and error-free.',
          id: 'Menemukan nilai 1 satuan terlebih dahulu membuat perhitungan kelipatan jumlah berapa pun menjadi cepat dan akurat.'
        }
      }
    },
    {
      speaker: { en: 'Archmage Archimedes', id: 'Mahaguru Archimedes' },
      intro: {
        en: 'An apprentice inscribed an arithmetic law on the marble pillar. Verify whether the equation holds true!',
        id: 'Seorang murid mengukir hukum aritmetika di pilar marmer. Periksa apakah persamaan tersebut bernilai benar!'
      },
      prompt: {
        en: 'Statement: "According to order of operations, 8 + 6 × 5 equals 70."',
        id: 'Pernyataan: "Berdasarkan urutan operasi hitung, hasil dari 8 + 6 × 5 adalah 70."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! Multiplication comes before addition: 6 × 5 = 30 first, then 8 + 30 = 38 (not 70).',
        id: 'SALAH! Perkalian didahulukan sebelum penjumlahan: 6 × 5 = 30 terlebih dahulu, lalu 8 + 30 = 38 (bukan 70).'
      },
      loreCard: {
        id: 'lore-math-2',
        title: { en: 'Order of Operations (PEMDAS / KABATAKU)', id: 'Urutan Operasi Hitung (KABATAKU)' },
        summary: {
          en: 'Always evaluate Parentheses and Exponents first, followed by Multiplication/Division, then Addition/Subtraction.',
          id: 'Selalu kerjakan Tanda Kurung & Pangkat terlebih dahulu, lalu Kali/Bagi, kemudian Tambah/Kurang.'
        }
      }
    },
    {
      speaker: { en: 'Archmage Archimedes', id: 'Mahaguru Archimedes' },
      intro: {
        en: 'Let us inspect the blueprint of a right-angled triangular bridge across the canyon!',
        id: 'Mari periksa cetak biru jembatan segitiga siku-siku yang melintasi ngarai!'
      },
      prompt: {
        en: 'Statement: "A right triangle with legs of 5 meters and 12 meters has a hypotenuse of 13 meters."',
        id: 'Pernyataan: "Segitiga siku-siku dengan sisi tegak 5 meter dan 12 meter memiliki sisi miring sepanjang 13 meter."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! 5² + 12² = 25 + 144 = 169, and √169 = 13 meters.',
        id: 'BENAR! 5² + 12² = 25 + 144 = 169, dan √169 = 13 meter.'
      },
      loreCard: {
        id: 'lore-math-3',
        title: { en: 'Pythagorean Triples in Engineering', id: 'Tripel Pythagoras dalam Rekayasa Bangunan' },
        summary: {
          en: 'Integer triples like (3,4,5) and (5,12,13) guarantee exact 90° right angles in architecture.',
          id: 'Tripel bilangan bulat seperti (3,4,5) dan (5,12,13) menjamin sudut siku-siku 90° yang presisi dalam arsitektur.'
        }
      }
    }
  ],
  history: [
    {
      speaker: { en: 'Chronicler Kartini', id: 'Sejarawan Kartini' },
      intro: {
        en: 'Explorer, we uncovered a spice-trade astrolabe from Nusantara. Verify this historical record!',
        id: 'Penjelajah, kita menemukan astrolab jalur rempah Nusantara. Verifikasi catatan sejarah berikut!'
      },
      prompt: {
        en: 'Statement: "Cloves (cengkih) and nutmeg (pala) originally grew natively in the Maluku Islands of Nusantara."',
        id: 'Pernyataan: "Cengkih dan pala pada awalnya tumbuh sebagai tanaman asli di Kepulauan Maluku, Nusantara."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! Maluku was famously known as the Spice Islands because cloves and nutmeg were endemic there.',
        id: 'BENAR! Maluku dijuluki Kepulauan Rempah karena cengkih dan pala merupakan tanaman endemik asli wilayah tersebut.'
      },
      loreCard: {
        id: 'lore-hist-1',
        title: { en: 'Nusantara & The Global Spice Route', id: 'Nusantara & Jalur Rempah Dunia' },
        summary: {
          en: 'Maluku’s native cloves and nutmeg connected Indonesian ports to Asia, the Middle East, and Europe for centuries.',
          id: 'Cengkih dan pala asli Maluku menghubungkan pelabuhan Nusantara dengan Asia, Timur Tengah, dan Eropa selama berabad-abad.'
        }
      }
    },
    {
      speaker: { en: 'Chronicler Kartini', id: 'Sejarawan Kartini' },
      intro: {
        en: 'Let us examine an ancient bronze tablet from the Mediterranean archives!',
        id: 'Mari periksa prasasti perunggu kuno dari arsip Mediterania!'
      },
      prompt: {
        en: 'Statement: "The Great Pyramid of Giza was built during the Industrial Revolution in the 18th century."',
        id: 'Pernyataan: "Piramida Agung Giza dibangun pada masa Revolusi Industri di abad ke-18."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! The Great Pyramid of Giza was built around 2560 BCE in Ancient Egypt—more than 4,300 years before the Industrial Revolution!',
        id: 'SALAH! Piramida Agung Giza dibangun sekitar tahun 2560 SM di Mesir Kuno—lebih dari 4.300 tahun sebelum Revolusi Industri!'
      },
      loreCard: {
        id: 'lore-hist-2',
        title: { en: 'Chronology of Ancient Wonders', id: 'Kronologi Keajaiban Dunia Kuno' },
        summary: {
          en: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World and the only one still standing.',
          id: 'Piramida Agung Giza adalah yang tertua dari Tujuh Keajaiban Dunia Kuno dan satu-satunya yang masih berdiri hingga kini.'
        }
      }
    }
  ],
  science: [
    {
      speaker: { en: 'Professor Nova', id: 'Profesor Nova' },
      intro: {
        en: 'Our bio-dome ecosystem needs stable energy flow! Verify our ecological synthesis report!',
        id: 'Ekosistem bio-dome kita membutuhkan aliran energi yang stabil! Verifikasi laporan sintesis ekologi berikut!'
      },
      prompt: {
        en: 'Statement: "Green plants and ocean phytoplankton act as Producers (Autotrophs) by converting sunlight into chemical energy."',
        id: 'Pernyataan: "Tumbuhan hijau dan fitoplankton laut berperan sebagai Produsen (Autotrof) dengan mengubah cahaya matahari menjadi energi kimia."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! Producers synthesize glucose via photosynthesis and form the base of nearly every food web on Earth.',
        id: 'BENAR! Produsen menyintesis glukosa melalui fotosintesis dan menjadi dasar hampir seluruh jaring makanan di Bumi.'
      },
      loreCard: {
        id: 'lore-sci-1',
        title: { en: 'Ecological Energy Pyramids', id: 'Piramida Energi Ekologi' },
        summary: {
          en: 'Only about 10% of energy transfers from one trophic level to the next, making producers vital for life.',
          id: 'Hanya sekitar 10% energi yang berpindah dari satu tingkat trofik ke tingkat berikutnya, sehingga produsen sangat vital.'
        }
      }
    },
    {
      speaker: { en: 'Professor Nova', id: 'Profesor Nova' },
      intro: {
        en: 'Our deep-space telemetry dish just received an astronomy note. Check whether this claim is scientifically accurate!',
        id: 'Antena telemetri luar angkasa kita baru saja menerima catatan astronomi. Periksa apakah pernyataan ini akurat secara ilmiah!'
      },
      prompt: {
        en: 'Statement: "A Light-Year (Tahun Cahaya) is a unit of TIME equal to 365 days on Jupiter."',
        id: 'Pernyataan: "Tahun Cahaya (Light-Year) adalah satuan WAKTU yang sama dengan 365 hari di planet Jupiter."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! A Light-Year is a unit of DISTANCE—the ~9.46 trillion kilometers that light travels through space in one Earth year.',
        id: 'SALAH! Tahun Cahaya adalah satuan JARAK—sekitar 9,46 triliun kilometer yang ditempuh cahaya di ruang hampa dalam satu tahun Bumi.'
      },
      loreCard: {
        id: 'lore-sci-2',
        title: { en: 'Measuring Cosmic Distances', id: 'Mengukur Jarak Kosmik Antarbintang' },
        summary: {
          en: 'Light travels at ~300,000 km per second, covering 9.46 trillion km in a single year.',
          id: 'Cahaya merambat sekitar 300.000 km per detik, menempuh 9,46 triliun km dalam satu tahun.'
        }
      }
    }
  ],
  geography: [
    {
      speaker: { en: 'Navigator Marco', id: 'Navigator Marco' },
      intro: {
        en: 'Ahoy! Our expedition ship is crossing the Equator. Verify our navigation logbook entry!',
        id: 'Ahoy! Kapal ekspedisi kita sedang melintasi Garis Khatulistiwa. Verifikasi catatan buku navigasi berikut!'
      },
      prompt: {
        en: 'Statement: "The Equator sits at 0° Latitude and passes directly through Pontianak in West Kalimantan, Indonesia."',
        id: 'Pernyataan: "Garis Khatulistiwa berada pada 0° Lintang dan melintasi langsung kota Pontianak di Kalimantan Barat, Indonesia."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! Pontianak lies right on the 0° Equator line and features the famous Tugu Khatulistiwa monument.',
        id: 'BENAR! Kota Pontianak terletak tepat pada garis 0° Khatulistiwa dan memiliki monumen ikonik Tugu Khatulistiwa.'
      },
      loreCard: {
        id: 'lore-geo-1',
        title: { en: 'The Equator & Tropical Biodiversity', id: 'Khatulistiwa & Keanekaragaman Hayati Tropis' },
        summary: {
          en: 'Regions along 0° latitude receive consistent year-round sunlight, fostering lush tropical rainforests.',
          id: 'Wilayah di sepanjang 0° lintang menerima sinar matahari sepanjang tahun sehingga menumbuhkan hutan hujan tropis yang kaya.'
        }
      }
    },
    {
      speaker: { en: 'Navigator Marco', id: 'Navigator Marco' },
      intro: {
        en: 'Let us inspect an old cartographer’s comparison of Earth’s oceans!',
        id: 'Mari periksa perbandingan samudra Bumi dari catatan kartografer lama!'
      },
      prompt: {
        en: 'Statement: "The Arctic Ocean is the largest and deepest ocean on Earth."',
        id: 'Pernyataan: "Samudra Arktik adalah samudra terluas dan terdalam di planet Bumi."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! The Arctic Ocean is the smallest and shallowest ocean; the Pacific Ocean is the largest and deepest.',
        id: 'SALAH! Samudra Arktik adalah samudra terkecil dan terdangkal; Samudra Pasifik adalah yang terluas dan terdalam.'
      },
      loreCard: {
        id: 'lore-geo-2',
        title: { en: 'Earth’s Five Major Oceans', id: 'Lima Samudra Utama di Bumi' },
        summary: {
          en: 'From largest to smallest: Pacific, Atlantic, Indian, Southern, and Arctic Oceans.',
          id: 'Dari terluas ke terkecil: Samudra Pasifik, Atlantik, Hindia, Selatan, dan Arktik.'
        }
      }
    }
  ],
  modern: [
    {
      speaker: { en: 'Architect Ada', id: 'Arsitek Ada' },
      intro: {
        en: 'Welcome to the Quantum Plaza! Before launching our autonomous drone, verify our core computing protocol!',
        id: 'Selamat datang di Plaza Kuantum! Sebelum meluncurkan drone otonom, verifikasi protokol komputasi inti kita!'
      },
      prompt: {
        en: 'Statement: "Digital computers encode all numbers, text, and images using binary digits (bits) of 0 and 1."',
        id: 'Pernyataan: "Komputer digital mengkodekan seluruh angka, teks, dan gambar menggunakan digit biner (bit) 0 dan 1."'
      },
      isStatementTrue: true,
      explanation: {
        en: 'TRUE! 0 (off) and 1 (on) form bits—8 bits combine to create 1 byte of digital information.',
        id: 'BENAR! 0 (mati) dan 1 (nyala) membentuk bit—8 bit bergabung membentuk 1 byte informasi digital.'
      },
      loreCard: {
        id: 'lore-mod-1',
        title: { en: 'Bits, Bytes & Binary Logic', id: 'Bit, Byte & Logika Biner' },
        summary: {
          en: 'Every photo, song, and game is ultimately encoded as sequences of 0s and 1s inside microchips.',
          id: 'Setiap foto, lagu, dan game pada akhirnya dikodekan sebagai rangkaian angka 0 dan 1 di dalam mikrochip.'
        }
      }
    },
    {
      speaker: { en: 'Architect Ada', id: 'Arsitek Ada' },
      intro: {
        en: 'A security alert appeared on the network console! Verify this cybersecurity rule immediately!',
        id: 'Peringatan keamanan muncul di konsol jaringan! Verifikasi aturan keamanan siber ini segera!'
      },
      prompt: {
        en: 'Statement: "Sharing your password and OTP code via urgent chat links is safe as long as the message claims you won a prize."',
        id: 'Pernyataan: "Membagikan kata sandi dan kode OTP melalui tautan pesan mendesak adalah aman selama pesan tersebut menyatakan kamu memenangkan hadiah."'
      },
      isStatementTrue: false,
      explanation: {
        en: 'FALSE! Never share passwords or OTP codes—urgent prize claims are classic phishing scams designed to steal accounts.',
        id: 'SALAH! Jangan pernah membagikan kata sandi atau kode OTP—klaim hadiah mendesak adalah penipuan phishing klasik untuk mencuri akun.'
      },
      loreCard: {
        id: 'lore-mod-2',
        title: { en: 'Phishing Defense & Two-Factor Authentication', id: 'Pertahanan Phishing & Autentikasi Dua Faktor' },
        summary: {
          en: 'Legitimate organizations never ask for passwords or one-time codes through chat or email.',
          id: 'Lembaga resmi tidak pernah meminta kata sandi atau kode OTP melalui pesan singkat atau email.'
        }
      }
    }
  ]
};

// ============================================================================
// 2. SIX KNOWLEDGE ZONES CONFIGURATION & VISUAL THEMES
// ============================================================================
const ZONES = [
  {
    id: 'language',
    name: { en: 'Language Kingdom', id: 'Kerajaan Bahasa' },
    tagline: { en: 'Citadel of Words, Grammar & Storytelling', id: 'Benteng Kosakata, Tata Bahasa & Cerita' },
    color: '#ec4899',
    accent: '#fbcfe8',
    skyTop: '#fce7f3',
    skyBottom: '#fbcfe8',
    hillFar: '#f472b6',
    hillNear: '#db2777',
    ground: '#831843',
    musicFreqs: [261.63, 329.63, 392.00, 493.88], // Cmaj7
    guardianName: { en: 'Lexicon Owl', id: 'Burung Hantu Leksikon' },
    sageName: { en: 'Lady Lyra the Poet', id: 'Penyair Lyra' },
    topics: ['Vocabulary', 'Grammar', 'Tenses', 'Sentence Structure', 'Reading'],
    unlockLevel: 1
  },
  {
    id: 'math',
    name: { en: 'Mathematics World', id: 'Dunia Matematika' },
    tagline: { en: 'Crystal Peaks of Numbers, Logic & Geometry', id: 'Puncak Kristal Angka, Logika & Geometri' },
    color: '#3b82f6',
    accent: '#bfdbfe',
    skyTop: '#dbeafe',
    skyBottom: '#93c5fd',
    hillFar: '#60a5fa',
    hillNear: '#2563eb',
    ground: '#1e3a8a',
    musicFreqs: [293.66, 369.99, 440.00, 554.37], // Dmaj7
    guardianName: { en: 'Geo-Golem Cube', id: 'Golem Kubus Geo' },
    sageName: { en: 'Archmage Archimedes', id: 'Mahaguru Archimedes' },
    topics: ['Arithmetic', 'Fractions', 'Algebra', 'Geometry', 'Probability'],
    unlockLevel: 1
  },
  {
    id: 'history',
    name: { en: 'History Civilization', id: 'Peradaban Sejarah' },
    tagline: { en: 'Golden Sands of Empires, Nusantara & Discoveries', id: 'Pasir Emas Kerajaan, Nusantara & Penemuan' },
    color: '#f59e0b',
    accent: '#fde68a',
    skyTop: '#fef3c7',
    skyBottom: '#fcd34d',
    hillFar: '#f59e0b',
    hillNear: '#d97706',
    ground: '#78350f',
    musicFreqs: [220.00, 261.63, 329.63, 392.00], // Am7
    guardianName: { en: 'Chronos Sphinx', id: 'Sphinx Kronos' },
    sageName: { en: 'Chronicler Kartini', id: 'Sejarawan Kartini' },
    topics: ['Ancient Civilizations', 'Indonesian History', 'Asian History', 'Industrial Revolution', 'Discoveries'],
    unlockLevel: 1
  },
  {
    id: 'science',
    name: { en: 'Science Universe', id: 'Semesta Sains' },
    tagline: { en: 'Nebula Gardens of Biology, Physics & Cosmos', id: 'Taman Nebula Biologi, Fisika & Tata Surya' },
    color: '#10b981',
    accent: '#a7f3d0',
    skyTop: '#d1fae5',
    skyBottom: '#6ee7b7',
    hillFar: '#34d399',
    hillNear: '#059669',
    ground: '#064e3b',
    musicFreqs: [349.23, 440.00, 523.25, 659.25], // Fmaj7
    guardianName: { en: 'Atomi Slime', id: 'Slime Atomi' },
    sageName: { en: 'Professor Nova', id: 'Profesor Nova' },
    topics: ['Biology', 'Physics', 'Chemistry', 'Human Body', 'Solar System'],
    unlockLevel: 1
  },
  {
    id: 'geography',
    name: { en: 'Geography Planet', id: 'Planet Geografi' },
    tagline: { en: 'Emerald Archipelago of Continents, Oceans & Cultures', id: 'Nusantara Zamrud Benua, Samudra & Budaya' },
    color: '#06b6d4',
    accent: '#a5f3fc',
    skyTop: '#cffafe',
    skyBottom: '#67e8f9',
    hillFar: '#22d3ee',
    hillNear: '#0891b2',
    ground: '#164e63',
    musicFreqs: [392.00, 493.88, 587.33, 739.99], // Gmaj7
    guardianName: { en: 'Terra Turtle', id: 'Kura-Kura Terra' },
    sageName: { en: 'Navigator Marco', id: 'Navigator Marco' },
    topics: ['Continents & Oceans', 'Capitals', 'Climate', 'Mountains & Rivers', 'Natural Resources'],
    unlockLevel: 2
  },
  {
    id: 'modern',
    name: { en: 'Modern Knowledge', id: 'Pengetahuan Modern' },
    tagline: { en: 'Neon Horizon of AI, Computing & Financial Wisdom', id: 'Cakrawala Neon AI, Komputer & Literasi Finansial' },
    color: '#8b5cf6',
    accent: '#ddd6fe',
    skyTop: '#ede9fe',
    skyBottom: '#c4b5fd',
    hillFar: '#a78bfa',
    hillNear: '#7c3aed',
    ground: '#4c1d95',
    musicFreqs: [329.63, 392.00, 493.88, 587.33], // Em7
    guardianName: { en: 'Byte-Bot Spark', id: 'Robot Byte-Spark' },
    sageName: { en: 'Architect Ada', id: 'Arsitek Ada' },
    topics: ['Artificial Intelligence', 'Computing', 'Digital Literacy', 'Financial Literacy', 'Environment'],
    unlockLevel: 2
  }
];

const DIFFICULTIES = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

// ============================================================================
// 2B. COMPREHENSIVE MULTIDISCIPLINARY DICTIONARY & ENCYCLOPEDIA (72+ ENTRIES)
// ============================================================================
const DICTIONARY_DISCIPLINES = [
  { id: 'all', label: 'Semua Ilmu', color: '#fbbf24' },
  { id: 'english_dict', label: 'Kamus Bahasa Inggris', color: '#f43f5e' },
  { id: 'language', label: 'Bahasa & Linguistik', color: '#ec4899' },
  { id: 'math', label: 'Matematika & Logika', color: '#3b82f6' },
  { id: 'history', label: 'Sejarah & Peradaban', color: '#f59e0b' },
  { id: 'science', label: 'Sains & Antariksa', color: '#10b981' },
  { id: 'geography', label: 'Geografi & Budaya', color: '#06b6d4' },
  { id: 'modern', label: 'Teknologi & AI', color: '#8b5cf6' },
  { id: 'economics', label: 'Ekonomi & Finansial', color: '#f97316' },
  { id: 'philosophy', label: 'Filsafat & Psikologi', color: '#14b8a6' }
];

const KNOWLEDGE_DICTIONARY = [
  // --- KAMUS BAHASA INGGRIS LENGKAP (VOCABULARY, PHRASAL VERBS, IRREGULAR VERBS, IDIOMS) ---
  {
    id: 'dict-en-1',
    term: 'Resilient (Adjective — Kata Sifat)',
    pronunciation: '/rɪˈzɪliənt/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Kosakata Akademik',
    definition: 'Tangguh, ulet, dan mampu pulih dengan cepat dari kesulitan, tekanan, atau kegagalan.',
    deepContext: 'Dalam bahasa Inggris akademik maupun percakapan profesional, kata "resilient" sering digunakan untuk menggambarkan karakter manusia, ekosistem alam, maupun infrastruktur teknologi yang tahan banting.',
    example: 'EN: "Resilient learners view mistakes as stepping stones to mastery." | ID: "Pelajar yang tangguh memandang kesalahan sebagai batu loncatan menuju penguasaan."',
    funFact: 'Bentuk kata bendanya adalah "resilience" (/rɪˈzɪliəns/), yang berasal dari bahasa Latin "resilire" yang berarti "melompat kembali".',
    relatedTerms: ['Perseverance (Noun)', 'Growth Mindset (Pola Pikir Bertumbuh)', 'Adaptable (Adjective)']
  },
  {
    id: 'dict-en-2',
    term: 'Perseverance (Noun — Kata Benda)',
    pronunciation: '/ˌpɜːrsəˈvɪərəns/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Kosakata Akademik',
    definition: 'Ketekunan dan kegigihan untuk terus berusaha mencapai tujuan meskipun menghadapi rintangan atau penundaan.',
    deepContext: 'Kata kerja dasarnya adalah "persevere" (/ˌpɜːrsəˈvɪər/). Sering dipasangkan dengan preposisi "in" atau "with" dalam kalimat formal.',
    example: 'EN: "Through patience and perseverance, she mastered three foreign languages." | ID: "Melalui kesabaran dan ketekunan, ia menguasai tiga bahasa asing."',
    funFact: 'NASA menamai wahana penjelajah Mars-nya "Perseverance" pada tahun 2020 untuk melambangkan kegigihan eksplorasi ilmu pengetahuan!',
    relatedTerms: ['Resilient (Adjective — Kata Sifat)', 'Diligent (Adjective)', 'Eloquent (Adjective — Kata Sifat)']
  },
  {
    id: 'dict-en-3',
    term: 'Eloquent (Adjective — Kata Sifat)',
    pronunciation: '/ˈɛləkwənt/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Kosakata Akademik',
    definition: 'Fasih, lancar, dan memukau dalam berbicara atau menulis sehingga mampu menyentuh dan meyakinkan pendengar.',
    deepContext: 'Berasal dari akar kata Latin "loqui" (berbicara), yang juga menurunkan kata "dialogue" (dialog) dan "colloquial" (bahasa percakapan).',
    example: 'EN: "The young scientist gave an eloquent speech about clean energy." | ID: "Ilmuwan muda itu menyampaikan pidato yang fasih dan memukau tentang energi bersih."',
    funFact: 'Bentuk kata keterangannya adalah "eloquently" dan kata bendanya adalah "eloquence".',
    relatedTerms: ['Articulate (Adjective / Verb)', 'Pragmatics (Pragmatik)', 'Metaphor (Metafora)']
  },
  {
    id: 'dict-en-4',
    term: 'Break down (Phrasal Verb)',
    pronunciation: '/breɪk daʊn/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Phrasal Verb',
    definition: '(1) Menguraikan konsep rumit menjadi bagian-bagian kecil agar mudah dipahami; (2) Mengalami kerusakan mesin/kendaraan.',
    deepContext: 'Phrasal verb dalam bahasa Inggris menggabungkan kata kerja dasar dengan preposisi/adverbia sehingga melahirkan makna baru yang sangat sering dipakai penutur asli.',
    example: 'EN: "Let us break down this complex math formula step by step." | ID: "Mari kita uraikan rumus matematika yang rumit ini langkah demi langkah."',
    funFact: 'Jika ditulis menyambung menjadi satu kata benda ("breakdown"), artinya berubah menjadi "rincian analisis" atau "kerusakan".',
    relatedTerms: ['Figure out (Phrasal Verb)', 'Look into (Phrasal Verb)', 'Algorithm (Algoritma)']
  },
  {
    id: 'dict-en-5',
    term: 'Figure out (Phrasal Verb)',
    pronunciation: '/ˈfɪɡjər aʊt/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Phrasal Verb',
    definition: 'Menemukan jawaban, memecahkan teka-teki, atau memahami cara kerja sesuatu setelah berpikir cermat.',
    deepContext: 'Merupakan padanan percakapan alami dari kata kerja formal "solve", "determine", atau "comprehend".',
    example: 'EN: "It took twenty minutes to figure out the ancient cipher." | ID: "Butuh waktu dua puluh menit untuk memecahkan sandi kuno tersebut."',
    funFact: 'Objek kata ganti selalu diletakkan di tengah phrasal verb ini: "figure it out" (bukan "figure out it").',
    relatedTerms: ['Break down (Phrasal Verb)', 'Look into (Phrasal Verb)', 'Critical Thinking (Berpikir Kritis)']
  },
  {
    id: 'dict-en-6',
    term: 'Look into (Phrasal Verb)',
    pronunciation: '/lʊk ˈɪntuː/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Phrasal Verb',
    definition: 'Menyelidiki, meneliti, atau memeriksa suatu masalah atau fakta secara lebih mendalam.',
    deepContext: 'Sinonim formalnya adalah "investigate" atau "examine". Sangat berguna dalam konteks akademik maupun layanan pelanggan.',
    example: 'EN: "Astronomers are looking into mysterious radio signals from deep space." | ID: "Para astronom sedang menyelidiki sinyal radio misterius dari luar angkasa."',
    funFact: 'Berbeda dengan "look after" (merawat) dan "look up to" (mengagumi), perubahan satu preposisi mengubah seluruh makna kalimat!',
    relatedTerms: ['Figure out (Phrasal Verb)', 'Scientific Method (Metode Ilmiah)']
  },
  {
    id: 'dict-en-7',
    term: 'Irregular Verbs: Write – Wrote – Written',
    pronunciation: '/raɪt – roʊt – ˈrɪtən/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Irregular Verbs',
    definition: 'Perubahan kata kerja tak beraturan untuk "menulis": Verb 1 (Present: write), Verb 2 (Past Simple: wrote), Verb 3 (Past Participle: written).',
    deepContext: 'Verb 1 dipakai untuk kebiasaan sekarang, Verb 2 untuk kejadian lampau yang sudah selesai, dan Verb 3 dipakai setelah "have/has/had" (Perfect) atau "was/were" (Passive).',
    example: 'EN: "She writes daily (V1). She wrote a novel last year (V2). The book was written in English (V3)." | ID: "Ia menulis setiap hari. Ia menulis novel tahun lalu. Buku itu ditulis dalam bahasa Inggris."',
    funFact: 'Contoh pola serupa: Speak – Spoke – Spoken; Choose – Chose – Chosen; Break – Broke – Broken.',
    relatedTerms: ['Irregular Verbs: Seek – Sought – Sought', 'Present Perfect Tense', 'Syntax (Sintaksis)']
  },
  {
    id: 'dict-en-8',
    term: 'Irregular Verbs: Seek – Sought – Sought',
    pronunciation: '/siːk – sɔːt – sɔːt/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Irregular Verbs',
    definition: 'Perubahan kata kerja tak beraturan untuk "mencari dengan sungguh-sungguh": Verb 1 (seek), Verb 2 (sought), Verb 3 (sought).',
    deepContext: 'Pola bunyi /-ɔːt/ pada Verb 2 dan Verb 3 juga muncul pada pasangan kata kerja klasik lainnya seperti Think–Thought–Thought dan Bring–Brought–Brought.',
    example: 'EN: "Explorers have always sought knowledge beyond the horizon." | ID: "Para penjelajah selalu mencari pengetahuan melampaui cakrawala."',
    funFact: 'Huruf "gh" dalam kata "sought" tidak dilafalkan (silent letters) dalam pelafalan bahasa Inggris modern.',
    relatedTerms: ['Irregular Verbs: Write – Wrote – Written', 'Etymology (Etimologi)']
  },
  {
    id: 'dict-en-9',
    term: 'Inevitable (Adjective — Kata Sifat)',
    pronunciation: '/ɪnˈɛvɪtəbl/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Kosakata TOEFL/IELTS',
    definition: 'Tak terelakkan, pasti terjadi, dan tidak dapat dicegah atau dihindari.',
    deepContext: 'Awalan "in-" bermakna "tidak", sedangkan akar Latin "evitare" bermakna "menghindari".',
    example: 'EN: "Technological change is inevitable in the twenty-first century." | ID: "Perubahan teknologi adalah hal yang tak terelakkan di abad kedua puluh satu."',
    funFact: 'Kata benda dari "inevitable" adalah "inevitability", dan kata keterangannya adalah "inevitably".',
    relatedTerms: ['Ubiquitous (Adjective — Kata Sifat)', 'Resilient (Adjective — Kata Sifat)']
  },
  {
    id: 'dict-en-10',
    term: 'Ubiquitous (Adjective — Kata Sifat)',
    pronunciation: '/juːˈbɪkwɪtəs/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Kosakata TOEFL/IELTS',
    definition: 'Ada di mana-mana secara bersamaan; sangat umum ditemui di berbagai tempat.',
    deepContext: 'Sering digunakan dalam artikel sains dan teknologi untuk menggambarkan perangkat digital, sensor internet, atau fenomena alam.',
    example: 'EN: "Smartphones have become ubiquitous tools for communication and learning." | ID: "Ponsel pintar telah menjadi alat yang ada di mana-mana untuk komunikasi dan belajar."',
    funFact: 'Berasal dari kata Latin "ubique" yang berarti "di mana saja".',
    relatedTerms: ['Inevitable (Adjective — Kata Sifat)', 'Internet of Things (IoT)', 'Cloud Computing (Komputasi Awan)']
  },
  {
    id: 'dict-en-11',
    term: 'A blessing in disguise (Idiom)',
    pronunciation: '/ə ˈblɛsɪŋ ɪn dɪsˈɡaɪz/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Ungkapan Idiomatik',
    definition: 'Sesuatu yang pada awalnya tampak seperti musibah atau kesialan, tetapi ternyata membawa hikmah dan kebaikan di kemudian hari.',
    deepContext: 'Secara harfiah berarti "berkah yang sedang menyamar". Sangat populer dalam percakapan sehari-hari dan penulisan esai reflektif.',
    example: 'EN: "Missing the early train was a blessing in disguise because I met my mentor on the next one." | ID: "Tertinggal kereta pagi ternyata hikmah tersembunyi karena aku bertemu mentorku di kereta berikutnya."',
    funFact: 'Ungkapan ini pertama kali tercatat dalam kumpulan himne sastra Inggris tahun 1746 oleh James Hervey.',
    relatedTerms: ['Idiom', 'Metaphor (Metafora)', 'Stoicism (Stoikisme)']
  },
  {
    id: 'dict-en-12',
    term: 'Articulate (Adjective & Verb)',
    pronunciation: '/ɑːrˈtɪkjʊlət/ (adj) • /ɑːrˈtɪkjʊleɪt/ (verb)',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Kamus Inggris • Heteronym',
    definition: 'Sebagai kata sifat: mampu mengungkapkan gagasan dengan jelas dan terstruktur. Sebagai kata kerja: mengucapkan atau merumuskan ide dengan gamblang.',
    deepContext: 'Kata ini merupakan contoh "heteronym" dalam bahasa Inggris—ejaannya sama persis, tetapi pelafalan akhiran "-ate" berubah bergantung pada kelas katanya!',
    example: 'EN: "An articulate speaker can articulate complex theories simply." | ID: "Pembicara yang jelas mampu merumuskan teori rumit secara sederhana."',
    funFact: 'Dalam anatomi, "articulation" juga berarti persendian tempat dua tulang bertemu dan bergerak.',
    relatedTerms: ['Eloquent (Adjective — Kata Sifat)', 'Syntax (Sintaksis)', 'Morphology (Morfologi)']
  },

  // --- BAHASA & LINGUISTIK (EXISTING PRESERVED) ---
  {
    id: 'dict-lang-1',
    term: 'Etymology (Etimologi)',
    pronunciation: '/ˌɛtɪˈmɒlədʒi/',
    discipline: 'language',
    zone: 'language',
    tag: 'Linguistik Historis',
    definition: 'Cabang ilmu linguistik yang mempelajari asal-usul kata, sejarah perkembangan bentuknya, serta perubahan maknanya dari waktu ke waktu.',
    deepContext: 'Dengan memahami etimologi, pelajar dapat menebak makna ribuan kata baru dalam bahasa Inggris maupun bahasa Indonesia dengan mengenali akar kata Yunani, Latin, Sanskerta, atau Arab.',
    example: 'Kata "Philosophy" berasal dari bahasa Yunani "philos" (cinta) dan "sophia" (kebijaksanaan), yang secara harfiah berarti "cinta akan kebijaksanaan".',
    funFact: 'Kata bahasa Indonesia "jendela" berasal dari bahasa Portugis "janela", sedangkan "kemeja" berasal dari "camisa".',
    relatedTerms: ['Semantics (Semantik)', 'Morphology (Morfologi)', 'Idiom']
  },
  {
    id: 'dict-lang-2',
    term: 'Metaphor (Metafora)',
    pronunciation: '/ˈmɛtəfɔːr/',
    discipline: 'language',
    zone: 'language',
    tag: 'Gaya Bahasa / Retorika',
    definition: 'Majas perbandingan langsung yang menyamakan dua hal berbeda tanpa menggunakan kata penghubung seperti "bagai" atau "seperti".',
    deepContext: 'Metafora membantu penulis dan pembicara menjelaskan konsep abstrak melalui gambaran konkret yang mudah dibayangkan oleh pembaca.',
    example: '"Time is a thief" (Waktu adalah pencuri) atau "Buku adalah jendela dunia".',
    funFact: 'Dalam ilmu kognitif, para ahli menemukan bahwa manusia berpikir menggunakan metafora konseptual setiap hari, misalnya menganggap argumen sebagai "pertempuran".',
    relatedTerms: ['Idiom', 'Etymology (Etimologi)', 'Syntax (Sintaksis)']
  },
  {
    id: 'dict-lang-3',
    term: 'Syntax (Sintaksis)',
    pronunciation: '/ˈsɪntæks/',
    discipline: 'language',
    zone: 'language',
    tag: 'Tata Bahasa',
    definition: 'Aturan dan prinsip yang mengatur susunan kata menjadi frasa, klausa, dan kalimat yang bermakna serta gramatikal.',
    deepContext: 'Bahasa Inggris dan Bahasa Indonesia umumnya menggunakan pola dasar Subjek–Predikat–Objek (S-P-O), namun berbeda pada aturan penempatan kata sifat (adjective).',
    example: 'Dalam bahasa Inggris: "A bright star" (Sifat + Benda), sedangkan dalam bahasa Indonesia: "Bintang terang" (Benda + Sifat).',
    funFact: 'Istilah sintaksis juga dipakai dalam ilmu komputer untuk menyebut aturan penulisan kode pemrograman yang valid.',
    relatedTerms: ['Morphology (Morfologi)', 'Present Perfect Tense', 'Subjunctive Mood']
  },
  {
    id: 'dict-lang-4',
    term: 'Morphology (Morfologi)',
    pronunciation: '/mɔːrˈfɒlədʒi/',
    discipline: 'language',
    zone: 'language',
    tag: 'Struktur Kata',
    definition: 'Studi tentang struktur internal kata dan bagaimana morfem (satuan terkecil bermakna) seperti awalan dan akhiran membentuk kata baru.',
    deepContext: 'Memahami prefiks (awalan seperti un-, re-, pre-) dan sufiks (akhiran seperti -tion, -able, -ly) mempercepat penguasaan kosakata akademik.',
    example: 'Kata "unbelievable" terdiri dari 3 morfem: "un-" (tidak) + "believe" (percaya) + "-able" (dapat).',
    funFact: 'Bahasa Indonesia sangat kaya secara morfologis karena satu kata dasar seperti "ajar" dapat berubah menjadi "belajar", "mengajar", "pelajar", dan "pembelajaran".',
    relatedTerms: ['Etymology (Etimologi)', 'Syntax (Sintaksis)', 'Semantics (Semantik)']
  },
  {
    id: 'dict-lang-5',
    term: 'Semantics (Semantik)',
    pronunciation: '/sɪˈmæntɪks/',
    discipline: 'language',
    zone: 'language',
    tag: 'Makna Bahasa',
    definition: 'Cabang linguistik yang meneliti makna kata, frasa, kalimat, serta hubungan makna seperti sinonim, antonim, dan polisemi.',
    deepContext: 'Semantik membedakan antara makna denotatif (makna kamus yang lugas) dan makna konotatif (nuansa emosional atau budaya yang menyertai kata).',
    example: 'Kata "house" dan "home" memiliki denotasi mirip (tempat tinggal), tetapi "home" memiliki konotasi kehangatan keluarga.',
    funFact: 'Polisemi terjadi ketika satu kata punya banyak makna terkait, misalnya kata "kepala" (kepala manusia, kepala sekolah, kepala surat).',
    relatedTerms: ['Etymology (Etimologi)', 'Pragmatics (Pragmatik)', 'Metaphor (Metafora)']
  },
  {
    id: 'dict-lang-6',
    term: 'Pragmatics (Pragmatik)',
    pronunciation: '/præɡˈmætɪks/',
    discipline: 'language',
    zone: 'language',
    tag: 'Komunikasi Kontekstual',
    definition: 'Kajian tentang bagaimana konteks situasi, nada bicara, dan hubungan sosial memengaruhi maksud sebenarnya dari suatu ujaran.',
    deepContext: 'Sering kali makna literal kalimat berbeda dari maksud penuturnya. Pragmatik membantu pembelajar bahasa memahami kesantunan dan maksud tersirat.',
    example: 'Kalimat "Di sini dingin sekali ya" sering kali bermaksud meminta lawan bicara menutup jendela atau mengecilkan AC.',
    funFact: 'Kesalahpahaman lintas budaya sering terjadi bukan karena salah tata bahasa, melainkan perbedaan aturan pragmatik kesantunan.',
    relatedTerms: ['Semantics (Semantik)', 'Idiom', 'Eloquent (Adjective — Kata Sifat)']
  },
  {
    id: 'dict-lang-7',
    term: 'Present Perfect Tense',
    pronunciation: '/ˈprɛzənt ˈpɜːrfɪkt/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Tenses Bahasa Inggris',
    definition: 'Bentuk waktu kata kerja (has/have + Verb-3) untuk menyatakan kejadian yang dimulai di masa lalu dan masih berlanjut atau berdampak pada masa kini.',
    deepContext: 'Tenses ini menjembatani masa lalu dan masa sekarang, sering dipasangkan dengan penanda waktu seperti "since", "for", "already", dan "yet".',
    example: '"Scientists have discovered thousands of exoplanets." (Para ilmuwan telah menemukan ribuan eksoplanet hingga kini).',
    funFact: 'Dalam bahasa Indonesia tidak ada perubahan bentuk kata kerja berdasarkan waktu; kita cukup menambahkan kata seperti "sudah" atau "sedang".',
    relatedTerms: ['Syntax (Sintaksis)', 'Subjunctive Mood', 'Irregular Verbs: Write – Wrote – Written']
  },
  {
    id: 'dict-lang-8',
    term: 'Idiom',
    pronunciation: '/ˈɪdiəm/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Ungkapan Kiasan',
    definition: 'Gabungan kata yang membentuk makna khusus yang tidak dapat ditebak hanya dari arti harfiah masing-masing kata penyusunnya.',
    deepContext: 'Menguasai idiom membuat pemahaman bacaan sastra, film, dan percakapan penutur asli terasa jauh lebih alami.',
    example: '"Break the ice" berarti mencairkan suasana canggung dalam pertemuan, bukan memecahkan es batu secara fisik.',
    funFact: 'Dalam bahasa Indonesia kita juga memiliki idiom seperti "banting tulang" (bekerja keras) dan "buah bibir" (bahan pembicaraan).',
    relatedTerms: ['Metaphor (Metafora)', 'A blessing in disguise (Idiom)', 'Semantics (Semantik)']
  },
  {
    id: 'dict-lang-9',
    term: 'Subjunctive Mood',
    pronunciation: '/səbˈdʒʌŋktɪv/',
    discipline: 'language',
    subCategory: 'english_dict',
    zone: 'language',
    tag: 'Tata Bahasa Lanjut',
    definition: 'Bentuk kata kerja khusus dalam bahasa Inggris yang digunakan untuk menyatakan pengandaian, harapan, saran mendesak, atau situasi khayalan.',
    deepContext: 'Dalam kalimat pengandaian formal, kata kerja "were" digunakan untuk semua subjek termasuk "I", "he", dan "she".',
    example: '"If I were an astronaut, I would explore Europa." (Seandainya aku astronot, aku akan menjelajahi bulan Europa).',
    funFact: 'Subjunctive juga muncul setelah kata kerja saran seperti "recommend" atau "insist": "The doctor recommended that he rest."',
    relatedTerms: ['Syntax (Sintaksis)', 'Present Perfect Tense']
  },

  // --- MATEMATIKA & LOGIKA (EXPANDED) ---
  {
    id: 'dict-math-basic-1',
    term: 'Addition (Penjumlahan / +)',
    pronunciation: '/əˈdɪʃən/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Dasar • Operasi Hitung',
    definition: 'Operasi aritmetika dasar yang menggabungkan dua bilangan atau lebih menjadi satu jumlah total (sum). Bersifat komutatif (a + b = b + a) dan asosiatif.',
    deepContext: 'Penjumlahan adalah fondasi dari seluruh operasi matematika lainnya. Perkalian pada hakikatnya adalah penjumlahan berulang dari bilangan yang sama.',
    example: '24 + 18 = 42. Dengan sifat komutatif, 18 + 24 juga menghasilkan 42.',
    funFact: 'Tanda tambah (+) pertama kali muncul dalam buku matematika Eropa karya Johannes Widmann pada tahun 1489!',
    relatedTerms: ['Subtraction (Pengurangan / −)', 'Multiplication (Perkalian / ×)', 'Division (Pembagian / ÷)']
  },
  {
    id: 'dict-math-basic-2',
    term: 'Subtraction (Pengurangan / −)',
    pronunciation: '/səbˈtrækʃən/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Dasar • Operasi Hitung',
    definition: 'Operasi aritmetika dasar yang mengambil sejumlah nilai dari suatu bilangan untuk menemukan selisihnya (difference). Merupakan kebalikan (invers) dari penjumlahan.',
    deepContext: 'Berbeda dengan penjumlahan, pengurangan tidak bersifat komutatif (a − b tidak sama dengan b − a) dan dapat menghasilkan bilangan negatif jika pengurangnya lebih besar.',
    example: '65 − 27 = 38. Kita dapat memeriksa hasilnya dengan penjumlahan balik: 38 + 27 = 65.',
    funFact: 'Dalam akuntansi dan suhu cuaca, hasil pengurangan di bawah nol melahirkan konsep bilangan negatif yang pertama kali digunakan secara sistematis di Tiongkok Kuno dan India!',
    relatedTerms: ['Addition (Penjumlahan / +)', 'Division (Pembagian / ÷)', 'Algebra (Aljabar)']
  },
  {
    id: 'dict-math-basic-3',
    term: 'Multiplication (Perkalian / ×)',
    pronunciation: '/ˌmʌltɪplɪˈkeɪʃən/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Dasar • Operasi Hitung',
    definition: 'Operasi matematika yang menskalakan satu bilangan dengan bilangan lain, atau dapat dipahami sebagai penjumlahan berulang dari kelompok yang sama besar (a × b).',
    deepContext: 'Perkalian memiliki sifat komutatif (a × b = b × a), asosiatif, serta distributif terhadap penjumlahan: a × (b + c) = (a × b) + (a × c).',
    example: '7 × 8 = 56 (sama dengan menjumlahkan angka 8 sebanyak 7 kali: 8 + 8 + 8 + 8 + 8 + 8 + 8).',
    funFact: 'Simbol silang (×) untuk perkalian diperkenalkan oleh matematikawan Inggris William Oughtred pada tahun 1631!',
    relatedTerms: ['Addition (Penjumlahan / +)', 'Division (Pembagian / ÷)', 'Prime Number (Bilangan Prima)']
  },
  {
    id: 'dict-math-basic-4',
    term: 'Division (Pembagian / ÷)',
    pronunciation: '/dɪˈvɪʒən/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Dasar • Operasi Hitung',
    definition: 'Operasi aritmetika yang membagi suatu bilangan (dividen) menjadi beberapa bagian yang sama besar oleh pembagi (divisor), menghasilkan hasil bagi (quotient) dan terkadang sisa (remainder).',
    deepContext: 'Pembagian merupakan kebalikan dari perkalian. Dalam matematika, pembagian dengan angka nol (a ÷ 0) tidak terdefinisi karena tidak ada bilangan yang jika dikalikan 0 menghasilkan a.',
    example: '72 ÷ 9 = 8, karena 8 × 9 = 72. Jika 75 ÷ 9, hasilnya adalah 8 dengan sisa 3.',
    funFact: 'Simbol pembagian (÷) bernama "Obelus", yang awalnya digunakan oleh para cendekiawan kuno untuk menandai bagian teks manuskrip yang perlu diperiksa!',
    relatedTerms: ['Multiplication (Perkalian / ×)', 'Subtraction (Pengurangan / −)', 'Prime Number (Bilangan Prima)']
  },
  {
    id: 'dict-math-1',
    term: 'Prime Number (Bilangan Prima)',
    pronunciation: '/praɪm ˈnʌmbər/',
    discipline: 'math',
    zone: 'math',
    tag: 'Teori Bilangan',
    definition: 'Bilangan asli lebih besar dari 1 yang hanya memiliki tepat dua pembagi positif, yaitu 1 dan bilangan itu sendiri.',
    deepContext: 'Bilangan prima adalah "atom penyusun" seluruh bilangan bulat karena setiap bilangan bulat lebih dari 1 dapat difaktorkan menjadi perkalian bilangan prima secara unik.',
    example: '2, 3, 5, 7, 11, 13, 17, 19 adalah deretan bilangan prima awal. Angka 2 adalah satu-satunya bilangan prima genap.',
    funFact: 'Keamanan enkripsi perbankan dan internet modern (RSA) bergantung pada betapa sulitnya memfaktorkan perkalian dua bilangan prima raksasa!',
    relatedTerms: ['Algorithm (Algoritma)', 'Cryptography (Kriptografi)', 'Probability (Probabilitas / Peluang)']
  },
  {
    id: 'dict-math-2',
    term: 'Pythagorean Theorem (Teorema Pythagoras)',
    pronunciation: '/paɪˌθæɡəˈriːən/',
    discipline: 'math',
    zone: 'math',
    tag: 'Geometri Euclid',
    definition: 'Dalam segitiga siku-siku, kuadrat panjang sisi miring (hipotenusa) sama dengan jumlah kuadrat panjang kedua sisi tegaknya: a² + b² = c².',
    deepContext: 'Teorema ini menjadi fondasi perhitungan jarak pada koordinat Kartesius, navigasi satelit GPS, arsitektur bangunan, hingga grafika game 3D.',
    example: 'Jika sisi tegak segitiga siku-siku adalah 3 cm dan 4 cm, maka sisi miringnya adalah √(3² + 4²) = √25 = 5 cm.',
    funFact: 'Meskipun dinamai menurut filsuf Yunani Pythagoras, tablet tanah liat Babilonia (Plimpton 322) menunjukkan aturan ini sudah dikenal 1.000 tahun sebelumnya!',
    relatedTerms: ['Golden Ratio (Rasio Emas φ)', 'Logarithm (Logaritma)', 'Calculus (Kalkulus)']
  },
  {
    id: 'dict-math-3',
    term: 'Algebra (Aljabar)',
    pronunciation: '/ˈældʒɪbrə/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Simbolik',
    definition: 'Cabang matematika yang menggunakan huruf atau simbol (variabel) untuk mewakili bilangan yang belum diketahui dan merumuskan hubungan antarbesaran.',
    deepContext: 'Aljabar memungkinkan kita menyelesaikan masalah umum secara sistematis, mulai dari menghitung kecepatan roket hingga merancang algoritma komputer.',
    example: 'Jika 2x + 6 = 14, maka 2x = 8, sehingga nilai variabel x = 4.',
    funFact: 'Kata "Aljabar" berasal dari judul kitab "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala" karya Muhammad ibn Musa al-Khwarizmi di Baghdad abad ke-9.',
    relatedTerms: ['Algorithm (Algoritma)', 'Logarithm (Logaritma)', 'Matrix & Vector (Matriks & Vektor)']
  },
  {
    id: 'dict-math-4',
    term: 'Probability (Probabilitas / Peluang)',
    pronunciation: '/ˌprɒbəˈbɪləti/',
    discipline: 'math',
    zone: 'math',
    tag: 'Statistika & Peluang',
    definition: 'Ukuran matematis tentang seberapa besar kemungkinan suatu peristiwa akan terjadi, dinyatakan dengan angka antara 0 (mustahil) hingga 1 (pasti).',
    deepContext: 'Teori peluang digunakan dalam prakiraan cuaca, asuransi, analisis risiko ekonomi, genetika, serta kecerdasan buatan (Machine Learning).',
    example: 'Peluang munculnya angka genap pada lemparan satu dadu bersisi enam adalah 3/6 = 1/2 atau 50%.',
    funFact: 'Teori peluang modern lahir pada tahun 1654 melalui surat-menyurat antara matematikawan Prancis Blaise Pascal dan Pierre de Fermat.',
    relatedTerms: ['Mean, Median & Mode', 'Machine Learning', 'Bayesian Inference']
  },
  {
    id: 'dict-math-5',
    term: 'Golden Ratio (Rasio Emas φ)',
    pronunciation: '/ˈɡoʊldən ˈreɪʃioʊ/',
    discipline: 'math',
    zone: 'math',
    tag: 'Proporsi & Pola Alam',
    definition: 'Konstanta irasional sekitar 1,61803... (dilambangkan huruf Yunani Phi φ) yang muncul ketika perbandingan dua kuantitas sama dengan perbandingan jumlahnya terhadap kuantitas yang lebih besar.',
    deepContext: 'Rasio emas berhubungan erat dengan deret Fibonacci (1, 1, 2, 3, 5, 8, 13...) dan sering dipakai dalam desain visual serta arsitektur klasik.',
    example: 'Jika sebuah persegi panjang memiliki lebar 10 cm dan panjang 16,18 cm, proporsinya mendekati Rasio Emas.',
    funFact: 'Susunan biji bunga matahari, kelopak mawar, dan spiral galaksi sering mengikuti pola sudut yang berkaitan dengan deret Fibonacci!',
    relatedTerms: ['Pythagorean Theorem (Teorema Pythagoras)', 'Prime Number (Bilangan Prima)']
  },
  {
    id: 'dict-math-6',
    term: 'Logarithm (Logaritma)',
    pronunciation: '/ˈlɒɡərɪðəm/',
    discipline: 'math',
    zone: 'math',
    tag: 'Fungsi Eksponensial',
    definition: 'Operasi matematika yang merupakan kebalikan (invers) dari pemangkatan (eksponen), menjawab pertanyaan: "Pangkat berapa basis harus dinaikkan untuk menghasilkan suatu bilangan?"',
    deepContext: 'Logaritma menyederhanakan rentang angka yang sangat besar menjadi skala yang mudah dibaca manusia.',
    example: 'Karena 10³ = 1.000, maka log₁₀(1.000) = 3.',
    funFact: 'Skala kekuatan gempa Richter, tingkat kebisingan suara (desibel), dan skala keasaman kimia (pH) semuanya menggunakan skala logaritmik!',
    relatedTerms: ['Algebra (Aljabar)', 'Compound Interest (Bunga Majemuk)']
  },
  {
    id: 'dict-math-7',
    term: 'Mean, Median & Mode',
    pronunciation: '/miːn, ˈmiːdiən, moʊd/',
    discipline: 'math',
    zone: 'math',
    tag: 'Statistika Deskriptif',
    definition: 'Tiga ukuran pemusatan data: Mean adalah nilai rata-rata, Median adalah nilai tengah setelah data diurutkan, dan Mode (Modus) adalah nilai yang paling sering muncul.',
    deepContext: 'Memahami ketiganya mencegah kita tertipu oleh data pencilan (outlier). Misalnya, median pendapatan sering lebih akurat menggambarkan kondisi masyarakat daripada rata-rata.',
    example: 'Untuk data [2, 3, 3, 7, 25]: Mean = 8, Median = 3, dan Mode = 3.',
    funFact: 'Jika dalam sebuah ruangan ada 9 pelajar dan 1 miliarder, rata-rata (mean) kekayaan mereka menjadi miliaran, padahal median tetap mencerminkan uang saku pelajar!',
    relatedTerms: ['Probability (Probabilitas / Peluang)', 'Inflation (Inflasi)']
  },
  {
    id: 'dict-math-8',
    term: 'Boolean Logic (Logika Boolean)',
    pronunciation: '/ˈbuːliən ˈlɒdʒɪk/',
    discipline: 'math',
    zone: 'math',
    tag: 'Logika & Komputasi',
    definition: 'Sistem aljabar logika di mana setiap pernyataan hanya memiliki dua nilai kebenaran: BENAR (True / 1) atau SALAH (False / 0), menggunakan operator AND, OR, dan NOT.',
    deepContext: 'Diciptakan oleh George Boole pada tahun 1854, logika ini menjadi jantung sirkuit digital di dalam setiap prosesor komputer dan ponsel pintar.',
    example: 'Operator AND menghasilkan TRUE hanya jika kedua syarat bernilai TRUE (misal: Kata sandi benar AND Kode OTP benar).',
    funFact: 'Setiap kali kamu memakai tanda kutip atau kata "AND" di mesin pencari internet, kamu sedang menerapkan Logika Boolean!',
    relatedTerms: ['Binary System (Sistem Biner)', 'Algorithm (Algoritma)']
  },
  {
    id: 'dict-math-9',
    term: 'Calculus (Kalkulus)',
    pronunciation: '/ˈkælkjʊləs/',
    discipline: 'math',
    zone: 'math',
    tag: 'Matematika Perubahan',
    definition: 'Cabang matematika yang mempelajari perubahan berkelanjutan melalui dua konsep utama: Turunan (Diferensial) untuk laju perubahan sesaat dan Integral untuk akumulasi luas/volume.',
    deepContext: 'Dikembangkan secara terpisah oleh Isaac Newton dan Gottfried Wilhelm Leibniz pada abad ke-17, kalkulus menjadi bahasa utama fisika, teknik, ekonomi, dan pelatihan jaringan saraf AI.',
    example: 'Jika fungsi posisi mobil diketahui, turunannya memberikan kecepatan sesaat, dan turunan keduanya memberikan percepatan.',
    funFact: 'Algoritma Gradient Descent yang melatih model AI modern bekerja dengan mencari titik terendah kurva kesalahan menggunakan turunan kalkulus!',
    relatedTerms: ['Pythagorean Theorem (Teorema Pythagoras)', 'Neural Network (Jaringan Saraf Tiruan)', 'Gravity (Gravitasi)']
  },
  {
    id: 'dict-math-10',
    term: 'Matrix & Vector (Matriks & Vektor)',
    pronunciation: '/ˈmeɪtrɪks & ˈvɛktər/',
    discipline: 'math',
    zone: 'math',
    tag: 'Aljabar Linear',
    definition: 'Vektor adalah besaran yang memiliki nilai dan arah (sering ditulis sebagai daftar koordinat). Matriks adalah susunan bilangan berbentuk baris dan kolom untuk mentransformasi ruang dan data.',
    deepContext: 'Aljabar linear adalah tulang punggung grafika komputer 3D, simulasi fisika game, dan pemrosesan bahasa oleh model AI.',
    example: 'Dalam game 2D/3D, posisi karakter diwakili oleh vektor (x, y, z) dan rotasi kamera dihitung dengan perkalian matriks.',
    funFact: 'Setiap gambar digital di layar ponselmu sebenarnya adalah matriks besar berisi nilai warna piksel merah, hijau, dan biru (RGB)!',
    relatedTerms: ['Algebra (Aljabar)', 'Artificial Intelligence (Kecerdasan Buatan)', 'Calculus (Kalkulus)']
  },

  // --- SEJARAH & PERADABAN (EXPANDED) ---
  {
    id: 'dict-hist-1',
    term: 'Mesopotamia',
    pronunciation: '/ˌmɛsəpəˈteɪmiə/',
    discipline: 'history',
    zone: 'history',
    tag: 'Peradaban Kuno (~3500 SM)',
    definition: 'Wilayah bersejarah di antara Sungai Tigris dan Eufrat (kini Irak) yang dijuluki "Tempat Lahirnya Peradaban" karena melahirkan kota-kota pertama, tulisan paku (Cuneiform), dan hukum tertulis.',
    deepContext: 'Bangsa Sumeria dan Babilonia di Mesopotamia mengembangkan sistem bilangan berbasis 60 yang masih kita gunakan hingga hari ini untuk membagi 1 jam menjadi 60 menit dan lingkaran menjadi 360 derajat.',
    example: 'Kode Hammurabi (sekitar 1754 SM) merupakan salah satu kumpulan hukum tertulis tertua yang dipahat pada prasasti batu.',
    funFact: 'Bangsa Sumeria menemukan roda untuk gerabah dan kereta sekitar 3500 SM, mengubah transportasi manusia selamanya.',
    relatedTerms: ['Srivijaya Empire (Kerajaan Sriwijaya)', 'Silk Road (Jalur Sutra)', 'Renaissance (Renaisans)']
  },
  {
    id: 'dict-hist-2',
    term: 'Srivijaya Empire (Kerajaan Sriwijaya)',
    pronunciation: '/ˌsriːwɪˈdʒaɪə/',
    discipline: 'history',
    zone: 'history',
    tag: 'Sejarah Nusantara (Abad ke-7–11)',
    definition: 'Kemaharajaan maritim besar yang berpusat di Palembang, Sumatra Selatan, yang menguasai jalur perdagangan laut Selat Malaka dan menjadi pusat pembelajaran agama Buddha di Asia.',
    deepContext: 'Armada laut Sriwijaya menjalin hubungan diplomatik dan dagang dengan Kekaisaran Tiongkok, India (Kerajaan Pala), dan Kekhalifahan Abbasiyah.',
    example: 'Prasasti Kedukan Bukit (682 M) menjadi salah satu bukti tertulis tertua mengenai pendirian kekuatan Sriwijaya dalam bahasa Melayu Kuno.',
    funFact: 'Pendeta Tiongkok I-Tsing menyarankan para sarjana yang ingin belajar ke India agar singgah dulu di Sriwijaya selama 1–2 tahun untuk mendalami tata bahasa Sanskerta!',
    relatedTerms: ['Majapahit & Sumpah Palapa', 'Spice Route (Jalur Rempah)', 'Mesopotamia']
  },
  {
    id: 'dict-hist-3',
    term: 'Majapahit & Sumpah Palapa',
    pronunciation: '/ˌmɑːdʒəˈpɑːhɪt/',
    discipline: 'history',
    zone: 'history',
    tag: 'Sejarah Nusantara (1293–1527)',
    definition: 'Kerajaan besar yang berpusat di Trowulan, Jawa Timur, yang mencapai puncak kejayaannya di bawah Raja Hayam Wuruk dan Mahapatih Gajah Mada.',
    deepContext: 'Melalui Sumpah Palapa pada tahun 1336, Gajah Mada bertekad menyatukan wilayah Nusantara, yang kelak menginspirasi konsep kesatuan geografis Indonesia modern.',
    example: 'Kitab Negarakertagama karya Mpu Prapanca mencatat luasnya jaringan pengaruh dan tata pemerintahan Majapahit.',
    funFact: 'Semboyan negara Indonesia "Bhinneka Tunggal Ika" dikutip dari Kakawin Sutasoma karya Mpu Tantular pada masa Kerajaan Majapahit!',
    relatedTerms: ['Srivijaya Empire (Kerajaan Sriwijaya)', 'Spice Route (Jalur Rempah)']
  },
  {
    id: 'dict-hist-4',
    term: 'Silk Road (Jalur Sutra)',
    pronunciation: '/sɪlk roʊd/',
    discipline: 'history',
    zone: 'history',
    tag: 'Perdagangan Dunia Kuno',
    definition: 'Jaringan rute perdagangan darat dan laut yang menghubungkan Asia Timur, Asia Tengah, Timur Tengah, dan Eropa sejak abad ke-2 SM.',
    deepContext: 'Bukan hanya sutra dan keramik yang diperdagangkan, tetapi juga teknologi pembuatan kertas, kompas, astronomi, rempah, serta pertukaran budaya antarbangsa.',
    example: 'Kota-kota oasis seperti Samarkand dan Bukhara tumbuh makmur sebagai titik persinggahan para kafilah dagang.',
    funFact: 'Jalur Sutra darat berpasangan dengan "Jalur Sutra Maritim" yang melintasi perairan Nusantara menuju Samudra Hindia!',
    relatedTerms: ['Spice Route (Jalur Rempah)', 'Srivijaya Empire (Kerajaan Sriwijaya)']
  },
  {
    id: 'dict-hist-5',
    term: 'Spice Route (Jalur Rempah)',
    pronunciation: '/spaɪs ruːt/',
    discipline: 'history',
    zone: 'history',
    tag: 'Sejarah Maritim Global',
    definition: 'Jaringan pelayaran maritim bersejarah yang menghubungkan kepulauan penghasil rempah di Nusantara (terutama Maluku) dengan pelabuhan di Asia, Timur Tengah, dan Eropa.',
    deepContext: 'Sebelum era lemari es, rempah seperti cengkih, pala, dan lada bernilai setara emas karena berfungsi mengawetkan makanan dan menjadi bahan obat-obatan.',
    example: 'Kepulauan Banda di Maluku merupakan satu-satunya tempat asal pohon pala di dunia hingga abad ke-18.',
    funFact: 'Pencarian jalur laut langsung menuju kepulauan rempah Nusantara mendorong dimulainya Era Penjelajahan Samudra pada abad ke-15!',
    relatedTerms: ['Srivijaya Empire (Kerajaan Sriwijaya)', 'Majapahit & Sumpah Palapa', 'Silk Road (Jalur Sutra)']
  },
  {
    id: 'dict-hist-6',
    term: 'Renaissance (Renaisans)',
    pronunciation: '/ˈrɛnəsɑːns/',
    discipline: 'history',
    zone: 'history',
    tag: 'Abad ke-14 hingga ke-17',
    definition: 'Gerakan kebangkitan kembali seni, sastra, sains, dan pemikiran humanisme di Eropa yang berawal di Italia setelah Abad Pertengahan.',
    deepContext: 'Kata "Renaissance" berarti "kelahiran kembali". Tokoh seperti Leonardo da Vinci, Michelangelo, dan Galileo Galilei mendorong observasi ilmiah dan kreativitas.',
    example: 'Penemuan mesin cetak huruf bergerak oleh Johannes Gutenberg pada 1440 mempercepat penyebaran buku-buku Renaisans ke seluruh Eropa.',
    funFact: 'Banyak karya ilmuwan Yunani Kuno dapat dipelajari kembali di Eropa berkat terjemahan dan pelestarian oleh para cendekiawan di Baghdad dan Cordoba!',
    relatedTerms: ['Industrial Revolution (Revolusi Industri)', 'Scientific Method (Metode Ilmiah)', 'Islamic Golden Age (Zaman Keemasan Islam)']
  },
  {
    id: 'dict-hist-7',
    term: 'Industrial Revolution (Revolusi Industri)',
    pronunciation: '/ɪnˈdʌstriəl ˌrɛvəˈluːʃən/',
    discipline: 'history',
    zone: 'history',
    tag: 'Abad ke-18 hingga ke-19',
    definition: 'Transformasi besar dari produksi barang secara manual menggunakan tangan menjadi produksi massal bertenaga mesin uap, air, dan pabrik.',
    deepContext: 'Dimulai di Inggris sekitar tahun 1760, revolusi ini melahirkan kereta api, kapal uap, urbanisasi modern, sekaligus memicu peningkatan emisi karbon pertama dalam sejarah.',
    example: 'Penyempurnaan mesin uap oleh James Watt meningkatkan efisiensi pabrik tekstil dan transportasi darat secara dramatis.',
    funFact: 'Kini dunia berada pada Revolusi Industri 4.0 yang ditandai oleh kecerdasan buatan (AI), robotika cerdas, dan Internet of Things (IoT).',
    relatedTerms: ['Renaissance (Renaisans)', 'Artificial Intelligence (Kecerdasan Buatan)', 'Internet of Things (IoT)']
  },
  {
    id: 'dict-hist-8',
    term: 'Sumpah Pemuda (1928)',
    pronunciation: '/ˈsʊmpah pəˈmʊda/',
    discipline: 'history',
    zone: 'history',
    tag: 'Sejarah Nasional Indonesia',
    definition: 'Ikrar bersejarah para pemuda dari berbagai daerah Nusantara pada Kongres Pemuda II tanggal 28 Oktober 1928 yang menegaskan satu tanah air, satu bangsa, dan satu bahasa persatuan: Indonesia.',
    deepContext: 'Peristiwa ini menyatukan organisasi kepemudaan kedaerahan (Jong Java, Jong Sumatranen Bond, Jong Celebes, dll.) menjadi gerakan kebangsaan yang terpadu.',
    example: 'Pada kongres yang sama, lagu kebangsaan "Indonesia Raya" ciptaan W.R. Supratman pertama kali diperdengarkan dengan biola.',
    funFact: 'Pilihan bahasa Melayu menjadi bahasa Indonesia sangat demokratis karena berfungsi sebagai lingua franca perdagangan antar-pulau tanpa mengutamakan suku tertentu.',
    relatedTerms: ['Majapahit & Sumpah Palapa', 'Srivijaya Empire (Kerajaan Sriwijaya)']
  },
  {
    id: 'dict-hist-9',
    term: 'Islamic Golden Age (Zaman Keemasan Islam)',
    pronunciation: '/ɪzˈlɑːmɪk ˈɡoʊldən eɪdʒ/',
    discipline: 'history',
    zone: 'history',
    tag: 'Abad ke-8 hingga ke-14',
    definition: 'Periode kemajuan pesat dalam sains, matematika, kedokteran, astronomi, dan filsafat di dunia Islam yang berpusat di Baghdad (Baitul Hikmah), Cordoba, dan Kairo.',
    deepContext: 'Para ilmuwan seperti Al-Khwarizmi (aljabar), Ibnu Sina (kedokteran), Al-Biruni (geodesi), dan Ibnu al-Haytham (optik) meletakkan dasar metode eksperimen modern.',
    example: 'Kitab "Al-Qanun fi al-Tibb" (The Canon of Medicine) karya Ibnu Sina menjadi buku teks utama fakultas kedokteran di Eropa dan Asia selama ratusan tahun.',
    funFact: 'Ibnu al-Haytham (Alhazen) membuktikan bahwa manusia melihat karena cahaya memantul dari benda masuk ke mata, mematahkan teori kuno yang mengira mata memancarkan sinar!',
    relatedTerms: ['Algebra (Aljabar)', 'Renaissance (Renaisans)', 'Scientific Method (Metode Ilmiah)']
  },

  // --- SAINS & ANTARIKSA (EXPANDED) ---
  {
    id: 'dict-sci-1',
    term: 'Photosynthesis (Fotosintesis)',
    pronunciation: '/ˌfoʊtoʊˈsɪnθəsɪs/',
    discipline: 'science',
    zone: 'science',
    tag: 'Biologi Tumbuhan',
    definition: 'Proses biokimia di mana tumbuhan hijau, alga, dan beberapa bakteri mengubah energi cahaya matahari, air (H₂O), dan karbon dioksida (CO₂) menjadi glukosa dan oksigen (O₂).',
    deepContext: 'Fotosintesis berlangsung di dalam organel sel bernama kloroplas yang mengandung pigmen hijau klorofil. Proses ini menjaga keseimbangan oksigen di atmosfer Bumi.',
    example: 'Persamaan sederhananya: 6CO₂ + 6H₂O + Cahaya → C₆H₁₂O₆ (Glukosa) + 6O₂.',
    funFact: 'Lebih dari separuh oksigen yang kita hirup di Bumi sebenarnya dihasilkan oleh fitoplankton mikroskopis di lautan!',
    relatedTerms: ['Biodiversity (Keanekaragaman Hayati)', 'DNA (Deoxyribonucleic Acid)']
  },
  {
    id: 'dict-sci-2',
    term: 'DNA (Deoxyribonucleic Acid)',
    pronunciation: '/ˌdiːˌɛnˈeɪ/',
    discipline: 'science',
    zone: 'science',
    tag: 'Biologi Molekuler & Genetika',
    definition: 'Molekul berbentuk tangga berpilin ganda (double helix) yang menyimpan seluruh instruksi genetik untuk pertumbuhan, fungsi, dan pewarisan sifat makhluk hidup.',
    deepContext: 'Kode genetik DNA disusun oleh empat basa kimia utama: Adenin (A), Timin (T), Sitosin (C), dan Guanin (G).',
    example: 'Urutan basa DNA menentukan warna mata, golongan darah, hingga cara sel memproduksi protein.',
    funFact: 'Jika seluruh untaian DNA di dalam satu sel tubuh manusia direntangkan lurus, panjangnya mencapai sekitar 2 meter!',
    relatedTerms: ['Photosynthesis (Fotosintesis)', 'Atom & Molecule (Atom & Molekul)']
  },
  {
    id: 'dict-sci-3',
    term: 'Gravity (Gravitasi)',
    pronunciation: '/ˈɡrævɪti/',
    discipline: 'science',
    zone: 'science',
    tag: 'Fisika & Astrofisika',
    definition: 'Gaya tarik-menarik alami antara semua benda yang memiliki massa atau energi; semakin besar massa benda, semakin kuat tarikan gravitasinya.',
    deepContext: 'Isaac Newton merumuskan hukum gravitasi universal pada 1687, dan Albert Einstein kemudian menjelaskannya dalam Relativitas Umum sebagai kelengkungan ruang-waktu.',
    example: 'Gravitasi Bumi menjaga atmosfer tetap menyelimuti planet dan membuat Bulan terus mengorbit Bumi.',
    funFact: 'Di permukaan Bulan, gravitasi hanya sekitar 1/6 dari gravitasi Bumi, sehingga astronot dapat melompat jauh lebih tinggi dengan beban yang sama!',
    relatedTerms: ['Light-Year (Tahun Cahaya)', 'Black Hole (Lubang Hitam)', 'Calculus (Kalkulus)']
  },
  {
    id: 'dict-sci-4',
    term: 'Atom & Molecule (Atom & Molekul)',
    pronunciation: '/ˈætəm & ˈmɒlɪkjuːl/',
    discipline: 'science',
    zone: 'science',
    tag: 'Kimia & Fisika Dasar',
    definition: 'Atom adalah unit dasar materi yang terdiri atas inti (proton bermuatan positif dan neutron netral) yang dikelilingi elektron bermuatan negatif. Molekul adalah gabungan dua atom atau lebih.',
    deepContext: 'Jumlah proton di dalam inti atom menentukan jenis unsur kimia pada Tabel Periodik (misalnya 1 proton = Hidrogen, 6 proton = Karbon, 79 proton = Emas).',
    example: 'Satu molekul air (H₂O) terbentuk dari dua atom Hidrogen yang berikatan dengan satu atom Oksigen.',
    funFact: 'Sebagian besar ruang di dalam atom sebenarnya adalah ruang kosong; jika inti atom diperbesar seukuran kelereng di tengah stadion bola, elektronnya berada di kursi penonton paling luar!',
    relatedTerms: ['Photosynthesis (Fotosintesis)', 'Thermodynamics (Termodinamika)', 'Quantum Computing (Komputasi Kuantum)']
  },
  {
    id: 'dict-sci-5',
    term: 'Light-Year (Tahun Cahaya)',
    pronunciation: '/ˈlaɪt jɪər/',
    discipline: 'science',
    zone: 'science',
    tag: 'Astronomi',
    definition: 'Satuan JARAK (bukan waktu) dalam astronomi yang menyatakan seberapa jauh cahaya merambat dalam ruang hampa selama satu tahun Bumi, yaitu sekitar 9,46 triliun kilometer.',
    deepContext: 'Karena alam semesta sangat luas, kilometer terlalu kecil untuk mengukur jarak antar-bintang dan galaksi.',
    example: 'Bintang terdekat dari Tata Surya kita, Proxima Centauri, berjarak sekitar 4,24 tahun cahaya.',
    funFact: 'Ketika kita melihat cahaya bintang yang berjarak 100 tahun cahaya, kita sebenarnya sedang melihat cahaya yang dipancarkan bintang itu 100 tahun lalu!',
    relatedTerms: ['Black Hole (Lubang Hitam)', 'Gravity (Gravitasi)', 'Exoplanet (Eksoplanet)']
  },
  {
    id: 'dict-sci-6',
    term: 'Black Hole (Lubang Hitam)',
    pronunciation: '/blæk hoʊl/',
    discipline: 'science',
    zone: 'science',
    tag: 'Astrofisika Kosmik',
    definition: 'Wilayah di ruang angkasa dengan medan gravitasi sedemikian ekstrem sehingga tidak ada materi maupun cahaya yang dapat lolos dari dalam batas event horizon-nya.',
    deepContext: 'Lubang hitam bermassa bintang terbentuk ketika bintang raksasa kehabisan bahan bakar nuklir dan runtuh akibat gravitasinya sendiri (supernova).',
    example: 'Di pusat galaksi Bima Sakti kita terdapat lubang hitam supermasif bernama Sagittarius A*.',
    funFact: 'Pada tahun 2019, kolaborasi Event Horizon Telescope berhasil menangkap citra bayangan lubang hitam pertama di galaksi M87!',
    relatedTerms: ['Gravity (Gravitasi)', 'Light-Year (Tahun Cahaya)']
  },
  {
    id: 'dict-sci-7',
    term: 'Thermodynamics (Termodinamika)',
    pronunciation: '/ˌθɜːrmoʊdaɪˈnæmɪks/',
    discipline: 'science',
    zone: 'science',
    tag: 'Fisika Energi',
    definition: 'Cabang fisika yang mempelajari hubungan antara panas, kerja, suhu, dan energi. Hukum pertamanya menyatakan bahwa energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk.',
    deepContext: 'Termodinamika menjelaskan cara kerja mesin kendaraan, pembangkit listrik, lemari es, hingga metabolisme tubuh makhluk hidup.',
    example: 'Panel surya mengubah energi cahaya matahari menjadi energi listrik, lalu lampu mengubahnya kembali menjadi cahaya dan panas.',
    funFact: 'Hukum Kedua Termodinamika memperkenalkan konsep "entropi", yang menjelaskan mengapa panas selalu mengalir alami dari benda panas ke benda dingin.',
    relatedTerms: ['Atom & Molecule (Atom & Molekul)', 'Electromagnetism (Elektromagnetisme)']
  },
  {
    id: 'dict-sci-8',
    term: 'Scientific Method (Metode Ilmiah)',
    pronunciation: '/ˌsaɪənˈtɪfɪk ˈmɛθəd/',
    discipline: 'science',
    zone: 'science',
    tag: 'Epistemologi Sains',
    definition: 'Proses sistematis untuk memperoleh pengetahuan melalui pengamatan, perumusan hipotesis, eksperimen terkendali, analisis data, dan penarikan kesimpulan.',
    deepContext: 'Metode ilmiah memastikan bahwa klaim ilmiah dapat diuji ulang (reproducible) oleh peneliti lain di seluruh dunia secara objektif.',
    example: 'Mengamati tanaman layu → Hipotesis: kurang cahaya → Eksperimen membandingkan tanaman di tempat terang vs gelap → Analisis hasil.',
    funFact: 'Hipotesis yang terbukti salah dalam eksperimen tetap sangat berharga karena membantu ilmuwan menyingkirkan penjelasan yang keliru!',
    relatedTerms: ['Renaissance (Renaisans)', 'Critical Thinking (Berpikir Kritis)']
  },
  {
    id: 'dict-sci-9',
    term: 'Exoplanet (Eksoplanet)',
    pronunciation: '/ˈɛksoʊˌplænɪt/',
    discipline: 'science',
    zone: 'science',
    tag: 'Astronomi Modern',
    definition: 'Planet yang mengorbit bintang lain di luar Tata Surya kita. Hingga kini lebih dari 5.700 eksoplanet telah dikonfirmasi oleh teleskop luar angkasa seperti Kepler dan James Webb.',
    deepContext: 'Ilmuwan mencari eksoplanet di "Zona Layak Huni" (Habitable Zone)—jarak dari bintang induk di mana suhu memungkinkan air bertahan dalam bentuk cair di permukaan planet.',
    example: 'Sistem bintang TRAPPIST-1 memiliki tujuh planet berbatu seukuran Bumi, dengan beberapa di antaranya berada di zona layak huni.',
    funFact: 'Metode transit mendeteksi eksoplanet dengan mengukur redupnya cahaya bintang sebesar kurang dari 1% saat planet melintas di depannya!',
    relatedTerms: ['Light-Year (Tahun Cahaya)', 'Gravity (Gravitasi)']
  },

  // --- GEOGRAFI & BUDAYA DUNIA (EXPANDED) ---
  {
    id: 'dict-geo-1',
    term: 'Plate Tectonics (Tektonika Lempeng)',
    pronunciation: '/pleɪt tɛkˈtɒnɪks/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Geologi & Geografi Fisik',
    definition: 'Teori ilmiah yang menjelaskan bahwa kerak terluar Bumi (litosfer) terpecah menjadi beberapa lempeng raksasa yang bergerak perlahan di atas lapisan mantel yang panas.',
    deepContext: 'Tumbukan, pemisahan, dan pergeseran lempeng tektonik membentuk pegunungan tinggi (seperti Himalaya), palung laut dalam, gunung berapi, dan gempa bumi.',
    example: 'Indonesia terletak di pertemuan tiga lempeng besar: Eurasia, Indo-Australia, dan Pasifik.',
    funFact: 'Lempeng tektonik bergerak dengan kecepatan sekitar 2 hingga 10 sentimeter per tahun—kira-kira secepat pertumbuhan kuku jari manusia!',
    relatedTerms: ['Pacific Ring of Fire (Cincin Api Pasifik)', 'Archipelago (Negara Kepulauan)']
  },
  {
    id: 'dict-geo-2',
    term: 'Pacific Ring of Fire (Cincin Api Pasifik)',
    pronunciation: '/rɪŋ əv ˈfaɪər/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Geografi Vulkanik',
    definition: 'Jalur berbentuk tapal kuda sepanjang sekitar 40.000 km di sekeliling Samudra Pasifik yang menampung sekitar 75% gunung berapi aktif dunia dan 90% gempa bumi.',
    deepContext: 'Membentang dari Selandia Baru, Indonesia, Filipina, Jepang, Alaska, hingga pantai barat Amerika Utara dan Selatan.',
    example: 'Gunung Merapi, Gunung Bromo, dan Gunung Fuji berada di sepanjang jalur Cincin Api Pasifik.',
    funFact: 'Selain risiko bencana geologis, jalur ini menyimpan potensi energi panas bumi (geothermal) terbesar di dunia!',
    relatedTerms: ['Plate Tectonics (Tektonika Lempeng)', 'Archipelago (Negara Kepulauan)']
  },
  {
    id: 'dict-geo-3',
    term: 'Archipelago (Negara Kepulauan)',
    pronunciation: '/ˌɑːrkɪˈpɛləɡoʊ/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Geografi Maritim',
    definition: 'Gugusan atau rangkaian banyak pulau yang saling berdekatan di dalam satu kesatuan perairan laut yang luas.',
    deepContext: 'Indonesia adalah negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau yang membentang di sepanjang garis khatulistiwa.',
    example: 'Selain Indonesia, contoh negara kepulauan lainnya adalah Jepang, Filipina, dan Maladewa.',
    funFact: 'Melalui Deklarasi Djuanda 1957, Indonesia memperjuangkan konsep "Wawasan Nusantara" di mana laut bukan pemisah, melainkan penghubung antar-pulau.',
    relatedTerms: ['Equator (Garis Khatulistiwa)', 'Biodiversity (Keanekaragaman Hayati)']
  },
  {
    id: 'dict-geo-4',
    term: 'Equator (Garis Khatulistiwa)',
    pronunciation: '/ɪˈkweɪtər/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Koordinat & Iklim',
    definition: 'Garis lintang khayal pada 0° yang melingkari bagian tengah Bumi dan membaginya secara simetris menjadi Belahan Bumi Utara dan Belahan Bumi Selatan.',
    deepContext: 'Wilayah di sekitar khatulistiwa menerima sinar matahari tegak lurus sepanjang tahun sehingga memiliki iklim tropis dengan suhu hangat dan curah hujan tinggi.',
    example: 'Kota Pontianak di Kalimantan Barat dilintasi langsung oleh garis khatulistiwa dan memiliki Tugu Khatulistiwa yang ikonik.',
    funFact: 'Di garis khatulistiwa, durasi siang dan malam hampir selalu sama panjang sepanjang tahun, yaitu sekitar 12 jam siang dan 12 jam malam!',
    relatedTerms: ['Archipelago (Negara Kepulauan)', 'Biodiversity (Keanekaragaman Hayati)', 'Monsoon (Angin Muson)']
  },
  {
    id: 'dict-geo-5',
    term: 'Biodiversity (Keanekaragaman Hayati)',
    pronunciation: '/ˌbaɪoʊdaɪˈvɜːrsɪti/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Ekologi & Konservasi',
    definition: 'Variasi seluruh bentuk kehidupan di Bumi—mencakup keanekaragaman genetik, spesies tumbuhan, hewan, mikroorganisme, serta ekosistem tempat mereka hidup.',
    deepContext: 'Indonesia termasuk negara "megabiodiversitas" dunia karena menjadi rumah bagi ribuan spesies endemik seperti Orangutan, Komodo, Badak Jawa, dan bunga Rafflesia arnoldii.',
    example: 'Hutan hujan tropis dan terumbu karang di Segitiga Terumbu Karang (Coral Triangle) memiliki keanekaragaman hayati tertinggi di planet ini.',
    funFact: 'Garis Wallace membagi zona fauna Indonesia bagian barat (bercorak Asia seperti harimau dan gajah) dengan bagian timur (bercorak Australasia seperti kanguru pohon dan cenderawasih)!',
    relatedTerms: ['Photosynthesis (Fotosintesis)', 'Equator (Garis Khatulistiwa)']
  },
  {
    id: 'dict-geo-6',
    term: 'Monsoon (Angin Muson)',
    pronunciation: '/mɒnˈsuːn/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Klimatologi',
    definition: 'Pola angin musiman berskala besar yang berbalik arah setiap enam bulan akibat perbedaan pemanasan daratan benua Asia dan Australia serta lautan di sekitarnya.',
    deepContext: 'Angin muson menentukan pergantian musim hujan dan musim kemarau di Asia Selatan dan Asia Tenggara, termasuk Indonesia.',
    example: 'Angin Muson Barat membawa uap air dari Samudra Hindia sehingga memicu musim hujan di sebagian besar wilayah Indonesia.',
    funFact: 'Pada masa lampau, para pelaut Nusantara dan pedagang Arab memanfaatkan arah angin muson untuk berlayar pulang-pergi melintasi samudra!',
    relatedTerms: ['Equator (Garis Khatulistiwa)', 'Spice Route (Jalur Rempah)']
  },
  {
    id: 'dict-geo-7',
    term: 'Cartography & GIS (Kartografi & Sistem Informasi Geografis)',
    pronunciation: '/kɑːrˈtɒɡrəfi/',
    discipline: 'geography',
    zone: 'geography',
    tag: 'Geografi Digital',
    definition: 'Kartografi adalah ilmu dan seni membuat peta akurat. GIS (Geographic Information System) adalah sistem komputer untuk menangkap, menganalisis, dan memvisualisasikan data berbasis lokasi.',
    deepContext: 'Karena Bumi berbentuk bulat (geoid), setiap peta datar memerlukan "proyeksi peta" (seperti Proyeksi Mercator atau Robinson) yang memiliki kompromi antara ketepatan sudut dan luas wilayah.',
    example: 'Aplikasi navigasi lalu lintas real-time, pemetaan mitigasi bencana banjir, dan tata ruang kota modern semuanya mengandalkan teknologi GIS.',
    funFact: 'Pada Proyeksi Mercator klasik, pulau Greenland tampak sebesar benua Afrika, padahal luas Afrika sebenarnya 14 kali lebih besar daripada Greenland!',
    relatedTerms: ['Equator (Garis Khatulistiwa)', 'Cloud Computing (Komputasi Awan)']
  },

  // --- TEKNOLOGI & AI (EXPANDED SIGNIFICANTLY) ---
  {
    id: 'dict-tech-1',
    term: 'Algorithm (Algoritma)',
    pronunciation: '/ˈælɡərɪðəm/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Ilmu Komputer',
    definition: 'Serangkaian langkah instruksi yang terstruktur, jelas, dan terbatas untuk menyelesaikan suatu masalah atau melakukan perhitungan.',
    deepContext: 'Algoritma adalah jantung dari seluruh perangkat lunak—mulai dari cara aplikasi peta mencari rute tercepat hingga cara mesin pencari mengurutkan informasi.',
    example: 'Resep memasak adalah analogi algoritma sehari-hari: bahan (input), langkah memasak (proses), dan hidangan siap saji (output).',
    funFact: 'Kata "Algorithm" berasal dari pelafalan Latin nama matematikawan Persia abad ke-9, Al-Khwarizmi!',
    relatedTerms: ['Data Structure (Struktur Data)', 'Artificial Intelligence (Kecerdasan Buatan)', 'Binary System (Sistem Biner)']
  },
  {
    id: 'dict-tech-2',
    term: 'Artificial Intelligence (Kecerdasan Buatan)',
    pronunciation: '/ˌɑːrtɪˈfɪʃəl ɪnˈtɛlɪdʒəns/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Teknologi Masa Depan',
    definition: 'Bidang ilmu komputer yang merancang sistem mesin agar mampu melakukan tugas yang biasanya memerlukan kecerdasan manusia, seperti mengenali pola, memahami bahasa, dan mengambil keputusan.',
    deepContext: 'AI modern banyak bertumpu pada Machine Learning dan Deep Learning yang melatih jaringan saraf tiruan menggunakan data dalam jumlah besar.',
    example: 'Penerjemah bahasa otomatis, diagnosis citra medis, dan rekomendasi pembelajaran adaptif menggunakan teknologi AI.',
    funFact: 'Istilah "Artificial Intelligence" pertama kali diperkenalkan secara resmi pada Konferensi Dartmouth tahun 1956 oleh John McCarthy.',
    relatedTerms: ['Machine Learning', 'Neural Network (Jaringan Saraf Tiruan)', 'Large Language Model (LLM)']
  },
  {
    id: 'dict-tech-3',
    term: 'Machine Learning',
    pronunciation: '/məˈʃiːn ˈlɜːrnɪŋ/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Sub-bidang AI',
    definition: 'Metode dalam kecerdasan buatan di mana komputer belajar mengenali pola dan meningkatkan akurasinya dari contoh data tanpa diprogram aturan eksplisit satu per satu.',
    deepContext: 'Terbagi menjadi tiga pendekatan utama: Supervised Learning (belajar dari data berlabel), Unsupervised Learning (menemukan kelompok tersembunyi), dan Reinforcement Learning (belajar dari hadiah dan penalti).',
    example: 'Filter spam email belajar membedakan pesan berbahaya dari pesan penting dengan menganalisis jutaan contoh email.',
    funFact: 'Kualitas model Machine Learning sangat bergantung pada data latihnya—jika datanya bias, keputusan AI juga bisa ikut bias!',
    relatedTerms: ['Artificial Intelligence (Kecerdasan Buatan)', 'Neural Network (Jaringan Saraf Tiruan)', 'Probability (Probabilitas / Peluang)']
  },
  {
    id: 'dict-tech-4',
    term: 'Neural Network (Jaringan Saraf Tiruan)',
    pronunciation: '/ˈnjʊərəl ˈnɛtwɜːrk/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Deep Learning',
    definition: 'Arsitektur komputasi yang terinspirasi dari jaringan neuron otak manusia, tersusun atas lapisan input, lapisan tersembunyi (hidden layers), dan lapisan output yang saling terhubung dengan bobot matematis.',
    deepContext: 'Ketika jaringan memiliki banyak lapisan tersembunyi, metode ini disebut "Deep Learning" yang mampu mengenali wajah, suara, hingga menyusun teks dan kode.',
    example: 'Setiap neuron buatan menerima angka input, mengalikannya dengan bobot (weight), menambahkan bias, lalu meneruskannya melalui fungsi aktivasi.',
    funFact: 'Arsitektur "Transformer" yang diperkenalkan pada 2017 merevolusi pemrosesan bahasa dengan mekanisme "Self-Attention" yang memahami konteks seluruh kalimat sekaligus!',
    relatedTerms: ['Large Language Model (LLM)', 'Machine Learning', 'Calculus (Kalkulus)']
  },
  {
    id: 'dict-tech-5',
    term: 'Large Language Model (LLM)',
    pronunciation: '/lɑːrdʒ ˈlæŋɡwɪdʒ ˈmɒdl/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'AI Generatif',
    definition: 'Model kecerdasan buatan berskala besar yang dilatih pada miliaran teks untuk memahami, merangkum, menerjemahkan, dan menghasilkan bahasa manusia secara kontekstual.',
    deepContext: 'LLM bekerja dengan memprediksi token (potongan kata) berikutnya yang paling logis dan relevan berdasarkan konteks seluruh percakapan sebelumnya.',
    example: 'Asisten belajar interaktif, penerjemah multibahasa, dan alat bantu pemrograman memanfaatkan LLM.',
    funFact: 'Karena LLM memprediksi probabilitas kata, pengguna tetap perlu menerapkan berpikir kritis dan memverifikasi fakta penting dengan sumber terpercaya!',
    relatedTerms: ['Neural Network (Jaringan Saraf Tiruan)', 'Critical Thinking (Berpikir Kritis)', 'Artificial Intelligence (Kecerdasan Buatan)']
  },
  {
    id: 'dict-tech-6',
    term: 'Data Structure (Struktur Data)',
    pronunciation: '/ˈdeɪtə ˈstrʌktʃər/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Rekayasa Perangkat Lunak',
    definition: 'Cara terorganisir untuk menyimpan, mengelola, dan mengakses data di memori komputer agar operasi pencarian, penyisipan, dan pengurutan berjalan secepat mungkin.',
    deepContext: 'Contoh struktur data fundamental meliputi Array (daftar berindeks), Stack (tumpukan LIFO — Last In First Out), Queue (antrean FIFO), Tree (pohon hierarki), dan Graph (jejaring simpul).',
    example: 'Fitur tombol "Kembali" (Back) pada aplikasi dan browser web menggunakan struktur data Stack untuk mengingat urutan halaman yang dikunjungi!',
    funFact: 'Aplikasi peta digital menggunakan struktur data "Graph" di mana persimpangan jalan adalah simpul (node) dan jalan raya adalah sisi (edge) berbobot jarak!',
    relatedTerms: ['Algorithm (Algoritma)', 'Binary System (Sistem Biner)', 'API (Application Programming Interface)']
  },
  {
    id: 'dict-tech-7',
    term: 'Cloud Computing (Komputasi Awan)',
    pronunciation: '/klaʊd kəmˈpjuːtɪŋ/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Infrastruktur Digital',
    definition: 'Penyediaan layanan komputasi—seperti server, penyimpanan data, basis data, jaringan, dan kecerdasan buatan—secara on-demand melalui internet tanpa harus memiliki perangkat keras fisik sendiri.',
    deepContext: 'Terdiri dari tiga model layanan utama: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), dan SaaS (Software as a Service).',
    example: 'Menyimpan dokumen di Google Drive, menonton streaming video, dan sinkronisasi progres game lintas perangkat menggunakan Cloud Computing.',
    funFact: 'Istilah "Cloud" berasal dari simbol awan yang sering digambar oleh para insinyur jaringan untuk melambangkan internet pada diagram arsitektur!',
    relatedTerms: ['API (Application Programming Interface)', 'Internet of Things (IoT)', 'Cryptography (Kriptografi)']
  },
  {
    id: 'dict-tech-8',
    term: 'API (Application Programming Interface)',
    pronunciation: '/ˌeɪ piː ˈaɪ/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Arsitektur Web & Aplikasi',
    definition: 'Sekumpulan protokol dan aturan standar yang memungkinkan dua aplikasi perangkat lunak berbeda saling berkomunikasi dan bertukar data secara aman.',
    deepContext: 'API bertindak seperti "pelayan restoran": aplikasi klien mengirim permintaan (Request), API menyampaikannya ke server dapur, lalu mengembalikan data jawaban (Response) dalam format JSON.',
    example: 'Ketika aplikasi cuaca di ponselmu menampilkan prakiraan hujan, aplikasi tersebut mengambil data melalui API badan meteorologi.',
    funFact: 'Arsitektur web modern menggabungkan puluhan API secara bersamaan—mulai dari API peta, pembayaran digital, hingga autentikasi akun!',
    relatedTerms: ['Cloud Computing (Komputasi Awan)', 'Data Structure (Struktur Data)', 'Cryptography (Kriptografi)']
  },
  {
    id: 'dict-tech-9',
    term: 'Internet of Things (IoT)',
    pronunciation: '/ˈɪntərnɛt əv θɪŋz/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Perangkat Cerdas',
    definition: 'Jaringan benda fisik (sensor, peralatan rumah tangga, kendaraan, alat pertanian) yang ditanami mikrokontroler dan koneksi internet untuk mengumpulkan serta bertukar data secara otomatis.',
    deepContext: 'IoT menghubungkan dunia fisik dengan analisis digital untuk efisiensi energi, pemantauan kesehatan real-time, dan kota cerdas (Smart City).',
    example: 'Sensor kelembapan tanah otomatis menyalakan penyiram tanaman pintar hanya ketika tanaman membutuhkan air.',
    funFact: 'Jumlah perangkat IoT yang terhubung ke internet di seluruh dunia kini telah melampaui jumlah populasi manusia di Bumi!',
    relatedTerms: ['Cloud Computing (Komputasi Awan)', 'Ubiquitous (Adjective — Kata Sifat)', 'Phishing & Cyber Hygiene']
  },
  {
    id: 'dict-tech-10',
    term: 'Quantum Computing (Komputasi Kuantum)',
    pronunciation: '/ˈkwɒntəm kəmˈpjuːtɪŋ/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Teknologi Frontier',
    definition: 'Paradigma komputasi mutakhir yang memanfaatkan fenomena fisika kuantum—seperti superposisi dan keterikatan (entanglement)—menggunakan unit informasi bernama Qubit.',
    deepContext: 'Jika bit klasik hanya bernilai 0 atau 1 secara terpisah, qubit dapat berada dalam superposisi kombinasi 0 dan 1 sekaligus, memungkinkan penyelesaian simulasi molekul kompleks jauh lebih cepat.',
    example: 'Komputer kuantum berpotensi mempercepat penemuan obat baru, material baterai super-efisien, dan optimasi logistik global.',
    funFact: 'Chip prosesor kuantum superkonduktor harus didinginkan hingga suhu sekitar -273°C (mendekati nol mutlak)—lebih dingin daripada ruang antar-bintang!',
    relatedTerms: ['Binary System (Sistem Biner)', 'Atom & Molecule (Atom & Molekul)', 'Cryptography (Kriptografi)']
  },
  {
    id: 'dict-tech-11',
    term: 'Binary System (Sistem Biner)',
    pronunciation: '/ˈbaɪnəri ˈsɪstəm/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Arsitektur Komputer',
    definition: 'Sistem bilangan berbasis 2 yang hanya menggunakan dua simbol, yaitu 0 dan 1, untuk merepresentasikan seluruh data digital di dalam perangkat elektronik.',
    deepContext: 'Setiap digit biner disebut "bit". Delapan bit membentuk satu "byte" yang cukup untuk mengkodekan satu karakter huruf atau angka.',
    example: 'Angka desimal 5 dalam sistem biner ditulis sebagai 101 (1×4 + 0×2 + 1×1).',
    funFact: 'Semua video 4K, simfoni musik digital, dan game interaktif pada dasarnya diterjemahkan menjadi miliaran sakelar listrik ON (1) dan OFF (0) di dalam prosesor!',
    relatedTerms: ['Boolean Logic (Logika Boolean)', 'Algorithm (Algoritma)', 'Quantum Computing (Komputasi Kuantum)']
  },
  {
    id: 'dict-tech-12',
    term: 'Cryptography (Kriptografi)',
    pronunciation: '/krɪpˈtɒɡrəfi/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Keamanan Siber',
    definition: 'Ilmu dan teknik mengamankan informasi dengan mengubah pesan asli (plaintext) menjadi kode teracak (ciphertext) sehingga hanya pihak berwenang yang dapat membacanya.',
    deepContext: 'Kriptografi melindungi transaksi perbankan online, pesan terenkripsi end-to-end, dan tanda tangan digital di internet.',
    example: 'Ikon gembok HTTPS pada peramban web menandakan koneksi antara perangkatmu dan server dilindungi oleh enkripsi kriptografi.',
    funFact: 'Pada masa Romawi Kuno, Julius Caesar menggunakan sandi geser sederhana (Caesar Cipher) dengan menggeser setiap huruf alfabet sebanyak 3 langkah!',
    relatedTerms: ['Prime Number (Bilangan Prima)', 'Phishing & Cyber Hygiene', 'Binary System (Sistem Biner)']
  },
  {
    id: 'dict-tech-13',
    term: 'Phishing & Cyber Hygiene',
    pronunciation: '/ˈfɪʃɪŋ/',
    discipline: 'modern',
    zone: 'modern',
    tag: 'Literasi Digital',
    definition: 'Phishing adalah upaya penipuan digital yang menyamar sebagai pihak terpercaya untuk mencuri kata sandi atau data pribadi. Cyber Hygiene adalah kebiasaan menjaga keamanan akun digital.',
    deepContext: 'Mengaktifkan Autentikasi Dua Faktor (2FA), menggunakan kata sandi unik yang kuat, dan memeriksa alamat pengirim tautan adalah langkah utama pertahanan siber.',
    example: 'Pesan mendesak yang mengancam akun akan diblokir jika tidak segera mengeklik tautan mencurigakan adalah ciri khas phishing.',
    funFact: 'Kata "phishing" berasal dari kata "fishing" (memancing) karena pelaku menebar umpan digital untuk memancing korban!',
    relatedTerms: ['Cryptography (Kriptografi)', 'Critical Thinking (Berpikir Kritis)']
  },

  // --- EKONOMI & LITERASI FINANSIAL (EXPANDED) ---
  {
    id: 'dict-econ-1',
    term: 'Compound Interest (Bunga Majemuk)',
    pronunciation: '/ˈkɒmpaʊnd ˈɪntrəst/',
    discipline: 'economics',
    zone: 'modern',
    tag: 'Literasi Finansial',
    definition: 'Bunga yang dihitung tidak hanya berdasarkan modal tabungan awal, tetapi juga dari akumulasi bunga yang telah diperoleh pada periode-periode sebelumnya.',
    deepContext: 'Bunga majemuk menciptakan pertumbuhan eksponensial dari waktu ke waktu, menjadikannya kunci penting dalam perencanaan tabungan dan investasi jangka panjang.',
    example: 'Jika Rp1.000.000 tumbuh 10% per tahun secara majemuk, tahun pertama menjadi Rp1.100.000, dan tahun kedua tumbuh 10% dari Rp1.100.000 menjadi Rp1.210.000.',
    funFact: 'Dengan "Aturan 72" (Rule of 72), bagi angka 72 dengan tingkat bunga tahunan (%) untuk memperkirakan berapa tahun uangmu akan berlipat ganda!',
    relatedTerms: ['Inflation (Inflasi)', 'Supply & Demand (Penawaran & Permintaan)', 'Logarithm (Logaritma)']
  },
  {
    id: 'dict-econ-2',
    term: 'Inflation (Inflasi)',
    pronunciation: '/ɪnˈfleɪʃən/',
    discipline: 'economics',
    zone: 'modern',
    tag: 'Ekonomi Makro',
    definition: 'Kenaikan harga barang dan jasa secara umum dan terus-menerus dalam suatu perekonomian selama periode waktu tertentu, yang menyebabkan daya beli mata uang menurun.',
    deepContext: 'Inflasi yang rendah dan terkendali (sekitar 2–3% per tahun) dianggap sehat bagi pertumbuhan ekonomi, sedangkan hiperinflasi merusak kesejahteraan masyarakat.',
    example: 'Jika uang Rp10.000 sepuluh tahun lalu bisa membeli dua porsi makanan dan kini hanya cukup untuk satu porsi, itulah dampak nyata inflasi.',
    funFact: 'Bank sentral (seperti Bank Indonesia) menjaga kestabilan inflasi melalui kebijakan suku bunga dan pengelolaan jumlah uang beredar.',
    relatedTerms: ['Compound Interest (Bunga Majemuk)', 'Supply & Demand (Penawaran & Permintaan)', 'Opportunity Cost (Biaya Peluang)']
  },
  {
    id: 'dict-econ-3',
    term: 'Supply & Demand (Penawaran & Permintaan)',
    pronunciation: '/səˈplaɪ ænd dɪˈmænd/',
    discipline: 'economics',
    zone: 'modern',
    tag: 'Ekonomi Mikro',
    definition: 'Hukum pasar yang menjelaskan interaksi antara ketersediaan barang (penawaran) dan keinginan serta kemampuan pembeli (permintaan) dalam menentukan harga.',
    deepContext: 'Ketika permintaan tinggi sementara pasokan terbatas, harga cenderung naik. Sebaliknya, ketika pasokan melimpah dan permintaan rendah, harga cenderung turun.',
    example: 'Harga tiket perjalanan dan penginapan cenderung naik pada musim liburan karena lonjakan permintaan.',
    funFact: 'Konsep keseimbangan pasar ini dipopulerkan secara sistematis oleh ekonom Skotlandia Adam Smith dalam bukunya "The Wealth of Nations" (1776).',
    relatedTerms: ['Inflation (Inflasi)', 'Opportunity Cost (Biaya Peluang)', 'Diversification (Diversifikasi)']
  },
  {
    id: 'dict-econ-4',
    term: 'Opportunity Cost (Biaya Peluang)',
    pronunciation: '/ˌɒpərˈtjuːnɪti kɒst/',
    discipline: 'economics',
    zone: 'modern',
    tag: 'Pengambilan Keputusan',
    definition: 'Nilai dari alternatif terbaik berikutnya yang harus dikorbankan ketika kita memilih satu pilihan di antara beberapa opsi terbatas (waktu, uang, atau sumber daya).',
    deepContext: 'Setiap keputusan memiliki biaya peluang. Memahami konsep ini membantu kita memprioritaskan kegiatan dan pengeluaran yang paling bermanfaat.',
    example: 'Jika kamu menghabiskan 2 jam untuk bermain tanpa belajar menjelang ujian, biaya peluangnya adalah pemahaman materi yang bisa diraih selama 2 jam tersebut.',
    funFact: 'Konsep biaya peluang berlaku bahkan ketika suatu barang berlabel "gratis", karena kamu tetap mengorbankan waktu berhargamu!',
    relatedTerms: ['Supply & Demand (Penawaran & Permintaan)', 'Compound Interest (Bunga Majemuk)']
  },
  {
    id: 'dict-econ-5',
    term: 'Diversification (Diversifikasi)',
    pronunciation: '/daɪˌvɜːrsɪfɪˈkeɪʃən/',
    discipline: 'economics',
    zone: 'modern',
    tag: 'Manajemen Risiko',
    definition: 'Strategi mengelola risiko dengan menyebarkan alokasi dana, keterampilan, atau sumber daya ke berbagai bidang yang berbeda sehingga tidak bergantung pada satu sumber tunggal.',
    deepContext: 'Prinsip klasik "jangan menaruh semua telur dalam satu keranjang" melindungi individu dan perusahaan dari guncangan tak terduga pada satu sektor.',
    example: 'Mengombinasikan tabungan darurat, instrumen pendapatan tetap, dan pengembangan keterampilan digital menciptakan ketahanan finansial jangka panjang.',
    funFact: 'Ekonom Harry Markowitz memenangkan Hadiah Nobel Ekonomi 1990 karena membuktikan secara matematis bagaimana diversifikasi menurunkan risiko portofolio!',
    relatedTerms: ['Compound Interest (Bunga Majemuk)', 'Opportunity Cost (Biaya Peluang)', 'Resilient (Adjective — Kata Sifat)']
  },

  // --- FILSAFAT & PSIKOLOGI DASAR (EXPANDED) ---
  {
    id: 'dict-phil-1',
    term: 'Growth Mindset (Pola Pikir Bertumbuh)',
    pronunciation: '/ɡroʊθ ˈmaɪndsɛt/',
    discipline: 'philosophy',
    zone: 'language',
    tag: 'Psikologi Pendidikan',
    definition: 'Keyakinan bahwa kecerdasan, bakat, dan kemampuan bukanlah sifat bawaan yang kaku, melainkan dapat terus dikembangkan melalui usaha, strategi belajar yang tepat, dan ketekunan.',
    deepContext: 'Diteliti secara mendalam oleh psikolog Carol Dweck, pelajar dengan Growth Mindset memandang kesalahan sebagai umpan balik berharga untuk memperkuat koneksi saraf otak.',
    example: 'Mengubah kalimat "Aku tidak bisa matematika" menjadi "Aku belum menguasai topik ini, mari pelajari langkah dasarnya".',
    funFact: 'Sifat plastisitas otak (neuroplasticity) membuktikan secara biologis bahwa otak membentuk jalur sinapsis baru setiap kali kita mempelajari keterampilan menantang!',
    relatedTerms: ['Metacognition (Metakognisi)', 'Critical Thinking (Berpikir Kritis)', 'Resilient (Adjective — Kata Sifat)']
  },
  {
    id: 'dict-phil-2',
    term: 'Metacognition (Metakognisi)',
    pronunciation: '/ˌmɛtəkɒɡˈnɪʃən/',
    discipline: 'philosophy',
    zone: 'science',
    tag: 'Ilmu Kognitif & Belajar',
    definition: 'Kesadaran dan pemahaman seseorang terhadap proses berpikirnya sendiri—sering disebut sebagai "berpikir tentang cara kita berpikir dan belajar".',
    deepContext: 'Pelajar yang melatih metakognisi rutin mengevaluasi: "Bagian mana yang sudah kupahami?", "Strategi apa yang paling efektif?", dan "Mengapa jawabanku tadi keliru?".',
    example: 'Membuat ringkasan dengan kata-kata sendiri setelah membaca sebuah konsep untuk menguji apakah kita benar-benar memahaminya.',
    funFact: 'Teknik "Feynman Technique" (menjelaskan konsep rumit dengan bahasa sederhana seolah mengajari anak kecil) adalah bentuk metakognisi terbaik!',
    relatedTerms: ['Growth Mindset (Pola Pikir Bertumbuh)', 'Critical Thinking (Berpikir Kritis)', 'Scientific Method (Metode Ilmiah)']
  },
  {
    id: 'dict-phil-3',
    term: 'Critical Thinking (Berpikir Kritis)',
    pronunciation: '/ˈkrɪtɪkəl ˈθɪŋkɪŋ/',
    discipline: 'philosophy',
    zone: 'modern',
    tag: 'Logika & Filsafat',
    definition: 'Kemampuan menganalisis informasi, mengevaluasi bukti dan sumber secara objektif, mengenali bias logika, serta menarik kesimpulan yang rasional sebelum mempercayai suatu klaim.',
    deepContext: 'Di era informasi digital yang melimpah, berpikir kritis melindungi kita dari hoaks, misinformasi, dan kesesatan berpikir (logical fallacies).',
    example: 'Memeriksa tanggal publikasi, sumber rujukan resmi, dan bukti ilmiah sebelum membagikan berita sensasional.',
    funFact: 'Filsuf Yunani Kuno Sokrates melatih berpikir kritis dengan metode bertanya beruntun (Socratic Questioning) untuk menguji asumsi tersembunyi.',
    relatedTerms: ['Scientific Method (Metode Ilmiah)', 'Metacognition (Metakognisi)', 'Cognitive Bias (Bias Kognitif)']
  },
  {
    id: 'dict-phil-4',
    term: 'Stoicism (Stoikisme)',
    pronunciation: '/ˈstoʊɪsɪzəm/',
    discipline: 'philosophy',
    zone: 'history',
    tag: 'Filsafat Klasik',
    definition: 'Aliran filsafat Yunani-Romawi yang mengajarkan ketenangan batin, kebijaksanaan, dan ketangguhan mental dengan memfokuskan energi hanya pada hal-hal yang berada dalam kendali kita.',
    deepContext: 'Dikembangkan oleh Zeno dari Citium, Epictetus, Seneca, dan Kaisar Marcus Aurelius, prinsip utama Stoikisme adalah Dikotomi Kendali: bedakan antara pikiran/tindakan kita sendiri dengan peristiwa luar.',
    example: 'Kita tidak bisa mengendalikan cuaca atau kesulitan soal ujian, tetapi kita sepenuhnya mengendalikan usaha belajar dan sikap tenang kita.',
    funFact: 'Buku catatan pribadi Kaisar Romawi Marcus Aurelius berjudul "Meditations" ditulis bukan untuk diterbitkan, melainkan sebagai pengingat harian bagi dirinya sendiri!',
    relatedTerms: ['Growth Mindset (Pola Pikir Bertumbuh)', 'Critical Thinking (Berpikir Kritis)', 'Opportunity Cost (Biaya Peluang)']
  },
  {
    id: 'dict-phil-5',
    term: 'Cognitive Bias (Bias Kognitif)',
    pronunciation: '/ˈkɒɡnɪtɪv ˈbaɪəs/',
    discipline: 'philosophy',
    zone: 'modern',
    tag: 'Psikologi Kognitif',
    definition: 'Pola penyimpangan sistematis dalam pengambilan keputusan dan penilaian rasional akibat jalan pintas mental otak (heuristik) yang sering kali tidak kita sadari.',
    deepContext: 'Contoh terkenal meliputi Confirmation Bias (kecenderungan hanya mencari informasi yang mendukung keyakinan awal kita) dan Dunning-Kruger Effect.',
    example: 'Mengenali bias konfirmasi mendorong kita membaca argumen dari dua sudut pandang sebelum menarik kesimpulan.',
    funFact: 'Psikolog Daniel Kahneman memenangkan Hadiah Nobel Ekonomi atas penelitiannya mengenai cara otak berpikir cepat (Sistem 1) dan berpikir analitis lambat (Sistem 2)!',
    relatedTerms: ['Critical Thinking (Berpikir Kritis)', 'Metacognition (Metakognisi)', 'Machine Learning']
  }
];

// ============================================================================
// 3. VERIFIED BILINGUAL LEARNING CONTENT DATABASE (6 ZONES x MULTI-DIFFICULTY)
// ============================================================================
const QUESTION_BANK = [
  // --- LANGUAGE KINGDOM ---
  {
    id: 'lang-001',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Vocabulary',
    subtopic: 'Synonyms',
    difficulty: 'Beginner',
    question: {
      en: 'Which word is a synonym for "Benevolent"?',
      id: 'Kata bahasa Inggris manakah yang merupakan sinonim dari "Benevolent" (baik hati)?'
    },
    options: {
      en: ['Kind and generous', 'Angry and loud', 'Extremely tired', 'Very fast'],
      id: ['Kind and generous (Baik & dermawan)', 'Angry and loud (Marah & keras)', 'Extremely tired (Sangat lelah)', 'Very fast (Sangat cepat)']
    },
    correctAnswer: 0,
    explanation: {
      en: '"Benevolent" describes someone who is well-meaning, kind, and generous toward others.',
      id: '"Benevolent" menggambarkan seseorang yang berniat baik, ramah, dan dermawan kepada sesama.'
    },
    funFact: {
      en: 'The word comes from Latin "bene" (well) + "volens" (wishing), literally meaning "wishing well".',
      id: 'Kata ini berasal dari bahasa Latin "bene" (baik) + "volens" (berharap), yang berarti "mendoakan kebaikan".'
    },
    learningTip: {
      en: 'Look for the prefix "bene-" in English words like "benefit" or "beneficial"—it almost always signals something good!',
      id: 'Perhatikan awalan "bene-" pada kata bahasa Inggris seperti "benefit"—hampir selalu bermakna sesuatu yang baik!'
    },
    learningObjective: 'Identify positive character adjectives and Latin roots',
    reference: 'Oxford Learner’s Dictionary'
  },
  {
    id: 'lang-002',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Tenses',
    subtopic: 'Present Perfect',
    difficulty: 'Elementary',
    question: {
      en: 'Complete the sentence: "She _____ in Jakarta since 2021."',
      id: 'Lengkapi kalimat berikut: "She _____ in Jakarta since 2021."'
    },
    options: {
      en: ['has lived', 'is living', 'lived', 'will live'],
      id: ['has lived', 'is living', 'lived', 'will live']
    },
    correctAnswer: 0,
    explanation: {
      en: 'We use the Present Perfect tense ("has lived") with "since" to describe an action that started in the past and continues into the present.',
      id: 'Kita menggunakan Present Perfect tense ("has lived") bersama kata "since" untuk menyatakan kejadian yang dimulai di masa lalu dan masih berlanjut hingga sekarang.'
    },
    funFact: {
      en: '"Since" points to a specific starting time (e.g., 2021), while "for" measures duration (e.g., for 5 years).',
      id: '"Since" menunjuk titik awal waktu (misal: 2021), sedangkan "for" mengukur durasi waktu (misal: for 5 years).'
    },
    learningTip: {
      en: 'Whenever you see "since + year", check for "has/have + past participle (V3)".',
      id: 'Setiap kali melihat "since + tahun", periksa bentuk "has/have + kata kerja bentuk ketiga (V3)".'
    },
    learningObjective: 'Apply Present Perfect tense with time markers',
    reference: 'Cambridge English Grammar in Use'
  },
  {
    id: 'lang-003',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Grammar',
    subtopic: 'Conditionals',
    difficulty: 'Intermediate',
    question: {
      en: 'Choose the correct Second Conditional form: "If I _____ wings, I would fly over the clouds."',
      id: 'Pilih bentuk Second Conditional yang tepat: "If I _____ wings, I would fly over the clouds."'
    },
    options: {
      en: ['had', 'have', 'will have', 'having'],
      id: ['had', 'have', 'will have', 'having']
    },
    correctAnswer: 0,
    explanation: {
      en: 'The Second Conditional uses "If + Simple Past (had)" + "would + base verb" to express imaginary or unlikely situations in the present.',
      id: 'Second Conditional menggunakan pola "If + Simple Past (had)" + "would + verb dasar" untuk menyatakan khayalan atau situasi tidak nyata saat ini.'
    },
    funFact: {
      en: 'In formal English, "were" is often used instead of "was" in hypothetical clauses: "If I were a bird..."',
      id: 'Dalam bahasa Inggris formal, "were" sering digunakan menggantikan "was" pada kalimat pengandaian: "If I were a bird..."'
    },
    learningTip: {
      en: 'Match "would + verb" in the main clause with Past Simple in the "If" clause.',
      id: 'Pasangkan "would + verb" di induk kalimat dengan bentuk Past Simple di anak kalimat "If".'
    },
    learningObjective: 'Construct hypothetical conditional sentences',
    reference: 'British Council Grammar Reference'
  },
  {
    id: 'lang-004',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Sentence Structure',
    subtopic: 'Idioms & Metaphors',
    difficulty: 'Advanced',
    question: {
      en: 'What does the idiom "to burn the midnight oil" mean?',
      id: 'Apa makna ungkapan idiom bahasa Inggris "to burn the midnight oil"?'
    },
    options: {
      en: ['To study or work late into the night', 'To waste precious fuel', 'To cook a late dinner', 'To start a campfire'],
      id: ['Belajar atau bekerja hingga larut malam', 'Membuang bahan bakar dengan sia-sia', 'Memasak makan malam terlambat', 'Menyalakan api unggun']
    },
    correctAnswer: 0,
    explanation: {
      en: '"Burning the midnight oil" means staying up late to read, study, or work diligently.',
      id: '"Burning the midnight oil" berarti begadang hingga larut malam untuk membaca, belajar, atau bekerja dengan tekun.'
    },
    funFact: {
      en: 'Before electric lightbulbs were invented, scholars used oil lamps to read at night!',
      id: 'Sebelum lampu listrik ditemukan, para cendekiawan menggunakan lampu minyak untuk membaca di malam hari!'
    },
    learningTip: {
      en: 'Visualize historical daily life to decode English idioms effortlessly.',
      id: 'Bayangkan kehidupan sehari-hari di masa lampau untuk memahami arti idiom bahasa Inggris dengan mudah.'
    },
    learningObjective: 'Interpret figurative idioms in context',
    reference: 'Merriam-Webster Idioms Dictionary'
  },
  {
    id: 'lang-005',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Vocabulary',
    subtopic: 'Academic Verbs',
    difficulty: 'Elementary',
    question: {
      en: 'Which word means "to examine something carefully in order to understand it"?',
      id: 'Kata bahasa Inggris manakah yang berarti "memeriksa sesuatu secara saksama untuk memahaminya"?'
    },
    options: {
      en: ['Analyze', 'Ignore', 'Postpone', 'Scatter'],
      id: ['Analyze (Menganalisis)', 'Ignore (Mengabaikan)', 'Postpone (Menunda)', 'Scatter (Menyebarkan)']
    },
    correctAnswer: 0,
    explanation: {
      en: '"Analyze" means to break down information or a problem into parts to study it thoroughly.',
      id: '"Analyze" berarti menguraikan informasi atau masalah menjadi bagian-bagian untuk dipelajari secara mendalam.'
    },
    funFact: {
      en: 'The noun form is "analysis" (singular) and "analyses" (plural, pronounced /əˈnælɪsiːz/).',
      id: 'Bentuk kata bendanya adalah "analysis" (tunggal) dan "analyses" (jamak).'
    },
    learningTip: {
      en: 'Academic verbs like analyze, evaluate, and synthesize appear frequently in reading exams.',
      id: 'Kata kerja akademik seperti analyze, evaluate, dan synthesize sangat sering muncul dalam tes pemahaman bacaan.'
    },
    learningObjective: 'Master high-frequency academic vocabulary',
    reference: 'Academic Word List (Coxhead)'
  },
  {
    id: 'lang-006',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Grammar',
    subtopic: 'Passive Voice',
    difficulty: 'Intermediate',
    question: {
      en: 'Convert to Passive Voice: "The ancient scribes wrote the scrolls."',
      id: 'Ubah ke bentuk kalimat pasif (Passive Voice): "The ancient scribes wrote the scrolls."'
    },
    options: {
      en: ['The scrolls were written by the ancient scribes.', 'The scrolls was written by the ancient scribes.', 'The scrolls are writing by the ancient scribes.', 'The scrolls written by the ancient scribes.'],
      id: ['The scrolls were written by the ancient scribes.', 'The scrolls was written by the ancient scribes.', 'The scrolls are writing by the ancient scribes.', 'The scrolls written by the ancient scribes.']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Because "wrote" is Past Simple and "the scrolls" is plural, we use "were + past participle (written)".',
      id: 'Karena "wrote" adalah Past Simple dan subjek "the scrolls" berbentuk jamak, gunakan "were + Verb-3 (written)".'
    },
    funFact: {
      en: 'Passive voice is widely used in scientific reports to keep the focus on the experiment rather than the researcher.',
      id: 'Kalimat pasif banyak digunakan dalam laporan ilmiah agar fokus tertuju pada eksperimen, bukan penelitinya.'
    },
    learningTip: {
      en: 'Check two things in passive voice: the tense of "to be" and whether the new subject is singular or plural.',
      id: 'Periksa dua hal dalam kalimat pasif: bentuk waktu "to be" dan apakah subjek barunya tunggal atau jamak.'
    },
    learningObjective: 'Transform active sentences into accurate passive constructions',
    reference: 'Cambridge English Grammar in Use'
  },
  {
    id: 'lang-007',
    zone: 'language',
    subject: 'Language Kingdom',
    topic: 'Reading',
    subtopic: 'Inference & Tone',
    difficulty: 'Expert',
    question: {
      en: 'In literary analysis, what is an "oxymoron"?',
      id: 'Dalam analisis sastra bahasa Inggris, apakah yang dimaksud dengan majas "oxymoron"?'
    },
    options: {
      en: ['A figure of speech combining two contradictory terms (e.g., "deafening silence")', 'A rhyme at the end of every stanza', 'An exaggeration used for humor', 'A direct comparison using "like" or "as"'],
      id: ['Gaya bahasa yang menggabungkan dua kata berlawanan makna (contoh: "deafening silence")', 'Rima di akhir setiap bait puisi', 'Pernyataan berlebih-lebihan untuk humor', 'Perbandingan langsung memakai kata "like" atau "as"']
    },
    correctAnswer: 0,
    explanation: {
      en: 'An oxymoron pairs opposite words together—such as "bittersweet" or "living history"—to create dramatic or poetic effect.',
      id: 'Oxymoron memasangkan dua kata yang bertentangan—seperti "bittersweet" (pahit-manis)—untuk menciptakan efek puitis.'
    },
    funFact: {
      en: 'William Shakespeare was famous for oxymorons, writing "parting is such sweet sorrow" in Romeo and Juliet.',
      id: 'William Shakespeare terkenal sering memakai oxymoron, seperti ungkapan "sweet sorrow" dalam karya Romeo and Juliet.'
    },
    learningTip: {
      en: 'Spot oxymorons by looking for an adjective that seems to contradict the noun right beside it.',
      id: 'Kenali oxymoron dengan mencari kata sifat yang tampak bertentangan dengan kata benda tepat di sebelahnya.'
    },
    learningObjective: 'Identify advanced rhetorical and literary devices',
    reference: 'Oxford Dictionary of Literary Terms'
  },

  // --- MATHEMATICS WORLD ---
  {
    id: 'math-basic-add',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Addition (Penjumlahan)',
    subtopic: 'Basic Arithmetic',
    difficulty: 'Beginner',
    question: {
      en: 'An explorer collects 47 starlight gems in the morning and 36 more in the afternoon. How many gems does the explorer have in total?',
      id: 'Seorang penjelajah mengumpulkan 47 permata cahaya di pagi hari dan 36 permata lagi di sore hari. Berapa total permata seluruhnya?'
    },
    options: {
      en: ['83', '73', '93', '81'],
      id: ['83', '73', '93', '81']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Add the tens and ones: (40 + 30) + (7 + 6) = 70 + 13 = 83 gems.',
      id: 'Jumlahkan puluhan dan satuannya: (40 + 30) + (7 + 6) = 70 + 13 = 83 permata.'
    },
    funFact: {
      en: 'Addition is commutative: 47 + 36 gives the exact same sum as 36 + 47!',
      id: 'Penjumlahan bersifat komutatif: 47 + 36 menghasilkan nilai yang sama persis dengan 36 + 47!'
    },
    learningTip: {
      en: 'Break two-digit addition into tens first (40 + 30 = 70), then add the ones (7 + 6 = 13).',
      id: 'Pecah penjumlahan dua angka menjadi puluhan terlebih dahulu (40 + 30 = 70), lalu tambahkan satuannya (7 + 6 = 13).'
    },
    learningObjective: 'Perform two-digit mental addition accurately',
    reference: 'Foundational Arithmetic Curriculum'
  },
  {
    id: 'math-basic-sub',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Subtraction (Pengurangan)',
    subtopic: 'Basic Arithmetic',
    difficulty: 'Beginner',
    question: {
      en: 'A caravan starts with 92 rations of water and uses 38 rations while crossing the desert. How many rations remain?',
      id: 'Sebuah kafilah membawa 92 persediaan air dan menggunakan 38 persediaan saat melintasi gurun. Berapa persediaan air yang tersisa?'
    },
    options: {
      en: ['54', '64', '56', '44'],
      id: ['54', '64', '56', '44']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Subtract 38 from 92: 92 − 30 = 62, then 62 − 8 = 54 remaining rations.',
      id: 'Kurangi 92 dengan 38: 92 − 30 = 62, lalu 62 − 8 = 54 persediaan air yang tersisa.'
    },
    funFact: {
      en: 'You can always verify subtraction by adding your answer back: 54 + 38 = 92!',
      id: 'Kamu selalu bisa mengecek hasil pengurangan dengan penjumlahan balik: 54 + 38 = 92!'
    },
    learningTip: {
      en: 'Subtract the tens first (92 − 30 = 62) and then subtract the remaining ones (62 − 8 = 54).',
      id: 'Kurangi puluhannya terlebih dahulu (92 − 30 = 62) lalu kurangi sisa satuannya (62 − 8 = 54).'
    },
    learningObjective: 'Perform two-digit subtraction with regrouping',
    reference: 'Foundational Arithmetic Curriculum'
  },
  {
    id: 'math-basic-div',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Division (Pembagian)',
    subtopic: 'Basic Arithmetic',
    difficulty: 'Beginner',
    question: {
      en: 'If 63 ancient gold coins are shared equally among 9 explorers, how many coins does each explorer receive?',
      id: 'Jika 63 koin emas kuno dibagikan sama rata kepada 9 penjelajah, berapa koin yang diterima setiap penjelajah?'
    },
    options: {
      en: ['7', '6', '8', '9'],
      id: ['7', '6', '8', '9']
    },
    correctAnswer: 0,
    explanation: {
      en: '63 ÷ 9 = 7, because 9 groups of 7 equal 63 (9 × 7 = 63).',
      id: '63 ÷ 9 = 7, karena 9 kelompok berisi 7 sama dengan 63 (9 × 7 = 63).'
    },
    funFact: {
      en: 'Division is the exact inverse operation of multiplication!',
      id: 'Pembagian adalah operasi kebalikan (invers) dari perkalian!'
    },
    learningTip: {
      en: 'Turn division into a missing-factor question: "9 times what number equals 63?"',
      id: 'Ubah soal pembagian menjadi pertanyaan perkalian: "9 dikali berapa yang hasilnya 63?"'
    },
    learningObjective: 'Solve basic division problems using multiplication facts',
    reference: 'Foundational Arithmetic Curriculum'
  },
  {
    id: 'math-001',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Arithmetic',
    subtopic: 'Multiplication',
    difficulty: 'Beginner',
    question: {
      en: 'A treasure chest holds 8 pouches, and each pouch contains 7 gold coins. How many coins are there in total?',
      id: 'Sebuah peti harta karun berisi 8 kantong, dan setiap kantong berisi 7 koin emas. Berapa total koin seluruhnya?'
    },
    options: {
      en: ['56', '54', '63', '48'],
      id: ['56', '54', '63', '48']
    },
    correctAnswer: 0,
    explanation: {
      en: '8 groups of 7 equals 8 × 7 = 56 gold coins.',
      id: '8 kelompok berisi 7 sama dengan 8 × 7 = 56 koin emas.'
    },
    funFact: {
      en: 'Notice the pattern: 5, 6, 7, 8 → 56 = 7 × 8! That is an easy memory trick.',
      id: 'Perhatikan pola berurutannya: 5, 6, 7, 8 → 56 = 7 × 8! Trik mudah untuk diingat.'
    },
    learningTip: {
      en: 'You can also break 8 × 7 into (8 × 5) + (8 × 2) = 40 + 16 = 56.',
      id: 'Kamu juga bisa memecah 8 × 7 menjadi (8 × 5) + (8 × 2) = 40 + 16 = 56.'
    },
    learningObjective: 'Solve real-world single-digit multiplication problems',
    reference: 'Foundational Arithmetic Curriculum'
  },
  {
    id: 'math-002',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Fractions',
    subtopic: 'Percentages & Fractions',
    difficulty: 'Elementary',
    question: {
      en: 'If an explorer drinks 3/4 of a magic potion bottle, what percentage of the potion was consumed?',
      id: 'Jika seorang penjelajah meminum 3/4 bagian botol ramuan, berapa persen ramuan yang telah diminum?'
    },
    options: {
      en: ['75%', '25%', '60%', '80%'],
      id: ['75%', '25%', '60%', '80%']
    },
    correctAnswer: 0,
    explanation: {
      en: '3/4 equals 0.75. Multiply by 100 to convert to a percentage: 0.75 × 100 = 75%.',
      id: '3/4 sama dengan 0,75. Kalikan dengan 100 untuk mengubah ke persen: 0,75 × 100 = 75%.'
    },
    funFact: {
      en: 'The word "percent" comes from Latin "per centum", meaning "by the hundred".',
      id: 'Kata "persen" berasal dari bahasa Latin "per centum" yang berarti "per seratus".'
    },
    learningTip: {
      en: 'Think of quarters in a dollar: 1 quarter = 25%, 2 quarters = 50%, 3 quarters = 75%.',
      id: 'Bayangkan pecahan seperempat: 1/4 = 25%, 2/4 = 50%, 3/4 = 75%.'
    },
    learningObjective: 'Convert common fractions into percentages',
    reference: 'NCTM Number & Operations Standards'
  },
  {
    id: 'math-003',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Algebra',
    subtopic: 'Linear Equations',
    difficulty: 'Intermediate',
    question: {
      en: 'Solve for x: 3x + 5 = 20',
      id: 'Tentukan nilai x dari persamaan: 3x + 5 = 20'
    },
    options: {
      en: ['x = 5', 'x = 15', 'x = 4', 'x = 8'],
      id: ['x = 5', 'x = 15', 'x = 4', 'x = 8']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Subtract 5 from both sides: 3x = 15. Then divide both sides by 3: x = 15 ÷ 3 = 5.',
      id: 'Kurangi kedua ruas dengan 5: 3x = 15. Lalu bagi kedua ruas dengan 3: x = 15 ÷ 3 = 5.'
    },
    funFact: {
      en: 'The word "Algebra" comes from the Arabic treatise "Al-Jabr" written by mathematician Al-Khwarizmi in the 9th century.',
      id: 'Kata "Aljabar" berasal dari kitab "Al-Jabr" karya matematikawan Al-Khwarizmi pada abad ke-9.'
    },
    learningTip: {
      en: 'Always undo addition/subtraction first before undoing multiplication/division when isolating x.',
      id: 'Selalu selesaikan penjumlahan/pengurangan terlebih dahulu sebelum perkalian/pembagian saat mencari x.'
    },
    learningObjective: 'Solve two-step linear equations in one variable',
    reference: 'Algebra I Core Foundations'
  },
  {
    id: 'math-004',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Geometry',
    subtopic: 'Pythagorean Theorem',
    difficulty: 'Advanced',
    question: {
      en: 'A right triangle has legs of length 6 cm and 8 cm. What is the length of its hypotenuse?',
      id: 'Sebuah segitiga siku-siku memiliki sisi tegak 6 cm dan 8 cm. Berapa panjang sisi miringnya (hipotenusa)?'
    },
    options: {
      en: ['10 cm', '14 cm', '12 cm', '48 cm'],
      id: ['10 cm', '14 cm', '12 cm', '48 cm']
    },
    correctAnswer: 0,
    explanation: {
      en: 'By the Pythagorean theorem, a² + b² = c². So 6² + 8² = 36 + 64 = 100, and √100 = 10 cm.',
      id: 'Berdasarkan teorema Pythagoras, a² + b² = c². Jadi 6² + 8² = 36 + 64 = 100, dan √100 = 10 cm.'
    },
    funFact: {
      en: '(6, 8, 10) is a scaled version of the famous (3, 4, 5) Pythagorean triple!',
      id: '(6, 8, 10) adalah kelipatan dua dari tripel Pythagoras terkenal (3, 4, 5)!'
    },
    learningTip: {
      en: 'Memorize common Pythagorean triples like (3,4,5) and (5,12,13) to solve geometry puzzles rapidly.',
      id: 'Hafalkan tripel Pythagoras umum seperti (3,4,5) dan (5,12,13) untuk menyelesaikan soal geometri dengan cepat.'
    },
    learningObjective: 'Apply the Pythagorean theorem to find missing side lengths',
    reference: 'Euclidean Geometry Essentials'
  },
  {
    id: 'math-005',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Probability',
    subtopic: 'Basic Probability',
    difficulty: 'Elementary',
    question: {
      en: 'A bag holds 3 red gems, 5 blue gems, and 2 gold gems. What is the probability of drawing a gold gem at random?',
      id: 'Sebuah kantong berisi 3 permata merah, 5 permata biru, dan 2 permata emas. Berapa peluang terambilnya permata emas secara acak?'
    },
    options: {
      en: ['20% (2/10)', '50% (5/10)', '30% (3/10)', '10% (1/10)'],
      id: ['20% (2/10)', '50% (5/10)', '30% (3/10)', '10% (1/10)']
    },
    correctAnswer: 0,
    explanation: {
      en: 'There are 3 + 5 + 2 = 10 gems in total. With 2 gold gems, the probability is 2/10 = 1/5 = 20%.',
      id: 'Total ada 3 + 5 + 2 = 10 permata. Dengan 2 permata emas, peluangnya adalah 2/10 = 1/5 = 20%.'
    },
    funFact: {
      en: 'The sum of probabilities of all possible outcomes in any experiment always equals 1 (or 100%).',
      id: 'Jumlah peluang dari seluruh kemungkinan hasil dalam suatu percobaan selalu sama dengan 1 (atau 100%).'
    },
    learningTip: {
      en: 'Probability = (Number of favorable outcomes) ÷ (Total possible outcomes).',
      id: 'Peluang = (Jumlah kejadian yang diharapkan) ÷ (Total seluruh kemungkinan kejadian).'
    },
    learningObjective: 'Calculate simple theoretical probabilities',
    reference: 'NCTM Data Analysis & Probability'
  },
  {
    id: 'math-006',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Geometry',
    subtopic: 'Circle Area',
    difficulty: 'Intermediate',
    question: {
      en: 'A circular observatory dome has a radius of 7 meters. Using π ≈ 22/7, what is the area of its circular floor?',
      id: 'Kubah observatorium berbentuk lingkaran memiliki jari-jari 7 meter. Dengan π ≈ 22/7, berapakah luas lantainya?'
    },
    options: {
      en: ['154 m²', '44 m²', '49 m²', '308 m²'],
      id: ['154 m²', '44 m²', '49 m²', '308 m²']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Area of a circle = π × r² = (22/7) × 7 × 7 = 22 × 7 = 154 m².',
      id: 'Luas lingkaran = π × r² = (22/7) × 7 × 7 = 22 × 7 = 154 m².'
    },
    funFact: {
      en: '44 meters is the circumference (2πr), whereas 154 m² is the area (πr²)—a classic geometry distinction!',
      id: '44 meter adalah keliling lingkaran (2πr), sedangkan 154 m² adalah luasnya (πr²)!'
    },
    learningTip: {
      en: 'Whenever radius is a multiple of 7, using π ≈ 22/7 cancels the denominator cleanly.',
      id: 'Setiap kali jari-jari merupakan kelipatan 7, gunakan π ≈ 22/7 agar penyebutnya mudah disederhanakan.'
    },
    learningObjective: 'Compute the area of a circle using radius',
    reference: 'Euclidean Geometry Essentials'
  },
  {
    id: 'math-007',
    zone: 'math',
    subject: 'Mathematics World',
    topic: 'Algebra',
    subtopic: 'Logarithms & Exponents',
    difficulty: 'Expert',
    question: {
      en: 'What is the value of log₂(32) + log₁₀(100)?',
      id: 'Berapakah nilai dari log₂(32) + log₁₀(100)?'
    },
    options: {
      en: ['7', '5', '12', '34'],
      id: ['7', '5', '12', '34']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Since 2⁵ = 32, log₂(32) = 5. Since 10² = 100, log₁₀(100) = 2. Therefore, 5 + 2 = 7.',
      id: 'Karena 2⁵ = 32, maka log₂(32) = 5. Karena 10² = 100, maka log₁₀(100) = 2. Jadi 5 + 2 = 7.'
    },
    funFact: {
      en: 'Scottish mathematician John Napier invented logarithms in 1614 to help astronomers multiply huge numbers faster.',
      id: 'Matematikawan Skotlandia John Napier menemukan logaritma pada 1614 untuk membantu astronom menghitung angka raksasa.'
    },
    learningTip: {
      en: 'Rewrite log_b(x) = y as b^y = x whenever solving logarithmic expressions.',
      id: 'Ubah bentuk log_b(x) = y menjadi b^y = x setiap kali menyelesaikan soal logaritma.'
    },
    learningObjective: 'Evaluate logarithmic expressions using exponential equivalents',
    reference: 'Precalculus & Advanced Algebra'
  },

  // --- HISTORY CIVILIZATION ---
  {
    id: 'hist-001',
    zone: 'history',
    subject: 'History Civilization',
    topic: 'Ancient Civilizations',
    subtopic: 'Ancient Egypt',
    difficulty: 'Beginner',
    question: {
      en: 'Which great river made agriculture and civilization flourish in Ancient Egypt?',
      id: 'Sungai besar manakah yang membuat pertanian dan peradaban Mesir Kuno berkembang pesat?'
    },
    options: {
      en: ['The Nile River', 'The Amazon River', 'The Thames River', 'The Danube River'],
      id: ['Sungai Nil', 'Sungai Amazon', 'Sungai Thames', 'Sungai Danube']
    },
    correctAnswer: 0,
    explanation: {
      en: 'The annual flooding of the Nile River deposited rich, fertile silt across the desert valley, enabling Ancient Egypt to thrive.',
      id: 'Banjir tahunan Sungai Nil mengendapkan lumpur subur di lembah gurun, memungkinkan peradaban Mesir Kuno berkembang makmur.'
    },
    funFact: {
      en: 'Ancient Greek historian Herodotus famously called Egypt "the Gift of the Nile".',
      id: 'Sejarawan Yunani Kuno Herodotus menjuluki Mesir sebagai "Hadiah dari Sungai Nil".'
    },
    learningTip: {
      en: 'Almost all early civilizations (Egypt, Mesopotamia, Indus Valley, Yellow River) grew beside major rivers.',
      id: 'Hampir semua peradaban kuno (Mesir, Mesopotamia, Lembah Indus, Sungai Kuning) tumbuh di tepi sungai besar.'
    },
    learningObjective: 'Understand the geographic foundations of Ancient Egypt',
    reference: 'UNESCO World Heritage & Ancient History'
  },
  {
    id: 'hist-002',
    zone: 'history',
    subject: 'History Civilization',
    topic: 'Indonesian History',
    subtopic: 'Nusantara Kingdoms',
    difficulty: 'Elementary',
    question: {
      en: 'Which great maritime empire centered in Sumatra controlled key trade routes across Southeast Asia from the 7th to 11th centuries?',
      id: 'Kerajaan maritim besar manakah yang berpusat di Sumatra dan menguasai jalur perdagangan Asia Tenggara pada abad ke-7 hingga ke-11?'
    },
    options: {
      en: ['Srivijaya (Sriwijaya)', 'Mataram Islam', 'Tarumanagara', 'Kutai'],
      id: ['Sriwijaya', 'Mataram Islam', 'Tarumanagara', 'Kutai']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Srivijaya, based near Palembang in South Sumatra, was a powerful naval and Buddhist learning center controlling the Strait of Malacca.',
      id: 'Sriwijaya, yang berpusat di sekitar Palembang, Sumatra Selatan, adalah kerajaan maritim kuat dan pusat pembelajaran Buddha yang menguasai Selat Malaka.'
    },
    funFact: {
      en: 'Chinese scholar I-Tsing visited Srivijaya in 671 CE and praised its over 1,000 Buddhist scholars!',
      id: 'Pendeta Tiongkok I-Tsing mengunjungi Sriwijaya pada tahun 671 M dan memuji keberadaan lebih dari 1.000 cendekiawan di sana!'
    },
    learningTip: {
      en: 'Remember Srivijaya = Maritime & Sumatra; Majapahit = Archipelago unification & East Java.',
      id: 'Ingat Sriwijaya = Kerajaan Maritim di Sumatra; Majapahit = Kemaharajaan Nusantara di Jawa Timur.'
    },
    learningObjective: 'Identify major maritime kingdoms in Indonesian history',
    reference: 'Sejarah Nasional Indonesia'
  },
  {
    id: 'hist-003',
    zone: 'history',
    subject: 'History Civilization',
    topic: 'Discoveries',
    subtopic: 'Printing Press',
    difficulty: 'Intermediate',
    question: {
      en: 'Who introduced the mechanical movable-type printing press to Europe around 1440, revolutionizing access to books?',
      id: 'Siapakah yang memperkenalkan mesin cetak huruf bergerak di Eropa sekitar tahun 1440 sehingga merevolusi penyebaran buku?'
    },
    options: {
      en: ['Johannes Gutenberg', 'Leonardo da Vinci', 'Galileo Galilei', 'Marco Polo'],
      id: ['Johannes Gutenberg', 'Leonardo da Vinci', 'Galileo Galilei', 'Marco Polo']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Johannes Gutenberg developed the movable-type printing press in Mainz, Germany, dramatically lowering the cost of producing books.',
      id: 'Johannes Gutenberg mengembangkan mesin cetak huruf bergerak di Mainz, Jerman, yang menurunkan biaya produksi buku secara drastis.'
    },
    funFact: {
      en: 'Movable type using clay and metal had actually been invented centuries earlier in China by Bi Sheng and in Korea!',
      id: 'Huruf cetak bergerak berbahan tanah liat dan logam sebenarnya telah ditemukan lebih awal di Tiongkok oleh Bi Sheng dan di Korea!'
    },
    learningTip: {
      en: 'Link Gutenberg to the rapid spread of Renaissance ideas and scientific literacy.',
      id: 'Hubungkan penemuan Gutenberg dengan pesatnya penyebaran ilmu pengetahuan masa Renaisans.'
    },
    learningObjective: 'Analyze technological turning points in world history',
    reference: 'World History Encyclopedia'
  },
  {
    id: 'hist-004',
    zone: 'history',
    subject: 'History Civilization',
    topic: 'Ancient Civilizations',
    subtopic: 'Ancient Greece',
    difficulty: 'Elementary',
    question: {
      en: 'Which ancient Greek city-state is widely recognized as the birthplace of early democracy?',
      id: 'Negara-kota (polis) Yunani Kuno manakah yang dikenal luas sebagai tempat lahirnya demokrasi awal?'
    },
    options: {
      en: ['Athens', 'Sparta', 'Troy', 'Babylon'],
      id: ['Athena', 'Sparta', 'Troya', 'Babilonia']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Around 508 BCE, Athens developed a system of direct democracy where citizens gathered to debate and vote on laws.',
      id: 'Sekitar tahun 508 SM, Athena mengembangkan sistem demokrasi langsung di mana warga berkumpul untuk berdebat dan memilih undang-undang.'
    },
    funFact: {
      en: 'The word "democracy" comes from Greek "demos" (the people) + "kratos" (power or rule).',
      id: 'Kata "demokrasi" berasal dari bahasa Yunani "demos" (rakyat) + "kratos" (kekuasaan).'
    },
    learningTip: {
      en: 'Contrast Athens (philosophy, arts, democracy) with Sparta (military discipline and warrior society).',
      id: 'Bandingkan Athena (filsafat, seni, demokrasi) dengan Sparta (disiplin militer dan masyarakat prajurit).'
    },
    learningObjective: 'Compare political systems of Ancient Greek city-states',
    reference: 'World History Encyclopedia'
  },
  {
    id: 'hist-005',
    zone: 'history',
    subject: 'History Civilization',
    topic: 'Indonesian History',
    subtopic: 'National Awakening',
    difficulty: 'Advanced',
    question: {
      en: 'What historic pledge was declared by Indonesian youth organizations on October 28, 1928?',
      id: 'Ikrar bersejarah apakah yang diucapkan oleh organisasi pemuda Indonesia pada tanggal 28 Oktober 1928?'
    },
    options: {
      en: ['Sumpah Pemuda (Youth Pledge)', 'Deklarasi Djuanda', 'Konferensi Asia-Afrika', 'Supersemar'],
      id: ['Sumpah Pemuda', 'Deklarasi Djuanda', 'Konferensi Asia-Afrika', 'Supersemar']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Sumpah Pemuda united regional youth movements behind one homeland, one nation, and one unifying language: Bahasa Indonesia.',
      id: 'Sumpah Pemuda menyatukan gerakan pemuda daerah dalam satu tanah air, satu bangsa, dan satu bahasa persatuan: Bahasa Indonesia.'
    },
    funFact: {
      en: 'During the Second Youth Congress in 1928, W.R. Supratman first performed the melody of "Indonesia Raya" on his violin.',
      id: 'Pada Kongres Pemuda II tahun 1928, W.R. Supratman pertama kali memperdengarkan melodi lagu "Indonesia Raya" dengan biolanya.'
    },
    learningTip: {
      en: 'Key dates in Indonesian independence history: 1908 (Budi Utomo), 1928 (Sumpah Pemuda), 1945 (Proklamasi).',
      id: 'Tanggal kunci sejarah Indonesia: 1908 (Budi Utomo), 1928 (Sumpah Pemuda), 1945 (Proklamasi).'
    },
    learningObjective: 'Trace milestones of Indonesian national unity',
    reference: 'Museum Sumpah Pemuda & Sejarah Nasional Indonesia'
  },

  // --- SCIENCE UNIVERSE ---
  {
    id: 'sci-001',
    zone: 'science',
    subject: 'Science Universe',
    topic: 'Solar System',
    subtopic: 'Planets',
    difficulty: 'Beginner',
    question: {
      en: 'Which planet in our Solar System is known as the "Red Planet" due to iron oxide on its surface?',
      id: 'Planet manakah di Tata Surya kita yang dijuluki "Planet Merah" karena kandungan besi oksida di permukaannya?'
    },
    options: {
      en: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
      id: ['Mars', 'Venus', 'Jupiter', 'Merkurius']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Mars appears reddish because its soil contains abundant iron oxide—commonly known as rust.',
      id: 'Mars tampak kemerahan karena tanahnya mengandung banyak besi oksida—yang biasa dikenal sebagai karat.'
    },
    funFact: {
      en: 'Mars is home to Olympus Mons, the largest volcano in the entire Solar System—nearly 3 times taller than Mount Everest!',
      id: 'Mars memiliki Olympus Mons, gunung berapi terbesar di Tata Surya—tingginya hampir 3 kali Gunung Everest!'
    },
    learningTip: {
      en: 'Order of planets from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
      id: 'Urutan planet dari Matahari: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus.'
    },
    learningObjective: 'Identify key characteristics of planets in our Solar System',
    reference: 'NASA Solar System Exploration'
  },
  {
    id: 'sci-002',
    zone: 'science',
    subject: 'Science Universe',
    topic: 'Biology',
    subtopic: 'Photosynthesis',
    difficulty: 'Elementary',
    question: {
      en: 'What gas do green plants absorb from the air to perform photosynthesis?',
      id: 'Gas apakah yang diserap tumbuhan hijau dari udara untuk melakukan fotosintesis?'
    },
    options: {
      en: ['Carbon dioxide (CO₂)', 'Nitrogen (N₂)', 'Helium (He)', 'Neon (Ne)'],
      id: ['Karbon dioksida (CO₂)', 'Nitrogen (N₂)', 'Helium (He)', 'Neon (Ne)']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Plants use sunlight energy to combine carbon dioxide (CO₂) and water (H₂O) into glucose (food) and release oxygen (O₂).',
      id: 'Tumbuhan menggunakan energi cahaya matahari untuk mengubah karbon dioksida (CO₂) dan air (H₂O) menjadi glukosa dan melepaskan oksigen (O₂).'
    },
    funFact: {
      en: 'Chlorophyll gives leaves their vibrant green color by absorbing red and blue light while reflecting green light.',
      id: 'Klorofil memberi warna hijau pada daun karena menyerap cahaya merah dan biru serta memantulkan cahaya hijau.'
    },
    learningTip: {
      en: 'Remember the swap: Humans breathe in O₂ and breathe out CO₂; plants take in CO₂ and release O₂!',
      id: 'Ingat pertukarannya: Manusia menghirup O₂ dan mengeluarkan CO₂; tumbuhan menyerap CO₂ dan menghasilkan O₂!'
    },
    learningObjective: 'Explain the inputs and outputs of photosynthesis',
    reference: 'Campbell Biology Foundations'
  },
  {
    id: 'sci-003',
    zone: 'science',
    subject: 'Science Universe',
    topic: 'Physics',
    subtopic: 'Forces & Motion',
    difficulty: 'Intermediate',
    question: {
      en: 'According to Newton’s First Law of Motion, an object at rest will stay at rest unless acted upon by what?',
      id: 'Menurut Hukum Pertama Newton tentang Gerak, benda yang diam akan tetap diam kecuali dikenai oleh apa?'
    },
    options: {
      en: ['An unbalanced external force', 'Constant temperature', 'Electrical resistance', 'Magnetic north'],
      id: ['Gaya luar yang tidak seimbang', 'Suhu yang konstan', 'Hambatan listrik', 'Arah utara magnet']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Newton’s First Law (Inertia) states that objects resist changes in their state of motion unless an unbalanced net force acts on them.',
      id: 'Hukum Pertama Newton (Inersia/Kelembaman) menyatakan benda mempertahankan keadaannya kecuali ada gaya total tak seimbang yang bekerja padanya.'
    },
    funFact: {
      en: 'In deep space where there is almost no air friction, a spacecraft can coast for millions of kilometers without firing its engines!',
      id: 'Di luar angkasa yang hampir hampa udara, wahana antariksa dapat meluncur jutaan kilometer tanpa menyalakan mesin!'
    },
    learningTip: {
      en: 'Inertia explains why you lurch forward when a car brakes suddenly—your body wants to keep moving!',
      id: 'Inersia menjelaskan mengapa tubuhmu terdorong ke depan saat mobil mengerem mendadak!'
    },
    learningObjective: 'Understand Newton’s First Law and inertia',
    reference: 'OpenStax University Physics'
  },
  {
    id: 'sci-004',
    zone: 'science',
    subject: 'Science Universe',
    topic: 'Human Body',
    subtopic: 'Circulatory System',
    difficulty: 'Elementary',
    question: {
      en: 'Which component of human blood carries oxygen from the lungs to the rest of the body?',
      id: 'Komponen darah manusia manakah yang bertugas membawa oksigen dari paru-paru ke seluruh tubuh?'
    },
    options: {
      en: ['Red blood cells (Erythrocytes)', 'Platelets', 'Blood plasma only', 'Enzymes'],
      id: ['Sel darah merah (Eritrosit)', 'Keping darah (Trombosit)', 'Plasma darah saja', 'Enzim pencernaan']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Red blood cells contain hemoglobin, an iron-rich protein that binds to oxygen in the lungs and delivers it to body tissues.',
      id: 'Sel darah merah mengandung hemoglobin, protein kaya zat besi yang mengikat oksigen di paru-paru dan mengantarkannya ke seluruh jaringan tubuh.'
    },
    funFact: {
      en: 'One single drop of human blood contains around 5 million red blood cells!',
      id: 'Satu tetes kecil darah manusia mengandung sekitar 5 juta sel darah merah!'
    },
    learningTip: {
      en: 'Red blood cells = Oxygen transport; White blood cells = Immune defense; Platelets = Blood clotting.',
      id: 'Sel darah merah = Angkut oksigen; Sel darah putih = Pertahanan imun; Trombosit = Pembekuan darah.'
    },
    learningObjective: 'Identify functions of major blood components',
    reference: 'Human Anatomy & Physiology'
  },
  {
    id: 'sci-005',
    zone: 'science',
    subject: 'Science Universe',
    topic: 'Chemistry',
    subtopic: 'States of Matter',
    difficulty: 'Advanced',
    question: {
      en: 'What is the phase transition called when a solid turns directly into a gas without passing through the liquid state?',
      id: 'Disebut apakah perubahan wujud zat ketika benda padat berubah langsung menjadi gas tanpa melewati fase cair?'
    },
    options: {
      en: ['Sublimation (Sublimasi)', 'Condensation (Kondensasi)', 'Evaporation (Penguapan)', 'Freezing (Pembekuan)'],
      id: ['Sublimasi (Sublimation)', 'Kondensasi (Condensation)', 'Penguapan (Evaporation)', 'Pembekuan (Freezing)']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Sublimation occurs when molecules gain enough energy to escape directly from a solid crystal into gas, as seen with dry ice (solid CO₂) and camphor.',
      id: 'Sublimasi terjadi ketika molekul menyerap cukup energi untuk lepas langsung dari padatan menjadi gas, seperti pada es kering (CO₂ padat) dan kapur barus.'
    },
    funFact: {
      en: 'Comets develop their glowing tails in space because frozen ices on their nucleus sublimate directly into gas as they near the Sun!',
      id: 'Komet membentuk ekor bercahaya di luar angkasa karena es beku di intinya menyublim langsung menjadi gas saat mendekati Matahari!'
    },
    learningTip: {
      en: 'Remember dry ice ("es kering")—it never melts into a wet puddle; it sublimates straight into fog!',
      id: 'Ingat es kering (dry ice)—ia tidak mencair menjadi genangan air, melainkan menyublim langsung menjadi asap kabut!'
    },
    learningObjective: 'Distinguish phase changes of matter',
    reference: 'Principles of General Chemistry'
  },

  // --- GEOGRAPHY PLANET ---
  {
    id: 'geo-001',
    zone: 'geography',
    subject: 'Geography Planet',
    topic: 'Capitals',
    subtopic: 'World Capitals',
    difficulty: 'Beginner',
    question: {
      en: 'What is the capital city of Japan?',
      id: 'Apakah nama ibu kota negara Jepang?'
    },
    options: {
      en: ['Tokyo', 'Kyoto', 'Osaka', 'Sapporo'],
      id: ['Tokyo', 'Kyoto', 'Osaka', 'Sapporo']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Tokyo is the capital of Japan and the world’s most populous metropolitan area, serving as Japan’s political and economic hub.',
      id: 'Tokyo merupakan ibu kota Jepang dan kawasan metropolitan terpadat di dunia yang menjadi pusat pemerintahan serta ekonomi negara tersebut.'
    },
    funFact: {
      en: 'Tokyo was originally a small fishing village named "Edo" before becoming the imperial capital in 1868!',
      id: 'Tokyo dulunya bernama "Edo", sebuah desa nelayan kecil sebelum menjadi ibu kota kekaisaran pada tahun 1868!'
    },
    learningTip: {
      en: 'Notice the anagram: Kyoto was Japan’s ancient capital, and rearranging its letters nearly spells Tokyo!',
      id: 'Perhatikan anagramnya: Kyoto adalah ibu kota kuno Jepang, dan susunan hurufnya mirip dengan Tokyo!'
    },
    learningObjective: 'Identify capital cities of major Asian nations',
    reference: 'National Geographic World Atlas'
  },
  {
    id: 'geo-002',
    zone: 'geography',
    subject: 'Geography Planet',
    topic: 'Continents & Oceans',
    subtopic: 'Oceans',
    difficulty: 'Elementary',
    question: {
      en: 'Which is the largest and deepest ocean on Earth?',
      id: 'Samudra manakah yang merupakan samudra terluas dan terdalam di Bumi?'
    },
    options: {
      en: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
      id: ['Samudra Pasifik', 'Samudra Atlantik', 'Samudra Hindia', 'Samudra Arktik']
    },
    correctAnswer: 0,
    explanation: {
      en: 'The Pacific Ocean covers more than 30% of Earth’s surface and contains the Mariana Trench, the deepest point on Earth.',
      id: 'Samudra Pasifik mencakup lebih dari 30% permukaan Bumi dan memiliki Palung Mariana, titik terdalam di Bumi.'
    },
    funFact: {
      en: 'The Pacific Ocean is larger in area than all of Earth’s landmasses combined!',
      id: 'Luas Samudra Pasifik lebih besar daripada seluruh gabungan daratan benua di Bumi!'
    },
    learningTip: {
      en: 'Remember the size order of oceans from largest to smallest: Pacific, Atlantic, Indian, Southern, Arctic.',
      id: 'Urutan luas samudra dari terbesar ke terkecil: Pasifik, Atlantik, Hindia, Selatan, Arktik.'
    },
    learningObjective: 'Compare Earth’s major oceans by size and depth',
    reference: 'NOAA Ocean Exploration'
  },
  {
    id: 'geo-003',
    zone: 'geography',
    subject: 'Geography Planet',
    topic: 'Mountains & Rivers',
    subtopic: 'Ring of Fire',
    difficulty: 'Intermediate',
    question: {
      en: 'Why does Indonesia experience frequent volcanic activity and earthquakes?',
      id: 'Mengapa Indonesia sering mengalami aktivitas gunung berapi dan gempa bumi?'
    },
    options: {
      en: ['It lies along the Pacific Ring of Fire where tectonic plates meet', 'It is located at the North Pole', 'It has no ocean currents', 'It sits on a single stationary rock'],
      id: ['Terletak di Cincin Api Pasifik tempat bertemunya lempeng tektonik', 'Terletak di Kutub Utara', 'Tidak memiliki arus laut', 'Berada di atas satu batuan diam']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Indonesia sits at the convergence of the Eurasian, Indo-Australian, and Pacific tectonic plates along the Pacific Ring of Fire.',
      id: 'Indonesia berada di pertemuan lempeng tektonik Eurasia, Indo-Australia, dan Pasifik di sepanjang jalur Cincin Api Pasifik.'
    },
    funFact: {
      en: 'Volcanic ash also enriches Indonesian soil with minerals, making it extraordinarily fertile for agriculture!',
      id: 'Abu vulkanik juga memperkaya tanah Indonesia dengan mineral sehingga sangat subur untuk pertanian!'
    },
    learningTip: {
      en: 'Tectonic plate boundaries explain both mountain formation and volcanic arcs.',
      id: 'Batas lempeng tektonik menjelaskan terbentuknya pegunungan sekaligus rangkaian gunung berapi.'
    },
    learningObjective: 'Connect plate tectonics to volcanic geography in Indonesia',
    reference: 'USGS & BMKG Geological Overview'
  },
  {
    id: 'geo-004',
    zone: 'geography',
    subject: 'Geography Planet',
    topic: 'Mountains & Rivers',
    subtopic: 'World Rivers',
    difficulty: 'Elementary',
    question: {
      en: 'Which river in South America carries the largest volume of water of any river on Earth?',
      id: 'Sungai di Amerika Selatan manakah yang mengalirkan volume air terbesar di antara semua sungai di Bumi?'
    },
    options: {
      en: ['The Amazon River', 'The Yangtze River', 'The Mississippi River', 'The Volga River'],
      id: ['Sungai Amazon', 'Sungai Yangtze', 'Sungai Mississippi', 'Sungai Volga']
    },
    correctAnswer: 0,
    explanation: {
      en: 'The Amazon River discharges more water into the Atlantic Ocean than the next seven largest rivers combined, nourishing the Amazon Rainforest.',
      id: 'Sungai Amazon mengalirkan lebih banyak air ke Samudra Atlantik dibandingkan gabungan tujuh sungai terbesar berikutnya.'
    },
    funFact: {
      en: 'During the wet season, the Amazon River can widen to over 40 kilometers across!',
      id: 'Pada musim hujan, lebar Sungai Amazon dapat meluas hingga lebih dari 40 kilometer!'
    },
    learningTip: {
      en: 'Nile = Longest river in Africa; Amazon = Largest water volume in South America.',
      id: 'Nil = Sungai terpanjang di Afrika; Amazon = Sungai dengan volume air terbesar di Amerika Selatan.'
    },
    learningObjective: 'Compare major river systems across continents',
    reference: 'National Geographic World Atlas'
  },
  {
    id: 'geo-005',
    zone: 'geography',
    subject: 'Geography Planet',
    topic: 'Climate',
    subtopic: 'Biogeography',
    difficulty: 'Expert',
    question: {
      en: 'What is the "Wallace Line" in Indonesian and world biogeography?',
      id: 'Apakah yang dimaksud dengan "Garis Wallace" dalam biogeografi Indonesia dan dunia?'
    },
    options: {
      en: ['A faunal boundary separating Asian-origin animals in western Indonesia from Australasian fauna in the east', 'The border between Indonesia and Malaysia on Borneo', 'A submarine trench in the Atlantic Ocean', 'The line marking the Arctic Circle'],
      id: ['Garis batas fauna yang memisahkan hewan bercorak Asia di Indonesia barat dengan fauna Australasia di timur', 'Perbatasan darat antara Indonesia dan Malaysia di Kalimantan', 'Palung laut dalam di Samudra Atlantik', 'Garis batas Lingkar Arktik']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Identified by naturalist Alfred Russel Wallace in 1859, the deep Lombok Strait prevented land animals from crossing between Bali and Lombok even during ice ages.',
      id: 'Ditemukan oleh naturalis Alfred Russel Wallace pada 1859, selat dalam antara Bali dan Lombok memisahkan penyebaran fauna Asia dan Australasia.'
    },
    funFact: {
      en: 'Sulawesi, Maluku, and Nusa Tenggara lie in the transitional "Wallacea" zone filled with unique species found nowhere else on Earth!',
      id: 'Sulawesi, Maluku, dan Nusa Tenggara berada di zona peralihan "Wallacea" yang kaya akan spesies endemik unik!'
    },
    learningTip: {
      en: 'West of Wallace Line (Sumatra, Java, Kalimantan) = Tigers & Orangutans; East (Papua) = Marsupials & Birds-of-Paradise.',
      id: 'Barat Garis Wallace (Sumatra, Jawa, Kalimantan) = Harimau & Orangutan; Timur (Papua) = Marsupialia & Cenderawasih.'
    },
    learningObjective: 'Explain biogeographical distribution across the Indonesian archipelago',
    reference: 'Royal Geographical Society & LIPI/BRIN'
  },

  // --- MODERN KNOWLEDGE ---
  {
    id: 'mod-001',
    zone: 'modern',
    subject: 'Modern Knowledge',
    topic: 'Artificial Intelligence',
    subtopic: 'Machine Learning',
    difficulty: 'Beginner',
    question: {
      en: 'How does a Machine Learning model typically learn to recognize photos of cats?',
      id: 'Bagaimana model Machine Learning biasanya belajar mengenali foto kucing?'
    },
    options: {
      en: ['By finding patterns across thousands of labeled example images', 'By painting pictures by hand', 'By memorizing only one single photo', 'By turning off the internet'],
      id: ['Dengan menemukan pola dari ribuan contoh gambar berlabel', 'Dengan melukis gambar secara manual', 'Dengan menghafal satu foto saja', 'Dengan mematikan koneksi internet']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Machine learning algorithms analyze large datasets of examples to detect statistical patterns and features (like ears and whiskers).',
      id: 'Algoritma machine learning menganalisis kumpulan data contoh yang besar untuk mendeteksi pola statistik dan ciri visual.'
    },
    funFact: {
      en: 'Modern neural networks were inspired by how biological neurons pass signals in the human brain!',
      id: 'Jaringan saraf tiruan modern terinspirasi dari cara neuron biologis mengirim sinyal di otak manusia!'
    },
    learningTip: {
      en: 'Better, unbiased training data leads to fairer and more accurate AI systems.',
      id: 'Data latih yang berkualitas dan tidak bias menghasilkan sistem AI yang lebih adil dan akurat.'
    },
    learningObjective: 'Understand the fundamental concept of training data in AI',
    reference: 'MIT Media Lab AI Literacy Guide'
  },
  {
    id: 'mod-002',
    zone: 'modern',
    subject: 'Modern Knowledge',
    topic: 'Digital Literacy',
    subtopic: 'Cybersecurity',
    difficulty: 'Elementary',
    question: {
      en: 'You receive an urgent message asking for your password to "claim a free prize". What is the safest action?',
      id: 'Kamu menerima pesan mendesak yang meminta kata sandimu untuk "mengklaim hadiah gratis". Tindakan apa yang paling aman?'
    },
    options: {
      en: ['Do not share your password and ignore/report the phishing message', 'Reply immediately with your password', 'Forward the link to all your friends', 'Write your password publicly online'],
      id: ['Jangan bagikan kata sandi dan abaikan/laporkan pesan phishing tersebut', 'Segera balas dengan kata sandimu', 'Teruskan tautan tersebut ke semua teman', 'Tulis kata sandimu secara publik']
    },
    correctAnswer: 0,
    explanation: {
      en: 'This is a classic "phishing" scam. Legitimate services will never ask for your password via messages or email.',
      id: 'Ini adalah penipuan "phishing" klasik. Layanan resmi tidak akan pernah meminta kata sandimu melalui pesan atau email.'
    },
    funFact: {
      en: 'Enabling Two-Factor Authentication (2FA) blocks over 99% of automated account takeover attempts!',
      id: 'Mengaktifkan Autentikasi Dua Faktor (2FA) mencegah lebih dari 99% upaya peretasan akun otomatis!'
    },
    learningTip: {
      en: 'Pause and check the sender’s address whenever a message creates fake urgency.',
      id: 'Berhenti sejenak dan periksa alamat pengirim setiap kali pesan menciptakan rasa panik atau terburu-buru.'
    },
    learningObjective: 'Recognize and prevent social engineering / phishing attacks',
    reference: 'Cybersecurity & Digital Citizenship Curriculum'
  },
  {
    id: 'mod-003',
    zone: 'modern',
    subject: 'Modern Knowledge',
    topic: 'Financial Literacy',
    subtopic: 'Budgeting & Compound Interest',
    difficulty: 'Intermediate',
    question: {
      en: 'What is "compound interest" when saving money in a bank account?',
      id: 'Apa yang dimaksud dengan "bunga majemuk" (compound interest) saat menabung?'
    },
    options: {
      en: ['Earning interest on both your original savings and previously earned interest', 'Paying a fee every time you save', 'Losing money due to expired coins', 'Only earning interest once in ten years'],
      id: ['Mendapatkan bunga dari tabungan awal sekaligus dari bunga yang sudah terkumpul sebelumnya', 'Membayar denda setiap kali menabung', 'Kehilangan uang karena koin kedaluwarsa', 'Hanya mendapat bunga sekali dalam sepuluh tahun']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Compound interest makes savings grow exponentially over time because your earned interest generates additional interest.',
      id: 'Bunga majemuk membuat tabungan tumbuh semakin cepat seiring waktu karena bunga yang diperoleh ikut menghasilkan bunga baru.'
    },
    funFact: {
      en: 'Using the "Rule of 72", divide 72 by your annual interest rate to estimate how many years it takes to double your money!',
      id: 'Dengan "Aturan 72", bagi 72 dengan persentase bunga tahunan untuk memperkirakan berapa tahun uangmu berlipat ganda!'
    },
    learningTip: {
      en: 'Starting to save small amounts early beats saving larger amounts much later due to compounding.',
      id: 'Mulai menabung sedikit sejak dini jauh lebih efektif daripada menabung besar di kemudian hari berkat efek majemuk.'
    },
    learningObjective: 'Understand how compound growth builds long-term financial health',
    reference: 'OECD Financial Literacy Framework'
  },
  {
    id: 'mod-004',
    zone: 'modern',
    subject: 'Modern Knowledge',
    topic: 'Computing',
    subtopic: 'Algorithms & Complexity',
    difficulty: 'Advanced',
    question: {
      en: 'Why is "Binary Search" much faster than checking every item one-by-one when searching a sorted dictionary of 1,000,000 words?',
      id: 'Mengapa pencarian biner ("Binary Search") jauh lebih cepat daripada memeriksa satu per satu saat mencari kata dalam kamus terurut berisi 1.000.000 kata?'
    },
    options: {
      en: ['It cuts the remaining search space in half at every single step (needing at most ~20 checks)', 'It deletes half of the dictionary permanently', 'It only works on unsorted random lists', 'It requires 1,000,000 separate computers'],
      id: ['Ia membelah ruang pencarian menjadi setengah pada setiap langkah (hanya butuh maks ~20 pengecekan)', 'Ia menghapus setengah isi kamus secara permanen', 'Ia hanya bekerja pada daftar acak yang belum urut', 'Ia membutuhkan 1.000.000 komputer terpisah']
    },
    correctAnswer: 0,
    explanation: {
      en: 'By always checking the middle entry of a sorted list, Binary Search eliminates 50% of remaining possibilities each step (O(log₂ n) time).',
      id: 'Dengan selalu memeriksa bagian tengah daftar yang terurut, Binary Search menyingkirkan 50% kemungkinan di setiap langkah (kompleksitas O(log₂ n)).'
    },
    funFact: {
      en: 'Even if a sorted database grew to 1 BILLION entries, Binary Search would still find any item in at most 30 comparisons!',
      id: 'Bahkan jika basis data terurut membesar hingga 1 MILIAR entri, Binary Search tetap menemukannya dalam maksimal 30 langkah perbandingan!'
    },
    learningTip: {
      en: 'Remember the golden rule of Binary Search: the data MUST be sorted first!',
      id: 'Ingat syarat utama Binary Search: data HARUS sudah terurut terlebih dahulu!'
    },
    learningObjective: 'Understand logarithmic efficiency in computer science algorithms',
    reference: 'CS50 & Introduction to Algorithms'
  },
  {
    id: 'mod-005',
    zone: 'modern',
    subject: 'Modern Knowledge',
    topic: 'Environment',
    subtopic: 'Renewable Energy',
    difficulty: 'Elementary',
    question: {
      en: 'Which of the following is a clean, renewable energy source that harnesses heat from beneath Earth’s crust?',
      id: 'Manakah di antara berikut ini yang merupakan sumber energi bersih terbarukan yang memanfaatkan panas dari dalam kerak Bumi?'
    },
    options: {
      en: ['Geothermal energy (Energi panas bumi)', 'Coal combustion (Pembakaran batu bara)', 'Diesel fuel (Bahan bakar solar)', 'Natural gas flaring'],
      id: ['Energi panas bumi (Geothermal)', 'Pembakaran batu bara', 'Bahan bakar solar', 'Pembakaran gas alam']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Geothermal power plants tap underground steam and hot water reservoirs heated by Earth’s interior to spin electricity turbines 24/7.',
      id: 'Pembangkit listrik panas bumi memanfaatkan uap dan air panas bawah tanah untuk memutar turbin listrik secara berkelanjutan.'
    },
    funFact: {
      en: 'Indonesia holds roughly 40% of the world’s total geothermal energy reserves thanks to its volcanic archipelago!',
      id: 'Indonesia memiliki sekitar 40% dari total cadangan energi panas bumi dunia berkat jajaran gunung berapinya!'
    },
    learningTip: {
      en: 'Geo = Earth, Thermal = Heat → Geothermal = Earth’s Heat.',
      id: 'Geo = Bumi, Thermal = Panas → Geothermal = Panas Bumi.'
    },
    learningObjective: 'Identify sustainable renewable energy technologies',
    reference: 'International Renewable Energy Agency (IRENA)'
  }
];

// ============================================================================
// 3B. DYNAMIC PROCEDURAL QUESTION GENERATOR (INFINITE NON-STAGNANT VARIETY)
// ============================================================================
const generateDynamicQuestions = (zonesList, difficulty, count = 4) => {
  const generated = [];
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (zonesList.includes('math')) {
    // Dynamic Arithmetic / Algebra / Percentage / Geometry Generator
    const a = randInt(6, 18);
    const b = randInt(4, 15);
    const prod = a * b;
    const opts1 = [String(prod), String(prod + a), String(prod - b), String(prod + 10)].sort(() => Math.random() - 0.5);
    generated.push({
      id: `dyn-math-${Date.now()}-1`,
      zone: 'math',
      subject: 'Mathematics World',
      topic: 'Dynamic Arithmetic',
      subtopic: 'Mental Multiplication',
      difficulty: difficulty === 'All' ? 'Elementary' : difficulty,
      question: {
        en: `[Dynamic Challenge] An expedition caravan carries ${a} supply crates, each holding ${b} starlight crystals. How many crystals are there altogether?`,
        id: `[Tantangan Dinamis] Kafilah ekspedisi membawa ${a} peti perbekalan, masing-masing berisi ${b} kristal cahaya. Berapa total kristal seluruhnya?`
      },
      options: { en: opts1, id: opts1 },
      correctAnswer: opts1.indexOf(String(prod)),
      explanation: {
        en: `Multiply the number of crates by crystals per crate: ${a} × ${b} = ${prod}.`,
        id: `Kalikan jumlah peti dengan isi per peti: ${a} × ${b} = ${prod}.`
      },
      funFact: {
        en: `Using the distributive property, ${a} × ${b} = (${a} × 10) + (${a} × ${b - 10}) = ${prod}.`,
        id: `Dengan sifat distributif, ${a} × ${b} = (${a} × 10) + (${a} × ${b - 10}) = ${prod}.`
      },
      learningTip: {
        en: 'Break larger multiplications into tens and ones for rapid mental calculation.',
        id: 'Pecah perkalian besar menjadi puluhan dan satuan agar mudah dihitung di luar kepala.'
      },
      learningObjective: 'Solve dynamically generated multiplication problems',
      reference: 'Procedural Math Engine'
    });

    // Dynamic Addition & Subtraction
    const addA = randInt(25, 78);
    const addB = randInt(14, 49);
    const addSum = addA + addB;
    const optsAdd = [String(addSum), String(addSum - 10), String(addSum + 10), String(addSum + 2)].sort(() => Math.random() - 0.5);
    generated.push({
      id: `dyn-math-${Date.now()}-add`,
      zone: 'math',
      subject: 'Mathematics World',
      topic: 'Addition (Penjumlahan)',
      subtopic: 'Dynamic Addition',
      difficulty: difficulty === 'All' ? 'Beginner' : difficulty,
      question: {
        en: `[Dynamic Addition] What is ${addA} + ${addB}?`,
        id: `[Penjumlahan Dinamis] Berapakah hasil dari ${addA} + ${addB}?`
      },
      options: { en: optsAdd, id: optsAdd },
      correctAnswer: optsAdd.indexOf(String(addSum)),
      explanation: {
        en: `Adding ${addA} and ${addB} equals ${addSum}.`,
        id: `Menjumlahkan ${addA} dan ${addB} menghasilkan ${addSum}.`
      },
      funFact: {
        en: 'Adding tens and ones separately makes mental addition fast and reliable!',
        id: 'Menjumlahkan puluhan dan satuan secara terpisah membuat hitung cepat jauh lebih mudah!'
      },
      learningTip: {
        en: 'Check the last digits first to verify the ones place!',
        id: 'Periksa digit terakhir terlebih dahulu untuk memastikan angka satuannya tepat!'
      },
      learningObjective: 'Practice dynamic two-digit addition',
      reference: 'Procedural Math Engine'
    });

    const subB = randInt(15, 45);
    const subAns = randInt(22, 65);
    const subA = subB + subAns;
    const optsSub = [String(subAns), String(subAns + 10), String(Math.max(1, subAns - 8)), String(subAns + 4)].sort(() => Math.random() - 0.5);
    generated.push({
      id: `dyn-math-${Date.now()}-sub`,
      zone: 'math',
      subject: 'Mathematics World',
      topic: 'Subtraction (Pengurangan)',
      subtopic: 'Dynamic Subtraction',
      difficulty: difficulty === 'All' ? 'Beginner' : difficulty,
      question: {
        en: `[Dynamic Subtraction] Calculate ${subA} − ${subB}:`,
        id: `[Pengurangan Dinamis] Hitunglah hasil dari ${subA} − ${subB}:`
      },
      options: { en: optsSub, id: optsSub },
      correctAnswer: optsSub.indexOf(String(subAns)),
      explanation: {
        en: `${subA} minus ${subB} equals ${subAns} (Check: ${subAns} + ${subB} = ${subA}).`,
        id: `${subA} dikurangi ${subB} sama dengan ${subAns} (Cek: ${subAns} + ${subB} = ${subA}).`
      },
      funFact: {
        en: 'Subtraction finds the exact distance between two numbers on a number line.',
        id: 'Pengurangan menemukan jarak tepat antara dua bilangan pada garis bilangan.'
      },
      learningTip: {
        en: 'Verify by adding the result back to the subtracted number.',
        id: 'Pastikan jawabanmu dengan menjumlahkannya kembali dengan bilangan pengurang.'
      },
      learningObjective: 'Practice dynamic two-digit subtraction',
      reference: 'Procedural Math Engine'
    });

    // Dynamic Division
    const divQuotient = randInt(4, 12);
    const divDivisor = randInt(4, 12);
    const divDividend = divQuotient * divDivisor;
    const optsDiv = [String(divQuotient), String(divQuotient + 1), String(Math.max(1, divQuotient - 1)), String(divQuotient + 3)].sort(() => Math.random() - 0.5);
    generated.push({
      id: `dyn-math-${Date.now()}-div`,
      zone: 'math',
      subject: 'Mathematics World',
      topic: 'Division (Pembagian)',
      subtopic: 'Dynamic Division',
      difficulty: difficulty === 'All' ? 'Beginner' : difficulty,
      question: {
        en: `[Dynamic Division] What is ${divDividend} ÷ ${divDivisor}?`,
        id: `[Pembagian Dinamis] Berapakah hasil dari ${divDividend} ÷ ${divDivisor}?`
      },
      options: { en: optsDiv, id: optsDiv },
      correctAnswer: optsDiv.indexOf(String(divQuotient)),
      explanation: {
        en: `${divDividend} divided by ${divDivisor} equals ${divQuotient}, because ${divQuotient} × ${divDivisor} = ${divDividend}.`,
        id: `${divDividend} dibagi ${divDivisor} sama dengan ${divQuotient}, karena ${divQuotient} × ${divDivisor} = ${divDividend}.`
      },
      funFact: {
        en: 'Every division fact corresponds directly to a multiplication fact!',
        id: 'Setiap pembagian selalu berpasangan langsung dengan fakta perkaliannya!'
      },
      learningTip: {
        en: `Ask yourself: "${divDivisor} multiplied by what number gives ${divDividend}?"`,
        id: `Tanyakan pada dirimu: "${divDivisor} dikali berapa yang hasilnya ${divDividend}?"`
      },
      learningObjective: 'Practice dynamic integer division',
      reference: 'Procedural Math Engine'
    });

    const xVal = randInt(3, 12);
    const coeff = randInt(2, 6);
    const addend = randInt(4, 19);
    const rhs = coeff * xVal + addend;
    const opts2 = [`x = ${xVal}`, `x = ${xVal + 2}`, `x = ${Math.max(1, xVal - 1)}`, `x = ${rhs - addend}`].sort(() => Math.random() - 0.5);
    generated.push({
      id: `dyn-math-${Date.now()}-2`,
      zone: 'math',
      subject: 'Mathematics World',
      topic: 'Dynamic Algebra',
      subtopic: 'Linear Equation',
      difficulty: difficulty === 'All' ? 'Intermediate' : difficulty,
      question: {
        en: `[Dynamic Algebra] Solve for x: ${coeff}x + ${addend} = ${rhs}`,
        id: `[Aljabar Dinamis] Tentukan nilai x dari persamaan: ${coeff}x + ${addend} = ${rhs}`
      },
      options: { en: opts2, id: opts2 },
      correctAnswer: opts2.indexOf(`x = ${xVal}`),
      explanation: {
        en: `Subtract ${addend} from both sides: ${coeff}x = ${rhs - addend}. Then divide by ${coeff}: x = ${xVal}.`,
        id: `Kurangi kedua ruas dengan ${addend}: ${coeff}x = ${rhs - addend}. Lalu bagi dengan ${coeff}: x = ${xVal}.`
      },
      funFact: {
        en: 'Every linear equation in one variable represents the exact point where a straight line crosses a target height.',
        id: 'Setiap persamaan linear satu variabel menunjukkan titik potong tepat dari sebuah garis lurus.'
      },
      learningTip: {
        en: 'Substitute your answer back into the original equation to verify both sides match!',
        id: 'Masukkan kembali jawabanmu ke persamaan awal untuk memastikan kedua ruas bernilai sama!'
      },
      learningObjective: 'Solve dynamically generated linear equations',
      reference: 'Procedural Algebra Engine'
    });
  }

  if (zonesList.includes('modern')) {
    const num = randInt(5, 15);
    const binStr = num.toString(2);
    const wrong1 = (num + 1).toString(2);
    const wrong2 = (num - 1).toString(2);
    const wrong3 = (num + 2).toString(2);
    const optsBin = Array.from(new Set([binStr, wrong1, wrong2, wrong3]));
    while (optsBin.length < 4) optsBin.push((num + optsBin.length + 3).toString(2));
    optsBin.sort(() => Math.random() - 0.5);

    generated.push({
      id: `dyn-mod-${Date.now()}-1`,
      zone: 'modern',
      subject: 'Modern Knowledge',
      topic: 'Binary Computing',
      subtopic: 'Base-2 Conversion',
      difficulty: difficulty === 'All' ? 'Intermediate' : difficulty,
      question: {
        en: `[Dynamic Computing] How is the decimal number ${num} represented in 4-bit binary (base-2)?`,
        id: `[Komputasi Dinamis] Bagaimana bilangan desimal ${num} dituliskan dalam sistem biner (basis-2)?`
      },
      options: { en: optsBin, id: optsBin },
      correctAnswer: optsBin.indexOf(binStr),
      explanation: {
        en: `In binary place values (8, 4, 2, 1), ${num} equals ${binStr}₂.`,
        id: `Dengan nilai tempat biner (8, 4, 2, 1), angka ${num} sama dengan ${binStr}₂.`
      },
      funFact: {
        en: 'Four binary digits (bits) are affectionately called a "nibble" by computer engineers—half of an 8-bit byte!',
        id: 'Empat digit biner (bit) disebut "nibble" oleh insinyur komputer—setengah dari 1 byte (8-bit)!'
      },
      learningTip: {
        en: 'Add powers of 2 from left to right: 8 + 4 + 2 + 1.',
        id: 'Jumlahkan pangkat 2 dari kiri ke kanan: 8 + 4 + 2 + 1.'
      },
      learningObjective: 'Convert decimal integers into binary representation',
      reference: 'Procedural Computer Science Engine'
    });
  }

  return generated.slice(0, count);
};

// ============================================================================
// 5. CUSTOMIZATION ITEMS & ACHIEVEMENTS
// ============================================================================
const HERO_HATS = [
  { id: 'explorer_cap', name: { en: 'Explorer Cap', id: 'Topi Penjelajah' }, cost: 0, color: '#f59e0b' },
  { id: 'wizard_hat', name: { en: 'Starlight Wizard Hat', id: 'Topi Penyihir Bintang' }, cost: 80, color: '#6366f1' },
  { id: 'golden_crown', name: { en: 'Crown of Wisdom', id: 'Mahkota Kebijaksanaan' }, cost: 180, color: '#eab308' },
  { id: 'cyber_visor', name: { en: 'Quantum Visor', id: 'Visor Kuantum' }, cost: 250, color: '#06b6d4' }
];

const HERO_OUTFITS = [
  { id: 'tunic_blue', name: { en: 'Sky Voyager Tunic', id: 'Jubah Pengembara Langit' }, cost: 0, primary: '#2563eb', trim: '#93c5fd' },
  { id: 'tunic_emerald', name: { en: 'Forest Sage Cloak', id: 'Jubah Bijak Rimba' }, cost: 60, primary: '#059669', trim: '#6ee7b7' },
  { id: 'tunic_crimson', name: { en: 'Phoenix Scholar Armor', id: 'Zirah Cendekia Phoenix' }, cost: 140, primary: '#dc2626', trim: '#fca5a5' },
  { id: 'tunic_royal', name: { en: 'Astral Nebula Robe', id: 'Jubah Nebula Astral' }, cost: 220, primary: '#7c3aed', trim: '#ddd6fe' }
];

const HERO_COMPANIONS = [
  { id: 'wisp_gold', name: { en: 'Lumina Star-Wisp', id: 'Roh Bintang Lumina' }, cost: 0, color: '#fde047' },
  { id: 'wisp_aqua', name: { en: 'Aqua Droplet Spirit', id: 'Roh Tetesan Aqua' }, cost: 90, color: '#22d3ee' },
  { id: 'wisp_rose', name: { en: 'Sakura Petal Pixie', id: 'Peri Kelopak Sakura' }, cost: 160, color: '#f472b6' }
];

const ACHIEVEMENTS_LIST = [
  {
    id: 'first_step',
    title: { en: 'First Steps of Curiosity', id: 'Langkah Pertama Rasa Ingin Tahu' },
    desc: { en: 'Answer your first knowledge question correctly.', id: 'Jawab pertanyaan pengetahuan pertamamu dengan benar.' },
    icon: 'compass'
  },
  {
    id: 'streak_3',
    title: { en: 'Scholar on Fire!', id: 'Cendekia Membara!' },
    desc: { en: 'Achieve a 3-question correct answer combo streak.', id: 'Raih kombo 3 jawaban benar berturut-turut.' },
    icon: 'flame'
  },
  {
    id: 'puzzle_solver',
    title: { en: 'Ancient Mechanism Master', id: 'Master Mekanisme Kuno' },
    desc: { en: 'Solve an Ancient Zone Puzzle.', id: 'Selesaikan Teka-Teki Kuno di wilayah petualangan.' },
    icon: 'puzzle'
  },
  {
    id: 'story_hero',
    title: { en: 'Keeper of Lore', id: 'Penjaga Kisah Kebijaksanaan' },
    desc: { en: 'Complete a Sage Story Mission and collect a Lore Card.', id: 'Selesaikan Misi Cerita dan kumpulkan Kartu Ilmu.' },
    icon: 'scroll'
  },
  {
    id: 'level_3',
    title: { en: 'Rising Arch-Explorer', id: 'Penjelajah Agung Muda' },
    desc: { en: 'Reach Explorer Level 3.', id: 'Capai Level Penjelajah 3.' },
    icon: 'crown'
  },
  {
    id: 'polymath',
    title: { en: 'Renaissance Polymath', id: 'Polimatik Lintas Ilmu' },
    desc: { en: 'Answer correctly across at least 3 different Knowledge Zones.', id: 'Jawab benar di minimal 3 Wilayah Pengetahuan berbeda.' },
    icon: 'sparkles'
  }
];

// ============================================================================
// 6. INDEXEDDB PERSISTENCE ENGINE (WITH LOCALSTORAGE FALLBACK)
// ============================================================================
const DB_NAME = 'KnowledgeOdysseyDB';
const STORE_NAME = 'saveState';
const SAVE_KEY = 'playerProfile_v1';

const saveToStorage = async (data) => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    // Ignore storage quota issues
  }
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, SAVE_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      };
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
};

const loadFromStorage = async () => {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const getReq = tx.objectStore(STORE_NAME).get(SAVE_KEY);
        getReq.onsuccess = () => {
          if (getReq.result) {
            resolve(getReq.result);
          } else {
            const fallback = localStorage.getItem(SAVE_KEY);
            resolve(fallback ? JSON.parse(fallback) : null);
          }
        };
        getReq.onerror = () => {
          const fallback = localStorage.getItem(SAVE_KEY);
          resolve(fallback ? JSON.parse(fallback) : null);
        };
      };
      req.onerror = () => {
        const fallback = localStorage.getItem(SAVE_KEY);
        resolve(fallback ? JSON.parse(fallback) : null);
      };
    } catch {
      const fallback = localStorage.getItem(SAVE_KEY);
      resolve(fallback ? JSON.parse(fallback) : null);
    }
  });
};

// ============================================================================
// 7. WEB AUDIO API SYNTHESIZER (MUSIC & EXPRESSIVE SFX + SUBTITLES)
// ============================================================================
class OdysseyAudioEngine {
  constructor() {
    this.ctx = null;
    this.musicVolume = 0.25;
    this.sfxVolume = 0.55;
    this.muted = false;
    this.bgmTimer = null;
    this.stepIndex = 0;
    this.currentFreqs = [261.63, 329.63, 392.00, 493.88];
    this.onSubtitle = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  emitSubtitle(text) {
    if (this.onSubtitle) {
      this.onSubtitle(text);
    }
  }

  playTone(freq, duration = 0.2, type = 'sine', volScale = 1, delay = 0) {
    if (this.muted || this.sfxVolume <= 0) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    const peak = Math.min(0.45, this.sfxVolume * volScale * 0.35);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    this.playTone(580, 0.07, 'triangle', 0.6);
  }

  playJump() {
    this.init();
    if (this.muted || !this.ctx || this.sfxVolume <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);
    gain.gain.setValueAtTime(this.sfxVolume * 0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);
    this.emitSubtitle('♪ Hop!');
  }

  playCorrect() {
    this.playTone(523.25, 0.16, 'triangle', 1.0, 0);
    this.playTone(659.25, 0.16, 'triangle', 1.0, 0.08);
    this.playTone(783.99, 0.24, 'triangle', 1.1, 0.16);
    this.playTone(1046.50, 0.38, 'sine', 1.2, 0.25);
    this.emitSubtitle('♪ Victory Chime — Correct Answer!');
  }

  playWrong() {
    this.playTone(310, 0.18, 'sine', 0.85, 0);
    this.playTone(265, 0.26, 'sine', 0.85, 0.14);
    this.emitSubtitle('♪ Gentle Boing — Let’s review the hint!');
  }

  playLevelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.28, 'triangle', 1.2, idx * 0.09);
    });
    this.emitSubtitle('♪ Fanfare — LEVEL UP!');
  }

  playDiscovery() {
    this.playTone(440, 0.14, 'sine', 0.9, 0);
    this.playTone(554.37, 0.14, 'sine', 0.9, 0.08);
    this.playTone(659.25, 0.25, 'sine', 1.0, 0.16);
    this.emitSubtitle('♪ Sparkle — Treasure & Lore Discovered!');
  }

  startAmbient(freqs) {
    if (freqs) this.currentFreqs = freqs;
    if (this.bgmTimer) clearInterval(this.bgmTimer);
    this.bgmTimer = setInterval(() => {
      if (this.muted || this.musicVolume <= 0 || !this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const note = this.currentFreqs[this.stepIndex % this.currentFreqs.length];
      this.stepIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note * 0.5, now);
      const vol = this.musicVolume * 0.08;
      gain.gain.setValueAtTime(0.0008, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.001, vol), now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.15);
    }, 1150);
  }

  stopAmbient() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

const soundEngine = new OdysseyAudioEngine();

// ============================================================================
// 8. BESPOKE SVG VECTOR HERO AVATAR (ANIMATED STATE MACHINE, ZERO EMOJIS)
// ============================================================================
const HeroVectorAvatar = ({
  animState = 'idle',
  hatId = 'explorer_cap',
  outfitId = 'tunic_blue',
  companionId = 'wisp_gold',
  size = 140,
  facing = 1
}) => {
  const hat = HERO_HATS.find((h) => h.id === hatId) || HERO_HATS[0];
  const outfit = HERO_OUTFITS.find((o) => o.id === outfitId) || HERO_OUTFITS[0];
  const companion = HERO_COMPANIONS.find((c) => c.id === companionId) || HERO_COMPANIONS[0];

  const isHappy = animState === 'happy' || animState === 'victory' || animState === 'levelup';
  const isConfused = animState === 'confused' || animState === 'surprised';
  const isThinking = animState === 'thinking';
  const isJumping = animState === 'jumping' || animState === 'victory' || animState === 'levelup';

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Level Up / Victory Radiant Aura */}
      {(animState === 'levelup' || animState === 'victory') && (
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-35"
          style={{ background: 'radial-gradient(circle, #fde047 0%, transparent 70%)' }}
        />
      )}

      <svg
        viewBox="0 0 160 160"
        className={`w-full h-full overflow-visible transition-transform duration-300 ${
          isJumping ? '-translate-y-3' : ''
        } ${animState === 'confused' ? 'animate-bounce' : ''}`}
        style={{ transform: `scaleX(${facing})` }}
      >
        <defs>
          <radialGradient id="companionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={companion.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={companion.color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="capeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={outfit.primary} />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="80" cy="146" rx={isJumping ? 22 : 32} ry="7" fill="rgba(15, 23, 42, 0.25)" />

        {/* Floating Companion Spirit */}
        <g className="animate-pulse">
          <circle cx="132" cy="54" r="16" fill="url(#companionGlow)" />
          <circle cx="132" cy="54" r="6.5" fill={companion.color} stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="130" cy="52" r="1.5" fill="#1e293b" />
          <circle cx="134" cy="52" r="1.5" fill="#1e293b" />
        </g>

        {/* Flowing Hero Cape */}
        <path
          d={isJumping ? 'M54 88 Q30 112 36 134 L124 134 Q130 112 106 88 Z' : 'M58 88 Q44 114 48 134 L112 134 Q116 114 102 88 Z'}
          fill="url(#capeGrad)"
        />

        {/* Boots */}
        <rect x="62" y="126" width="14" height="16" rx="6" fill="#451a03" />
        <rect x="84" y="126" width="14" height="16" rx="6" fill="#451a03" />

        {/* Adventure Tunic Body */}
        <path
          d="M56 84 C56 76, 104 76, 104 84 L110 124 C110 128, 50 128, 50 124 Z"
          fill={outfit.primary}
          stroke={outfit.trim}
          strokeWidth="2.5"
        />
        {/* Golden Belt & Buckle */}
        <rect x="54" y="108" width="52" height="7" rx="3" fill="#78350f" />
        <rect x="74" y="106" width="12" height="11" rx="2" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />

        {/* Expressive Arms */}
        {isHappy ? (
          <>
            <path d="M56 88 L36 62" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="35" cy="60" r="6" fill="#fed7aa" />
            <path d="M104 88 L124 62" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="125" cy="60" r="6" fill="#fed7aa" />
          </>
        ) : isThinking ? (
          <>
            <path d="M56 90 L44 108" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="44" cy="109" r="5.5" fill="#fed7aa" />
            <path d="M104 90 L94 74" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="92" cy="72" r="6" fill="#fed7aa" />
          </>
        ) : (
          <>
            <path d="M56 88 L42 108" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="42" cy="109" r="5.5" fill="#fed7aa" />
            <path d="M104 88 L118 108" stroke={outfit.trim} strokeWidth="9" strokeLinecap="round" />
            <circle cx="118" cy="109" r="5.5" fill="#fed7aa" />
          </>
        )}

        {/* Scarf */}
        <path d="M62 78 Q80 88 98 78" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" fill="none" />

        {/* Cute Stylized Head */}
        <circle cx="80" cy="54" r="26" fill="#fed7aa" stroke="#fdba74" strokeWidth="2" />

        {/* Hair Tufts */}
        <path
          d="M54 50 C52 30, 108 30, 106 50 C102 38, 88 36, 80 40 C70 36, 58 38, 54 50 Z"
          fill="#451a03"
        />

        {/* Expressive Eyes & Mouth */}
        {isHappy ? (
          <>
            <path d="M66 53 Q71 47 76 53" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M84 53 Q89 47 94 53" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M72 62 Q80 72 88 62 Z" fill="#ef4444" />
          </>
        ) : isConfused ? (
          <>
            <circle cx="71" cy="53" r="4" fill="#1e293b" />
            <circle cx="89" cy="53" r="4" fill="#1e293b" />
            <circle cx="72" cy="51.5" r="1.3" fill="#fff" />
            <circle cx="90" cy="51.5" r="1.3" fill="#fff" />
            <path d="M74 65 Q80 61 86 65" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Question Mark Spark */}
            <text x="108" y="34" fill="#f59e0b" fontSize="20" fontWeight="bold">?</text>
          </>
        ) : (
          <>
            <circle cx="71" cy="53" r="3.8" fill="#1e293b" />
            <circle cx="89" cy="53" r="3.8" fill="#1e293b" />
            <circle cx="72.2" cy="51.8" r="1.3" fill="#ffffff" />
            <circle cx="90.2" cy="51.8" r="1.3" fill="#ffffff" />
            <path d="M75 63 Q80 67 85 63" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Rosy Cheeks */}
        <circle cx="64" cy="59" r="3.5" fill="#fb7185" opacity="0.45" />
        <circle cx="96" cy="59" r="3.5" fill="#fb7185" opacity="0.45" />

        {/* Customizable Headgear */}
        {hatId === 'wizard_hat' && (
          <g>
            <ellipse cx="80" cy="34" rx="34" ry="6" fill={hat.color} />
            <path d="M56 34 L80 4 L104 34 Z" fill={hat.color} />
            <polygon points="80,15 82,20 87,20 83,23 84,28 80,25 76,28 77,23 73,20 78,20" fill="#fde047" />
          </g>
        )}
        {hatId === 'golden_crown' && (
          <g>
            <path d="M60 33 L64 17 L73 26 L80 14 L87 26 L96 17 L100 33 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="80" cy="26" r="2.5" fill="#ef4444" />
          </g>
        )}
        {hatId === 'cyber_visor' && (
          <g>
            <rect x="56" y="45" width="48" height="12" rx="6" fill="#06b6d4" opacity="0.78" stroke="#a5f3fc" strokeWidth="2" />
          </g>
        )}
        {hatId === 'explorer_cap' && (
          <g>
            <path d="M56 35 C56 19, 104 19, 104 35 Z" fill={hat.color} />
            <path d="M54 34 Q80 40 112 33" stroke="#b45309" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// 9. CUTE ZONE GUARDIAN MONSTER VECTOR ARTWORK
// ============================================================================
const GuardianMonsterAvatar = ({ zoneId, isHit = false, isHappy = false, size = 140 }) => {
  const zone = ZONES.find((z) => z.id === zoneId) || ZONES[0];
  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-200 ${
        isHit ? 'scale-90 rotate-6' : isHappy ? '-translate-y-2 scale-105' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
        <ellipse cx="80" cy="146" rx="36" ry="8" fill="rgba(15, 23, 42, 0.25)" />
        {/* Floating Aura */}
        <circle cx="80" cy="84" r="54" fill={zone.color} opacity="0.16" />

        {/* Cute Guardian Body */}
        <rect
          x="38"
          y="44"
          width="84"
          height="84"
          rx="34"
          fill={zone.color}
          stroke="#ffffff"
          strokeWidth="3.5"
        />
        {/* Belly Crest */}
        <ellipse cx="80" cy="98" rx="24" ry="18" fill={zone.accent} opacity="0.85" />

        {/* Cute Horns / Ears */}
        <path d="M46 52 L34 28 L60 44 Z" fill={zone.accent} />
        <path d="M114 52 L126 28 L100 44 Z" fill={zone.accent} />

        {/* Expressive Guardian Eyes */}
        {isHit ? (
          <>
            <path d="M58 68 L68 78 M68 68 L58 78" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M92 68 L102 78 M102 68 L92 78" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="80" cy="92" rx="8" ry="6" fill="#1e293b" />
          </>
        ) : (
          <>
            <circle cx="64" cy="72" r="8" fill="#ffffff" />
            <circle cx="96" cy="72" r="8" fill="#ffffff" />
            <circle cx="65" cy="72" r="4.5" fill="#0f172a" />
            <circle cx="97" cy="72" r="4.5" fill="#0f172a" />
            <circle cx="66.5" cy="70" r="1.8" fill="#ffffff" />
            <circle cx="98.5" cy="70" r="1.8" fill="#ffffff" />
            <path d="M70 88 Q80 96 90 88" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// 10. 2.5D HTML5 CANVAS EXPLORATION ENGINE (60FPS, PARALLAX, NPCs, CHESTS)
// ============================================================================
const ExplorationCanvas25D = ({
  zone,
  heroConfig,
  lang,
  reducedMotion,
  onTriggerBattle,
  onTriggerPuzzle,
  onTriggerStory,
  onDiscoverChest,
  chestOpened
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const keysRef = useRef({});
  const joystickRef = useRef({ dx: 0, active: false });

  // World entities normalized coordinates (0.0 to 1.0 along path)
  const entities = useMemo(
    () => [
      {
        id: 'sage',
        type: 'story',
        xRatio: 0.22,
        label: { en: 'Sage Story', id: 'Misi Cerita' },
        sub: zone.sageName[lang],
        color: '#f59e0b'
      },
      {
        id: 'puzzle',
        type: 'puzzle',
        xRatio: 0.48,
        label: { en: 'Ancient Puzzle', id: 'Teka-Teki Kuno' },
        sub: { en: 'Logic Altar', id: 'Altar Logika' }[lang],
        color: '#8b5cf6'
      },
      {
        id: 'guardian',
        type: 'battle',
        xRatio: 0.74,
        label: { en: 'Quiz Battle', id: 'Lawan Penjaga' },
        sub: zone.guardianName[lang],
        color: '#ef4444'
      },
      {
        id: 'chest',
        type: 'chest',
        xRatio: 0.90,
        label: { en: chestOpened ? 'Opened Chest' : 'Lore Chest', id: chestOpened ? 'Peti Terbuka' : 'Peti Harta' },
        sub: { en: '+40 Coins & Lore', id: '+40 Koin & Ilmu' }[lang],
        color: '#10b981'
      }
    ],
    [zone, lang, chestOpened]
  );

  const playerRef = useRef({
    x: 110,
    y: 0,
    vy: 0,
    facing: 1,
    walkPhase: 0,
    grounded: true
  });

  const [nearbyEntity, setNearbyEntity] = useState(null);

  const triggerEntityAction = useCallback(
    (ent) => {
      if (!ent) return;
      soundEngine.playClick();
      if (ent.type === 'battle') onTriggerBattle();
      else if (ent.type === 'puzzle') onTriggerPuzzle();
      else if (ent.type === 'story') onTriggerStory();
      else if (ent.type === 'chest') onDiscoverChest();
    },
    [onTriggerBattle, onTriggerPuzzle, onTriggerStory, onDiscoverChest]
  );

  // Keyboard bindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.code] = true;
      if ((e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') && playerRef.current.grounded) {
        playerRef.current.vy = -11.5;
        playerRef.current.grounded = false;
        soundEngine.playJump();
      }
      if (e.code === 'KeyE' || e.code === 'Enter') {
        if (nearbyEntity) triggerEntityAction(nearbyEntity);
      }
    };
    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearbyEntity, triggerEntityAction]);

  // Main 60fps Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let time = 0;

    // Floating ambient particles
    const motes = Array.from({ length: 24 }, (_, i) => ({
      x: (i * 97) % 1000,
      y: (i * 53) % 320,
      r: 2 + (i % 4),
      speed: 0.25 + (i % 5) * 0.1
    }));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += reducedMotion ? 0.01 : 0.03;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const groundY = height * 0.78;

      // Update player physics
      const p = playerRef.current;
      let moveDir = 0;
      if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) moveDir -= 1;
      if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) moveDir += 1;
      if (joystickRef.current.active) moveDir = joystickRef.current.dx;

      const speed = 4.5;
      p.x += moveDir * speed;
      p.x = Math.max(40, Math.min(width - 40, p.x));
      if (moveDir !== 0) {
        p.facing = moveDir > 0 ? 1 : -1;
        p.walkPhase += 0.22;
      } else {
        p.walkPhase = 0;
      }

      // Gravity & jump
      p.y += p.vy;
      if (p.y < 0) {
        p.vy += 0.62;
      } else {
        p.y = 0;
        p.vy = 0;
        p.grounded = true;
      }

      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, zone.skyTop);
      skyGrad.addColorStop(1, zone.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Radiant Sun / Celestial Orb
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.beginPath();
      ctx.arc(width * 0.82 - p.x * 0.03, height * 0.2, 46, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Parallax Far Mountains / Hills (2.5D Depth Layer 1)
      ctx.fillStyle = zone.hillFar;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let x = 0; x <= width + 60; x += 60) {
        const wave = Math.sin((x + p.x * 0.15) * 0.008) * 48 + Math.cos((x + p.x * 0.1) * 0.015) * 24;
        ctx.lineTo(x, groundY - 95 - wave);
      }
      ctx.lineTo(width, groundY);
      ctx.closePath();
      ctx.fill();

      // 4. Parallax Mid Hills (2.5D Depth Layer 2)
      ctx.fillStyle = zone.hillNear;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let x = 0; x <= width + 40; x += 40) {
        const wave = Math.sin((x + p.x * 0.32) * 0.012 + 1.5) * 32;
        ctx.lineTo(x, groundY - 45 - wave);
      }
      ctx.lineTo(width, groundY);
      ctx.closePath();
      ctx.fill();

      // 5. Foreground 2.5D Walkable Path & Depth Strip
      ctx.fillStyle = zone.ground;
      ctx.fillRect(0, groundY, width, height - groundY);

      // Highlighted 2.5D Top Walk Surface
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(0, groundY, width, 14);

      // Decorative Stepping Stones
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      for (let sx = 30; sx < width; sx += 75) {
        ctx.beginPath();
        ctx.ellipse(sx, groundY + 26, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Floating Magic Motes
      motes.forEach((m) => {
        const mx = (m.x + time * 18 * m.speed) % width;
        const my = m.y + Math.sin(time * 2 + m.x) * 8;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(mx, my, m.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. Interactive Zone Landmarks (Sage, Puzzle Altar, Guardian, Chest)
      let closest = null;
      let closestDist = 72;

      entities.forEach((ent) => {
        const ex = width * ent.xRatio;
        const ey = groundY + 6;
        const bob = Math.sin(time * 3 + ent.xRatio * 10) * 5;

        // Pedestal Base
        ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
        ctx.beginPath();
        ctx.ellipse(ex, ey + 4, 34, 9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Beacon Pillar
        const grad = ctx.createLinearGradient(ex, ey - 95, ex, ey);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, ent.color + '66');
        ctx.fillStyle = grad;
        ctx.fillRect(ex - 22, ey - 95, 44, 95);

        // Distinct Vector Landmark Shape
        ctx.save();
        ctx.translate(ex, ey - 34 + bob);
        if (ent.type === 'story') {
          // Sage Lantern & Scroll Pillar
          ctx.fillStyle = '#fef3c7';
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, -10, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#b45309';
          ctx.fillRect(-10, -17, 20, 14);
        } else if (ent.type === 'puzzle') {
          // Floating Arcane Crystal Diamond
          ctx.fillStyle = '#ddd6fe';
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, -34);
          ctx.lineTo(20, -10);
          ctx.lineTo(0, 14);
          ctx.lineTo(-20, -10);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (ent.type === 'battle') {
          // Zone Guardian Crest
          ctx.fillStyle = zone.color;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(-24, -32, 48, 44, 16);
          ctx.fill();
          ctx.stroke();
          // Cute Guardian Eyes
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(-8, -14, 5, 0, Math.PI * 2);
          ctx.arc(8, -14, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(-8, -14, 2.5, 0, Math.PI * 2);
          ctx.arc(8, -14, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (ent.type === 'chest') {
          // Treasure Chest
          ctx.fillStyle = chestOpened ? '#64748b' : '#d97706';
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.roundRect(-22, -22, 44, 28, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(-5, -13, 10, 10);
        }
        ctx.restore();

        // Floating Label Badge
        const labelText = ent.label[lang];
        ctx.font = 'bold 12px system-ui, sans-serif';
        const textW = ctx.measureText(labelText).width + 18;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
        ctx.beginPath();
        ctx.roundRect(ex - textW / 2, ey - 96 + bob, textW, 22, 11);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(labelText, ex, ey - 81 + bob);

        const dist = Math.abs(p.x - ex);
        if (dist < closestDist) {
          closestDist = dist;
          closest = ent;
        }
      });

      setNearbyEntity(closest);

      // 8. Draw Animated 2.5D Hero Character on Canvas
      const hx = p.x;
      const hy = groundY + 8 + p.y;
      const walkBob = Math.abs(Math.sin(p.walkPhase)) * 5;
      const outfit = HERO_OUTFITS.find((o) => o.id === heroConfig.outfit) || HERO_OUTFITS[0];
      const hat = HERO_HATS.find((h) => h.id === heroConfig.hat) || HERO_HATS[0];
      const companion = HERO_COMPANIONS.find((c) => c.id === heroConfig.companion) || HERO_COMPANIONS[0];

      // Shadow
      ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
      ctx.beginPath();
      ctx.ellipse(hx, groundY + 10, p.grounded ? 20 : 13, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Companion Orb orbiting Hero
      const compX = hx - p.facing * 28 + Math.cos(time * 4) * 5;
      const compY = hy - 54 + Math.sin(time * 5) * 6;
      ctx.fillStyle = companion.color;
      ctx.beginPath();
      ctx.arc(compX, compY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(hx, hy - walkBob);
      ctx.scale(p.facing, 1);

      // Legs animation
      const legSwing = Math.sin(p.walkPhase) * 6;
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.roundRect(-11 + legSwing, -14, 9, 14, 4);
      ctx.roundRect(2 - legSwing, -14, 9, 14, 4);
      ctx.fill();

      // Tunic Body
      ctx.fillStyle = outfit.primary;
      ctx.strokeStyle = outfit.trim;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-15, -42, 30, 30, 10);
      ctx.fill();
      ctx.stroke();

      // Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(0, -56, 16, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(6, -57, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Hat
      ctx.fillStyle = hat.color;
      ctx.beginPath();
      ctx.arc(0, -64, 15, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(-18, -65, 36, 4);

      ctx.restore();

      // Interaction Prompt Ring above Hero when near an entity
      if (closest) {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.roundRect(hx - 48, hy - 102, 96, 22, 11);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`[E] ${closest.label[lang]}`, hx, hy - 87);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [zone, heroConfig, lang, reducedMotion, entities, chestOpened]);

  // Handle direct canvas tap/click to walk & interact
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Check if user clicked directly on an entity
    const clickedEntity = entities.find((ent) => Math.abs(width * ent.xRatio - clickX) < 46);
    playerRef.current.x = Math.max(40, Math.min(width - 40, clickX));
    if (clickedEntity) {
      triggerEntityAction(clickedEntity);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[360px] sm:h-[430px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/70 select-none">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block cursor-pointer"
      />

      {/* Quick-Interact Action Cards Overlay at Top */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 justify-between pointer-events-none">
        <div className="bg-slate-900/75 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 pointer-events-auto">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>{zone.name[lang]}</span>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={onTriggerStory}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-lg transition transform active:scale-95"
          >
            <Scroll className="w-3.5 h-3.5" />
            <span>{UI_TEXT[lang].storyMission}</span>
          </button>
          <button
            onClick={onTriggerPuzzle}
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-lg transition transform active:scale-95"
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span>{UI_TEXT[lang].puzzleChallenge}</span>
          </button>
          <button
            onClick={onTriggerBattle}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-lg transition transform active:scale-95"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>{UI_TEXT[lang].quizBattle}</span>
          </button>
        </div>
      </div>

      {/* Responsive Touch Virtual Controls (Mobile & Tablet Friendly) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        {/* Left/Right Virtual Pad */}
        <div className="flex items-center gap-2 bg-slate-900/65 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
          <button
            onMouseDown={() => (joystickRef.current = { dx: -1, active: true })}
            onMouseUp={() => (joystickRef.current = { dx: 0, active: false })}
            onMouseLeave={() => (joystickRef.current = { dx: 0, active: false })}
            onTouchStart={(e) => {
              e.preventDefault();
              joystickRef.current = { dx: -1, active: true };
            }}
            onTouchEnd={() => (joystickRef.current = { dx: 0, active: false })}
            aria-label="Move Left"
            className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 active:bg-amber-400 active:text-slate-950 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onMouseDown={() => (joystickRef.current = { dx: 1, active: true })}
            onMouseUp={() => (joystickRef.current = { dx: 0, active: false })}
            onMouseLeave={() => (joystickRef.current = { dx: 0, active: false })}
            onTouchStart={(e) => {
              e.preventDefault();
              joystickRef.current = { dx: 1, active: true };
            }}
            onTouchEnd={() => (joystickRef.current = { dx: 0, active: false })}
            aria-label="Move Right"
            className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 active:bg-amber-400 active:text-slate-950 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              if (playerRef.current.grounded) {
                playerRef.current.vy = -11.5;
                playerRef.current.grounded = false;
                soundEngine.playJump();
              }
            }}
            aria-label="Jump"
            className="w-11 h-11 rounded-xl bg-sky-500/80 hover:bg-sky-400 text-white flex items-center justify-center transition"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Context Interact Button */}
        {nearbyEntity ? (
          <button
            onClick={() => triggerEntityAction(nearbyEntity)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4" />
            <span>{nearbyEntity.label[lang]}</span>
          </button>
        ) : (
          <div className="hidden sm:block bg-slate-900/70 backdrop-blur-md text-slate-200 px-3.5 py-2 rounded-xl text-xs">
            {UI_TEXT[lang].controlsDesktop}
          </div>
        )}
      </div>
    </div>
  );
};

const ENGLISH_DICTIONARY_FAVORITES_KEY = 'knowledge-odyssey-english-dictionary-favorites-v1';
const ENGLISH_DICTIONARY_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const getDictionarySequence = (entry) => {
  const cardinalMatch = entry.id.match(/^number-cardinal-(\d+)$/);
  if (cardinalMatch) {
    const value = Number(cardinalMatch[1]);
    return [0, value === 0 ? 1000.5 : value - 1];
  }
  const ordinalMatch = entry.id.match(/^number-ordinal-(\d+)$/);
  if (ordinalMatch) return [1, Number(ordinalMatch[1])];
  return [2, entry.sequenceOrder ?? Number.MAX_SAFE_INTEGER];
};
const CURATED_DICTIONARY_ENTRY_COUNT = COMPREHENSIVE_DICTIONARY_ENTRIES.filter(
  (entry) => entry.source === 'curated'
).length;
const GENERATED_DICTIONARY_ENTRY_COUNT = COMPREHENSIVE_DICTIONARY_ENTRIES.length - CURATED_DICTIONARY_ENTRY_COUNT;

function ComprehensiveDictionaryPanel() {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [letter, setLetter] = useState('ALL');
  const [sortBy, setSortBy] = useState('sequence');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [canSaveFavorites, setCanSaveFavorites] = useState(false);
  const [storageMessage, setStorageMessage] = useState('');
  const [speechMessage, setSpeechMessage] = useState('');
  const [expandedExamples, setExpandedExamples] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches ? 4 : 8
  );
  const [pageInput, setPageInput] = useState('1');
  const [pageJumpMessage, setPageJumpMessage] = useState('');
  const pageNavigationRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (pageSize === 4 || pageSize === 8) return;
    setPageSize(window.matchMedia('(max-width: 639px)').matches ? 4 : 8);
    setPage(0);
  }, [pageSize]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ENGLISH_DICTIONARY_FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed) || parsed.some((id) => typeof id !== 'string')) {
          throw new Error('Saved dictionary favorites have an invalid format.');
        }
        setFavorites(parsed);
      }
      setCanSaveFavorites(true);
    } catch (error) {
      console.error('Unable to load dictionary favorites.', error);
      setStorageMessage('Favorit tidak dapat dimuat dari penyimpanan browser.');
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesLoaded || !canSaveFavorites) return;
    try {
      window.localStorage.setItem(ENGLISH_DICTIONARY_FAVORITES_KEY, JSON.stringify(favorites));
      setStorageMessage((current) =>
        current === 'Favorit berubah, tetapi gagal disimpan di browser ini.' ? '' : current
      );
    } catch (error) {
      console.error('Unable to save dictionary favorites.', error);
      setStorageMessage('Favorit berubah, tetapi gagal disimpan di browser ini.');
    }
  }, [canSaveFavorites, favorites, favoritesLoaded]);

  const filteredEntries = useMemo(() => {
    const trimmedQuery = query.trim();
    const normalizedQuery = trimmedQuery.toLocaleLowerCase();
    const numericQuery = /^\d{1,12}$/.test(trimmedQuery) ? Number(trimmedQuery) : null;
    const entries = [...COMPREHENSIVE_DICTIONARY_ENTRIES];

    if (numericQuery !== null && numericQuery > 1000 && categoryId !== 'all' && categoryId !== 'numbers') {
      return [];
    }
    if (numericQuery !== null && numericQuery > 1000) {
      const generatedEntry = createNumberSearchEntry(numericQuery);
      if (generatedEntry) entries.push(generatedEntry);
    }

    return entries
      .filter((entry) => categoryId === 'all' || entry.categoryId === categoryId)
      .filter((entry) => letter === 'ALL' || entry.english.toLocaleUpperCase().startsWith(letter))
      .filter((entry) => !favoritesOnly || favorites.includes(entry.id))
      .filter((entry) => {
        if (!normalizedQuery) return true;
        return [
          entry.indonesian,
          entry.english,
          entry.partOfSpeech,
          entry.pronunciationIPA,
          entry.usageNote,
        ].some((value) => value?.toLocaleLowerCase().includes(normalizedQuery)) ||
        (numericQuery !== null && entry.id === `number-cardinal-${numericQuery}`);
      })
      .sort((a, b) => {
        if (sortBy === 'sequence') {
          const [aGroup, aOrder] = getDictionarySequence(a);
          const [bGroup, bOrder] = getDictionarySequence(b);
          return aGroup - bGroup || aOrder - bOrder;
        }
        return a[sortBy].localeCompare(b[sortBy], sortBy === 'english' ? 'en' : 'id');
      });
  }, [categoryId, favorites, favoritesOnly, letter, query, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const visibleEntries = filteredEntries.slice(page * pageSize, (page + 1) * pageSize);
  const paginationState = `${page}:${pageCount}`;
  useEffect(() => {
    if (page >= pageCount) {
      setPage(pageCount - 1);
      return;
    }
    setPageInput(String(page + 1));
  }, [paginationState]);

  const updateQuery = (value) => {
    setQuery(value);
    setPage(0);
    setPageJumpMessage('');
  };
  const navigateToPage = (targetPage) => {
    setPage(targetPage);
    setPageJumpMessage('');
    window.requestAnimationFrame(() => {
      const results = resultsRef.current;
      if (
        results &&
        window.matchMedia('(max-width: 639px)').matches &&
        results.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        return;
      }
      (resultsRef.current || pageNavigationRef.current)?.scrollIntoView({
        behavior: window.matchMedia('(max-width: 639px)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };
  const toggleFavorite = (entryId) => {
    setCanSaveFavorites(true);
    setFavorites((current) =>
      current.includes(entryId)
        ? current.filter((id) => id !== entryId)
        : [...current, entryId]
    );
  };
  const goToPage = () => {
    const requestedPage = Number(pageInput);
    if (!Number.isInteger(requestedPage) || requestedPage < 1 || requestedPage > pageCount) {
      setPageJumpMessage(`Masukkan nomor halaman dari 1 sampai ${pageCount}.`);
      return;
    }
    navigateToPage(requestedPage - 1);
  };
  const speakEnglish = (entry) => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setSpeechMessage('Fitur pengucapan audio tidak tersedia di browser ini.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(entry.english);
    utterance.lang = 'en-US';
    utterance.onerror = () => setSpeechMessage('Audio pengucapan gagal diputar.');
    utterance.onend = () => setSpeechMessage('');
    window.speechSynthesis.speak(utterance);
    setSpeechMessage(`Melafalkan: ${entry.english}`);
  };

  return (
    <section className="animations-active dictionary-frame-glow space-y-1 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-slate-900/95 via-indigo-950/80 to-slate-900/95 p-2 shadow-xl sm:space-y-4 sm:rounded-3xl sm:p-6">
      <div className="flex items-start justify-between gap-2 lg:gap-3">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-amber-300 sm:gap-2 sm:px-3 sm:text-[10px]">
            Materi pembuka • {COMPREHENSIVE_DICTIONARY_ENTRIES.length.toLocaleString('id-ID')} entri
          </div>
          <h3 className="dictionary-title-frame mt-1 flex w-fit max-w-full items-center gap-1 rounded-xl border border-amber-300/35 bg-amber-300/5 px-2 py-1.5 text-[13px] font-black leading-tight sm:mt-2 sm:gap-2 sm:px-3 sm:py-2 sm:text-2xl">
            <Sparkles aria-hidden="true" className="dictionary-star-glint h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5" />
            <span className="dictionary-title-text min-w-0 flex-1">KAMUS BAHASA INGGRIS LENGKAP</span>
            <span aria-hidden="true" className="dictionary-thumbs-float shrink-0 text-sm sm:text-xl">👍</span>
            <Sparkles aria-hidden="true" className="dictionary-star-glint h-3 w-3 shrink-0 sm:h-4 sm:w-4" style={{ animationDelay: '0.8s' }} />
          </h3>
          <p className="mt-1 hidden max-w-3xl text-xs leading-relaxed text-slate-300 sm:block sm:text-sm">
            Indonesian – English Comprehensive Dictionary. Cari dari kedua bahasa, telusuri 18 kategori, simpan favorit, dan pelajari contoh kalimat.
          </p>
          <p className="mt-1 hidden text-[11px] leading-relaxed text-slate-400 sm:block">
            Korpus awal: {CURATED_DICTIONARY_ENTRY_COUNT.toLocaleString('id-ID')} kosakata terkurasi + {GENERATED_DICTIONARY_ENTRY_COUNT.toLocaleString('id-ID')} entri bilangan. Data dapat diperluas bertahap.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFavoritesOnly((current) => !current);
            setPage(0);
            setPageJumpMessage('');
          }}
          aria-pressed={favoritesOnly}
          className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-extrabold transition sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs ${
            favoritesOnly
              ? 'bg-amber-300 text-slate-950'
              : 'bg-white/10 text-amber-200 hover:bg-white/15'
          }`}
        >
          <Star className={`h-4 w-4 ${favoritesOnly ? 'fill-current' : ''}`} />
          {favoritesOnly ? 'Semua kosakata' : `Favorit (${favorites.length})`}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-[minmax(0,1fr)_260px_170px]">
        <label className="relative block">
          <span className="sr-only">Cari kosakata Indonesia atau Inggris</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Cari kata Indonesia atau English..."
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 py-2 pl-10 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none sm:py-2.5 sm:text-sm"
          />
        </label>
        <label className="hidden text-xs font-bold text-slate-300 sm:block">
          <span className="sr-only">Filter kategori kosakata</span>
          <select
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
              setPage(0);
              setPageJumpMessage('');
            }}
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
          >
            <option value="all">Semua kategori</option>
            {COMPREHENSIVE_DICTIONARY_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </label>
        <label className="hidden text-xs font-bold text-slate-300 sm:block">
          <span className="sr-only">Urutkan kosakata A sampai Z</span>
          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setPage(0);
              setPageJumpMessage('');
            }}
            className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
          >
            <option value="sequence">Urutan materi (mulai dari 1)</option>
            <option value="english">A–Z English</option>
            <option value="indonesian">A–Z Indonesia</option>
          </select>
        </label>
      </div>

      <details className="group relative sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-[11px] font-bold text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
          Filter kategori, urutan, dan huruf
          <ChevronRight className="h-4 w-4 text-amber-300 transition-transform group-open:rotate-90" />
        </summary>
        <div className="absolute left-0 right-0 top-full z-30 mt-2 grid grid-cols-1 gap-2 rounded-2xl border border-white/15 bg-slate-950 p-3 shadow-2xl">
          <label className="text-[10px] font-bold text-slate-300">
            Kategori
            <select
              value={categoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
                setPage(0);
                setPageJumpMessage('');
                event.currentTarget.closest('details').open = false;
              }}
              className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-2.5 py-2 text-xs text-white"
            >
              <option value="all">Semua kategori</option>
              {COMPREHENSIVE_DICTIONARY_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </label>
          <label className="text-[10px] font-bold text-slate-300">
            Urutan kosakata
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setPage(0);
                setPageJumpMessage('');
                event.currentTarget.closest('details').open = false;
              }}
              className="mt-1 w-full rounded-lg border border-white/15 bg-slate-900 px-2.5 py-2 text-xs text-white"
            >
              <option value="sequence">Urutan materi (mulai dari 1)</option>
              <option value="english">A–Z English</option>
              <option value="indonesian">A–Z Indonesia</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-1" aria-label="Filter huruf awal bahasa Inggris">
            {['ALL', ...ENGLISH_DICTIONARY_ALPHABET].map((initial) => (
              <button
                key={initial}
                type="button"
                onClick={(event) => {
                  setLetter(initial);
                  setPage(0);
                  setPageJumpMessage('');
                  event.currentTarget.closest('details').open = false;
                }}
                aria-pressed={letter === initial}
                className={`min-w-7 rounded-md px-1.5 py-1 text-[9px] font-bold ${
                  letter === initial ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-slate-300'
                }`}
              >
                {initial === 'ALL' ? 'Semua' : initial}
              </button>
            ))}
          </div>
        </div>
      </details>

      <div className="hidden flex-wrap gap-1.5 sm:flex" aria-label="Filter huruf awal bahasa Inggris">
        {['ALL', ...ENGLISH_DICTIONARY_ALPHABET].map((initial) => (
          <button
            key={initial}
            type="button"
            onClick={() => {
              setLetter(initial);
              setPage(0);
              setPageJumpMessage('');
            }}
            aria-pressed={letter === initial}
            className={`min-w-8 rounded-lg px-2 py-1 text-[10px] font-bold transition ${
              letter === initial
                ? 'bg-amber-400 text-slate-950'
                : 'bg-white/5 text-slate-300 hover:bg-white/15'
            }`}
          >
            {initial === 'ALL' ? 'Semua' : initial}
          </button>
        ))}
      </div>

      <div className="flex min-h-4 flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400 sm:text-xs" aria-live="polite">
        <span>
          {filteredEntries.length
            ? `Menampilkan ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filteredEntries.length)} dari ${filteredEntries.length.toLocaleString('id-ID')} kosakata`
            : 'Tidak ada kosakata yang cocok.'}
        </span>
        {storageMessage && <span className="text-rose-300">{storageMessage}</span>}
        {speechMessage && <span className="text-sky-300">{speechMessage}</span>}
        {pageJumpMessage && <span className="text-rose-300">{pageJumpMessage}</span>}
      </div>

      <nav
        ref={pageNavigationRef}
        aria-label="Navigasi halaman kamus"
        className="scroll-mt-28 flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-3"
      >
        <p className="hidden text-[10px] leading-relaxed text-slate-400 sm:block sm:max-w-xs">
          Bilangan 0–1.000, ordinal 1–100, hingga 999.999.999.999.
        </p>
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-end sm:gap-2">
          <label className="col-start-1 row-start-2 flex items-center justify-center gap-1 text-[9px] font-bold text-slate-300 sm:col-auto sm:row-auto sm:justify-start sm:gap-2 sm:text-[10px]">
            <span className="sm:hidden">Per</span>
            <span className="hidden sm:inline">Per halaman</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(0);
                setPageJumpMessage('');
              }}
              aria-label="Jumlah kosakata per halaman"
              className="w-12 rounded-lg border border-white/15 bg-slate-950 px-1.5 py-1 text-[10px] text-white focus:border-amber-400 focus:outline-none sm:w-auto sm:px-2 sm:py-1.5 sm:text-xs"
            >
              {[4, 8].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={page === 0}
            onClick={() => navigateToPage(Math.max(0, page - 1))}
            className="col-start-1 row-start-1 w-full rounded-lg bg-white/10 px-1.5 py-1.5 text-[9px] font-bold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40 sm:col-auto sm:row-auto sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs"
          >
            Sebelumnya
          </button>
          <span className="col-start-2 row-start-1 justify-self-center text-[10px] font-bold text-slate-300 sm:col-auto sm:row-auto sm:self-center sm:text-xs">{page + 1}/{pageCount}</span>
          <button
            type="button"
            disabled={page + 1 >= pageCount}
            onClick={() => navigateToPage(Math.min(pageCount - 1, page + 1))}
            className="col-start-3 row-start-1 w-full rounded-lg bg-white/10 px-1.5 py-1.5 text-[9px] font-bold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40 sm:col-auto sm:row-auto sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs"
          >
            Berikutnya
          </button>
          <label className="col-span-2 col-start-2 row-start-2 flex items-center justify-end gap-1 text-[9px] font-bold text-slate-300 sm:col-auto sm:row-auto sm:gap-2 sm:text-[10px]">
            Ke halaman
            <input
              type="number"
              min="1"
              max={pageCount}
              value={pageInput}
              onChange={(event) => {
                setPageInput(event.target.value);
                setPageJumpMessage('');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') goToPage();
              }}
              aria-label={`Nomor halaman, dari 1 sampai ${pageCount}`}
              className="w-12 rounded-lg border border-white/15 bg-slate-950 px-1.5 py-1 text-[10px] text-white focus:border-amber-400 focus:outline-none sm:w-16 sm:px-2 sm:py-1.5 sm:text-xs"
            />
            <button
              type="button"
              onClick={goToPage}
              className="rounded-lg bg-amber-400/15 px-2 py-1.5 text-[9px] font-bold text-amber-200 hover:bg-amber-400/25 sm:px-2.5 sm:py-1.5 sm:text-[10px]"
            >
              Buka
            </button>
          </label>
        </div>
      </nav>

      {visibleEntries.length > 0 && (
        <div ref={resultsRef} className="scroll-mt-28 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleEntries.map((entry) => {
            const category = COMPREHENSIVE_DICTIONARY_CATEGORIES.find((item) => item.id === entry.categoryId);
            const isFavorite = favorites.includes(entry.id);
            const exampleIsOpen = Boolean(expandedExamples[entry.id]);
            return (
              <article
                key={entry.id}
                className="flex min-w-0 min-h-36 flex-col justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/55 p-3 transition hover:border-amber-400/35 sm:gap-2.5 sm:rounded-2xl sm:p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className={`hidden text-[10px] font-bold text-amber-300 sm:block`}>{category?.label}</span>
                    <h4 className="break-words text-[10px] font-black leading-tight text-white sm:mt-1 sm:text-sm">{entry.indonesian}</h4>
                    <p className="break-words text-[10px] font-bold leading-tight text-sky-200 sm:text-sm">{entry.english}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(entry.id)}
                    aria-label={isFavorite ? `Hapus ${entry.indonesian} dari favorit` : `Simpan ${entry.indonesian} ke favorit`}
                    aria-pressed={isFavorite}
                    className={`shrink-0 rounded-md p-1 transition sm:rounded-lg sm:p-2 ${
                      isFavorite ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    <Star className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="flex min-w-0 flex-col gap-1 border-t border-white/10 pt-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2 sm:pt-2">
                  <div className="min-w-0 flex-1">
                    <span className="hidden text-[10px] uppercase tracking-wide text-violet-300 sm:block">{entry.partOfSpeech}</span>
                    <p
                      title={entry.pronunciationIPA}
                      className="truncate whitespace-nowrap font-mono text-[8px] leading-tight text-amber-200 sm:whitespace-normal sm:text-[11px]"
                    >
                      {entry.pronunciationIPA}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => speakEnglish(entry)}
                      aria-label={`Dengarkan pelafalan ${entry.english}`}
                      className="rounded-md bg-sky-500/15 p-1.5 text-sky-200 hover:bg-sky-500/25 sm:rounded-lg sm:p-2"
                    >
                      <Volume1 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedExamples((current) => ({ ...current, [entry.id]: !current[entry.id] }))}
                      aria-expanded={exampleIsOpen}
                      className="rounded-md bg-indigo-500/15 px-2 py-1.5 text-[9px] font-bold text-indigo-200 hover:bg-indigo-500/25 sm:rounded-lg sm:px-2.5 sm:py-2 sm:text-[10px]"
                    >
                      <span className="sm:hidden">{exampleIsOpen ? 'Tutup' : 'Contoh'}</span>
                      <span className="hidden sm:inline">{exampleIsOpen ? 'Tutup contoh' : 'Contoh kalimat'}</span>
                    </button>
                  </div>
                </div>
                {entry.usageNote && (
                  <p className={`hidden text-[11px] leading-relaxed text-slate-400 sm:block ${exampleIsOpen ? '!block' : ''}`}>
                    {entry.usageNote}
                  </p>
                )}
                {exampleIsOpen && (
                  <div className="space-y-1 rounded-xl border border-sky-400/20 bg-sky-500/10 p-3 text-xs leading-relaxed">
                    <p className="text-sky-100">{entry.exampleEnglish}</p>
                    <p className="text-slate-300">{entry.exampleIndonesian}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}

const BASIC_OPERATION_ENTRIES = [
  { id: 'dict-math-basic-1', label: 'Penjumlahan', symbol: '+' },
  { id: 'dict-math-basic-2', label: 'Pengurangan', symbol: '−' },
  { id: 'dict-math-basic-3', label: 'Perkalian', symbol: '×' },
  { id: 'dict-math-basic-4', label: 'Pembagian', symbol: '÷' },
];

function BasicOperationsExplorer({ activeEntry, onSelectEntry }) {
  const activeOperation = BASIC_OPERATION_ENTRIES.find((operation) => operation.id === activeEntry.id);
  const [baseNumber, setBaseNumber] = useState(1);

  if (!activeOperation) return null;

  const numberRange = Array.from({ length: 100 }, (_, index) => index + 1);
  const calculateResult = (number) => {
    if (activeOperation.id === 'dict-math-basic-1') return baseNumber + number;
    if (activeOperation.id === 'dict-math-basic-2') return baseNumber - number;
    if (activeOperation.id === 'dict-math-basic-3') return baseNumber * number;
    return Number((baseNumber / number).toFixed(3));
  };

  return (
    <section className="space-y-3 rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-black text-violet-200">Latihan Operasi Dasar 1–100</h4>
          <p className="mt-1 text-xs text-slate-300">Pilih operasi dan bilangan dasar untuk melihat 100 perhitungan.</p>
        </div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
          Bilangan dasar
          <select
            aria-label="Pilih bilangan dasar dari 1 sampai 100"
            value={baseNumber}
            onChange={(event) => setBaseNumber(Number(event.target.value))}
            className="rounded-lg border border-white/15 bg-slate-950 px-2.5 py-1.5 text-amber-200"
          >
            {numberRange.map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Pilih operasi matematika">
        {BASIC_OPERATION_ENTRIES.map((operation) => {
          const entry = KNOWLEDGE_DICTIONARY.find((item) => item.id === operation.id);
          const isActive = operation.id === activeOperation.id;
          return (
            <button
              key={operation.id}
              type="button"
              onClick={() => entry && onSelectEntry(entry)}
              aria-pressed={isActive}
              className={`rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                isActive
                  ? 'bg-violet-400 text-slate-950'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {operation.label}
            </button>
          );
        })}
      </div>

      <div
        className="grid max-h-56 grid-cols-2 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-5 lg:grid-cols-10"
        aria-label={`${activeOperation.label} dengan bilangan 1 sampai 100`}
      >
        {numberRange.map((number) => (
          <div
            key={number}
            className="rounded-lg border border-white/10 bg-slate-950/60 px-2 py-1.5 text-center text-[10px] leading-relaxed text-slate-200"
          >
            <span className="block text-slate-400">{baseNumber} {activeOperation.symbol} {number}</span>
            <span className="font-black text-amber-200">= {calculateResult(number)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// 11. MAIN APPLICATION: KNOWLEDGE ODYSSEY
// ============================================================================
export default function App() {
  // Navigation Screen State & History Stack for Back Button Support
  const [screen, setScreenState] = useState('welcome'); // welcome | map | zone | battle | puzzle | story | custom | library | profile | settings | results
  const [navHistory, setNavHistory] = useState([]);
  const [lang, setLang] = useState('id');
  const t = UI_TEXT[lang];

  // Push-aware screen navigation helper
  const setScreen = useCallback((nextScreen) => {
    setScreenState((prev) => {
      if (prev === nextScreen) return prev;
      if (nextScreen === 'welcome') {
        setNavHistory([]);
        return 'welcome';
      }
      setNavHistory((hist) => [...hist, prev]);
      return nextScreen;
    });
  }, []);

  // Step backward through navigation history all the way back to Welcome / Porto
  const handleGoBack = useCallback(() => {
    soundEngine.playClick();
    setNavHistory((hist) => {
      if (hist.length === 0) {
        setScreenState('welcome');
        return [];
      }
      const previousScreen = hist[hist.length - 1];
      setScreenState(previousScreen);
      return hist.slice(0, -1);
    });
  }, []);

  // Player Persistent Profile & Adaptive State
  const [hasSave, setHasSave] = useState(false);
  const [player, setPlayer] = useState({
    name: 'Arya',
    level: 1,
    xp: 0,
    coins: 50,
    hints: 3,
    hat: 'explorer_cap',
    outfit: 'tunic_blue',
    companion: 'wisp_gold',
    unlockedItems: ['explorer_cap', 'tunic_blue', 'wisp_gold'],
    unlockedAchievements: [],
    discoveredLore: [],
    openedChests: {},
    zoneStats: {
      language: { correct: 0, total: 0, weakTopics: {} },
      math: { correct: 0, total: 0, weakTopics: {} },
      history: { correct: 0, total: 0, weakTopics: {} },
      science: { correct: 0, total: 0, weakTopics: {} },
      geography: { correct: 0, total: 0, weakTopics: {} },
      modern: { correct: 0, total: 0, weakTopics: {} }
    },
    historyLog: []
  });

  // Accessibility & Audio Settings
  const [settings, setSettings] = useState({
    textSize: 'normal', // normal | large | xlarge
    reducedMotion: false,
    subtitles: true,
    musicVol: 0.25,
    sfxVol: 0.55,
    muted: false
  });
  const [subtitleBanner, setSubtitleBanner] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Active Zone & Session State
  const [activeZoneId, setActiveZoneId] = useState('language');
  const activeZone = useMemo(() => ZONES.find((z) => z.id === activeZoneId) || ZONES[0], [activeZoneId]);

  // Adaptive Customizer Config
  const [customConfig, setCustomConfig] = useState({
    selectedZones: ['language', 'math', 'history', 'science', 'geography', 'modern'],
    difficulty: 'All',
    questionCount: 5,
    timedMode: false
  });

  // Quiz Battle Runtime State
  const [quizQueue, setQuizQueue] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerResult, setAnswerResult] = useState(null); // null | 'correct' | 'wrong'
  const [calloutText, setCalloutText] = useState('');
  const [heroAnim, setHeroAnim] = useState('idle');
  const [monsterHit, setMonsterHit] = useState(false);
  const [combo, setCombo] = useState(0);
  const [sessionScore, setSessionScore] = useState({ correct: 0, xpEarned: 0, coinsEarned: 0 });
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [hintUsedForCurrent, setHintUsedForCurrent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [libraryFilter, setLibraryFilter] = useState('all');
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryLetter, setLibraryLetter] = useState('ALL');
  const [libraryPage, setLibraryPage] = useState(0);
  const [libraryPageSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches ? 6 : 8
  );
  const [selectedDictEntry, setSelectedDictEntry] = useState(null);
  const [libraryTab, setLibraryTab] = useState('dictionary'); // dictionary | questions

  // Puzzle Runtime State
  const [activePuzzleIdx, setActivePuzzleIdx] = useState(0);
  const [puzzleOrder, setPuzzleOrder] = useState([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleFeedback, setPuzzleFeedback] = useState(null);

  // Story Runtime State
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [storyChoiceResult, setStoryChoiceResult] = useState(null);

  // Track seen question IDs so consecutive battles always rotate fresh material
  const seenQuestionIdsRef = useRef(new Set());
  const lastZoneVariantsRef = useRef({});

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  }, []);

  // Load saved profile from IndexedDB on mount
  useEffect(() => {
    loadFromStorage().then((saved) => {
      if (saved && saved.player) {
        setPlayer({
          ...saved.player,
          name: saved.player.name === 'Aria' ? 'Arya' : saved.player.name
        });
        if (saved.settings) setSettings(saved.settings);
        if (saved.lang) setLang(saved.lang);
        setHasSave(true);
      }
    });
  }, []);

  // Sync audio engine settings & subtitle listener
  useEffect(() => {
    soundEngine.musicVolume = settings.musicVol;
    soundEngine.sfxVolume = settings.sfxVol;
    soundEngine.muted = settings.muted;
    soundEngine.onSubtitle = (text) => {
      if (settings.subtitles) {
        setSubtitleBanner(text);
        setTimeout(() => setSubtitleBanner(''), 2200);
      }
    };
  }, [settings]);

  // Auto-save whenever player state updates
  useEffect(() => {
    if (player.xp > 0 || player.historyLog.length > 0 || Object.keys(player.openedChests).length > 0) {
      saveToStorage({ player, settings, lang });
      setHasSave(true);
    }
  }, [player, settings, lang]);

  // Adaptive Zone Recommendation
  const adaptiveRecommendation = useMemo(() => {
    let lowestZone = ZONES[0];
    let lowestScore = Infinity;
    ZONES.forEach((z) => {
      const s = player.zoneStats[z.id] || { correct: 0, total: 0 };
      const ratio = s.total === 0 ? -1 : s.correct / s.total;
      if (ratio < lowestScore) {
        lowestScore = ratio;
        lowestZone = z;
      }
    });
    return lowestZone;
  }, [player.zoneStats]);

  const enterZone = useCallback(
    (zoneId) => {
      const target = ZONES.find((z) => z.id === zoneId) || ZONES[0];
      soundEngine.init();
      soundEngine.playClick();
      soundEngine.startAmbient(target.musicFreqs);
      setActiveZoneId(target.id);
      setScreen('zone');
    },
    [setScreen]
  );

  // XP & Level-up Progression Helper
  const awardProgress = useCallback(
    (xpGain, coinGain, zoneId, isCorrect, topic) => {
      setPlayer((prev) => {
        const nextXp = prev.xp + xpGain;
        const xpNeeded = prev.level * 100;
        let nextLevel = prev.level;
        let remainingXp = nextXp;
        let leveledUp = false;

        if (remainingXp >= xpNeeded) {
          nextLevel += 1;
          remainingXp -= xpNeeded;
          leveledUp = true;
        }

        const zStat = prev.zoneStats[zoneId] || { correct: 0, total: 0, weakTopics: {} };
        const updatedWeak = { ...zStat.weakTopics };
        if (!isCorrect && topic) {
          updatedWeak[topic] = (updatedWeak[topic] || 0) + 1;
        } else if (isCorrect && topic && updatedWeak[topic]) {
          updatedWeak[topic] = Math.max(0, updatedWeak[topic] - 1);
        }

        const updatedStats = {
          ...prev.zoneStats,
          [zoneId]: {
            correct: zStat.correct + (isCorrect ? 1 : 0),
            total: zStat.total + 1,
            weakTopics: updatedWeak
          }
        };

        // Evaluate Achievements
        const newAchievements = new Set(prev.unlockedAchievements);
        if (isCorrect) newAchievements.add('first_step');
        if (nextLevel >= 3) newAchievements.add('level_3');
        const masteredZonesCount = Object.values(updatedStats).filter((st) => st.correct > 0).length;
        if (masteredZonesCount >= 3) newAchievements.add('polymath');

        if (leveledUp) {
          setTimeout(() => {
            soundEngine.playLevelUp();
            setShowLevelUpModal(true);
          }, 350);
        }

        return {
          ...prev,
          level: nextLevel,
          xp: remainingXp,
          coins: prev.coins + coinGain,
          hints: leveledUp ? prev.hints + 1 : prev.hints,
          zoneStats: updatedStats,
          unlockedAchievements: Array.from(newAchievements)
        };
      });
    },
    []
  );

  // Start Interactive Quiz Battle (Always rotates fresh, broad material & converts to Binary True/False Verification)
  const startQuizBattle = (zonesList = [activeZoneId], diff = 'All', count = 5, timed = false) => {
    soundEngine.playClick();
    let pool = QUESTION_BANK.filter((q) => zonesList.includes(q.zone));
    if (diff !== 'All') {
      const filtered = pool.filter((q) => q.difficulty === diff);
      if (filtered.length > 0) pool = filtered;
    }

    // Add dynamic procedural items across selected zones for infinite variety
    const dynamicItems = generateDynamicQuestions(zonesList, diff, 4);
    const allCandidates = [...pool, ...dynamicItems];

    // Prioritize unseen questions so right or wrong, the next encounter rotates fresh material
    const unseen = allCandidates.filter((q) => !seenQuestionIdsRef.current.has(q.id));
    let selectedRaw = [...unseen].sort(() => Math.random() - 0.5).slice(0, count);

    if (selectedRaw.length < count) {
      // Reset seen history if pool exhausted, while avoiding the exact previous batch
      const remainder = allCandidates
        .filter((q) => !selectedRaw.some((s) => s.id === q.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, count - selectedRaw.length);
      seenQuestionIdsRef.current.clear();
      selectedRaw = [...selectedRaw, ...remainder];
    }

    selectedRaw.forEach((q) => seenQuestionIdsRef.current.add(q.id));

    // Transform each question into a clean Binary Verification Challenge (True/Benar vs False/Salah)
    const binaryBattleQueue = selectedRaw.map((q) => {
      const presentAsTrue = Math.random() >= 0.45;
      const correctOptEn = q.options.en[q.correctAnswer];
      const correctOptId = q.options.id[q.correctAnswer];

      const wrongIndices = q.options.en
        .map((_, idx) => idx)
        .filter((idx) => idx !== q.correctAnswer);
      const pickedWrongIdx = wrongIndices[Math.floor(Math.random() * wrongIndices.length)] ?? 0;

      const shownOptEn = presentAsTrue ? correctOptEn : q.options.en[pickedWrongIdx];
      const shownOptId = presentAsTrue ? correctOptId : q.options.id[pickedWrongIdx];

      return {
        ...q,
        proposedStatement: {
          en: `${q.question.en} → Proposed Answer: "${shownOptEn}"`,
          id: `${q.question.id} → Pernyataan Jawaban: "${shownOptId}"`
        },
        options: {
          en: ['TRUE (Valid Statement)', 'FALSE (Incorrect Statement)'],
          id: ['BENAR (Pernyataan Tepat)', 'SALAH (Pernyataan Keliru)']
        },
        correctAnswer: presentAsTrue ? 0 : 1,
        fullCorrection: {
          en: `Correct Answer: "${correctOptEn}". ${q.explanation.en}`,
          id: `Koreksi Jawaban Tepat: "${correctOptId}". ${q.explanation.id}`
        }
      };
    });

    if (binaryBattleQueue.length === 0) return;

    setQuizQueue(binaryBattleQueue);
    setQuizIndex(0);
    setSelectedOption(null);
    setAnswerResult(null);
    setHeroAnim('idle');
    setCombo(0);
    setHintUsedForCurrent(false);
    setTimeLeft(25);
    setSessionScore({ correct: 0, xpEarned: 0, coinsEarned: 0 });
    setCustomConfig((prev) => ({ ...prev, timedMode: timed }));
    setScreen('battle');
  };

  // Handle Answer Selection
  const handleOptionSelect = (optionIdx) => {
    if (answerResult !== null) return;
    const currentQ = quizQueue[quizIndex];
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === currentQ.correctAnswer;
    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setAnswerResult('correct');
      setHeroAnim('victory');
      setMonsterHit(true);
      setTimeout(() => setMonsterHit(false), 500);

      const callouts = t.correctCallouts;
      setCalloutText(callouts[Math.floor(Math.random() * callouts.length)]);
      soundEngine.playCorrect();

      const xpGain = 35 + nextCombo * 5;
      const coinGain = 15 + nextCombo * 3;
      setSessionScore((prev) => ({
        correct: prev.correct + 1,
        xpEarned: prev.xpEarned + xpGain,
        coinsEarned: prev.coinsEarned + coinGain
      }));

      if (nextCombo >= 3) {
        setPlayer((prev) => ({
          ...prev,
          unlockedAchievements: Array.from(new Set([...prev.unlockedAchievements, 'streak_3']))
        }));
      }

      awardProgress(xpGain, coinGain, currentQ.zone, true, currentQ.topic);
    } else {
      setCombo(0);
      setAnswerResult('wrong');
      setHeroAnim('confused');
      setCalloutText(t.wrongCallout);
      soundEngine.playWrong();
      awardProgress(8, 2, currentQ.zone, false, currentQ.topic); // Effort XP so players are encouraged
    }

    // Record to learning history
    setPlayer((prev) => ({
      ...prev,
      historyLog: [
        {
          id: currentQ.id,
          question: currentQ.question[lang],
          topic: currentQ.topic,
          zone: currentQ.zone,
          correct: isCorrect,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev.historyLog.slice(0, 29)
      ]
    }));
  };

  const handleNextQuizQuestion = () => {
    soundEngine.playClick();
    if (quizIndex + 1 < quizQueue.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerResult(null);
      setCalloutText('');
      setHeroAnim('idle');
      setHintUsedForCurrent(false);
      setTimeLeft(25);
    } else {
      setScreen('results');
    }
  };

  // Timer for Challenge Mode in Quiz Battle
  useEffect(() => {
    if (screen !== 'battle' || !customConfig.timedMode || answerResult !== null) return;
    if (timeLeft <= 0) {
      handleOptionSelect(-1);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [screen, customConfig.timedMode, answerResult, timeLeft]);

  // Start Ancient Puzzle Mini-Game (Rotates across multiple puzzle variants per zone)
  const startZonePuzzle = () => {
    soundEngine.playClick();
    const variants = ZONE_PUZZLES[activeZoneId] || ZONE_PUZZLES.language;
    const prevIdx = lastZoneVariantsRef.current[`puzzle_${activeZoneId}`] ?? -1;
    const nextIdx = (prevIdx + 1) % variants.length;
    lastZoneVariantsRef.current[`puzzle_${activeZoneId}`] = nextIdx;

    const pData = variants[nextIdx];
    const scrambled = [...pData.items].sort(() => Math.random() - 0.5);
    setActivePuzzleIdx(nextIdx);
    setPuzzleOrder(scrambled);
    setPuzzleSolved(false);
    setPuzzleFeedback(null);
    setHeroAnim('thinking');
    setScreen('puzzle');
  };

  const movePuzzleItem = (idx, dir) => {
    soundEngine.playClick();
    const target = idx + dir;
    if (target < 0 || target >= puzzleOrder.length) return;
    const copy = [...puzzleOrder];
    const temp = copy[idx];
    copy[idx] = copy[target];
    copy[target] = temp;
    setPuzzleOrder(copy);
    setPuzzleFeedback(null);
  };

  const verifyPuzzleSolution = () => {
    const variants = ZONE_PUZZLES[activeZoneId] || ZONE_PUZZLES.language;
    const pData = variants[activePuzzleIdx] || variants[0];
    const isMatch = puzzleOrder.every((item, i) => item.id === pData.correctOrder[i]);
    if (isMatch) {
      setPuzzleSolved(true);
      setPuzzleFeedback('correct');
      setHeroAnim('victory');
      soundEngine.playCorrect();
      awardProgress(50, 25, activeZoneId, true, 'Puzzle Logic');
      setPlayer((prev) => ({
        ...prev,
        unlockedAchievements: Array.from(new Set([...prev.unlockedAchievements, 'puzzle_solver']))
      }));
    } else {
      setPuzzleFeedback('wrong');
      setHeroAnim('confused');
      soundEngine.playWrong();
    }
  };

  // Start Sage Story Mission (Rotates across multiple story chapters per zone)
  const startZoneStory = () => {
    soundEngine.playClick();
    const variants = STORY_MISSIONS[activeZoneId] || STORY_MISSIONS.language;
    const prevIdx = lastZoneVariantsRef.current[`story_${activeZoneId}`] ?? -1;
    const nextIdx = (prevIdx + 1) % variants.length;
    lastZoneVariantsRef.current[`story_${activeZoneId}`] = nextIdx;

    setActiveStoryIdx(nextIdx);
    setStoryChoiceResult(null);
    setHeroAnim('idle');
    setScreen('story');
  };

  const handleStoryChoice = (playerChoseTrue) => {
    const variants = STORY_MISSIONS[activeZoneId] || STORY_MISSIONS.language;
    const storyData = variants[activeStoryIdx] || variants[0];
    const isCorrect = playerChoseTrue === storyData.isStatementTrue;
    setStoryChoiceResult({
      isCorrect,
      reply: storyData.explanation
    });
    if (isCorrect) {
      setHeroAnim('victory');
      soundEngine.playDiscovery();
      awardProgress(45, 25, activeZoneId, true, 'Story Lore');
      setPlayer((prev) => {
        const exists = prev.discoveredLore.some((l) => l.id === storyData.loreCard.id);
        return {
          ...prev,
          unlockedAchievements: Array.from(new Set([...prev.unlockedAchievements, 'story_hero'])),
          discoveredLore: exists
            ? prev.discoveredLore
            : [...prev.discoveredLore, { ...storyData.loreCard, zone: activeZoneId }]
        };
      });
    } else {
      setHeroAnim('confused');
      soundEngine.playWrong();
      awardProgress(15, 5, activeZoneId, false, 'Story Lore');
    }
  };

  // Discover Zone Treasure Chest
  const handleDiscoverChest = () => {
    if (player.openedChests[activeZoneId]) {
      showToast(lang === 'en' ? 'Chest already opened!' : 'Peti harta sudah dibuka!');
      return;
    }
    soundEngine.playDiscovery();
    const zoneCard = KNOWLEDGE_DICTIONARY.find((d) => d.zone === activeZoneId) || KNOWLEDGE_DICTIONARY[0];
    setPlayer((prev) => {
      const exists = prev.discoveredLore.some((l) => l.id === zoneCard.id);
      return {
        ...prev,
        coins: prev.coins + 40,
        xp: prev.xp + 30,
        openedChests: { ...prev.openedChests, [activeZoneId]: true },
        discoveredLore: exists
          ? prev.discoveredLore
          : [
              ...prev.discoveredLore,
              {
                id: zoneCard.id,
                title: { en: zoneCard.term, id: zoneCard.term },
                summary: { en: zoneCard.definition, id: zoneCard.definition },
                zone: activeZoneId
              }
            ]
      };
    });
    showToast(
      lang === 'en'
        ? 'Treasure Chest Unlocked! +40 Coins, +30 XP & New Knowledge Entry!'
        : 'Peti Harta Terbuka! +40 Koin, +30 XP & Entri Kamus Baru!'
    );
  };

  const xpNeeded = player.level * 100;
  const xpProgressPct = Math.min(100, Math.round((player.xp / xpNeeded) * 100));

  const textSizeClass =
    settings.textSize === 'xlarge'
      ? 'text-lg sm:text-xl'
      : settings.textSize === 'large'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  return (
    <div
      className={`knowledge-game min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100 font-sans relative overflow-x-clip ${textSizeClass}`}
    >
      <KnowledgeCursor />
      {/* REMOTION-INSPIRED PROCEDURAL KEYFRAMES & THEMATIC MOTION ENGINE (NO LINES/GRID) */}
      <style>{`
        @keyframes remotionSpringReveal {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
            filter: blur(6px);
          }
          65% {
            opacity: 1;
            transform: translateY(-3px) scale(1.01);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes remotionFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.2deg); }
        }
        @keyframes remotionBokehDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.25; }
          33% { transform: translate3d(28px, -24px, 0) scale(1.18); opacity: 0.55; }
          66% { transform: translate3d(-22px, 18px, 0) scale(0.92); opacity: 0.35; }
        }
        @keyframes remotionStarTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.75); }
          50% { opacity: 0.9; transform: scale(1.35); }
        }
        @keyframes remotionOrbitSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes remotionOrbitReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes remotionShimmerSweep {
          0% { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(220%) skewX(-18deg); }
        }
        @keyframes remotionAuroraPulse {
          0%, 100% { opacity: 0.36; transform: scale(1) translate(0, 0); }
          50% { opacity: 0.65; transform: scale(1.14) translate(2.5%, -2.5%); }
        }
        @keyframes remotionBurstStar {
          0% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.6) rotate(360deg); }
        }
        .rm-scene-enter {
          animation: remotionSpringReveal 0.58s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .rm-stagger-1 { animation-delay: 0.05s; }
        .rm-stagger-2 { animation-delay: 0.11s; }
        .rm-stagger-3 { animation-delay: 0.17s; }
        .rm-stagger-4 { animation-delay: 0.23s; }
        .rm-float {
          animation: remotionFloat 4.8s ease-in-out infinite;
        }
        .rm-bokeh {
          animation: remotionBokehDrift 11s ease-in-out infinite;
        }
        .rm-star {
          animation: remotionStarTwinkle 4.2s ease-in-out infinite;
        }
        .rm-orbit-cw {
          animation: remotionOrbitSlow 22s linear infinite;
        }
        .rm-orbit-ccw {
          animation: remotionOrbitReverse 28s linear infinite;
        }
        .rm-shimmer-card {
          position: relative;
          overflow: hidden;
        }
        .rm-shimmer-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          animation: remotionShimmerSweep 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .rm-aurora {
          animation: remotionAuroraPulse 9s ease-in-out infinite;
        }
        .rm-reduced * {
          animation: none !important;
          transition-duration: 0.05s !important;
        }
      `}</style>

      {/* THEMATIC REMOTION COSMIC AURORA, BOKEH ORBS & ASTROLABE RINGS (NO GRID LINES) */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${settings.reducedMotion ? 'rm-reduced' : ''}`}>
        {/* Flowing Nebula Aurora Clouds */}
        <div
          className="rm-aurora absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.48), transparent 70%)' }}
        />
        <div
          className="rm-aurora absolute top-1/4 -right-28 w-[560px] h-[560px] rounded-full blur-[130px]"
          style={{
            background: `radial-gradient(circle, ${activeZone.color}4D, transparent 70%)`,
            animationDelay: '2.5s'
          }}
        />
        <div
          className="rm-aurora absolute -bottom-32 left-1/4 w-[520px] h-[520px] rounded-full blur-[125px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.32), transparent 70%)', animationDelay: '4.5s' }}
        />

        {/* Rotating Cosmic Astrolabe Constellation Rings */}
        <div className="rm-orbit-cw absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-indigo-300/[0.08]" />
        <div className="rm-orbit-ccw absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[940px] h-[940px] rounded-full border border-amber-300/[0.06]" />

        {/* Floating Luminous Bokeh Orbs */}
        <div
          className="rm-bokeh absolute top-[14%] left-[12%] w-24 h-24 rounded-full blur-xl"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.28), transparent 70%)' }}
        />
        <div
          className="rm-bokeh absolute top-[62%] left-[8%] w-32 h-32 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.24), transparent 70%)', animationDelay: '3s' }}
        />
        <div
          className="rm-bokeh absolute top-[22%] right-[14%] w-28 h-28 rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, ${activeZone.color}38, transparent 70%)`, animationDelay: '5s' }}
        />
        <div
          className="rm-bokeh absolute bottom-[12%] right-[18%] w-36 h-36 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.26), transparent 70%)', animationDelay: '7s' }}
        />

        {/* Twinkling Ambient Starlight Motes */}
        {[
          { top: '10%', left: '22%', delay: '0s', size: 3 },
          { top: '18%', left: '78%', delay: '1.1s', size: 4 },
          { top: '34%', left: '15%', delay: '2.2s', size: 2.5 },
          { top: '42%', left: '88%', delay: '0.7s', size: 3.5 },
          { top: '58%', left: '30%', delay: '1.8s', size: 3 },
          { top: '72%', left: '72%', delay: '2.9s', size: 4 },
          { top: '84%', left: '18%', delay: '1.4s', size: 2.5 },
          { top: '88%', left: '54%', delay: '0.4s', size: 3.5 }
        ].map((st, idx) => (
          <span
            key={idx}
            className="rm-star absolute rounded-full bg-amber-100 shadow-[0_0_8px_rgba(254,243,199,0.9)]"
            style={{
              top: st.top,
              left: st.left,
              width: `${st.size}px`,
              height: `${st.size}px`,
              animationDelay: st.delay
            }}
          />
        ))}
      </div>

      {/* Floating Audio Subtitle & Toast Notifications */}
      {subtitleBanner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950/90 border border-amber-400/50 text-amber-200 px-4 py-1.5 rounded-full text-xs font-medium shadow-xl pointer-events-none rm-scene-enter">
          {subtitleBanner}
        </div>
      )}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-5 py-2.5 rounded-2xl font-black text-sm shadow-2xl border border-emerald-200 flex items-center gap-2 rm-scene-enter">
          <Sparkles className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* LEVEL UP CELEBRATION MODAL WITH REMOTION ORBITAL RAYS */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gradient-to-b from-amber-300 via-orange-500 to-purple-900 p-1 rounded-3xl shadow-[0_0_65px_rgba(251,191,36,0.45)] rm-scene-enter">
            <div className="bg-slate-950/95 rounded-[22px] p-6 text-center space-y-4 relative overflow-hidden">
              {/* Rotating Sunburst Ring */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border-2 border-dashed border-amber-400/30 rm-orbit-cw pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs tracking-widest uppercase">
                <Crown className="w-4 h-4" />
                <span>{t.levelUp}</span>
              </div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400">
                {t.level} {player.level}!
              </h2>
              <div className="rm-float">
                <HeroVectorAvatar
                  animState="levelup"
                  hatId={player.hat}
                  outfitId={player.outfit}
                  companionId={player.companion}
                  size={140}
                />
              </div>
              <p className="text-slate-300 text-sm">
                {lang === 'en'
                  ? 'Your wisdom shines brighter! New zones, outfits, and Sage Hints await your journey.'
                  : 'Kebijaksanaanmu semakin bersinar! Wilayah baru, kostum, dan Petunjuk Bijak menanti petualanganmu.'}
              </p>
              <button
                onClick={() => {
                  setShowLevelUpModal(false);
                  setHeroAnim('idle');
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-lg hover:brightness-110 transition transform active:scale-95"
              >
                {t.nextQuestion}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP ADVENTURE HUD BAR (Visible on all screens except Welcome) */}
      {screen !== 'welcome' && (
        <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-lg">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
            {/* Back Button + Hero Identity & Level XP Bar */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={handleGoBack}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/15 text-white text-xs font-extrabold flex items-center gap-1.5 shadow transition transform active:scale-95"
                title={navHistory.length > 0 ? 'Kembali ke halaman sebelumnya' : 'Kembali ke Beranda Utama'}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{navHistory.length > 0 ? 'Kembali' : 'Beranda'}</span>
              </button>

              <button
                onClick={() => setScreen('profile')}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-0.5 shadow-md hover:scale-105 transition"
                title={t.heroProfile}
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <HeroVectorAvatar
                    animState="idle"
                    hatId={player.hat}
                    outfitId={player.outfit}
                    companionId={player.companion}
                    size={42}
                  />
                </div>
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{player.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                    Lv.{player.level}
                  </span>
                </div>
                <div className="w-28 sm:w-36 h-2 bg-slate-800/90 rounded-full overflow-hidden mt-1 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 transition-all duration-700"
                    style={{ width: `${xpProgressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Coins, Language Switch & Quick Nav */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 flex items-center gap-1.5 text-amber-300 font-bold text-xs sm:text-sm shadow-inner">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{player.coins}</span>
              </div>

              <button
                onClick={() => setLang((prev) => (prev === 'en' ? 'id' : 'en'))}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition"
              >
                {lang === 'en' ? 'EN / ID' : 'ID / EN'}
              </button>

              <button
                onClick={() => setSettings((s) => ({ ...s, muted: !s.muted }))}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition"
                aria-label="Toggle Audio"
              >
                {settings.muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={() => setScreen('map')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.worldMap}</span>
              </button>

              <button
                onClick={() => setScreen('settings')}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 ${screen === 'library' ? 'py-1.5 sm:py-8' : 'py-6 sm:py-8'} ${settings.reducedMotion ? 'rm-reduced' : ''}`}>
        {/* ===================================================================
            SCREEN 1: WELCOME / PORTO MAIN ADVENTURE MENU
           =================================================================== */}
        {screen === 'welcome' && (
          <div key="screen-welcome" className="min-h-[82vh] flex flex-col justify-center items-center text-center space-y-8 py-6 rm-scene-enter">
            {/* Floating Orbital Hero Stage */}
            <div className="relative flex items-center justify-center">
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-amber-400/35 rm-orbit-cw absolute" />
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-indigo-400/25 rm-orbit-ccw absolute" />
              <div className="rm-float relative z-10 p-4 rounded-full bg-gradient-to-b from-amber-400/20 to-indigo-500/20 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(251,191,36,0.28)]">
                <HeroVectorAvatar
                  animState="victory"
                  hatId={player.hat}
                  outfitId={player.outfit}
                  companionId={player.companion}
                  size={155}
                />
              </div>
            </div>

            <div className="space-y-3 max-w-2xl rm-stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-300 text-xs font-extrabold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dunia Petualangan Belajar & Kamus Lintas Ilmu</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 drop-shadow">
                {t.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
                Jelajahi 6 wilayah pengetahuan, bertarung dengan penjaga bijak, pecahkan teka-teki kuno, dan pelajari kamus bahasa Inggris serta ensiklopedia lintas disiplin ilmu.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 rm-stagger-2">
              <button
                onClick={() => {
                  soundEngine.init();
                  soundEngine.playClick();
                  setScreen('map');
                }}
                className="rm-shimmer-card px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_10px_35px_rgba(245,158,11,0.4)] hover:scale-105 transition transform flex items-center gap-2.5"
              >
                <Compass className="w-5 h-5" />
                <span>{hasSave ? t.continueOdyssey : t.startAdventure}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.init();
                  soundEngine.playClick();
                  setLibraryFilter('english_dict');
                  setScreen('library');
                }}
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm sm:text-base backdrop-blur-md transition flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span>Kamus Inggris & Pustaka Ilmu</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.init();
                  soundEngine.playClick();
                  setScreen('custom');
                }}
                className="px-6 py-4 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/45 border border-indigo-400/35 text-indigo-200 font-extrabold text-sm sm:text-base backdrop-blur-md transition flex items-center gap-2"
              >
                <Sliders className="w-5 h-5 text-indigo-300" />
                <span>{t.customTraining}</span>
              </button>
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full pt-2 rm-stagger-3">
              {[
                { label: '6 Wilayah Dunia', sub: 'Eksplorasi 2.5D', icon: Globe, color: 'text-sky-400' },
                { label: 'Kamus Inggris', sub: 'IPA, Phrasal & Idiom', icon: Languages, color: 'text-rose-400' },
                { label: 'Teknologi & AI', sub: 'Algoritma & Kuantum', icon: Cpu, color: 'text-violet-400' },
                { label: 'Belajar Adaptif', sub: 'Rekomendasi Cerdas', icon: Brain, color: 'text-emerald-400' }
              ].map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left">
                    <IconComp className={`w-5 h-5 ${item.color} mb-1.5`} />
                    <div className="font-extrabold text-xs sm:text-sm text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-400">{item.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            SCREEN 2: WORLD MAP (6 KNOWLEDGE ZONES + ADAPTIVE FOCUS)
           =================================================================== */}
        {screen === 'map' && (
          <div key="screen-map" className="space-y-6 rm-scene-enter">
            {/* Top Navigation & Quick Access Bar */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
                  <MapIcon className="w-7 h-7 text-amber-400" />
                  <span>{t.worldMap}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Pilih wilayah petualangan untuk eksplorasi 2.5D, pertarungan kuis, teka-teki kuno, atau buka Kamus Lintas Ilmu.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setScreen('library')}
                  className="px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 font-extrabold text-xs flex items-center gap-1.5 transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.knowledgeLibrary}</span>
                </button>
                <button
                  onClick={() => setScreen('custom')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-500/25 hover:bg-indigo-500/40 border border-indigo-400/40 text-indigo-200 font-extrabold text-xs flex items-center gap-1.5 transition"
                >
                  <Sliders className="w-4 h-4" />
                  <span>{t.customTraining}</span>
                </button>
                <button
                  onClick={() => setScreen('profile')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-extrabold text-xs flex items-center gap-1.5 transition"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{t.heroProfile}</span>
                </button>
              </div>
            </div>

            {/* Adaptive Recommendation Banner */}
            <div className="rm-shimmer-card bg-gradient-to-r from-indigo-950/90 via-purple-950/85 to-slate-900/90 border border-indigo-400/35 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">{t.recommended}</div>
                  <div className="font-black text-white text-base sm:text-lg">
                    {adaptiveRecommendation.name[lang]} — {adaptiveRecommendation.tagline[lang]}
                  </div>
                </div>
              </div>
              <button
                onClick={() => enterZone(adaptiveRecommendation.id)}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow transition shrink-0"
              >
                {t.enterZone}
              </button>
            </div>

            {/* 6 Knowledge Zones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ZONES.map((z, idx) => {
                const stat = player.zoneStats[z.id] || { correct: 0, total: 0 };
                const masteryPct = stat.total === 0 ? 0 : Math.round((stat.correct / stat.total) * 100);
                return (
                  <div
                    key={z.id}
                    style={{ animationDelay: `${idx * 65}ms` }}
                    className="rm-scene-enter group bg-slate-900/85 backdrop-blur-md border border-white/15 hover:border-amber-400/60 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-black text-slate-950"
                          style={{ backgroundColor: z.color }}
                        >
                          {t.mastery}: {masteryPct}%
                        </span>
                        <span className="text-xs font-bold text-slate-400">{z.guardianName[lang]}</span>
                      </div>

                      <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition">
                        {z.name[lang]}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{z.tagline[lang]}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {z.topics.map((tp) => (
                          <span key={tp} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
                            {tp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${masteryPct}%`, backgroundColor: z.color }}
                        />
                      </div>
                      <button
                        onClick={() => enterZone(z.id)}
                        className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm text-slate-950 shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                        style={{ backgroundColor: z.color }}
                      >
                        <Compass className="w-4 h-4" />
                        <span>{t.enterZone}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            SCREEN 3: ZONE 2.5D EXPLORATION & ACTIVITY HUB
           =================================================================== */}
        {screen === 'zone' && (
          <div key={`screen-zone-${activeZone.id}`} className="space-y-5 rm-scene-enter">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{activeZone.name[lang]}</h2>
                <p className="text-xs sm:text-sm text-slate-300">{activeZone.tagline[lang]}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleGoBack}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => {
                    setLibraryFilter(activeZone.id === 'language' ? 'english_dict' : activeZone.id);
                    setScreen('library');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-extrabold flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buka Kamus Zona</span>
                </button>
              </div>
            </div>

            <ExplorationCanvas25D
              zone={activeZone}
              heroConfig={player}
              lang={lang}
              reducedMotion={settings.reducedMotion}
              onTriggerBattle={() => startQuizBattle([activeZone.id], 'All', 4, false)}
              onTriggerPuzzle={startZonePuzzle}
              onTriggerStory={startZoneStory}
              onDiscoverChest={handleDiscoverChest}
              chestOpened={!!player.openedChests[activeZone.id]}
            />
          </div>
        )}

        {/* ===================================================================
            SCREEN 4: INTERACTIVE QUIZ BATTLE ARENA
           =================================================================== */}
        {screen === 'battle' && quizQueue[quizIndex] && (() => {
          const currentQ = quizQueue[quizIndex];
          return (
            <div key={`screen-battle-${quizIndex}`} className="max-w-4xl mx-auto space-y-5 rm-scene-enter">
              {/* Battle Top Status */}
              <div className="bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoBack}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/25 text-indigo-200 text-xs font-extrabold">
                    Soal {quizIndex + 1} / {quizQueue.length}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-bold">
                    {currentQ.difficulty}
                  </span>
                  {combo > 1 && (
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> {combo}x Kombo
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {customConfig.timedMode && (
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${timeLeft <= 7 ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 text-amber-300'}`}>
                      {timeLeft}s
                    </span>
                  )}
                  <button
                    disabled={hintUsedForCurrent || player.hints <= 0 || answerResult !== null}
                    onClick={() => {
                      if (player.hints > 0 && !hintUsedForCurrent) {
                        soundEngine.playClick();
                        setHintUsedForCurrent(true);
                        setPlayer((p) => ({ ...p, hints: p.hints - 1 }));
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 disabled:opacity-40 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{t.hint} ({player.hints})</span>
                  </button>
                </div>
              </div>

              {/* Hero vs Guardian Visual Stage */}
              <div className="bg-slate-900/80 border border-white/15 rounded-3xl p-5 flex items-center justify-around relative overflow-hidden">
                <div className="text-center">
                  <HeroVectorAvatar
                    animState={heroAnim}
                    hatId={player.hat}
                    outfitId={player.outfit}
                    companionId={player.companion}
                    size={125}
                  />
                  <div className="text-xs font-extrabold text-amber-300 mt-1">{player.name}</div>
                </div>

                {calloutText && (
                  <div className={`px-4 py-2 rounded-2xl font-black text-sm sm:text-base shadow-xl rm-scene-enter ${answerResult === 'correct' ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950'}`}>
                    {calloutText}
                  </div>
                )}

                <div className="text-center">
                  <GuardianMonsterAvatar
                    zoneId={currentQ.zone}
                    isHit={monsterHit}
                    isHappy={answerResult === 'wrong'}
                    size={125}
                  />
                  <div className="text-xs font-extrabold text-rose-300 mt-1">
                    {(ZONES.find((z) => z.id === currentQ.zone) || activeZone).guardianName[lang]}
                  </div>
                </div>
              </div>

              {/* Question & Binary True/False Verification Card */}
              <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 space-y-5 shadow-2xl">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    {currentQ.subject} • {currentQ.topic}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
                    {currentQ.proposedStatement ? currentQ.proposedStatement[lang] : currentQ.question[lang]}
                  </h3>
                </div>

                {hintUsedForCurrent && (
                  <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-200 text-xs sm:text-sm flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                    <span>{currentQ.learningTip[lang]}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentQ.options[lang].map((opt, idx) => {
                    const isTrueBtn = idx === 0;
                    let btnStyle = isTrueBtn
                      ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-400/40 text-emerald-100'
                      : 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-400/40 text-rose-100';
                    if (answerResult !== null) {
                      if (idx === currentQ.correctAnswer) {
                        btnStyle = 'bg-emerald-500/35 border-emerald-400 text-white shadow-lg';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-500/35 border-rose-400 text-white';
                      } else {
                        btnStyle = 'bg-white/5 border-white/10 text-slate-400 opacity-55';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        disabled={answerResult !== null}
                        onClick={() => handleOptionSelect(idx)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-black text-sm sm:text-base transition transform active:scale-98 flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isTrueBtn ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          )}
                          <span>{opt}</span>
                        </div>
                        {answerResult !== null && idx === currentQ.correctAnswer && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black uppercase">
                            Tepat
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Rich Educational Explanation & Answer Correction Drawer */}
                {answerResult !== null && (
                  <div className="p-5 rounded-2xl bg-indigo-950/75 border border-indigo-400/40 space-y-3 rm-scene-enter">
                    <div className="font-black text-amber-300 text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{t.explanation} & Koreksi Jawaban</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed">
                      {currentQ.fullCorrection ? currentQ.fullCorrection[lang] : currentQ.explanation[lang]}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 text-amber-200">
                        <span className="font-bold">{t.funFact}: </span>
                        {currentQ.funFact[lang]}
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 text-emerald-200">
                        <span className="font-bold">{t.learningTip}: </span>
                        {currentQ.learningTip[lang]}
                      </div>
                    </div>
                    <button
                      onClick={handleNextQuizQuestion}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm shadow-lg hover:brightness-110 transition"
                    >
                      {t.nextQuestion}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ===================================================================
            SCREEN 5: ANCIENT PUZZLE MINI-GAME
           =================================================================== */}
        {screen === 'puzzle' && (() => {
          const variants = ZONE_PUZZLES[activeZoneId] || ZONE_PUZZLES.language;
          const pData = variants[activePuzzleIdx] || variants[0];
          return (
            <div key={`screen-puzzle-${activePuzzleIdx}`} className="max-w-3xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl rm-scene-enter">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold text-violet-300 uppercase tracking-wider">
                    Teka-Teki #{activePuzzleIdx + 1} dari {variants.length}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <Puzzle className="w-6 h-6 text-violet-400" />
                    <span>{pData.title[lang]}</span>
                  </h2>
                </div>
                <button
                  onClick={handleGoBack}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
              </div>

              <p className="text-sm text-slate-300">{pData.instruction[lang]}</p>

              <div className="space-y-2.5">
                {puzzleOrder.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-violet-500/30 text-violet-200 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-sm text-white">{item.label}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        disabled={puzzleSolved || idx === 0}
                        onClick={() => movePuzzleItem(idx, -1)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold"
                      >
                        ▲
                      </button>
                      <button
                        disabled={puzzleSolved || idx === puzzleOrder.length - 1}
                        onClick={() => movePuzzleItem(idx, 1)}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {puzzleFeedback === 'wrong' && (
                <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-bold">
                  Susunan belum tepat. Coba geser urutan kartu ke atas atau bawah lalu periksa kembali!
                </div>
              )}

              {puzzleSolved && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 space-y-2 rm-scene-enter">
                  <div className="font-black text-emerald-300 text-sm">Teka-Teki Terpecahkan! (+50 XP, +25 Koin)</div>
                  <p className="text-xs sm:text-sm text-slate-100">{pData.explanation[lang]}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {!puzzleSolved ? (
                  <button
                    onClick={verifyPuzzleSolution}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-black text-sm shadow-lg"
                  >
                    {t.checkSolution}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={startZonePuzzle}
                      className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Teka-Teki Berikutnya</span>
                    </button>
                    <button
                      onClick={handleGoBack}
                      className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm"
                    >
                      Kembali
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })()}

        {/* ===================================================================
            SCREEN 6: SAGE STORY MISSION (BINARY TRUE / FALSE VERIFICATION)
           =================================================================== */}
        {screen === 'story' && (() => {
          const variants = STORY_MISSIONS[activeZoneId] || STORY_MISSIONS.language;
          const storyData = variants[activeStoryIdx] || variants[0];
          return (
            <div
              key={`screen-story-${activeStoryIdx}`}
              className="max-w-3xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl rm-scene-enter"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    Bab Misi #{activeStoryIdx + 1} dari {variants.length} • {storyData.speaker[lang]}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <Scroll className="w-6 h-6 text-amber-400" />
                    <span>{t.storyMission}</span>
                  </h2>
                </div>
                <button
                  onClick={handleGoBack}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5">
                <HeroVectorAvatar
                  animState={heroAnim}
                  hatId={player.hat}
                  outfitId={player.outfit}
                  companionId={player.companion}
                  size={110}
                />
                <div className="space-y-2 text-center sm:text-left">
                  <p className="text-sm text-slate-200 leading-relaxed">{storyData.intro[lang]}</p>
                  <div className="p-3.5 rounded-xl bg-amber-400/15 border border-amber-400/35 text-amber-200 font-bold text-sm">
                    {storyData.prompt[lang]}
                  </div>
                </div>
              </div>

              {storyChoiceResult === null ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => handleStoryChoice(true)}
                    className="p-4 sm:p-5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border-2 border-emerald-400/50 text-emerald-100 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition transform active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>BENAR (Pernyataan Tepat)</span>
                  </button>
                  <button
                    onClick={() => handleStoryChoice(false)}
                    className="p-4 sm:p-5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border-2 border-rose-400/50 text-rose-100 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition transform active:scale-95"
                  >
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>SALAH (Pernyataan Keliru)</span>
                  </button>
                </div>
              ) : (
                <div
                  className={`p-5 rounded-2xl border space-y-3 rm-scene-enter ${
                    storyChoiceResult.isCorrect
                      ? 'bg-emerald-500/20 border-emerald-400/50'
                      : 'bg-amber-500/20 border-amber-400/50'
                  }`}
                >
                  <div className="font-black text-sm text-white">
                    {storyChoiceResult.isCorrect
                      ? 'Verifikasi Tepat! (+45 XP, +25 Koin & Kartu Ilmu)'
                      : 'Mari Simak Koreksinya! (+15 XP Usaha Belajar)'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    {storyChoiceResult.reply[lang]}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-amber-200">
                    <span className="font-extrabold">Kartu Ilmu: {storyData.loreCard.title[lang]} — </span>
                    {storyData.loreCard.summary[lang]}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      onClick={startZoneStory}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Misi Cerita Berikutnya</span>
                    </button>
                    <button
                      onClick={handleGoBack}
                      className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ===================================================================
            SCREEN 7: SESSION RESULTS SUMMARY
           =================================================================== */}
        {screen === 'results' && (
          <div className="max-w-xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl rm-scene-enter">
            <HeroVectorAvatar
              animState="victory"
              hatId={player.hat}
              outfitId={player.outfit}
              companionId={player.companion}
              size={140}
            />
            <h2 className="text-3xl font-black text-amber-300">{t.victory}</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Jawaban Tepat</div>
                <div className="text-xl font-black text-emerald-400">
                  {sessionScore.correct} / {quizQueue.length}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">XP Diperoleh</div>
                <div className="text-xl font-black text-sky-400">+{sessionScore.xpEarned}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Koin Ilmu</div>
                <div className="text-xl font-black text-amber-400">+{sessionScore.coinsEarned}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() =>
                  startQuizBattle(
                    customConfig.selectedZones,
                    customConfig.difficulty,
                    customConfig.questionCount,
                    customConfig.timedMode
                  )
                }
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Latihan Materi Baru</span>
              </button>
              <button
                onClick={() => setScreen('map')}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm"
              >
                {t.worldMap}
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            SCREEN 8: ADAPTIVE TRAINING SESSION CONFIGURATOR
           =================================================================== */}
        {screen === 'custom' && (
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl rm-scene-enter">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-indigo-400" />
                <span>{t.customTraining}</span>
              </h2>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase text-slate-400">{t.selectZones}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ZONES.map((z) => {
                  const active = customConfig.selectedZones.includes(z.id);
                  return (
                    <button
                      key={z.id}
                      onClick={() =>
                        setCustomConfig((prev) => {
                          const exists = prev.selectedZones.includes(z.id);
                          const next = exists
                            ? prev.selectedZones.filter((id) => id !== z.id)
                            : [...prev.selectedZones, z.id];
                          return { ...prev, selectedZones: next.length > 0 ? next : [z.id] };
                        })
                      }
                      className={`p-3 rounded-2xl border text-left text-xs font-extrabold transition ${
                        active
                          ? 'bg-indigo-500/30 border-indigo-400 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {z.name[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase text-slate-400">{t.difficulty}</div>
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...DIFFICULTIES].map((d) => (
                    <button
                      key={d}
                      onClick={() => setCustomConfig((p) => ({ ...p, difficulty: d }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        customConfig.difficulty === d ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {d === 'All' ? 'Semua Level' : d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase text-slate-400">{t.questionCount}</div>
                <div className="flex gap-2">
                  {[3, 5, 8, 10].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setCustomConfig((p) => ({ ...p, questionCount: cnt }))}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                        customConfig.questionCount === cnt ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {cnt} Soal
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCustomConfig((p) => ({ ...p, timedMode: false }))}
                className={`flex-1 p-3.5 rounded-2xl border text-xs font-extrabold ${
                  !customConfig.timedMode
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {t.relaxedMode}
              </button>
              <button
                onClick={() => setCustomConfig((p) => ({ ...p, timedMode: true }))}
                className={`flex-1 p-3.5 rounded-2xl border text-xs font-extrabold ${
                  customConfig.timedMode
                    ? 'bg-rose-500/25 border-rose-400 text-rose-200'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {t.challengeMode}
              </button>
            </div>

            <button
              onClick={() =>
                startQuizBattle(
                  customConfig.selectedZones,
                  customConfig.difficulty,
                  customConfig.questionCount,
                  customConfig.timedMode
                )
              }
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-base shadow-xl hover:brightness-110 transition"
            >
              {t.startSession}
            </button>
          </div>
        )}

        {/* ===================================================================
            SCREEN 9: MULTIDISCIPLINARY DICTIONARY & KNOWLEDGE LIBRARY
           =================================================================== */}
        {screen === 'library' && (() => {
          const speakTerm = (text) => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const clean = text.split('(')[0].trim();
              const utter = new SpeechSynthesisUtterance(clean);
              utter.lang = 'en-US';
              window.speechSynthesis.speak(utter);
            }
          };

          const toggleMasterEntry = (entry) => {
            setPlayer((prev) => {
              const exists = prev.discoveredLore.some((l) => l.id === entry.id);
              if (exists) return prev;
              soundEngine.playDiscovery();
              showToast(`"${entry.term}" ditandai dipahami! +15 XP`);
              return {
                ...prev,
                xp: prev.xp + 15,
                discoveredLore: [
                  ...prev.discoveredLore,
                  {
                    id: entry.id,
                    title: { en: entry.term, id: entry.term },
                    summary: { en: entry.definition, id: entry.definition },
                    zone: entry.zone
                  }
                ]
              };
            });
          };

          const filteredDict = KNOWLEDGE_DICTIONARY.filter((entry) => {
            if (libraryFilter === 'english_dict' && entry.subCategory !== 'english_dict') return false;
            if (
              libraryFilter !== 'all' &&
              libraryFilter !== 'english_dict' &&
              entry.discipline !== libraryFilter
            ) {
              return false;
            }
            if (libraryLetter !== 'ALL' && !entry.term.toUpperCase().startsWith(libraryLetter)) {
              return false;
            }
            if (librarySearch.trim() !== '') {
              const q = librarySearch.toLowerCase();
              return (
                entry.term.toLowerCase().includes(q) ||
                entry.definition.toLowerCase().includes(q) ||
                entry.tag.toLowerCase().includes(q)
              );
            }
            return true;
          });

          const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
          const libraryPageCount = Math.max(1, Math.ceil(filteredDict.length / libraryPageSize));
          const visibleLibraryEntries = filteredDict.slice(
            libraryPage * libraryPageSize,
            (libraryPage + 1) * libraryPageSize
          );
          const navigateLibraryPage = (targetPage) => {
            setLibraryPage(targetPage);
            window.requestAnimationFrame(() => {
              document.getElementById('library-material-results')?.scrollIntoView({
                behavior: window.matchMedia('(max-width: 639px)').matches ? 'auto' : 'smooth',
                block: 'start',
              });
            });
          };

          return (
            <div className="space-y-2 rm-scene-enter sm:space-y-6">
              {/* Header & Back */}
              <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-slate-900/85 p-2.5 sm:gap-4 sm:rounded-3xl sm:p-5">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-1.5 text-base font-black text-white sm:gap-2.5 sm:text-3xl">
                    <BookOpen className="h-4 w-4 shrink-0 text-amber-400 sm:h-7 sm:w-7" />
                    <span>{t.knowledgeLibrary}</span>
                  </h2>
                  <p className="mt-1 hidden text-xs text-slate-300 sm:block sm:text-sm">
                    Jelajahi Kamus Bahasa Inggris lengkap (IPA, Phrasal Verbs, Irregular Verbs, Idioms) serta Ensiklopedia Lintas Disiplin Ilmu.
                  </p>
                </div>
                <button
                  onClick={handleGoBack}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-white/10 px-2 py-1.5 text-[10px] font-extrabold hover:bg-white/20 sm:gap-1.5 sm:self-auto sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Kembali</span>
                </button>
              </div>

              <ComprehensiveDictionaryPanel />

              <details className="group dictionary-frame-glow rounded-2xl border border-amber-400/30 bg-gradient-to-br from-slate-900/95 via-indigo-950/80 to-slate-900/95 p-2 shadow-xl sm:rounded-3xl sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
                  <span>
                    <span className="block text-sm font-black text-amber-100 sm:text-lg">Materi dan pustaka lainnya</span>
                    <span className="mt-1 block text-[10px] leading-relaxed text-slate-300 sm:text-xs">
                      Jelajahi kosakata, istilah lintas disiplin, makna, pelafalan, dan contoh penerapan dalam format katalog kamus.
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-amber-300 transition-transform group-open:rotate-90 sm:h-5 sm:w-5" />
                </summary>
                <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-5">
              {/* Search & Discipline Filter Pills */}
              <div className="space-y-3 rounded-2xl border border-amber-400/20 bg-slate-950/65 p-3 sm:space-y-4 sm:rounded-3xl sm:p-5">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-300/70 sm:left-4" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => {
                      setLibrarySearch(e.target.value);
                      setLibraryPage(0);
                    }}
                    placeholder="Cari istilah bahasa Inggris, rumus matematika, konsep AI, sejarah, atau sains..."
                    className="w-full rounded-xl border border-white/15 bg-slate-950/80 py-2.5 pl-10 pr-3 text-xs text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none sm:rounded-2xl sm:py-3 sm:pl-11 sm:pr-4 sm:text-sm"
                  />
                </div>

                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0" aria-label="Filter bidang materi">
                  {DICTIONARY_DISCIPLINES.map((disc) => (
                    <button
                      key={disc.id}
                      type="button"
                      onClick={() => {
                        setLibraryFilter(disc.id);
                        setLibraryPage(0);
                      }}
                      aria-pressed={libraryFilter === disc.id}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-extrabold transition sm:px-3.5 sm:text-xs ${
                        libraryFilter === disc.id
                          ? 'bg-amber-300 text-slate-950 shadow-md'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      {disc.label}
                    </button>
                  ))}
                </div>

                {/* Alphabet A-Z Quick Filter */}
                <div className="flex gap-1 overflow-x-auto pb-1 pt-1 sm:flex-wrap sm:overflow-visible sm:pb-0" aria-label="Filter huruf awal istilah">
                  {alphabet.map((lt) => (
                    <button
                      key={lt}
                      type="button"
                      onClick={() => {
                        setLibraryLetter(lt);
                        setLibraryPage(0);
                      }}
                      aria-pressed={libraryLetter === lt}
                      className={`min-w-8 shrink-0 rounded-lg px-2 py-1.5 text-[10px] font-bold sm:text-[11px] ${
                        libraryLetter === lt
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-white/5 hover:bg-white/15 text-slate-300'
                      }`}
                    >
                      {lt === 'ALL' ? 'Semua' : lt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 sm:text-xs" aria-live="polite">
                <span>
                  {filteredDict.length
                    ? `Menampilkan ${libraryPage * libraryPageSize + 1}–${Math.min((libraryPage + 1) * libraryPageSize, filteredDict.length)} dari ${filteredDict.length} materi`
                    : 'Tidak ada materi yang cocok dengan pencarian.'}
                </span>
                {filteredDict.length > 0 && (
                  <span className="text-amber-200">Halaman {libraryPage + 1} / {libraryPageCount}</span>
                )}
              </div>

              {/* Dictionary Cards Grid */}
              <div id="library-material-results" className="scroll-mt-24 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
                {visibleLibraryEntries.map((entry) => {
                  const mastered = player.discoveredLore.some((l) => l.id === entry.id);
                  return (
                    <div
                      key={entry.id}
                      className="flex min-w-0 flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/55 p-3 shadow-lg transition hover:border-amber-400/45 sm:rounded-3xl sm:p-5"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="min-w-0 rounded-full bg-amber-400/15 px-2.5 py-1 text-[9px] font-bold text-amber-300 sm:text-[11px]">
                            {entry.tag}
                          </span>
                          <button
                            type="button"
                            onClick={() => speakTerm(entry.term)}
                            aria-label={`Dengarkan pelafalan ${entry.term}`}
                            className="shrink-0 rounded-lg bg-sky-500/10 p-2 text-sky-200 transition hover:bg-sky-500/25"
                            title="Dengarkan Pelafalan"
                          >
                            <Volume1 className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="break-words text-base font-black leading-snug text-white sm:text-lg">{entry.term}</h3>
                        <div className="break-words font-mono text-[10px] text-amber-200/90 sm:text-xs">{entry.pronunciation}</div>
                        <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">{entry.definition}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDictEntry(entry)}
                          className="rounded-lg bg-amber-400/15 px-3 py-2 text-[10px] font-extrabold text-amber-100 transition hover:bg-amber-400/25 sm:rounded-xl sm:px-3.5 sm:text-xs"
                        >
                          Baca Mendalam
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleMasterEntry(entry)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 ${
                            mastered
                              ? 'bg-emerald-500/25 text-emerald-300'
                              : 'bg-white/10 hover:bg-emerald-500/25 text-slate-200'
                          }`}
                        >
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span>{mastered ? 'Sudah Dipahami' : 'Tandai Paham'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {libraryPageCount > 1 && (
                <nav className="flex items-center justify-center gap-2" aria-label="Navigasi halaman materi">
                  <button
                    type="button"
                    disabled={libraryPage === 0}
                    onClick={() => navigateLibraryPage(Math.max(0, libraryPage - 1))}
                    className="min-h-10 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Sebelumnya
                  </button>
                  <span className="min-w-16 text-center text-xs font-bold text-amber-200">
                    {libraryPage + 1} / {libraryPageCount}
                  </span>
                  <button
                    type="button"
                    disabled={libraryPage + 1 >= libraryPageCount}
                    onClick={() => navigateLibraryPage(Math.min(libraryPageCount - 1, libraryPage + 1))}
                    className="min-h-10 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Berikutnya
                  </button>
                </nav>
              )}
                </div>
              </details>

              {/* DETAIL READER MODAL ("MODE BACA & PAHAMI") */}
              {selectedDictEntry && (
                createPortal(
                  <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-lg flex items-center justify-center overflow-y-auto p-3 sm:p-5">
                    <div className="max-w-3xl w-full bg-slate-900 border border-amber-400/40 rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rm-scene-enter">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="inline-flex px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold">
                            {selectedDictEntry.tag}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white mt-2">{selectedDictEntry.term}</h3>
                          <div className="text-xs font-mono text-amber-300">{selectedDictEntry.pronunciation}</div>
                        </div>
                        <button
                          onClick={() => setSelectedDictEntry(null)}
                          className="shrink-0 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200"
                          aria-label="Tutup materi"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200 leading-relaxed">
                        <div className="sm:col-span-2 rounded-2xl bg-amber-400/10 border border-amber-400/25 px-4 py-3">
                          <div className="text-xs font-extrabold uppercase text-amber-300 mb-1">Makna Utama</div>
                          <p className="font-semibold text-white">{selectedDictEntry.definition}</p>
                        </div>
                        {selectedDictEntry.deepContext && (
                          <div className="sm:col-span-2 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
                            <div className="mb-1 text-xs font-extrabold uppercase text-amber-200">Pemahaman Mendalam</div>
                            <p className="text-xs sm:text-sm">{selectedDictEntry.deepContext}</p>
                          </div>
                        )}
                        {selectedDictEntry.example && (
                          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30">
                            <div className="text-xs font-extrabold uppercase text-sky-300 mb-1">Contoh & Penerapan</div>
                            <p className="text-xs sm:text-sm">{selectedDictEntry.example}</p>
                          </div>
                        )}
                        {selectedDictEntry.funFact && (
                          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/25">
                            <div className="text-xs font-extrabold uppercase text-emerald-300 mb-1">Fakta Menarik</div>
                            <p className="text-xs sm:text-sm">{selectedDictEntry.funFact}</p>
                          </div>
                        )}
                      </div>

                      {selectedDictEntry.relatedTerms && selectedDictEntry.relatedTerms.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-extrabold uppercase text-slate-400">Istilah Terkait</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedDictEntry.relatedTerms.map((rel) => (
                              <button
                                key={rel}
                                onClick={() => {
                                  const found = KNOWLEDGE_DICTIONARY.find(
                                    (d) => d.term.toLowerCase() === rel.toLowerCase()
                                  );
                                  if (found) setSelectedDictEntry(found);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold transition"
                              >
                                {rel}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <BasicOperationsExplorer
                        activeEntry={selectedDictEntry}
                        onSelectEntry={setSelectedDictEntry}
                      />

                      <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10">
                        <button
                          onClick={() => speakTerm(selectedDictEntry.term)}
                          className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 font-extrabold text-xs flex items-center gap-1.5"
                        >
                          <Volume1 className="w-4 h-4" />
                          <span>Lafalkan</span>
                        </button>
                        <button
                          onClick={() => toggleMasterEntry(selectedDictEntry)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-extrabold text-xs flex items-center gap-1.5"
                        >
                          <BookmarkCheck className="w-4 h-4" />
                          <span>Tandai Dipahami (+15 XP)</span>
                        </button>
                        <button
                          onClick={() => setSelectedDictEntry(null)}
                          className="ml-auto px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </div>,
                  document.body
                )
              )}
            </div>
          );
        })()}

        {/* ===================================================================
            SCREEN 10: CHARACTER CUSTOMIZATION, ACHIEVEMENTS & PROGRESS REPORT
           =================================================================== */}
        {screen === 'profile' && (
          <div className="space-y-6 rm-scene-enter">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{t.heroProfile}</h2>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hero Customizer Panel */}
              <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 text-center space-y-4">
                <h3 className="font-black text-amber-300 text-sm uppercase tracking-wider">
                  {t.customizeHero}
                </h3>
                <HeroVectorAvatar
                  animState="happy"
                  hatId={player.hat}
                  outfitId={player.outfit}
                  companionId={player.companion}
                  size={150}
                />
                <div className="text-xs font-bold text-slate-300">
                  {t.coins}: <span className="text-amber-400">{player.coins}</span>
                </div>

                {/* Hats */}
                <div className="text-left space-y-1.5">
                  <div className="text-xs font-bold text-slate-400">Hiasan Kepala</div>
                  <div className="grid grid-cols-2 gap-2">
                    {HERO_HATS.map((h) => {
                      const unlocked = player.unlockedItems.includes(h.id);
                      const equipped = player.hat === h.id;
                      return (
                        <button
                          key={h.id}
                          onClick={() => {
                            if (unlocked) {
                              setPlayer((p) => ({ ...p, hat: h.id }));
                            } else if (player.coins >= h.cost) {
                              soundEngine.playDiscovery();
                              setPlayer((p) => ({
                                ...p,
                                coins: p.coins - h.cost,
                                hat: h.id,
                                unlockedItems: [...p.unlockedItems, h.id]
                              }));
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left ${
                            equipped
                              ? 'bg-amber-400/25 border-amber-400 text-amber-200'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          <div>{h.name[lang]}</div>
                          <div className="text-[10px] text-amber-400">
                            {equipped ? 'Dipakai' : unlocked ? 'Pakai' : `${h.cost} Koin`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Outfits */}
                <div className="text-left space-y-1.5">
                  <div className="text-xs font-bold text-slate-400">Jubah Petualang</div>
                  <div className="grid grid-cols-2 gap-2">
                    {HERO_OUTFITS.map((o) => {
                      const unlocked = player.unlockedItems.includes(o.id);
                      const equipped = player.outfit === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => {
                            if (unlocked) {
                              setPlayer((p) => ({ ...p, outfit: o.id }));
                            } else if (player.coins >= o.cost) {
                              soundEngine.playDiscovery();
                              setPlayer((p) => ({
                                ...p,
                                coins: p.coins - o.cost,
                                outfit: o.id,
                                unlockedItems: [...p.unlockedItems, o.id]
                              }));
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left ${
                            equipped
                              ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          <div>{o.name[lang]}</div>
                          <div className="text-[10px] text-amber-400">
                            {equipped ? 'Dipakai' : unlocked ? 'Pakai' : `${o.cost} Koin`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Achievements & Adaptive Report */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 space-y-4">
                  <h3 className="font-black text-white text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>{t.achievements}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACHIEVEMENTS_LIST.map((ach) => {
                      const earned = player.unlockedAchievements.includes(ach.id);
                      return (
                        <div
                          key={ach.id}
                          className={`p-4 rounded-2xl border flex items-start gap-3 ${
                            earned
                              ? 'bg-amber-400/15 border-amber-400/50 text-white'
                              : 'bg-white/5 border-white/10 text-slate-400 opacity-60'
                          }`}
                        >
                          <Trophy
                            className={`w-6 h-6 shrink-0 ${earned ? 'text-amber-400' : 'text-slate-500'}`}
                          />
                          <div>
                            <div className="font-extrabold text-sm">{ach.title[lang]}</div>
                            <div className="text-xs mt-0.5">{ach.desc[lang]}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Adaptive Mastery Report */}
                <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 space-y-4">
                  <h3 className="font-black text-white text-lg">{t.progressReport}</h3>
                  <div className="space-y-3">
                    {ZONES.map((z) => {
                      const s = player.zoneStats[z.id] || { correct: 0, total: 0 };
                      const pct = s.total === 0 ? 0 : Math.round((s.correct / s.total) * 100);
                      return (
                        <div key={z.id} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span>{z.name[lang]}</span>
                            <span>
                              {s.correct}/{s.total} ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${pct}%`, backgroundColor: z.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            SCREEN 11: SETTINGS, AUDIO & ACCESSIBILITY
           =================================================================== */}
        {screen === 'settings' && (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 rm-scene-enter">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-400" />
                <span>{t.settings}</span>
              </h2>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>

            {/* Language & Text Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{t.language}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      lang === 'en' ? 'bg-amber-400 text-slate-950' : 'bg-white/10'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('id')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      lang === 'id' ? 'bg-amber-400 text-slate-950' : 'bg-white/10'
                    }`}
                  >
                    Bahasa Indonesia
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{t.textSize}</span>
                <div className="flex gap-2">
                  {[
                    { id: 'normal', label: 'Normal' },
                    { id: 'large', label: 'Besar' },
                    { id: 'xlarge', label: 'Sangat Besar' }
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSettings((s) => ({ ...s, textSize: sz.id }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        settings.textSize === sz.id ? 'bg-indigo-500 text-white' : 'bg-white/10'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{t.reducedMotion}</span>
                <button
                  onClick={() => setSettings((s) => ({ ...s, reducedMotion: !s.reducedMotion }))}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                    settings.reducedMotion ? 'bg-emerald-500 text-slate-950' : 'bg-white/10'
                  }`}
                >
                  {settings.reducedMotion ? 'AKTIF' : 'NONAKTIF'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{t.audioSubtitles}</span>
                <button
                  onClick={() => setSettings((s) => ({ ...s, subtitles: !s.subtitles }))}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                    settings.subtitles ? 'bg-emerald-500 text-slate-950' : 'bg-white/10'
                  }`}
                >
                  {settings.subtitles ? 'AKTIF' : 'NONAKTIF'}
                </button>
              </div>

              {/* Independent Music & SFX Volume Sliders */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{t.musicVolume}</span>
                  <span>{Math.round(settings.musicVol * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.musicVol}
                  onChange={(e) => setSettings((s) => ({ ...s, musicVol: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-400"
                />

                <label className="flex justify-between text-xs font-bold text-slate-300 pt-2">
                  <span>{t.sfxVolume}</span>
                  <span>{Math.round(settings.sfxVol * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.sfxVol}
                  onChange={(e) => setSettings((s) => ({ ...s, sfxVol: parseFloat(e.target.value) }))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>

            {/* Save Management */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  await saveToStorage({ player, settings, lang });
                  showToast(t.savedSuccess);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.saveProgress}</span>
              </button>

              <button
                onClick={async () => {
                  localStorage.removeItem(SAVE_KEY);
                  setHasSave(false);
                  showToast(lang === 'en' ? 'Save data cleared.' : 'Data simpanan dihapus.');
                }}
                className="py-3 px-4 rounded-2xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.resetProgress}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}