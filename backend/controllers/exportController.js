const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  ImageRun,
} = require("docx");
const PDFDocument = require("pdfkit");
const MarkdownIt = require("markdown-it");
const Book = require("../models/Book");
const path = require("path");
const fs = require("fs");

const md = new MarkdownIt();

// Typography configuration matching the PDF export
const DOCX_STYLES = {
  fonts: {
    body: "Charter",
    heading: "Inter",
  },
  sizes: {
    title: 32,
    subtitle: 20,
    author: 18,
    chapterTitle: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 300,
    headingBefore: 300,
    headingAfter: 150,
  },
};

// Process markdown content into docx paragraphs
const processMarkdownToDocx = (markdown) => {
  const tokens = md.parse(markdown, {});
  const paragraphs = [];
  let inList = false;
  let listType = null;
  let orderedCounter = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    try {
      if (token.type === "heading_open") {
        const level = parseInt(token.tag.substring(1), 10);
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline") {
          let headingLevel;
          let fontSize;

          switch (level) {
            case 1:
              headingLevel = HeadingLevel.HEADING_1;
              fontSize = DOCX_STYLES.sizes.h1;
              break;
            case 2:
              headingLevel = HeadingLevel.HEADING_2;
              fontSize = DOCX_STYLES.sizes.h2;
              break;
            case 3:
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;
              break;
            default:
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;
          }

          paragraphs.push(
            new Paragraph({
              text: nextToken.content,
              heading: headingLevel,
              spacing: {
                before: DOCX_STYLES.spacing.headingBefore,
                after: DOCX_STYLES.spacing.headingAfter,
              },
              style: {
                font: DOCX_STYLES.fonts.heading,
                size: fontSize * 2, // docx uses half-points
              },
            })
          );

          i += 2; // Skip inline and heading_close
        }
      } else if (token.type === "paragraph_open") {
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline" && nextToken.children) {
          const textRuns = processInlineContent(nextToken.children);

          if (textRuns.length > 0) {
            paragraphs.push(
              new Paragraph({
                children: textRuns,
                spacing: {
                  before: inList ? 100 : DOCX_STYLES.spacing.paragraphBefore,
                  after: inList ? 100 : DOCX_STYLES.spacing.paragraphAfter,
                  line: 360,
                },
                alignment: AlignmentType.JUSTIFIED,
              })
            );
          }

          i += 2;
        }
      } else if (token.type === "bullet_list_open") {
        inList = true;
        listType = "bullet";
      } else if (token.type === "bullet_list_close") {
        inList = false;
        listType = null;
        // Add spacing after list
        paragraphs.push(new Paragraph({ text: "", spacing: { after: 100 } }));
      } else if (token.type === "ordered_list_open") {
        inList = true;
        listType = "ordered";
        orderedCounter = 1;
      } else if (token.type === "ordered_list_close") {
        inList = false;
        listType = null;
        orderedCounter = 1;
        paragraphs.push(new Paragraph({ text: "", spacing: { after: 100 } }));
      } else if (token.type === "list_item_open") {
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];

          if (
            inlineToken &&
            inlineToken.type === "inline" &&
            inlineToken.children
          ) {
            const textRuns = processInlineContent(inlineToken.children);

            let bulletText = "";
            if (listType === "bullet") {
              bulletText = "• ";
            } else if (listType === "ordered") {
              bulletText = `${orderedCounter}. `;
              orderedCounter++;
            }

            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: bulletText,
                    font: DOCX_STYLES.fonts.body,
                  }),
                  ...textRuns,
                ],
                spacing: { before: 50, after: 50 },
                indent: { left: 720 }, // 0.5 inch indent
              })
            );

            i += 4; // Skip paragraph_open, inline, paragraph_close, list_item_close
          }
        }
      } else if (token.type === "blockquote_open") {
        // Find the blockquote content
        const nextToken = tokens[i + 1];
        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];
          if (inlineToken && inlineToken.type === "inline") {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: inlineToken.content,
                    italics: true,
                    color: "666666",
                    font: DOCX_STYLES.fonts.body,
                  }),
                ],
                spacing: { before: 200, after: 200 },
                indent: { left: 720 },
                alignment: AlignmentType.JUSTIFIED,
                border: {
                  left: {
                    color: "4F46E5",
                    space: 1,
                    style: "single",
                    size: 24,
                  },
                },
              })
            );
            i += 4;
          }
        }
      } else if (token.type === "code_block" || token.type === "fence") {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: token.content,
                font: "Courier New",
                size: 20,
                color: "333333",
              }),
            ],
            spacing: { before: 200, after: 200 },
            shading: {
              fill: "F5F5F5",
            },
          })
        );
      } else if (token.type === "hr") {
        paragraphs.push(
          new Paragraph({
            text: "",
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: "single",
                size: 6,
              },
            },
            spacing: { before: 200, after: 200 },
          })
        );
      }
    } catch (tokenError) {
      console.error("Error processing token:", token.type, tokenError);
      continue;
    }
  }

  return paragraphs;
};

// Process inline content (bold, italic, text)
const processInlineContent = (children) => {
  const textRuns = [];
  let currentFormatting = { bold: false, italic: false };
  let textBuffer = "";

  const flushText = () => {
    if (textBuffer.trim()) {
      textRuns.push(
        new TextRun({
          text: textBuffer,
          bold: currentFormatting.bold,
          italics: currentFormatting.italic,
          font: DOCX_STYLES.fonts.body,
          size: DOCX_STYLES.sizes.body * 2,
        })
      );
      textBuffer = "";
    }
  };

  children.forEach((child) => {
    if (child.type === "strong_open") {
      flushText();
      currentFormatting.bold = true;
    } else if (child.type === "strong_close") {
      flushText();
      currentFormatting.bold = false;
    } else if (child.type === "em_open") {
      flushText();
      currentFormatting.italic = true;
    } else if (child.type === "em_close") {
      flushText();
      currentFormatting.italic = false;
    } else if (child.type === "text") {
      textBuffer += child.content;
    }
  });

  flushText();
  return textRuns;
};