# Blog Team

**Complete AI-powered blogging workflow from idea to promotion**

An intelligent blog writing system with 8 specialized AI agents that guide you through ideation, research, writing, editing, SEO optimization, promotion, and maintenance. Features a comprehensive writing voices system to maintain consistent personas across your content. Built for Claude Code with a Dawkins-inspired analytical approach.

**🚀 Now available on NPM:** `npx blog-team@latest install`

## What You Get

✅ **Complete Workflow Coverage**
- Idea capture & analysis → Brainstorming → Research & citations → Writing & internal linking → Editing & SEO → Promotion strategy → Content maintenance

✅ **8 Specialized Agents**
- Each agent is an expert in their domain (brainstorming, research, writing, editing, voice definition, promotion, maintenance)
- Switch seamlessly between agents as you progress through your workflow
- Consistent Dawkins-inspired analytical communication style

✅ **Modern Blogging Best Practices**
- Strategic internal linking (3-4 per 1500 words)
- Citation management with credibility ratings
- SEO optimization (headers, keywords, 1500-2500 word target)
- Topic clusters for authority building
- Value-first promotion strategy (90/10 rule)
- Proactive content maintenance

✅ **Research-Backed**
- All recommendations based on 2025 blogging best practices
- Source credibility hierarchy (.gov → .edu → peer-reviewed)
- Platform-specific promotion strategies
- Data-driven content decisions

## Features

- **Writing Voices System**: Define and maintain multiple writing personas with distinct styles, tones, and guidelines
  - Create voices for different audiences (technical experts, beginners, general readers)
  - Common voice for universal rules across all writing
  - Voice compliance validation by editor agent
  - Organic voice evolution - agents detect and capture your preferences as you write

- **Quick Idea Capture**: Add blog post ideas to `ideas.md` - brainstorm agent presents them when starting new posts
- **Smart Series Analysis**: Agent analyzes if ideas fit existing series and makes recommendations
- **Multiple Specialized Agents**: Switch between different personas (brainstorm, writer, editor, etc.) each with specific expertise
- **Structured Workflow**: Guided workflows for creating blog posts from idea to publication
- **Progress Tracking**: Automatic README with clickable links to each post directory
- **UUID Folders**: Clean folder structure using UUIDs instead of slugs
- **Series Support**: Create multi-part blog series or merge series into single posts
- **Git Integration**: Automatic commits and pushes to track your writing progress
- **Richard Dawkins-style Persona**: Clear, analytical, evidence-based communication

## Installation

Blog Team is available on NPM. No installation required - just run it directly in your blog repository:

```bash
npx blog-team@latest install
```

Or install globally:

```bash
npm install -g blog-team
blog-team install
```

The installer will:
1. Ask for your name and blog configuration
2. Create `.blog-team/` directory with agents and workflows
3. Set up `blog-posts/` directory structure (drafts, in-progress, ready-to-publish, published)
4. Create `ideas.md` for quick idea capture
5. Generate initial README.md with progress tracking
6. Install Claude Code integration

### Directory Structure Created

```
your-blog-repo/
├── .blog-team/              # Blog Team installation
│   ├── _cfg/                # Configuration (preserved on updates)
│   ├── core/                # Core agents and tools
│   ├── writing/             # Writing module with agents
│   └── promotion/           # Promotion module with agents
├── .claude/commands/        # Claude Code commands
│   └── blog-team/
│       ├── brainstorm.md    # Launch brainstorm agent
│       └── master.md        # Launch coordinator
├── blog-posts/              # Your blog content (flat structure)
│   ├── {post-slug}/         # Standalone posts
│   └── {series-slug}/       # Multi-part series
├── ideas.md                 # Quick idea capture
└── README.md                # Auto-updated progress tracker
```

## Usage

### Quick Idea Capture

Whenever you have a blog post idea, quickly add it to `ideas.md`:

```markdown
# Ideas

<!-- Add your ideas below, separated by ---- -->

How TypeScript generics actually work under the hood

----

Why most developers misunderstand async/await

----

Building a blog system with AI agents - a meta post!

----
```

Use any text editor to append ideas. The brainstorm agent will:
- Skip the description section automatically
- Present your ideas as a numbered list
- Let you pick one to develop
- Remove it from `ideas.md` once you start working on it

### Starting a New Blog Post

In Claude Code, use the slash command:

```
/blog-team:brainstorm
```

The brainstorm agent will:
1. Present existing ideas from `ideas.md` (or explore new idea)
2. Analyze if idea fits existing series and make recommendation
3. Gather information about your target audience
4. Help you define your core thesis
5. Outline key arguments and structure
6. Identify research gaps
7. Generate UUID and create post directory
8. Create `brainstorm.md` with full structure
9. Remove selected idea from `ideas.md`
10. Update README.md progress table with clickable link
11. Commit and push changes to git

### Working with Series

**Convert a post into a series:**
- Use brainstorm agent menu option 2
- Specify number of parts
- Agent splits content across subdirectories

**Merge a series into one post:**
- Use brainstorm agent menu option 3
- Agent combines all parts coherently

### Working with Writing Voices

**Define your first voice:**

```
/blog-team:brainstorm → Manage writing voices → Create a new voice
```

Adele (Voice Narrator agent) guides you through:
1. Voice name and purpose
2. Target audience definition
3. Personality traits and tone
4. Do's and Don'ts guidelines
5. Vocabulary preferences (words to use/avoid)
6. Authors or brands to emulate
7. Concrete examples

**Voice selection workflow:**
- **No voices exist** → Prompted to create one when starting to write
- **One voice exists** → Automatically selected for all posts
- **Multiple voices exist** → Writer agent asks which voice to use

**Voice enforcement:**
- Writer agent applies voice guidelines during drafting
- Editor agent validates content against voice rules
- Agents detect potential voice rules in your comments and offer to save them

**Common voice for universal rules:**
- Rules that apply to ALL writing (e.g., "never use 'umm'")
- Separate from individual voice personas
- Edit via Voice Narrator agent

See `voices/README.md` for complete voice system documentation.

### Viewing Progress

The root `README.md` is automatically updated with a progress table:

| Title | Status | Started | Last Updated | Series | Link |
|-------|--------|---------|--------------|--------|------|
| Understanding TypeScript Generics | Draft - Brainstorm | 2025-11-10 | 2025-11-10 | Standalone | [📝](./blog-posts/typescript-generics/) |
| React Patterns - Part 1 | In Progress - Writing | 2025-11-09 | 2025-11-10 | React Best Practices (Part 1) | [📝](./blog-posts/react-patterns/part-01/) |
| React Patterns - Part 2 | Draft - Brainstorm | 2025-11-10 | 2025-11-10 | React Best Practices (Part 2) | [📝](./blog-posts/react-patterns/part-02/) |

Click the 📝 link to navigate directly to the post directory in GitHub/GitLab.

### Available Agents

All agents are now available! Complete workflow from idea to promotion:

#### Content Creation Agents:

- **🎯 Master (Coordinator)** - Navigate between agents and view overall status

- **🧠 Brainstorm (Richard)** - Create and refine blog post ideas
  - Find trending topics
  - Launch Ideas Manager
  - Work with existing ideas or explore new ones

- **💡 Ideas Manager (Alex)** - Strategic content curator for your ideas backlog
  - CRUD operations (list/add/edit/delete)
  - Score and prioritize ideas
  - Analyze idea viability and competition
  - Find trending topics to add
  - Cluster ideas into themes/series
  - Content gap analysis

- **🔬 Researcher (Dr. Morgan)** - Citations and fact-checking specialist
  - Find credible sources (.gov, .edu, peer-reviewed)
  - Create references.md with proper citations
  - Fact-check drafts
  - Rate source credibility
  - Generate citation formats

- **✍️ Writer (Jamie)** - Content writer with internal linking strategy
  - Draft from brainstorm with integrated citations
  - Strategic internal linking (3-4 per 1500 words)
  - Suggest internal links for existing drafts
  - Topic cluster awareness
  - Continue/revise existing drafts

- **✨ Editor (Taylor)** - Quality-focused editor with SEO optimization
  - Full editorial review with quality grading (A-F)
  - Quick SEO check (headers, keywords, optimization)
  - Citation verification (all claims sourced)
  - Internal link quality assessment
  - Voice compliance check
  - Readability analysis
  - Grammar and style check
  - Publishing readiness determination

- **🎭 Voice Narrator (Adele)** - Writing voice and brand persona specialist
  - Create new writing voices with guided workflow
  - Edit existing voices (audience, personality, guidelines)
  - Manage common voice (universal rules)
  - Analyze voice consistency across posts
  - Delete voices with reassignment logic

#### Promotion & Maintenance Agents:

- **📢 Promoter (Casey)** - Strategic content promotion specialist
  - Find specific Reddit posts/subreddits to engage with
  - Find specific YouTube videos for comment opportunities
  - Create comprehensive multi-platform promotion plans
  - Draft platform-appropriate promotion text
  - Track promotion efforts and analyze results
  - Suggest content repurposing (Twitter, LinkedIn, video)
  - 90/10 rule: 90% value, 10% promotion

- **🔧 Maintainer (Sam)** - Content maintenance and quality assurance
  - Scan all posts for broken internal links
  - Check for outdated information
  - Analyze post freshness and performance
  - Verify citations still accessible
  - Create content refresh plans
  - Track maintenance history
  - Identify content gaps and opportunities

## Agent Personas

### 🧠 Brainstorm Agent (Richard)

Inspired by Richard Dawkins' communication style:
- Direct and analytical
- Pushes for clarity and evidence
- Asks targeted questions with multiple choice options
- No tolerance for vague thinking
- Structures ideas logically
- Can launch trending topic research
- Connects to Ideas Manager for backlog management

### 💡 Ideas Manager (Alex)

Strategic Content Curator:
- Analyzes ideas critically with data-driven reasoning
- Sees the bigger picture (themes, gaps, opportunities)
- Scores ideas on viability, audience fit, competition
- Provides strategic recommendations
- No nonsense, clear assessments
- Helps prioritize what to write next

### 🔬 Researcher (Dr. Morgan)

Academic Researcher and Fact-Checker:
- Meticulous source verification
- Insists on credible citations
- Prioritizes .gov, .edu, peer-reviewed journals
- Rates source quality (High/Medium/Low)
- Creates proper reference documentation
- Academic rigor meets blogging practicality

### ✍️ Writer (Jamie)

Content Writer & Internal Linking Strategist:
- Crafts comprehensive drafts from brainstorms
- Strategic about internal linking (3-4 per 1500 words)
- Topic cluster awareness for SEO
- Integrates citations naturally
- Suggests bidirectional linking opportunities
- Balances readability with depth

### ✨ Editor (Taylor)

Quality-Focused Editor & SEO Specialist:
- Meticulous attention to quality and precision
- SEO best practices (headers, keywords, optimization)
- Verifies every claim has a source
- Analyzes readability and flow
- Grades content quality (A-F)
- Publishing readiness determination
- Quality over speed

### 📢 Promoter (Casey)

Strategic Community Engagement Specialist:
- 90/10 rule: 90% value, 10% promotion
- Finds specific opportunities (not just platforms)
- Platform culture expert (Reddit ≠ YouTube)
- Value-first contributions
- Strategic timing and spacing
- Tracks results and learns

### 🔧 Maintainer (Sam)

Systematic Content Curator:
- Proactive maintenance prevents problems
- Scans for broken links and outdated info
- Analyzes content freshness
- Prioritizes by impact and effort
- Data-driven assessments
- Content quality degrades without upkeep

### Communication Style

All agents follow the Dawkins-inspired style:
- Ask specific, focused questions
- Provide multiple choice options when possible
- Challenge unclear ideas
- Push for evidence and reasoning
- Never use emojis (unless you request them)

## Git Integration

All agents automatically:
- Commit changes after major actions
- Use clear, single-line commit messages
- Update README.md with each commit
- Push to origin (reminds you to commit frequently)

Example commit messages:
```
Add brainstorm: Understanding TypeScript Generics
Refine brainstorm for React Patterns - Part 1
Convert API Design post into 3-part series
```

## Blog Post Structure

Each blog post directory contains:

```
blog-posts/my-post-title/
├── brainstorm.md       # Initial ideas and structure
├── outline.md          # Detailed outline (created by writer agent)
├── draft.md            # First draft
├── draft-v2.md         # Revisions
├── references.md       # Citations and sources
├── history.md          # Lifecycle tracking (status changes)
└── final.md            # Ready to publish
```

For series:
```
blog-posts/my-series/
├── part-01-introduction/
│   ├── brainstorm.md
│   └── ...
├── part-02-deep-dive/
│   ├── brainstorm.md
│   └── ...
└── part-03-conclusion/
    ├── brainstorm.md
    └── ...
```

## Customization

### Agent Customization

Customize any agent by creating:
```
.blog-team/_cfg/agents/writing-brainstorm.customize.yaml
```

Override:
- Agent name
- Persona traits
- Menu items
- Critical actions

### Configuration

Edit `.blog-team/_cfg/config.yaml` to change:
- User name
- Blog name
- Communication language
- Blog posts directory

## Development

### Project Structure

```
blog-team/
├── src/                    # Source files (will be installed)
│   ├── core/               # Core module
│   │   ├── agents/         # Core agents (master/coordinator)
│   │   └── config.yaml
│   ├── writing/            # Writing module
│   │   ├── agents/         # Writing agents (brainstorm, writer, editor, etc.)
│   │   ├── workflows/      # Workflow definitions
│   │   └── config.yaml
│   ├── promotion/          # Promotion module
│   │   ├── agents/         # Promotion agents (promoter, maintainer)
│   │   └── workflows/      # Promotion workflows
│   └── templates/          # Template files (ideas.md)
├── tools/                  # Installation tools
│   ├── cli/                # CLI framework
│   │   ├── commands/       # CLI commands
│   │   └── installers/     # Installation logic
│   └── blog-team-npx-wrapper.js
├── voices/                 # Voice system templates
│   ├── common-voice.md     # Universal writing rules
│   └── voices-index.md     # Voice registry
└── package.json            # NPM package definition
```

### Building New Agents

1. Create agent YAML in the appropriate module:
   - `src/core/agents/` - Core/coordinator agents
   - `src/writing/agents/` - Content creation agents
   - `src/promotion/agents/` - Promotion and maintenance agents
2. Define persona, menu items, and workflows
3. Run `npx blog-team install` to test
4. Agent will be compiled to markdown with XML structure

### Testing Locally

```bash
# In this repository
npm install

# In a test blog repository
node /path/to/BlogTeam/tools/cli/blog-team-cli.js install

# Or link for development
npm link
blog-team install
```

## Roadmap

### ✅ Phase 1 Complete (Modern Blogging Foundation)

- [x] NPM package and installation system
- [x] Brainstorm agent with Dawkins persona
- [x] Claude Code integration
- [x] README progress tracking with clickable links
- [x] Git commit/push automation
- [x] Blog series support
- [x] Quick idea capture (ideas.md)
- [x] Smart series fit analysis and recommendations
- [x] UUID-based folder structure
- [x] Series metadata tracking
- [x] **Ideas Manager agent** - CRUD + analytical features
- [x] **Trending topic research** - Google Trends, Reddit, social monitoring
- [x] **Idea scoring and prioritization** - Viability analysis
- [x] **Content gap analysis** - Strategic recommendations
- [x] **Researcher agent** - Citations and fact-checking
- [x] **Source credibility rating** - .gov/.edu/peer-reviewed prioritization
- [x] **references.md generation** - Proper citation management

### ✅ Phase 2 Complete (Content Creation & Internal Linking)

- [x] **Writer agent** - Drafting with internal linking
- [x] **Internal link suggestions** - 3-4 per 1500 words
- [x] **Topic cluster creation** - Bidirectional linking
- [x] **Editor agent** - Polishing and SEO optimization
- [x] **Link to older posts strategy** - Strategic internal linking
- [x] **SEO check workflow** - Headers, keywords, optimization (0-100 score)
- [x] **Readability analysis** - Paragraph/sentence structure
- [x] **Publishing readiness** - Quality grading (A-F)

### ✅ Phase 3 Complete (Promotion & Distribution)

- [x] **Promoter agent** - Reddit/YouTube/social media strategy
- [x] **Platform-specific promotion** - Find specific posts/videos
- [x] **Cross-platform content repurposing** - Twitter, LinkedIn, video
- [x] **Maintainer agent** - Content updates and performance
- [x] **Broken link detection** - Scan all internal links
- [x] **Outdated content detection** - Identify stale information
- [x] **Content refresh plans** - Prioritized maintenance roadmap
- [x] **90/10 promotion strategy** - Value-first community engagement

### 🚀 Published on NPM

- [x] Published as `blog-team@1.2.0`
- [x] Available via `npx blog-team install`
- [x] MIT License
- [x] Complete documentation

## Architecture

Based on [BMAD-METHOD](https://github.com/bmadcode/bmad-method) architecture:
- Modular agent system
- YAML to XML-markdown compilation
- Update-safe customization
- Multi-IDE support
- Workflow execution engine

## License

MIT

## Credits

Author: FortLee.AI
