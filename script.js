/**
 * Script Pemrograman Web - Coding Academy
 * Fungsi: Navigasi Halaman, Validasi Form, Dialog Confirm, & Tampilan Hasil
 */

// 1. Fungsi untuk berpindah antara 2 tampilan (Galeri & Pendaftaran)
function pindahHalaman(namaHalaman) {
  // Ambil elemen section tampilan
  var halGaleri = document.getElementById('halaman-galeri');
  var halDaftar = document.getElementById('halaman-pendaftaran');

  // Ambil tombol navigasi
  var btnGaleri = document.getElementById('btn-nav-galeri');
  var btnDaftar = document.getElementById('btn-nav-daftar');

  if (namaHalaman === 'galeri') {
    // Tampilkan galeri, sembunyikan pendaftaran
    halGaleri.classList.add('active');
    halDaftar.classList.remove('active');

    btnGaleri.classList.add('active');
    btnDaftar.classList.remove('active');
  } else if (namaHalaman === 'pendaftaran') {
    // Tampilkan pendaftaran, sembunyikan galeri
    halDaftar.classList.add('active');
    halGaleri.classList.remove('active');

    btnDaftar.classList.add('active');
    btnGaleri.classList.remove('active');
  }

  // Gulir ke atas konten dengan halus
  window.scrollTo({
    top: 180,
    behavior: 'smooth'
  });
}

// 2. Fungsi memproses data saat tombol submit ditekan
function prosesPendaftaran(event) {
  // Mencegah halaman reload otomatis saat form disubmit
  event.preventDefault();

  // Validasi NIK (harus 16 digit angka)
  var nikInput = document.getElementById('nik').value.trim();
  if (nikInput.length !== 16 || isNaN(nikInput)) {
    alert("Peringatan: NIK harus terdiri dari tepat 16 digit angka!");
    document.getElementById('nik').focus();
    return;
  }

  // Ambil pilihan bahasa pemrograman yang dicentang
  var checkboxBahasa = document.querySelectorAll('input[name="bahasa"]:checked');
  var errorBahasa = document.getElementById('error-bahasa');

  // Validasi minimal 1 bahasa pemrograman harus dipilih
  if (checkboxBahasa.length === 0) {
    errorBahasa.style.display = 'block';
    alert("Peringatan: Harap pilih minimal satu bahasa pemrograman yang diminati!");
    return;
  } else {
    errorBahasa.style.display = 'none';
  }

  // Tampilkan Dialog Konfirmasi Custom ("apakah anda sudah yakin?")
  bukaModalKonfirmasi();
}

// 3. Fungsi membuka popup modal konfirmasi custom
function bukaModalKonfirmasi() {
  var modal = document.getElementById('modalKonfirmasi');
  if (modal) {
    modal.style.display = 'flex';
  }
}

// 4. Fungsi menutup popup modal konfirmasi jika user memilih "Batal"
function tutupModalKonfirmasi() {
  var modal = document.getElementById('modalKonfirmasi');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 5. Fungsi saat user memilih "Ya" pada modal konfirmasi
function konfirmasiYa() {
  // Tutup modal terlebih dahulu
  tutupModalKonfirmasi();

  // Ambil semua isian dari form
  var nikInput = document.getElementById('nik').value.trim();
  var namaInput = document.getElementById('namaLengkap').value.trim();
  var genderInput = document.querySelector('input[name="jenisKelamin"]:checked').value;
  var noHpInput = document.getElementById('noHp').value.trim();
  var alamatInput = document.getElementById('alamat').value.trim();

  // Ambil bahasa pemrograman yang dipilih
  var checkboxBahasa = document.querySelectorAll('input[name="bahasa"]:checked');
  var daftarBahasa = [];
  checkboxBahasa.forEach(function (item) {
    daftarBahasa.push(item.value);
  });

  // Tampilkan hasilnya sesuai isian pada form ke dalam tabel hasil
  document.getElementById('hasilNik').textContent = nikInput;
  document.getElementById('hasilNama').textContent = namaInput;
  document.getElementById('hasilGender').textContent = genderInput;
  document.getElementById('hasilHp').textContent = noHpInput;
  document.getElementById('hasilAlamat').textContent = alamatInput;
  document.getElementById('hasilBahasa').textContent = daftarBahasa.join(', ');

  // Catat waktu penyimpanan data
  var sekarang = new Date();
  var opsiWaktu = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  document.getElementById('hasilWaktu').textContent = sekarang.toLocaleDateString('id-ID', opsiWaktu) + ' WIB';

  // Munculkan area hasil pendaftaran
  var areaHasil = document.getElementById('areaHasilPendaftaran');
  areaHasil.style.display = 'block';

  // Scroll otomatis ke area hasil agar langsung terlihat oleh user
  areaHasil.scrollIntoView({ behavior: 'smooth' });
}

// 3. Fungsi untuk mendaftar lagi (reset form & sembunyikan hasil)
function daftarBaru() {
  var form = document.getElementById('formPendaftaran');
  form.reset();

  var areaHasil = document.getElementById('areaHasilPendaftaran');
  areaHasil.style.display = 'none';

  window.scrollTo({
    top: 220,
    behavior: 'smooth'
  });
}

// Hilangkan pesan error bahasa saat user mulai mencentang checkbox
document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = document.querySelectorAll('input[name="bahasa"]');
  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var errorBahasa = document.getElementById('error-bahasa');
      if (document.querySelectorAll('input[name="bahasa"]:checked').length > 0) {
        errorBahasa.style.display = 'none';
      }
    });
  });

  // Tutup modal jika klik di area backdrop hitam
  var modal = document.getElementById('modalKonfirmasi');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        tutupModalKonfirmasi();
      }
    });
  }

  // Tutup modal jika menekan tombol Escape di keyboard
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      tutupModalKonfirmasi();
    }
  });
});

