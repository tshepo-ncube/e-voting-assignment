class User {
  constructor(id, name, surname, age, password, email, gender, province) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._age = age;
    this._password = password;
    this._email = email;
    this._gender = gender;
    this._province = province;
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

  // Getter and setter for age
  get age() {
    return this._age;
  }

  set age(newAge) {
    this._age = newAge;
  }

  // Getter and setter for password
  get password() {
    return this._password;
  }

  set password(newPassword) {
    this._password = newPassword;
  }

  // Getter and setter for email
  get email() {
    return this._email;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  // Getter and setter for gender
  get gender() {
    return this._gender;
  }

  set gender(newGender) {
    this._gender = newGender;
  }

  // Getter and setter for province
  get province() {
    return this._province;
  }

  set province(newProvince) {
    this._province = newProvince;
  }
}

// Example usage:
const user = new User(
  1,
  "John",
  "Doe",
  30,
  "password123",
  "john.doe@example.com",
  "male",
  "California"
);
console.log(user.name); // Output: John
user.name = "Jane";
console.log(user.name); // Output: Jane
