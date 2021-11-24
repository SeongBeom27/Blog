import React, { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();

  /**
   * Redux Store에서 title, body 값을 불러와서 Editor 컴포넌트에 전달
   * -> Quill library에서 onChange와 value값을 이용해서 상태를 관리하기 위해서
   */
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  // unMount 시 초기화
  useEffect(() => {
    return () => {
      // 사용자가 WritePage를 벗어날 때 initialize 액션함수를 사용하여 데이터를 초기화하여준다
      // -> 그렇지 않으면 포스트 작성 후 글쓰기 페이지에 돌아왔을 때 글쓰기 페이지에 이전에 작성한 내용이 남는다
      dispatch(initialize());
    };
  }, [dispatch]);
  return (
    <Editor onChangeField={onChangeField} title={title} body={body}></Editor>
  );
};

export default EditorContainer;
