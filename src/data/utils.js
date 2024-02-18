// import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

// import { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";

// import DB from "./dataApi";

// const getProvinces = () => {
//   const [provinceData, setProvinceData] = useState({
//     "Eastern Cape": {},
//     "Free State": {},
//     Gauteng: {},
//     "KwaZulu-Natal": {},
//     Limpopo: {},
//     Mpumalanga: {},
//     "North West": {},
//     "Northern Cape": {},
//     "Western Cape": {},
//   });

//   useEffect(() => {
//     const fetchProvincesData = async () => {
//       const db = getFirestore(initializeApp(DB.firebaseConfig));

//       const getProvinceData = async (provinceName) => {
//         const provincialResultsCollection = collection(db, "provincialResults");
//         const provinceDocRef = doc(provincialResultsCollection, provinceName);

//         const provinceDoc = await getDoc(provinceDocRef);
//         if (provinceDoc.exists()) {
//           const candidateData = provinceDoc.data();
//           const sortedCandidateData = Object.fromEntries(
//             Object.entries(candidateData).sort((a, b) => b[1] - a[1])
//           );
//           setProvinceData((prevState) => ({
//             ...prevState,
//             [provinceName]: sortedCandidateData,
//           }));
//         } else {
//           console.log(`Document not found for ${provinceName}.`);
//         }
//       };

//       for (const provinceName of Object.keys(provinceData)) {
//         await getProvinceData(provinceName);
//       }
//     };

//     fetchProvincesData();
//   }, []);

//   return provinceData;
// };

// export default getProvinces;
