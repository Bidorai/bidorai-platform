import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/ui/file-upload';

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      setFiles([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Upload File</label>
          <FileUpload
            onUpload={handleUpload}
            onFilesChange={setFiles}
            files={files}
          />
        </div>
      </div>
    </div>
  );
}
