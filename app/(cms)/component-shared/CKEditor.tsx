// // components/InfoFooterEditor.tsx
// "use client";

// import dynamic from "next/dynamic";

// const CKEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor),
//   { ssr: false }
// );

// let ClassicEditor: any;
// if (typeof window !== "undefined") {
//   ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
// }

// export default function CKEditorComponent({ value, onChange }: { value: string, onChange: (val: string) => void }) {
//   if (!ClassicEditor) return null;

//   return (
//     <CKEditor
//       editor={ClassicEditor}
//       data={value}
//       onChange={(event, editor) => onChange(editor.getData())}
//     />
//   );
// }


// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";

// // Dynamic import CKEditor + ClassicEditor cùng lúc, SSR=false
// const CKEditor = dynamic(async () => {
//   const { CKEditor } = await import("@ckeditor/ckeditor5-react");
//   const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;
//   return (props: any) => <CKEditor editor={ClassicEditor} {...props} />;
// }, { ssr: false });

// export default function CKEditorComponent({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (val: string) => void;
// }) {
//   // Chỉ render CKEditor khi client-side
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   return (
//     <CKEditor
//       data={value}
//       onChange={(event: any, editor: any) => onChange(editor.getData())}
//     />
//   );
// }



"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import CKEditor + ClassicEditor, SSR=false
const CKEditor = dynamic(async () => {
  const { CKEditor } = await import("@ckeditor/ckeditor5-react");
  const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;

  return (props: any) => <CKEditor editor={ClassicEditor} {...props} />;
}, { ssr: false });

interface CKEditorFullProps {
  value: string;
  onChange: (val: string) => void;
  contentStyle?: string; // Optional CSS for editor content
}

export default function CKEditorFull({
  value,
  onChange,
  contentStyle,
}: CKEditorFullProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CKEditor
      data={value}
      config={{
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'removeFormat', '|',
          'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
          'alignment', '|',
          'numberedList', 'bulletedList', '|',
          'outdent', 'indent', '|',
          'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'imageUpload', '|',
          'undo', 'redo'
        ],
        allowedContent: true, // giữ nguyên tất cả HTML và style
        contentStyle: contentStyle || `
          body { font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5; padding: 10px; }
          p { margin: 0 0 10px; }
          h1,h2,h3,h4,h5,h6 { margin: 0 0 10px; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 10px; }
          th, td { border: 1px solid #ccc; padding: 5px; }
          img { max-width: 100%; height: auto; }
        `,
        image: {
          toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
      }}
      onChange={(event: any, editor: any) => onChange(editor.getData())}
    />
  );
}



