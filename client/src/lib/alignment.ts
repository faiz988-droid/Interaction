/**
 * Utility functions for handling RNA sequence alignments
 */

// Convert plain alignment text to HTML with style classes
export function formatAlignmentWithHighlighting(alignmentText: string): string {
  const lines = alignmentText.split('\n');
  if (lines.length < 3) return alignmentText;

  const mirnaLine = lines[0];
  const matchLine = lines[1];
  const lncrnaLine = lines[2];

  let formattedMirna = '';
  let formattedLncrna = '';

  // Extract the actual sequences, skipping the labels
  const mirnaSeqStart = mirnaLine.indexOf("3'") + 2;
  const lncrnaSeqStart = lncrnaLine.indexOf("5'") + 2;
  
  const mirnaSeq = mirnaLine.substring(mirnaSeqStart).replace("5'", '').trim();
  const matchSeq = matchLine.substring(mirnaSeqStart).trim();
  const lncrnaSeq = lncrnaLine.substring(lncrnaSeqStart).replace("3'", '').trim();

  // Build the formatted strings
  for (let i = 0; i < mirnaSeq.length; i++) {
    const mirnaChar = mirnaSeq[i] || '';
    const matchChar = i < matchSeq.length ? matchSeq[i] : '';
    const lncrnaChar = i < lncrnaSeq.length ? lncrnaSeq[i] : '';

    if (matchChar === '|') {
      // Complementary pair
      formattedMirna += `<span class="complementary">${mirnaChar}</span>`;
      formattedLncrna += `<span class="complementary">${lncrnaChar}</span>`;
    } else if (matchChar === 'o') {
      // G:U wobble pair
      formattedMirna += `<span class="gu-pair">${mirnaChar}</span>`;
      formattedLncrna += `<span class="gu-pair">${lncrnaChar}</span>`;
    } else if (mirnaChar === '-' || lncrnaChar === '-') {
      // Bulge/gap
      formattedMirna += `<span class="bulge">${mirnaChar}</span>`;
      formattedLncrna += `<span class="bulge">${lncrnaChar}</span>`;
    } else {
      // Mismatch
      formattedMirna += `<span class="mismatch">${mirnaChar}</span>`;
      formattedLncrna += `<span class="mismatch">${lncrnaChar}</span>`;
    }
  }

  return `<div class="font-mono text-sm">
    <div>miRNA  3' ${formattedMirna} 5'</div>
    <div>${matchLine.substring(0, mirnaSeqStart)}${matchSeq}</div>
    <div>lncRNA 5' ${formattedLncrna} 3'</div>
  </div>`;
}

// Find binding site in lncRNA sequence
export function highlightBindingSite(sequence: string, start: number, end: number): string {
  if (start < 0 || end > sequence.length || start >= end) {
    return sequence;
  }

  const prefix = sequence.substring(0, start);
  const bindingSite = sequence.substring(start, end);
  const suffix = sequence.substring(end);

  return `${prefix}<span class="binding-site">${bindingSite}</span>${suffix}`;
}

// Format RNA sequence with proper spacing
export function formatSequence(sequence: string): string {
  return sequence.replace(/(.{10})/g, "$1 ").trim();
}

// Calculate binding properties from alignment
export function analyzeAlignment(mirnaSeq: string, lncrnaSeq: string, alignment: string): {
  complementaryPairs: number;
  mismatches: number;
  guPairs: number;
  bulges: number;
} {
  const lines = alignment.split('\n');
  if (lines.length < 3) {
    return {
      complementaryPairs: 0,
      mismatches: 0,
      guPairs: 0,
      bulges: 0
    };
  }

  const matchLine = lines[1];
  let complementaryPairs = 0;
  let guPairs = 0;
  let mismatches = 0;
  let bulges = 0;

  // Count the different match types
  for (const char of matchLine) {
    if (char === '|') complementaryPairs++;
    else if (char === 'o') guPairs++;
    else if (char === ' ') mismatches++;
    // Bulges would need more sophisticated detection based on gaps in sequences
  }

  // Count bulges (gaps) in sequences
  const mirnaGaps = (mirnaSeq.match(/-/g) || []).length;
  const lncrnaGaps = (lncrnaSeq.match(/-/g) || []).length;
  bulges = mirnaGaps + lncrnaGaps;

  return {
    complementaryPairs,
    mismatches,
    guPairs,
    bulges
  };
}
