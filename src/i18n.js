import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
            demonstration: "Demonstration",
            subtitle: "This site was skillfully made with Next.js",
            username: "Username",
            password: "Password",
            email: "Email",
            show_password: "Show Password",
            submit: "Submit",
            account_login: "Account Login",
            phone_login: "Phone Login",
            phone_number: "Phone Number",
            verification_code: "Verification Code"
        }
      },
      zh: {
        translation: {
            demonstration: "一个示范",
            subtitle: "这个网站是用 Next.js 巧妙地制作的",
            username: "用户名",
            password: "密码",
            email: "电子邮件",
            show_password: "显示密码",
            submit: "递交",
            account_login: "帐号登录",
            phone_login: "电话登录",
            phone_number: "电话号码",
            verification_code: "验证码"
        }
      },
      fr: {
        translation: {
            demonstration: "Manifestation",
            subtitle: "Ce site web a été habilement réalisé avec Node.js",
            username: "Nom D'utilisateur",
            password: "Mot de Passe",
            email: "Email",
            show_password: "Afficher le mot de passe",
            submit: "Soumettre",
            account_login: "Au Compte",
            phone_login: "Par Téléphone",
            phone_number: "Numéro de Téléphone",
            verification_code: "Code de Vérification"
        }
      }


    }
  });

export default i18n;