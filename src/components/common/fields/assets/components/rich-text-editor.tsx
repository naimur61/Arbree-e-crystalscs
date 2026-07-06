'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { LabelAndPlaceholderTextFormat, cn } from '@/lib/utils';
import { useState } from 'react';
import { Bold, Italic, List, Heading } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ControllerRenderProps, FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

interface RichTextEditorProps {
  form?: UseFormReturn<FieldValues>;
  name?: string;
  labelName?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  disableLabelFormatting?: boolean;
  customMessage?: React.ReactNode;
}

export const RichTextEditor = ({
  form, name = 'content', labelName, required = false, placeholder = 'Write something...',
  disabled = false, disableLabelFormatting = false, customMessage,
}: RichTextEditorProps) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const wrapSelection = (tag: string) => {
    if (!form) return;
    const textarea = document.getElementById(name) as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const wrapped = tag === 'h1' ? `# ${selected}` :
      tag === 'h2' ? `## ${selected}` :
      tag === 'li' ? `- ${selected}` :
      `**${selected}**`;

    const newText = text.substring(0, start) + wrapped + text.substring(end);
    form.setValue(name, newText, { shouldValidate: true });
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const editorButtons = [
    { tag: 'bold', icon: Bold, label: 'Bold' },
    { tag: 'italic', icon: Italic, label: 'Italic' },
    { tag: 'h1', icon: Heading, label: 'Heading' },
    { tag: 'li', icon: List, label: 'List' },
  ];

  if (!form) {
    return <Textarea placeholder={placeholder} disabled={disabled} />;
  }

  return (
      <FormField
        control={form.control}
        name={name || 'content'}
        render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => {
          const error = form.formState.errors?.[name || ''];
        return (
          <FormItem>
            {labelName && (
              <label className="font-semibold leading-6 text-[14px] tracking-[0.02em]">
                {disableLabelFormatting ? labelName : LabelAndPlaceholderTextFormat(labelName)}
                {required && <span className="text-destructive">&nbsp;*</span>}
              </label>
            )}
            <div className="border rounded-md">
              <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                {editorButtons.map((btn) => (
                  <Button key={btn.tag} type="button" size="icon" variant="ghost" className={cn('h-8 w-8', activeTags.includes(btn.tag) && 'bg-accent')}
                    onClick={() => wrapSelection(btn.tag)} disabled={disabled}>
                    <btn.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <FormControl>
                <Textarea id={name} {...field} placeholder={placeholder} disabled={disabled}
                  className="min-h-[200px] border-0 focus-visible:ring-0 rounded-t-none font-mono text-sm" />
              </FormControl>
            </div>
            <FormMessage>{error ? String(error?.message || '') : customMessage || ''}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
