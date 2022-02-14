import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function RichText({ onChange, placeholder }) {
  return (
    <CKEditor
      editor={Editor}
      config={{ placeholder: placeholder }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        //console.log("Editor is ready to use!", editor);
      }}
      onChange={onChange}
      onBlur={(event, editor) => {
        //console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        //console.log("Focus.", editor);
      }}
    />
  );
}

export default RichText;
