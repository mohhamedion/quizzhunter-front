<template>
<div v-ripple>
    <a>
      <v-banner
        elevation="10"
        :class="[choosen && 'primary white--text']"
      >
        <v-list-item-title>
          <span v-html="renderAnswer(answer)"></span>
        </v-list-item-title>
      </v-banner>
    </a>
</div>
</template>
<script>
export default{
  props:['answer','choosen'],
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
  background-color: #2d2d2d;
  color: #f8f8f2;
  border: 1px solid #404040;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  overflow-x: auto;
}

::v-deep .answer-code-block {
  display: block;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border: 1px solid #404040;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 4px 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
  white-space: pre;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  overflow-x: auto;
}

/* Dark mode support */
.theme--dark ::v-deep .answer-code,
.theme--dark ::v-deep .answer-code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-color: #3e3e3e;
}
</style>
