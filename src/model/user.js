import Person from "./person";

export default class User extends Person {
  constructor(
    id,
    name,
    surname,
    age,
    password,
    email,
    gender,
    province,
    voted
  ) {
    // this._id = id;
    // this._name = name;
    // this._surname = surname;
    // this._age = age;

    super(id, name, surname, age);
    this._password = password;
    this._email = email;
    this._gender = gender;
    this._province = province;
    this.voted = voted;
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

  toUserObject() {
    return {
      Name: this.name,
      Surname: this.surname,
      Age: this.age,
      Province: this.province,
      Gender: this.gender,
      Email: this.email,
      Password: this.password,
      Voted: this.voted,
    };
  }
}

// // Example usage:
// const user = new User(
//   1,
//   "John",
//   "Doe",
//   30,
//   "password123",
//   "john.doe@example.com",
//   "male",
//   "California"
// );
// console.log(user.name); // Output: John
// user.name = "Jane";
// console.log(user.name); // Output: Jane
