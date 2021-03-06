import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

/**
 * 모델 메소드
 *
 * 1. 인스턴스 메서드 : 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수를 의미
 * 2. 스태틱 메서드 : 모델에서 바로 사용할 수 있는 함수를 의미
 */

// 인스턴스 메서드
// -> 화살표 함수가 아닌 function 키워드를 사용하여 구현해야한다.
//      -> 함수 내부에서 this에 접근해야하기 때문이다. (this는 문서 인스턴스를 가리킨다.)
//      -> 화살표 함수를 사용하면 this는 문서 인스턴스를 가리키지 못하게 된다.
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

/**
 * @brief   hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환한 후 delete를 통해 해당 필드를 지워줌
 * @returns json data
 */
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: '7d', // 3일 동안 유효함
    },
  );
  return token;
};

// 스태틱 메서드
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
