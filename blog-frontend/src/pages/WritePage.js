import React from 'react';
import Responsive from '../components/common/Responsive';
import Editor from '../components/write/Editor';
import TagBox from '../components/write/TagBox';

const WritePage = () => {
  return (
    <Responsive>
      <Editor></Editor>
      <TagBox></TagBox>
    </Responsive>
  );
};

export default WritePage;
