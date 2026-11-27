const makeEntry = (categoryId, index, row) => {
  const [indonesian, english, partOfSpeech, pronunciationIPA, exampleEnglish, exampleIndonesian, usageNote = ''] = row;
  return {
    id: `id-en-${categoryId}-${index}`,
    indonesian,
    english,
    partOfSpeech,
    pronunciationIPA,
    exampleEnglish,
    exampleIndonesian,
    usageNote,
    categoryId,
    source: 'curated',
  };
};

export const COMPREHENSIVE_DICTIONARY_CATEGORIES = [
  { id: 'time', label: 'Waktu dan Kalender' },
  { id: 'numbers', label: 'Angka dan Matematika' },
  { id: 'people', label: 'Manusia dan Kehidupan' },
  { id: 'home', label: 'Rumah dan Peralatan' },
  { id: 'food', label: 'Makanan dan Minuman' },
  { id: 'environment', label: 'Alam dan Lingkungan' },
  { id: 'education', label: 'Pendidikan dan Pengetahuan' },
  { id: 'business', label: 'Pekerjaan dan Bisnis' },
  { id: 'technology', label: 'Teknologi dan Komunikasi' },
  { id: 'travel', label: 'Transportasi dan Perjalanan' },
  { id: 'health', label: 'Kesehatan dan Kebersihan' },
  { id: 'adjectives', label: 'Kata Sifat (Adjectives)' },
  { id: 'adverbs', label: 'Kata Keterangan (Adverbs)' },
  { id: 'connectors', label: 'Kata Hubung dan Kata Depan' },
  { id: 'daily-life', label: 'Aktivitas Sehari-hari' },
  { id: 'society', label: 'Hukum, Pemerintahan, dan Masyarakat' },
  { id: 'life-terms', label: 'Istilah Umum Kehidupan' },
  { id: 'measurements', label: 'Ukuran, Satuan, dan Perhitungan' },
];

const curatedEntries = [];
const addCategory = (categoryId, rows) => {
  rows.forEach((row, index) => {
    curatedEntries.push({
      ...makeEntry(categoryId, index + 1, row),
      sequenceOrder: curatedEntries.length,
    });
  });
};

addCategory('time', [
  ['Detik', 'second', 'noun', '/ˈsɛkənd/', 'Wait a second, please.', 'Tunggu sebentar, ya.', 'A second is also an ordinal meaning “kedua”.'],
  ['Menit', 'minute', 'noun', '/ˈmɪnɪt/', 'The bus will arrive in five minutes.', 'Bus akan tiba dalam lima menit.'],
  ['Jam', 'hour', 'noun', '/ˈaʊər/', 'The meeting lasted one hour.', 'Rapat berlangsung selama satu jam.', 'For clock time, “jam 3” is “3 o’clock” or “three”.'],
  ['Pagi', 'morning', 'noun', '/ˈmɔːrnɪŋ/', 'I exercise every morning.', 'Saya berolahraga setiap pagi.'],
  ['Siang', 'afternoon', 'noun', '/ˌæftərˈnuːn/', 'We will talk this afternoon.', 'Kita akan berbicara siang ini.'],
  ['Sore', 'evening', 'noun', '/ˈiːvnɪŋ/', 'She reads in the evening.', 'Dia membaca pada sore hari.'],
  ['Malam', 'night', 'noun', '/naɪt/', 'The stars are bright tonight.', 'Bintang-bintang tampak terang malam ini.'],
  ['Hari ini', 'today', 'adverb/noun', '/təˈdeɪ/', 'I have a class today.', 'Saya ada kelas hari ini.'],
  ['Besok', 'tomorrow', 'adverb/noun', '/təˈmɑːroʊ/', 'We will leave tomorrow.', 'Kami akan berangkat besok.'],
  ['Kemarin', 'yesterday', 'adverb/noun', '/ˈjɛstərdeɪ/', 'It rained yesterday.', 'Kemarin hujan.'],
  ['Lusa', 'the day after tomorrow', 'adverbial phrase', '/ðə deɪ ˈæftər təˈmɑːroʊ/', 'The package should arrive the day after tomorrow.', 'Paket itu seharusnya tiba lusa.'],
  ['Minggu', 'week', 'noun', '/wiːk/', 'The course lasts six weeks.', 'Kursus itu berlangsung selama enam minggu.'],
  ['Bulan', 'month', 'noun', '/mʌnθ/', 'My birthday is next month.', 'Ulang tahun saya bulan depan.', '“Bulan” can mean “month” or “moon”, depending on context.'],
  ['Tahun', 'year', 'noun', '/jɪr/', 'They moved here last year.', 'Mereka pindah ke sini tahun lalu.'],
  ['Tanggal', 'date', 'noun', '/deɪt/', 'What is the date today?', 'Tanggal berapa hari ini?'],
  ['Kalender', 'calendar', 'noun', '/ˈkælɪndər/', 'Mark the appointment on your calendar.', 'Tandai janji itu di kalender Anda.'],
  ['Tengah hari', 'noon', 'noun', '/nuːn/', 'The office closes at noon.', 'Kantor tutup pada tengah hari.'],
  ['Tengah malam', 'midnight', 'noun', '/ˈmɪdnaɪt/', 'The train arrives at midnight.', 'Kereta tiba pada tengah malam.'],
  ['Senin', 'Monday', 'proper noun', '/ˈmʌndeɪ/', 'The course starts on Monday.', 'Kursus dimulai pada hari Senin.'],
  ['Selasa', 'Tuesday', 'proper noun', '/ˈtuːzdeɪ/', 'We have a meeting every Tuesday.', 'Kami rapat setiap hari Selasa.'],
  ['Rabu', 'Wednesday', 'proper noun', '/ˈwɛnzdeɪ/', 'The library is closed on Wednesday.', 'Perpustakaan tutup pada hari Rabu.'],
  ['Kamis', 'Thursday', 'proper noun', '/ˈθɜːrzdeɪ/', 'Her appointment is Thursday morning.', 'Jadwal konsultasinya Kamis pagi.'],
  ['Jumat', 'Friday', 'proper noun', '/ˈfraɪdeɪ/', 'I finish work early on Friday.', 'Saya selesai bekerja lebih awal pada hari Jumat.'],
  ['Sabtu', 'Saturday', 'proper noun', '/ˈsætərdeɪ/', 'They play football on Saturday.', 'Mereka bermain sepak bola pada hari Sabtu.'],
  ['Minggu (hari)', 'Sunday', 'proper noun', '/ˈsʌndeɪ/', 'The museum opens on Sunday.', 'Museum buka pada hari Minggu.'],
  ['Januari', 'January', 'proper noun', '/ˈdʒænjueri/', 'The new semester begins in January.', 'Semester baru dimulai pada bulan Januari.'],
  ['Februari', 'February', 'proper noun', '/ˈfɛbrueri/', 'February has twenty-eight days in a common year.', 'Februari memiliki dua puluh delapan hari pada tahun biasa.'],
  ['Maret', 'March', 'proper noun', '/mɑːrtʃ/', 'The rainy season ends in March.', 'Musim hujan berakhir pada bulan Maret.'],
  ['April', 'April', 'proper noun', '/ˈeɪprəl/', 'The conference takes place in April.', 'Konferensi berlangsung pada bulan April.'],
  ['Mei', 'May', 'proper noun', '/meɪ/', 'The school holiday starts in May.', 'Libur sekolah dimulai pada bulan Mei.'],
  ['Juni', 'June', 'proper noun', '/dʒuːn/', 'The dry season often begins in June.', 'Musim kemarau sering dimulai pada bulan Juni.'],
  ['Juli', 'July', 'proper noun', '/dʒuˈlaɪ/', 'They travel in July.', 'Mereka bepergian pada bulan Juli.'],
  ['Agustus', 'August', 'proper noun', '/ˈɔːɡəst/', 'Independence Day is in August.', 'Hari Kemerdekaan jatuh pada bulan Agustus.'],
  ['September', 'September', 'proper noun', '/sɛpˈtɛmbər/', 'The workshop is scheduled for September.', 'Lokakarya dijadwalkan pada bulan September.'],
  ['Oktober', 'October', 'proper noun', '/ɑːkˈtoʊbər/', 'The weather is cooler in October.', 'Cuaca lebih sejuk pada bulan Oktober.'],
  ['November', 'November', 'proper noun', '/noʊˈvɛmbər/', 'Applications close in November.', 'Pendaftaran ditutup pada bulan November.'],
  ['Desember', 'December', 'proper noun', '/dɪˈsɛmbər/', 'The year ends in December.', 'Tahun berakhir pada bulan Desember.'],
  ['Musim', 'season', 'noun', '/ˈsiːzən/', 'The dry season starts in June.', 'Musim kemarau dimulai pada bulan Juni.'],
]);

addCategory('numbers', [
  ['Angka', 'number', 'noun', '/ˈnʌmbər/', 'Write your phone number here.', 'Tuliskan nomor telepon Anda di sini.', '“Number” means a mathematical value; “figure” can mean a numeral or statistic.'],
  ['Penjumlahan', 'addition', 'noun', '/əˈdɪʃən/', 'Addition combines two or more values.', 'Penjumlahan menggabungkan dua nilai atau lebih.'],
  ['Pengurangan', 'subtraction', 'noun', '/səbˈtrækʃən/', 'Subtraction finds the difference between numbers.', 'Pengurangan mencari selisih antara bilangan.'],
  ['Perkalian', 'multiplication', 'noun', '/ˌmʌltɪplɪˈkeɪʃən/', 'Multiplication is repeated addition.', 'Perkalian adalah penjumlahan berulang.'],
  ['Pembagian', 'division', 'noun', '/dɪˈvɪʒən/', 'Division splits a total into equal parts.', 'Pembagian membagi jumlah total menjadi bagian yang sama.'],
  ['Jumlah', 'sum / total', 'noun', '/sʌm/; /ˈtoʊtəl/', 'The sum of four and six is ten.', 'Jumlah empat dan enam adalah sepuluh.', '“Sum” is the result of addition; “total” is the complete amount.'],
  ['Rata-rata', 'average', 'noun/adjective', '/ˈævərɪdʒ/', 'The average score was eighty.', 'Nilai rata-ratanya adalah delapan puluh.'],
  ['Pecahan', 'fraction', 'noun', '/ˈfrækʃən/', 'One half is a fraction equal to 0.5.', 'Setengah adalah pecahan yang nilainya sama dengan 0,5.'],
  ['Desimal', 'decimal', 'noun/adjective', '/ˈdɛsɪməl/', 'Write one quarter as a decimal: 0.25.', 'Tuliskan seperempat dalam bentuk desimal: 0,25.'],
  ['Persentase', 'percentage', 'noun', '/pərˈsɛntɪdʒ/', 'The discount is ten percent.', 'Diskonnya sebesar sepuluh persen.'],
  ['Nol koma lima (0,5)', 'zero point five', 'decimal number', '/ˈzɪəroʊ pɔɪnt faɪv/', 'The measurement is zero point five meters.', 'Ukurannya nol koma lima meter.', 'Read digits after a decimal point individually when precision matters.'],
  ['Setengah (1/2)', 'one half', 'fraction', '/wʌn hæf/', 'One half of the students arrived early.', 'Setengah dari siswa datang lebih awal.'],
  ['Seperempat (1/4)', 'one quarter / one fourth', 'fraction', '/wʌn ˈkwɔːrtər/; /wʌn fɔːrθ/', 'One quarter of the cake is left.', 'Seperempat kue itu masih tersisa.'],
  ['Dua puluh lima persen (25%)', 'twenty-five percent', 'percentage', '/ˈtwɛnti faɪv pərˈsɛnt/', 'Twenty-five percent of the class chose science.', 'Dua puluh lima persen dari kelas memilih sains.'],
  ['Pukul 3.15', 'three fifteen / a quarter past three', 'time expression', '/θriː fɪfˈtiːn/; /ə ˈkwɔːrtər pæst θriː/', 'The meeting starts at three fifteen.', 'Rapat dimulai pukul 3.15.', 'In 12-hour time, specify a.m. or p.m. when context is unclear.'],
  ['Tanggal 1 Januari', 'the first of January / January first', 'date expression', '/ðə fɜːrst əv ˈdʒænjueri/; /ˈdʒænjueri fɜːrst/', 'The deadline is the first of January.', 'Tenggatnya tanggal 1 Januari.', 'British English commonly uses “the first of January”; American English often uses “January first”.'],
  ['Tahun 2025', 'twenty twenty-five / two thousand and twenty-five', 'year expression', '/ˈtwɛnti ˈtwɛnti faɪv/; /tuː ˈθaʊzənd ænd ˈtwɛnti faɪv/', 'The project will finish in twenty twenty-five.', 'Proyek itu akan selesai pada tahun 2025.', 'Years are commonly read in pairs; full cardinal readings are also possible.'],
  ['Hasil', 'result', 'noun', '/rɪˈzʌlt/', 'Check your result before submitting the answer.', 'Periksa hasilmu sebelum mengirim jawaban.'],
  ['Rumus', 'formula', 'noun', '/ˈfɔːrmjələ/', 'Use this formula to calculate the area.', 'Gunakan rumus ini untuk menghitung luas.'],
]);

addCategory('people', [
  ['Manusia', 'human being', 'noun', '/ˈhjuːmən ˈbiːɪŋ/', 'Every human being deserves respect.', 'Setiap manusia pantas dihormati.'],
  ['Orang', 'person', 'noun', '/ˈpɜːrsən/', 'One person is waiting outside.', 'Satu orang sedang menunggu di luar.'],
  ['Keluarga', 'family', 'noun', '/ˈfæməli/', 'My family lives in Indonesia.', 'Keluarga saya tinggal di Indonesia.'],
  ['Orang tua', 'parent', 'noun', '/ˈpɛrənt/', 'A parent came to the school meeting.', 'Seorang orang tua datang ke pertemuan sekolah.', 'Use “parents” for both mother and father.'],
  ['Anak', 'child', 'noun', '/tʃaɪld/', 'The child is drawing a picture.', 'Anak itu sedang menggambar.'],
  ['Teman', 'friend', 'noun', '/frɛnd/', 'My friend helped me study.', 'Teman saya membantu saya belajar.'],
  ['Tubuh', 'body', 'noun', '/ˈbɑːdi/', 'Water is important for the body.', 'Air penting bagi tubuh.'],
  ['Perasaan', 'feeling', 'noun', '/ˈfiːlɪŋ/', 'She shared her feelings honestly.', 'Dia menyampaikan perasaannya dengan jujur.'],
  ['Kelahiran', 'birth', 'noun', '/bɜːrθ/', 'The date of birth is on the form.', 'Tanggal lahir tercantum pada formulir.'],
  ['Kehidupan', 'life', 'noun', '/laɪf/', 'Learning is part of life.', 'Belajar adalah bagian dari kehidupan.'],
]);

addCategory('home', [
  ['Rumah', 'house / home', 'noun', '/haʊs/; /hoʊm/', 'Their house is near the station.', 'Rumah mereka dekat stasiun.', '“House” is the building; “home” emphasizes the place where someone lives.'],
  ['Ruangan', 'room', 'noun', '/ruːm/', 'This room gets plenty of sunlight.', 'Ruangan ini mendapat banyak sinar matahari.'],
  ['Dapur', 'kitchen', 'noun', '/ˈkɪtʃən/', 'The kitchen is clean.', 'Dapur itu bersih.'],
  ['Kamar tidur', 'bedroom', 'noun', '/ˈbɛdruːm/', 'The bedroom has two windows.', 'Kamar tidur itu memiliki dua jendela.'],
  ['Meja', 'table', 'noun', '/ˈteɪbəl/', 'Please put the books on the table.', 'Tolong letakkan buku-buku di atas meja.'],
  ['Kursi', 'chair', 'noun', '/tʃɛr/', 'There is an empty chair by the door.', 'Ada kursi kosong di dekat pintu.'],
  ['Jendela', 'window', 'noun', '/ˈwɪndoʊ/', 'Open the window for fresh air.', 'Buka jendela agar udara segar masuk.'],
  ['Kulkas', 'refrigerator / fridge', 'noun', '/rɪˈfrɪdʒəˌreɪtər/; /frɪdʒ/', 'Keep the milk in the refrigerator.', 'Simpan susu di dalam kulkas.'],
]);

addCategory('food', [
  ['Makanan', 'food', 'noun', '/fuːd/', 'Fresh food helps us stay healthy.', 'Makanan segar membantu kita tetap sehat.'],
  ['Minuman', 'drink / beverage', 'noun', '/drɪŋk/; /ˈbɛvərɪdʒ/', 'Water is my favorite drink.', 'Air adalah minuman favorit saya.'],
  ['Nasi', 'cooked rice', 'noun', '/kʊkt raɪs/', 'We usually eat cooked rice for lunch.', 'Kami biasanya makan nasi untuk makan siang.', '“Rice” can mean uncooked rice or rice in general; “cooked rice” is nasi matang.'],
  ['Roti', 'bread', 'noun', '/brɛd/', 'I made a sandwich with fresh bread.', 'Saya membuat roti lapis dengan roti segar.'],
  ['Buah', 'fruit', 'noun', '/fruːt/', 'She eats fruit every morning.', 'Dia makan buah setiap pagi.'],
  ['Sayuran', 'vegetable', 'noun', '/ˈvɛdʒtəbəl/', 'Add a green vegetable to the meal.', 'Tambahkan sayuran hijau ke dalam hidangan.'],
  ['Ikan', 'fish', 'noun', '/fɪʃ/', 'The fish is grilled with lemon.', 'Ikan itu dipanggang dengan lemon.'],
  ['Telur', 'egg', 'noun', '/ɛɡ/', 'He boiled an egg for breakfast.', 'Dia merebus telur untuk sarapan.'],
  ['Garam', 'salt', 'noun', '/sɔːlt/', 'Add a little salt to the soup.', 'Tambahkan sedikit garam ke dalam sup.'],
  ['Memasak', 'cook', 'verb', '/kʊk/', 'They cook dinner together.', 'Mereka memasak makan malam bersama.'],
]);

addCategory('environment', [
  ['Lingkungan', 'environment', 'noun', '/ɪnˈvaɪrənmənt/', 'We should protect the environment.', 'Kita harus melindungi lingkungan.'],
  ['Hewan', 'animal', 'noun', '/ˈænɪməl/', 'The animal found shelter under a tree.', 'Hewan itu menemukan tempat berlindung di bawah pohon.'],
  ['Tumbuhan', 'plant', 'noun', '/plænt/', 'This plant needs sunlight and water.', 'Tumbuhan ini membutuhkan sinar matahari dan air.'],
  ['Hutan', 'forest', 'noun', '/ˈfɔːrɪst/', 'Many rare birds live in the forest.', 'Banyak burung langka hidup di hutan.'],
  ['Laut', 'sea / ocean', 'noun', '/siː/; /ˈoʊʃən/', 'The island is surrounded by the sea.', 'Pulau itu dikelilingi laut.', '“Ocean” usually refers to a larger body of salt water than “sea”.'],
  ['Gunung', 'mountain', 'noun', '/ˈmaʊntən/', 'The mountain is covered with clouds.', 'Gunung itu tertutup awan.'],
  ['Sungai', 'river', 'noun', '/ˈrɪvər/', 'The river flows through the village.', 'Sungai itu mengalir melewati desa.'],
  ['Cuaca', 'weather', 'noun', '/ˈwɛðər/', 'The weather is sunny today.', 'Cuacanya cerah hari ini.'],
  ['Iklim', 'climate', 'noun', '/ˈklaɪmət/', 'The region has a tropical climate.', 'Wilayah itu beriklim tropis.'],
  ['Banjir', 'flood', 'noun/verb', '/flʌd/', 'Heavy rain caused a flood.', 'Hujan deras menyebabkan banjir.'],
]);

addCategory('education', [
  ['Pendidikan', 'education', 'noun', '/ˌɛdʒuˈkeɪʃən/', 'Education opens new opportunities.', 'Pendidikan membuka kesempatan baru.'],
  ['Pengetahuan', 'knowledge', 'noun', '/ˈnɑːlɪdʒ/', 'Knowledge grows when we share ideas.', 'Pengetahuan berkembang ketika kita berbagi gagasan.'],
  ['Sekolah', 'school', 'noun', '/skuːl/', 'The school opens at seven o’clock.', 'Sekolah buka pukul tujuh.'],
  ['Universitas', 'university', 'noun', '/ˌjuːnɪˈvɜːrsəti/', 'She studies biology at the university.', 'Dia belajar biologi di universitas.'],
  ['Siswa', 'student', 'noun', '/ˈstuːdənt/', 'Each student received a workbook.', 'Setiap siswa menerima buku latihan.'],
  ['Guru', 'teacher', 'noun', '/ˈtiːtʃər/', 'The teacher explained the experiment.', 'Guru itu menjelaskan percobaan tersebut.'],
  ['Pelajaran', 'lesson', 'noun', '/ˈlɛsən/', 'Today’s lesson is about energy.', 'Pelajaran hari ini membahas energi.'],
  ['Penelitian', 'research', 'noun/verb', '/ˈriːsɜːrtʃ/', 'The research produced useful results.', 'Penelitian itu menghasilkan temuan yang berguna.'],
  ['Metode', 'method', 'noun', '/ˈmɛθəd/', 'This method saves time.', 'Metode ini menghemat waktu.'],
  ['Analisis', 'analysis', 'noun', '/əˈnæləsɪs/', 'Their analysis supports the conclusion.', 'Analisis mereka mendukung kesimpulan tersebut.'],
]);

addCategory('business', [
  ['Pekerjaan', 'work / job', 'noun', '/wɜːrk/; /dʒɑːb/', 'I am looking for a new job.', 'Saya sedang mencari pekerjaan baru.', '“Work” can mean activity or workplace; “job” is a specific position.'],
  ['Karyawan', 'employee', 'noun', '/ɪmˈplɔɪiː/', 'Every employee attended the training.', 'Setiap karyawan mengikuti pelatihan.'],
  ['Perusahaan', 'company', 'noun', '/ˈkʌmpəni/', 'The company opened a new office.', 'Perusahaan itu membuka kantor baru.'],
  ['Bisnis', 'business', 'noun', '/ˈbɪznəs/', 'They run a small family business.', 'Mereka menjalankan bisnis keluarga kecil.'],
  ['Pertemuan', 'meeting', 'noun', '/ˈmiːtɪŋ/', 'The meeting starts at nine.', 'Pertemuan dimulai pukul sembilan.'],
  ['Gaji', 'salary', 'noun', '/ˈsæləri/', 'Her salary is paid monthly.', 'Gajinya dibayarkan setiap bulan.'],
  ['Keuangan', 'finance', 'noun', '/ˈfaɪnæns/', 'He works in finance.', 'Dia bekerja di bidang keuangan.'],
  ['Pelanggan', 'customer / client', 'noun', '/ˈkʌstəmər/; /ˈklaɪənt/', 'The customer asked for a receipt.', 'Pelanggan itu meminta tanda terima.', '“Client” is common for professional services; “customer” for buying goods.'],
  ['Pasar', 'market', 'noun', '/ˈmɑːrkɪt/', 'Local farmers sell fruit at the market.', 'Petani setempat menjual buah di pasar.'],
  ['Tanggung jawab', 'responsibility', 'noun', '/rɪˌspɑːnsəˈbɪləti/', 'Safety is everyone’s responsibility.', 'Keselamatan adalah tanggung jawab semua orang.'],
]);

addCategory('technology', [
  ['Komputer', 'computer', 'noun', '/kəmˈpjuːtər/', 'Save the document on your computer.', 'Simpan dokumen itu di komputer Anda.'],
  ['Perangkat lunak', 'software', 'noun', '/ˈsɔːftwɛr/', 'The software needs an update.', 'Perangkat lunak itu perlu diperbarui.'],
  ['Perangkat keras', 'hardware', 'noun', '/ˈhɑːrdwɛr/', 'The technician replaced the computer hardware.', 'Teknisi itu mengganti perangkat keras komputer.'],
  ['Internet', 'internet', 'noun', '/ˈɪntərnɛt/', 'The internet connects people around the world.', 'Internet menghubungkan orang-orang di seluruh dunia.'],
  ['Situs web', 'website', 'noun', '/ˈwɛbsaɪt/', 'Visit the official website for details.', 'Kunjungi situs web resmi untuk melihat detailnya.'],
  ['Kata sandi', 'password', 'noun', '/ˈpæsˌwɜːrd/', 'Create a strong password for your account.', 'Buat kata sandi yang kuat untuk akun Anda.'],
  ['Jaringan', 'network', 'noun/verb', '/ˈnɛtwɜːrk/', 'The office network is secure.', 'Jaringan kantor itu aman.'],
  ['Pesan', 'message', 'noun/verb', '/ˈmɛsɪdʒ/', 'I sent you a message this morning.', 'Saya mengirim pesan kepada Anda pagi ini.'],
  ['Surel', 'email', 'noun/verb', '/ˈiːmeɪl/', 'Please send the report by email.', 'Tolong kirim laporan itu melalui surel.'],
  ['Data', 'data', 'noun', '/ˈdeɪtə/', 'The team checked the data carefully.', 'Tim itu memeriksa data dengan saksama.'],
]);

addCategory('travel', [
  ['Mobil', 'car', 'noun', '/kɑːr/', 'They traveled by car.', 'Mereka bepergian dengan mobil.'],
  ['Bus', 'bus', 'noun', '/bʌs/', 'The bus stops near the museum.', 'Bus berhenti di dekat museum.'],
  ['Kereta api', 'train', 'noun/verb', '/treɪn/', 'Our train leaves at noon.', 'Kereta api kami berangkat tengah hari.'],
  ['Sepeda', 'bicycle / bike', 'noun', '/ˈbaɪsɪkəl/; /baɪk/', 'She rides her bicycle to school.', 'Dia mengendarai sepeda ke sekolah.'],
  ['Pesawat', 'airplane / plane', 'noun', '/ˈɛrˌpleɪn/; /pleɪn/', 'The airplane landed safely.', 'Pesawat itu mendarat dengan selamat.'],
  ['Bandara', 'airport', 'noun', '/ˈɛrˌpɔːrt/', 'Please arrive at the airport early.', 'Tolong tiba di bandara lebih awal.'],
  ['Jalan', 'road / street', 'noun', '/roʊd/; /striːt/', 'The hotel is across the street.', 'Hotel itu berada di seberang jalan.', '“Road” often connects places; “street” is usually a road in a town or city.'],
  ['Perjalanan', 'journey / trip', 'noun', '/ˈdʒɜːrni/; /trɪp/', 'The journey takes about two hours.', 'Perjalanan itu memakan waktu sekitar dua jam.', '“Trip” often means a short visit; “journey” emphasizes travel from one place to another.'],
]);

addCategory('health', [
  ['Kesehatan', 'health', 'noun', '/hɛlθ/', 'Sleep is important for good health.', 'Tidur penting untuk kesehatan yang baik.'],
  ['Kepala', 'head', 'noun', '/hɛd/', 'He wears a helmet to protect his head.', 'Dia memakai helm untuk melindungi kepalanya.'],
  ['Tangan', 'hand', 'noun', '/hænd/', 'Wash your hands before eating.', 'Cuci tangan sebelum makan.'],
  ['Mata', 'eye', 'noun', '/aɪ/', 'Bright light can hurt your eyes.', 'Cahaya terang dapat menyakiti mata Anda.'],
  ['Dokter', 'doctor', 'noun', '/ˈdɑːktər/', 'The doctor examined the patient.', 'Dokter memeriksa pasien itu.'],
  ['Rumah sakit', 'hospital', 'noun', '/ˈhɑːspɪtəl/', 'The hospital is open all day.', 'Rumah sakit itu buka sepanjang hari.'],
  ['Obat', 'medicine / medication', 'noun', '/ˈmɛdɪsən/; /ˌmɛdɪˈkeɪʃən/', 'Take this medicine with water.', 'Minum obat ini dengan air.', '“Medicine” can also mean the field of medical science.'],
  ['Olahraga', 'exercise', 'noun/verb', '/ˈɛksərsaɪz/', 'Regular exercise can improve fitness.', 'Olahraga teratur dapat meningkatkan kebugaran.'],
]);

addCategory('adjectives', [
  ['Besar', 'big / large', 'adjective', '/bɪɡ/; /lɑːrdʒ/', 'They live in a large house.', 'Mereka tinggal di rumah yang besar.', '“Large” is more formal; “big” is common in conversation.'],
  ['Kecil', 'small / little', 'adjective', '/smɔːl/; /ˈlɪtəl/', 'A small bird sat on the fence.', 'Seekor burung kecil hinggap di pagar.'],
  ['Tinggi', 'tall / high', 'adjective', '/tɔːl/; /haɪ/', 'That is a tall building.', 'Itu gedung yang tinggi.', 'Use “tall” for people and upright objects; “high” for levels or positions.'],
  ['Rendah', 'low / short', 'adjective', '/loʊ/; /ʃɔːrt/', 'The table is too low.', 'Meja itu terlalu rendah.'],
  ['Cepat', 'fast / quick', 'adjective/adverb', '/fæst/; /kwɪk/', 'The train is fast.', 'Kereta itu cepat.'],
  ['Lambat', 'slow', 'adjective/adverb', '/sloʊ/', 'Traffic is slow this morning.', 'Lalu lintas lambat pagi ini.'],
  ['Kuat', 'strong', 'adjective', '/strɔːŋ/', 'This bridge is strong and stable.', 'Jembatan ini kuat dan kokoh.'],
  ['Lemah', 'weak', 'adjective', '/wiːk/', 'The signal is weak in this area.', 'Sinyalnya lemah di daerah ini.'],
  ['Indah', 'beautiful', 'adjective', '/ˈbjuːtɪfəl/', 'The beach is beautiful at sunrise.', 'Pantai itu indah saat matahari terbit.'],
  ['Penting', 'important', 'adjective', '/ɪmˈpɔːrtənt/', 'Clear communication is important.', 'Komunikasi yang jelas itu penting.'],
  ['Sulit', 'difficult / hard', 'adjective', '/ˈdɪfɪkəlt/; /hɑːrd/', 'The final question was difficult.', 'Pertanyaan terakhir itu sulit.'],
  ['Mudah', 'easy', 'adjective', '/ˈiːzi/', 'This guide makes the process easy.', 'Panduan ini membuat prosesnya mudah.'],
]);

addCategory('adverbs', [
  ['Selalu', 'always', 'adverb', '/ˈɔːlweɪz/', 'She always checks her work.', 'Dia selalu memeriksa pekerjaannya.'],
  ['Sering', 'often', 'adverb', '/ˈɔːfən/', 'We often visit our grandparents.', 'Kami sering mengunjungi kakek dan nenek.'],
  ['Terkadang', 'sometimes', 'adverb', '/ˈsʌmtaɪmz/', 'Sometimes I walk to work.', 'Terkadang saya berjalan kaki ke tempat kerja.'],
  ['Jarang', 'rarely', 'adverb', '/ˈrɛrli/', 'He rarely watches television.', 'Dia jarang menonton televisi.'],
  ['Sangat', 'very', 'adverb', '/ˈvɛri/', 'The instructions are very clear.', 'Petunjuknya sangat jelas.'],
  ['Cukup', 'quite / enough', 'adverb', '/kwaɪt/; /ɪˈnʌf/', 'The room is quite warm.', 'Ruangan itu cukup hangat.', '“Quite” means fairly; “enough” means as much as needed.'],
  ['Hampir', 'almost', 'adverb', '/ˈɔːlmoʊst/', 'The train is almost here.', 'Kereta itu hampir tiba.'],
  ['Segera', 'soon / immediately', 'adverb', '/suːn/; /ɪˈmiːdiətli/', 'Please reply as soon as possible.', 'Tolong balas sesegera mungkin.', '“Immediately” means without delay; “soon” means in a short time.'],
]);

addCategory('connectors', [
  ['Dan', 'and', 'conjunction', '/ænd/', 'Rina and Budi are classmates.', 'Rina dan Budi adalah teman sekelas.'],
  ['Atau', 'or', 'conjunction', '/ɔːr/', 'Would you like tea or coffee?', 'Apakah Anda ingin teh atau kopi?'],
  ['Tetapi', 'but', 'conjunction', '/bʌt/', 'The task is difficult, but we can finish it.', 'Tugas itu sulit, tetapi kita bisa menyelesaikannya.'],
  ['Karena', 'because', 'conjunction', '/bɪˈkɔːz/', 'We stayed inside because it was raining.', 'Kami tetap di dalam karena hujan.'],
  ['Meskipun', 'although / even though', 'conjunction', '/ɔːlˈðoʊ/; /ˈiːvən ðoʊ/', 'Although it was late, she kept studying.', 'Meskipun sudah larut, dia terus belajar.'],
  ['Di', 'in / at / on', 'preposition', '/ɪn/; /æt/; /ɑːn/', 'The keys are on the table.', 'Kunci-kuncinya ada di atas meja.', 'Choose the preposition by context: “in” an area, “at” a point, “on” a surface.'],
  ['Ke', 'to', 'preposition', '/tuː/', 'They walked to the station.', 'Mereka berjalan ke stasiun.'],
  ['Dari', 'from', 'preposition', '/frʌm/', 'This message is from my teacher.', 'Pesan ini dari guru saya.'],
  ['Untuk', 'for', 'preposition', '/fɔːr/', 'This book is for beginners.', 'Buku ini untuk pemula.'],
  ['Dengan', 'with', 'preposition', '/wɪð/', 'She went with her sister.', 'Dia pergi dengan saudara perempuannya.'],
]);

addCategory('daily-life', [
  ['Bangun tidur', 'wake up', 'verb phrase', '/weɪk ʌp/', 'I wake up at six on weekdays.', 'Saya bangun pukul enam pada hari kerja.'],
  ['Mandi', 'take a bath / shower', 'verb phrase', '/teɪk ə bæθ/; /ˈʃaʊər/', 'He takes a shower after exercise.', 'Dia mandi setelah berolahraga.'],
  ['Makan', 'eat', 'verb', '/iːt/', 'We eat dinner together.', 'Kami makan malam bersama.'],
  ['Belajar', 'study / learn', 'verb', '/ˈstʌdi/; /lɜːrn/', 'I study English every evening.', 'Saya belajar bahasa Inggris setiap sore.', '“Study” focuses on deliberate practice; “learn” on gaining knowledge or skill.'],
  ['Bekerja', 'work', 'verb', '/wɜːrk/', 'They work from home on Fridays.', 'Mereka bekerja dari rumah setiap Jumat.'],
  ['Berjalan', 'walk', 'verb', '/wɔːk/', 'We walk to the nearby shop.', 'Kami berjalan ke toko yang dekat.'],
  ['Berlari', 'run', 'verb', '/rʌn/', 'She runs in the park every morning.', 'Dia berlari di taman setiap pagi.'],
  ['Membaca', 'read', 'verb', '/riːd/', 'Please read the first paragraph.', 'Silakan baca paragraf pertama.'],
  ['Menulis', 'write', 'verb', '/raɪt/', 'Write your answer in a complete sentence.', 'Tuliskan jawabanmu dalam kalimat lengkap.'],
  ['Beristirahat', 'rest', 'verb/noun', '/rɛst/', 'You should rest after a long journey.', 'Kamu sebaiknya beristirahat setelah perjalanan panjang.'],
]);

addCategory('society', [
  ['Hukum', 'law', 'noun', '/lɔː/', 'The law protects people’s rights.', 'Hukum melindungi hak-hak masyarakat.'],
  ['Hak', 'right', 'noun', '/raɪt/', 'Everyone has the right to education.', 'Setiap orang memiliki hak atas pendidikan.', '“Right” also means correct or the opposite of left.'],
  ['Kewajiban', 'duty / obligation', 'noun', '/ˈduːti/; /ˌɑːblɪˈɡeɪʃən/', 'It is our duty to follow the safety rules.', 'Sudah menjadi kewajiban kita untuk mengikuti aturan keselamatan.'],
  ['Aturan', 'rule / regulation', 'noun', '/ruːl/; /ˌrɛɡjəˈleɪʃən/', 'Please read the rules before you begin.', 'Silakan baca aturan sebelum memulai.'],
  ['Pemerintah', 'government', 'noun', '/ˈɡʌvərnmənt/', 'The government announced a new policy.', 'Pemerintah mengumumkan kebijakan baru.'],
  ['Masyarakat', 'society / community', 'noun', '/səˈsaɪəti/; /kəˈmjuːnəti/', 'The project benefits the local community.', 'Proyek itu bermanfaat bagi masyarakat setempat.'],
  ['Keadilan', 'justice', 'noun', '/ˈdʒʌstɪs/', 'The court seeks justice for everyone.', 'Pengadilan mengupayakan keadilan bagi semua orang.'],
  ['Kebijakan', 'policy', 'noun', '/ˈpɑːləsi/', 'The school updated its attendance policy.', 'Sekolah memperbarui kebijakan kehadirannya.'],
]);

addCategory('life-terms', [
  ['Kebutuhan', 'need / necessity', 'noun', '/niːd/; /nəˈsɛsəti/', 'Clean water is a basic need.', 'Air bersih adalah kebutuhan dasar.'],
  ['Keinginan', 'desire / want', 'noun', '/dɪˈzaɪər/; /wɑːnt/', 'Her desire to learn is strong.', 'Keinginannya untuk belajar sangat kuat.'],
  ['Tujuan', 'goal / purpose', 'noun', '/ɡoʊl/; /ˈpɜːrpəs/', 'Our goal is to reduce waste.', 'Tujuan kami adalah mengurangi sampah.'],
  ['Harapan', 'hope', 'noun/verb', '/hoʊp/', 'We hope for a peaceful future.', 'Kami berharap akan masa depan yang damai.'],
  ['Keberhasilan', 'success', 'noun', '/səkˈsɛs/', 'Preparation contributed to their success.', 'Persiapan berkontribusi pada keberhasilan mereka.'],
  ['Kegagalan', 'failure', 'noun', '/ˈfeɪljər/', 'Failure can teach us valuable lessons.', 'Kegagalan dapat mengajarkan pelajaran berharga.'],
  ['Perubahan', 'change', 'noun/verb', '/tʃeɪndʒ/', 'Small changes can make a big difference.', 'Perubahan kecil dapat membawa perbedaan besar.'],
  ['Kesempatan', 'opportunity', 'noun', '/ˌɑːpərˈtuːnəti/', 'This is a great opportunity to learn.', 'Ini adalah kesempatan yang bagus untuk belajar.'],
  ['Tantangan', 'challenge', 'noun/verb', '/ˈtʃælɪndʒ/', 'Learning a new language is a challenge.', 'Belajar bahasa baru adalah sebuah tantangan.'],
  ['Solusi', 'solution', 'noun', '/səˈluːʃən/', 'The team found a practical solution.', 'Tim itu menemukan solusi yang praktis.'],
]);

addCategory('measurements', [
  ['Panjang', 'length', 'noun', '/lɛŋθ/', 'Measure the length of the table.', 'Ukur panjang meja itu.'],
  ['Lebar', 'width', 'noun', '/wɪdθ/', 'The width of the road is six meters.', 'Lebar jalan itu enam meter.'],
  ['Tinggi', 'height', 'noun', '/haɪt/', 'What is the height of the building?', 'Berapa tinggi gedung itu?'],
  ['Berat', 'weight', 'noun', '/weɪt/', 'Check the weight of your luggage.', 'Periksa berat bagasimu.'],
  ['Volume', 'volume', 'noun', '/ˈvɑːljuːm/', 'The bottle has a volume of one liter.', 'Botol itu memiliki volume satu liter.'],
  ['Meter', 'meter', 'noun', '/ˈmiːtər/', 'The room is four meters wide.', 'Ruangan itu lebarnya empat meter.'],
  ['Kilometer', 'kilometer', 'noun', '/kɪˈlɑːmɪtər/', 'The village is ten kilometers away.', 'Desa itu berjarak sepuluh kilometer.'],
  ['Gram', 'gram', 'noun', '/ɡræm/', 'Add one hundred grams of flour.', 'Tambahkan seratus gram tepung.'],
  ['Kilogram', 'kilogram', 'noun', '/ˈkɪləˌɡræm/', 'The parcel weighs two kilograms.', 'Paket itu beratnya dua kilogram.'],
  ['Liter', 'liter', 'noun', '/ˈliːtər/', 'We need a liter of water.', 'Kita membutuhkan satu liter air.'],
  ['Suhu', 'temperature', 'noun', '/ˈtɛmprətʃər/', 'The temperature dropped overnight.', 'Suhu turun sepanjang malam.'],
  ['Kecepatan', 'speed', 'noun', '/spiːd/', 'The speed limit is fifty kilometers per hour.', 'Batas kecepatannya lima puluh kilometer per jam.'],
  ['Luas', 'area', 'noun', '/ˈɛriə/', 'Calculate the area of the garden.', 'Hitung luas taman itu.'],
  ['Jarak', 'distance', 'noun', '/ˈdɪstəns/', 'The distance to the station is two kilometers.', 'Jarak ke stasiun adalah dua kilometer.'],
]);

const smallEnglish = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tensEnglish = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const smallIndonesian = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
const ipaByNumberWord = {
  zero: 'ˈzɪəroʊ', one: 'wʌn', two: 'tuː', three: 'θriː', four: 'fɔːr', five: 'faɪv',
  six: 'sɪks', seven: 'ˈsɛvən', eight: 'eɪt', nine: 'naɪn', ten: 'tɛn', eleven: 'ɪˈlɛvən',
  twelve: 'twɛlv', thirteen: 'ˌθɜːrˈtiːn', fourteen: 'ˌfɔːrˈtiːn', fifteen: 'ˌfɪfˈtiːn',
  sixteen: 'ˌsɪksˈtiːn', seventeen: 'ˌsɛvənˈtiːn', eighteen: 'ˌeɪˈtiːn', nineteen: 'ˌnaɪnˈtiːn',
  twenty: 'ˈtwɛnti', thirty: 'ˈθɜːrti', forty: 'ˈfɔːrti', fifty: 'ˈfɪfti',
  sixty: 'ˈsɪksti', seventy: 'ˈsɛvənti', eighty: 'ˈeɪti', ninety: 'ˈnaɪnti',
  hundred: 'ˈhʌndrəd', thousand: 'ˈθaʊzənd', million: 'ˈmɪljən', billion: 'ˈbɪljən',
  and: 'ænd',
};
const ipaByOrdinalWord = {
  zeroth: 'ˈzɪəroʊθ', first: 'fɜːrst', second: 'ˈsɛkənd', third: 'θɜːrd',
  fourth: 'fɔːrθ', fifth: 'fɪfθ', sixth: 'sɪksθ', seventh: 'ˈsɛvənθ',
  eighth: 'eɪtθ', ninth: 'naɪnθ', tenth: 'tɛnθ', eleventh: 'ɪˈlɛvənθ',
  twelfth: 'twɛlfθ', thirteenth: 'ˌθɜːrˈtiːnθ', fourteenth: 'ˌfɔːrˈtiːnθ',
  fifteenth: 'ˌfɪfˈtiːnθ', sixteenth: 'ˌsɪksˈtiːnθ', seventeenth: 'ˌsɛvənˈtiːnθ',
  eighteenth: 'ˌeɪˈtiːnθ', nineteenth: 'ˌnaɪnˈtiːnθ', twentieth: 'ˈtwɛntiəθ',
  thirtieth: 'ˈθɜːrtiəθ', fortieth: 'ˈfɔːrtiəθ', fiftieth: 'ˈfɪftiəθ',
  sixtieth: 'ˈsɪkstiəθ', seventieth: 'ˈsɛvəntiəθ', eightieth: 'ˈeɪtiəθ',
  ninetieth: 'ˈnaɪntiəθ', hundredth: 'ˈhʌndrədθ', thousandth: 'ˈθaʊzəndθ',
};

const englishCardinal = (value) => {
  if (value < 20) return smallEnglish[value];
  if (value < 100) {
    const remainder = value % 10;
    return `${tensEnglish[Math.floor(value / 10)]}${remainder ? `-${smallEnglish[remainder]}` : ''}`;
  }
  if (value < 1000) {
    const remainder = value % 100;
    return `${smallEnglish[Math.floor(value / 100)]} hundred${remainder ? ` and ${englishCardinal(remainder)}` : ''}`;
  }
  const scales = [[1_000_000_000, 'billion'], [1_000_000, 'million'], [1000, 'thousand']];
  for (const [scale, word] of scales) {
    if (value >= scale) {
      const quotient = Math.floor(value / scale);
      const remainder = value % scale;
      return `${englishCardinal(quotient)} ${word}${remainder ? ` ${remainder < 100 ? 'and ' : ''}${englishCardinal(remainder)}` : ''}`;
    }
  }
  return englishCardinal(value);
};

const indonesianCardinal = (value) => {
  if (value < 12) return smallIndonesian[value];
  if (value < 20) return `${indonesianCardinal(value - 10)} belas`;
  if (value < 100) {
    const remainder = value % 10;
    return `${indonesianCardinal(Math.floor(value / 10))} puluh${remainder ? ` ${indonesianCardinal(remainder)}` : ''}`;
  }
  if (value < 200) return `seratus${value > 100 ? ` ${indonesianCardinal(value - 100)}` : ''}`;
  if (value < 1000) {
    const remainder = value % 100;
    return `${indonesianCardinal(Math.floor(value / 100))} ratus${remainder ? ` ${indonesianCardinal(remainder)}` : ''}`;
  }
  if (value < 2000) return `seribu${value > 1000 ? ` ${indonesianCardinal(value - 1000)}` : ''}`;
  const scales = [[1_000_000_000, 'miliar'], [1_000_000, 'juta'], [1000, 'ribu']];
  for (const [scale, word] of scales) {
    if (value >= scale) {
      const quotient = Math.floor(value / scale);
      const remainder = value % scale;
      return `${indonesianCardinal(quotient)} ${word}${remainder ? ` ${indonesianCardinal(remainder)}` : ''}`;
    }
  }
  return indonesianCardinal(value);
};

const ordinalEnglish = (value) => {
  const special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  const ordinalTens = { 20: 'twentieth', 30: 'thirtieth', 40: 'fortieth', 50: 'fiftieth', 60: 'sixtieth', 70: 'seventieth', 80: 'eightieth', 90: 'ninetieth' };
  if (value < 20) return special[value];
  if (value < 100) {
    const remainder = value % 10;
    return remainder ? `${tensEnglish[Math.floor(value / 10)]}-${special[remainder]}` : ordinalTens[value];
  }
  if (value === 1000) return 'one thousandth';
  if (value % 1000 === 0) return `${englishCardinal(value / 1000)} thousandth`;
  if (value % 100 === 0) return `${englishCardinal(value / 100)} hundredth`;
  const hundred = Math.floor(value / 100) * 100;
  return `${englishCardinal(hundred)} and ${ordinalEnglish(value % 100)}`;
};

const pronunciationForNumber = (english) => {
  const ipa = english
    .replace(/-/g, ' ')
    .split(/\s+/)
    .map((word) => ipaByNumberWord[word])
    .filter(Boolean);
  return ipa.length ? `/${ipa.join(' ')}/` : '/ˈnʌmbər/';
};

const pronunciationForOrdinal = (english) => {
  const ipa = english
    .replace(/-/g, ' ')
    .split(/\s+/)
    .map((word) => ipaByOrdinalWord[word] || ipaByNumberWord[word])
    .filter(Boolean);
  return ipa.length ? `/${ipa.join(' ')}/` : '/ˈnʌmbər/';
};

const createCardinalEntry = (value) => {
  const english = englishCardinal(value);
  const indonesian = indonesianCardinal(value);
  return {
    id: `number-cardinal-${value}`,
    indonesian,
    english,
    partOfSpeech: 'cardinal number',
    pronunciationIPA: pronunciationForNumber(english),
    exampleEnglish: `The result is ${english}.`,
    exampleIndonesian: `Hasilnya adalah ${indonesian}.`,
    usageNote: 'Use cardinal numbers to count quantities or state a number.',
    categoryId: 'numbers',
    source: 'generated',
  };
};

const createOrdinalEntry = (value) => {
  const english = ordinalEnglish(value);
  const indonesian = value === 1 ? 'pertama' : value === 2 ? 'kedua' : value === 3 ? 'ketiga' : `ke-${value}`;
  return {
    id: `number-ordinal-${value}`,
    indonesian,
    english,
    partOfSpeech: 'ordinal number',
    pronunciationIPA: pronunciationForOrdinal(english),
    exampleEnglish: `She finished in ${english} place.`,
    exampleIndonesian: `Dia menyelesaikan perlombaan di urutan ${indonesian}.`,
    usageNote: 'Use ordinal numbers for order, dates, floors, and positions.',
    categoryId: 'numbers',
    source: 'generated',
  };
};

const numberEntries = [
  ...Array.from({ length: 1001 }, (_, value) => createCardinalEntry(value)),
  ...Array.from({ length: 100 }, (_, index) => createOrdinalEntry(index + 1)),
];

export const COMPREHENSIVE_DICTIONARY_ENTRIES = [
  ...curatedEntries,
  ...numberEntries,
];

export const createNumberSearchEntry = (value) => {
  if (!Number.isSafeInteger(value) || value < 0 || value > 999_999_999_999) return null;
  return createCardinalEntry(value);
};
