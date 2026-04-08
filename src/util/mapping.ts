import { T_Store, T_StoreData, T_User } from '@/src/types';


export const mapUserData = (user: any): T_User | null =>
  user ? ({
    userId: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? '',
    name: user.fullName ?? '',
    imageUrl: user.imageUrl ?? '',
  }) : null;


export const mapStore = (store: T_Store): T_StoreData => ({
  id: store.id,
  name: store.name,
  code: store.code,
  html: store.html,
  codeSettings: store.codeSettings,
  imageSettings: store.imageSettings,
  inputBackground: store.inputBackground,
  inputColor: store.inputColor,
});