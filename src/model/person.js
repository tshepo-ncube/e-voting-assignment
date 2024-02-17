class Person {
  constructor(id, name, surname, age, password, email, gender, province) {
    this._id = id;
    this._name = name;
    this._surname = surname;
  }

  // Getter and setter for id
  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  // Getter and setter for name
  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  // Getter and setter for surname
  get surname() {
    return this._surname;
  }

  set surname(newSurname) {
    this._surname = newSurname;
  }
}
