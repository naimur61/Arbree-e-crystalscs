'use client';

import { useRef, useState } from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Paperclip, X, Eye } from 'lucide-react';
import Image from 'next/image';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  file: File;
}

interface TextAreaWithFileProps {
  form: UseFormReturn<FieldValues>;
  name: string;
  fileName?: string;
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
  viewOnly?: boolean;
  rows?: number;
  onSend?: (data: { text: string; files: FileItem[] }) => void;
}

/**
 * TextAreaWithFile — Textarea with attached file uploads.
 *
 * ⚠️ Stores file metadata (id, name, size, type) in the form value,
 * NOT raw File objects. Actual File references are kept in local state
 * for submission via onSend callback.
 */
export const TextAreaWithFile = ({
  form, name, fileName = 'files', placeholder,
  disabled = false, rows = 3, onSend,
}: TextAreaWithFileProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileItems, setFileItems] = useState<FileItem[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const newItems: FileItem[] = selectedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
      file,
    }));

    const updated = [...fileItems, ...newItems];
    setFileItems(updated);

    // Store metadata in form (strings only — no File objects)
    const metadata = updated.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      type: item.type,
    }));
    form.setValue(fileName, metadata);
  };

  const handleRemoveFile = (id: string) => {
    setFileItems((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      const updated = prev.filter((p) => p.id !== id);
      // Update form with metadata only
      const metadata = updated.map((item) => ({
        id: item.id, name: item.name, size: item.size, type: item.type,
      }));
      form.setValue(fileName, metadata);
      return updated;
    });
  };

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name={name}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Textarea {...field} placeholder={placeholder} disabled={disabled} rows={rows} />
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <Button type="button" size="icon" variant="ghost" className="h-8 w-8" disabled={disabled}
                    onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />

      {fileItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {fileItems.map((item) => (
            <div key={item.id} className="relative group border rounded-lg p-2 pr-8">
              {item.type.startsWith('image/') ? (
                <Image src={item.previewUrl} alt={item.name} width={48} height={48}
                  className="object-cover rounded cursor-pointer"
                  onClick={() => window.open(item.previewUrl, '_blank')} />
              ) : (
                <div className="flex items-center gap-1 text-xs">
                  <Eye className="h-4 w-4 cursor-pointer"
                    onClick={() => window.open(item.previewUrl, '_blank')} />
                  <span className="truncate max-w-[100px]">{item.name}</span>
                </div>
              )}
              <button type="button" onClick={() => handleRemoveFile(item.id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="h-3 w-3 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      {onSend && (
        <Button type="button" size="sm"
          onClick={() => onSend({ text: form.watch(name), files: fileItems })}>
          Send
        </Button>
      )}
    </div>
  );
};
