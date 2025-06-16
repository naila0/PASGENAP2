import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCgSS-chZUH5T47nhRNeK6jYDnGZK_TQSA",
  authDomain: "insan-cemerlang-d6eb1.firebaseapp.com",
  projectId: "insan-cemerlang-d6eb1",
  storageBucket: "insan-cemerlang-d6eb1.appspot.com",
  messagingSenderId: "162904381844",
  appId: "1:162904381844:web:dd88782fdcc494c9ac1781",
  measurementId: "G-1RSX6TCWZ2"
};

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(basisdata, "absensi");
  const kueri = query(refDokumen, orderBy("absensi"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      tanggal: dokumen.data().tanggal,
      nis: dokumen.data().nis, 
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notlpon: dokumen.data().notlpon,
      kelas: dokumen.data().kelas,
      keterangan: dokumen.data().keterangan
      
    })
  })
  
  return hasilKueri;
}

const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

export async function tambahAbsensi(tanggal, nis, nama, alamat, notlpon, kelas, keterangan) {
  try {
    // menyimpan data ke firebase
    const refDokumen =await addDoc(collection(basisdata,"absensi"), {
      tanggal: tamggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      notlpon: notlpon,
      kelas: kelas,
      keterangan: keterangan 
    })
    
    //menampilkan pesan hasil 
    console.log("berhasil menyimpan data inventory")
  } catch (error) {
    //menampilkan pesan gagal
    console.log("gagal menyimpan data inventory")
  }
}

export async function hapusAbsensi(id) {
  await deleteDoc(doc(basisdata, "Absensi", id))
}

export async function ubahAbsensi(id, itembaru, jumlahbaru, hargabaru) {
  await updateDoc(
    doc(basisdata, "Absensi", id),
    {tanggal: tanggalbaru, nis: nisbaru, nama: namabaru, alamat: alamatbaru, notlpon: notlponbaru, kelas: kelasbaru, keterangan: keteranganbaru}
    )
}
export async function ambilAbsensi(id) {
  const refDokumen = await doc(basisdata, "Absensi", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}