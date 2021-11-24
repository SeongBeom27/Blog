import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtons from '../components/write/WriteActionButton';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer></EditorContainer>
      <TagBoxContainer></TagBoxContainer>
      <WriteActionButtons></WriteActionButtons>
    </Responsive>
  );
};

export default WritePage;
