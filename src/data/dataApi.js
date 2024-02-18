import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import { useState } from "react";
import { initializeApp } from "firebase/app";

export default class DB {
  static provinceData = {
    "Eastern Cape": {},
    "Free State": {},
    Gauteng: {},
    "KwaZulu-Natal": {},
    Limpopo: {},
    Mpumalanga: {},
    "North West": {},
    "Northern Cape": {},
    "Western Cape": {},
  };
  static candidateMap = {};
  static firebaseConfig = {
    apiKey: "AIzaSyAQApGBO474rvXb0NLeTJjTye5DBUgmHJ0",
    authDomain: "inf4027workshop.firebaseapp.com",
    projectId: "inf4027workshop",
    storageBucket: "inf4027workshop.appspot.com",
    messagingSenderId: "847946574269",
    appId: "1:847946574269:web:d618594c3773bed7814ad4",
    measurementId: "G-BQ911VSE7E",
  };

  static app = initializeApp(DB.firebaseConfig);
  static db = getFirestore(DB.app);

  static async getCandidates() {
    const candidatesCollection = collection(DB.db, "candidates");
    const candidatesSnapshot = await getDocs(candidatesCollection);

    const newCandidatesArray = [];

    candidatesSnapshot.forEach((doc) => {
      const candidateData = doc.data();
      const candidateId = doc.id; // Access the document ID
      newCandidatesArray.push({ id: candidateId, ...candidateData });
      console.log("Candidate data:", candidateData);
      console.log("Candidate ID:", candidateId);

      //setChosenCandidate(candidateId);
    });

    newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
    //setCandidates(newCandidatesArray);

    //setLoading(false);
    return newCandidatesArray;
  }

  static async getCandidatesGraph(
    setCandidates,
    setChosenCandidate,
    setLoading
  ) {
    const candidatesCollection = collection(DB.db, "candidates");
    const candidatesSnapshot = await getDocs(candidatesCollection);

    const newCandidatesArray = [];

    candidatesSnapshot.forEach((doc) => {
      const candidateData = doc.data();
      const candidateId = doc.id; // Access the document ID
      newCandidatesArray.push({ id: candidateId, ...candidateData });
      console.log("Candidate data:", candidateData);
      console.log("Candidate ID:", candidateId);

      setChosenCandidate(candidateId);
    });

    newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
    setCandidates(newCandidatesArray);

    setLoading(false);
    return newCandidatesArray;
  }

  static async getUsers(setUsers, setLoading) {
    // Implementation for getting users
    let users = [];
    const usersCollection = collection(DB.db, "users");
    const candidatesSnapshot = await getDocs(usersCollection);

    const newUsersArray = [];

    candidatesSnapshot.forEach((doc) => {
      const userData = doc.data();
      const userID = doc.id; // Access the document ID
      newUsersArray.push({ id: userID, ...userData });
      console.log("User data:", userData);
      console.log("User ID:", userID);
    });

    //setCandidates(newCandidatesArray);
    setUsers(newUsersArray);
    setLoading(false);
    return newUsersArray;
  }

  static async loginUser(email, password) {
    let user = {};
    try {
      const candidateDocRef = doc(DB.db, "users", email);
      const candidateDocSnapshot = await getDoc(candidateDocRef);

      if (candidateDocSnapshot.exists()) {
        const candidateData = candidateDocSnapshot.data();
        const candidateId = candidateDocSnapshot.id;

        user = { id: candidateId, ...candidateData };

        console.log("Candidate data:", candidateData);
        console.log("Candidate ID:", candidateId);
        console.log(`from db ${candidateData.Email}`);
        console.log(`from db ${candidateData.Password}`);
        // Check if the entered email and password match
        if (
          email === candidateData.Email &&
          password === candidateData.Password
        ) {
          // Successful login logic here
          console.log("Login successful!");

          localStorage.setItem("Email", candidateData.Email);
          localStorage.setItem("Name", candidateData.Name);
          localStorage.setItem("Surname", candidateData.Surname);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("Province", candidateData.Province);
          localStorage.setItem("ID", candidateId);
          localStorage.setItem("Voted", candidateData.Voted);
          localStorage.setItem("Age", candidateData.Age);

          //setError(null); // Clear any previous errors
          //setTab("Vote");
          return { loggedIn: true, Error: "" };
        } else {
          // Display error message for incorrect email/password
          //setError("Invalid email or password");
          console.log("invalid email or pwd");
          return { loggedIn: false, Error: "Invalid email or password" };
        }
      } else {
        console.log("Document not found");
        //setError("User not found");
        return { loggedIn: false, Error: "User does not exist" };
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      //setError("An error occurred during login");
      return { loggedIn: false, Error: "An error occurred during login" };
    }
    // Implementation for login
  }

  static incrementVotesTransaction = async (
    candidate,
    handleVoteClick,
    handleVotedFor,
    incrementProvincialTransaction
  ) =>
    // async function incrementVotesTransaction(candidateId)
    {
      const candidateRef = doc(DB.db, "candidates", candidate.id);

      try {
        // Start a transaction
        await runTransaction(DB.db, async (transaction) => {
          // Get the current data of the document
          const docSnapshot = await transaction.get(candidateRef);

          // Check if the document exists
          if (!docSnapshot.exists()) {
            throw new Error("Candidate document does not exist!");
          }

          // Increment the "Votes" field by 1
          const currentVotes = docSnapshot.data().Votes || 0;
          const newVotes = currentVotes + 1;

          // Update the document with the incremented value
          transaction.update(candidateRef, { Votes: newVotes });
        });

        console.log("Transaction successfully committed!");
        handleVoteClick();
        handleVotedFor();
        DB.incrementProvincialTransaction(
          candidate,
          handleVoteClick,
          handleVotedFor
        );
      } catch (error) {
        console.error("Transaction failed:", error.message);
      }
    };

  static incrementProvincialTransaction = async (
    candidate,
    handleVoteClick,
    handleVotedFor
  ) =>
    // async function incrementVotesTransaction(candidateId)
    {
      const provinceRef = doc(
        DB.db,
        "provincialResults",
        localStorage.getItem("Province")
      );

      try {
        // Start a transaction
        await runTransaction(DB.db, async (transaction) => {
          // Get the current data of the document
          const docSnapshot = await transaction.get(provinceRef);

          // Check if the document exists
          if (!docSnapshot.exists()) {
            throw new Error("Province document does not exist!");
          }

          // Get the current value of the dynamic field
          const dynamicFieldName = candidate.id;
          const currentVotes = docSnapshot.data()[dynamicFieldName] || 0;

          // Increment the value by 1
          const newVotes = currentVotes + 1;

          // Create an object to update the dynamic field
          const updateObject = { [dynamicFieldName]: newVotes };

          // Update the document with the incremented value
          transaction.update(provinceRef, updateObject);
        });

        console.log("Transaction successfully committed!");
        handleVoteClick();
        handleVotedFor();
      } catch (error) {
        console.error("Transaction failed:", error.message);
      }
    };

  static async registerUser(
    name,
    surname,
    age,
    province,
    gender,
    email,
    password,
    setTab,
    setError,
    setLoggedIn,
    handleClick
  ) {
    // Implementation for user registration

    const docRef = doc(DB.db, "users", email);

    // Set the data in the document
    const data = {
      Name: name,
      Surname: surname,
      Age: age,
      Gender: gender,
      Province: province,
      Email: email,
      Password: password,
      Voted: false,
    };

    // Save the document
    await setDoc(docRef, data)
      .then(() => {
        handleClick();
        console.log("Document successfully written!");
        localStorage.setItem("Email", email);
        localStorage.setItem("Name", name);
        localStorage.setItem("Surname", surname);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("Province", province);
        localStorage.setItem("ID", "id");
        localStorage.setItem("Voted", false);
        localStorage.setItem("Age", age);
        setTab("Vote");
        setLoggedIn(true);
        setError(null);
        return { registeredUser: true, Error: "" };
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return { registeredUser: false, Error: error };
      });
  }

  static vote(candidateID) {
    // Implementation for voting
  }

  static Gauteng = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Gauteng");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Gauteng"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };

  static Limpopo = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Limpopo");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Limpopo"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };

  static EC = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Eastern Cape");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Eastern Cape"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };

  static WC = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Western Cape");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Western Cape"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };

  static Mpu = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Mpumalanga");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Mpumalanga"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };
  // static Limpopo = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Limpopo");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Limpopo"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };

  static KZN = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "KwaZulu-Natal");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["KwaZulu-Natal"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };
  // static WesternCape = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Western Cape");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Western Cape"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };

  static NorthWest = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "North West");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["North West"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };
  // static NorthWest = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "North West");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["North West"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };
  // static EasternCape = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Eastern Cape");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Eastern Cape"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };

  static NorthernCape = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Northern Cape");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      //console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Northern Cape"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };
  // static NorthernCape = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Northern Cape");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Northern Cape"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };

  static async getProvinces() {
    try {
      //setLoading(true);
      await DB.EC();
      await DB.NorthWest();
      await DB.NorthernCape();
      await DB.Mpu();
      await DB.FreeState();
      await DB.WC();
      await DB.Limpopo();
      await DB.Gauteng();
      await DB.KZN();
      console.log(DB.provinceData);
      return DB.provinceData;

      // setCandidates(candidatesData);

      // const gautengData = await DB.Gauteng();
      // console.log(gautengData);

      // const LimpopoData = await DB.Gauteng();
      // console.log(LimpopoData);
    } catch (error) {
      console.error("Error fetching Provinces:", error);
    } finally {
      // setLoading(false);
    }
  }

  static FreeState = async () => {
    const provincialResultsCollection = collection(DB.db, "provincialResults");
    const gautengDocRef = doc(provincialResultsCollection, "Free State");

    const gautengDoc = await getDoc(gautengDocRef);

    if (gautengDoc.exists()) {
      const candidateData = gautengDoc.data();
      //console.log("Province Results for Gauteng --------------------");

      // setCandidates([candidateData]);

      // Convert the object into an array of key-value pairs
      const keyValueArray = Object.entries(candidateData);

      // Sort the array based on the values (second element in each pair)
      keyValueArray.sort((a, b) => b[1] - a[1]);

      // Convert the sorted array back into an object
      const sortedObject = Object.fromEntries(keyValueArray);

      console.log(candidateData);

      var provinceTemp = DB.provinceData;
      provinceTemp["Free State"] = sortedObject;

      //setProvinceData(provinceTemp);
      DB.provinceData = provinceTemp;

      //console.log(DB.provinceData);
      //console.log(DB.candidateMap);
      return DB.provinceData;
    } else {
      console.log("Document not found.");
      //setCandidates([]);
    }
  };

  // static FreeState = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Free State");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Free State"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };
  // static mpumalanga = async () => {
  //   const provincialResultsCollection = collection(db, "provincialResults");
  //   const gautengDocRef = doc(provincialResultsCollection, "Mpumalanga");

  //   const gautengDoc = await getDoc(gautengDocRef);

  //   if (gautengDoc.exists()) {
  //     const candidateData = gautengDoc.data();
  //     console.log("Province Results for Gauteng --------------------");

  //     // setCandidates([candidateData]);

  //     // Convert the object into an array of key-value pairs
  //     const keyValueArray = Object.entries(candidateData);

  //     // Sort the array based on the values (second element in each pair)
  //     keyValueArray.sort((a, b) => b[1] - a[1]);

  //     // Convert the sorted array back into an object
  //     const sortedObject = Object.fromEntries(keyValueArray);

  //     console.log(candidateData);

  //     var provinceTemp = provinceData;
  //     provinceTemp["Mpumalanga"] = sortedObject;

  //     setProvinceData(provinceTemp);

  //     console.log(provinceData);
  //     console.log(candidateMap);
  //   } else {
  //     console.log("Document not found.");
  //     //setCandidates([]);
  //   }
  // };
}
