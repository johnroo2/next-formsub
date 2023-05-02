import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
      en: {
        translation: {
         form_submission: "Form Submission",
         username: "Username",
         password: "Password",
         email: "Email",
         show_password: "Show Password",
         submit: "Submit",
        }
      },
      cn: {
        translation: {
            form_submission: "表单提交",
            username: "用户名",
            password: "密码",
            email: "电子邮件",
            show_password: "显示密码",
            submit: "递交",
        }
      },
    }
  });

export default i18n;