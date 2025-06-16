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

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const db = getFirestore(aplikasi)

// Collection reference
const absensiCollection = collection(db, "absensi");

// Function to get all attendance records
export async function ambilDaftarAbsensi() {
  try {
    const q = query(absensiCollection, orderBy("tanggal", "desc"), orderBy("nama"));
    const querySnapshot = await getDocs(q);
    
    const attendanceList = [];
    querySnapshot.forEach((doc) => {
      attendanceList.push({
        id: doc.id,
        tanggal: doc.data().tanggal,
        nis: doc.data().nis,
        nama: doc.data().nama,
        alamat: doc.data().alamat,
        notlpn: doc.data().notlpn,
        kelas: doc.data().kelas,
        keterangan: doc.data().keterangan
      });
    });
    
    return attendanceList;
  } catch (error) {
    console.error("Error getting attendance data: ", error);
    return [];
  }
}

// Function to get single attendance record by ID
export async function ambilAbsensiById(id) {
  try {
    const docRef = doc(db, "absensi", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting attendance record: ", error);
    return null;
  }
}

// Function to add new attendance record
export async function tambahAbsensi(data) {
  try {
    const docRef = await addDoc(absensiCollection, {
      tanggal: data.tanggal,
      nis: data.nis,
      nama: data.nama,
      alamat: data.alamat,
      notlpn: data.notlpn,
      kelas: data.kelas,
      keterangan: data.keterangan,
      createdAt: new Date().toISOString()
    });
    
    console.log("Attendance record added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding attendance record: ", error);
    throw error;
  }
}

// Function to update attendance record
export async function ubahAbsensi(data) {
  try {
    const docRef = doc(db, "absensi", data.id);
    await updateDoc(docRef, {
      tanggal: data.tanggal,
      nis: data.nis,
      nama: data.nama,
      alamat: data.alamat,
      notlpn: data.notlpn,
      kelas: data.kelas,
      keterangan: data.keterangan,
      updatedAt: new Date().toISOString()
    });
    
    console.log("Attendance record updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating attendance record: ", error);
    throw error;
  }
}

// Function to delete attendance record
export async function hapusAbsensi(id) {
  try {
    await deleteDoc(doc(db, "absensi", id));
    console.log("Attendance record deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting attendance record: ", error);
    throw error;
  }
}

// Additional functions for reporting/statistics
export async function getAttendanceByDateRange(startDate, endDate) {
  try {
    const q = query(
      absensiCollection,
      where("tanggal", ">=", startDate),
      where("tanggal", "<=", endDate),
      orderBy("tanggal")
    );
    
    const querySnapshot = await getDocs(q);
    const attendanceList = [];
    
    querySnapshot.forEach((doc) => {
      attendanceList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return attendanceList;
  } catch (error) {
    console.error("Error getting attendance by date range: ", error);
    return [];
  }
}

export async function getAttendanceByStatus(status) {
  try {
    const q = query(
      absensiCollection,
      where("keterangan", "==", status),
      orderBy("tanggal", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const attendanceList = [];
    
    querySnapshot.forEach((doc) => {
      attendanceList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return attendanceList;
  } catch (error) {
    console.error("Error getting attendance by status: ", error);
    return [];
  }
}