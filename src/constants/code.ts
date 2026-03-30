
export const LANGUAGES = {
  csharp: 'C#',
  c: 'C',
  cpp: 'C++',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  yaml: 'YAML',
  toml: 'TOML',
  sql: 'SQL',
  php: 'PHP',
  jsx: 'JSX',
  tsx: 'TSX',
  xml: 'XML',
  graphql: 'GraphQL',
  nginx: 'NGINX',
  matlab: 'MATLAB',
  powershell: 'PowerShell',
  r: 'R',
  pascal: 'Delphi',
  erlang: 'Erlang',
  fsharp: 'F#',
  ini: 'INI',
  tex: 'LaTeX',
  lisp: 'Lisp',
  objectivec: 'Objective-C',
  vbnet: 'VB.NET',
  vim: 'VimL',
  dart: 'Dart',
  bash: 'BASH',
  dockerfile: 'Docker File',
  elixir: 'Elixir',
  go: 'Go',
  groovy: 'Groovy',
  haskell: 'Haskell',
  java: 'Java',
  kotlin: 'Kotlin',
  lua: 'Lua',
  makefile: 'Makefile',
  markdown: 'Markdown',
  perl: 'Perl',
  python: 'Python',
  ruby: 'Ruby',
  rust: 'Rust',
  scala: 'Scala',
  swift: 'Swift'
}

export const THEMES = {
  oneDark: 'One Dark',
  monokai: 'Monokai',
  dracula: 'Dracula',
  nord: 'Nord',
  tokyoNight: 'Tokyo Night',
  githubDark: 'GitHub Dark',
  githubLight: 'GitHub Light',
  solarized: 'Solarized'
}

export const THEME_BACKGROUND_COLOR = {
  oneDark: '#282c34',
  monokai: '#272822',
  dracula: '#282a36',
  nord: '#2e3440',
  tokyoNight: '#1a1b2e',
  githubDark: '#0d1117',
  githubLight: '#ffffff',
  solarized: '#002b36',
}

export const FONTS = {
  inconsolata: 'Inconsolata',
  dm_mono: 'DM Mono',
  source_code_pro: 'Source Code Pro',
  roboto_mono: 'Roboto Mono',
  space_mono: 'Space Mono',
  fira_code: 'Fira Code',
  jetbrains_mono: 'JetBrains Mono',
  ubuntu_mono: 'Ubuntu Mono',
};

export const EXAMPLE_CODE = `using System.Windows.Forms;
using System.Drawing;

public static DialogResult InputBox(string title, string promptText, ref string value)
{
  Form form = new Form();
  Label label = new Label();
  TextBox textBox = new TextBox();
  Button buttonOk = new Button();
  Button buttonCancel = new Button();

  form.Text = title;
  label.Text = promptText;
  textBox.Text = value;

  buttonOk.Text = "OK";
  buttonCancel.Text = "Cancel";
  buttonOk.DialogResult = DialogResult.OK;
  buttonCancel.DialogResult = DialogResult.Cancel;

  label.SetBounds(9, 20, 372, 13);
  textBox.SetBounds(12, 36, 372, 20);
  buttonOk.SetBounds(228, 72, 75, 23);
  buttonCancel.SetBounds(309, 72, 75, 23);

  label.AutoSize = true;
  textBox.Anchor = textBox.Anchor | AnchorStyles.Right;
  buttonOk.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
  buttonCancel.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;

  form.ClientSize = new Size(396, 107);
  form.Controls.AddRange(new Control[] { label, textBox, buttonOk, buttonCancel });
  form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);
  form.FormBorderStyle = FormBorderStyle.FixedDialog;
  form.StartPosition = FormStartPosition.CenterScreen;
  form.MinimizeBox = false;
  form.MaximizeBox = false;
  form.AcceptButton = buttonOk;
  form.CancelButton = buttonCancel;

  DialogResult dialogResult = form.ShowDialog();
  value = textBox.Text;
  return dialogResult;
}`