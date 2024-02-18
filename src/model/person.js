export default class Person {
  constructor(id, name, surname, age) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._age = age;
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

  // Getter and setter for surname
  get age() {
    return this._surname;
  }

  set age(newSurname) {
    this._surname = newSurname;
  }
}
