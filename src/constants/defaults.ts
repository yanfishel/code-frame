import { THEMES } from '@/src/constants/code';


export const DEFAULT_SHADOW_COLOR = '#000000';

export const DEFAULT_STORE = {
  lang: 'typescript',
  code: '',
  html: '',
  theme: THEMES.find((theme) => theme.theme_name === 'One Dark') ?? null,
  showNumbers: false,
  lineNumbers: '',
  fontSize: '13',
  lineHeight: '1.4',
  fontFamily: 'jetbrains_mono',
  inputColor: '#abb2bf',
  inputBackground: '#282c34',
  selectThemeOpened: false,

  flexBasisCode: 'calc(50% - 3px)',
  flexBasisPreview: 'calc(50% - 3px)',

  frameStyle: 'macos',
  innerPadding: 20,
  outerPadding: 20,
  cornerRadius: 8,
  showShadow: true,
  shadowBlur: 10,
  shadowColor: DEFAULT_SHADOW_COLOR,
  shadowOffset: { x: 0, y: 0 },
  backgroundType: 'none',
  backgroundSolid: '#282c34',
  gradientAngle: 0,
  gradientColor1: '#282c34',
  gradientColor2: '#282c34',
  windowOpacity: 100,
}


export const DEFAULT_CODE = `using System.Windows.Forms;
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