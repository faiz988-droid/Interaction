import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SequenceAlignmentProps {
  mirnaSeq: string;
  lncrnaSeq: string;
  alignment: string;
  className?: string;
}

export function SequenceAlignment({
  mirnaSeq,
  lncrnaSeq,
  alignment,
  className,
}: SequenceAlignmentProps) {
  // Parse the alignment string
  const lines = alignment.split('\n');
  if (lines.length < 3) {
    return (
      <Card className={cn("overflow-x-auto", className)}>
        <CardContent className="p-4">
          <div className="font-mono text-sm text-red-500">
            Invalid alignment format
          </div>
        </CardContent>
      </Card>
    );
  }

  const mirnaLine = lines[0];
  const matchLine = lines[1];
  const lncrnaLine = lines[2];

  // Highlight complementary, mismatch, and wobble pairs
  const enhancedAlignment = (
    <div className="font-mono text-sm whitespace-pre">
      <div dangerouslySetInnerHTML={{ __html: formatLine(mirnaLine) }} />
      <div dangerouslySetInnerHTML={{ __html: formatMatchLine(matchLine) }} />
      <div dangerouslySetInnerHTML={{ __html: formatLine(lncrnaLine) }} />
    </div>
  );

  return (
    <Card className={cn("overflow-x-auto", className)}>
      <CardContent className="p-4">
        {enhancedAlignment}
      </CardContent>
    </Card>
  );
}

// Helper functions for formatting
function formatLine(line: string): string {
  // Keep the labels at the beginning but apply styles to the sequence
  const parts = line.split(/([35]'\s*)/);
  if (parts.length < 3) return line;
  
  const label = parts.slice(0, 2).join('');
  const sequence = parts.slice(2).join('');
  
  return `<span>${label}</span><span class="sequence-text">${sequence}</span>`;
}

function formatMatchLine(line: string): string {
  // Replace match symbols with styled versions
  const enhancedLine = line.replace(/\|/g, '<span class="text-[#2c6e49] font-bold">|</span>')
                          .replace(/o/g, '<span class="text-[#ffc107] font-bold">o</span>');
  return enhancedLine;
}
