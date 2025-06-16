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
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah, 
      harga: dokumen.data().harga 
    })
  })
  
  return hasilKueri;
}

const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

export async function tambahInventory(item, jumlah, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen =await addDoc(collection(basisdata,"inventory"), {
      item: item,
      jumlah: jumlah,
      harga: harga
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