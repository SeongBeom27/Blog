import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

// 스키마 생성
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

// 모델 생성

// 다음처럼 스키마이름을 Post로 설정하면 실제 데이터베이스에서 만드는 컬렉션 이름은 posts가 됟다.
//  -> BookInfo로하면 bookinfos가 된다
const Post = mongoose.model('Post', PostSchema);
export default Post;
