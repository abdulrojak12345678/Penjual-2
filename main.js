import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcym1i4oAyM2rFmBU_Ipa0vcC7Pdz0dws",
  authDomain: "insan-cemerlang-2e18f.firebaseapp.com",
  projectId: "insan-cemerlang-2e18f",
  storageBucket: "insan-cemerlang-2e18f.appspot.com",
  messagingSenderId: "1096016420480",
  appId: "1:1096016420480:web:87611389fc765e7ddbd065",
  measurementId: "G-DW23S2DXCR"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data
export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      gmail: dok.data().gmail,
      noTlpn: dok.data().noTlpn,
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahPenjual(nama, alamat, gmail, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      gmail: gmail,
      noTlpn: noTlpn
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}
//fungsi untuk hapus data
export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}
//fungsi untuk ubah data
export async function ubahPenjual(docId, nama, alamat, gmail, noTlpn) {
  await updateDoc(doc(db, "penjual", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}