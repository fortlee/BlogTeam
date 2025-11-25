# Writing Voices System

## Overview

The Writing Voices system helps you maintain consistent writing personas across your blog posts. Each voice represents a distinct style, tone, and set of guidelines tailored to specific audiences or content types.

## Directory Structure

```
voices/
├── README.md                    # This file - system documentation
├── voices-index.md              # Registry of all your voices
├── common-voice.md              # Universal rules applying to ALL voices
└── [voice-name].md              # Individual voice files
```

## How It Works

### 1. Common Voice (Universal Rules)

The `common-voice.md` file contains rules that apply to **all your writing**, regardless of which specific voice you're using. Examples:

- Never use the word "umm"
- Always cite sources for factual claims
- Always use inclusive language

Think of this as your writing baseline - preferences that never change.

### 2. Individual Voices (Personas)

Each voice file defines a specific persona with:

- **Target Audience** - Who you're writing for
- **Personality Traits** - Friendly, professional, playful, etc.
- **Tone Guidelines** - Formality level, sentence structure, humor
- **Do's and Don'ts** - Specific practices to follow or avoid
- **Vocabulary** - Words/phrases to embrace or avoid
- **Authors to Emulate** - Writing styles to model
- **Examples** - Concrete demonstrations of the voice

### 3. Voice Selection for Blog Posts

When you start writing a blog post:

1. **No voices exist** → You'll be prompted to create one with Adele
2. **One voice exists** → It's automatically selected
3. **Multiple voices exist** → Writer agent asks which voice to use

Once selected, the voice is stored in `{post-dir}/voice-metadata.md` and used by:

- **Writer Agent (Jamie)** - Applies voice guidelines during drafting
- **Editor Agent (Taylor)** - Validates content against voice rules

## Working with Voices

### Creating a New Voice

Use the Voice Narrator agent (Adele) to create voices through an interactive process:

```
Brainstorm → Menu → Manage writing voices → Create a new voice
```

Or from Writer/Editor agents:

```
Menu → Define or update writing voice → Create a new voice
```

Adele will guide you through defining:

1. Voice name and purpose
2. Target audience profile
3. Personality and tone characteristics
4. Do's and Don'ts guidelines
5. Vocabulary preferences
6. Authors/brands to emulate
7. Concrete examples

### Editing an Existing Voice

Voices evolve over time. You can edit them anytime:

```
Voice Narrator Agent → Edit existing voice
```

Update any section:
- Target audience
- Personality traits
- Do's and Don'ts
- Vocabulary
- Examples

### Adding Voice Rules During Writing

As you write, you might discover new preferences. When you make comments like:

- "Don't use the word 'basically'"
- "Always include code examples"
- "Never start sentences with 'So'"

The Writer and Editor agents will detect these and ask:

**Should this become a voice rule?**

A) Add to current voice - Applies only when using this voice
B) Add to common voice - Applies to ALL your writing
C) One-off comment - Just for this post

This makes your voice guidelines grow organically from your actual writing preferences.

### Changing Voice for a Post

Already started a post but want to switch voices?

```
Writer Agent → Define or update writing voice → Change voice for current post
```

The new voice will be applied from that point forward.

## Voice Compliance

The Editor agent includes a "Voice compliance check" that analyzes your draft against:

- Personality match (does tone match expected traits?)
- Tone consistency (formality, sentence structure, humor)
- Guidelines compliance (Do's present, Don'ts avoided)
- Vocabulary check (avoided words not used)
- Common voice violations

This ensures every post stays true to its intended voice.

## Best Practices

### 1. Start with One Voice

Don't create multiple voices immediately. Start with one that represents your primary writing style. Add more voices only when you have a clear need for different personas.

### 2. Use Common Voice for Universal Rules

If a rule applies no matter what you're writing, put it in `common-voice.md`. Individual voices should only contain persona-specific guidelines.

### 3. Provide Concrete Examples

When defining a voice, concrete examples are more valuable than abstract descriptions. Show Adele how your voice sounds in practice.

### 4. Let Voices Evolve

Your first voice definition doesn't have to be perfect. As you write, you'll discover what works. Let the agents help capture these insights as voice rules.

### 5. Review Voices Periodically

Use the Voice Narrator's "Analyze voice consistency across posts" feature to see how well you're adhering to your voices and identify areas for improvement.

## Example Use Cases

### Use Case 1: Technical Blog with Multiple Audiences

**Voices:**
- "Technical Deep-Dive" - For expert developers (detailed, jargon-heavy, assumes knowledge)
- "Beginner-Friendly Tutorial" - For learners (step-by-step, clear explanations, no assumptions)
- "Leadership Insights" - For tech managers (strategic, business-focused, high-level)

**Common Voice:**
- Always cite sources
- Never use offensive language
- Always include practical examples

### Use Case 2: Personal Blog with Different Topics

**Voices:**
- "Travel Stories" - Casual, descriptive, first-person, emotive
- "Product Reviews" - Balanced, analytical, pros/cons, data-driven
- "Life Reflections" - Thoughtful, philosophical, vulnerable

**Common Voice:**
- Avoid clichés like "at the end of the day"
- Use Oxford comma
- Keep paragraphs under 5 sentences

### Use Case 3: Professional Blog with Consistent Voice

**Voices:**
- "Professional Consultant" - Your only voice, well-defined

**Common Voice:**
- Universal pet peeves and style preferences

Even with one voice, the system helps maintain consistency.

## Agent Integration

### Brainstorm Agent (Richard)
- Provides access to voice management
- Can switch to Adele for voice creation
- Doesn't enforce voice during brainstorming (keeps ideas free-flowing)

### Writer Agent (Jamie)
- Checks for voice selection before drafting
- Loads voice guidelines and applies them during writing
- Detects potential voice rules in user comments
- Offers voice switching and updates

### Editor Agent (Taylor)
- Loads voice for validation during editing
- Runs voice compliance checks
- Identifies violations of voice rules
- Detects user preferences that could become voice rules

### Voice Narrator Agent (Adele)
- Guides voice creation through interactive workflow
- Edits existing voices
- Manages common voice
- Analyzes voice consistency across posts
- Deletes voices with reassignment logic

## File Format

Each voice file follows this structure:

```markdown
# Voice Name

**Created:** [Date]
**Last Updated:** [Date]

## Purpose
[When and why to use this voice]

## Target Audience
- Profile: [Description]
- Goals: [What they care about]
- Reading Context: [How they consume content]

## Personality and Tone
**Core Traits:** [List of 3-5 traits]
**Tone Characteristics:**
- Formality: [Level]
- Sentence Structure: [Style]
- Humor: [Level]

## Guidelines
### Always Do (Do's)
[List]

### Never Do (Don'ts)
[List]

## Vocabulary
### Words/Phrases to Embrace
[List or "No specific preferences"]

### Words/Phrases to Avoid
[List or "See common-voice.md"]

## Emulate
[Authors/brands with notes, or "No specific models"]

## Examples
[Concrete examples of this voice in action]

## Notes
[Additional context]

---
**Usage:** This voice has been used in [N] posts.
```

## Getting Started

1. **Create your first voice:** Use Adele to define your primary writing persona
2. **Start writing:** The Writer agent will apply your voice automatically
3. **Refine as you go:** Let voice rules emerge naturally from your writing
4. **Add voices as needed:** Create new personas when you have distinct audiences

The voice system grows with you, capturing your preferences and keeping your content consistent without constraining your creativity.

---

**Need Help?**
- Switch to Voice Narrator agent (Adele) for guided voice management
- All agents have menu options for accessing voice features
- Voices are stored as simple markdown files - you can edit them directly if needed
