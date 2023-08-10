import { Editor } from '@tinymce/tinymce-react';
import { forwardRef } from 'react';
import './index.scss';

export interface TextEditorProps {
  className?: string;
}

export const TextEditorRef = forwardRef(function TextEditor({ className }: TextEditorProps, ref: any) {
  return (
    <div className={className}>
      <Editor
        apiKey='your-api-key'
        onInit={(evt, editor) => (ref.current = editor)}
        initialValue=''
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  );
});
