class Candidate {
  constructor(id, name, surname, votes, manifesto, about) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._votes = votes;
    this._manifesto = manifesto;
    this.about = about;
  }

  // Getter method for id
  get id() {
    return this._id;
  }

  // Setter method for id
  set id(newId) {
    this._id = newId;
  }

  // Getter method for name
  get name() {
    return this._name;
  }

  // Setter method for name
  set name(newName) {
    this._name = newName;
  }

  // Getter method for surname
  get surname() {
    return this._surname;
  }

  // Setter method for surname
  set surname(newSurname) {
    this._surname = newSurname;
  }

  // Getter method for votes
  get votes() {
    return this._votes;
  }

  // Setter method for votes
  set votes(newVotes) {
    this._votes = newVotes;
  }

  // Getter method for manifesto
  get manifesto() {
    return this._manifesto;
  }

  // Setter method for manifesto
  set manifesto(newManifesto) {
    this._manifesto = newManifesto;
  }
}

// Example usage:
const candidate = new Candidate(
  1,
  "John",
  "Doe",
  1000,
  "I promise to improve education."
);
console.log(candidate.name); // Output: John
candidate.name = "Jane";
console.log(candidate.name); // Output: Jane
