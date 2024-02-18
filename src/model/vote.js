class Vote {
  constructor(candidateID, Name, Surname) {
    this._candidateID = candidateID;
    this._Name = Name;
    this._Surname = Surname;
  }

  // Getter and setter for candidateID
  get candidateID() {
    return this._candidateID;
  }

  set candidateID(newCandidateID) {
    this._candidateID = newCandidateID;
  }

  // Getter and setter for Name
  get Name() {
    return this._Name;
  }

  set Name(newName) {
    this._Name = newName;
  }

  // Getter and setter for Surname
  get Surname() {
    return this._Surname;
  }

  set Surname(newSurname) {
    this._Surname = newSurname;
  }
}
