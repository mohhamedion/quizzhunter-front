<template>
  <v-banner
    elevation="1"
    class="my-1 answer-banner"
    :class="{
      'answer-correct': correct && choosen,
      'answer-incorrect': !correct && choosen,
      'answer-correct-only': correct && !choosen,
      'answer-chosen': choosen
    }"
  >
    <div class="answer-header" v-if="choosen">
      <v-chip x-small color="primary" outlined class="mb-2">
        إجابتك
      </v-chip>
    </div>
    <div class="text-h6  text-right " >
      <span v-html="renderAnswer(answer)"></span>
    </div>

  </v-banner>
</template>
<script>
export default {
  props: ['icon', 'color', 'answer', 'correct', 'choosen'],
  methods: {
    renderAnswer(answerText) {
      if (!answerText || typeof answerText !== 'string') {
        return answerText || '';
      }
      
      // Replace <code> tags with styled code containers
      // Handle multi-line code by preserving newlines
      return answerText.replace(
        /<code>(.*?)<\/code>/gs,
        (match, codeContent) => {
          // Escape HTML entities but preserve newlines and formatting
          const escaped = codeContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          
          // Check if code has newlines - if so, render as block
          const hasNewlines = /[\r\n]/.test(codeContent);
          const wrapperClass = hasNewlines ? 'answer-code-wrapper-block' : 'answer-code-wrapper';
          const codeClass = hasNewlines ? 'answer-code-block' : 'answer-code';
          
          return `<span class="${wrapperClass}"><code class="${codeClass}">${escaped}</code></span>`;
        }
      );
    }
  }
}
</script>

<style scoped>
/* Answer banner borders - colored right border (RTL) instead of icons */
.answer-banner {
  border-right: 4px solid transparent !important;
  padding-right: 16px !important;
  position: relative;
  transition: all 0.2s ease;
}

/* User's chosen answer - add distinct border/outline */
.answer-chosen {
  border-left: 3px solid #2196F3 !important;
  background-color: rgba(33, 150, 243, 0.05) !important;
}

/* Correct answer that user chose */
.answer-correct {
  border-right-color: #4caf50 !important;
}

/* Incorrect answer that user chose */
.answer-incorrect {
  border-right-color: #f44336 !important;
}

/* Correct answer that user did NOT choose */
.answer-correct-only {
  border-right-color: #81c784 !important;
}

/* Answer header with "Your answer" chip */
.answer-header {
  text-align: right;
  margin-bottom: 4px;
}

/* Override any background colors from results.css */
.answer-banner.correct,
.answer-banner.incorrect {
  background-color: transparent !important;
}

/* Enhanced styling for chosen answers */
.answer-chosen.answer-correct {
  background-color: rgba(76, 175, 80, 0.08) !important;
}

.answer-chosen.answer-incorrect {
  background-color: rgba(244, 67, 54, 0.08) !important;
}

::v-deep .answer-code-wrapper {
  display: inline-block;
  margin: 2px 4px;
  vertical-align: middle;
}

::v-deep .answer-code-wrapper-block {
  display: block;
  margin: 4px 0;
}

::v-deep .answer-code {
  display: inline-block;
  background-color: #1e1e1e !important;
  color: #f8f8f2 !important;
  border: 1px solid #404040 !important;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 2px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: embed;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  max-width: 100%;
  overflow-x: auto;
  position: relative;
  z-index: 1;
}

/* Enhanced styling for code blocks inside answer banners */
::v-deep .v-banner .answer-code {
  background-color: #1e1e1e !important;
  color: #d4d4d4 !important;
  border: 1px solid #505050 !important;
}

::v-deep .answer-code-block {
  display: block;
  background-color: #1e1e1e !important;
  color: #f8f8f2 !important;
  border: 1px solid #404040 !important;
  border-radius: 4px;
  padding: 10px 14px;
  margin: 6px 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: embed;
  white-space: pre;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  max-width: 100%;
  overflow-x: auto;
  position: relative;
  z-index: 1;
}

/* Enhanced styling for code blocks inside answer banners */
::v-deep .v-banner .answer-code-block {
  background-color: #1e1e1e !important;
  color: #d4d4d4 !important;
  border: 1px solid #505050 !important;
}

/* Dark mode support */
.theme--dark ::v-deep .answer-code,
.theme--dark ::v-deep .answer-code-block {
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
  border-color: #30363d !important;
}

.theme--dark ::v-deep .v-banner .answer-code,
.theme--dark ::v-deep .v-banner .answer-code-block {
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
  border-color: #30363d !important;
}
</style>
