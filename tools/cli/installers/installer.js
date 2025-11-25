/**
 * Blog Team Installer
 * Core installation logic for blog-team system
 */

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const yaml = require('js-yaml');
const { globSync } = require('glob');

class Installer {
  constructor(targetDir, options = {}) {
    this.targetDir = targetDir;
    this.options = options;
    this.config = {};
    this.blogTeamDir = options.dir || '.blog-team';
    this.manifestPath = path.join(targetDir, this.blogTeamDir, '_cfg', 'manifest.yaml');

    // Determine source directory (where blog-team is installed)
    this.sourceDir = path.join(__dirname, '../../../src');
  }

  /**
   * Main installation flow
   */
  async run() {
    // 1. Check for existing installation
    const existingInstall = await this.detectExistingInstall();

    if (existingInstall && !this.options.force) {
      const { shouldUpdate } = await inquirer.prompt([{
        type: 'confirm',
        name: 'shouldUpdate',
        message: 'Blog-team is already installed. Update it?',
        default: true
      }]);

      if (!shouldUpdate) {
        console.log(chalk.yellow('Installation cancelled.'));
        return;
      }
    }

    // 2. Collect configuration
    await this.collectConfig();

    // 3. Install files
    await this.installFiles();

    // 4. Compile agents
    await this.compileAgents();

    // 5. Setup IDE integration
    await this.setupIdeIntegration();

    // 6. Create blog directory structure
    await this.createBlogStructure();

    // 7. Generate manifests
    await this.generateManifests();

    // 8. Create initial README
    await this.createInitialReadme();
  }

  /**
   * Detect if blog-team is already installed
   */
  async detectExistingInstall() {
    return fs.existsSync(this.manifestPath);
  }

  /**
   * Collect configuration from user
   */
  async collectConfig() {
    const spinner = ora('Collecting configuration...').start();

    // Check if config already exists
    const configPath = path.join(this.targetDir, this.blogTeamDir, '_cfg', 'config.yaml');
    let existingConfig = {};

    if (fs.existsSync(configPath)) {
      existingConfig = yaml.load(await fs.readFile(configPath, 'utf8'));
    }

    spinner.stop();

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'userName',
        message: 'What should the agents call you?',
        default: existingConfig.userName || 'Writer',
        validate: (input) => input.trim().length > 0 || 'Please enter a name'
      },
      {
        type: 'input',
        name: 'blogName',
        message: 'What is the name of your blog?',
        default: existingConfig.blogName || 'My Blog',
        validate: (input) => input.trim().length > 0 || 'Please enter a blog name'
      },
      {
        type: 'list',
        name: 'blogPostsDir',
        message: 'Where should blog posts be stored?',
        choices: ['blog-posts', 'posts', 'content', 'articles'],
        default: existingConfig.blogPostsDir || 'blog-posts'
      },
      {
        type: 'list',
        name: 'communicationLanguage',
        message: 'Preferred language for agent communication?',
        choices: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
        default: existingConfig.communicationLanguage || 'English'
      }
    ]);

    this.config = {
      ...answers,
      blogTeamDir: this.blogTeamDir,
      installDate: existingConfig.installDate || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  /**
   * Install core files from source
   */
  async installFiles() {
    const spinner = ora('Installing blog-team files...').start();

    try {
      // Create base directories
      const baseDir = path.join(this.targetDir, this.blogTeamDir);
      await fs.ensureDir(baseDir);
      await fs.ensureDir(path.join(baseDir, '_cfg'));
      await fs.ensureDir(path.join(baseDir, '_cfg', 'agents'));

      // Copy core module
      const coreSource = path.join(this.sourceDir, 'core');
      const coreTarget = path.join(baseDir, 'core');

      if (fs.existsSync(coreSource)) {
        await fs.copy(coreSource, coreTarget, {
          overwrite: true,
          filter: (src) => !src.includes('_cfg') // Don't overwrite user configs
        });
      }

      // Copy writing module
      const writingSource = path.join(this.sourceDir, 'writing');
      const writingTarget = path.join(baseDir, 'writing');

      if (fs.existsSync(writingSource)) {
        await fs.copy(writingSource, writingTarget, {
          overwrite: true,
          filter: (src) => !src.includes('_cfg')
        });
      }

      // Process config files with variable replacement
      await this.processConfigFiles(baseDir);

      // Save main configuration
      const configPath = path.join(baseDir, '_cfg', 'config.yaml');
      await fs.writeFile(configPath, yaml.dump(this.config), 'utf8');

      spinner.succeed('Files installed successfully');
    } catch (error) {
      spinner.fail('Failed to install files');
      throw error;
    }
  }

  /**
   * Process config files and replace variables
   */
  async processConfigFiles(baseDir) {
    const configFiles = globSync('**/config.yaml', {
      cwd: baseDir,
      absolute: true,
      ignore: ['**/_cfg/**']
    });

    for (const configFile of configFiles) {
      let content = await fs.readFile(configFile, 'utf8');

      // Replace variables
      content = content
        .replace(/\{user_name\}/g, this.config.userName)
        .replace(/\{blog_name\}/g, this.config.blogName)
        .replace(/\{communication_language\}/g, this.config.communicationLanguage)
        .replace(/\{blog_posts_dir\}/g, this.config.blogPostsDir)
        .replace(/\{blog_team_dir\}/g, this.blogTeamDir)
        .replace(/\{project-root\}/g, this.targetDir);

      await fs.writeFile(configFile, content, 'utf8');
    }
  }

  /**
   * Compile agent YAML files to markdown with XML
   */
  async compileAgents() {
    const spinner = ora('Compiling agents...').start();

    try {
      const baseDir = path.join(this.targetDir, this.blogTeamDir);
      const agentFiles = globSync('**/agents/*.agent.yaml', {
        cwd: baseDir,
        absolute: true
      });

      for (const agentFile of agentFiles) {
        await this.compileAgent(agentFile);
      }

      spinner.succeed('Agents compiled successfully');
    } catch (error) {
      spinner.fail('Failed to compile agents');
      throw error;
    }
  }

  /**
   * Compile a single agent YAML file
   */
  async compileAgent(agentFile) {
    const agentYaml = yaml.load(await fs.readFile(agentFile, 'utf8'));
    const agent = agentYaml.agent;
    const agentDir = path.dirname(agentFile);
    const outputFile = path.join(agentDir, `${agent.metadata.id}.md`);

    // Check for customization file
    const customizeFile = path.join(
      this.targetDir,
      this.blogTeamDir,
      '_cfg',
      'agents',
      `${agent.metadata.module}-${agent.metadata.id}.customize.yaml`
    );

    let customizations = {};
    if (fs.existsSync(customizeFile)) {
      const customYaml = yaml.load(await fs.readFile(customizeFile, 'utf8'));
      customizations = customYaml.agent || {};
    }

    // Merge customizations
    const finalAgent = this.mergeAgentCustomizations(agent, customizations);

    // Generate markdown content
    const markdown = this.generateAgentMarkdown(finalAgent);

    await fs.writeFile(outputFile, markdown, 'utf8');
  }

  /**
   * Merge agent customizations
   */
  mergeAgentCustomizations(agent, customizations) {
    return {
      ...agent,
      metadata: {
        ...agent.metadata,
        ...(customizations.metadata || {})
      },
      persona: {
        ...agent.persona,
        ...(customizations.persona || {})
      },
      menu: customizations.menu || agent.menu || [],
      critical_actions: customizations.critical_actions || agent.critical_actions || []
    };
  }

  /**
   * Generate agent markdown with XML structure
   */
  generateAgentMarkdown(agent) {
    const { metadata, persona, menu, critical_actions } = agent;

    let markdown = `---
name: '${metadata.id}'
description: '${metadata.title}'
---

# ${metadata.icon || '📝'} ${metadata.name} - ${metadata.title}

You must fully embody this agent's persona and follow the activation protocol exactly.

\`\`\`xml
<agent id="${this.blogTeamDir}/${metadata.module}/agents/${metadata.id}.md" name="${metadata.name}" title="${metadata.title}">
<activation critical="MANDATORY">
  <step n="1">Load and embody the persona from this agent file</step>
  <step n="2">Read the blog-team configuration from {project-root}/${this.blogTeamDir}/_cfg/config.yaml</step>
  <step n="3">Remember the user's name is {user_name}</step>
  <step n="4">Present yourself briefly and show the numbered menu</step>
  <step n="5">WAIT for user to select a menu option - do NOT proceed automatically</step>
  <step n="6">When user selects an option, follow the menu handler instructions</step>

  <menu-handlers>
    <handler type="workflow">
      When menu item specifies: workflow="path/to/workflow.yaml"
      1. Read the workflow YAML file
      2. Follow the workflow steps sequentially
      3. Track progress and state
      4. Save outputs to appropriate locations
    </handler>

    <handler type="action">
      When menu item specifies: action="inline instructions"
      1. Execute the inline instructions directly
      2. Follow all specified steps
      3. Report completion to user
    </handler>

    <handler type="agent">
      When menu item specifies: agent="path/to/agent.md"
      1. Load the specified agent
      2. Transfer control to that agent
      3. That agent takes over the conversation
    </handler>
  </menu-handlers>
</activation>

<persona>
  <role>${persona.role}</role>
  <identity>${persona.identity}</identity>
  <communication_style>${persona.communication_style}</communication_style>
  <principles>
${persona.principles.map(p => `    <principle>${p}</principle>`).join('\n')}
  </principles>
</persona>

${critical_actions && critical_actions.length > 0 ? `
<critical_actions>
${critical_actions.map(action => `  <action>${action}</action>`).join('\n')}
</critical_actions>
` : ''}

<menu>
${menu.map((item, idx) => `  <item cmd="${idx + 1}" ${item.workflow ? `workflow="${item.workflow}"` : ''}${item.action ? `action="${item.action}"` : ''}${item.agent ? `agent="${item.agent}"` : ''}>${item.description}</item>`).join('\n')}
</menu>

</agent>
\`\`\`

## Variable Substitutions

Throughout execution, replace these variables:
- \`{project-root}\`: ${this.targetDir}
- \`{blog-team-dir}\`: ${this.blogTeamDir}
- \`{user_name}\`: User's configured name
- \`{blog_posts_dir}\`: Configured blog posts directory
- \`{blog_name}\`: Configured blog name
`;

    return markdown;
  }

  /**
   * Setup IDE integration (Claude Code)
   */
  async setupIdeIntegration() {
    const spinner = ora('Setting up Claude Code integration...').start();

    try {
      const claudeDir = path.join(this.targetDir, '.claude', 'commands', 'blog-team');
      await fs.ensureDir(claudeDir);

      // Create agent launchers
      const agents = await this.findAgents();

      for (const agent of agents) {
        await this.createAgentLauncher(claudeDir, agent);
      }

      spinner.succeed('Claude Code integration setup complete');
    } catch (error) {
      spinner.fail('Failed to setup IDE integration');
      throw error;
    }
  }

  /**
   * Find all compiled agents
   */
  async findAgents() {
    const baseDir = path.join(this.targetDir, this.blogTeamDir);
    const agentFiles = globSync('**/agents/*.md', {
      cwd: baseDir,
      ignore: ['**/*.agent.yaml'],
      absolute: false
    });

    return agentFiles.map(file => {
      const parts = file.split('/');
      const module = parts[0];
      const filename = path.basename(file, '.md');

      return {
        id: filename,
        module: module,
        path: file
      };
    });
  }

  /**
   * Create agent launcher in .claude/commands
   */
  async createAgentLauncher(claudeDir, agent) {
    const launcherContent = `---
name: '${agent.id}'
description: 'Launch ${agent.id} agent'
---

Load and activate the agent from:

\`{project-root}/${this.blogTeamDir}/${agent.path}\`

Follow all activation instructions in that file exactly.
`;

    const launcherPath = path.join(claudeDir, `${agent.id}.md`);
    await fs.writeFile(launcherPath, launcherContent, 'utf8');
  }

  /**
   * Create blog directory structure
   * Uses flat structure: posts stored directly in {blog_posts_dir}/{slug}/
   * No status-based subdirectories (status tracked in README.md)
   */
  async createBlogStructure() {
    const spinner = ora('Creating blog directory structure...').start();

    try {
      const blogDir = path.join(this.targetDir, this.config.blogPostsDir);
      await fs.ensureDir(blogDir);

      // Create single .gitkeep in blog-posts root (flat structure)
      await fs.writeFile(path.join(blogDir, '.gitkeep'), '', 'utf8');

      // Copy ideas.md template if it doesn't exist
      const ideasFile = path.join(this.targetDir, 'ideas.md');
      if (!fs.existsSync(ideasFile)) {
        const templatePath = path.join(this.sourceDir, '../src/templates/ideas.md');
        if (fs.existsSync(templatePath)) {
          await fs.copy(templatePath, ideasFile);
        }
      }

      spinner.succeed('Blog directory structure created');
    } catch (error) {
      spinner.fail('Failed to create blog structure');
      throw error;
    }
  }

  /**
   * Generate installation manifests
   */
  async generateManifests() {
    const spinner = ora('Generating manifests...').start();

    try {
      const manifest = {
        installation: {
          version: this.config.version,
          installDate: this.config.installDate,
          lastUpdated: this.config.lastUpdated,
          blogTeamDir: this.blogTeamDir
        },
        config: this.config,
        modules: ['core', 'writing'],
        ides: ['claude-code']
      };

      await fs.writeFile(this.manifestPath, yaml.dump(manifest), 'utf8');

      spinner.succeed('Manifests generated');
    } catch (error) {
      spinner.fail('Failed to generate manifests');
      throw error;
    }
  }

  /**
   * Create initial README.md
   */
  async createInitialReadme() {
    const spinner = ora('Creating README.md...').start();

    try {
      const readmePath = path.join(this.targetDir, 'README.md');

      // Check if README already exists
      if (fs.existsSync(readmePath)) {
        spinner.info('README.md already exists, skipping');
        return;
      }

      const readme = `# ${this.config.blogName}

> Managed by [Blog Team](https://github.com/yourusername/blog-team) - AI-powered blog writing assistant

## 📊 Blog Progress

| Title | Status | Started | Last Updated | Series | Link |
|-------|--------|---------|--------------|--------|------|
| *No posts yet* | - | - | - | - | - |

## 💡 Quick Idea Capture

Add new blog post ideas to **ideas.md** - the brainstorm agent will present them when you start a new post!

## 📁 Directory Structure

- **${this.config.blogPostsDir}/** - All blog posts and series
  - **{slug}/** - Standalone posts (one folder per post)
  - **{series-slug}/** - Multi-part series
    - **part-01-{slug}/** - Individual series parts
- **ideas.md** - Quick capture for new ideas

Each post folder contains:
- \`brainstorm.md\` - Initial thesis and structure
- \`draft.md\` - Written content
- \`history.md\` - Lifecycle tracking (all actions and status changes)

## 📋 Status Legend

Posts are tracked by status in the progress table above:
- **Draft - Brainstorm** - Initial idea captured
- **Draft - Outlining** - Structure being refined
- **In Progress - Writing** - First draft in progress
- **In Progress - Revision** - Editing and refining
- **Ready - Final Review** - Quality check complete
- **Ready - Publishing** - Approved for publication
- **Published** - Live on blog

## 🚀 Getting Started

1. **Capture ideas**: Add ideas to \`ideas.md\` (separated by \`----\`)
2. **Start brainstorming**: Launch \`/blog-team:brainstorm\` in Claude Code
3. **Pick or create**: Select from your ideas or explore something new
4. **Develop**: Work through brainstorm → writer → editor → reviewer
5. **Track progress**: This README updates automatically

## 💡 Quick Commands

- **Start brainstorming**: \`/blog-team:brainstorm\`
- **Add quick idea**: Edit \`ideas.md\` with any text editor
- **View all posts**: Check the progress table above
- **Git best practices**: Commit frequently with clear messages

---

*Last updated: ${new Date().toISOString()}*
`;

      await fs.writeFile(readmePath, readme, 'utf8');

      spinner.succeed('README.md created');
    } catch (error) {
      spinner.fail('Failed to create README');
      throw error;
    }
  }
}

module.exports = Installer;
